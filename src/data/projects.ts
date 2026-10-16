export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  tag?: string;
  oneLiner: string;
  stack: string[];
  highlights: string[];
  link: string;
  image?: string;
  /** Screenshot width / height, so frames match it instead of cropping */
  aspect?: number;
  hover: string;
  accent: string;
  caseStudy?: {
    role: string;
    problem: string;
    built: string[];
    hardPart: { title: string; body: string };
    outcome: string[];
  };
};

export const featured: Project[] = [
  {
    slug: "idea",
    title: "IDEA",
    kind: "AI app builder",
    year: "2026",
    tag: "Beta",
    oneLiner: "Describe the app. Get the whole codebase.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "GPT", "Gemini", "Claude"],
    highlights: ["12 REST API routes", "JWT auth", "retry + output validation", "GPT, Gemini & Claude"],
    link: "https://ideabuilders.live/",
    image: "/work/idea-hero.webp",
    aspect: 1917 / 872,
    hover: "the one I'm most proud of.",
    accent: "#ff5b3a",
    caseStudy: {
      role: "Solo: product, design, full-stack",
      problem:
        "Most AI app builders hand you a pretty demo that falls apart the moment you clone it. Generated code that doesn't compile, imports that point nowhere, a backend that was never really there.",
      built: [
        "An AI platform that turns natural-language prompts into deployable full-stack applications using the GPT, Gemini and Claude APIs.",
        "12 REST API routes for authentication, prompt handling, code generation, validation and structured API responses.",
        "Retry logic, error handling and output validation checks on generated code, so broken output is caught before you see it.",
        "Templates, stack and database pickers, bring-your-own provider key, and export or clone of the full repository.",
      ],
      hardPart: {
        title: "Making generated code trustworthy",
        body:
          "A model will happily return code that doesn't run. IDEA treats every generation as untrusted: output is validated, errors are caught and handled, and failed generations are retried instead of being shown to you. That validate-and-retry loop cut invalid outputs by about 40%.",
      },
      outcome: [
        "~40% fewer invalid outputs reaching the user after the validate-and-retry pipeline",
        "12 REST API routes behind JWT auth",
        "Live in public beta at ideabuilders.live",
      ],
    },
  },
  {
    slug: "hackosquad",
    title: "HackoSquad",
    kind: "Cybersecurity learning platform",
    year: "2026",
    tag: "Internship",
    oneLiner: "Labs, challenges and learning paths for security learners, without the noise.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    highlights: ["8 features shipped", "3 delivery milestones", "15 issues resolved", "role-based access"],
    link: "https://www.hackosquad.com",
    image: "/work/hackosquad-hero.webp",
    aspect: 1901 / 813,
    hover: "security made simple.",
    accent: "#8b5cf6",
    caseStudy: {
      role: "Full Stack Developer Intern · Mar to Aug 2026",
      problem:
        "Security learners bounce between scattered blogs, videos and CTF sites. HackoSquad pulls labs, challenges and curated paths into one place, and needed to scale features fast without breaking what was already live.",
      built: [
        "8 production full-stack features across React, Node.js, Express, MongoDB and REST APIs, delivered over 3 milestones.",
        "10 reusable UI components and backend routes that cut repeated work across modules.",
        "Lab modules, role-based access and learner progress tracking.",
      ],
      hardPart: {
        title: "Fixing bugs without creating new ones",
        body:
          "With a 4-person team shipping into the same codebase, stability mattered as much as speed. I worked through 15 issues with a fixed loop: reproduce, find the root cause, fix, then validate against the surrounding flows. Git workflows, code reviews and feature documentation kept the code consistent across the team.",
      },
      outcome: [
        "8 features shipped across 3 milestones",
        "15 issues resolved through structured debugging",
        "Shared component and route library adopted across modules",
      ],
    },
  },
  {
    slug: "edisip",
    title: "Edisip",
    kind: "E-commerce for edible cups",
    year: "2025",
    oneLiner: "An online store for VMAC's edible cups and cutlery, from listing to checkout in one flow.",
    stack: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Razorpay"],
    highlights: ["6 core modules", "10 pages & endpoints", "payment gateway", "protected sessions"],
    link: "https://www.edisip.com",
    image: "/work/edisip-hero.webp",
    aspect: 1917 / 877,
    hover: "real payments, real users.",
    accent: "#8fbf4d",
    caseStudy: {
      role: "Full-stack developer",
      problem:
        "VMAC makes edible cups and cutlery (\"Edisip, made to munch\") and needed a store that felt as considered as the product, with payments and orders they could actually run a business on.",
      built: [
        "A complete store built from 6 core modules: products, cart, checkout, orders, users and dashboard.",
        "Payment gateway workflows with transaction APIs and order confirmation.",
        "10 frontend pages and backend endpoints for product management, data persistence, checkout and order processing.",
      ],
      hardPart: {
        title: "Payments and sessions you can trust",
        body:
          "Checkout touches money and accounts, so it can't be loose. Payments run through transaction APIs with order confirmation, and checkout, orders and the dashboard sit behind authentication and protected user sessions.",
      },
      outcome: ["Live at edisip.com", "6 modules from catalogue to dashboard", "End-to-end order and payment flow in production"],
    },
  },
  {
    slug: "uniconnect",
    title: "Uniconnect",
    kind: "University event platform",
    year: "2024",
    oneLiner: "End-to-end event management for campus clubs. One platform, every event.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    highlights: ["3 event workflows", "2 admin levels", "protected routes", "CSV exports"],
    link: "https://uniconnect-qs2s.onrender.com/",
    image: "/work/uniconnect-hero.webp",
    aspect: 1917 / 876,
    hover: "built for my campus.",
    accent: "#6366f1",
    caseStudy: {
      role: "Full-stack developer",
      problem:
        "Club events at MIT ADT lived in WhatsApp groups and Google Forms. Nobody had one view of what was happening, who registered, or how an event actually went.",
      built: [
        "A central home for clubs (AWS Cloud, GDSC, Cinemaniacs and more) with event pages and announcements.",
        "3 event workflows: event creation, student sign-ups and admin approvals.",
        "Role-based access for 2 admin levels using protected routes, REST APIs and permission-based controls.",
        "Digitised event updates, participant records, approval flows and dashboard operations, with CSV exports.",
      ],
      hardPart: {
        title: "Roles without the mess",
        body:
          "Students, club admins and super-admins use the same platform but must see different things. Protected routes and permission-based controls on the API keep each role to its own actions, and approval flows replace the manual tracking clubs used to do.",
      },
      outcome: ["3 event workflows digitised", "2 admin levels behind protected routes", "Manual tracking replaced for campus clubs"],
    },
  },
];

