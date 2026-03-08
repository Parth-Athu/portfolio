import { useRef, Suspense, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PresentationControls, Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

function FloatingCore() {
  const groupRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);
  const ringRef3 = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    groupRef.current.position.y = Math.sin(t * 0.4) * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.1, 0.02);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.15 + t * 0.05, 0.02);

    if (innerRef.current) {
      innerRef.current.scale.setScalar(1 + Math.sin(t * 1.5) * 0.02);
    }

    if (ringRef1.current) ringRef1.current.rotation.z = t * 0.3;
    if (ringRef2.current) ringRef2.current.rotation.x = t * 0.25;
    if (ringRef3.current) ringRef3.current.rotation.y = t * 0.2;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.8, 4]} />
        <MeshDistortMaterial
          color="#8b5cf6"
          metalness={0.95}
          roughness={0.05}
          distort={0.2}
          speed={1}
          emissive="#7c3aed"
          emissiveIntensity={0.4}
        />
      </mesh>

      <mesh ref={outerRef} scale={1.15}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#a78bfa"
          wireframe
          transparent
          opacity={0.2}
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.012, 16, 100]} />
        <meshStandardMaterial color="#a78bfa" emissive="#a78bfa" emissiveIntensity={1} transparent opacity={0.6} />
      </mesh>

      <mesh ref={ringRef2} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[1.5, 0.008, 16, 100]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.8} transparent opacity={0.4} />
      </mesh>

      <mesh ref={ringRef3} rotation={[Math.PI / 2, Math.PI / 5, 0]}>
        <torusGeometry args={[1.1, 0.01, 16, 100]} />
        <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.7} transparent opacity={0.5} />
      </mesh>

      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = 1.15 + (i % 3) * 0.2;
        return (
          <Float key={i} speed={1.2 + i * 0.15} rotationIntensity={0.05} floatIntensity={0.2}>
            <mesh position={[Math.cos(angle) * r, Math.sin(angle) * 0.4, Math.sin(angle) * r]}>
              <octahedronGeometry args={[0.035, 0]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#a78bfa" : "#818cf8"}
                emissive={i % 2 === 0 ? "#a78bfa" : "#818cf8"}
                emissiveIntensity={1.5}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

function DevOpsNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => [
    { label: "AWS", pos: [2.6, 1.0, -0.5] as [number, number, number], color: "#f59e0b" },
    { label: "Docker", pos: [-2.5, 0.6, 0.5] as [number, number, number], color: "#60a5fa" },
    { label: "K8s", pos: [2.0, -0.9, 0.8] as [number, number, number], color: "#818cf8" },
    { label: "CI/CD", pos: [-2.3, -0.8, -0.5] as [number, number, number], color: "#34d399" },
    { label: "Git", pos: [1.6, 1.8, 0.3] as [number, number, number], color: "#f87171" },
    { label: "Server", pos: [-1.8, 1.6, -0.3] as [number, number, number], color: "#c084fc" },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  const shapes = useMemo(() => ["box", "octahedron", "dodecahedron", "tetrahedron", "icosahedron", "octahedron"], []);

  const renderShape = useCallback((shape: string) => {
    switch (shape) {
      case "box": return <boxGeometry args={[0.18, 0.18, 0.18]} />;
      case "octahedron": return <octahedronGeometry args={[0.12, 0]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[0.12, 0]} />;
      case "tetrahedron": return <tetrahedronGeometry args={[0.14, 0]} />;
      case "icosahedron": return <icosahedronGeometry args={[0.11, 0]} />;
      default: return <sphereGeometry args={[0.12, 16, 16]} />;
    }
  }, []);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={node.label} speed={1 + i * 0.1} rotationIntensity={0.2} floatIntensity={0.4}>
          <group position={node.pos}>
            <mesh>
              {renderShape(shapes[i])}
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.5}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.22, 0.012, 8, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.8}
                transparent
                opacity={0.35}
              />
            </mesh>
          </group>
        </Float>
      ))}

      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % nodes.length];
        const points = [new THREE.Vector3(...node.pos), new THREE.Vector3(...next.pos)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: "#8b5cf6", transparent: true, opacity: 0.1 });
        return <primitive key={`line-${i}`} object={new THREE.Line(geometry, material)} />;
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
          camera={{ position: [0, 0, 6.5], fov: 42 }}
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
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <FloatingCore />
            <DevOpsNodes />
          </PresentationControls>
          <ambientLight intensity={0.25} />
          <pointLight position={[5, 5, 5]} intensity={0.7} color="#8b5cf6" />
          <pointLight position={[-5, -5, 5]} intensity={0.4} color="#6366f1" />
          <pointLight position={[0, 3, 3]} intensity={0.3} color="#a78bfa" />
          <pointLight position={[0, -3, -2]} intensity={0.2} color="#7c3aed" />
        </Canvas>
      </Suspense>
    </div>
  );
}
