import { useEffect } from "react";

interface UseSmoothScrollOptions {
  trigger?: string;
  target?: string;
  offset?: number;
  duration?: number;
}

export function useSmoothScroll({
  trigger = 'a[href^="#"]',
  target = "",
  offset = 0,
  duration = 800
}: UseSmoothScrollOptions = {}) {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      
      if (!(element instanceof HTMLElement)) return;
      
      // Check if the clicked element matches the trigger selector
      const isLink = element.matches(trigger) || element.closest(trigger);
      if (!isLink) return;
      
      e.preventDefault();
      
      // Get the target element
      let targetElement: HTMLElement | null = null;
      
      if (target) {
        // If a specific target is provided, use it
        targetElement = document.querySelector(target) as HTMLElement;
      } else if (element.getAttribute("href")) {
        // Otherwise try to get the target from the href attribute
        const href = element.getAttribute("href") || element.closest(trigger)?.getAttribute("href");
        if (href && href.startsWith("#")) {
          targetElement = document.querySelector(href) as HTMLElement;
        }
      }
      
      if (!targetElement) return;
      
      // Calculate scroll position
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      
      let startTime: number | null = null;
      
      // Animation function
      function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollY = easeOutCubic(timeElapsed, startPosition, distance, duration);
        
        window.scrollTo(0, scrollY);
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
      
      // Easing function
      function easeOutCubic(t: number, b: number, c: number, d: number) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
      }
      
      requestAnimationFrame(animation);
    };
    
    document.addEventListener("click", handleClick);
    
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [trigger, target, offset, duration]);
}
