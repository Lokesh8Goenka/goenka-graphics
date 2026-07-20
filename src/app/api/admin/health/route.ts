import { NextRequest, NextResponse } from "next/server";
import { del, put } from "@vercel/blob";
import { ADMIN_COOKIE, verifyToken } from "@/lib/adminAuth";

/**
 * Storage health check: performs a real write + delete round-trip against
 * Vercel Blob so the admin can confirm the backend connection independently
 * of the photo-upload flow. Admin-only.
 */
export async function GET(request: NextRequest) {
  if (!verifyToken(request.cookies.get(ADMIN_COOKIE)?.value)) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "No storage token found. Connect the Blob store to this project in Vercel, then redeploy.",
      },
      { status: 200 },
    );
  }

  try {
    const blob = await put("work/.healthcheck.txt", `ok ${Date.now()}`, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "text/plain",
    });
    await del(blob.url);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const detail =
      err instanceof Error ? `${err.name}: ${err.message}` : String(err);
    return NextResponse.json({ ok: false, error: detail }, { status: 200 });
  }
}
