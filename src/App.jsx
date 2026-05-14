import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Education } from "./components/Education";
import { Achievements } from "./components/Writings";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { ThemeToggle } from "./components/ThemeToggle";
import { TechMarquee } from "./components/TechMarquee";
import { CursorGlow, ScrollProgress, DesignerGrid } from "./components/Effects";

const Divider = () => (
  <div className="relative w-full h-[1px] my-20 flex items-center">
    <div className="absolute left-1/2 -translate-x-1/2 w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-secondary/20 to-transparent"></div>
    
    {/* Left Crosshair */}
    <div className="absolute left-0 -translate-x-[6px] -translate-y-[6px] text-accent/30">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 0V13M0 6.5H13" stroke="currentColor" strokeWidth="0.75"/>
      </svg>
    </div>
    
    {/* Right Crosshair */}
    <div className="absolute right-0 translate-x-[6px] -translate-y-[6px] text-accent/30">
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <path d="M6.5 0V13M0 6.5H13" stroke="currentColor" strokeWidth="0.75"/>
      </svg>
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
          
          <div className="my-12">
            <TechMarquee />
          </div>
          
          <Divider />
          <Education />
          <Divider />
          <Experience />
          <Divider />
          <Projects />
          <Divider />
          <Achievements />
          <Divider />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;