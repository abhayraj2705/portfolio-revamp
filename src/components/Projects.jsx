import { useRef } from "react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "frameseek",
    date: "may 7, 2026",
    description: "an ai-powered electron desktop application for local media analysis and semantic video search.",
    link: "#",
    tags: ["electron", "react 19", "gemini ai", "vectra db"],
    color: "#059669"
  },
  {
    title: "portfolio v2",
    date: "may 2026",
    description: "a minimalist digital garden portfolio built with modern web technologies and premium interactions.",
    link: "#",
    tags: ["react", "tailwind v4", "framer motion"],
    color: "#7c3aed"
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
      ref={cardRef}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="glow-card p-5 block group"
    >
      <div className="relative z-10 flex flex-col sm:flex-row gap-5 items-start">
        {/* Color accent strip */}
        <div 
          className="w-full sm:w-1/3 aspect-[16/10] rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${project.color}15, ${project.color}08)` }}
        >
          <div 
            className="absolute inset-0 opacity-20"
            style={{ 
              backgroundImage: `radial-gradient(circle at 30% 40%, ${project.color}40 0%, transparent 60%)` 
            }}
          />
          <span className="text-4xl font-serif italic opacity-30 select-none" style={{ color: project.color }}>
            {project.title[0]}
          </span>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-baseline justify-between w-full">
            <span className="text-lg font-medium lowercase group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
              {project.title}
              <svg className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-300" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </span>
            <span className="text-xs text-secondary/60 font-mono lowercase">{project.date}</span>
          </div>
          
          <p className="text-secondary text-[1.02rem] leading-relaxed lowercase">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags.map(tag => (
              <span key={tag} className="tag-box font-mono text-secondary/80">{tag}</span>
            ))}
          </div>
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
        
        <div className="space-y-6">
          {projects.map((project, i) => (
            <ProjectCard key={i} project={project} index={i} />
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <a href="#" className="link-underline font-medium text-primary lowercase text-[1.05rem] inline-flex items-center gap-1.5">
            view all projects
            <span className="text-accent">→</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
