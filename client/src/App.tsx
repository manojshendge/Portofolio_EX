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
        {/* Background animation with particles */}
        <div className="space-background">
          <div className="stars-container">
            {[...Array(100)].map((_, i) => (
              <motion.div
                key={i}
                className="star"
                initial={{ 
                  top: `${Math.random() * 100}%`, 
                  left: `${Math.random() * 100}%`,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{ 
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1]
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 5
                }}
                style={{
                  position: 'absolute',
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  backgroundColor: `hsl(${210 + Math.random() * 30}, 100%, ${70 + Math.random() * 30}%)`,
                  borderRadius: '50%',
                  boxShadow: `0 0 ${Math.random() * 10 + 5}px hsl(210, 100%, 70%)`
                }}
              />
            ))}
          </div>
        </div>

        <Layout />
      </motion.div>
    </>
  );
}

export default App;
