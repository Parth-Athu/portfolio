import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function PCModel() {
  const { scene } = useGLTF("/models/scene.gltf");
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.3 + Math.PI * 0.15,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      pointer.y * 0.1,
      0.03
    );
  });

  return (
    <group ref={groupRef} scale={1.8} position={[0, -0.5, 0]}>
      <primitive object={scene} />
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
          camera={{ position: [3, 2, 5], fov: 40 }}
          style={{ background: "transparent" }}
          gl={{ alpha: true, antialias: true }}
        >
          <Environment preset="night" />
          <ambientLight intensity={0.4} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#14b8a6" />
          <pointLight position={[-5, -3, 5]} intensity={0.4} color="#8b5cf6" />
          <pointLight position={[0, 4, 2]} intensity={0.3} color="#06b6d4" />
          <spotLight
            position={[0, 8, 0]}
            angle={0.5}
            penumbra={1}
            intensity={0.5}
            color="#14b8a6"
          />
          <PCModel />
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            color="#14b8a6"
          />
        </Canvas>
      </Suspense>
    </div>
  );
}

useGLTF.preload("/models/scene.gltf");
