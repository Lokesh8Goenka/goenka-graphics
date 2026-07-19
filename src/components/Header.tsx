"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { navPaths } from "@/lib/site";
import { localHref, type Dictionary, type Locale } from "@/lib/i18n";

export function Header({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const items = navPaths.map((n) => {
    const href = localHref(lang, n.href);
    const active =
      n.href === "/" ? pathname === href : pathname.startsWith(href);
    return { href, label: dict.nav[n.key], active };
  });

  return (
    <header className="sticky top-0 z-40 bg-paper/85 backdrop-blur">
      <div className="cmyk-strip" />
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Logo lang={lang} />

        <nav className="hidden items-center gap-8 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={item.active ? "page" : undefined}
              className={`relative py-1 text-sm transition-colors hover:text-ink ${
                item.active ? "font-medium text-ink" : "text-ink-soft"
              }`}
            >
              {item.label}
              {item.active && (
                <span
                  aria-hidden
                  className="nav-ink bg-brand-gradient absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full"
                />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
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
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="rounded-md p-2 text-ink-soft md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-line bg-paper md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-5 py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={item.active ? "page" : undefined}
                className={`flex items-center justify-between py-3 text-sm ${
                  item.active ? "font-medium text-ink" : "text-ink-soft"
                }`}
              >
                {item.label}
                {item.active && (
                  <span
                    aria-hidden
                    className="bg-brand-gradient h-1.5 w-1.5 rounded-full"
                  />
                )}
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
