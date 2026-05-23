import { motion } from "framer-motion";

const techStack = [
  "JavaScript", "TypeScript", "React.js", "Next.js", "Node.js", "Express.js",
  "MongoDB", "MySQL", "Tailwind CSS", "Docker", "Git", "REST APIs",
  "GPT-4o", "Claude", "Gemini", "JWT", "Sentry",
];

const marqueeItems = [...techStack, ...techStack];

export function TechMarquee() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="relative"
    >
      {/* Framing lines */}
      <div className="overflow-hidden py-5 border-y border-secondary/10 relative">
        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex marquee-track whitespace-nowrap">
          {marqueeItems.map((tech, i) => (
            <span key={i} className="inline-flex items-center">
              <span className="font-mono text-[12px] text-secondary/55 hover:text-accent transition-colors duration-300 lowercase select-none tracking-widest">
                {tech}
              </span>
              <span className="mx-5 text-accent/25 text-[6px] select-none">✦</span>
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
