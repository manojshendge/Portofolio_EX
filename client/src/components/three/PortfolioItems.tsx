import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, RoundedBox, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "@/lib/stores/usePortfolio";
import { data } from "@/lib/data";

interface PortfolioItemsProps {
  position?: [number, number, number];
}

export function PortfolioItems({ position = [0, 0, 0] }: PortfolioItemsProps) {
  const { currentSection } = usePortfolio();
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    // Rotate the group based on current section
    if (currentSection === "projects") {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.1;
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1));
    } else {
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 0.1, 0.1));
    }
  });

  return (
    <group ref={groupRef} position={new THREE.Vector3(...position)}>
      {/* Portfolio items positioned in a circular layout */}
      {data.projects.slice(0, 6).map((project, index) => {
        const angle = (index / 6) * Math.PI * 2;
        const radius = 5;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Color based on index
        const colors = ["#5685ff", "#ff5588", "#5e35b1", "#ffa000", "#6cc24a", "#e34f26"];
        const color = colors[index % colors.length];
        
        return (
          <group key={index} position={[x, 0, z]} rotation={[0, -angle, 0]}>
            <RoundedBox args={[2, 1.5, 0.2]} radius={0.1} smoothness={4}>
              <MeshWobbleMaterial 
                color={color} 
                factor={0.1} 
                speed={0.5} 
                metalness={0.5} 
                roughness={0.3} 
              />
            </RoundedBox>
            
            <Text
              font="/fonts/inter.json"
              position={[0, 0, 0.11]}
              fontSize={0.15}
              maxWidth={1.8}
              textAlign="center"
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {project.title}
            </Text>
            
            <Text
              font="/fonts/inter.json"
              position={[0, -0.3, 0.11]}
              fontSize={0.1}
              maxWidth={1.8}
              textAlign="center"
              color="#dddddd"
              anchorX="center"
              anchorY="middle"
            >
              {project.technologies.slice(0, 3).join(", ")}
            </Text>
          </group>
        );
      })}
      
      {/* Center text */}
      <Text
        font="/fonts/inter.json"
        position={[0, 1.5, 0]}
        fontSize={0.5}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        Projects
      </Text>
    </group>
  );
}
