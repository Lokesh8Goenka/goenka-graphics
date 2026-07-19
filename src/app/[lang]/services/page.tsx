import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceIcon } from "@/components/ServiceIcon";
import { getDict, localHref, type Locale } from "@/lib/i18n";

/* One CMYK accent + photo per service, in card order. */
const cardStyles = [
  {
    tint: "bg-violet/10 ring-violet/25",
    text: "text-violet",
    img: "/work/wedding-card-1.jpg",
  },
  {
    tint: "bg-sky/10 ring-sky/25",
    text: "text-sky",
    img: "/images/rollers.jpg",
  },
  {
    tint: "bg-magenta/10 ring-magenta/25",
    text: "text-magenta",
    img: "/images/hero-press.jpg",
  },
  {
    tint: "bg-flame/10 ring-flame/25",
    text: "text-flame",
    img: "/work/letterhead.jpg",
  },
];

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
          {s.items.map((item, i) => {
            const c = cardStyles[i % cardStyles.length];
            return (
              <div
                key={item.slug}
                className={`print-reveal group overflow-hidden rounded-2xl ring-1 transition-all hover:-translate-y-1 hover:shadow-lg ${c.tint}`}
              >
                <div className="relative aspect-[2/1] overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.img}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className={`absolute bottom-4 left-5 flex h-11 w-11 items-center justify-center rounded-xl bg-card shadow-md ${c.text}`}
                  >
                    <ServiceIcon name={item.icon} size={22} />
                  </div>
                </div>
                <div className="p-7 pt-5">
                  <h2
                    className={`font-display text-2xl font-semibold ${c.text}`}
                  >
                    {item.title}
                  </h2>
                  <p className="mt-2 text-ink-soft">{item.blurb}</p>
                  <ul className="mt-5 space-y-2">
                    {item.points.map((p) => (
                      <li
                        key={p}
                        className="flex items-center gap-2 text-sm text-ink-soft"
                      >
                        <Check size={16} className={`shrink-0 ${c.text}`} />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`${localHref(locale, "/quote")}?product=${encodeURIComponent(item.title)}`}
                    className="mt-6 inline-flex items-center gap-1.5 rounded-full border border-ink/15 bg-card px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-paper-dim"
                  >
                    {t.common.getQuote} <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative mt-14 overflow-hidden rounded-2xl bg-press text-white">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/papers.jpg"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-press/85 to-press/60" />
          <div className="relative flex flex-col items-center gap-4 p-10 text-center">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              {s.helpTitle}
            </h2>
            <p className="max-w-lg text-press-soft">{s.helpBody}</p>
            <Link
              href={localHref(locale, "/quote")}
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
            >
              {t.common.freeQuote} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
