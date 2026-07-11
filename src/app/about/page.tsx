import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Founded in 1995, Goenka Graphics & Printers was the first computerised printing press in Palampur, Kangra — a family business built on three decades of trust.",
};

const timeline = [
  {
    year: "1995",
    title: "A first for the area",
    body: "Goenka Graphics & Printers opens in Palampur as the very first computerised printing press in the region — bringing modern typesetting to the Kangra valley.",
  },
  {
    year: "2000s",
    title: "Growing with our customers",
    body: "From wedding cards to bill books and business stationery, word of mouth turns a small press into a name families and shops rely on.",
  },
  {
    year: "Today",
    title: "Offset meets digital",
    body: "We run offset and digital side by side, so we can deliver both premium short runs and large commercial volumes with the same care.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title="Three decades of ink, in the hills of Kangra"
        subtitle="A family printing press in Palampur — a town known for its tea gardens and mountain air — serving the community since 1995."
      />

      <section className="mx-auto max-w-3xl px-5 py-16">
        <div className="space-y-5 text-lg leading-relaxed text-ink-soft">
          <p>
            Our printing press sits in{" "}
            <span className="font-medium text-ink">Palampur</span>, a small town
            in the Kangra district of Himachal Pradesh — a place famous for its
            natural beauty and sprawling tea gardens.
          </p>
          <p>
            Founded in{" "}
            <span className="font-medium text-ink">1995</span>, Goenka Graphics
            &amp; Printers was the{" "}
            <span className="font-medium text-ink">
              first computerised printing press
            </span>{" "}
            in the area. What began as a bold step into modern printing has
            grown, over more than thirty years, into a business the community
            trusts for everything from the most important wedding card to the
            everyday bill book.
          </p>
          <p>
            We still believe the same thing we did on day one:{" "}
            <span className="text-gradient font-medium">you think, we ink.</span>{" "}
            Bring us your idea, and we&apos;ll bring it to paper.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-paper-dim">
        <div className="mx-auto max-w-4xl px-5 py-16">
          <div className="space-y-10">
            {timeline.map((t) => (
              <div key={t.year} className="grid gap-4 sm:grid-cols-[120px_1fr]">
                <div className="text-gradient font-display text-2xl font-semibold">
                  {t.year}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">
                    {t.title}
                  </h3>
                  <p className="mt-2 text-ink-soft">{t.body}</p>
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
          Come say hello, or start your job online
        </h2>
        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            Request a quote <ArrowRight size={16} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-6 py-3 text-sm font-medium text-ink hover:bg-paper-dim"
          >
            Visit &amp; contact
          </Link>
        </div>
      </section>
    </>
  );
}
