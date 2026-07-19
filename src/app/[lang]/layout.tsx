import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site } from "@/lib/site";
import { locales, isLocale, getDict, type Locale } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: {
      default: `${site.name} — You think, we ink`,
      template: `%s · ${site.shortName}`,
    },
    description: `${site.name}: the first computerised printing press in ${site.city}, ${site.region}, since ${site.founded}. Wedding cards, offset & digital printing, brochures, books and business stationery.`,
    alternates: {
      canonical: `/${lang}`,
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDict(lang);
  const locale = lang as Locale;

  return (
    <>
      <a href="#content" className="skip-link">
        {dict.common.skipToContent}
      </a>
      <Header lang={locale} dict={dict} />
      <main id="content" className="flex-1">{children}</main>
      <Footer lang={locale} dict={dict} />
      <WhatsAppFab lang={locale} dict={dict} />
    </>
  );
}
