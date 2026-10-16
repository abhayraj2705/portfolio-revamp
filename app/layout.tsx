import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif, Noto_Serif_Devanagari } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { profile } from "@/data/profile";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Nav } from "@/components/chrome/Nav";
import { LazyChrome } from "@/components/chrome/LazyChrome";
import { RouteWatcher } from "@/components/chrome/TransitionLink";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });
const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument",
  display: "swap",
});
const deva = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: "500",
  variable: "--font-deva",
  display: "swap",
  preload: false,
});

const title = `${profile.name}: Full-stack engineer, Pune`;
const description =
  "Full-stack & AI engineer in Pune building production apps with React, Next.js, Node and LLMs. Creator of IDEA, an AI app builder.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.url),
  title: { default: title, template: `%s · ${profile.name}` },
  description,
  authors: [{ name: profile.name, url: profile.url }],
  openGraph: { type: "website", title, description, url: "/", siteName: profile.name, locale: "en_IN" },
  twitter: { card: "summary_large_image", title, description },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0908" },
    { media: "(prefers-color-scheme: light)", color: "#f4efe7" },
  ],
};

// Runs before paint: theme, motion preference and whether to skip the intro loader.
const prePaint = `(function(){var d=document.documentElement;d.classList.add('js');function g(s,k){try{return s.getItem(k)}catch(e){return null}}
var t=g(localStorage,'theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}d.dataset.theme=t;
var m=g(localStorage,'motion');if(m!=='on'&&m!=='off'){m=matchMedia('(prefers-reduced-motion: reduce)').matches?'off':'on'}d.dataset.motion=m;
if(g(sessionStorage,'intro-seen')||m==='off'||location.pathname!=='/'){d.dataset.intro='skip'}})()`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.nameDeva,
  jobTitle: "Full-stack engineer",
  url: profile.url,
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: profile.city, addressCountry: "IN" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "MIT ADT University" },
  knowsAbout: ["React", "Next.js", "Node.js", "MongoDB", "LLM integration", "Full-stack development"],
  sameAs: profile.socials.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      data-motion="on"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable} ${deva.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: prePaint }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[200] rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <SiteProvider>
          <SmoothScroll />
          <RouteWatcher />
          <ScrollProgress />
          <Nav />
          <main id="main">{children}</main>
          <LazyChrome />
        </SiteProvider>
        <div className="grain" aria-hidden />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
