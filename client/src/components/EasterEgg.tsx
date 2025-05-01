import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Confetti from "react-confetti";
import { useAudio } from "@/lib/stores/useAudio";

export function EasterEgg() {
  const [isEggFound, setIsEggFound] = useState(false);
  const [isGameActive, setIsGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds game
  const { playHit, playSuccess } = useAudio();
  
  const konami = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  const [konamiIndex, setKonamiIndex] = useState(0);
  
  // Konami code detector
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konami[konamiIndex]) {
        if (konamiIndex === konami.length - 1) {
          // Konami code completed
          setIsEggFound(true);
          playSuccess();
          setKonamiIndex(0);
        } else {
          // Continue sequence
          setKonamiIndex(prev => prev + 1);
          playHit();
        }
      } else {
        // Reset sequence
        setKonamiIndex(0);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konamiIndex, playHit, playSuccess]);
  
  // Game timer
  useEffect(() => {
    let timer: number;
    
    if (isGameActive && timeLeft > 0) {
      timer = window.setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
      playSuccess();
    }
    
    return () => clearTimeout(timer);
  }, [isGameActive, timeLeft, playSuccess]);
  
  const startGame = () => {
    setIsGameActive(true);
    setScore(0);
    setTimeLeft(30);
  };
  
  const closeEasterEgg = () => {
    setIsEggFound(false);
    setIsGameActive(false);
    setScore(0);
  };
  
  const handleBubbleClick = () => {
    if (isGameActive) {
      setScore(prev => prev + 1);
      playHit();
    }
  };

  return (
    <AnimatePresence>
      {isEggFound && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        >
          {timeLeft === 0 && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-background border border-secondary rounded-xl shadow-xl w-[90%] max-w-lg p-6 relative"
          >
            <button
              onClick={closeEasterEgg}
              className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-secondary/60"
            >
              <X size={18} />
            </button>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2">
                {!isGameActive && timeLeft > 0 ? "You found the Easter Egg!" : timeLeft === 0 ? "Game Over!" : "Click the bubbles!"}
              </h3>
              
              {!isGameActive && timeLeft > 0 && (
                <p className="text-muted-foreground">
                  You discovered the secret Konami code! Ready to play a quick game?
                </p>
              )}
              
              {isGameActive && (
                <div className="flex items-center justify-between mb-4">
                  <div className="font-bold">Score: {score}</div>
                  <div className="font-bold">Time: {timeLeft}s</div>
                </div>
              )}
              
              {timeLeft === 0 && (
                <p className="text-xl mb-4">Your final score: <span className="text-primary font-bold">{score}</span></p>
              )}
            </div>
            
            {isGameActive ? (
              <div className="relative h-[300px] border border-secondary rounded-lg overflow-hidden bg-black/20">
                {Array.from({ length: 20 }).map((_, i) => (
                  <motion.button
                    key={i}
                    initial={{ 
                      x: Math.random() * 100 - 50 + "%", 
                      y: Math.random() * 100 - 50 + "%",
                      scale: 0
                    }}
                    animate={{ 
                      x: Math.random() * 100 - 50 + "%", 
                      y: Math.random() * 100 - 50 + "%",
                      scale: 1
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse" 
                    }}
                    onClick={handleBubbleClick}
                    className="absolute w-8 h-8 rounded-full bg-primary/80 hover:bg-primary transform -translate-x-1/2 -translate-y-1/2"
                  />
                ))}
              </div>
            ) : (
              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startGame}
                  className="px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium"
                >
                  {timeLeft === 0 ? "Play Again" : "Start Game"}
                </motion.button>
              </div>
            )}
            
            <div className="mt-6 text-xs text-center text-muted-foreground">
              Psst... The Konami code is: ↑ ↑ ↓ ↓ ← → ← → B A
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
