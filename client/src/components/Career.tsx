import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { data } from "@/lib/data";

export function Career() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (!containerRef.current || !isInView) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(containerRef.current.querySelectorAll(".career-animate"), {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8
    });
    
    return () => {
      tl.kill();
    };
  }, [isInView]);

  return (
    <section 
      id="career" 
      ref={containerRef}
      className="py-24 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="career-animate text-black sm:text-4xl font-bold mb-4"
          >
           MY JOURNY
          </motion.h2>
          <motion.p 
            className="career-animate text-primary/70 max-w-2xl mx-auto"
          >
            A visual timeline of my career path
          </motion.p>
        </div>
        
        <div className="relative">
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.career.map((item, index) => (
              <motion.div
                key={index}
                className="career-animate p-6 rounded-lg bg-secondary/90 backdrop-blur-sm border border-secondary"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-black font-bold">{item.title}</h3>
                  <span className="px-3 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">
                    {item.period}
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">{item.company}</p>
                <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                  {item.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
