'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

function ReflectiveIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.1;
      meshRef.current.rotation.z = t * 0.05;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.1;
      wireRef.current.rotation.z = t * 0.05;
      wireRef.current.scale.setScalar(1.1 + Math.sin(t * 1.2) * 0.02);
    }
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2, 0]} />
        <meshPhysicalMaterial
          color="#111111"
          metalness={0.9}
          roughness={0.1}
          reflectivity={0.5}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
          transmission={0.1}
          thickness={1}
        />
      </mesh>
      
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[2, 0]} />
        <meshBasicMaterial
          color="#CCFF00"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

export const FuturisticShape = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        {/* Using a studio/warehouse environment for that high-end gym reflection feel */}
        <Environment preset="warehouse" />
        <ambientLight intensity={0.1} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#d1ff00" />
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <ReflectiveIcosahedron />
        </Float>
      </Canvas>
    </div>
  );
};
