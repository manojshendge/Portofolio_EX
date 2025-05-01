import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Text, Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface HeroSceneProps {
  position?: [number, number, number];
}

export function HeroScene({ position = [0, 0, 0] }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const time = useRef(0);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    // Update time
    time.current += delta;
    
    // Make the group follow mouse in the opposite direction (parallax effect)
    const mouseX = state.mouse.x * 0.15;
    const mouseY = state.mouse.y * 0.15;
    
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y || 0,
      mouseX,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x || 0,
      mouseY,
      0.05
    );
    
    // Add a gentle floating motion
    groupRef.current.position.y = Math.sin(time.current * 0.5) * 0.2;
  });

  return (
    <group ref={groupRef} position={new THREE.Vector3(...position)}>
      {/* Central cosmic platform */}
      <group position={[0, 0, 0]}>
        {/* Platform base */}
        <mesh position={[0, -1.8, 0]} receiveShadow castShadow>
          <cylinderGeometry args={[3, 3.5, 0.2, 32]} />
          <meshStandardMaterial 
            color="#1a2c4d" 
            roughness={0.3} 
            metalness={0.8} 
            emissive="#0c1e38"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Glowing ring */}
        <mesh position={[0, -1.7, 0]} receiveShadow>
          <torusGeometry args={[3.2, 0.1, 16, 100]} />
          <meshStandardMaterial 
            color="#4d9fff" 
            roughness={0.1} 
            metalness={0.9}
            emissive="#4d9fff"
            emissiveIntensity={1}
          />
        </mesh>
        
        {/* Center holographic projector */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[0.5, 0.7, 0.4, 16]} />
          <meshStandardMaterial 
            color="#2c4366" 
            roughness={0.2} 
            metalness={0.9}
            emissive="#0a1c38"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Holographic projection beam */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[2, 3, 32, 1, true, 0, Math.PI * 2]} />
          <meshBasicMaterial 
            color="#82d8ff" 
            transparent 
            opacity={0.15} 
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
      
      {/* Center floating sphere */}
      <Float speed={1} rotationIntensity={0.2} floatIntensity={1}>
        <mesh position={[0, 0.5, 0]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <MeshDistortMaterial 
            color="#0a84ff" 
            speed={2} 
            distort={0.3} 
            metalness={1}
            roughness={0}
            emissive="#0066cc"
            emissiveIntensity={0.5}
          />
        </mesh>
        
        {/* Orbiting ring */}
        <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.4, 1.5, 64]} />
          <meshStandardMaterial 
            color="#4dc4ff" 
            roughness={0.3} 
            metalness={0.9}
            emissive="#4dc4ff"
            emissiveIntensity={0.8}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
          />
        </mesh>
      </Float>
      
      {/* Floating technology text */}
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={1.2}>
        <Text
          font="/fonts/inter.json"
          position={[-2.5, 2, 0]}
          rotation={[0, 0.2, 0]}
          fontSize={0.5}
          color="#4dc4ff"
          anchorX="center"
          anchorY="middle"
        >
          React
        </Text>
        <pointLight position={[-2.5, 2, 0]} color="#4dc4ff" intensity={0.6} distance={3} />
      </Float>
      
      <Float speed={2} rotationIntensity={0.3} floatIntensity={1.5}>
        <Text
          font="/fonts/inter.json"
          position={[2.5, 2.2, -0.5]}
          rotation={[0, -0.2, 0]}
          fontSize={0.6}
          color="#00ccff"
          anchorX="center"
          anchorY="middle"
        >
          Three.js
        </Text>
        <pointLight position={[2.5, 2.2, -0.5]} color="#00ccff" intensity={0.6} distance={3} />
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
        <Text
          font="/fonts/inter.json"
          position={[2, 0.8, 1.5]}
          rotation={[0, -0.4, 0]}
          fontSize={0.5}
          color="#ffcc00"
          anchorX="center"
          anchorY="middle"
        >
          JavaScript
        </Text>
        <pointLight position={[2, 0.8, 1.5]} color="#ffcc00" intensity={0.5} distance={3} />
      </Float>
      
      <Float speed={1.7} rotationIntensity={0.5} floatIntensity={1.3}>
        <Text
          font="/fonts/inter.json"
          position={[-2, 0.4, 1.8]}
          rotation={[0, 0.4, 0]}
          fontSize={0.5}
          color="#3178c6"
          anchorX="center"
          anchorY="middle"
        >
          TypeScript
        </Text>
        <pointLight position={[-2, 0.4, 1.8]} color="#3178c6" intensity={0.5} distance={3} />
      </Float>
      
      {/* Floating geometric elements */}
      <Float speed={0.8} rotationIntensity={0.6} floatIntensity={1}>
        <RoundedBox args={[0.8, 0.8, 0.8]} radius={0.1} position={[-3, 1.2, 1]}>
          <MeshDistortMaterial 
            color="#ff3399" 
            speed={2} 
            distort={0.2}
            metalness={0.8}
            roughness={0.2} 
            emissive="#cc0066"
            emissiveIntensity={0.5}
          />
        </RoundedBox>
        <pointLight position={[-3, 1.2, 1]} color="#ff3399" intensity={0.5} distance={2} />
      </Float>
      
      <Float speed={1.4} rotationIntensity={0.7} floatIntensity={1.2}>
        <mesh position={[3, 1.5, 0]}>
          <torusKnotGeometry args={[0.5, 0.15, 128, 16]} />
          <MeshDistortMaterial 
            color="#9966ff" 
            speed={3} 
            distort={0.1}
            metalness={0.8}
            roughness={0.2}
            emissive="#6633cc"
            emissiveIntensity={0.5}
          />
        </mesh>
        <pointLight position={[3, 1.5, 0]} color="#9966ff" intensity={0.5} distance={2} />
      </Float>
      
      {/* Ambient point lights for general illumination */}
      <pointLight position={[0, 2, 3]} color="#ffffff" intensity={0.5} distance={10} />
      <pointLight position={[0, -2, -3]} color="#4dc4ff" intensity={0.3} distance={10} />
    </group>
  );
}
