import { Loader } from "@/components/sections/Loader";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { HowIWork } from "@/components/sections/HowIWork";
import { Work } from "@/components/sections/Work";
import { Journey } from "@/components/sections/Journey";
import { Toolbox } from "@/components/sections/Toolbox";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Hero />
      <About />
      <HowIWork />
      <Work />
      <Journey />
      <Toolbox />
      <Contact />
      <Footer />
    </>
  );
}
