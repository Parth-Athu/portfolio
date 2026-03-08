import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function PCModel() {
  const { scene } = useGLTF("/models/scene.gltf");
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  scene.traverse((child: any) => {
    if (child.isMesh && child.material) {
      child.material.roughness = Math.min(child.material.roughness, 0.35);
      child.material.metalness = Math.max(child.material.metalness, 0.25);
      child.material.envMapIntensity = 1.8;
    }
  });

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.1,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.04,
      0.02
    );
  });

  return (
    <group ref={groupRef} scale={1.1} position={[0, -0.8, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(0, 0.8, 0);
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
    <div className="w-full h-full">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.3 }}
        >
          <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={42} />
          <CameraSetup />
          <Environment preset="city" />
          
          <ambientLight intensity={0.7} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-3, 3, 5]} intensity={0.4} />
          
          {/* Key light above */}
          <pointLight position={[0, 4, 2]} intensity={1} color="#ffffff" />
          
          {/* Monitor screen glow */}
          <pointLight position={[0, 1.5, 1.5]} intensity={0.4} color="#60a5fa" distance={3} />
          
          {/* RGB PC case glow */}
          <pointLight position={[2, 1.2, 0]} intensity={0.8} color="#a855f7" distance={4} />
          <pointLight position={[2, 0.6, 0]} intensity={0.6} color="#06b6d4" distance={3} />
          <pointLight position={[2, 1.8, 0]} intensity={0.4} color="#ec4899" distance={3} />
          
          {/* Keyboard RGB glow */}
          <pointLight position={[0, 0.1, 1.2]} intensity={0.3} color="#14b8a6" distance={2} />
          
          {/* Fill */}
          <pointLight position={[-3, 2, 3]} intensity={0.5} color="#e2e8f0" />
          <pointLight position={[3, 2, 3]} intensity={0.3} color="#e2e8f0" />
          
          <PCModel />
          <ContactShadows position={[0, -0.8, 0]} opacity={0.6} scale={14} blur={2.5} far={5} color="#000000" />
        </Canvas>
      </Suspense>
    </div>
  );
}

useGLTF.preload("/models/scene.gltf");
