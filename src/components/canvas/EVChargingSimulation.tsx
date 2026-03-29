import React from 'react';
import { ParticleSystem } from './ParticleSystem';
import { RoundedBox, Text } from '@react-three/drei';

interface EVChargingSimulationProps {
  isCharging: boolean;
  chargerType: 'AC' | 'DC';
  speed: number;
}

export const EVChargingSimulation: React.FC<EVChargingSimulationProps> = ({ isCharging, chargerType, speed }) => {
  const activeSpeed = isCharging ? speed : 0;
  const isAC = chargerType === 'AC';

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Charging Station (Left) */}
      <group position={[-3, 0, 0]}>
        <RoundedBox args={[1.5, 3, 1]} radius={0.1}>
          <meshStandardMaterial color={isAC ? "#a855f7" : "#eab308"} metalness={0.6} roughness={0.3} />
        </RoundedBox>
        <Text position={[0, 0.5, 0.51]} fontSize={0.3} color="white">
          {isAC ? "Level 2" : "Level 3"}
        </Text>
        <Text position={[0, 0.1, 0.51]} fontSize={0.25} color="#cbd5e1">
          {isAC ? "AC Station" : "DC Fast"}
        </Text>
      </group>

      {/* 2. The Vehicle (Right Side Components) */}
      {/* On-Board Charger (OBC) - Only used during AC charging */}
      <group position={[2.0, 1.5, 0]}>
        <RoundedBox args={[1.5, 1, 1]} radius={0.1}>
          <meshStandardMaterial color={isAC ? "#334155" : "#1e293b"} metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <Text position={[0, 0, 0.51]} fontSize={0.25} color={isAC ? "white" : "#475569"}>
          On-Board Charger
        </Text>
      </group>

      {/* Main Battery Pack */}
      <group position={[2, -1, 0]}>
        <RoundedBox args={[2.5, 1.2, 1]} radius={0.1}>
          <meshStandardMaterial color="#0284c7" metalness={0.5} roughness={0.4} />
        </RoundedBox>
        <Text position={[0, 0, 0.51]} fontSize={0.3} color="white">
          Main Battery (DC)
        </Text>
      </group>


      {/* --- ENERGY FLOWS & CABLES --- */}

      {/* Cable: Station to Vehicle Port */}
      <RoundedBox position={[-0.5, 0.25, 0]} args={[3.5, 0.05, 0.05]} radius={0.02}>
        <meshStandardMaterial color="#475569" />
      </RoundedBox>

      {/* Logic for AC Flow (Station -> OBC -> Battery) */}
      {isAC && (
        <>
          {/* Purple AC Flow to OBC */}
          <group position={[-0.5, 0.25, 0]}>
            <ParticleSystem type="ac_electron" count={40} bounds={[1.75, 0.05, 0.05]} flowDirection={[1, 0.35, 0]} speed={activeSpeed} />
          </group>
          {/* Yellow DC Flow from OBC down to Battery */}
          <group position={[2, 0.25, 0]}>
            <ParticleSystem type="electron" count={30} bounds={[0.05, 0.6, 0.05]} flowDirection={[0, -1, 0]} speed={activeSpeed} />
          </group>
        </>
      )}

      {/* Logic for DC Fast Charge Flow (Station -> Bypass OBC -> Directly to Battery) */}
      {!isAC && (
        <>
          {/* Fast Yellow DC Flow straight to Battery */}
          <group position={[-0.5, 0.25, 0]}>
            <ParticleSystem type="electron" count={80} bounds={[1.75, 0.05, 0.05]} flowDirection={[1, -0.35, 0]} speed={activeSpeed * 3} />
          </group>
        </>
      )}
    </group>
  );
};