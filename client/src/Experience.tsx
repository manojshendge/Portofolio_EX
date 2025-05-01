import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "./lib/stores/usePortfolio";
import { HeroScene } from "./components/three/HeroScene";
import { TechOrbit } from "./components/three/TechOrbit";
import { CareerTimeline } from "./components/three/CareerTimeline";
import { SpaceParticles } from "./components/three/SpaceParticles";
import { PortfolioItems } from "./components/three/PortfolioItems";

export function Experience() {
  const { camera, gl } = useThree();
  const controls = useRef(null);
  const { currentSection, scrollProgress } = usePortfolio();
  
  // Adjust camera based on current section
  useEffect(() => {
    if (!controls.current) return;
    
    const targetPositions = {
      hero: [0, 2, 10],
      about: [0, 2, 12],
      techStack: [0, 5, 20],
      career: [0, 3, 15],
      projects: [0, 2, 10],
      testimonials: [0, 1, 8],
      contact: [0, 0, 10]
    };
    
    // Get target position for current section
    const targetPosition = targetPositions[currentSection] || targetPositions.hero;
  }, [currentSection, controls]);
  
  useFrame((state, delta) => {
    // Gentle ambient animation
    const time = state.clock.getElapsedTime();
    // Add subtle movement to the entire scene
    state.scene.rotation.y = Math.sin(time * 0.05) * 0.05;
  });

  return (
    <>
      <OrbitControls 
        ref={controls} 
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        makeDefault
      />
      
      <Environment preset="city" />
            
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
      />
      <ambientLight intensity={0.5} />
      
      <SpaceParticles count={1000} />
      
      {/* Main 3D components that correspond to sections */}
      <HeroScene position={[0, 0, 0]} />
      <TechOrbit position={[0, 5, -10]} />
      <CareerTimeline position={[0, 0, -20]} />
      <PortfolioItems position={[0, 0, -30]} />
    </>
  );
}
