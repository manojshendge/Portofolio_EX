import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { usePortfolio } from "@/lib/stores/usePortfolio";

export function ScrollIndicator() {
  const { scrollProgress } = usePortfolio();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Show button when user scrolls more than 300px
    setIsVisible(window.scrollY > 300);
    
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <>
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-secondary z-40">
        <motion.div 
          className="h-full bg-primary"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>
      
      {/* Scroll to top button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isVisible ? 1 : 0,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 w-10 h-10 rounded-full bg-primary/80 hover:bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-40"
      >
        <ChevronUp size={20} />
      </motion.button>
    </>
  );
}
