import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifyToken } from "@/lib/adminAuth";
import { AdminPortal } from "./AdminPortal";

export const metadata: Metadata = {
  title: "Gallery Manager · Goenka Graphics",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authed = verifyToken(cookieStore.get(ADMIN_COOKIE)?.value);
  const storageReady = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
  const passwordSet = Boolean(process.env.ADMIN_PASSWORD);

  return (
    <AdminPortal
      initialAuthed={authed}
      storageReady={storageReady}
      passwordSet={passwordSet}
    />
  );
}
