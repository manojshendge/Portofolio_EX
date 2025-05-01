import { useEffect, useState } from "react";
import { Loader } from "@/components/Loader";
import { Layout } from "@/components/Layout";
import { useAudio } from "@/lib/stores/useAudio";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [loaded, setLoaded] = useState(false);
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  // Load audio assets
  useEffect(() => {
    // Background music
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.2;
    setBackgroundMusic(bgMusic);
    
    // Hit sound effect
    const hit = new Audio("/sounds/hit.mp3");
    hit.volume = 0.3;
    setHitSound(hit);
    
    // Success sound effect
    const success = new Audio("/sounds/success.mp3");
    success.volume = 0.4;
    setSuccessSound(success);

    // Preload audio files
    bgMusic.load();
    hit.load();
    success.load();
    
    console.log("Audio assets loaded");
    
    // Set loaded after a minimum time to avoid flickering
    setTimeout(() => setLoaded(true), 2000);
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return (
    <>
      <Helmet>
        <title>John Doe | Interactive Portfolio</title>
        <meta name="description" content="Explore my interactive portfolio featuring my projects, skills, and experience in web development and design." />
      </Helmet>

      <AnimatePresence>
        {!loaded && <Loader />}
      </AnimatePresence>

      <motion.div 
        className={`app-container ${loaded ? 'loaded' : 'loading'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Professional background with subtle patterns */}
        <div className="page-background">
          <div className="pattern-overlay"></div>
          
          {/* Subtle animated elements - much more subtle and professional looking */}
          <motion.div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            {/* Geometric shapes in the background */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-blue-600/5 border border-blue-100"
                initial={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  width: `${Math.random() * 100 + 50}px`,
                  height: `${Math.random() * 100 + 50}px`,
                  opacity: 0.5
                }}
                animate={{ 
                  y: [0, -10, 0],
                  opacity: [0.3, 0.5, 0.3],
                  rotate: 360
                }}
                transition={{ 
                  duration: Math.random() * 20 + 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
            
            {/* Professional accent lines */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
          </motion.div>
        </div>

        <Layout />
      </motion.div>
    </>
  );
}

export default App;
