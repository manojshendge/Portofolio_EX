import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { usePortfolio, Section } from "@/lib/stores/usePortfolio";
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
      {/* Cosmic gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-transparent to-purple-950/30 z-0"></div>
      
      {/* Animated stars background - these are separate from the 3D particles */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full shadow-glow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite ${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      <div className="max-w-7xl w-full px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-animate flex items-center justify-center mb-4"
          >
            <span className="px-4 py-1.5 text-xs font-semibold tracking-wider bg-blue-500/20 text-blue-300 rounded-full backdrop-blur-sm shadow-glow">
              FULLSTACK DEVELOPER
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-animate text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-6 text-glow"
          >
            Crafting <span className="text-cyan-400">Digital</span> <span className="text-blue-300">Experiences</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="hero-animate text-lg sm:text-xl text-blue-100 text-center mb-10 max-w-2xl mx-auto"
          >
            I build modern, interactive web applications with cutting-edge technologies,
            focusing on immersive user experiences and stellar performance.
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
              className="px-8 py-3 rounded-md bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-medium shadow-glow"
              onClick={toggleChatbot}
            >
              Chat with me
            </motion.button>
            
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 rounded-md border border-pink-400 text-pink-300 flex items-center gap-2 font-medium transition-all hover:bg-pink-400/10 backdrop-blur-sm"
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
            className="p-3 rounded-full bg-blue-500/10 backdrop-blur-sm"
          >
            <ArrowDown className="w-6 h-6 text-blue-300" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
