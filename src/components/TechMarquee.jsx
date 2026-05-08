import { motion } from "framer-motion";

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion",
  "MongoDB", "PostgreSQL", "Python", "Docker", "AWS", "Figma",
  "React", "Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Framer Motion",
  "MongoDB", "PostgreSQL", "Python", "Docker", "AWS", "Figma",
];

export function TechMarquee() {
  return (
    <div className="overflow-hidden py-6 relative">
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex marquee-track whitespace-nowrap">
          {techStack.map((tech, i) => (
            <span 
              key={i} 
              className="mx-4 text-sm font-mono text-secondary/50 hover:text-accent transition-colors lowercase select-none"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
