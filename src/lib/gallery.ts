import { list } from "@vercel/blob";

/** A photo uploaded through the /admin portal, stored in Vercel Blob. */
export type GalleryEntry = {
  /** Public blob URL of the image. */
  src: string;
  /** Blob pathname, used for deletion. */
  pathname: string;
  labelEn: string;
  labelHi: string;
};

export const MANIFEST_PATH = "work/gallery.json";

/**
 * Reads the gallery manifest from Vercel Blob.
 * Returns [] when the store isn't configured or nothing was uploaded yet,
 * in which case the site falls back to the built-in placeholder tiles.
 */
export async function getGallery(): Promise<GalleryEntry[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return [];
  try {
    const { blobs } = await list({ prefix: MANIFEST_PATH, limit: 1 });
    const manifest = blobs.find((b) => b.pathname === MANIFEST_PATH);
    if (!manifest) return [];
    const res = await fetch(manifest.url, { cache: "no-store" });
    if (!res.ok) return [];
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return [];
    return data.filter(
      (e): e is GalleryEntry =>
        typeof e === "object" &&
        e !== null &&
        typeof (e as GalleryEntry).src === "string" &&
        typeof (e as GalleryEntry).pathname === "string",
    );
  } catch {
    return [];
  }
}
