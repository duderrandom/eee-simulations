import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ... previous imports ...

interface ParticleSystemProps {
  // Added 'ac_electron' to the list
  count?: number;
  type: 'electron' | 'ion' | 'proton' | 'oxygen' | 'water' | 'gasoline' | 'kinetic' | 'ac_electron'; 
  speed: number;
  bounds?: [number, number, number];
  flowDirection?: [number, number, number];
}

const PARTICLE_CONFIG = {
  electron:    { color: '#eab308', size: 0.05, emissive: 0.8 }, // Yellow (DC)
  ion:         { color: '#3b82f6', size: 0.15, emissive: 0.4 }, 
  proton:      { color: '#ef4444', size: 0.10, emissive: 0.6 }, 
  oxygen:      { color: '#cbd5e1', size: 0.15, emissive: 0.2 }, 
  water:       { color: '#0ea5e9', size: 0.20, emissive: 0.4 }, 
  gasoline:    { color: '#f97316', size: 0.12, emissive: 0.5 }, 
  kinetic:     { color: '#22c55e', size: 0.15, emissive: 0.8 }, 
  ac_electron: { color: '#a855f7', size: 0.06, emissive: 0.8 }, // Purple (AC)
};


export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  count = 100,
  type,
  speed,
  bounds = [2, 2, 2],
  flowDirection,
}) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * bounds[0] * 2,
          (Math.random() - 0.5) * bounds[1] * 2,
          (Math.random() - 0.5) * bounds[2] * 2
        ),
        velocity: flowDirection
          ? new THREE.Vector3(...flowDirection).add(
              new THREE.Vector3((Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5, (Math.random() - 0.5) * 0.5)
            )
          : new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize(),
      });
    }
    return temp;
  }, [count, bounds, flowDirection]);

  useFrame((state, delta) => {
    if (!meshRef.current || speed === 0) return;

    particles.forEach((particle, i) => {
      particle.position.addScaledVector(particle.velocity, delta * speed);

      if (flowDirection) {
        if (particle.position.x > bounds[0]) particle.position.x = -bounds[0];
        if (particle.position.x < -bounds[0]) particle.position.x = bounds[0];
        if (particle.position.y > bounds[1]) particle.position.y = -bounds[1];
        if (particle.position.y < -bounds[1]) particle.position.y = bounds[1];
        if (particle.position.z > bounds[2]) particle.position.z = -bounds[2];
        if (particle.position.z < -bounds[2]) particle.position.z = bounds[2];
      } else {
        if (Math.abs(particle.position.x) > bounds[0]) particle.velocity.x *= -1;
        if (Math.abs(particle.position.y) > bounds[1]) particle.velocity.y *= -1;
        if (Math.abs(particle.position.z) > bounds[2]) particle.velocity.z *= -1;
      }

      dummy.position.copy(particle.position);
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
      />
    </instancedMesh>
  );
};