export const moreWork: Project[] = [
  {
    slug: "getmeachai",
    title: "GetMeAChai",
    kind: "Developer crowdfunding",
    year: "2024",
    oneLiner: "Buy-me-a-coffee for developers, with Razorpay webhooks and NextAuth OAuth.",
    stack: ["Next.js", "MongoDB", "Razorpay", "NextAuth"],
    highlights: [],
    link: "https://github.com/abhayraj2705/GetmeAchai",
    hover: "where I learned payments.",
    accent: "#f59e0b",
  },
  {
    slug: "smartkeep",
    title: "SmartKeep",
    kind: "AI notes",
    year: "2025",
    oneLiner: "Google Keep clone with voice input, auto-categorisation and summaries via Hugging Face.",
    stack: ["React", "Hugging Face"],
    highlights: [],
    link: "https://google-keep-clone-sepia.vercel.app",
    hover: "notes that sort themselves.",
    accent: "#facc15",
  },
  {
    slug: "file-manager",
    title: "File Manager",
    kind: "File management",
    year: "2025",
    oneLiner: "A one-stop app to upload, organise and manage files.",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    highlights: [],
    link: "https://filemanager-frontend-he7r.onrender.com/",
    hover: "everything in its place.",
    accent: "#38bdf8",
  },
];

export const getProject = (slug: string) => featured.find((p) => p.slug === slug);
