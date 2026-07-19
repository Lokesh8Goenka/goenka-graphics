import Link from "next/link";
import { MapPin, Phone, Clock } from "lucide-react";
import { site, navPaths } from "@/lib/site";
import { localHref, type Dictionary, type Locale } from "@/lib/i18n";

export function Footer({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <footer className="mt-24 bg-press text-white">
      <div className="cmyk-strip" />
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt={site.name} className="h-40 w-auto sm:h-44" />
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">
            {dict.footer.explore}
          </h3>
          <ul className="mt-4 space-y-2">
            {navPaths.map((n) => (
              <li key={n.key}>
                <Link
                  href={localHref(lang, n.href)}
                  className="text-sm text-press-soft transition-colors hover:text-white"
                >
                  {dict.nav[n.key]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">
            {dict.footer.reachUs}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-press-soft">
            <li className="flex gap-2">
              <MapPin size={16} className="mt-0.5 shrink-0 text-magenta" />
              <span>{site.address}</span>
            </li>
            {site.phones.map((p) => (
              <li key={p.raw} className="flex gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-sky" />
                <a href={`tel:+${p.raw}`} className="transition-colors hover:text-white">
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-white">{dict.footer.hours}</h3>
          <ul className="mt-4 space-y-1.5 text-sm text-press-soft">
            {dict.hours.map((h) => (
              <li key={h.day} className="flex justify-between gap-4">
                <span>{h.day}</span>
                <span className={h.closed ? "text-magenta" : ""}>{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-5 text-xs text-press-soft/80 sm:flex-row">
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
