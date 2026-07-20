import { list } from "@vercel/blob";
import { galleryMeta } from "./site";

/** A photo uploaded through the /admin portal, stored in Vercel Blob. */
export type GalleryEntry = {
  /** Public blob URL of the image. */
  src: string;
  /** Blob pathname, used for deletion. */
  pathname: string;
  labelEn: string;
};

/**
 * Persisted gallery state. `uploaded` are admin-added photos; `hidden` lists
 * the slugs of built-in stock photos the admin chose to remove.
 */
export type GalleryManifest = {
  uploaded: GalleryEntry[];
  hidden: string[];
};

/** A photo as shown in the admin panel — defaults and uploads together. */
export type AdminPhoto = {
  /** Stable identifier: the slug for defaults, the blob pathname for uploads. */
  id: string;
  src: string;
  label: string;
  kind: "default" | "uploaded";
};

export const MANIFEST_PATH = "work/gallery.json";

const EMPTY: GalleryManifest = { uploaded: [], hidden: [] };

function isEntry(e: unknown): e is GalleryEntry {
  return (
    typeof e === "object" &&
    e !== null &&
    typeof (e as GalleryEntry).src === "string" &&
    typeof (e as GalleryEntry).pathname === "string"
  );
}

function normalizeManifest(data: unknown): GalleryManifest {
  // Legacy format: a bare array of uploaded entries.
  if (Array.isArray(data)) return { uploaded: data.filter(isEntry), hidden: [] };
  if (data && typeof data === "object") {
    const d = data as Record<string, unknown>;
    return {
      uploaded: Array.isArray(d.uploaded) ? d.uploaded.filter(isEntry) : [],
      hidden: Array.isArray(d.hidden)
        ? d.hidden.filter((s): s is string => typeof s === "string")
        : [],
    };
  }
  return EMPTY;
}

/**
 * Reads the gallery manifest from Vercel Blob. Returns empty state when the
 * store isn't configured or nothing has been saved yet.
 */
export async function getManifest(): Promise<GalleryManifest> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return EMPTY;
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
    const manifest = blobs.find((b) => b.pathname === MANIFEST_PATH);
    if (!manifest) return EMPTY;
    const res = await fetch(manifest.url, { cache: "no-store" });
    if (!res.ok) return EMPTY;
    return normalizeManifest(await res.json());
  } catch {
    return EMPTY;
  }
}

/**
 * The full admin view: built-in stock photos (minus hidden ones) followed by
 * uploaded photos. `labels` maps a stock slug to its display caption.
 */
export function toAdminPhotos(
  manifest: GalleryManifest,
  labels: Record<string, string>,
): AdminPhoto[] {
  const defaults: AdminPhoto[] = galleryMeta
    .filter((g) => !manifest.hidden.includes(g.slug))
    .map((g) => ({
      id: g.slug,
      src: `/work/${g.slug}.jpg`,
      label: labels[g.slug] ?? g.slug,
      kind: "default",
    }));
  const uploaded: AdminPhoto[] = manifest.uploaded.map((e) => ({
    id: e.pathname,
    src: e.src,
    label: e.labelEn,
    kind: "uploaded",
  }));
  return [...defaults, ...uploaded];
}
