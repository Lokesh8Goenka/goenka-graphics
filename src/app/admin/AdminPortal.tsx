"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  ImagePlus,
  Loader2,
  LogOut,
  Lock,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import type { GalleryEntry } from "@/lib/gallery";

/** Downscale a photo in the browser so phone pictures upload fast and fit size limits. */
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const maxSide = 1600;
  const scale = Math.min(1, maxSide / Math.max(bitmap.width, bitmap.height));
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
  bitmap.close();
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.85),
  );
  return blob ?? file;
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
  const [entries, setEntries] = useState<GalleryEntry[]>([]);
  const [labelEn, setLabelEn] = useState("");
  const [labelHi, setLabelHi] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(initialAuthed);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

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
      setError("Please add an English caption.");
      return;
    }
    setError("");
    setNotice("");
    setBusy(true);
    try {
      const compressed = await compressImage(file);
      const form = new FormData();
      form.append("file", compressed, "photo.jpg");
      form.append("labelEn", labelEn.trim());
      form.append("labelHi", labelHi.trim());
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: form,
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Upload failed.");
        return;
      }
      setEntries((prev) => [...prev, data]);
      setLabelEn("");
      setLabelHi("");
      setFile(null);
      if (fileInput.current) fileInput.current.value = "";
      setNotice("Photo uploaded! It appears on the website within a minute.");
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(entry: GalleryEntry) {
    if (!window.confirm(`Delete "${entry.labelEn}" from the website?`)) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathname: entry.pathname }),
      });
      if (res.ok) {
        setEntries((prev) => prev.filter((p) => p.pathname !== entry.pathname));
        setNotice("Photo removed.");
      } else {
        setError((await res.json()).error ?? "Delete failed.");
      }
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
              accept="image/jpeg,image/png,image/webp"
              className="sr-only"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </label>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-ink">
              Caption (English)
              <input
                className={inputClass}
                value={labelEn}
                onChange={(e) => setLabelEn(e.target.value)}
                placeholder="e.g. Wedding cards"
              />
            </label>
            <label className="block text-sm font-medium text-ink">
              Caption (Hindi, optional)
              <input
                className={inputClass}
                value={labelHi}
                onChange={(e) => setLabelHi(e.target.value)}
                placeholder="जैसे शादी के कार्ड"
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
        {loading ? (
          <p className="mt-4 flex items-center gap-2 text-sm text-ink-muted">
            <Loader2 size={15} className="animate-spin" /> Loading…
          </p>
        ) : entries.length === 0 ? (
          <p className="mt-4 text-sm text-ink-muted">
            Nothing uploaded yet — the website is showing its built-in
            placeholder tiles.
          </p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {entries.map((entry) => (
              <figure
                key={entry.pathname}
                className="group relative overflow-hidden rounded-2xl border border-line bg-paper-dim"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={entry.src}
                  alt={entry.labelEn}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover"
                />
                <figcaption className="flex items-center justify-between gap-2 p-3">
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-medium text-ink">
                      {entry.labelEn}
                    </span>
                    {entry.labelHi && (
                      <span className="block truncate text-xs text-ink-muted">
                        {entry.labelHi}
                      </span>
                    )}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleDelete(entry)}
                    disabled={busy}
                    aria-label={`Delete ${entry.labelEn}`}
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
