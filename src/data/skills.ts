export const disciplines = [
  {
    id: "product",
    label: "Product engineering",
    line: "Interfaces that feel fast because they are fast.",
    skills: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Motion / GSAP", "Accessible, responsive UI"],
  },
  {
    id: "ai",
    label: "AI integration",
    line: "Models are unreliable collaborators. I build the guardrails.",
    skills: ["GPT-4o", "Claude", "Gemini", "Hugging Face", "Prompt pipelines", "Validate & retry loops", "Sandpack previews"],
  },
  {
    id: "backend",
    label: "Backend & infra",
    line: "The boring part that decides whether it works.",
    skills: ["Node.js", "Express", "FastAPI", "MongoDB", "REST design", "JWT / NextAuth / RBAC", "Razorpay + webhooks", "AWS", "Vercel / Render", "Git workflows"],
  },
] as const;

export const process = [
  { n: "01", title: "Understand the problem", body: "Who's it for, what breaks today, and what does done look like." },
  { n: "02", title: "Model the data & flows", body: "Schemas, roles and edge cases before screens." },
  { n: "03", title: "Ship, measure, iterate", body: "Small releases, real users, then make it beautiful." },
];

export const marquee = {
  top: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind", "GSAP", "FastAPI", "Python"],
  bottom: ["GPT-4o", "Claude", "Gemini", "Hugging Face", "Razorpay", "NextAuth", "JWT", "AWS", "Vercel", "Git"],
};
