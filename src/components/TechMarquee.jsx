import { motion } from "framer-motion";

const techStack = [
  "JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "Express.js",
  "MongoDB", "MySQL", "Tailwind CSS", "Docker", "Git", "REST APIs",
  "GPT-4o", "Claude", "Gemini", "JWT", "Sentry",
  "JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "Express.js",
  "MongoDB", "MySQL", "Tailwind CSS", "Docker", "Git", "REST APIs",
  "GPT-4o", "Claude", "Gemini", "JWT", "Sentry",
];

export function TechMarquee() {
  return (
    <div className="overflow-hidden py-4 relative">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex marquee-track whitespace-nowrap">
          {techStack.map((tech, i) => (
            <span 
              key={i} 
              className="mx-5 text-xs font-mono text-secondary/35 hover:text-accent/70 transition-colors duration-300 lowercase select-none tracking-wide"
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
