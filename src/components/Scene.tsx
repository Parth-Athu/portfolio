import { useRef, Suspense, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PresentationControls, Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

// Matrix-style digital core
function DigitalCore() {
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

    groupRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.12, 0.03);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, pointer.x * 0.2 + t * 0.06, 0.03);

    if (innerRef.current) {
      const s = 1 + Math.sin(t * 2) * 0.02;
      innerRef.current.scale.setScalar(s);
    }

    if (ringRef1.current) ringRef1.current.rotation.z = t * 0.4;
    if (ringRef2.current) ringRef2.current.rotation.x = t * 0.35;
    if (ringRef3.current) ringRef3.current.rotation.y = t * 0.25;
  });

  return (
    <group ref={groupRef} scale={1.5}>
      {/* Core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.8, 4]} />
        <MeshDistortMaterial
          color="#22c55e"
          metalness={0.9}
          roughness={0.08}
          distort={0.2}
          speed={1.2}
          emissive="#16a34a"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={outerRef} scale={1.18}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshStandardMaterial
          color="#4ade80"
          wireframe
          transparent
          opacity={0.18}
          emissive="#22c55e"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.012, 16, 80]} />
        <meshStandardMaterial color="#4ade80" emissive="#4ade80" emissiveIntensity={1.2} transparent opacity={0.6} />
      </mesh>

      {/* Ring 2 */}
      <mesh ref={ringRef2} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[1.5, 0.008, 16, 80]} />
        <meshStandardMaterial color="#22c55e" emissive="#22c55e" emissiveIntensity={0.8} transparent opacity={0.35} />
      </mesh>

      {/* Ring 3 */}
      <mesh ref={ringRef3} rotation={[Math.PI / 2, Math.PI / 5, 0]}>
        <torusGeometry args={[1.1, 0.01, 16, 80]} />
        <meshStandardMaterial color="#86efac" emissive="#86efac" emissiveIntensity={0.6} transparent opacity={0.4} />
      </mesh>

      {/* Orbiting data bits */}
      {Array.from({ length: 16 }).map((_, i) => {
        const angle = (i / 16) * Math.PI * 2;
        const r = 1.1 + (i % 3) * 0.25;
        return (
          <Float key={i} speed={1.5 + i * 0.2} rotationIntensity={0.05} floatIntensity={0.2}>
            <mesh position={[Math.cos(angle) * r, Math.sin(angle) * 0.4, Math.sin(angle) * r]}>
              <boxGeometry args={[0.03, 0.03, 0.03]} />
              <meshStandardMaterial
                color="#4ade80"
                emissive="#4ade80"
                emissiveIntensity={2}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// DevOps nodes - green monochrome
function DevOpsNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => [
    { label: "AWS", pos: [2.8, 1.0, -0.5] as [number, number, number], color: "#4ade80", shape: "box" as const },
    { label: "Docker", pos: [-2.6, 0.6, 0.5] as [number, number, number], color: "#22c55e", shape: "octahedron" as const },
    { label: "K8s", pos: [2.2, -1.0, 0.8] as [number, number, number], color: "#86efac", shape: "dodecahedron" as const },
    { label: "CI/CD", pos: [-2.4, -0.8, -0.5] as [number, number, number], color: "#16a34a", shape: "tetrahedron" as const },
    { label: "Git", pos: [1.8, 2.0, 0.3] as [number, number, number], color: "#4ade80", shape: "icosahedron" as const },
    { label: "Linux", pos: [-2.0, 1.8, -0.3] as [number, number, number], color: "#22c55e", shape: "octahedron" as const },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

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
        <Float key={node.label} speed={1 + i * 0.12} rotationIntensity={0.3} floatIntensity={0.5}>
          <group position={node.pos}>
            <mesh>
              {renderShape(node.shape)}
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.7}
                metalness={0.85}
                roughness={0.15}
                wireframe
              />
            </mesh>
          </group>
        </Float>
      ))}

      {nodes.map((node, i) => {
        const next = nodes[(i + 1) % nodes.length];
        const points = [new THREE.Vector3(...node.pos), new THREE.Vector3(...next.pos)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: "#22c55e", transparent: true, opacity: 0.08 });
        const lineObj = new THREE.Line(geometry, material);
        return <primitive key={`line-${i}`} object={lineObj} />;
      })}
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-primary/15 animate-pulse-glow glow-green" />
        <div className="absolute inset-0 w-24 h-24 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '3s' }} />
      </div>
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
            speed={1.5}
            zoom={0.85}
            rotation={[0, 0, 0]}
            polar={[-Math.PI / 4, Math.PI / 4]}
            azimuth={[-Math.PI / 4, Math.PI / 4]}
          >
            <DigitalCore />
            <DevOpsNodes />
          </PresentationControls>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={0.7} color="#22c55e" />
          <pointLight position={[-5, -5, 5]} intensity={0.4} color="#4ade80" />
          <pointLight position={[0, 3, 3]} intensity={0.3} color="#86efac" />
          <pointLight position={[0, -3, -2]} intensity={0.15} color="#16a34a" />
        </Canvas>
      </Suspense>
    </div>
  );
}
