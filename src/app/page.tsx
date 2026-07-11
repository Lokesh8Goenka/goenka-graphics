import Link from "next/link";
import { ArrowRight, Phone, Upload, Check, Sparkles } from "lucide-react";
import { site, services } from "@/lib/site";
import { ServiceIcon } from "@/components/ServiceIcon";

const stats = [
  { value: "1995", label: "Printing since" },
  { value: "First", label: "Computerised press in the area" },
  { value: "30+", label: "Years of trust" },
  { value: "1000s", label: "Jobs delivered" },
];

const reasons = [
  {
    title: "Three decades of craft",
    body: "The family behind the area's first computerised press — we know paper, ink and finishing inside out.",
  },
  {
    title: "Design to delivery, in one place",
    body: "Bring an idea or a ready file. We handle design, pre-press, printing and finishing under one roof.",
  },
  {
    title: "Right for any run size",
    body: "50 wedding cards or 50,000 bill books — offset and digital together let us price and deliver either well.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pb-16 pt-20 text-center sm:pt-28">
          <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-paper-dim px-4 py-1.5 text-xs font-medium tracking-wide text-ink-soft">
            <Sparkles size={13} className="text-flame" />
            Est. {site.founded} · {site.city}, {site.region}
          </p>

          <h1 className="rise mx-auto mt-6 max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-7xl">
            You think,{" "}
            <span className="text-gradient italic">we ink.</span>
          </h1>

          <p className="rise mx-auto mt-6 max-w-xl text-lg text-ink-soft">
            The first computerised printing press in the tea-garden hills of
            Kangra — wedding cards, brochures and bulk printing, crafted with
            care for over three decades.
          </p>

          <div className="rise mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white shadow-sm transition-transform hover:scale-[1.03]"
            >
              Request a quote <ArrowRight size={16} />
            </Link>
            <a
              href={`tel:+${site.phones[0].raw}`}
              className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-paper-dim"
            >
              <Phone size={16} /> {site.phones[0].label}
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-y border-line bg-paper-dim">
          <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-line px-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="px-4 py-7 text-center">
                <div className="text-gradient font-display text-3xl font-semibold">
                  {s.value}
                </div>
                <div className="mt-1 text-xs text-ink-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              What we print
            </h2>
            <p className="mt-2 max-w-md text-ink-soft">
              From a single elegant invitation to a full commercial run.
            </p>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-ink"
          >
            All services <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <Link
              key={s.slug}
              href="/services"
              className="group rounded-2xl border border-line bg-white p-6 transition-all hover:-translate-y-1 hover:border-ink/15 hover:shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-paper-dim">
                <ServiceIcon name={s.icon} className="text-ink" size={22} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {s.blurb}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why us */}
      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            Why families and businesses in Palampur keep coming back
          </h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {reasons.map((r, i) => (
              <div key={r.title}>
                <div className="text-gradient font-display text-2xl font-semibold">
                  0{i + 1}
                </div>
                <hr className="brand-rule my-4 w-10" />
                <h3 className="font-display text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {r.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload / CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20">
        <div className="overflow-hidden rounded-3xl border border-line bg-ink text-paper">
          <div className="grid gap-8 p-10 sm:p-14 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="font-display text-3xl font-semibold text-paper sm:text-4xl">
                Have artwork ready? Send it over.
              </h2>
              <p className="mt-3 max-w-md text-paper/70">
                Share your file and a few details — we&apos;ll reply with a
                price and timeline. No account, no fuss.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-paper/80">
                {[
                  "Upload PDF, image or design files",
                  "Free quote, usually the same day",
                  "Pickup in Palampur or courier across India",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check size={16} className="text-flame" /> {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/quote"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
              >
                <Upload size={16} /> Upload &amp; get a quote
              </Link>
              <a
                href={`https://wa.me/${site.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-paper/25 px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-paper/10"
              >
                Or message us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
