import React from 'react';
import { ParticleSystem } from './ParticleSystem';
import { RoundedBox, Text } from '@react-three/drei';

interface EVTypesSimulationProps {
  isRunning: boolean;
  speed: number;
  mode: 'BEV' | 'HEV' | 'PHEV';
}

export const EVTypesSimulation: React.FC<EVTypesSimulationProps> = ({ isRunning, speed, mode }) => {
  const activeSpeed = isRunning ? speed : 0;

  // Determine which components are active based on the mode
  const hasGas = mode === 'HEV' || mode === 'PHEV';
  const hasLargeBattery = mode === 'BEV' || mode === 'PHEV';
  
  return (
    <group>
      {/* --- COMPONENTS --- */}
      
      {/* 1. Fuel Tank & Engine (Top Track) */}
      {hasGas && (
        <group position={[0, 1.5, 0]}>
          <RoundedBox position={[-3, 0, 0]} args={[1.5, 1.5, 1]} radius={0.1}>
            <meshStandardMaterial color="#c2410c" metalness={0.4} roughness={0.6} />
          </RoundedBox>
          <Text position={[-3, 0, 0.51]} fontSize={0.3} color="white">Fuel Tank</Text>

          <RoundedBox position={[0, 0, 0]} args={[1.5, 1.5, 1]} radius={0.1}>
            <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.3} />
          </RoundedBox>
          <Text position={[0, 0, 0.51]} fontSize={0.3} color="white">ICE Engine</Text>
        </group>
      )}

      {/* 2. Battery & Electric Motor (Bottom Track) */}
      <group position={[0, -1.5, 0]}>
        <RoundedBox position={[-3, 0, 0]} args={hasLargeBattery ? [2, 1.5, 1] : [1, 1.5, 1]} radius={0.1}>
          <meshStandardMaterial color="#0284c7" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <Text position={[-3, 0, 0.51]} fontSize={0.3} color="white">Battery</Text>

        <RoundedBox position={[0, 0, 0]} args={[1.5, 1.5, 1]} radius={0.1}>
          <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
        </RoundedBox>
        <Text position={[0, 0, 0.51]} fontSize={0.3} color="white">E-Motor</Text>
      </group>

      {/* 3. Wheels / Drivetrain (Right Side) */}
      <group position={[3, 0, 0]}>
        <RoundedBox args={[1, 3, 1.5]} radius={0.1}>
          <meshStandardMaterial color="#1e293b" roughness={0.9} />
        </RoundedBox>
        <Text position={[0, 0, 0.76]} fontSize={0.3} color="white">Wheels</Text>
      </group>


      {/* --- ENERGY FLOWS --- */}

      {/* Gas Flow: Tank -> Engine */}
      {hasGas && (
        <group position={[-1.5, 1.5, 0]}>
          <ParticleSystem type="gasoline" count={30} bounds={[0.75, 0.1, 0.1]} flowDirection={[1, 0, 0]} speed={activeSpeed} />
        </group>
      )}

      {/* Electricity Flow: Battery -> Motor */}
      <group position={[-1.5, -1.5, 0]}>
        <ParticleSystem type="electron" count={hasLargeBattery ? 60 : 30} bounds={[0.75, 0.1, 0.1]} flowDirection={[1, 0, 0]} speed={activeSpeed * 2} />
      </group>

      {/* Kinetic Torque: Engine -> Wheels */}
      {hasGas && (
        <group position={[1.5, 0.75, 0]}>
          <ParticleSystem type="kinetic" count={40} bounds={[0.75, 0.1, 0.1]} flowDirection={[1, -0.5, 0]} speed={activeSpeed * 1.5} />
        </group>
      )}

      {/* Kinetic Torque: Motor -> Wheels */}
      <group position={[1.5, -0.75, 0]}>
        <ParticleSystem type="kinetic" count={40} bounds={[0.75, 0.1, 0.1]} flowDirection={[1, 0.5, 0]} speed={activeSpeed * 1.5} />
      </group>

    </group>
  );
};