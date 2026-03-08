import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PresentationControls, Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function GlowingSphere() {
  const groupRef = useRef<THREE.Group>(null);
  const sphereRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.1;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.08, 0.02);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.12 + t * 0.06, 0.02);
  });

  return (
    <group ref={groupRef} scale={2}>
      {/* Main sphere */}
      <mesh ref={sphereRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#0d9488"
          metalness={0.8}
          roughness={0.1}
          distort={0.15}
          speed={1}
          emissive="#14b8a6"
          emissiveIntensity={0.3}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh scale={1.02}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial color="#2dd4bf" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Outer glow ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.3, 0.008, 16, 100]} />
        <meshStandardMaterial color="#2dd4bf" emissive="#2dd4bf" emissiveIntensity={1.5} transparent opacity={0.5} />
      </mesh>

      {/* Floating label nodes */}
      {[
        { pos: [1.4, 0.6, 0.3] as [number, number, number], label: "AWS" },
        { pos: [-1.3, 0.4, 0.5] as [number, number, number], label: "Docker" },
        { pos: [0.8, -0.9, 0.8] as [number, number, number], label: "K8s" },
        { pos: [-0.7, 1.1, -0.3] as [number, number, number], label: "CI/CD" },
        { pos: [0.3, -0.3, 1.3] as [number, number, number], label: "Git" },
      ].map((item, i) => (
        <Float key={item.label} speed={1 + i * 0.2} rotationIntensity={0.1} floatIntensity={0.3}>
          <group position={item.pos}>
            <mesh>
              <boxGeometry args={[0.35, 0.14, 0.04]} />
              <meshStandardMaterial color="#1a1a1a" emissive="#0d9488" emissiveIntensity={0.15} />
            </mesh>
          </group>
        </Float>
      ))}
    </group>
  );
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
          camera={{ position: [0, 0, 5.5], fov: 42 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Environment preset="night" />
          <PresentationControls
            global
            snap
            speed={1}
            zoom={0.85}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 6, Math.PI / 6]}
            azimuth={[-Math.PI / 6, Math.PI / 6]}
          >
            <GlowingSphere />
          </PresentationControls>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.6} color="#14b8a6" />
          <pointLight position={[-5, -5, 5]} intensity={0.3} color="#2dd4bf" />
          <pointLight position={[0, 3, 3]} intensity={0.2} color="#0d9488" />
        </Canvas>
      </Suspense>
    </div>
  );
}
