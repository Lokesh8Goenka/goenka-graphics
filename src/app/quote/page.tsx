import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Get a Quote",
  description:
    "Request a free printing quote from Goenka Graphics & Printers. Tell us about your job and we'll reply with a price and timeline.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero
        eyebrow="Free & no obligation"
        title="Get a quote"
        subtitle="Tell us what you'd like printed. We usually reply the same day with a price and timeline — and you can attach your artwork on WhatsApp."
      />
      <section className="mx-auto max-w-2xl px-5 py-14">
        <QuoteForm />
      </section>
    </>
  );
}
