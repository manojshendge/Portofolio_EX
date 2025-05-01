import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@/components/Loader";
import { Layout } from "@/components/Layout";
import { Experience } from "@/Experience";
import { useAudio } from "@/lib/stores/useAudio";
import { Helmet } from "react-helmet-async";

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
        <title>John Doe | Interactive 3D Portfolio</title>
        <meta name="description" content="Explore my 3D interactive portfolio featuring my projects, skills, and experience in web development and design." />
      </Helmet>

      {!loaded && <Loader />}

      <div className={`app-container ${loaded ? 'loaded' : 'loading'}`}>
        <Canvas
          shadows
          camera={{
            position: [0, 2, 10],
            fov: 45,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "default"
          }}
        >
          <Suspense fallback={null}>
            <Experience />
          </Suspense>
        </Canvas>

        <Layout />
      </div>
    </>
  );
}

export default App;
