import type { Metadata } from "next";
import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Visit or call Goenka Graphics & Printers in Palampur. ${site.address}. Open Tuesday to Sunday, closed Mondays.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title="We'd love to hear about your project"
        subtitle="Call, message on WhatsApp, or drop by the press in Palampur. We're happy to help you figure out the best way to print your job."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="flex gap-4 rounded-2xl border border-line bg-white p-6">
              <MapPin className="mt-1 shrink-0 text-magenta" size={22} />
              <div>
                <h2 className="font-display text-lg font-semibold">Visit us</h2>
                <p className="mt-1 text-ink-soft">{site.address}</p>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-sky hover:underline"
                >
                  Open in Google Maps →
                </a>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl border border-line bg-white p-6">
              <Phone className="mt-1 shrink-0 text-sky" size={22} />
              <div>
                <h2 className="font-display text-lg font-semibold">Call us</h2>
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

            <div className="flex gap-4 rounded-2xl border border-line bg-white p-6">
              <MessageCircle className="mt-1 shrink-0 text-[#25D366]" size={22} />
              <div>
                <h2 className="font-display text-lg font-semibold">WhatsApp</h2>
                <p className="mt-1 text-ink-soft">
                  The quickest way to reach us and share files.
                </p>
                <a
                  href={`https://wa.me/${site.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white"
                >
                  <MessageCircle size={16} /> Chat with us
                </a>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-center gap-2">
              <Clock size={20} className="text-flame" />
              <h2 className="font-display text-lg font-semibold">
                Opening hours
              </h2>
            </div>
            <ul className="mt-4 divide-y divide-line">
              {site.hours.map((h) => (
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
                title="Map to Goenka Graphics & Printers, Palampur"
                src="https://www.google.com/maps?q=Palampur%20Dharamsala%20Bypass%20Rd%20Berachah%20Palampur%20176061&output=embed"
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
