import React from 'react';
import { ParticleSystem } from './ParticleSystem';
import { RoundedBox } from '@react-three/drei';

interface FuelCellSimulationProps {
  isRunning: boolean;
  speed: number;
}

export const FuelCellSimulation: React.FC<FuelCellSimulationProps> = ({ isRunning, speed }) => {
  const activeSpeed = isRunning ? speed : 0;

  return (
    <group>
      {/* 1. PEM (Proton Exchange Membrane) - Center glowing electrolyte */}
      <RoundedBox position={[0, 0, 0]} args={[0.8, 4, 2]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial 
          color="#8b5cf6" 
          transparent 
          opacity={0.3} 
          roughness={0.1} 
          transmission={0.5} 
          thickness={0.5} 
          emissive="#6d28d9" 
          emissiveIntensity={0.2}
        />
      </RoundedBox>

      {/* 2. Electrodes (Left Anode, Right Cathode) - Metallic */}
      <RoundedBox position={[-0.6, 0, 0]} args={[0.4, 4, 2]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      <RoundedBox position={[0.6, 0, 0]} args={[0.4, 4, 2]} radius={0.05} smoothness={4}>
        <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
      </RoundedBox>

      {/* 3. External Circuit Assembly */}
      <group>
        {/* Top Horizontal Wire */}
        <RoundedBox position={[0, 2.8, 0]} args={[2.4, 0.15, 0.15]} radius={0.07} smoothness={4}>
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        
        {/* Left Vertical Connector (Anode to Wire) */}
        <RoundedBox position={[-0.6, 2.4, 0]} args={[0.15, 0.8, 0.15]} radius={0.07} smoothness={4}>
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </RoundedBox>
        
        {/* Right Vertical Connector (Cathode to Wire) */}
        <RoundedBox position={[0.6, 2.4, 0]} args={[0.15, 0.8, 0.15]} radius={0.07} smoothness={4}>
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
        </RoundedBox>
      </group>

      {/* --- PARTICLE FLOWS --- */}
      {/* Protons entering Anode */}
      <group position={[-2, 0, 0]}>
        <ParticleSystem type="proton" count={60} bounds={[1, 1.5, 0.8]} flowDirection={[1, 0, 0]} speed={activeSpeed * 0.6} />
      </group>

      {/* Protons through PEM */}
      <group position={[0, 0, 0]}>
        <ParticleSystem type="proton" count={40} bounds={[0.4, 1.5, 0.8]} flowDirection={[1, 0, 0]} speed={activeSpeed * 0.4} />
      </group>

      {/* Electrons forced up left connector, across top wire, down right connector */}
      <group position={[-0.6, 2.4, 0]}>
         <ParticleSystem type="electron" count={15} bounds={[0.05, 0.4, 0.05]} flowDirection={[0, 1, 0]} speed={activeSpeed * 2} />
      </group>
      <group position={[0, 2.8, 0]}>
        <ParticleSystem type="electron" count={50} bounds={[1.2, 0.05, 0.05]} flowDirection={[1, 0, 0]} speed={activeSpeed * 2} />
      </group>
      <group position={[0.6, 2.4, 0]}>
         <ParticleSystem type="electron" count={15} bounds={[0.05, 0.4, 0.05]} flowDirection={[0, -1, 0]} speed={activeSpeed * 2} />
      </group>

      {/* Oxygen entering Cathode */}
      <group position={[2, 1, 0]}>
        <ParticleSystem type="oxygen" count={30} bounds={[0.8, 0.8, 0.8]} flowDirection={[-1, -0.5, 0]} speed={activeSpeed * 0.5} />
      </group>

      {/* Water Exhaust */}
      <group position={[2, -1.5, 0]}>
        <ParticleSystem type="water" count={40} bounds={[0.8, 0.5, 0.8]} flowDirection={[1, -1, 0]} speed={activeSpeed * 0.5} />
      </group>
    </group>
  );
};