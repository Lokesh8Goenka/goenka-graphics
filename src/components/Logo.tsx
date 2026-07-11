import Link from "next/link";
import { site } from "@/lib/site";
import { localHref, type Locale } from "@/lib/i18n";

export function Logo({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <Link
      href={localHref(lang, "/")}
      aria-label={site.name}
      className={`inline-flex items-center ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-mark.png"
        alt={site.name}
        className="h-9 w-auto transition-transform hover:scale-105"
      />
    </Link>
  );
}
