import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Html, Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ── Central Glowing Server Core ── */
function ServerCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = -state.clock.elapsedTime * 0.08;
      const s = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
      glowRef.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* Inner core */}
      <mesh ref={meshRef}>
        <octahedronGeometry args={[0.6, 2]} />
        <MeshDistortMaterial
          color="#0d9488"
          metalness={0.9}
          roughness={0.05}
          distort={0.12}
          speed={1.5}
          emissive="#14b8a6"
          emissiveIntensity={0.5}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh ref={glowRef} scale={1.15}>
        <icosahedronGeometry args={[0.6, 1]} />
        <meshStandardMaterial color="#2dd4bf" wireframe transparent opacity={0.12} />
      </mesh>

      {/* Outer glow rings */}
      {[0, Math.PI / 3, -Math.PI / 4].map((rot, i) => (
        <mesh key={i} rotation={[rot, rot * 0.5, 0]}>
          <torusGeometry args={[1.0 + i * 0.15, 0.005, 16, 100]} />
          <meshStandardMaterial
            color="#14b8a6"
            emissive="#14b8a6"
            emissiveIntensity={1.5}
            transparent
            opacity={0.25 - i * 0.05}
          />
        </mesh>
      ))}

      {/* Core point light */}
      <pointLight position={[0, 0, 0]} intensity={0.6} color="#14b8a6" distance={5} />
    </group>
  );
}

/* ── Orbiting DevOps Node ── */
function OrbitNode({
  label,
  radius,
  speed,
  offset,
  tilt,
  color,
}: {
  label: string;
  radius: number;
  speed: number;
  offset: number;
  tilt: number;
  color: string;
}) {
  const ref = useRef<THREE.Group>(null);
  const trailRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius * 0.6;
    ref.current.position.y = Math.sin(t * 0.7 + offset) * tilt;
  });

  return (
    <group ref={ref}>
      <Float speed={2} floatIntensity={0.15} rotationIntensity={0.1}>
        {/* Node body */}
        <mesh>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Glow sphere */}
        <mesh>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.3}
            transparent
            opacity={0.15}
          />
        </mesh>

        {/* Label */}
        <Html center distanceFactor={5} style={{ pointerEvents: "none" }}>
          <div
            style={{
              background: "rgba(10,10,10,0.85)",
              border: `1px solid ${color}40`,
              borderRadius: 6,
              padding: "3px 8px",
              boxShadow: `0 0 12px ${color}30`,
              whiteSpace: "nowrap",
            }}
          >
            <span
              style={{
                color,
                fontSize: 9,
                fontFamily: "'Space Grotesk', monospace",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {label}
            </span>
          </div>
        </Html>
      </Float>
    </group>
  );
}

/* ── Connection Lines (data flow) ── */
function DataFlowLines() {
  const ref = useRef<THREE.Points>(null);
  const count = 80;

  const positions = new Float32Array(count * 3);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 0.8 + Math.random() * 1.2;
    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 1.5;
    positions[i * 3 + 2] = Math.sin(angle) * r * 0.6;
    speeds[i] = 0.3 + Math.random() * 0.7;
  }

  useFrame((state) => {
    if (!ref.current) return;
    const geo = ref.current.geometry;
    const pos = geo.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const angle = (t * speeds[i] * 0.5 + i * 0.08) % (Math.PI * 2);
      const r = 0.8 + Math.sin(t * 0.3 + i) * 0.3;
      pos[i * 3] = Math.cos(angle) * r;
      pos[i * 3 + 2] = Math.sin(angle) * r * 0.6;
      pos[i * 3 + 1] = Math.sin(t * speeds[i] + i * 0.5) * 0.5;
    }
    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#2dd4bf"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

/* ── Main Constellation Scene ── */
function DevOpsConstellation() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.2,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.1 + 0.1,
      0.03
    );
  });

  return (
    <group ref={groupRef}>
      <ServerCore />
      <DataFlowLines />

      <OrbitNode label="AWS" radius={1.6} speed={0.35} offset={0} tilt={0.3} color="#f59e0b" />
      <OrbitNode label="DOCKER" radius={1.8} speed={0.28} offset={Math.PI * 0.7} tilt={0.4} color="#06b6d4" />
      <OrbitNode label="K8S" radius={1.5} speed={0.4} offset={Math.PI * 1.3} tilt={0.35} color="#8b5cf6" />
      <OrbitNode label="TERRAFORM" radius={2.0} speed={0.22} offset={Math.PI * 0.4} tilt={0.25} color="#14b8a6" />
      <OrbitNode label="CI/CD" radius={1.7} speed={0.32} offset={Math.PI * 1.7} tilt={0.45} color="#f43f5e" />
      <OrbitNode label="GIT" radius={1.4} speed={0.38} offset={Math.PI * 1.0} tilt={0.2} color="#22c55e" />
      <OrbitNode label="LINUX" radius={1.9} speed={0.25} offset={Math.PI * 0.15} tilt={0.3} color="#eab308" />
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
          camera={{ position: [0, 0.5, 4.5], fov: 45 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Environment preset="night" />
          <DevOpsConstellation />
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="#14b8a6" />
          <pointLight position={[-5, -3, 5]} intensity={0.3} color="#8b5cf6" />
          <pointLight position={[0, 4, 2]} intensity={0.2} color="#06b6d4" />
        </Canvas>
      </Suspense>
    </div>
  );
}
