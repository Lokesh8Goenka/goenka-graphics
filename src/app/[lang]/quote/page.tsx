import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { PageHero } from "@/components/PageHero";
import { getDict } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).quote.title };
}

export default async function QuotePage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ product?: string }>;
}) {
  const { lang } = await params;
  const { product } = await searchParams;
  const t = getDict(lang);

  return (
    <>
      <PageHero
        eyebrow={t.quote.eyebrow}
        title={t.quote.title}
        subtitle={t.quote.subtitle}
      />
      <section className="mx-auto max-w-2xl px-5 py-14">
        <QuoteForm
          q={t.quote}
          products={t.services.items.map((i) => i.title)}
          initialProduct={product?.slice(0, 80)}
        />
      </section>
    </>
  );
}
