"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

export type GalleryItem = {
  src: string;
  label: string;
  tint: string;
};

export function GalleryImage({ item }: { item: GalleryItem }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-paper-dim">
      {!failed ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.src}
            alt={item.label}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
            <span className="text-sm font-medium text-white">{item.label}</span>
          </div>
        </>
      ) : (
        <div
          className={`flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br ${item.tint}`}
        >
          <ImageIcon
            size={26}
            className="text-ink-muted transition-transform group-hover:scale-110"
          />
          <span className="px-3 text-center text-sm font-medium text-ink-soft">
            {item.label}
          </span>
        </div>
      )}
    </div>
  );
}
