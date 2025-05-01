import { useState, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import * as THREE from "three";

export function use3DModel(modelPath: string) {
  const [model, setModel] = useState<THREE.Group | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    // Load the model
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        setModel(gltf.scene);
        setIsLoading(false);
      },
      (progress) => {
        // Optional progress callback
        console.log(`Loading model: ${Math.round((progress.loaded / progress.total) * 100)}%`);
      },
      (err) => {
        console.error('Error loading model:', err);
        setError(err);
        setIsLoading(false);
      }
    );
    
    return () => {
      // Clean up
      if (model) {
        model.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            if (obj.geometry) obj.geometry.dispose();
            
            if (obj.material) {
              if (Array.isArray(obj.material)) {
                obj.material.forEach(material => material.dispose());
              } else {
                obj.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [modelPath]);
  
  return { model, isLoading, error };
}
