import { motion } from "framer-motion";

const writings = [
  { date: "april 5, 2026", title: "fix ec2 freezing during next.js build", link: "#" },
  { date: "march 16, 2026", title: "build mcp servers in under a minute with the mcp builder skill", link: "#" },
  { date: "march 12, 2026", title: "connect claude to your groww account: the python mcp server guide", link: "#" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }
};

export function Writings() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <h2 className="section-title">writings</h2>
        
        <motion.div 
          className="space-y-1"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {writings.map((w, i) => (
            <motion.a 
              key={i} 
              href={w.link}
              variants={itemVariants}
              className="group grid grid-cols-[130px_1fr] sm:grid-cols-[150px_1fr] gap-4 text-[1.05rem] lowercase py-2.5 px-3 -mx-3 rounded-lg hover:bg-muted/30 transition-all duration-300"
            >
              <span className="text-secondary/70 font-mono text-sm self-center group-hover:text-accent/70 transition-colors">{w.date}</span>
              <span className="font-medium text-primary group-hover:text-accent transition-colors duration-300 flex items-center gap-2">
                {w.title}
                <svg className="w-3.5 h-3.5 opacity-0 -translate-x-2 group-hover:opacity-70 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </span>
            </motion.a>
          ))}
          
          <motion.div variants={itemVariants} className="mt-6 pt-2">
            <a href="#" className="link-underline font-medium text-primary lowercase text-[1.05rem] inline-flex items-center gap-1.5">
              read all writings
              <span className="text-accent">→</span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
