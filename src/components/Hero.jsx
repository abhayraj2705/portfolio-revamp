import { motion } from "framer-motion";

export function Hero() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex justify-between items-start mb-8"
      >
        <div>
          <h1 className="text-[2rem] md:text-[2.5rem] font-semibold mb-2 tracking-tight lowercase leading-tight overflow-visible">
            abhayraj b <span className="text-secondary/30 font-light mx-1">~</span>
            <span className="font-devanagari gradient-text-deva font-medium">
              अभयराज
            </span>
          </h1>
          <p className="text-[1.15rem] lowercase italic text-secondary mb-5">
            i build <span className="text-primary border-b border-accent/50 hover:border-accent transition-colors">scalable</span> things
          </p>
          <div className="flex gap-2 stagger-children flex-wrap">
            {["fullstack", "ai/ml", "mern", "devops"].map(tag => (
              <span key={tag} className="tag-box font-mono text-secondary">{tag}</span>
            ))}
          </div>
        </div>
        <div className="text-right flex-shrink-0 ml-6">
          <p className="font-devanagari text-[1.6rem] gradient-text-deva">
            पुणे
          </p>
          <p className="text-xs text-secondary/60 font-mono lowercase mt-0.5">pune, india</p>
        </div>
      </motion.div>

      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-12"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-accent/20 bg-accent/[0.04] text-xs font-mono lowercase tracking-wide">
          <span className="status-dot"></span>
          open to opportunities
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="section-title">about</h2>
        <div className="space-y-4 max-w-2xl text-[1.1rem] leading-[1.8] text-primary/90 lowercase">
          <p>
            computer science undergrad at{" "}
            <a href="#" className="link-underline font-medium text-primary">mit adt university</a>, pune.
            i ship full-stack products — from ai-powered code generators to payment platforms — using
            react, next.js, node, and mongodb.
          </p>
          <p className="text-secondary">
            4+ production apps deployed. 10+ rest apis designed.
            ai models like gpt-4o and claude wired into real workflows.
          </p>
          <p className="text-[1.15rem] mt-6">
            i can build <span className="gradient-text italic font-semibold text-[1.25rem]">anything.</span>
          </p>
        </div>
      </motion.div>
    </section>
  );
}
