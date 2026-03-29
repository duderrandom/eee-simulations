import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { ParticleSystem } from './ParticleSystem';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

interface RegenBrakingSimulationProps {
  action: 'idle' | 'accelerate' | 'brake';
  intensity: number; // 1 to 5
}

export const RegenBrakingSimulation: React.FC<RegenBrakingSimulationProps> = ({ action, intensity }) => {
  const wheelRef1 = useRef<THREE.Group>(null);
  const wheelRef2 = useRef<THREE.Group>(null);

  // Animate the wheels based on the action
  useFrame((_, delta) => {
    if (wheelRef1.current && wheelRef2.current) {
      // If braking, wheels spin slower. If idle, they stop.
      const spinSpeed = action === 'accelerate' ? intensity * 5 : action === 'brake' ? intensity * 2 : 0;
      wheelRef1.current.rotation.z -= spinSpeed * delta;
      wheelRef2.current.rotation.z -= spinSpeed * delta;
    }
  });

  // Determine flow directions and active systems
  const isAccel = action === 'accelerate';
  const isBrake = action === 'brake';

  const electronFlow: [number, number, number] = isAccel ? [1, 0, 0] : isBrake ? [-1, 0, 0] : [0, 0, 0];
  const kineticFlow: [number, number, number] = isAccel ? [1, -0.5, 0] : isBrake ? [-1, 0.5, 0] : [0, 0, 0];
  
  const particleSpeed = action === 'idle' ? 0 : intensity;

  return (
    <group position={[0, 0.5, 0]}>
      {/* 1. Battery Pack (Left) */}
      <group position={[-3, 0, 0]}>
        <RoundedBox args={[2, 1.5, 1]} radius={0.1}>
          <meshStandardMaterial color={isBrake ? "#22c55e" : "#0284c7"} metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <Text position={[0, 0, 0.51]} fontSize={0.3} color="white">
          {isBrake ? "+ CHARGING" : "BATTERY"}
        </Text>
      </group>

      {/* 2. E-Motor / Generator (Center) */}
      <group position={[0, 0, 0]}>
        <RoundedBox args={[1.5, 1.5, 1]} radius={0.1}>
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <Text position={[0, 0, 0.51]} fontSize={0.25} color="white">
          {isBrake ? "GENERATOR" : "MOTOR"}
        </Text>
      </group>

      {/* 3. The Wheels (Right) */}
      <group position={[3, -0.5, 0]}>
        {/* Front Wheel */}
        <group ref={wheelRef1} position={[0.8, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
          {/* Hubcap marker to see rotation clearly */}
          <mesh position={[0, 0.26, 0]}>
             <boxGeometry args={[0.8, 0.05, 0.1]} />
             <meshStandardMaterial color="#fff" />
          </mesh>
        </group>
        {/* Rear Wheel */}
        <group ref={wheelRef2} position={[-0.8, 0, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.4, 32]} />
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
          <mesh position={[0, 0.26, 0]}>
             <boxGeometry args={[0.8, 0.05, 0.1]} />
             <meshStandardMaterial color="#fff" />
          </mesh>
        </group>
      </group>

      {/* --- ENERGY FLOWS --- */}
      
      {/* Electrical Wire (Battery <-> Motor) */}
      <RoundedBox position={[-1.5, 0, 0]} args={[1, 0.1, 0.1]} radius={0.05}>
        <meshStandardMaterial color="#718096" />
      </RoundedBox>

      {/* Drivetrain Shaft (Motor <-> Wheels) */}
      <RoundedBox position={[1.5, -0.25, 0]} args={[1.5, 0.1, 0.1]} rotation={[0, 0, -0.15]} radius={0.05}>
        <meshStandardMaterial color="#475569" />
      </RoundedBox>

      {/* Electrons flowing between Battery and Motor */}
      <group position={[-1.5, 0, 0]}>
        <ParticleSystem 
          type="electron" 
          count={40} 
          bounds={[0.5, 0.1, 0.1]} 
          flowDirection={electronFlow} 
          speed={particleSpeed * 2} 
        />
      </group>

      {/* Kinetic Energy transferring between Motor and Wheels */}
      <group position={[1.5, -0.25, 0]}>
        <ParticleSystem 
          type="kinetic" 
          count={30} 
          bounds={[0.75, 0.1, 0.1]} 
          flowDirection={kineticFlow} 
          speed={particleSpeed * 2} 
        />
      </group>
    </group>
  );
};