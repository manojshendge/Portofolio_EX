import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import gsap from "gsap";

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  
  useEffect(() => {
    if (!containerRef.current || !isInView) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(containerRef.current.querySelectorAll(".about-animate"), {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8
    });
    
    return () => {
      tl.kill();
    };
  }, [isInView]);

  const whyHireMe = [
    "Fast delivery with clean, maintainable code",
    "Strong focus on optimized, SEO-friendly websites",
    "Excellent communication and collaboration skills",
    "Creative problem solver with attention to detail",
    "Continuous learner, always improving skills",
    "Passionate about creating exceptional user experiences"
  ];

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.h2 
              className="about-animate text-3xl sm:text-4xl font-bold mb-6 text-primary"
            >
              About Me
            </motion.h2>
            
            <motion.p 
              className="about-animate text-lg text-muted-foreground mb-6"
            >
              I'm a passionate developer with expertise in creating modern, interactive web applications. 
              My journey in tech started 5 years ago, and I've been building and learning ever since.
            </motion.p>
            
            <motion.p 
              className="about-animate text-lg text-muted-foreground mb-8"
            >
              I specialize in frontend development with React, but I'm also proficient in backend technologies 
              like Node.js and database management. I love working on challenging projects that push me to learn new skills.
            </motion.p>
            
            <motion.div
              className="about-animate"
            >
              <a 
                href="#contact" 
                className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium inline-block"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>
          
          <div>
            <motion.h3 
              className="about-animate text-2xl font-bold mb-6"
            >
              Why Hire Me?
            </motion.h3>
            
            <div className="space-y-4">
              {whyHireMe.map((reason, index) => (
                <motion.div 
                  key={index}
                  className="about-animate flex items-start gap-3 p-4 rounded-lg bg-secondary/40 backdrop-blur-sm"
                >
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
