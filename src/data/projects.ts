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
    stack: ["Next.js", "Node.js", "GPT-4o", "Claude", "Sandpack"],
    highlights: ["plan → generate → compile → self-heal", "10+ API endpoints", "JWT auth", "live preview"],
    link: "https://ideabuilders.live/",
    image: "/work/idea-hero.webp",
    hover: "the one I'm most proud of.",
    accent: "#ff5b3a",
    caseStudy: {
      role: "Solo — product, design, full-stack",
      problem:
        "Most AI app builders hand you a pretty demo that falls apart the moment you clone it. Generated code that doesn't compile, imports that point nowhere, a backend that was never really there.",
      built: [
        "A planning step that turns one prompt into a project spec — routes, data models, stack — before a single file is written.",
        "File-by-file generation with GPT-4o and Claude, streamed into a live Sandpack preview.",
        "A compile → validate → heal loop: every output is type-checked and linted, and failures are fed back to the model with the exact error until the build is green.",
        "Templates, stack and database pickers, bring-your-own provider key, and one-click export / clone of the full repository.",
      ],
      // DRAFT: written from the project summary. Confirm the technical details before publishing.
      hardPart: {
        title: "Making the model fix its own mistakes",
        body:
          "Blind retries just reproduce the same bug. The pipeline instead classifies each failure (syntax, missing import, type mismatch, runtime), attaches the smallest relevant context, and asks for a targeted patch rather than a full rewrite. Capped retries and per-file checkpoints keep a single bad file from sinking the whole generation.",
      },
      outcome: [
        "~40% fewer invalid outputs reaching the user after the validate-and-retry pipeline",
        "10+ REST endpoints behind JWT auth",
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
    oneLiner: "Labs, challenges and learning paths for security learners — without the noise.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
    highlights: ["8 features shipped", "3 delivery milestones", "15 issues resolved", "role-based access"],
    link: "https://www.hackosquad.com",
    hover: "security made simple.",
    accent: "#4ade80",
    caseStudy: {
      role: "Full Stack Developer Intern · Mar – Aug 2026",
      problem:
        "Security learners bounce between scattered blogs, videos and CTF sites. HackoSquad pulls labs, challenges and curated paths into one place — and needed to scale features fast without breaking what was already live.",
      built: [
        "8 production full-stack features across React, Node.js, Express, MongoDB and REST APIs, delivered over 3 milestones.",
        "10 reusable UI components and backend routes that cut repeated work across modules.",
        "Lab modules, role-based access and learner progress tracking.",
      ],
      // DRAFT: written from the project summary. Confirm the technical details before publishing.
      hardPart: {
        title: "Fixing bugs without creating new ones",
        body:
          "With a 4-person team shipping into the same codebase, stability mattered as much as speed. I worked through 15 issues with a fixed loop — reproduce, find the root cause, fix, then validate against the surrounding flows — and documented each feature for code review.",
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
    oneLiner: "An online store for VMAC's edible cups and cutlery — listing to checkout in one flow.",
    stack: ["Next.js", "Node.js", "Express", "MongoDB", "Razorpay"],
    highlights: ["cart & checkout", "order management", "payment gateway"],
    link: "https://www.edisip.com",
    image: "/work/edisip-hero.webp",
    hover: "real payments, real users.",
    accent: "#8fbf4d",
    caseStudy: {
      role: "Full-stack developer",
      problem:
        "VMAC makes edible cups and cutlery (\"Edisip — made to munch\") and needed a store that felt as considered as the product, with payments and orders they could actually run a business on.",
      built: [
        "Product catalogue, cart and checkout as one continuous flow.",
        "Razorpay integration with server-side order creation and signature verification.",
        "Order tracking for customers and order management for the team.",
      ],
      // DRAFT: written from the project summary. Confirm the technical details before publishing.
      hardPart: {
        title: "Payments you can trust",
        body:
          "The client never decides what was paid. Orders are created server-side, Razorpay signatures are verified before an order is marked paid, and the cart is re-priced on the server at checkout so a tampered client can't change totals.",
      },
      outcome: ["Live at edisip.com", "End-to-end order and payment flow in production"],
    },
  },
  {
    slug: "uniconnect",
    title: "Uniconnect",
    kind: "University event platform",
    year: "2025",
    oneLiner: "End-to-end event management for campus clubs — one platform, every event.",
    stack: ["React", "Node.js", "Express", "MongoDB"],
    highlights: ["15+ endpoints", "3-tier RBAC", "CSV exports"],
    link: "https://uniconnect-qs2s.onrender.com/",
    image: "/work/uniconnect-hero.webp",
    hover: "built for my campus.",
    accent: "#6366f1",
    caseStudy: {
      role: "Full-stack developer",
      problem:
        "Club events at MIT ADT lived in WhatsApp groups and Google Forms. Nobody had one view of what was happening, who registered, or how an event actually went.",
      built: [
        "A central home for clubs (AWS Cloud, GDSC, Cinemaniacs and more) with event pages and announcements.",
        "Role-based access across user → admin → super-admin.",
        "Real-time registration tracking and CSV exports for club analytics.",
      ],
      // DRAFT: written from the project summary. Confirm the technical details before publishing.
      hardPart: {
        title: "Three roles, one API",
        body:
          "15+ endpoints serve three very different audiences. Permissions live in middleware rather than in each route, so a club admin can manage their own events without ever seeing another club's data, and super-admins get the full picture.",
      },
      outcome: ["15+ REST endpoints", "3-tier RBAC", "Used for real club events on campus"],
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
