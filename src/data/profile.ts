export const profile = {
  name: "Abhayraj B",
  nameDeva: "अभयराज",
  cityDeva: "पुणे",
  city: "Pune",
  country: "India",
  coords: "18.52°N 73.85°E",
  timezone: "Asia/Kolkata",
  role: "Full-stack engineer",
  kicker: ["Full-stack engineer", "AI systems", "Pune, IN"],
  status: "Open to opportunities",
  email: "abhayraj27052005@gmail.com",
  // Set NEXT_PUBLIC_SITE_URL in Vercel once you have a custom domain.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-revamp-three-theta.vercel.app",
  // Résumé button stays hidden until public/resume.pdf exists — flip this when you add it.
  resume: null as string | null,
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abhayraj-b-474890293/" },
    { label: "GitHub", href: "https://github.com/abhayraj2705" },
  ],
  headline: {
    before: "I build",
    rotating: ["products", "AI tools", "payment flows", "platforms", "anything."],
    after: "people actually use.",
  },
  sub: "CS undergrad at MIT ADT University. I ship full-stack products — from GenAI app builders to payment platforms — with React, Next.js, Node and MongoDB.",
  stats: [
    { value: 8, suffix: "", label: "features shipped as an intern" },
    { value: 4, suffix: "+", label: "production apps live" },
    { value: 40, prefix: "~", suffix: "%", label: "fewer invalid AI outputs" },
    { value: 8.96, suffix: "", label: "CGPA", decimals: 2 },
  ],
  about: {
    title: "The person behind the commits.",
    statement:
      "I'm a computer science undergrad in Pune who likes the unglamorous parts of building — auth flows, payment webhooks, retry pipelines — the parts that decide whether an idea actually works. Lately I've been wiring models like GPT-4o and Claude into real products, and learning exactly where they break.",
    beliefs: [
      "Ship it, then make it beautiful. Then ship it again.",
      "The boring backend is the product.",
      "AI is a component, not a feature. Validate everything it hands you.",
    ],
    lookingFor: ["Teams that ship weekly", "Hard backend & AI-infra problems", "People who review code kindly"],
  },
} as const;

export type Stat = {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};
