import Link from "next/link";
import { site } from "@/lib/site";
import { localHref, type Locale } from "@/lib/i18n";

export function Logo({ lang, className = "" }: { lang: Locale; className?: string }) {
  return (
    <Link
      href={localHref(lang, "/")}
      className={`inline-flex items-baseline gap-2 ${className}`}
    >
      <span className="text-gradient font-display text-2xl font-semibold tracking-wide">
        {site.monogram}
      </span>
      <span className="hidden text-sm font-medium text-ink-soft sm:inline">
        {site.shortName}
      </span>
    </Link>
  );
}
