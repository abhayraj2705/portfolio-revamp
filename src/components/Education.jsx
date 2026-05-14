import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export function Education() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">education</h2>
        
        <motion.div 
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="group py-4 px-4 -mx-4 rounded-lg hover:bg-muted/20 transition-all duration-300"
        >
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="font-medium text-primary text-[1.08rem] lowercase">mit adt university</span>
            <span className="text-xs font-mono text-secondary/50 lowercase">2023 – 2027</span>
          </div>
          <p className="text-secondary text-[0.95rem] lowercase font-mono mb-1">
            b.tech in computer science and engineering
          </p>
          <p className="text-secondary/60 text-[0.9rem] lowercase font-mono">
            pune, india · cgpa: <span className="text-accent font-medium">8.96</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
