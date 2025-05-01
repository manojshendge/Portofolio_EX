import { useEffect, useRef } from "react";
import gsap from "gsap";

interface UseAnimationsOptions {
  selector: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  once?: boolean;
}

export function useAnimations({
  selector,
  from = { y: 30, opacity: 0 },
  to = { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
  threshold = 0.3,
  once = true
}: UseAnimationsOptions) {
  const animatedRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    if (!animatedRef.current) return;
    
    const elements = animatedRef.current.querySelectorAll(selector);
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in
            gsap.fromTo(elements, from, to);
            
            // Unobserve if only animating once
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            // Animate out if not once
            gsap.to(elements, from);
          }
        });
      },
      { threshold }
    );
    
    observer.observe(animatedRef.current);
    
    return () => {
      if (animatedRef.current) {
        observer.unobserve(animatedRef.current);
      }
    };
  }, [selector, from, to, threshold, once]);
  
  return animatedRef;
}
