"use client";

import { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

/* The <html> class is the source of truth (set by the inline theme script
   before hydration), so we subscribe to it instead of mirroring it in state. */
function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(
    subscribe,
    () => document.documentElement.classList.contains("dark"),
    () => false,
  );

  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-md p-2 text-ink-soft transition-colors hover:text-ink"
    >
      {dark ? <Sun size={19} /> : <Moon size={19} />}
    </button>
  );
}
