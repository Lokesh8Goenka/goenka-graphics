import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { GalleryImage, type GalleryItem } from "@/components/GalleryImage";
import { galleryMeta } from "@/lib/site";
import { getManifest } from "@/lib/gallery";
import { getDict, localHref, type Locale } from "@/lib/i18n";

/* Re-check the photo store every minute so uploads from /admin
   appear without a redeploy. */
export const revalidate = 60;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).work.title };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = lang as Locale;
  const t = getDict(lang);
  const labels = t.work.labels as Record<string, string>;

  const manifest = await getManifest();
  // Built-in stock photos (minus any the admin hid) followed by uploads.
  const defaults: (GalleryItem & { anchor: string })[] = galleryMeta
    .filter((g) => !manifest.hidden.includes(g.slug))
    .map((g) => ({
      src: `/work/${g.slug}.jpg`,
      label: labels[g.slug] ?? g.slug,
      tint: g.tint,
      anchor: g.slug,
    }));
  const uploaded: (GalleryItem & { anchor: string })[] = manifest.uploaded.map(
    (g, i) => ({
      src: g.src,
      label: g.labelEn || g.pathname,
      tint: galleryMeta[i % galleryMeta.length].tint,
      anchor: g.pathname.split("/").pop()?.replace(/\.\w+$/, "") ?? `photo-${i}`,
    }),
  );
  const gallery = [...defaults, ...uploaded];

  return (
    <>
      <PageHero
        eyebrow={t.work.eyebrow}
        title={t.work.title}
        subtitle={t.work.subtitle}
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g) => (
            <Link
              key={g.src}
              id={g.anchor}
              href={`${localHref(locale, "/quote")}?product=${encodeURIComponent(g.label)}`}
              aria-label={`${t.common.getQuote}: ${g.label}`}
              className="scroll-mt-28"
            >
              <GalleryImage item={g} />
            </Link>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-line bg-paper-dim p-10 text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            {t.work.ctaTitle}
          </h2>
          <p className="max-w-lg text-ink-soft">{t.work.ctaBody}</p>
          <Link
            href={localHref(locale, "/quote")}
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            {t.work.ctaButton} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
