import { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Tech stack data - using industry standard icons and colors
const techStack = [
  { name: "React", color: "#61DAFB", icon: "react", backgroundColor: "#ffffff", category: "Frontend" },
  { name: "JavaScript", color: "#F7DF1E", icon: "js", backgroundColor: "#ffffff", category: "Languages" },
  { name: "TypeScript", color: "#3178C6", icon: "ts", backgroundColor: "#ffffff", category: "Languages" },
  { name: "Framer Motion", color: "#0055FF", icon: "framer", backgroundColor: "#ffffff", category: "Animation" },
  { name: "Tailwind CSS", color: "#06B6D4", icon: "tailwind", backgroundColor: "#ffffff", category: "Frontend" },
  { name: "Node.js", color: "#339933", icon: "node", backgroundColor: "#ffffff", category: "Backend" },
  { name: "HTML5", color: "#E34F26", icon: "html", backgroundColor: "#ffffff", category: "Frontend" },
  { name: "CSS3", color: "#1572B6", icon: "css", backgroundColor: "#ffffff", category: "Frontend" },
  { name: "MongoDB", color: "#47A248", icon: "mongodb", backgroundColor: "#ffffff", category: "Backend" },
  { name: "PostgreSQL", color: "#336791", icon: "postgresql", backgroundColor: "#ffffff", category: "Backend" },
  { name: "Git", color: "#F05032", icon: "git", backgroundColor: "#ffffff", category: "Tools" },
  { name: "Docker", color: "#2496ED", icon: "docker", backgroundColor: "#ffffff", category: "DevOps" }
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
      className="py-16 relative min-h-screen flex items-center justify-center overflow-hidden gradient-bg"
    >
      {/* Subtle grid background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50 z-0"></div>
      
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-6 w-full py-12"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-6 text-slate-800 heading-underline inline-block"
            variants={itemVariants}
          >
            Technical Expertise
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-600 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            I leverage industry-standard technologies to build scalable, maintainable solutions
          </motion.p>
        </div>
        
        {/* Categorized skills - more professional approach */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {["Frontend", "Backend", "Languages", "DevOps"].map((category) => (
            <motion.div 
              key={category} 
              className="bg-white p-6 rounded-lg shadow-subtle"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <h3 className="text-lg font-bold text-blue-600 mb-4 border-b border-slate-100 pb-2">{category}</h3>
              <div className="flex flex-wrap gap-2">
                {techStack
                  .filter(tech => tech.category === category)
                  .map(tech => (
                    <motion.div 
                      key={tech.name}
                      className="skill-badge"
                      whileHover={{ scale: 1.05 }}
                      style={{ 
                        borderLeft: `3px solid ${tech.color}`,
                      }}
                    >
                      {tech.name}
                    </motion.div>
                  ))
                }
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Professional skill bars - common in industry portfolios */}
        <motion.div 
          className="mb-12"
          variants={itemVariants}
        >
          <h3 className="text-xl font-bold text-slate-700 mb-6">Core Proficiencies</h3>
          <div className="space-y-5 max-w-3xl mx-auto">
            {[
              { skill: "Frontend Development", level: 95 },
              { skill: "Responsive Design", level: 90 },
              { skill: "Modern JavaScript", level: 92 },
              { skill: "React & Component Libraries", level: 88 },
              { skill: "API Integration", level: 85 }
            ].map((item, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-slate-700">{item.skill}</span>
                  <span className="text-sm font-medium text-slate-500">{item.level}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.level}%` }}
                    transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Tools I use - simple clean grid */}
        <motion.div
          className="mt-12"
          variants={itemVariants}
        >
          <h3 className="text-xl font-bold text-slate-700 mb-6 text-center">Tools & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {techStack.map((tech) => (
              <motion.div
                key={`tech-${tech.name}`}
                className="px-4 py-2 rounded-md bg-white shadow-subtle flex items-center gap-2 border border-slate-200"
                whileHover={{ y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                style={{ color: tech.color }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: tech.color }}></div>
                <span className="font-medium text-slate-700 text-sm">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
