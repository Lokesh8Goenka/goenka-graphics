import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceIcon } from "@/components/ServiceIcon";
import { getDict, localHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).services.title };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getDict(lang);
  const s = t.services;

  return (
    <>
      <PageHero eyebrow={s.eyebrow} title={s.title} subtitle={s.subtitle} />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {s.items.map((item) => (
            <div key={item.slug} className="print-reveal rounded-2xl border border-line bg-card p-7">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper-dim">
                <ServiceIcon name={item.icon} className="text-ink" size={24} />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold">
                {item.title}
              </h2>
              <p className="mt-2 text-ink-soft">{item.blurb}</p>
              <ul className="mt-5 space-y-2">
                {item.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-ink-soft">
                    <Check size={16} className="shrink-0 text-magenta" />
                    {p}
                  </li>
                ))}
              </ul>
              <Link
                href={`${localHref(locale, "/quote")}?product=${encodeURIComponent(item.title)}`}
                className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper-dim"
              >
                {t.common.getQuote} <ArrowRight size={14} />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-line bg-paper-dim p-10 text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {s.helpTitle}
          </h2>
          <p className="max-w-lg text-ink-soft">{s.helpBody}</p>
          <Link
            href={localHref(locale, "/quote")}
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            {t.common.freeQuote} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
