import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { usePortfolio } from "@/lib/stores/usePortfolio";
import { useChatbot } from "@/lib/stores/useChatbot";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { setCurrentSection } = usePortfolio();
  const { toggleChatbot } = useChatbot();
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Background animation with GSAP
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(containerRef.current.querySelectorAll(".hero-animate"), {
      y: 30,
      opacity: 0,
      stagger: 0.2,
      duration: 1,
      delay: 0.5
    });
    
    return () => {
      tl.kill();
    };
  }, []);
  
  const scrollToNextSection = () => {
    setCurrentSection("about");
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section 
      id="hero" 
      ref={containerRef}
      className="relative h-screen w-full flex items-center justify-center overflow-hidden"
    >
      <div className="max-w-7xl w-full px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-animate flex items-center justify-center mb-4"
          >
            <span className="px-3 py-1 text-xs font-semibold tracking-wider bg-primary/20 text-primary rounded-full">
              FULLSTACK DEVELOPER
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-animate text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-6"
          >
            Crafting <span className="text-primary">Digital</span> Experiences
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-animate text-lg sm:text-xl text-muted-foreground text-center mb-10"
          >
            I build modern, interactive web applications with a focus on user experience,
            performance, and scalability.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hero-animate flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium"
              onClick={toggleChatbot}
            >
              Chat with me
            </motion.button>
            
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-md border border-accent text-accent flex items-center gap-2 font-medium"
            >
              View Projects <ExternalLink size={16} />
            </motion.a>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2 cursor-pointer"
          onClick={scrollToNextSection}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-6 h-6 text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
