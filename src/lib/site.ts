type Hour = { day: string; time: string; closed?: boolean };

export const site = {
  name: "Goenka Graphics & Printers",
  shortName: "Goenka Graphics",
  monogram: "GGP",
  tagline: "You think, we ink.",
  founded: 1995,
  city: "Palampur",
  region: "Himachal Pradesh",
  address: "Palampur – Dharamsala Bypass Rd, Berachah, Palampur, Himachal Pradesh 176061",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Goenka+Graphics+Printers+Palampur",
  phones: [
    { label: "94180 15739", raw: "919418015739" },
    { label: "98574 78312", raw: "919857478312" },
  ],
  whatsapp: "919418015739",
  hours: [
    { day: "Monday", time: "Closed", closed: true },
    { day: "Tuesday", time: "10 am – 2 pm, 3 – 6 pm" },
    { day: "Wednesday", time: "10 am – 2 pm, 3 – 6 pm" },
    { day: "Thursday", time: "10 am – 2 pm, 3 – 6 pm" },
    { day: "Friday", time: "10 am – 2 pm, 3 – 6 pm" },
    { day: "Saturday", time: "10 am – 2 pm, 3 – 6 pm" },
    { day: "Sunday", time: "10 am – 2 pm, 3 – 6 pm" },
  ] as Hour[],
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Our Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export type Service = {
  slug: string;
  title: string;
  icon: string;
  blurb: string;
  points: string[];
};

export const services: Service[] = [
  {
    slug: "wedding-cards",
    title: "Wedding & invitation cards",
    icon: "heart",
    blurb:
      "Elegant marriage cards designed and printed to order — from classic traditional styles to modern foil-and-emboss finishes.",
    points: ["Custom design & matter", "Foil, emboss & laser-cut options", "Matching envelopes & inserts"],
  },
  {
    slug: "offset-bulk",
    title: "Offset & bulk printing",
    icon: "stack",
    blurb:
      "High-volume offset printing for books, bill books and long runs, with consistent colour and crisp registration.",
    points: ["Books & bill books", "High-volume runs", "Sharp, consistent colour"],
  },
  {
    slug: "digital-print",
    title: "Digital & short-run printing",
    icon: "printer",
    blurb:
      "Fast, affordable digital printing for flyers, brochures and small quantities with quick turnaround.",
    points: ["Flyers & brochures", "Short runs, quick delivery", "Full-colour & B/W"],
  },
  {
    slug: "stationery",
    title: "Business stationery",
    icon: "id",
    blurb:
      "Letterheads, visiting cards, invoice & estimate books, ID cards and menus — everything your business runs on.",
    points: ["Letterheads & visiting cards", "Invoice & estimate books", "ID cards, menus & labels"],
  },
];
