import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { Splash } from "@/components/Splash";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://goenka-graphics.vercel.app"),
  title: `${site.name} — You think, we ink`,
  description: `${site.name}: the first computerised printing press in ${site.city}, ${site.region}, since ${site.founded}.`,
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: `${site.name} — You think, we ink`,
    description: `The first computerised printing press in ${site.city}, ${site.region}, since ${site.founded}.`,
    type: "website",
    images: [{ url: "/logo-wide.png", width: 555, height: 450, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/logo-wide.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');var p=location.pathname.split('/')[1];if(p==='hi'||p==='en')document.documentElement.lang=p;}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Splash />
        {children}
      </body>
    </html>
  );
}
