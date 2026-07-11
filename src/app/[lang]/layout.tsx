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
  const isHi = lang === "hi";
  return {
    title: {
      default: isHi
        ? `${site.name} — आप सोचिए, छपाई हम पर`
        : `${site.name} — You think, we ink`,
      template: `%s · ${site.shortName}`,
    },
    description: isHi
      ? `${site.name}: पालमपुर, हिमाचल का पहला कंप्यूटराइज़्ड प्रिंटिंग प्रेस, 1995 से। शादी के कार्ड, ऑफसेट और डिजिटल प्रिंटिंग, ब्रोशर, किताबें और बिज़नेस स्टेशनरी।`
      : `${site.name}: the first computerised printing press in ${site.city}, ${site.region}, since ${site.founded}. Wedding cards, offset & digital printing, brochures, books and business stationery.`,
    alternates: {
      canonical: `/${lang}`,
      languages: { en: "/en", hi: "/hi" },
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
      <Header lang={locale} dict={dict} />
      <main className="flex-1">{children}</main>
      <Footer lang={locale} dict={dict} />
      <WhatsAppFab lang={locale} dict={dict} />
    </>
  );
}
