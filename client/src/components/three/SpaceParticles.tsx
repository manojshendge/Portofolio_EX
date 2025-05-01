import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpaceParticlesProps {
  count?: number;
}

export function SpaceParticles({ count = 800 }: SpaceParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);
  
  // Create particles with larger size and more vibrant colors
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    sizeAttenuation: true,
    color: new THREE.Color("#ffffff"),
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });
  
  // Generate random positions for the particles
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Position in a sphere with more concentration at viewing areas
    const radius = Math.random() * 60 + 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    // Randomize sizes for more depth perception
    sizes[i] = Math.random() * 0.1 + 0.02;
    
    // Create a more vibrant cosmic color palette (cyans, purples, pinks)
    // Choose one of the three color schemes randomly
    const colorChoice = Math.floor(Math.random() * 3);
    
    if (colorChoice === 0) {
      // Cyan/blue stars
      colors[i3] = 0.1 + Math.random() * 0.3;       // R: low-medium
      colors[i3 + 1] = 0.6 + Math.random() * 0.4;   // G: high
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;   // B: very high
    } else if (colorChoice === 1) {
      // Purple/magenta stars
      colors[i3] = 0.6 + Math.random() * 0.4;       // R: high
      colors[i3 + 1] = 0.1 + Math.random() * 0.2;   // G: low
      colors[i3 + 2] = 0.8 + Math.random() * 0.2;   // B: very high
    } else {
      // White/blue stars (brightest)
      colors[i3] = 0.8 + Math.random() * 0.2;       // R: very high
      colors[i3 + 1] = 0.8 + Math.random() * 0.2;   // G: very high
      colors[i3 + 2] = 1.0;                         // B: maximum
    }
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
  particlesMaterial.vertexColors = true;
  particlesMaterial.vertexSizes = true;
  
  useFrame(({ clock }) => {
    if (!particlesRef.current) return;
    
    // Slowly rotate the particles
    const time = clock.getElapsedTime() * 0.05;
    particlesRef.current.rotation.y = time;
  });

  return (
    <points ref={particlesRef} geometry={particlesGeometry} material={particlesMaterial} />
  );
}
