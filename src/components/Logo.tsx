import Link from "next/link";
import { site } from "@/lib/site";
import { localHref, type Locale } from "@/lib/i18n";

export function Logo({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <Link
      href={localHref(lang, "/")}
      aria-label={site.name}
      className={`inline-flex items-center gap-2.5 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.png"
        alt=""
        className="h-9 w-auto transition-transform hover:scale-105"
      />
      <span className="leading-tight">
        <span className="block font-display text-[15px] font-semibold tracking-tight">
          Goenka Graphics
        </span>
        <span className="block text-[10px] uppercase tracking-[0.18em] text-ink-muted">
          &amp; Printers · Palampur
        </span>
      </span>
    </Link>
  );
}
