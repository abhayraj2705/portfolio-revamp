export const disciplines = [
  {
    id: "product",
    label: "Product engineering",
    line: "Interfaces that feel fast because they are fast.",
    skills: ["React", "Next.js", "TypeScript", "JavaScript", "HTML5 / CSS3", "Tailwind CSS", "GSAP", "Responsive, accessible UI"],
  },
  {
    id: "ai",
    label: "AI integration",
    line: "Models are unreliable collaborators. I build the guardrails.",
    skills: ["GPT", "Claude", "Gemini", "Hugging Face", "Prompt pipelines", "Output validation & retries", "Structured API responses"],
  },
  {
    id: "backend",
    label: "Backend & infra",
    line: "The boring part that decides whether it works.",
    skills: ["Node.js", "Express", "REST APIs", "MongoDB / Mongoose", "MySQL / SQL", "JWT / NextAuth / RBAC", "Razorpay + webhooks", "Docker", "AWS", "Git, Postman"],
  },
] as const;

export const process = [
  { n: "01", title: "Understand the problem", body: "Who's it for, what breaks today, and what does done look like." },
  { n: "02", title: "Model the data & flows", body: "Schemas, roles and edge cases before screens." },
  { n: "03", title: "Ship, measure, iterate", body: "Small releases, real users, then make it beautiful." },
];

export const marquee = {
  top: ["React", "Next.js", "TypeScript", "Node.js", "Express", "MongoDB", "MySQL", "C++", "Python", "Tailwind"],
  bottom: ["GPT", "Claude", "Gemini", "Hugging Face", "Razorpay", "JWT", "Docker", "AWS", "Postman", "Git"],
};
