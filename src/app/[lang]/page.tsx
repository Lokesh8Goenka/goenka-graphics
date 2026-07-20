import Link from "next/link";
import { ArrowRight, Phone, Upload, Check } from "lucide-react";
import { site } from "@/lib/site";
import { getDict, localHref, type Locale } from "@/lib/i18n";
import { ServiceIcon } from "@/components/ServiceIcon";

/* Per-service CMYK accents + backdrop photo, cycled in card order. */
const serviceTints = [
  "bg-violet/10 text-violet ring-violet/25",
  "bg-sky/10 text-sky ring-sky/25",
  "bg-magenta/10 text-magenta ring-magenta/25",
  "bg-flame/10 text-flame ring-flame/25",
];
const serviceImages = [
  "/work/wedding-card-1.jpg",
  "/images/rollers.jpg",
  "/work/digital-print.jpg",
  "/work/letterhead.jpg",
];
const statColors = ["text-violet", "text-sky", "text-magenta", "text-flame"];

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getDict(lang);
  const h = t.home;

  return (
    <>
      {/* Hero: full-bleed press-room photo */}
      <section className="relative overflow-hidden bg-press text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-press.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-press/80 via-press/40 to-press" />

        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-24 text-center sm:pt-32">
          <p className="rise text-xs font-medium uppercase tracking-[0.3em] text-press-soft">
            Goenka Graphics &amp; Printers · Est. 1995 · Palampur
          </p>

          <h1 className="ink-wipe mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.08] tracking-tight sm:text-7xl">
            {h.heroTitleA}{" "}
            <span className="text-gradient italic">{h.heroTitleB}</span>
          </h1>

          <p className="rise mx-auto mt-6 max-w-xl text-lg text-press-soft">
            {h.heroSubtitle}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={localHref(locale, "/quote")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white shadow-lg transition-transform hover:scale-[1.03]"
            >
              {t.common.requestQuote} <ArrowRight size={16} />
            </Link>
            {site.phones.map((p) => (
              <a
                key={p.raw}
                href={`tel:+${p.raw}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 py-3 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/15"
              >
                <Phone size={16} /> {p.label}
              </a>
            ))}
          </div>
        </div>
        <div className="cmyk-strip relative" />
      </section>

      {/* Stats: one CMYK colour per number */}
      <section className="mx-auto max-w-6xl px-5 pt-14">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {h.stats.map((s, i) => (
            <div
              key={s.label}
              className="stamp-in rounded-2xl border border-line bg-card px-4 py-7 text-center shadow-sm"
              style={{ animationDelay: `${0.55 + i * 0.2}s` }}
            >
              <div
                className={`font-display text-3xl font-semibold ${statColors[i % 4]}`}
              >
                {s.value}
              </div>
              <div className="mt-1 text-xs text-ink-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services: CMYK-tinted cards */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold text-violet sm:text-4xl">
              {h.servicesTitle}
            </h2>
            <p className="mt-2 max-w-md text-ink-soft">{h.servicesSubtitle}</p>
          </div>
          <Link
            href={localHref(locale, "/services")}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
          >
            {t.common.allServices} <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.services.items.map((s, i) => (
            <Link
              key={s.slug}
              href={localHref(locale, "/services")}
              className={`print-reveal group relative overflow-hidden rounded-2xl p-6 pt-32 ring-1 transition-all hover:-translate-y-1 hover:shadow-md ${serviceTints[i % 4]}`}
            >
              {/* Product photo showing through the top of the card */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={serviceImages[i % 4]}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-card/15 via-card/80 to-card" />

              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card shadow-md transition-transform group-hover:scale-110">
                  <ServiceIcon name={s.icon} size={22} />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {s.blurb}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Press floor: parallax photo band */}
      <section className="relative overflow-hidden bg-press py-28 text-white">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/rollers.jpg"
          alt=""
          className="parallax-img absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-press/85 to-press/30" />
        <div className="relative mx-auto max-w-6xl px-5">
          <h2 className="text-gradient print-reveal max-w-xl font-display text-4xl font-semibold italic sm:text-6xl">
            {h.pressBandTitle}
          </h2>
          <p className="print-reveal mt-4 max-w-md text-lg text-press-soft">
            {h.pressBandBody}
          </p>
        </div>
      </section>

      {/* Why us */}
      <section className="bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-2xl font-display text-3xl font-semibold text-magenta sm:text-4xl">
            {h.whyTitle}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {h.reasons.map((r, i) => (
              <div key={r.title} className="print-reveal">
                <div
                  className={`font-display text-2xl font-semibold ${statColors[i % 4]}`}
                >
                  0{i + 1}
                </div>
                <hr className="brand-rule my-4 w-10" />
                <h3 className="font-display text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload / CTA on colour-paper photo */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-press text-white shadow-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/papers.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-press/90 via-press/70 to-press/40" />
          <div className="relative grid gap-8 p-10 sm:p-14 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                {h.ctaTitle}
              </h2>
              <p className="mt-3 max-w-md text-press-soft">{h.ctaBody}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/85">
                {h.ctaPoints.map((tp) => (
                  <li key={tp} className="flex items-center gap-2">
                    <Check size={16} className="text-flame" /> {tp}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href={localHref(locale, "/quote")}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
              >
                <Upload size={16} /> {h.ctaButton}
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                {t.common.orWhatsapp}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
