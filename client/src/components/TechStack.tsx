import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Tech stack data
const techStack = [
  { name: "React", color: "#00B7FF", icon: "🔄", backgroundColor: "#007EA7" },
  { name: "JavaScript", color: "#F0DB4F", icon: "📜", backgroundColor: "#323330" },
  { name: "TypeScript", color: "#007ACC", icon: "📘", backgroundColor: "#007ACC" },
  { name: "Framer Motion", color: "#FF4D8D", icon: "🔄", backgroundColor: "#C6074F" },
  { name: "Tailwind", color: "#38B2AC", icon: "🎨", backgroundColor: "#0B7A75" },
  { name: "Node.js", color: "#68A063", icon: "🔢", backgroundColor: "#3C873A" },
  { name: "HTML/CSS", color: "#E34F26", icon: "📝", backgroundColor: "#AD3416" },
  { name: "Firebase", color: "#FFCA28", icon: "🔥", backgroundColor: "#F57C00" }
];

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const orbitAnimation = {
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      duration: 60,
      ease: "linear"
    }
  };

  return (
    <section 
      id="techStack" 
      ref={containerRef}
      className="py-16 relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-950/20 to-purple-950/30 z-0"></div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 w-full"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl sm:text-5xl font-bold mb-4 text-white drop-shadow-lg text-glow"
            variants={itemVariants}
          >
            My Tech Universe
          </motion.h2>
          <motion.p 
            className="text-xl text-blue-200 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            The technologies I use to bring ideas to life
          </motion.p>
        </div>
        
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Central orbit system */}
          <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px]">
            {/* Center core */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-blue-500 shadow-glow z-10"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 40px rgba(59, 130, 246, 0.8)',
                  '0 0 20px rgba(59, 130, 246, 0.5)'
                ]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              variants={itemVariants}
            >
              <div className="absolute inset-0 flex items-center justify-center text-white font-bold">ME</div>
            </motion.div>
            
            {/* Orbit paths */}
            {[0, 1, 2].map((orbit) => (
              <motion.div 
                key={`orbit-${orbit}`}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/30"
                style={{ 
                  width: `${(orbit + 1) * 33}%`, 
                  height: `${(orbit + 1) * 33}%` 
                }}
                variants={itemVariants}
              />
            ))}
            
            {/* Tech icons in orbit */}
            {techStack.map((tech, index) => {
              // Calculate orbit position
              const orbitRadius = (((index % 3) + 1) * 33) / 2;
              const angle = (index * (360 / techStack.length)) * (Math.PI / 180);
              
              return (
                <motion.div
                  key={tech.name}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    x: Math.cos(angle) * orbitRadius * 2,
                    y: Math.sin(angle) * orbitRadius * 2,
                    rotate: 360
                  }}
                  transition={{
                    duration: 20 + index * 5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  variants={itemVariants}
                >
                  <motion.div
                    className="w-12 h-12 sm:w-16 sm:h-16 rounded-full shadow-glow flex items-center justify-center cursor-pointer"
                    style={{ backgroundColor: tech.backgroundColor }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="text-white text-xl">{tech.icon}</span>
                    <motion.div
                      className="absolute whitespace-nowrap top-full mt-2 px-3 py-1 rounded-full text-xs font-bold"
                      style={{ color: tech.color, background: `${tech.backgroundColor}66` }}
                      animate={{ opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {tech.name}
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
        
        {/* Technologies list */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto mt-8"
          variants={itemVariants}
        >
          {techStack.map((tech) => (
            <motion.span
              key={`tag-${tech.name}`}
              className="px-5 py-2 rounded-full shadow-glow backdrop-blur-sm text-sm font-medium"
              style={{ backgroundColor: tech.backgroundColor, color: tech.color }}
              whileHover={{ scale: 1.1, boxShadow: `0 0 15px ${tech.color}` }}
              whileTap={{ scale: 0.95 }}
            >
              {tech.name}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
