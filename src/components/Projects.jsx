import { useRef, useState } from "react";
import { motion } from "framer-motion";


const projects = [
  {
    title: "idea",
    subtitle: "genai full-stack app builder",
    date: "2026",
    description: "type a prompt, get a working full-stack app. built a genai platform that generates, validates, and previews complete applications — with a 40% drop in invalid outputs via automated retry pipelines.",
    link: "https://github.com/abhayraj2705",
    tags: ["next.js", "node.js", "gpt-4o", "claude", "sandpack"],
    highlights: ["10+ api endpoints", "jwt auth", "live preview"],
    color: "#7c3aed"
  },

  {
    title: "hackosquad",
    subtitle: "cybersecurity learning platform",
    date: "2025",
    description: "end-to-end platform for cybersecurity learners — covers labs, challenges, and curated learning paths. built to make security concepts accessible without the usual noise of scattered resources.",
    link: "https://www.hackosquad.com",
    tags: ["react", "node.js", "express", "mongodb", "jwt"],
    highlights: ["role-based access", "lab modules", "progress tracking"],
    color: "#0f172a"
  },
  {
    title: "edisip",
    subtitle: "full-stack ecommerce platform",
    date: "2025",
    description: "complete ecommerce solution from product listing to checkout — handles cart management, order tracking, and payments in one cohesive flow. designed for performance and a smooth user experience end-to-end.",
    link: "https://www.edisip.com",
    tags: ["next.js", "node.js", "mongodb", "razorpay", "express"],
    highlights: ["cart & checkout", "order management", "payment gateway"],
    color: "#0d9488"
  },
  {
    title: "uniconnect",
    subtitle: "university event platform",
    date: "2025",
    description: "end-to-end event management for university clubs. role-based access (user → admin → super-admin), real-time registration tracking, and csv exports for analytics.",
    link: "https://uniconnect-qs2s.onrender.com/",
    tags: ["react", "node.js", "mongodb", "express"],
    highlights: ["15+ endpoints", "rbac system", "csv export"],
    color: "#059669"
  },
  {
    title: "getmeachai",
    subtitle: "developer crowdfunding",
    date: "2024",
    description: "a buy-me-a-coffee style platform for developers. integrated razorpay for secure payments with webhook verification and oauth via nextauth.",
    link: "https://github.com/abhayraj2705",
    tags: ["next.js", "razorpay", "mongodb", "nextauth"],
    highlights: ["payment webhooks", "oauth flow", "real-time txns"],
    color: "#f59e0b"
  },

];

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glow-card p-5 block group"
    >
      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-baseline justify-between w-full mb-1">
          <span className="text-[1.1rem] font-medium lowercase group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
            {project.title}
            <svg className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-60 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </span>
          <span className="text-xs text-secondary/40 font-mono lowercase">{project.date}</span>
        </div>

        <p className="text-secondary/50 text-xs font-mono lowercase mb-3">{project.subtitle}</p>

        <p className="text-primary/75 text-[1.02rem] leading-[1.7] lowercase mb-3">
          {project.description}
        </p>

        {/* Highlights */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-mono text-accent/60 lowercase mb-3">
          {project.highlights.map(h => (
            <span key={h} className="flex items-center gap-1">
              <span className="text-accent/30">›</span> {h}
            </span>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span key={tag} className="tag-box font-mono text-secondary/60 text-[10px]">{tag}</span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}

export function Projects() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">builds</h2>

        <div className="space-y-4">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <a href="https://github.com/abhayraj2705" target="_blank" rel="noreferrer" className="link-underline font-medium text-primary lowercase text-[1rem] inline-flex items-center gap-1.5">
            view all projects on github
            <span className="text-accent text-sm">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
