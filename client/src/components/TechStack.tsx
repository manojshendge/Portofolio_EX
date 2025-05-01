import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (!containerRef.current || !isInView) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(containerRef.current.querySelectorAll(".tech-animate"), {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6
    });
    
    return () => {
      tl.kill();
    };
  }, [isInView]);

  return (
    <section 
      id="techStack" 
      ref={containerRef}
      className="py-16 relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-950/20 to-purple-950/30 z-0"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="text-center mb-12">
          <motion.h2 
            className="tech-animate text-3xl sm:text-5xl font-bold mb-4 text-white drop-shadow-lg"
          >
            My Tech Universe
          </motion.h2>
          <motion.p 
            className="tech-animate text-xl text-blue-200 max-w-2xl mx-auto"
          >
            The technologies I use to bring ideas to life
          </motion.p>
        </div>
        
        <div className="relative h-[450px] sm:h-[500px] md:h-[600px]">
          {/* Space for 3D orbit rendering */}
          <div className="tech-stack-canvas absolute inset-0 flex items-center justify-center">
            {/* This content is hidden when the 3D scene is loaded */}
            <div className="bg-blue-500/10 animate-pulse p-8 rounded-full backdrop-blur-sm">
              <p className="text-blue-200">3D Tech Orbit</p>
            </div>
          </div>
          
          {/* Technologies list at the bottom */}
          <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
            <motion.div
              className="tech-animate inline-flex flex-wrap justify-center gap-4 max-w-3xl mx-auto"
            >
              {[
                { name: "React", color: "bg-cyan-600" },
                { name: "JavaScript", color: "bg-yellow-600" },
                { name: "TypeScript", color: "bg-blue-700" },
                { name: "Three.js", color: "bg-white text-black" },
                { name: "Tailwind", color: "bg-cyan-500" },
                { name: "Node.js", color: "bg-green-600" },
                { name: "HTML/CSS", color: "bg-orange-600" },
                { name: "Firebase", color: "bg-amber-500" }
              ].map((tech) => (
                <span 
                  key={tech.name}
                  className={`px-5 py-2 rounded-full ${tech.color} shadow-glow backdrop-blur-sm text-sm font-medium transition-all hover:scale-110`}
                >
                  {tech.name}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
