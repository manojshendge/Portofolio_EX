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
      {/* Professional gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 via-white to-slate-50/90 z-0"></div>
      
      {/* Professional geometric accent elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        {/* Decorative geometric shapes */}
        {[...Array(5)].map((_, i) => (
          <motion.div 
            key={i}
            className="absolute border border-blue-200 rounded-lg"
            style={{ 
              width: `${Math.random() * 60 + 60}px`, 
              height: `${Math.random() * 60 + 60}px` 
            }}
            initial={{ 
              x: `${Math.random() * 100}%`,
              y: `${Math.random() * 100}%`,
              rotate: Math.random() * 180,
              opacity: 0.2
            }}
            animate={{ 
              rotate: 360,
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ 
              duration: Math.random() * 15 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Professional accent elements - dots */}
        <motion.div 
          className="absolute right-10 top-1/4 flex flex-col gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          {[...Array(6)].map((_, i) => (
            <motion.div 
              key={i} 
              className="w-1 h-1 rounded-full bg-blue-400"
              animate={{ scale: i % 2 === 0 ? [1, 1.2, 1] : [1, 1.5, 1] }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        {/* Horizontal accent line */}
        <motion.div 
          className="absolute left-0 top-3/4 w-32 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 0.5, width: 128 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
      </div>
      
      <div className="max-w-7xl w-full px-6 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center mb-4"
          >
            <span className="px-4 py-1.5 text-xs font-semibold tracking-wider bg-blue-100 text-blue-600 rounded-md border border-blue-200">
              FULLSTACK DEVELOPER
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="heading-underline text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-6 text-slate-800"
          >
            Crafting <span className="text-blue-600">Exceptional</span> Digital Solutions
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg sm:text-xl text-slate-600 text-center mb-10 max-w-2xl mx-auto"
          >
            I specialize in building professional, responsive web applications 
            with modern technologies that deliver exceptional user experiences and business results.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              className="px-8 py-3 rounded-md bg-blue-600 text-white font-medium shadow-subtle"
              onClick={toggleChatbot}
            >
              Get in Touch
            </motion.button>
            
            <motion.a
              href="#projects"
              whileHover={{ y: -2 }}
              whileTap={{ y: 1 }}
              className="px-8 py-3 rounded-md border border-slate-300 text-slate-700 flex items-center gap-2 font-medium transition-all hover:bg-slate-50"
            >
              View Projects <ExternalLink size={16} />
            </motion.a>
          </motion.div>
          
          {/* Stats section - commonly used in professional portfolios */}
          <motion.div 
            className="flex justify-center gap-8 mt-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            {[
              { number: "5+", label: "Years Experience" },
              { number: "30+", label: "Projects Completed" },
              { number: "15+", label: "Happy Clients" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <h3 className="text-3xl font-bold text-blue-600">{stat.number}</h3>
                <p className="text-sm text-slate-500">{stat.label}</p>
              </div>
            ))}
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
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="p-3 rounded-full border border-blue-200 bg-white shadow-subtle"
          >
            <ArrowDown className="w-5 h-5 text-blue-600" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
