import React from 'react';
import { ParticleSystem } from './ParticleSystem';
import { Text, RoundedBox, Billboard } from '@react-three/drei';

interface BatterySimulationProps {
  isRunning: boolean;
  isCharging: boolean;
  speed: number;
}

export const BatterySimulation: React.FC<BatterySimulationProps> = ({ isRunning, isCharging, speed }) => {
  const activeSpeed = isRunning ? speed : 0;
  const direction: [number, number, number] = isCharging ? [-1, 0, 0] : [1, 0, 0];

  return (
    <group>
      {/* 1. Anode (Left Side) - Dark Graphite/Zinc Look */}
      <RoundedBox position={[-3, 0, 0]} args={[1, 4, 2]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#2d3748" metalness={0.6} roughness={0.4} transparent opacity={0.95} />
      </RoundedBox>
      <RoundedBox position={[-3, 2.5, 0]} args={[0.5, 1, 0.5]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#a0aec0" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      <Text position={[-3, 0, 1.01]} fontSize={1.5} color="#e2e8f0" font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf">
        -
      </Text>

      {/* Anode Label (Billboard) */}
      <Billboard position={[-3, 2.8, 0]}>
        <Text fontSize={0.5} color="#94a3b8" anchorX="center" anchorY="middle">
          Anode
        </Text>
      </Billboard>

      {/* 2. Cathode (Right Side) - Warm Copper Look */}
      <RoundedBox position={[3, 0, 0]} args={[1, 4, 2]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#9b2c2c" metalness={0.5} roughness={0.4} transparent opacity={0.95} />
      </RoundedBox>
      <RoundedBox position={[3, 2.5, 0]} args={[0.5, 1, 0.5]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#a0aec0" metalness={0.8} roughness={0.2} />
      </RoundedBox>
      <Text position={[3, 0, 1.01]} fontSize={1.5} color="#e2e8f0" font="https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5WZLCzYlKw.ttf">
        +
      </Text>

      {/* Cathode Label (Billboard) */}
      <Billboard position={[3, 2.8, 0]}>
        <Text fontSize={0.5} color="#94a3b8" anchorX="center" anchorY="middle">
          Cathode
        </Text>
      </Billboard>

      {/* 3. Electrolyte / Separator - Clean Acrylic Look */}
      <RoundedBox position={[0, 0, 0]} args={[5, 4, 2]} radius={0.1} smoothness={4}>
        <meshStandardMaterial color="#e61291" transparent opacity={0.12} depthWrite={false} roughness={0.1} metalness={0.1} />
      </RoundedBox>

      {/* Electrolyte Label (Billboard) */}
      <Billboard position={[0, 2.8, 0]}>
        <Text fontSize={0.45} color="#f472b6" anchorX="center" anchorY="middle">
          Electrolyte
        </Text>
      </Billboard>

      {/* 4. External Circuit Wire - Metallic Wire */}
      <RoundedBox position={[0, 3, 0]} args={[6, 0.1, 0.1]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#1064e3" metalness={0.9} roughness={0.2} />
      </RoundedBox>

      {/* --- PARTICLE FLOWS --- */}
      <group position={[0, 3, 0]}>
        <ParticleSystem type="electron" count={150} bounds={[3, 0.1, 0.1]} flowDirection={direction} speed={activeSpeed * 2} />
      </group>

      <group position={[0, 0, 0]}>
        <ParticleSystem type="ion" count={80} bounds={[2.5, 1.5, 0.8]} flowDirection={direction} speed={activeSpeed * 0.5} />
      </group>
    </group>
  );
};