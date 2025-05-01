import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Volume2, VolumeX } from "lucide-react";
import { usePortfolio, Section } from "@/lib/stores/usePortfolio";
import { useAudio } from "@/lib/stores/useAudio";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { currentSection, setCurrentSection } = usePortfolio();
  const { isMuted, toggleMute } = useAudio();
  
  const navItems: {title: string, id: Section}[] = [
    { title: "Home", id: "hero" },
    { title: "About", id: "about" },
    { title: "Tech Stack", id: "techStack" },
    { title: "Journey", id: "career" },
    { title: "Projects", id: "projects" },
    { title: "Testimonials", id: "testimonials" },
    { title: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: Section) => {
    setCurrentSection(sectionId);
    setIsMobileMenuOpen(false);
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 w-full px-6 py-4 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <motion.div 
          className="font-bold text-2xl text-teal-600 cursor-pointer"
          whileHover={{ scale: 1.05 }}
          onClick={() => scrollToSection("hero")}
        >
          John Doe
        </motion.div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <motion.button
              key={item.id}
              className={cn(
                "text-sm font-medium relative",
                currentSection === item.id ? "text-teal-600" : "text-slate-600 hover:text-teal-700"
              )}
              onClick={() => scrollToSection(item.id)}
              whileHover={{ scale: 1.1 }}
            >
              {item.title}
              {currentSection === item.id && (
                <motion.div 
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600" 
                  layoutId="navbar-underline"
                />
              )}
            </motion.button>
          ))}
          
          <motion.button 
            className="ml-6 p-2 rounded-full bg-teal-50 hover:bg-teal-100 text-teal-600 transition-colors"
            onClick={toggleMute}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </motion.button>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <motion.button 
            className="p-2 text-teal-600"
            onClick={toggleMute}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </motion.button>
          
          <motion.button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 ml-2 text-teal-600"
            whileTap={{ scale: 0.95 }}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-md shadow-lg"
          >
            <div className="flex flex-col py-4 px-6 space-y-4">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={cn(
                    "text-left py-2 text-base font-medium",
                    currentSection === item.id ? "text-teal-600" : "text-slate-600"
                  )}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {item.title}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
