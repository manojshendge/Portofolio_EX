import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

interface FloatingTextProps {
  text: string;
  position: [number, number, number];
  color?: string;
  size?: number;
  rotation?: [number, number, number];
}

export function FloatingText({ 
  text, 
  position, 
  color = "#ffffff", 
  size = 0.5,
  rotation = [0, 0, 0]
}: FloatingTextProps) {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!textRef.current) return;
    
    const time = clock.getElapsedTime();
    
    // Add subtle floating animation
    textRef.current.position.y = position[1] + Math.sin(time) * 0.1;
    
    // Add subtle rotation
    textRef.current.rotation.x = rotation[0] + Math.sin(time * 0.5) * 0.05;
    textRef.current.rotation.y = rotation[1] + Math.cos(time * 0.3) * 0.05;
  });

  return (
    <Text
      ref={textRef}
      font="/fonts/inter.json"
      position={position}
      rotation={rotation}
      fontSize={size}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}
