import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
};

export function Experience() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">experience</h2>
        
        <motion.div 
          className="space-y-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div 
            variants={itemVariants}
            className="group py-4 px-4 -mx-4 rounded-lg hover:bg-muted/20 transition-all duration-300"
          >
            <div className="flex items-baseline justify-between mb-1.5">
              <span className="font-medium text-primary text-[1.08rem] lowercase">technical team member</span>
              <span className="text-xs font-mono text-secondary/50 lowercase">jan 2025 – present</span>
            </div>
            <p className="text-secondary text-[0.95rem] lowercase mb-3 font-mono">
              aces club · mit adt university, pune
            </p>
            <ul className="space-y-2 text-[1rem] text-primary/70 lowercase leading-relaxed">
              <li className="flex gap-2.5">
                <span className="text-accent/50 mt-[2px] flex-shrink-0 text-xs">▸</span>
                <span>built internal tools and websites with a 5-member team, used by 200+ students across campus.</span>
              </li>
              <li className="flex gap-2.5">
                <span className="text-accent/50 mt-[2px] flex-shrink-0 text-xs">▸</span>
                <span>shipped technical solutions for 3+ university events — improved registration flow and engagement.</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
