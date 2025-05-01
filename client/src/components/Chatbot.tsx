import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Send, Volume2 } from "lucide-react";
import { useChatbot } from "@/lib/stores/useChatbot";
import { useAudio } from "@/lib/stores/useAudio";

interface Message {
  id: number;
  text: string;
  sender: "bot" | "user";
}

export function Chatbot() {
  const { isOpen, toggleChatbot } = useChatbot();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hey there, I'm John! Want to know more about me?", sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { playHit } = useAudio();
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    if (!input.trim()) return;
    
    // Play sound
    playHit();
    
    // Add user message
    const userMessage = { id: messages.length + 1, text: input, sender: "user" as const };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    
    // Simulate bot typing
    setIsTyping(true);
    
    // Simple responses based on keywords
    setTimeout(() => {
      setIsTyping(false);
      
      let responseText = "I'm sorry, I don't understand that. You can ask me about my skills, projects, or experience.";
      
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes("skills") || lowerInput.includes("tech") || lowerInput.includes("technology")) {
        responseText = "I'm skilled in React, JavaScript, Node.js, Three.js, and many frontend technologies. I love creating interactive 3D experiences!";
      } else if (lowerInput.includes("project") || lowerInput.includes("work")) {
        responseText = "I've built various web applications, from e-commerce platforms to interactive dashboards. Check out my projects section to see examples of my work!";
      } else if (lowerInput.includes("experience") || lowerInput.includes("background")) {
        responseText = "I have 5 years of experience as a frontend developer, working with companies like Tech Corp and Digital Studio. I specialize in creating engaging user interfaces.";
      } else if (lowerInput.includes("contact") || lowerInput.includes("hire")) {
        responseText = "I'm available for freelance work and full-time opportunities! You can reach me at johndoe@example.com or through the contact form on this site.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        responseText = "Hi there! How can I help you today? Feel free to ask about my skills, projects, or experience.";
      } else if (lowerInput.includes("name")) {
        responseText = "I'm John Doe, a frontend developer and UI/UX designer. Nice to meet you!";
      }
      
      const botMessage = { id: messages.length + 2, text: responseText, sender: "bot" as const };
      setMessages(prev => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <>
      {/* Chat button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleChatbot}
            className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center z-50"
          >
            <MessageSquare size={24} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] md:w-[400px] h-[500px] rounded-xl bg-background border border-secondary shadow-xl flex flex-col z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-secondary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Volume2 size={16} />
                </div>
                <h3 className="font-bold">Chat with John</h3>
              </div>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleChatbot}
                className="p-1.5 rounded-full hover:bg-secondary/60"
              >
                <X size={18} />
              </motion.button>
            </div>
            
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "bot" ? "justify-start" : "justify-end"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "bot"
                        ? "bg-secondary/60 text-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary/60 p-3 rounded-lg">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                        className="w-2 h-2 rounded-full bg-muted-foreground"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 border-t border-secondary">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2 rounded-full bg-secondary/40 border border-secondary focus:outline-none focus:border-primary"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-full bg-primary text-primary-foreground"
                >
                  <Send size={18} />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
