import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Text, Float, MeshDistortMaterial, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

interface HeroSceneProps {
  position?: [number, number, number];
}

export function HeroScene({ position = [0, 0, 0] }: HeroSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Make the group follow mouse in the opposite direction (parallax effect)
    const mouseX = state.mouse.x * 0.1;
    const mouseY = state.mouse.y * 0.1;
    
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
  });

  return (
    <group ref={groupRef} position={new THREE.Vector3(...position)}>
      {/* Floating digital workspace */}
      <group position={[0, 0, 0]}>
        {/* Desk */}
        <mesh position={[0, -1.5, 0]} receiveShadow castShadow>
          <boxGeometry args={[5, 0.2, 3]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.5} metalness={0.2} />
        </mesh>
        
        {/* Monitor */}
        <group position={[0, -0.5, -1]}>
          <mesh receiveShadow castShadow>
            <boxGeometry args={[3, 2, 0.1]} />
            <meshStandardMaterial color="#111111" roughness={0.2} metalness={0.8} />
          </mesh>
          
          {/* Screen */}
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshBasicMaterial color="#1e1e1e" />
          </mesh>
          
          {/* Stand */}
          <mesh position={[0, -1.2, 0.5]} receiveShadow castShadow>
            <cylinderGeometry args={[0.1, 0.2, 0.6, 8]} />
            <meshStandardMaterial color="#333333" roughness={0.5} metalness={0.5} />
          </mesh>
        </group>
        
        {/* Keyboard */}
        <mesh position={[0, -1.38, 0.5]} receiveShadow castShadow>
          <boxGeometry args={[2, 0.1, 0.8]} />
          <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.2} />
        </mesh>
        
        {/* Mouse */}
        <mesh position={[1.5, -1.38, 0.5]} receiveShadow castShadow>
          <capsuleGeometry args={[0.08, 0.2, 4, 8]} />
          <meshStandardMaterial color="#333333" roughness={0.8} metalness={0.2} />
        </mesh>
        
        {/* Coffee cup */}
        <group position={[-1.5, -1.2, 0.5]}>
          <mesh receiveShadow castShadow>
            <cylinderGeometry args={[0.15, 0.12, 0.3, 16]} />
            <meshStandardMaterial color="#555555" roughness={0.2} metalness={0.8} />
          </mesh>
          <mesh position={[0, 0, 0.2]} receiveShadow castShadow>
            <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#555555" roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      </group>
      
      {/* Floating particles/elements */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Text
          font="/fonts/inter.json"
          position={[-2, 2, 0]}
          rotation={[0, 0.2, 0]}
          fontSize={0.5}
          color="#5685ff"
          anchorX="center"
          anchorY="middle"
        >
          React
        </Text>
      </Float>
      
      <Float speed={2} rotationIntensity={0.4} floatIntensity={1.2}>
        <Text
          font="/fonts/inter.json"
          position={[2, 2.5, -0.5]}
          rotation={[0, -0.2, 0]}
          fontSize={0.6}
          color="#61dafb"
          anchorX="center"
          anchorY="middle"
        >
          Three.js
        </Text>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1}>
        <Text
          font="/fonts/inter.json"
          position={[1.5, 1, 1]}
          rotation={[0, -0.4, 0]}
          fontSize={0.4}
          color="#ffca28"
          anchorX="center"
          anchorY="middle"
        >
          JavaScript
        </Text>
      </Float>
      
      {/* Floating 3D elements */}
      <Float speed={1} rotationIntensity={0.6} floatIntensity={0.8}>
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.1} position={[-2, 0.5, 1]}>
          <MeshDistortMaterial color="#ff5588" speed={2} distort={0.3} />
        </RoundedBox>
      </Float>
      
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[2, 0, 1.5]}>
          <torusKnotGeometry args={[0.4, 0.1, 64, 8]} />
          <MeshDistortMaterial color="#5e35b1" speed={3} distort={0.2} />
        </mesh>
      </Float>
      
      {/* Light beams */}
      <group position={[0, 3, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <coneGeometry args={[2, 4, 16, 1, true]} />
          <meshBasicMaterial color="#5685ff" transparent opacity={0.06} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}
