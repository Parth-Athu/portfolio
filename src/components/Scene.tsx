import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function PCModel() {
  const { scene } = useGLTF("/models/scene.gltf");
  
  // Make materials more reflective/premium
  scene.traverse((child: any) => {
    if (child.isMesh && child.material) {
      child.material.roughness = Math.min(child.material.roughness, 0.4);
      child.material.metalness = Math.max(child.material.metalness, 0.2);
      child.material.envMapIntensity = 1.5;
    }
  });

  return (
    <group scale={0.8} position={[0, -0.3, 0]} rotation={[0, 0, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(0, 1, 0);
  });
  return null;
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse glow-teal" />
    </div>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        >
          <PerspectiveCamera makeDefault position={[0, 2.2, 6]} fov={45} />
          <CameraSetup />
          
          {/* Environment for realistic reflections */}
          <Environment preset="city" />
          
          {/* Ambient fill */}
          <ambientLight intensity={0.6} />
          
          {/* Main directional light */}
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          
          {/* Above desk key light */}
          <pointLight position={[0, 3, 2]} intensity={1.2} color="#ffffff" />
          
          {/* RGB glow from PC case fans */}
          <pointLight position={[2.2, 1.2, -0.3]} intensity={0.6} color="#14b8a6" distance={4} />
          <pointLight position={[2.2, 0.6, -0.3]} intensity={0.4} color="#8b5cf6" distance={3} />
          <pointLight position={[2.2, 1.8, -0.3]} intensity={0.3} color="#06b6d4" distance={3} />
          
          {/* Keyboard glow */}
          <pointLight position={[0, 0.3, 1]} intensity={0.3} color="#14b8a6" distance={2} />
          
          {/* Fill lights */}
          <pointLight position={[-3, 2, 3]} intensity={0.4} color="#e2e8f0" />
          <pointLight position={[3, 2, 3]} intensity={0.3} color="#e2e8f0" />
          
          <PCModel />
          <ContactShadows position={[0, -0.3, 0]} opacity={0.5} scale={12} blur={2} far={5} color="#0a0a0a" />
        </Canvas>
      </Suspense>
    </div>
  );
}

useGLTF.preload("/models/scene.gltf");
