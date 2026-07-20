import { NextRequest, NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, verifyToken } from "@/lib/adminAuth";
import {
  getManifest,
  toAdminPhotos,
  MANIFEST_PATH,
  type GalleryEntry,
  type GalleryManifest,
} from "@/lib/gallery";
import { getDict } from "@/lib/i18n";

const MAX_UPLOAD_BYTES = 4 * 1024 * 1024; // stay under Vercel's request body limit
const ALLOWED_TYPES: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
};

function authed(request: NextRequest): boolean {
  return verifyToken(request.cookies.get(ADMIN_COOKIE)?.value);
}

function unauthorized() {
  return NextResponse.json({ error: "Not signed in." }, { status: 401 });
}

function labels(): Record<string, string> {
  return getDict("en").work.labels as Record<string, string>;
}

async function saveManifest(manifest: GalleryManifest) {
  await put(MANIFEST_PATH, JSON.stringify(manifest), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

function revalidateWork() {
  revalidatePath("/en/work");
}

export async function GET(request: NextRequest) {
  if (!authed(request)) return unauthorized();
  const manifest = await getManifest();
  return NextResponse.json(toAdminPhotos(manifest, labels()));
}

export async function POST(request: NextRequest) {
  if (!authed(request)) return unauthorized();
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image storage is not configured (Vercel Blob store missing)." },
      { status: 503 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");
  const labelEn = String(form.get("labelEn") ?? "").trim();

  if (!(file instanceof File) || file.size === 0) {
    return NextResponse.json({ error: "No image received." }, { status: 400 });
  }
  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: "Only JPG, PNG or WebP images are allowed." },
      { status: 400 },
    );
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: "Image is too large (max 4 MB)." },
      { status: 400 },
    );
  }
  if (!labelEn) {
    return NextResponse.json({ error: "Please add a caption." }, { status: 400 });
  }

  try {
    const blob = await put(`work/img-${Date.now()}.${ext}`, file, {
      access: "public",
      contentType: file.type,
    });

    const entry: GalleryEntry = {
      src: blob.url,
      pathname: blob.pathname,
      labelEn,
    };
    const manifest = await getManifest();
    await saveManifest({
      uploaded: [...manifest.uploaded, entry],
      hidden: manifest.hidden,
    });
    revalidateWork();
    return NextResponse.json({
      id: entry.pathname,
      src: entry.src,
      label: entry.labelEn,
      kind: "uploaded",
    });
  } catch (err) {
    console.error("Blob upload failed:", err);
    const detail =
      err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    return NextResponse.json(
      { error: `Upload to storage failed — ${detail}` },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!authed(request)) return unauthorized();
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: "Image storage is not configured (Vercel Blob store missing)." },
      { status: 503 },
    );
  }

  let id = "";
  let kind = "";
  try {
    const body = await request.json();
    id = typeof body.id === "string" ? body.id : "";
    kind = typeof body.kind === "string" ? body.kind : "";
  } catch {
    /* handled below */
  }
  if (!id || id === MANIFEST_PATH) {
    return NextResponse.json({ error: "Invalid photo reference." }, { status: 400 });
  }

  try {
    const manifest = await getManifest();

    if (kind === "default") {
      // Hide a built-in stock photo (it stays in the repo, just not shown).
      const hidden = manifest.hidden.includes(id)
        ? manifest.hidden
        : [...manifest.hidden, id];
      await saveManifest({ uploaded: manifest.uploaded, hidden });
    } else {
      // Remove an uploaded photo from Blob storage.
      const entry = manifest.uploaded.find((e) => e.pathname === id);
      if (!entry) {
        return NextResponse.json({ error: "Photo not found." }, { status: 404 });
      }
      await del(entry.src);
      await saveManifest({
        uploaded: manifest.uploaded.filter((e) => e.pathname !== id),
        hidden: manifest.hidden,
      });
    }

    revalidateWork();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Blob delete failed:", err);
    const detail =
      err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    return NextResponse.json(
      { error: `Delete failed — ${detail}` },
      { status: 500 },
    );
  }
}
