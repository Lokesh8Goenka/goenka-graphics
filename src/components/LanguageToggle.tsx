"use client";

import { usePathname, useRouter } from "next/navigation";
import { Languages } from "lucide-react";
import { locales, type Dictionary, type Locale } from "@/lib/i18n";

export function LanguageToggle({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const next: Locale = lang === "en" ? "hi" : "en";

  function switchLang() {
    const segments = pathname.split("/");
    // segments[1] is the current locale prefix
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const target = segments.join("/") || `/${next}`;
    document.cookie = `NEXT_LOCALE=${next}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.push(target);
  }

  return (
    <button
      type="button"
      onClick={switchLang}
      aria-label={`Switch language to ${dict.switchTo}`}
      className="flex items-center gap-1.5 rounded-md px-2 py-2 text-sm text-ink-soft transition-colors hover:text-ink"
    >
      <Languages size={18} />
      <span className="font-medium">{dict.switchTo}</span>
    </button>
  );
}
