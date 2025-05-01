import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import gsap from "gsap";
import { data } from "@/lib/data";

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    if (!containerRef.current || !isInView) return;
    
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.from(containerRef.current.querySelectorAll(".testimonial-animate"), {
      y: 30,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8
    });
    
    return () => {
      tl.kill();
    };
  }, [isInView]);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % data.testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + data.testimonials.length) % data.testimonials.length);
  };

  return (
    <section 
      id="testimonials" 
      ref={containerRef}
      className="py-24 relative"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="testimonial-animate text-3xl sm:text-4xl font-bold mb-4"
          >
            Client Testimonials
          </motion.h2>
          <motion.p 
            className="testimonial-animate text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            What clients say about working with me
          </motion.p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <motion.div 
            className="testimonial-animate absolute -top-12 left-1/2 transform -translate-x-1/2 text-primary opacity-30"
          >
            <Quote size={80} />
          </motion.div>
          
          <div className="relative overflow-hidden rounded-xl bg-secondary/40 backdrop-blur-sm p-8 md:p-12">
            {data.testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{ 
                  opacity: activeIndex === index ? 1 : 0,
                  x: activeIndex === index ? 0 : 100,
                  position: activeIndex === index ? "relative" : "absolute"
                }}
                transition={{ duration: 0.5 }}
                className={`testimonial-slide ${activeIndex === index ? "block" : "hidden"}`}
              >
                <p className="text-lg md:text-xl mb-8 italic">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
            
            <div className="absolute top-1/2 transform -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
              <motion.button
                className="testimonial-animate w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
                onClick={prevTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft size={20} />
              </motion.button>
              
              <motion.button
                className="testimonial-animate w-10 h-10 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center pointer-events-auto"
                onClick={nextTestimonial}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </div>
          
          <div className="mt-8 flex justify-center gap-2">
            {data.testimonials.map((_, index) => (
              <button 
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-colors ${
                  activeIndex === index ? "bg-primary" : "bg-muted"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
