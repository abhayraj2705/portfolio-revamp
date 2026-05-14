import { motion } from "framer-motion";

const highlights = [
  "cgpa of 8.96 — balancing academics with building production apps.",
  "cut invalid ai outputs by ~40% with custom validation pipelines.",
  "hands-on with gpt-4o, claude, gemini — wired into real products.",
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export function Achievements() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">highlights</h2>

        <motion.div
          className="space-y-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group flex gap-3 items-start text-[1rem] lowercase py-2.5 px-4 -mx-4 rounded-lg hover:bg-muted/20 transition-all duration-300 leading-[1.7]"
            >
              <span className="text-accent/40 mt-[3px] text-[10px] font-mono flex-shrink-0 group-hover:text-accent/70 transition-colors">✦</span>
              <span className="text-primary/80 group-hover:text-primary transition-colors">{item}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
