import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stage, PresentationControls, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.3;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.3,
      0.05
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.3 + t * 0.15,
      0.05
    );
  });

  return (
    <mesh ref={meshRef} scale={1.8}>
      <torusKnotGeometry args={[1, 0.35, 200, 32]} />
      <MeshDistortMaterial
        color="#a855f7"
        metalness={0.9}
        roughness={0.15}
        distort={0.2}
        speed={2}
        envMapIntensity={1}
      />
    </mesh>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse-glow glow-purple" />
    </div>
  );
}

export default function Scene() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Stage intensity={0.6} environment="city" adjustCamera={false}>
            <PresentationControls
              global
              snap
              speed={1.5}
              zoom={0.8}
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <FloatingShape />
            </PresentationControls>
          </Stage>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#a855f7" />
          <pointLight position={[-5, -5, 5]} intensity={0.3} color="#6366f1" />
        </Canvas>
      </Suspense>
    </div>
  );
}
