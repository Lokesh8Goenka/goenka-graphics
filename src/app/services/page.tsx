import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ServiceIcon } from "@/components/ServiceIcon";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Wedding cards, offset & bulk printing, digital short-run printing and business stationery from Goenka Graphics & Printers, Palampur.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we print"
        title="Printing for every occasion and business"
        subtitle="One press, three decades of experience, and the flexibility to handle a single invitation or a full commercial run."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          {services.map((s) => (
            <div
              key={s.slug}
              className="rounded-2xl border border-line bg-white p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-paper-dim">
                <ServiceIcon name={s.icon} className="text-ink" size={24} />
              </div>
              <h2 className="mt-5 font-display text-2xl font-semibold">
                {s.title}
              </h2>
              <p className="mt-2 text-ink-soft">{s.blurb}</p>
              <ul className="mt-5 space-y-2">
                {s.points.map((p) => (
                  <li
                    key={p}
                    className="flex items-center gap-2 text-sm text-ink-soft"
                  >
                    <Check size={16} className="shrink-0 text-magenta" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-line bg-paper-dim p-10 text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Not sure which option fits your job?
          </h2>
          <p className="max-w-lg text-ink-soft">
            Tell us what you need and we&apos;ll recommend the right paper,
            process and quantity — with a clear price.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            Get a free quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
