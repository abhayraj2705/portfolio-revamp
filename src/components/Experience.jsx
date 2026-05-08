import { motion } from "framer-motion";

const experiences = [
  { icon: "△", company: "acme corp", link: "#", role: "frontend engineer", location: "bangalore, india" },
  { icon: "◇", company: "startup inc", link: "#", role: "web developer intern", location: "remote" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -15 },
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
        <h2 className="section-title">previous</h2>
        
        <motion.div 
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {experiences.map((exp, i) => (
            <motion.div 
              key={i}
              variants={itemVariants}
              className="group flex items-center gap-3 text-[1.05rem] lowercase py-2 px-3 -mx-3 rounded-lg hover:bg-muted/30 transition-all duration-300"
            >
              <span className="text-accent text-sm opacity-70 group-hover:opacity-100 transition-opacity">{exp.icon}</span>
              <a href={exp.link} className="link-underline font-medium text-primary">{exp.company}</a>
              <span className="text-secondary">~</span>
              <span className="text-primary opacity-80 group-hover:opacity-100 transition-opacity">{exp.role}</span>
              <span className="ml-auto text-xs font-mono text-secondary/60 hidden sm:block">[{exp.location}]</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
