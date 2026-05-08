import { motion } from "framer-motion";

export function Hero() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-between items-start mb-12"
      >
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 tracking-tight lowercase">
            abhayraj b ~ <span className="gradient-text italic font-normal">अभयराज</span>
          </h1>
          <div className="flex gap-2 mb-4 stagger-children">
            {["product", "web", "design", "frontend"].map(tag => (
              <span key={tag} className="tag-box font-mono text-secondary">{tag}</span>
            ))}
          </div>
          <p className="text-lg lowercase italic">
            i build <span className="italic border-b-2 border-accent/60 hover:border-accent transition-colors">fast</span>
          </p>
        </div>
        <div className="text-right italic">
          <p className="text-2xl gradient-text">ಬೆಂಗಳೂರು</p>
          <p className="text-sm text-secondary mt-1 font-mono">Pune, india</p>
        </div>
      </motion.div>

      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-8"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/30 bg-accent/5 text-sm font-mono lowercase">
          <span className="status-dot"></span>
          available for work
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="section-title">current</h2>
        <div className="space-y-4 max-w-3xl text-[1.1rem] leading-relaxed text-primary lowercase">
          <p>
            software engineer passionate about crafting beautiful, intuitive, and performant web applications.
            i enjoy exploring modern frontend frameworks, optimizing user experiences, and writing clean, scalable code.
          </p>
          <p>
            always learning, always building.
          </p>
          <p>
            i can build <span className="gradient-text italic font-semibold">anything.</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
