import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface SpaceParticlesProps {
  count?: number;
}

export function SpaceParticles({ count = 1000 }: SpaceParticlesProps) {
  const particlesRef = useRef<THREE.Points>(null);
  
  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true,
    color: new THREE.Color("#ffffff"),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });
  
  // Generate random positions for the particles
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Position in a sphere
    const radius = Math.random() * 50 + 20;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);
    
    // Assign colors (blue to purple gradient)
    colors[i3] = 0.2 + Math.random() * 0.2;         // R: low
    colors[i3 + 1] = 0.3 + Math.random() * 0.3;     // G: medium
    colors[i3 + 2] = 0.7 + Math.random() * 0.3;     // B: high
  }
  
  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  particlesMaterial.vertexColors = true;
  
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
