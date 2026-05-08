import { Hero } from "./components/Hero";
import { Experience } from "./components/Experience";
import { Writings } from "./components/Writings";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";
import { ThemeToggle } from "./components/ThemeToggle";
import { TechMarquee } from "./components/TechMarquee";
import { CursorGlow, ScrollProgress, DesignerGrid } from "./components/Effects";

const Divider = () => (
  <div className="relative w-full h-[1px] my-16 flex items-center">
    {/* Infinite horizontal line fading out at the edges */}
    <div className="absolute left-1/2 -translate-x-1/2 w-[100vw] h-[1px] bg-gradient-to-r from-transparent via-secondary/25 to-transparent"></div>
    
    {/* Left Crosshair */}
    <div className="absolute left-0 -translate-x-[7px] -translate-y-[7px] text-accent/40">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 0V15M0 7.5H15" stroke="currentColor" strokeWidth="1"/>
      </svg>
    </div>
    
    {/* Right Crosshair */}
    <div className="absolute right-0 translate-x-[7px] -translate-y-[7px] text-accent/40">
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 0V15M0 7.5H15" stroke="currentColor" strokeWidth="1"/>
      </svg>
    </div>
  </div>
);

function App() {
  return (
    <div className="relative min-h-screen bg-background text-primary overflow-hidden">
      {/* ===== DESIGNER GRID CANVAS (all layers in one performant canvas) ===== */}
      <DesignerGrid />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      {/* Custom cursor */}
      <CursorGlow />
      
      {/* Theme Toggle */}
      <ThemeToggle />
      
      {/* Central Content Column */}
      <div className="relative z-10 w-full max-w-[720px] mx-auto min-h-screen border-x border-secondary/10">
        {/* Inner column gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/[0.92] to-background pointer-events-none z-0" />

        {/* Top boundary crosshairs */}
        <div className="absolute top-0 w-full h-[1px]">
          <div className="absolute left-0 -translate-x-[7px] -translate-y-[7px] text-accent/40">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 0V15M0 7.5H15" stroke="currentColor" strokeWidth="1"/></svg>
          </div>
          <div className="absolute right-0 translate-x-[7px] -translate-y-[7px] text-accent/40">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 0V15M0 7.5H15" stroke="currentColor" strokeWidth="1"/></svg>
          </div>
        </div>

        <main className="px-6 sm:px-8 py-12 md:py-24 relative z-10">
          <Hero />
          
          {/* Tech Marquee between hero and experience */}
          <div className="my-10">
            <TechMarquee />
          </div>
          
          <Divider />
          <Experience />
          <Divider />
          <Writings />
          <Divider />
          <Projects />
          <Divider />
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;