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
    year: "2023",
    items: [
      {
        title: "B.Tech, Computer Science & Engineering",
        org: "MIT ADT University, Pune",
        when: "2023 to 2027",
        note: "CGPA 8.96",
      },
    ],
  },
  {
    year: "2024",
    items: [
      { title: "First product with real payments", note: "GetMeAChai, with Razorpay, webhooks and OAuth." },
      { title: "Shipped Uniconnect", note: "A MERN platform for campus club events, with 2 admin levels and approval flows." },
    ],
  },
  {
    year: "2025",
    items: [
      {
        title: "Technical Team Member",
        org: "ACES Club · MIT ADT University",
        when: "Jan 2025 to Present",
        bullets: [
          "Delivered 3 digital systems for college events: websites, dashboards, registration tools and support apps.",
          "Kept 4 live web interfaces running with a 5-person team, testing features and fixing issues during 3 college events.",
        ],
      },
      { title: "Shipped Edisip", note: "A production e-commerce store with payments, built from 6 core modules." },
    ],
  },
  {
    year: "2026",
    items: [
      {
        title: "Full Stack Developer Intern",
        org: "HackoSquad",
        when: "Mar to Aug 2026",
        bullets: [
          "Shipped 8 production full-stack features (React, Node, Express, MongoDB, REST) across 3 delivery milestones.",
          "Found and fixed 15 bugs through structured testing and root-cause analysis, improving app stability.",
        ],
      },
      { title: "Launched IDEA", note: "An AI app builder that plans, generates and self-heals full-stack repos. Public beta." },
    ],
  },
  {
    year: "Next",
    items: [{ title: "Looking for an SDE role", note: "Graduating 2027. Backend, full-stack or AI-infra teams." }],
  },
];

export const certifications = [
  {
    title: "AWS Academy Graduate: Cloud Foundations",
    issuer: "Amazon Web Services",
    date: "Oct 2025",
    href: null as string | null,
  },
  {
    title: "Deloitte Australia: Cyber Job Simulation",
    issuer: "Forage",
    date: "Jul 2025",
    href: null as string | null,
  },
];
