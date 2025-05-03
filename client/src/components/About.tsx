import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2, Star } from "lucide-react";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  const whyHireMe = [
    "Fast delivery with clean, maintainable code",
    "Strong focus on optimized, SEO-friendly websites",
    "Excellent communication and collaboration skills",
    "Creative problem solver with attention to detail",
    "Continuous learner, always improving skills",
    "Passionate about creating exceptional user experiences"
  ];
  
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };
  
  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        delay: 0.2 + (i * 0.1)
      }
    })
  };

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 relative overflow-hidden min-h-screen flex items-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-40 pointer-events-none">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`about-particle-${i}`}
            className="absolute rounded-full"
            style={{ 
              backgroundColor: i % 3 === 0 ? "#4dc4ff" : i % 3 === 1 ? "#ff3399" : "#ffcc00",
              width: `${Math.random() * 6 + 3}px`,
              height: `${Math.random() * 6 + 3}px`,
            }}
            initial={{ 
              x: Math.random() < 0.5 ? -20 : "100%", 
              y: `${Math.random() * 100}%`,
              opacity: 0.5
            }}
            animate={{ 
              x: Math.random() < 0.5 ? "100%" : -20,
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{ 
              duration: Math.random() * 30 + 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
        
        {/* Animated stars */}
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={`about-star-${i}`}
            initial={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%`,
              scale: 0.5,
              opacity: 0
            }}
            animate={{ 
              scale: [0.5, 1, 0.5],
              opacity: [0, 1, 0],
              rotate: 360
            }}
            transition={{ 
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            className="absolute"
          >
            <Star className="w-4 h-4 text-blue-400" />
          </motion.div>
        ))}
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div>
            <motion.h2 
              variants={itemVariants}
              className="text-3xl sm:text-4xl font-bold mb-6 text-teal-600 text-glow"
            >
              About Me
            </motion.h2>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-blue-900 mb-6"
            >
              I'm a passionate developer with expertise in creating modern, interactive web applications. 
              My journey in tech started 5 years ago, and I've been building and learning ever since.
            </motion.p>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-blue-900  mb-8"
            >
              I specialize in frontend development with React and Framer Motion, but I'm also proficient in backend technologies 
              like Node.js and database management. I love working on challenging projects that push me to learn new skills.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <motion.a 
                href="#contact" 
                className="px-8 py-3 rounded-md bg-gradient-to-r from-teal-500 to-cyan-400 text-white font-medium inline-block shadow-glow"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(59, 130, 246, 0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
              </motion.a>
            </motion.div>
          </div>
          
          <div>
            <motion.h3 
              variants={itemVariants}
              className="text-2xl font-bold mb-6 text-cyan-700"
            >
              Why Hire Me?
            </motion.h3>
            
            <div className="space-y-4">
              {whyHireMe.map((reason, index) => (
                <motion.div 
                  key={index}
                  custom={index}
                  variants={cardVariants}
                  className="flex items-start gap-3 p-4 rounded-lg bg-blue-900/30 backdrop-blur-sm border border-blue-500/20"
                  whileHover={{ 
                    scale: 1.03,
                    backgroundColor: "rgba(30, 58, 138, 0.4)",
                    transition: { duration: 0.2 }
                  }}
                >
                  <CheckCircle2 className="w-6 h-6 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span className="text-blue-900">{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
