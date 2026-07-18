import Link from "next/link";
import { ArrowRight, Phone, Upload, Check, Sparkles } from "lucide-react";
import { site } from "@/lib/site";
import { getDict, localHref, type Locale } from "@/lib/i18n";
import { ServiceIcon } from "@/components/ServiceIcon";

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
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 text-center sm:pt-28">
          <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-paper-dim px-4 py-1.5 text-xs font-medium tracking-wide text-ink-soft">
            <Sparkles size={13} className="text-flame" />
            {t.common.estLine}
          </p>

          <h1 className="ink-wipe mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.08] tracking-tight sm:text-7xl">
            {h.heroTitleA}{" "}
            <span className="text-gradient italic">{h.heroTitleB}</span>
          </h1>

          <p className="rise mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            {h.heroSubtitle}
          </p>

          <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={localHref(locale, "/quote")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.03]"
            >
              {t.common.requestQuote} <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:+${site.phones[0].raw}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper-dim"
            >
              <Phone size={16} /> {site.phones[0].label}
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-y border-line bg-paper-dim">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line px-5 sm:grid-cols-4">
            {h.stats.map((s, i) => (
              <div key={s.label} className="px-4 py-7 text-center">
                <div
                  className="stamp-in text-gradient font-display text-3xl font-semibold"
                  style={{ animationDelay: `${0.55 + i * 0.2}s` }}
                >
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
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
          {t.services.items.map((s) => (
            <Link
              key={s.slug}
              href={localHref(locale, "/services")}
              className="print-reveal group rounded-2xl border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:border-ink/15 hover:shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper-dim">
                <ServiceIcon name={s.icon} className="text-ink" size={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {s.blurb}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            {h.whyTitle}
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {h.reasons.map((r, i) => (
              <div key={r.title} className="print-reveal">
                <div className="text-gradient font-display text-2xl font-semibold">
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

      {/* Upload / CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="overflow-hidden rounded-3xl border border-line bg-ink text-paper">
          <div className="grid gap-8 p-10 sm:p-14 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                {h.ctaTitle}
              </h2>
              <p className="mt-3 max-w-md text-paper/70">{h.ctaBody}</p>
              <ul className="mt-6 space-y-2 text-sm text-paper/80">
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
                className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/25 px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
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
