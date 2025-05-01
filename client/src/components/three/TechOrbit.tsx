import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "@/lib/stores/usePortfolio";

interface TechOrbitProps {
  position?: [number, number, number];
}

interface Technology {
  name: string;
  color: string;
  size: number;
  orbitRadius: number;
  orbitSpeed: number;
  phase: number;
}

export function TechOrbit({ position = [0, 0, 0] }: TechOrbitProps) {
  const { currentSection } = usePortfolio();
  const groupRef = useRef<THREE.Group>(null);
  
  // Define tech stack data - using fewer items for better performance
  const techStack = useMemo<Technology[]>(() => [
    { name: "React", color: "#61dafb", size: 1.2, orbitRadius: 4, orbitSpeed: 0.1, phase: 0 },
    { name: "JavaScript", color: "#f7df1e", size: 1.0, orbitRadius: 3.2, orbitSpeed: 0.15, phase: 1 },
    { name: "TypeScript", color: "#3178c6", size: 1.0, orbitRadius: 4.5, orbitSpeed: 0.12, phase: 2 },
    { name: "Three.js", color: "#ffffff", size: 1.1, orbitRadius: 5.5, orbitSpeed: 0.07, phase: 3 },
    { name: "Tailwind", color: "#0ea5e9", size: 0.9, orbitRadius: 3.8, orbitSpeed: 0.13, phase: 4 },
  ], []);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    // Slowly rotate the entire tech universe
    const time = clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.05;
    
    // If not in the tech stack section, reduce the scale
    if (currentSection === "techStack") {
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1));
    } else {
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 0.1, 0.1));
    }
  });

  return (
    <group ref={groupRef} position={new THREE.Vector3(...position)}>
      {/* Center sphere (representing the developer/user) */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial 
          color="#82D8FF" 
          roughness={0.1} 
          metalness={0.9} 
          emissive="#4080FF"
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Ambient light at center */}
      <pointLight position={[0, 0, 0]} color="#82D8FF" intensity={1.5} distance={10} />
      
      {/* Tech orbits */}
      {techStack.map((tech, index) => (
        <group key={index}>
          {/* Orbit path */}
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[tech.orbitRadius - 0.02, tech.orbitRadius + 0.02, 64]} />
            <meshBasicMaterial color={tech.color} transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
          
          {/* Tech icon/sphere */}
          <TechSphere tech={tech} />
        </group>
      ))}
    </group>
  );
}

interface TechSphereProps {
  tech: Technology;
}

function TechSphere({ tech }: TechSphereProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (!sphereRef.current) return;
    
    // Calculate position on orbit
    const time = clock.getElapsedTime() + tech.phase;
    const x = Math.cos(time * tech.orbitSpeed) * tech.orbitRadius;
    const z = Math.sin(time * tech.orbitSpeed) * tech.orbitRadius;
    
    // Update position
    sphereRef.current.position.x = x;
    sphereRef.current.position.z = z;
    
    // Always face the center
    sphereRef.current.lookAt(0, 0, 0);
    
    // Add a subtle pulse effect
    const pulse = Math.sin(time * 2) * 0.05 + 1;
    sphereRef.current.scale.set(pulse, pulse, pulse);
  });
  
  return (
    <group>
      <pointLight
        position={[tech.orbitRadius, 0, 0]}
        color={tech.color}
        intensity={0.5}
        distance={3}
      />
      
      <mesh ref={sphereRef} position={[tech.orbitRadius, 0, 0]} castShadow>
        <sphereGeometry args={[tech.size / 2, 12, 12]} />
        <meshStandardMaterial 
          color={tech.color} 
          roughness={0.2} 
          metalness={0.9} 
          emissive={tech.color}
          emissiveIntensity={0.4}
        />
        
        <Html distanceFactor={8} position={[0, tech.size * 0.8, 0]} center transform>
          <div className="tech-label" style={{ 
            color: 'white', 
            background: 'rgba(10, 15, 30, 0.8)', 
            padding: '3px 8px', 
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: 'bold',
            textShadow: '0 0 5px rgba(0,0,0,0.5)',
            whiteSpace: 'nowrap',
            boxShadow: '0 0 10px rgba(0,0,0,0.3)'
          }}>
            {tech.name}
          </div>
        </Html>
      </mesh>
    </group>
  );
}
