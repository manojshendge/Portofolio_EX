import { useEffect, useRef } from "react";
import { Navbar } from "./Navbar";
import { Hero } from "./Hero";
import { About } from "./About";
import { TechStack } from "./TechStack";
import { Career } from "./Career";
import { Projects } from "./Projects";
import { Testimonials } from "./Testimonials";
import { Contact } from "./Contact";
import { Footer } from "./Footer";
import { Chatbot } from "./Chatbot";
import { EasterEgg } from "./EasterEgg";
import { ScrollIndicator } from "./ScrollIndicator";
import { usePortfolio } from "@/lib/stores/usePortfolio";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export function Layout() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { setCurrentSection, setScrollProgress } = usePortfolio();
  
  useEffect(() => {
    if (!layoutRef.current) return;
    
    const sections = ["hero", "about", "techStack", "career", "projects", "testimonials", "contact"];
    
    // Create scroll triggers for each section
    sections.forEach((section) => {
      ScrollTrigger.create({
        trigger: `#${section}`,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentSection(section),
        onEnterBack: () => setCurrentSection(section),
      });
    });
    
    // Track scroll progress
    const updateScrollProgress = () => {
      if (!layoutRef.current) return;
      
      const scrollTop = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const progress = scrollTop / scrollHeight;
      
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };
    
    window.addEventListener("scroll", updateScrollProgress);
    
    return () => {
      window.removeEventListener("scroll", updateScrollProgress);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [setCurrentSection, setScrollProgress]);
  
  return (
    <div ref={layoutRef} className="layout-container relative z-10">
      <Navbar />
      <ScrollIndicator />
      
      <main className="main-content">
        <Hero />
        <About />
        <TechStack />
        <Career />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
      <Chatbot />
      <EasterEgg />
    </div>
  );
}
