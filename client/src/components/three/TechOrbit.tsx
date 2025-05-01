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
  
  // Define tech stack data
  const techStack = useMemo<Technology[]>(() => [
    { name: "React", color: "#61dafb", size: 0.8, orbitRadius: 4, orbitSpeed: 0.1, phase: 0 },
    { name: "JavaScript", color: "#f7df1e", size: 0.7, orbitRadius: 3.2, orbitSpeed: 0.15, phase: 1 },
    { name: "Node.js", color: "#6cc24a", size: 0.6, orbitRadius: 5, orbitSpeed: 0.08, phase: 2 },
    { name: "TypeScript", color: "#3178c6", size: 0.65, orbitRadius: 4.5, orbitSpeed: 0.12, phase: 3 },
    { name: "HTML", color: "#e34f26", size: 0.5, orbitRadius: 3, orbitSpeed: 0.2, phase: 4 },
    { name: "CSS", color: "#264de4", size: 0.5, orbitRadius: 3.5, orbitSpeed: 0.18, phase: 5 },
    { name: "Three.js", color: "#bbb", size: 0.7, orbitRadius: 5.5, orbitSpeed: 0.05, phase: 6 },
    { name: "Tailwind", color: "#0ea5e9", size: 0.55, orbitRadius: 4.8, orbitSpeed: 0.1, phase: 7 },
    { name: "Firebase", color: "#ffa000", size: 0.6, orbitRadius: 4.2, orbitSpeed: 0.13, phase: 8 },
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
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#5685ff" roughness={0.2} metalness={0.8} />
      </mesh>
      
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
  });
  
  return (
    <group>
      <mesh ref={sphereRef} position={[tech.orbitRadius, 0, 0]} castShadow>
        <sphereGeometry args={[tech.size / 2, 16, 16]} />
        <meshStandardMaterial color={tech.color} roughness={0.3} metalness={0.7} />
        
        <Html distanceFactor={10} position={[0, tech.size * 0.8, 0]} center transform>
          <div className="tech-label" style={{ 
            color: 'white', 
            background: 'rgba(0,0,0,0.7)', 
            padding: '2px 6px', 
            borderRadius: '4px',
            fontSize: '10px',
            whiteSpace: 'nowrap'
          }}>
            {tech.name}
          </div>
        </Html>
      </mesh>
    </group>
  );
}
