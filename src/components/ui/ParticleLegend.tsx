"use client";

import React from 'react';
import { cn } from '@/lib/utils';

export type ParticleType =
  | 'electron'
  | 'ion'
  | 'proton'
  | 'oxygen'
  | 'hydrogen'
  | 'water'
  | 'gasoline'
  | 'kinetic'
  | 'ac_electron';

interface ParticleInfo {
  name: string;
  shortLabel: string;
  color: string;
  glowColor: string;
}

const PARTICLE_CONFIG: Record<ParticleType, ParticleInfo> = {
  electron: {
    name: 'Electron',
    shortLabel: 'DC',
    color: '#22d3ee',
    glowColor: 'rgba(34, 211, 238, 0.4)',
  },
  ac_electron: {
    name: 'Electron',
    shortLabel: 'AC',
    color: '#a855f7',
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  ion: {
    name: 'Lithium Ion',
    shortLabel: 'Li+',
    color: '#3b82f6',
    glowColor: 'rgba(59, 130, 246, 0.4)',
  },
  proton: {
    name: 'Proton',
    shortLabel: 'H+',
    color: '#ef4444',
    glowColor: 'rgba(239, 68, 68, 0.4)',
  },
  oxygen: {
    name: 'Oxygen',
    shortLabel: 'O₂',
    color: '#cbd5e1',
    glowColor: 'rgba(203, 213, 225, 0.4)',
  },
  hydrogen: {
    name: 'Hydrogen',
    shortLabel: 'H₂',
    color: '#ffffff',
    glowColor: 'rgba(255, 255, 255, 0.4)',
  },
  water: {
    name: 'Water',
    shortLabel: 'H₂O',
    color: '#0ea5e9',
    glowColor: 'rgba(14, 165, 233, 0.4)',
  },
  gasoline: {
    name: 'Combustion',
    shortLabel: 'Fuel',
    color: '#f97316',
    glowColor: 'rgba(249, 115, 22, 0.4)',
  },
  kinetic: {
    name: 'Kinetic',
    shortLabel: 'KE',
    color: '#22c55e',
    glowColor: 'rgba(34, 197, 94, 0.4)',
  },
};

interface ParticleLegendProps {
  activeParticles: ParticleType[];
  className?: string;
}

export const ParticleLegend: React.FC<ParticleLegendProps> = ({
  activeParticles,
  className,
}) => {
  if (activeParticles.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "bg-slate-900/50 backdrop-blur-md",
        "border border-slate-700/40 rounded-2xl",
        "p-4 flex flex-col gap-3",
        "shadow-lg shadow-black/10",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 pb-2 border-b border-slate-700/30">
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
          Particle Legend
        </h3>
      </div>

      {/* Particle list */}
      <div className="flex flex-col gap-2.5">
        {activeParticles.map((type) => {
          const config = PARTICLE_CONFIG[type];
          if (!config) return null;

          return (
            <div
              key={type}
              className="flex items-center gap-3 group cursor-default"
            >
              {/* Particle indicator */}
              <div
                className="relative w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${config.color}20`,
                  border: `1.5px solid ${config.color}60`,
                }}
              >
                {/* Inner dot with glow */}
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: config.color,
                    boxShadow: `0 0 6px ${config.glowColor}`,
                  }}
                />
              </div>

              {/* Name and label */}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm text-slate-200 font-medium leading-none truncate">
                  {config.name}
                </span>
                <span
                  className="text-xs font-mono tabular-nums"
                  style={{ color: config.color }}
                >
                  {config.shortLabel}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};