import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function PCModel() {
  const { scene } = useGLTF("/models/scene.gltf");
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    // Subtle mouse parallax only - no base rotation so desk faces user directly
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.1,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.03,
      0.03
    );
  });

  return (
    <group ref={groupRef} scale={0.9} position={[0, 0, 0]}>
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
          gl={{ alpha: true, antialias: true }}
        >
          <PerspectiveCamera makeDefault position={[0, 2.5, 6]} fov={45} />
          <CameraSetup />
          <Environment preset="night" />
          
          {/* Soft ambient */}
          <ambientLight intensity={0.4} />
          
          {/* Above desk light */}
          <pointLight position={[0, 4, 2]} intensity={0.7} color="#ffffff" />
          
          {/* RGB glow from PC case */}
          <pointLight position={[2.5, 1.5, 0]} intensity={0.5} color="#14b8a6" distance={6} />
          <pointLight position={[2.5, 0.8, 0]} intensity={0.3} color="#8b5cf6" distance={4} />
          
          {/* Fill lights */}
          <pointLight position={[-3, 2, 3]} intensity={0.3} color="#06b6d4" />
          <pointLight position={[3, 2, 3]} intensity={0.2} color="#14b8a6" />
          
          <spotLight position={[0, 6, 3]} angle={0.5} penumbra={1} intensity={0.4} color="#e2e8f0" />
          
          <PCModel />
          <ContactShadows position={[0, -0.01, 0]} opacity={0.4} scale={14} blur={2} far={5} color="#0d9488" />
        </Canvas>
      </Suspense>
    </div>
  );
}

useGLTF.preload("/models/scene.gltf");
