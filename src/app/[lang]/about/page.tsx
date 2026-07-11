import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { getDict, localHref, type Locale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).about.title };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getDict(lang);
  const a = t.about;

  return (
    <>
      <PageHero eyebrow={a.eyebrow} title={a.title} subtitle={a.subtitle} />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>
            {a.p1pre}
            <span className="font-medium text-ink">{a.p1lead}</span>
            {a.p1}
          </p>
          <p>{a.p2}</p>
          <p>
            {a.p3pre}
            <span className="text-gradient font-medium">{a.p3grad}</span>
            {a.p3post}
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-4xl px-5 py-16">
          <div className="space-y-10">
            {a.timeline.map((item) => (
              <div key={item.year} className="grid gap-4 sm:grid-cols-[130px_1fr]">
                <div className="text-gradient font-display text-2xl font-semibold">
                  {item.year}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-ink-soft">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-16 text-center">
        <p className="inline-flex items-center gap-2 text-sm text-ink-muted">
          <MapPin size={15} className="text-magenta" /> {site.address}
        </p>
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          {a.ctaTitle}
        </h2>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            href={localHref(locale, "/quote")}
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            {t.common.requestQuote} <ArrowRight size={16} />
          </Link>
          <Link
            href={localHref(locale, "/contact")}
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:bg-paper-dim"
          >
            {a.visitContact}
          </Link>
        </div>
      </section>
    </>
  );
}
