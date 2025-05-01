import { create } from "zustand";

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
  
  toggleChatbot: () => set((state) => ({ isOpen: !state.isOpen })),
  openChatbot: () => set({ isOpen: true }),
  closeChatbot: () => set({ isOpen: false }),
}));
