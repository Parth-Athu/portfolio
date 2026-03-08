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
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.08 + 0.3,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.03,
      0.03
    );
  });

  return (
    <group ref={groupRef} scale={0.6} position={[0, -0.2, 0]} rotation={[0, 0.3, 0]}>
      <primitive object={scene} />
    </group>
  );
}

function CameraSetup() {
  const { camera } = useThree();
  useFrame(() => {
    camera.lookAt(0, 0.6, 0);
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
          <PerspectiveCamera makeDefault position={[0, 2, 5.5]} fov={40} />
          <CameraSetup />
          <Environment preset="night" />
          <ambientLight intensity={0.4} />
          <pointLight position={[0, 3.5, 2]} intensity={0.6} color="#e2e8f0" />
          <pointLight position={[2, 1, 0]} intensity={0.4} color="#14b8a6" distance={5} />
          <pointLight position={[2, 0.5, 0]} intensity={0.2} color="#8b5cf6" distance={4} />
          <pointLight position={[-2, 2, 3]} intensity={0.2} color="#06b6d4" />
          <PCModel />
          <ContactShadows position={[0, -0.2, 0]} opacity={0.35} scale={10} blur={2} far={4} color="#0d9488" />
        </Canvas>
      </Suspense>
    </div>
  );
}

useGLTF.preload("/models/scene.gltf");
