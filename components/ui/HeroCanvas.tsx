'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, MeshWobbleMaterial, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom, Noise, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

function KineticShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} scale={2}>
        <torusKnotGeometry args={[1, 0.3, 256, 32]} />
        <MeshWobbleMaterial
          color="#d1ff00"
          speed={2}
          factor={0.6}
          roughness={0.1}
          metalness={0.9}
          emissive="#d1ff00"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export const HeroCanvas = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} color="#d1ff00" intensity={1} />
        
        <KineticShape />
        
        <EffectComposer>
          <Bloom luminanceThreshold={1} luminanceSmoothing={0.9} height={300} />
          <Noise opacity={0.05} />
          <Vignette eskil={false} offset={0.1} darkness={1.1} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
