import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Achievements } from "./components/Writings";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { ThemeToggle } from "./components/ThemeToggle";
import { TechMarquee } from "./components/TechMarquee";
import { CursorGlow, ScrollProgress, DesignerGrid } from "./components/Effects";
import { ScrollComment } from "./components/ScrollComment";
import { motion } from "framer-motion";

const Divider = () => (
  <div className="py-16 flex items-center justify-center">
    <div className="flex items-center gap-4 w-full max-w-[320px]">
      {/* Left line — draws from center outward */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 h-[1px] origin-right"
        style={{
          background: "linear-gradient(to left, var(--accent), transparent)",
          opacity: 0.25,
        }}
      />

      {/* Center ornament */}
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="text-accent/30 text-[8px] flex-shrink-0 select-none"
        style={{ letterSpacing: "0.1em" }}
      >
        ✦
      </motion.span>

      {/* Right line — draws from center outward */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 h-[1px] origin-left"
        style={{
          background: "linear-gradient(to right, var(--accent), transparent)",
          opacity: 0.25,
        }}
      />
    </div>
  </div>
);

function App() {
  return (
    <div className="relative min-h-screen bg-background text-primary overflow-hidden">
      {/* Designer Grid Canvas */}
      <DesignerGrid />
      
      {/* Film grain / noise texture */}
      <div className="noise-overlay" />
      
      {/* Scroll progress */}
      <ScrollProgress />
      
      {/* Custom cursor */}
      <CursorGlow />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Central Content Column */}
      <div className="relative z-10 w-full max-w-[680px] mx-auto min-h-screen border-x border-secondary/8">
        {/* Content background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/[0.94] to-background pointer-events-none z-0" />

        {/* Top crosshairs */}
        <div className="absolute top-0 w-full h-[1px]">
          <div className="absolute left-0 -translate-x-[6px] -translate-y-[6px] text-accent/30">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 0V13M0 6.5H13" stroke="currentColor" strokeWidth="0.75"/></svg>
          </div>
          <div className="absolute right-0 translate-x-[6px] -translate-y-[6px] text-accent/30">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 0V13M0 6.5H13" stroke="currentColor" strokeWidth="0.75"/></svg>
          </div>
        </div>

        <main className="px-6 sm:px-10 py-16 md:py-28 relative z-10">
          <Hero />
          
          <ScrollComment text="scroll to explore — every section tells a story ↓" delay={1.2} />

          <div className="my-12">
            <TechMarquee />
          </div>
          
          <ScrollComment text="the academic foundation" delay={0.1} />
          <Education />
          <Divider />

          <ScrollComment text="from classroom to production" delay={0.1} align="right" />
          <Experience />
          <Divider />

          <ScrollComment text="things i've shipped into the wild" delay={0.1} />
          <Projects />
          <Divider />

          <ScrollComment text="the numbers behind the work" delay={0.1} align="right" />
          <Achievements />
          <Divider />

          <ScrollComment text="you made it to the end — let's talk ✦" delay={0.1} />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;