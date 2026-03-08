import { useRef, Suspense, useMemo, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PresentationControls, Float, MeshDistortMaterial, MeshWobbleMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";

// Wireframe digital head - abstract cyberpunk style
function DigitalHead() {
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

    // Floating motion
    groupRef.current.position.y = Math.sin(t * 0.5) * 0.2;

    // Mouse tracking
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.15,
      0.03
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.25 + t * 0.08,
      0.03
    );

    // Inner sphere pulsing
    if (innerRef.current) {
      const scale = 1 + Math.sin(t * 2) * 0.03;
      innerRef.current.scale.setScalar(scale);
    }

    // Rotating rings
    if (ringRef1.current) ringRef1.current.rotation.z = t * 0.5;
    if (ringRef2.current) ringRef2.current.rotation.x = t * 0.4;
    if (ringRef3.current) ringRef3.current.rotation.y = t * 0.3;
  });

  return (
    <group ref={groupRef} scale={1.6}>
      {/* Core sphere - distorted with glow */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.8, 4]} />
        <MeshDistortMaterial
          color="#14b8a6"
          metalness={0.95}
          roughness={0.05}
          distort={0.25}
          speed={1.5}
          emissive="#0d9488"
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Outer wireframe shell */}
      <mesh ref={outerRef} scale={1.15}>
        <icosahedronGeometry args={[0.8, 2]} />
        <meshStandardMaterial
          color="#c084fc"
          wireframe
          transparent
          opacity={0.3}
          emissive="#a855f7"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Orbital ring 1 */}
      <mesh ref={ringRef1} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.015, 16, 100]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ringRef2} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[1.5, 0.01, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Orbital ring 3 */}
      <mesh ref={ringRef3} rotation={[Math.PI / 2, Math.PI / 5, 0]}>
        <torusGeometry args={[1.1, 0.012, 16, 100]} />
        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={0.9}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Data particles orbiting */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 1.2 + (i % 3) * 0.2;
        return (
          <Float key={i} speed={2 + i * 0.3} rotationIntensity={0.1} floatIntensity={0.3}>
            <mesh position={[Math.cos(angle) * radius, Math.sin(angle) * 0.5, Math.sin(angle) * radius]}>
              <octahedronGeometry args={[0.04, 0]} />
              <meshStandardMaterial
                color={i % 2 === 0 ? "#06b6d4" : "#a855f7"}
                emissive={i % 2 === 0 ? "#06b6d4" : "#a855f7"}
                emissiveIntensity={1.5}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

// DevOps floating tech nodes
function DevOpsNodes() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes = useMemo(() => [
    { label: "AWS", pos: [2.8, 1.0, -0.5] as [number, number, number], color: "#f59e0b", shape: "box" as const },
    { label: "Docker", pos: [-2.6, 0.6, 0.5] as [number, number, number], color: "#06b6d4", shape: "octahedron" as const },
    { label: "K8s", pos: [2.2, -1.0, 0.8] as [number, number, number], color: "#818cf8", shape: "dodecahedron" as const },
    { label: "CI/CD", pos: [-2.4, -0.8, -0.5] as [number, number, number], color: "#34d399", shape: "tetrahedron" as const },
    { label: "Git", pos: [1.8, 2.0, 0.3] as [number, number, number], color: "#f87171", shape: "icosahedron" as const },
    { label: "Linux", pos: [-2.0, 1.8, -0.3] as [number, number, number], color: "#fb923c", shape: "octahedron" as const },
  ], []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  const renderShape = useCallback((shape: string) => {
    switch (shape) {
      case "box": return <boxGeometry args={[0.22, 0.22, 0.22]} />;
      case "octahedron": return <octahedronGeometry args={[0.14, 0]} />;
      case "dodecahedron": return <dodecahedronGeometry args={[0.14, 0]} />;
      case "tetrahedron": return <tetrahedronGeometry args={[0.16, 0]} />;
      case "icosahedron": return <icosahedronGeometry args={[0.13, 0]} />;
      default: return <sphereGeometry args={[0.14, 16, 16]} />;
    }
  }, []);

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={node.label} speed={1.2 + i * 0.15} rotationIntensity={0.4} floatIntensity={0.6}>
          <group position={node.pos}>
            {/* Shape */}
            <mesh>
              {renderShape(node.shape)}
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={0.6}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
            {/* Glow ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.25, 0.015, 8, 32]} />
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={1}
                transparent
                opacity={0.4}
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
        const material = new THREE.LineBasicMaterial({ color: "#a855f7", transparent: true, opacity: 0.12 });
        const lineObj = new THREE.Line(geometry, material);
        return <primitive key={`line-${i}`} object={lineObj} />;
      })}

      {/* Cross connections for mesh network look */}
      {nodes.map((node, i) => {
        if (i + 2 >= nodes.length) return null;
        const target = nodes[i + 2];
        const points = [
          new THREE.Vector3(...node.pos),
          new THREE.Vector3(...target.pos),
        ];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: "#06b6d4", transparent: true, opacity: 0.06 });
        const lineObj = new THREE.Line(geometry, material);
        return <primitive key={`cross-${i}`} object={lineObj} />;
      })}
    </group>
  );
}

function LoadingFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        <div className="w-32 h-32 rounded-full bg-primary/20 animate-pulse-glow glow-purple" />
        <div className="absolute inset-0 w-32 h-32 rounded-full border border-primary/30 animate-spin" style={{ animationDuration: '3s' }} />
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
            <DigitalHead />
            <DevOpsNodes />
          </PresentationControls>
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#a855f7" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#06b6d4" />
          <pointLight position={[0, 3, 3]} intensity={0.4} color="#c084fc" />
          <pointLight position={[0, -3, -2]} intensity={0.2} color="#6366f1" />
        </Canvas>
      </Suspense>
    </div>
  );
}
