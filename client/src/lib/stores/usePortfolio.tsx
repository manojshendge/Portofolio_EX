import { create } from "zustand";

// Define the types of sections in the portfolio
export type Section = "hero" | "about" | "techStack" | "career" | "projects" | "testimonials" | "contact";

interface PortfolioState {
  // Current active section
  currentSection: Section;
  
  // Scroll progress (0-1)
  scrollProgress: number;
  
  // Actions
  setCurrentSection: (section: Section) => void;
  setScrollProgress: (progress: number) => void;
}

export const usePortfolio = create<PortfolioState>((set) => ({
  currentSection: "hero",
  scrollProgress: 0,
  
  setCurrentSection: (section) => set({ currentSection: section }),
  setScrollProgress: (progress) => set({ scrollProgress: progress }),
}));
