export const site = {
  name: "Goenka Graphics & Printers",
  shortName: "Goenka Graphics",
  monogram: "GGP",
  founded: 1995,
  city: "Palampur",
  region: "Himachal Pradesh",
  address: "Palampur – Dharamsala Bypass Rd, Berachah, Palampur, Himachal Pradesh 176061",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Goenka+Graphics+Printers+Palampur",
  mapEmbed:
    "https://www.google.com/maps?q=Palampur%20Dharamsala%20Bypass%20Rd%20Berachah%20Palampur%20176061&output=embed",
  phones: [
    { label: "94180 15739", raw: "919418015739" },
    { label: "98574 78312", raw: "919857478312" },
  ],
  whatsapp: "919418015739",
} as const;

export type NavKey = "home" | "services" | "work" | "about" | "contact";

export const navPaths: { key: NavKey; href: string }[] = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "work", href: "/work" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
];

/** Visual metadata for the portfolio grid. Labels come from the dictionary; src derives from slug. */
export const galleryMeta: { slug: string; tint: string }[] = [
  { slug: "wedding-card-1", tint: "from-magenta/15 to-flame/15" },
  { slug: "wedding-card-2", tint: "from-violet/15 to-magenta/15" },
  { slug: "wedding-card-3", tint: "from-flame/15 to-magenta/15" },
  { slug: "wedding-card-4", tint: "from-sky/15 to-violet/15" },
  { slug: "business-card", tint: "from-sky/15 to-flame/15" },
  { slug: "flyer", tint: "from-violet/15 to-sky/15" },
  { slug: "brochure", tint: "from-magenta/15 to-violet/15" },
  { slug: "bill-book", tint: "from-flame/15 to-sky/15" },
  { slug: "menu", tint: "from-violet/15 to-magenta/15" },
  { slug: "id-card", tint: "from-sky/15 to-magenta/15" },
  { slug: "letterhead", tint: "from-magenta/15 to-flame/15" },
  { slug: "book", tint: "from-flame/15 to-violet/15" },
];
