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
      className="py-24 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="tech-animate text-3xl sm:text-4xl font-bold mb-4"
          >
            My Tech Universe
          </motion.h2>
          <motion.p 
            className="tech-animate text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            The technologies I use to bring ideas to life
          </motion.p>
        </div>
        
        <div className="relative h-[500px] md:h-[600px]">
          {/* This is a placeholder - the actual 3D orbit will be rendered by Three.js */}
          <div className="tech-stack-canvas absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground">3D Tech orbit is rendered here by Three.js</p>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 text-center pb-8">
            <motion.div
              className="tech-animate inline-flex flex-wrap justify-center gap-4 max-w-2xl mx-auto"
            >
              {["React", "JavaScript", "Node.js", "TypeScript", "HTML/CSS", "Three.js", "Tailwind", "Firebase"].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 rounded-full bg-secondary/60 backdrop-blur-sm text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
