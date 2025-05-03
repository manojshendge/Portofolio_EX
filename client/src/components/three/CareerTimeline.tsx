import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";
import { usePortfolio } from "@/lib/stores/usePortfolio";
import { data } from "@/lib/data";

interface CareerTimelineProps {
  position?: [number, number, number];
}

export function CareerTimeline({ position = [0, 0, 0] }: CareerTimelineProps) {
  const { currentSection } = usePortfolio();
  const groupRef = useRef<THREE.Group>(null);
  const lineRef = useRef<THREE.Line>(null);
  const pointsRef = useRef<THREE.Points>(null);
  
  // Create the timeline path
  const curve = useMemo(() => {
    const points = [];
    const segmentCount = 50;
    
    for (let i = 0; i <= segmentCount; i++) {
      const t = i / segmentCount;
      const x = Math.sin(t * Math.PI * 2) * 4;
      const y = t * 3;
      const z = Math.cos(t * Math.PI * 2) * 4;
      points.push(new THREE.Vector3(x, y, z));
    }
    
    return new THREE.CatmullRomCurve3(points);
  }, []);
  
  // Create line geometry for the path
  const lineGeometry = useMemo(() => {
    const points = curve.getPoints(100);
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve]);
  
  // Create point geometry for career milestones
  const pointsGeometry = useMemo(() => {
    // Evenly space the career milestones along the curve
    const points = data.career.map((_, index) => {
      const t = index / (data.career.length - 1);
      return curve.getPoint(t);
    });
    
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [curve]);
  
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    
    // Slowly rotate the timeline
    const time = clock.getElapsedTime();
    groupRef.current.rotation.y = time * 0.1;
    
    // If in the career section, scale up, otherwise scale down
    if (currentSection === "career") {
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 1, 0.1));
    } else {
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, 0.1, 0.1));
    }
  });

  return (
    <group ref={groupRef} position={new THREE.Vector3(...position)}>
      {/* Timeline path */}
      <primitive object={new THREE.Line(lineGeometry, new THREE.LineBasicMaterial({ color: "#5685ff", linewidth: 2 }))} />

      
      {/* Career milestone points */}
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial color="#ffffff" size={0.2} sizeAttenuation />
      </points>
      
      {/* Text labels for career milestones */}
      {data.career.map((career, index) => {
        const t = index / (data.career.length - 1);
        const point = curve.getPoint(t);
        
        return (
          <group key={index} position={[point.x, point.y, point.z]}>
            {/* Year/period text */}
            <Text
              font="/fonts/inter.json"
              position={[0, 0.3, 0]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {career.period}
            </Text>
            
            {/* Career title */}
            <Text
              font="/fonts/inter.json"
              position={[0, 0, 0]}
              fontSize={0.15}
              color="#bbbbbb"
              anchorX="center"
              anchorY="middle"
            >
              {career.title}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function useMemo<T>(factory: () => T, deps: React.DependencyList): T {
  const ref = useRef<{ deps: React.DependencyList; obj: T | undefined }>({
    deps,
    obj: undefined
  });
  
  if (ref.current.obj === undefined ||
      !ref.current.deps.every((dep, i) => Object.is(dep, deps[i]))) {
    ref.current.deps = deps;
    ref.current.obj = factory();
  }
  
  return ref.current.obj;
}
