import { NextRequest, NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE, verifyToken } from "@/lib/adminAuth";
import { getGallery, MANIFEST_PATH, type GalleryEntry } from "@/lib/gallery";

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

async function saveManifest(entries: GalleryEntry[]) {
  await put(MANIFEST_PATH, JSON.stringify(entries), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}

function revalidateWork() {
  for (const lang of ["en", "hi"]) revalidatePath(`/${lang}/work`);
}

export async function GET(request: NextRequest) {
  if (!authed(request)) return unauthorized();
  return NextResponse.json(await getGallery());
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
  const labelHi = String(form.get("labelHi") ?? "").trim();

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
    return NextResponse.json(
      { error: "Please add an English caption." },
      { status: 400 },
    );
  }

  const blob = await put(`work/img-${Date.now()}.${ext}`, file, {
    access: "public",
    contentType: file.type,
  });

  const entry: GalleryEntry = {
    src: blob.url,
    pathname: blob.pathname,
    labelEn,
    labelHi,
  };
  const entries = [...(await getGallery()), entry];
  await saveManifest(entries);
  revalidateWork();
  return NextResponse.json(entry);
}

export async function DELETE(request: NextRequest) {
  if (!authed(request)) return unauthorized();

  let pathname = "";
  try {
    const body = await request.json();
    pathname = typeof body.pathname === "string" ? body.pathname : "";
  } catch {
    /* handled below */
  }
  if (!pathname || pathname === MANIFEST_PATH) {
    return NextResponse.json({ error: "Invalid photo reference." }, { status: 400 });
  }

  const entries = await getGallery();
  const entry = entries.find((e) => e.pathname === pathname);
  if (!entry) {
    return NextResponse.json({ error: "Photo not found." }, { status: 404 });
  }

  await del(entry.src);
  await saveManifest(entries.filter((e) => e.pathname !== pathname));
  revalidateWork();
  return NextResponse.json({ ok: true });
}
