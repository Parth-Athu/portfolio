import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PresentationControls, Float, Html, Environment } from "@react-three/drei";
import * as THREE from "three";

/* ── 3D Developer Desk Setup ── */
function Monitor() {
  return (
    <group position={[0, 1.05, 0]}>
      {/* Monitor bezel */}
      <mesh>
        <boxGeometry args={[2.4, 1.5, 0.08]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.05]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial
          color="#0a1628"
          emissive="#0d3b66"
          emissiveIntensity={0.4}
        />
      </mesh>
      {/* Code lines on screen */}
      <Html position={[0, 0, 0.06]} transform scale={0.12} distanceFactor={4}>
        <div style={{
          width: 280,
          fontFamily: "monospace",
          fontSize: 8,
          color: "#2dd4bf",
          lineHeight: 1.6,
          opacity: 0.9,
          pointerEvents: "none",
          userSelect: "none",
        }}>
          <div style={{ color: "#6b7280" }}>{"# deploy.yml"}</div>
          <div><span style={{ color: "#f59e0b" }}>name:</span> Deploy to AWS</div>
          <div><span style={{ color: "#f59e0b" }}>on:</span> push</div>
          <div style={{ color: "#6b7280" }}>{"  # CI/CD Pipeline"}</div>
          <div><span style={{ color: "#f59e0b" }}>jobs:</span></div>
          <div>{"  "}<span style={{ color: "#8b5cf6" }}>build:</span></div>
          <div>{"    "}<span style={{ color: "#f59e0b" }}>runs-on:</span> ubuntu</div>
          <div>{"    "}<span style={{ color: "#f59e0b" }}>steps:</span></div>
          <div>{"      - "}<span style={{ color: "#22c55e" }}>docker build</span></div>
          <div>{"      - "}<span style={{ color: "#22c55e" }}>kubectl apply</span></div>
          <div>{"      - "}<span style={{ color: "#22c55e" }}>terraform plan</span></div>
        </div>
      </Html>
      {/* Monitor stand neck */}
      <mesh position={[0, -0.95, -0.1]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Monitor stand base */}
      <mesh position={[0, -1.2, 0.05]}>
        <boxGeometry args={[0.8, 0.04, 0.4]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.3} />
      </mesh>
    </group>
  );
}

function Keyboard() {
  return (
    <group position={[0, -0.12, 0.7]}>
      <mesh>
        <boxGeometry args={[1.4, 0.04, 0.45]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Key rows */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[-0.57 + col * 0.1, 0.03, -0.15 + row * 0.1]}
          >
            <boxGeometry args={[0.08, 0.02, 0.08]} />
            <meshStandardMaterial
              color="#2a2a2a"
              emissive="#14b8a6"
              emissiveIntensity={row === 0 && col % 3 === 0 ? 0.3 : 0.02}
            />
          </mesh>
        ))
      )}
    </group>
  );
}

function PCCase() {
  return (
    <group position={[1.8, 0.15, -0.3]}>
      {/* Main case */}
      <mesh>
        <boxGeometry args={[0.6, 1.4, 0.5]} />
        <meshStandardMaterial color="#111111" metalness={0.85} roughness={0.15} />
      </mesh>
      {/* Glass side panel */}
      <mesh position={[-0.31, 0, 0]}>
        <boxGeometry args={[0.01, 1.3, 0.45]} />
        <meshStandardMaterial
          color="#0a0a0a"
          transparent
          opacity={0.4}
          metalness={0.9}
          roughness={0}
        />
      </mesh>
      {/* RGB fan glow 1 */}
      <mesh position={[-0.29, 0.3, 0]}>
        <ringGeometry args={[0.1, 0.14, 32]} />
        <meshStandardMaterial
          color="#14b8a6"
          emissive="#14b8a6"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* RGB fan glow 2 */}
      <mesh position={[-0.29, -0.1, 0]}>
        <ringGeometry args={[0.1, 0.14, 32]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* RGB fan glow 3 */}
      <mesh position={[-0.29, -0.5, 0]}>
        <ringGeometry args={[0.1, 0.14, 32]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={2}
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Desk() {
  return (
    <group position={[0, -0.18, 0]}>
      {/* Desktop surface */}
      <mesh>
        <boxGeometry args={[4.5, 0.06, 1.8]} />
        <meshStandardMaterial color="#1c1917" metalness={0.3} roughness={0.7} />
      </mesh>
    </group>
  );
}

function OrbitingIcon({ label, radius, speed, offset, yPos }: {
  label: string; radius: number; speed: number; offset: number; yPos: number;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = yPos + Math.sin(t * 2) * 0.1;
  });

  return (
    <group ref={ref}>
      <Float speed={2} floatIntensity={0.2}>
        <mesh>
          <boxGeometry args={[0.35, 0.14, 0.04]} />
          <meshStandardMaterial
            color="#0a0a0a"
            emissive="#14b8a6"
            emissiveIntensity={0.3}
          />
        </mesh>
        <Html center distanceFactor={6}>
          <span style={{
            color: "#2dd4bf",
            fontSize: 9,
            fontFamily: "monospace",
            fontWeight: 600,
            whiteSpace: "nowrap",
            pointerEvents: "none",
          }}>
            {label}
          </span>
        </Html>
      </Float>
    </group>
  );
}

function DeveloperSetup() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.15 - 0.3,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.05 + 0.15,
      0.03
    );
  });

  return (
    <group ref={groupRef} position={[0.3, -0.3, 0]} scale={1.1}>
      <Monitor />
      <Keyboard />
      <PCCase />
      <Desk />

      {/* Orbiting DevOps icons */}
      <OrbitingIcon label="AWS" radius={2.2} speed={0.3} offset={0} yPos={1.5} />
      <OrbitingIcon label="Docker" radius={2.4} speed={0.25} offset={Math.PI * 0.6} yPos={1.2} />
      <OrbitingIcon label="K8s" radius={2.0} speed={0.35} offset={Math.PI * 1.2} yPos={1.8} />
      <OrbitingIcon label="Git" radius={2.3} speed={0.28} offset={Math.PI * 1.6} yPos={0.8} />
      <OrbitingIcon label="Linux" radius={2.1} speed={0.32} offset={Math.PI * 0.3} yPos={1.0} />

      {/* Ambient particles around setup */}
      {Array.from({ length: 30 }).map((_, i) => (
        <Float key={i} speed={1 + Math.random()} floatIntensity={0.5 + Math.random()}>
          <mesh position={[
            (Math.random() - 0.5) * 5,
            Math.random() * 3 - 0.5,
            (Math.random() - 0.5) * 3,
          ]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshStandardMaterial
              color="#14b8a6"
              emissive="#14b8a6"
              emissiveIntensity={3}
              transparent
              opacity={0.6}
            />
          </mesh>
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
          camera={{ position: [0, 1.5, 5], fov: 42 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Environment preset="night" />
          <DeveloperSetup />
          <ambientLight intensity={0.3} />
          <pointLight position={[3, 4, 3]} intensity={0.8} color="#14b8a6" />
          <pointLight position={[-3, 2, 3]} intensity={0.4} color="#8b5cf6" />
          <pointLight position={[0, 0, 4]} intensity={0.3} color="#06b6d4" />
          <spotLight position={[0, 5, 2]} angle={0.4} intensity={0.5} color="#14b8a6" penumbra={1} />
        </Canvas>
      </Suspense>
    </div>
  );
}
