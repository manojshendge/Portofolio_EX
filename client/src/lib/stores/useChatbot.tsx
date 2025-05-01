import { create } from "zustand";
import { useAudio } from "./useAudio";

interface ChatbotState {
  // Is the chatbot open
  isOpen: boolean;
  
  // Toggle the chatbot open/closed
  toggleChatbot: () => void;
  
  // Open the chatbot
  openChatbot: () => void;
  
  // Close the chatbot
  closeChatbot: () => void;
}

export const useChatbot = create<ChatbotState>((set) => ({
  isOpen: false,
  
  toggleChatbot: () => {
    set((state) => {
      const newIsOpen = !state.isOpen;
      
      // Play a sound effect when toggling
      if (typeof window !== 'undefined') {
        // Access the audio store and play sound
        const audioStore = useAudio.getState();
        if (newIsOpen) {
          audioStore.playHit();
        }
      }
      
      return { isOpen: newIsOpen };
    });
  },
  
  openChatbot: () => {
    set({ isOpen: true });
    
    // Play sound when opening
    if (typeof window !== 'undefined') {
      const audioStore = useAudio.getState();
      audioStore.playHit();
    }
  },
  
  closeChatbot: () => set({ isOpen: false }),
}));
