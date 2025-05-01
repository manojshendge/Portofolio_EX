import React, { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import gsap from "gsap";
import { data } from "@/lib/data";

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  
  useEffect(() => {
    if (!containerRef.current || !isInView) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(containerRef.current.querySelectorAll(".project-animate"), {
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
      id="projects" 
      ref={containerRef}
      className="py-24 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="project-animate text-3xl sm:text-4xl font-bold mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p 
            className="project-animate text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A showcase of my best work
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project, index) => (
            <motion.div
              key={index}
              className="project-animate group relative overflow-hidden rounded-lg bg-secondary/40 backdrop-blur-sm border border-secondary h-[380px] flex flex-col"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-2">
                    {project.github && (
                      <a 
                        href={project.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-background/50 hover:bg-background transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {project.live && (
                      <a 
                        href={project.live} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-full bg-background/50 hover:bg-background transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">{project.description}</p>
                
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2.5 py-1 text-xs rounded-full bg-primary/20 text-primary"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="h-24 bg-gradient-to-b from-secondary/10 to-secondary/80 p-4 flex items-end">
                <a 
                  href={project.live || project.github || "#"} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-full py-2 rounded-md bg-primary/80 hover:bg-primary text-primary-foreground text-sm font-medium transition-colors text-center"
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="project-animate mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-8">What I Can Build For You</h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {data.services.map((service, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-secondary/30 backdrop-blur-sm flex flex-col items-center justify-center aspect-square"
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(var(--primary), 0.2)",
                  transition: { duration: 0.2 }
                }}
              >
                <div className="text-center">
                  <div className="mb-3 flex justify-center">
                    {React.createElement(service.icon.type, service.icon.props)}
                  </div>
                  <h4 className="text-sm font-medium">{service.name}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
