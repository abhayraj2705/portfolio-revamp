export type TimelineEntry = {
  year: string;
  items: {
    title: string;
    org?: string;
    when?: string;
    bullets?: string[];
    note?: string;
  }[];
};

export const timeline: TimelineEntry[] = [
  {
    year: "2026",
    items: [
      {
        title: "Full Stack Developer Intern",
        org: "HackoSquad",
        when: "Mar – Aug 2026",
        bullets: [
          "Shipped 8 production full-stack features (React, Node, Express, MongoDB, REST) across 3 delivery milestones.",
          "Found and fixed 15 bugs through structured testing and root-cause analysis, improving app stability.",
        ],
      },
      { title: "Launched IDEA", note: "An AI app builder that plans, generates and self-heals full-stack repos. Public beta." },
    ],
  },
  {
    year: "2025",
    items: [
      {
        title: "Technical Team Member",
        org: "ACES Club · MIT ADT University",
        when: "Jan 2025 – Present",
        bullets: [
          "Built internal tools and websites with a 5-person team, used by 200+ students.",
          "Shipped technical solutions for 3+ university events, improving registration flow and engagement.",
        ],
      },
      { title: "Shipped Uniconnect and Edisip", note: "Campus event platform and a production e-commerce store." },
    ],
  },
  {
    year: "2024",
    items: [{ title: "First product with real payments", note: "GetMeAChai — Razorpay, webhooks, OAuth." }],
  },
  {
    year: "2023",
    items: [
      {
        title: "B.Tech, Computer Science & Engineering",
        org: "MIT ADT University, Pune",
        when: "2023 – 2027",
        note: "CGPA 8.96",
      },
    ],
  },
  {
    year: "Next",
    items: [{ title: "Looking for an SDE role", note: "Graduating 2027. Backend, full-stack or AI-infra teams." }],
  },
];

export const certifications = [
  {
    title: "AWS Academy Graduate — Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "Oct 2025",
    href: null as string | null,
  },
  {
    title: "Deloitte Australia — Cyber Job Simulation",
    issuer: "Forage",
    date: "Jul 2025",
    href: null as string | null,
  },
];
