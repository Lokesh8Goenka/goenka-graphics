import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";
import { getDict } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  return { title: getDict(lang).contact.title };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = getDict(lang);
  const c = t.contact;

  return (
    <>
      <PageHero eyebrow={c.eyebrow} title={c.title} subtitle={c.subtitle} />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4 rounded-2xl border border-line bg-card p-6">
              <MapPin className="mt-1 shrink-0 text-magenta" size={22} />
              <div>
                <h2 className="font-display text-lg font-semibold">
                  {c.visitTitle}
                </h2>
                <p className="mt-1 text-ink-soft">{site.address}</p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-sky hover:underline"
                >
                  {c.openInMaps}
                </a>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-line bg-card p-6">
              <Phone className="mt-1 shrink-0 text-sky" size={22} />
              <div>
                <h2 className="font-display text-lg font-semibold">
                  {c.callTitle}
                </h2>
                <ul className="mt-1 space-y-1">
                  {site.phones.map((p) => (
                    <li key={p.raw}>
                      <a
                        href={`tel:+${p.raw}`}
                        className="text-ink-soft hover:text-ink"
                      >
                        {p.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-line bg-card p-6">
              <MessageCircle className="mt-1 shrink-0 text-[#25D366]" size={22} />
              <div>
                <h2 className="font-display text-lg font-semibold">
                  {c.whatsappTitle}
                </h2>
                <p className="mt-1 text-ink-soft">{c.whatsappBody}</p>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white"
                >
                  <MessageCircle size={16} /> {t.common.chatWithUs}
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-flame" />
              <h2 className="font-display text-lg font-semibold">
                {c.hoursTitle}
              </h2>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {t.hours.map((h) => (
                <li
                  key={h.day}
                  className="flex items-center justify-between py-3 text-sm"
                >
                  <span className="text-ink">{h.day}</span>
                  <span
                    className={
                      h.closed ? "font-medium text-magenta" : "text-ink-soft"
                    }
                  >
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 overflow-hidden rounded-xl border border-line">
              <iframe
                title={site.name}
                src={site.mapEmbed}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
