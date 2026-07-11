import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { site, navPaths } from "@/lib/site";
import { localHref, type Dictionary, type Locale } from "@/lib/i18n";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-24 border-t border-line bg-paper-dim">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-gradient font-display text-2xl font-semibold tracking-wide">
            {site.monogram}
          </span>
          <p className="mt-3 max-w-xs text-sm text-ink-soft">{dict.footer.blurb}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-ink">{dict.footer.explore}</h3>
          <ul className="mt-4 space-y-2">
            {navPaths.map((n) => (
              <li key={n.key}>
                <Link
                  href={localHref(lang, n.href)}
                  className="text-sm text-ink-soft hover:text-ink"
                >
                  {dict.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-ink">{dict.footer.reachUs}</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-soft">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-magenta" />
              <span>{site.address}</span>
            </li>
            {site.phones.map((p) => (
              <li key={p.raw} className="flex gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-sky" />
                <a href={`tel:+${p.raw}`} className="hover:text-ink">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-ink">{dict.footer.hours}</h3>
          <ul className="mt-4 space-y-1.5 text-sm text-ink-soft">
            {dict.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className={h.closed ? "text-magenta" : ""}>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-ink-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {site.name}. {dict.footer.rights}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={13} /> {dict.common.closedMon}
          </span>
        </div>
      </div>
    </footer>
  );
}
