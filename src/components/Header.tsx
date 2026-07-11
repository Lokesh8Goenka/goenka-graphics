"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { LanguageToggle } from "./LanguageToggle";
import { navPaths } from "@/lib/site";
import { localHref, type Dictionary, type Locale } from "@/lib/i18n";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = navPaths.map((n) => ({
    href: localHref(lang, n.href),
    label: dict.nav[n.key],
    isHome: n.href === "/",
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo lang={lang} />

        <nav className="hidden items-center gap-8 md:flex">
          {items.map((item) => {
            const active = item.isHome
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm transition-colors hover:text-ink ${
                  active ? "text-ink" : "text-ink-soft"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <LanguageToggle lang={lang} dict={dict} />
          <ThemeToggle />
          <Link
            href={localHref(lang, "/quote")}
            className="ml-1 hidden rounded-full bg-brand-gradient px-4 py-2 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.03] sm:inline-block"
          >
            {dict.common.getQuote}
          </Link>
          <button
            type="button"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-ink-soft md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-line bg-paper md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm text-ink-soft"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={localHref(lang, "/quote")}
              onClick={() => setOpen(false)}
              className="my-3 rounded-full bg-brand-gradient px-4 py-2 text-center text-sm font-medium text-white"
            >
              {dict.common.getQuote}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
