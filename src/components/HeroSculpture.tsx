import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, PerspectiveCamera } from '@react-three/drei';
import type { Group } from 'three';

type Pointer = { x: number; y: number };

export default function HeroSculpture({ pointer, reducedMotion }: { pointer: Pointer; reducedMotion: boolean | null }) {
  return (
    <Canvas dpr={[1, 1.5]} shadows camera={{ position: [0, 0, 4.5], fov: 42 }}>
      <color attach="background" args={['#f4f1eb']} />
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-3, -2, -2]} intensity={1.2} color="#d6cdc0" />
      <Scene pointer={pointer} reducedMotion={reducedMotion} />
      <Environment preset="city" />
      <PerspectiveCamera makeDefault position={[0, 0, 4.5]} />
    </Canvas>
  );
}

function Scene({ pointer, reducedMotion }: { pointer: Pointer; reducedMotion: boolean | null }) {
  const group = useRef<Group>(null);

  useFrame(({ clock }, delta) => {
    if (!group.current) {
      return;
    }

    const time = clock.getElapsedTime();
    const targetX = reducedMotion ? 0.08 : pointer.y * 0.85;
    const targetY = reducedMotion ? 0.18 : pointer.x * 0.95;

    group.current.rotation.x += (targetX - group.current.rotation.x) * Math.min(delta * 3.5, 1);
    group.current.rotation.y += (targetY - group.current.rotation.y) * Math.min(delta * 3.5, 1);
    group.current.rotation.z = Math.sin(time * 0.35) * 0.06;
    group.current.position.y = Math.sin(time * 0.8) * 0.08;
  });

  return (
    <group ref={group}>
      <Float speed={1.2} rotationIntensity={0.22} floatIntensity={0.6}>
        <mesh castShadow receiveShadow position={[0, 0, 0]}>
          <icosahedronGeometry args={[1.1, 1]} />
          <meshStandardMaterial color="#171717" metalness={0.35} roughness={0.3} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0.4, 0]} position={[0.15, -0.02, 0.15]}>
          <torusGeometry args={[1.35, 0.05, 18, 80]} />
          <meshStandardMaterial color="#c3b6a4" metalness={0.8} roughness={0.18} />
        </mesh>

        <mesh position={[-0.5, 0.5, -0.3]} scale={0.22}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#f2eee7" metalness={0.15} roughness={0.2} />
        </mesh>

        <mesh position={[0.65, -0.5, 0.35]} scale={0.14}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#8ca59a" metalness={0.2} roughness={0.4} />
        </mesh>
      </Float>

      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.55, 0]} scale={[1.35, 1.35, 1]}>
        <circleGeometry args={[1, 48]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.14} />
      </mesh>
    </group>
  );
}