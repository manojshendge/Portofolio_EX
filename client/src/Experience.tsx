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
  
  // Define camera positions and targets for each section
  const cameraSettings = {
    hero: { position: [0, 2, 10], lookAt: [0, 0, 0] },
    about: { position: [0, 2, 5], lookAt: [0, 0, 0] },
    techStack: { position: [0, 5, 0], lookAt: [0, 5, -10] },
    career: { position: [0, 3, -10], lookAt: [0, 0, -20] },
    projects: { position: [0, 2, -25], lookAt: [0, 0, -30] },
    testimonials: { position: [0, 2, -32], lookAt: [0, 1, -35] },
    contact: { position: [0, 1, -38], lookAt: [0, 0, -40] }
  };
  
  // Store current camera positions for smooth transitions
  const currentPos = useRef(new THREE.Vector3(0, 2, 10));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  
  useFrame((state, delta) => {
    // Get target settings for the current section
    const targetSettings = cameraSettings[currentSection] || cameraSettings.hero;
    
    // Smoothly interpolate camera position
    currentPos.current.x = THREE.MathUtils.lerp(
      currentPos.current.x, 
      targetSettings.position[0], 
      0.03
    );
    currentPos.current.y = THREE.MathUtils.lerp(
      currentPos.current.y, 
      targetSettings.position[1], 
      0.03
    );
    currentPos.current.z = THREE.MathUtils.lerp(
      currentPos.current.z, 
      targetSettings.position[2], 
      0.03
    );
    
    // Update camera position
    camera.position.copy(currentPos.current);
    
    // Smoothly interpolate look-at target
    currentLookAt.current.x = THREE.MathUtils.lerp(
      currentLookAt.current.x, 
      targetSettings.lookAt[0], 
      0.05
    );
    currentLookAt.current.y = THREE.MathUtils.lerp(
      currentLookAt.current.y, 
      targetSettings.lookAt[1], 
      0.05
    );
    currentLookAt.current.z = THREE.MathUtils.lerp(
      currentLookAt.current.z, 
      targetSettings.lookAt[2], 
      0.05
    );
    
    // Update camera look-at target
    camera.lookAt(currentLookAt.current);
    
    // Gentle ambient animation for the scene
    const time = state.clock.getElapsedTime();
    state.scene.rotation.y = Math.sin(time * 0.05) * 0.03;
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
      
      <Environment preset="night" />
      
      {/* Main directional light */}
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        castShadow 
        shadow-mapSize={[1024, 1024]}
        color="#ffffff"
      />
      
      {/* Fill light from opposite side */}
      <directionalLight 
        position={[-5, 3, -5]} 
        intensity={0.8} 
        color="#8080ff"
      />
      
      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.6} color="#334" />
      
      <SpaceParticles count={1000} />
      
      {/* Main 3D components that correspond to sections */}
      <HeroScene position={[0, 0, 0]} />
      <TechOrbit position={[0, 5, -10]} />
      <CareerTimeline position={[0, 0, -20]} />
      <PortfolioItems position={[0, 0, -30]} />
    </>
  );
}
