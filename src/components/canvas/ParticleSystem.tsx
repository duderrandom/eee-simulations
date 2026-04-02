"use client";

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  type: 'electron' | 'ion' | 'proton' | 'oxygen' | 'hydrogen' | 'water' | 'gasoline' | 'kinetic' | 'ac_electron';
  speed: number;
  bounds?: [number, number, number];
  flowDirection?: [number, number, number];
}

const PARTICLE_CONFIG = {
  electron:    { color: '#22d3ee', size: 0.06, emissive: 0.9 },
  ac_electron: { color: '#a855f7', size: 0.06, emissive: 0.9 },
  ion:         { color: '#3b82f6', size: 0.12, emissive: 0.5 },
  proton:      { color: '#ef4444', size: 0.08, emissive: 0.7 },
  oxygen:      { color: '#cbd5e1', size: 0.12, emissive: 0.3 },
  hydrogen:    { color: '#ffffff', size: 0.06, emissive: 0.6 },
  water:       { color: '#0ea5e9', size: 0.15, emissive: 0.5 },
  gasoline:    { color: '#f97316', size: 0.10, emissive: 0.6 },
  kinetic:     { color: '#22c55e', size: 0.10, emissive: 0.8 },
};

interface Particle {
  position: THREE.Vector3;
  jitter: THREE.Vector3; // Changed from 'velocity' to 'jitter' to avoid confusion
  phase: number;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 100,
  type,
  speed,
  bounds = [2, 2, 2],
  flowDirection,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const particlesRef = useRef<Particle[]>([]);
  const timeRef = useRef(0);

  // Initialize particles with positions and random jitter
  useEffect(() => {
    const temp: Particle[] = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * bounds[0] * 2,
          (Math.random() - 0.5) * bounds[1] * 2,
          (Math.random() - 0.5) * bounds[2] * 2
        ),
        jitter: new THREE.Vector3(
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2,
          (Math.random() - 0.5) * 0.2
        ),
        phase: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = temp;
  }, [count, bounds]);

  useFrame((state, delta) => {
    if (!meshRef.current || speed === 0 || particlesRef.current.length === 0) return;

    timeRef.current += delta;
    const glowPulse = 0.7 + 0.3 * Math.sin(timeRef.current * 3);
    const particles = particlesRef.current;
    
    // Create the base flow vector from props
    const baseFlow = flowDirection 
      ? new THREE.Vector3(...flowDirection) 
      : new THREE.Vector3(0, 0, 0);

    particles.forEach((particle, i) => {
      // REQUISITE: Combine flowDirection (global) with jitter (local) per frame
      const currentMove = new THREE.Vector3()
        .copy(baseFlow)
        .add(particle.jitter)
        .normalize();

      particle.position.addScaledVector(currentMove, delta * speed);

      // BOUNDARY HANDLING (Wrapping)
      if (flowDirection) {
        // Wrap X
        if (particle.position.x > bounds[0]) particle.position.x = -bounds[0];
        else if (particle.position.x < -bounds[0]) particle.position.x = bounds[0];
        
        // Wrap Y
        if (particle.position.y > bounds[1]) particle.position.y = -bounds[1];
        else if (particle.position.y < -bounds[1]) particle.position.y = bounds[1];
        
        // Wrap Z
        if (particle.position.z > bounds[2]) particle.position.z = -bounds[2];
        else if (particle.position.z < -bounds[2]) particle.position.z = bounds[2];
      } else {
        // Bounce logic for random/static types
        if (Math.abs(particle.position.x) > bounds[0]) particle.jitter.x *= -1;
        if (Math.abs(particle.position.y) > bounds[1]) particle.jitter.y *= -1;
        if (Math.abs(particle.position.z) > bounds[2]) particle.jitter.z *= -1;
      }

      // Update Instance Matrix
      const scale = 0.9 + 0.2 * glowPulse * Math.min(speed / 3, 1);
      dummy.position.copy(particle.position);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  const config = PARTICLE_CONFIG[type];

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[config.size, 16, 16]} />
      <meshStandardMaterial
        color={config.color}
        emissive={config.color}
        emissiveIntensity={config.emissive}
        roughness={0.2}
        metalness={0.3}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
};