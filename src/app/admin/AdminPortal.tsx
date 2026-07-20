"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  CheckCircle2,
  ImagePlus,
  Loader2,
  LogOut,
  Lock,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import type { AdminPhoto } from "@/lib/gallery";

/**
 * Downscale a photo in the browser to a JPEG so phone pictures upload fast
 * and fit size limits. Returns a jpg Blob on success. Throws only if the
 * browser cannot decode the image at all (e.g. an unconverted HEIC on a
 * browser without HEIC support) — the caller turns that into a clear message.
 */
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const maxSide = 1600;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("no-canvas");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.85),
  );
  if (!blob) throw new Error("encode-failed");
  return blob;
}

export function AdminPortal({
  initialAuthed,
  storageReady,
  passwordSet,
}: {
  initialAuthed: boolean;
  storageReady: boolean;
  passwordSet: boolean;
}) {
  const [authed, setAuthed] = useState(initialAuthed);
  const [password, setPassword] = useState("");
  const [entries, setEntries] = useState<AdminPhoto[]>([]);
  const [labelEn, setLabelEn] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(initialAuthed);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [health, setHealth] = useState<
    { state: "idle" | "checking" | "ok" | "fail"; message?: string }
  >({ state: "idle" });
  const fileInput = useRef<HTMLInputElement>(null);

  async function checkStorage() {
    setHealth({ state: "checking" });
    try {
      const res = await fetch("/api/admin/health");
      const data = await res.json().catch(() => ({}));
      if (data.ok) {
        setHealth({ state: "ok" });
      } else {
        setHealth({
          state: "fail",
          message: data.error ?? `Check failed (${res.status}).`,
        });
      }
    } catch (err) {
      setHealth({
        state: "fail",
        message: err instanceof Error ? err.message : "unknown error",
      });
    }
  }

  const loadGallery = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/gallery");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      if (res.ok) setEntries(await res.json());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadGallery();
  }, [authed, loadGallery]);

  const preview = useMemo(
    () => (file ? URL.createObjectURL(file) : null),
    [file],
  );
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        setLoading(true);
        setAuthed(true);
        setPassword("");
      } else {
        setError((await res.json()).error ?? "Login failed.");
      }
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    setAuthed(false);
  }

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) {
      setError("Choose a photo first.");
      return;
    }
    if (!labelEn.trim()) {
      setError("Please add a caption.");
      return;
    }
    setError("");
    setNotice("");
    setBusy(true);
    try {
      let upload: Blob = file;
      try {
        upload = await compressImage(file);
      } catch {
        // Browser couldn't decode the image (often an iPhone HEIC). Send the
        // original and let the server validate — it gives a clear message.
        upload = file;
      }
      const form = new FormData();
      form.append("file", upload, "photo.jpg");
      form.append("labelEn", labelEn.trim());
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: form,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          data.error ??
            `Upload failed (${res.status}). Please try a JPG or PNG under 4 MB.`,
        );
        return;
      }
      setEntries((prev) => [...prev, data]);
      setLabelEn("");
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      setNotice("Photo uploaded! It appears on the website within a minute.");
    } catch (err) {
      setError(
        `Couldn't upload that photo. Please try a JPG or PNG. (${
          err instanceof Error ? err.message : "unknown error"
        })`,
      );
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(entry: AdminPhoto) {
    const verb = entry.kind === "default" ? "Remove" : "Delete";
    if (!window.confirm(`${verb} "${entry.label}" from the website?`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: entry.id, kind: entry.kind }),
      });
      if (res.ok) {
        setEntries((prev) => prev.filter((p) => p.id !== entry.id));
        setNotice("Photo removed.");
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error ?? `Delete failed (${res.status}).`);
      }
    } catch (err) {
      setError(
        `Couldn't delete that photo. (${
          err instanceof Error ? err.message : "unknown error"
        })`,
      );
    } finally {
      setBusy(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-line bg-card px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-sky";

  if (!authed) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center px-5">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-line bg-card p-8"
        >
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient text-white">
              <Lock size={18} />
            </span>
            <div>
              <h1 className="font-display text-xl font-semibold">
                Gallery Manager
              </h1>
              <p className="text-xs text-ink-muted">Goenka Graphics & Printers</p>
            </div>
          </div>

          {!passwordSet && (
            <p className="mt-5 flex items-start gap-2 rounded-xl bg-paper-dim px-4 py-3 text-xs text-ink-soft">
              <TriangleAlert size={15} className="mt-0.5 shrink-0 text-flame" />
              Not configured yet: set the ADMIN_PASSWORD environment variable in
              Vercel, then redeploy.
            </p>
          )}

          <label className="mt-6 block text-sm font-medium text-ink">
            Password
            <input
              type="password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />
          </label>
          {error && (
            <p role="alert" className="mt-3 text-sm text-magenta">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={busy}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {busy && <Loader2 size={16} className="animate-spin" />} Sign in
          </button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl px-5 py-10">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold">Gallery Manager</h1>
          <p className="mt-1 text-sm text-ink-soft">
            Photos you upload here appear on the &ldquo;Our Work&rdquo; page —
            no code needed.
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
        >
          <LogOut size={15} /> Sign out
        </button>
      </header>

      {!storageReady && (
        <p className="mt-6 flex items-start gap-2 rounded-xl border border-line bg-paper-dim px-4 py-3 text-sm text-ink-soft">
          <TriangleAlert size={17} className="mt-0.5 shrink-0 text-flame" />
          Image storage isn&rsquo;t connected yet. In Vercel: Storage → Create
          Blob store → connect it to this project, then redeploy.
        </p>
      )}

      {/* Storage connection self-test */}
      <div className="mt-6 rounded-2xl border border-line bg-paper-dim p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold text-ink">
              Storage connection
            </h2>
            <p className="mt-0.5 text-xs text-ink-muted">
              Tests that photos can actually be saved. Run this to confirm the
              backend is working.
            </p>
          </div>
          <button
            type="button"
            onClick={checkStorage}
            disabled={health.state === "checking"}
            className="inline-flex shrink-0 items-center gap-2 rounded-full border border-ink/15 bg-card px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper disabled:opacity-60"
          >
            {health.state === "checking" && (
              <Loader2 size={15} className="animate-spin" />
            )}
            Check connection
          </button>
        </div>
        {health.state === "ok" && (
          <p className="mt-3 flex items-center gap-2 rounded-lg bg-sky/10 px-3 py-2 text-sm font-medium text-sky">
            <CheckCircle2 size={16} /> Storage is connected and working — photos
            can be saved.
          </p>
        )}
        {health.state === "fail" && (
          <p className="mt-3 rounded-lg bg-magenta/10 px-3 py-2 text-sm text-magenta">
            <span className="font-medium">Storage is not working.</span>{" "}
            {health.message}
          </p>
        )}
      </div>

      <form
        onSubmit={handleUpload}
        className="mt-8 rounded-2xl border border-line bg-card p-6 sm:p-8"
      >
        <h2 className="font-display text-lg font-semibold">Add a photo</h2>
        <div className="mt-4 grid gap-5 sm:grid-cols-[160px_1fr]">
          <label className="flex aspect-[4/5] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-paper-dim text-ink-muted transition-colors hover:border-sky hover:text-ink-soft">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={preview}
                alt="Selected photo preview"
                className="h-full w-full rounded-[10px] object-cover"
              />
            ) : (
              <>
                <ImagePlus size={26} />
                <span className="px-2 text-center text-xs">
                  Tap to choose a photo
                </span>
              </>
            )}
            <input
              ref={fileInput}
              type="file"
              accept="image/*"
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-ink">
              Caption
              <input
                className={inputClass}
                value={labelEn}
                onChange={(e) => setLabelEn(e.target.value)}
                placeholder="e.g. Wedding cards"
              />
            </label>
            <button
              type="submit"
              disabled={busy || !storageReady}
              className="flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-2.5 text-sm font-medium text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              {busy ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <ImagePlus size={16} />
              )}
              Upload photo
            </button>
          </div>
        </div>
        {error && (
          <p role="alert" className="mt-4 text-sm text-magenta">
            {error}
          </p>
        )}
        {notice && <p className="mt-4 text-sm text-sky">{notice}</p>}
      </form>

      <section className="mt-10">
        <h2 className="font-display text-lg font-semibold">
          Photos on the website{" "}
          <span className="text-sm font-normal text-ink-muted">
            ({entries.length})
          </span>
        </h2>
        <p className="mt-1 text-sm text-ink-soft">
          &ldquo;Sample&rdquo; photos are the placeholders shown until you add
          your own. Upload real photos, then remove the samples you don&rsquo;t
          want.
        </p>
        {loading ? (
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
            <Loader2 size={15} className="animate-spin" /> Loading…
          </p>
        ) : entries.length === 0 ? (
          <p className="mt-4 text-sm text-ink-muted">
            No photos on the website yet.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {entries.map((entry) => (
              <figure
                key={entry.id}
                className="group relative overflow-hidden rounded-2xl border border-line bg-paper-dim"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.src}
                  alt={entry.label}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                {entry.kind === "default" && (
                  <span className="absolute left-2 top-2 rounded-full bg-ink/70 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white">
                    Sample
                  </span>
                )}
                <figcaption className="flex items-center justify-between gap-2 p-3">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">
                      {entry.label}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry)}
                    disabled={busy}
                    aria-label={`Remove ${entry.label}`}
                    className="shrink-0 rounded-full p-2 text-ink-muted transition-colors hover:bg-magenta/10 hover:text-magenta"
                  >
                    <Trash2 size={16} />
                  </button>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
