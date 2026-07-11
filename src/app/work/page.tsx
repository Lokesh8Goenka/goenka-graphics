import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { GalleryImage, type GalleryItem } from "@/components/GalleryImage";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "A gallery of printing work by Goenka Graphics & Printers — wedding cards, business cards, flyers, brochures, bill books, menus and more.",
};

const gallery: GalleryItem[] = [
  { src: "/work/wedding-card-1.jpg", label: "Wedding cards", tint: "from-magenta/15 to-flame/15" },
  { src: "/work/wedding-card-2.jpg", label: "Wedding cards", tint: "from-violet/15 to-magenta/15" },
  { src: "/work/wedding-card-3.jpg", label: "Foil & laser-cut cards", tint: "from-flame/15 to-magenta/15" },
  { src: "/work/wedding-card-4.jpg", label: "Wedding invitations", tint: "from-sky/15 to-violet/15" },
  { src: "/work/business-card.jpg", label: "Business cards", tint: "from-sky/15 to-flame/15" },
  { src: "/work/flyer.jpg", label: "Flyers & posters", tint: "from-violet/15 to-sky/15" },
  { src: "/work/brochure.jpg", label: "Brochures", tint: "from-magenta/15 to-violet/15" },
  { src: "/work/bill-book.jpg", label: "Bill & invoice books", tint: "from-flame/15 to-sky/15" },
  { src: "/work/menu.jpg", label: "Menus", tint: "from-violet/15 to-magenta/15" },
  { src: "/work/id-card.jpg", label: "ID & lanyard cards", tint: "from-sky/15 to-magenta/15" },
  { src: "/work/letterhead.jpg", label: "Letterheads", tint: "from-magenta/15 to-flame/15" },
  { src: "/work/book.jpg", label: "Books", tint: "from-flame/15 to-violet/15" },
];

export default function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title="Printed with care, delivered with pride"
        subtitle="A glimpse of the range we produce — from elegant wedding invitations to everyday business stationery."
      />

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {gallery.map((g) => (
            <GalleryImage key={g.src} item={g} />
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center gap-4 rounded-2xl border border-line bg-paper-dim p-10 text-center">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Want to see samples of a specific product?
          </h2>
          <p className="max-w-lg text-ink-soft">
            Message us and we&apos;ll share photos and options for exactly the
            kind of job you have in mind.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 rounded-full bg-brand-gradient px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-[1.03]"
          >
            Ask for samples &amp; a quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  );
}
