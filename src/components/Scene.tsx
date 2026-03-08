import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stage, PresentationControls, Float, Text } from "@react-three/drei";
import * as THREE from "three";

// Stylized low-poly face/head geometry
function StylizedHead() {
  const meshRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = Math.sin(t * 0.6) * 0.15;
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.15,
      0.03
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      pointer.x * 0.2 + Math.sin(t * 0.3) * 0.1,
      0.03
    );
  });

  return (
    <group ref={meshRef} position={[0, 0, 0]} scale={1.2}>
      {/* Head - elongated sphere */}
      <mesh position={[0, 0.2, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.85}
          roughness={0.15}
          emissive="#7c3aed"
          emissiveIntensity={0.15}
        />
      </mesh>

      {/* Forehead ridge */}
      <mesh position={[0, 0.75, 0.65]} scale={[0.7, 0.15, 0.3]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#9333ea"
          metalness={0.9}
          roughness={0.1}
          emissive="#7c3aed"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Left eye socket */}
      <mesh position={[-0.35, 0.35, 0.8]} scale={[0.2, 0.15, 0.15]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#1e1b4b"
          metalness={1}
          roughness={0}
          emissive="#6366f1"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Right eye socket */}
      <mesh position={[0.35, 0.35, 0.8]} scale={[0.2, 0.15, 0.15]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#1e1b4b"
          metalness={1}
          roughness={0}
          emissive="#6366f1"
          emissiveIntensity={0.8}
        />
      </mesh>

      {/* Nose bridge */}
      <mesh position={[0, 0.15, 0.9]} scale={[0.08, 0.25, 0.15]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color="#9333ea"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Nose tip */}
      <mesh position={[0, 0.0, 1.0]} scale={[0.12, 0.1, 0.1]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Lips / mouth area */}
      <mesh position={[0, -0.25, 0.85]} scale={[0.3, 0.06, 0.12]}>
        <sphereGeometry args={[1, 16, 8]} />
        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>

      {/* Chin */}
      <mesh position={[0, -0.55, 0.6]} scale={[0.35, 0.25, 0.3]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Left cheekbone */}
      <mesh position={[-0.6, 0.1, 0.55]} scale={[0.25, 0.2, 0.2]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color="#9333ea"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Right cheekbone */}
      <mesh position={[0.6, 0.1, 0.55]} scale={[0.25, 0.2, 0.2]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshStandardMaterial
          color="#9333ea"
          metalness={0.85}
          roughness={0.15}
        />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.95, 0.1]} scale={[0.3, 0.35, 0.25]}>
        <cylinderGeometry args={[1, 0.9, 1, 16]} />
        <meshStandardMaterial
          color="#7c3aed"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

// DevOps floating nodes around the head
function DevOpsNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => [
    { label: "AWS", pos: [2.5, 1.2, -0.5] as [number, number, number], color: "#f59e0b" },
    { label: "Docker", pos: [-2.5, 0.8, 0.5] as [number, number, number], color: "#3b82f6" },
    { label: "K8s", pos: [2.0, -0.8, 1.0] as [number, number, number], color: "#6366f1" },
    { label: "CI/CD", pos: [-2.2, -1.0, -0.5] as [number, number, number], color: "#10b981" },
    { label: "Git", pos: [1.5, 2.0, 0.5] as [number, number, number], color: "#ef4444" },
    { label: "Linux", pos: [-1.8, 1.8, -0.3] as [number, number, number], color: "#f97316" },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={node.label} speed={1.5 + i * 0.2} rotationIntensity={0.2} floatIntensity={0.5}>
          <group position={node.pos}>
            {/* Node sphere */}
            <mesh>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.5}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>
            {/* Glow ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.22, 0.02, 8, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.6}
              />
            </mesh>
          </group>
        </Float>
      ))}

      {/* Connection lines */}
      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % nodes.length];
        const points = [
          new THREE.Vector3(...node.pos),
          new THREE.Vector3(...next.pos),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <line key={`line-${i}`} geometry={geometry}>
            <lineBasicMaterial color="#a855f7" transparent opacity={0.15} />
          </line>
        );
      })}
    </group>
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
          camera={{ position: [0, 0, 6], fov: 45 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Stage intensity={0.5} environment="city" adjustCamera={false}>
            <PresentationControls
              global
              snap
              speed={1.5}
              zoom={0.8}
              rotation={[0, 0, 0]}
              polar={[-Math.PI / 4, Math.PI / 4]}
              azimuth={[-Math.PI / 4, Math.PI / 4]}
            >
              <StylizedHead />
              <DevOpsNodes />
            </PresentationControls>
          </Stage>
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.6} color="#a855f7" />
          <pointLight position={[-5, -5, 5]} intensity={0.4} color="#6366f1" />
          <pointLight position={[0, 3, 3]} intensity={0.3} color="#c084fc" />
        </Canvas>
      </Suspense>
    </div>
  );
}
