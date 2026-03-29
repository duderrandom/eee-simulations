import React from 'react';

export type ParticleType = 'electron' | 'ion' | 'proton' | 'oxygen' | 'water' | 'gasoline' | 'kinetic' | 'ac_electron';

interface ParticleLegendProps {
  activeParticles: ParticleType[];
}

const PARTICLE_UI_CONFIG: Record<ParticleType, { name: string; color: string }> = {
  electron:    { name: 'Electron (DC)', color: '#eab308' },
  ion:         { name: 'Lithium Ion', color: '#3b82f6' },
  proton:      { name: 'Proton (H+)', color: '#ef4444' },
  oxygen:      { name: 'Oxygen (O2)', color: '#cbd5e1' },
  water:       { name: 'Water (H2O)', color: '#0ea5e9' },
  gasoline:    { name: 'Combustion Fuel', color: '#f97316' },
  kinetic:     { name: 'Kinetic Energy', color: '#22c55e' },
  ac_electron: { name: 'Electron (AC)', color: '#a855f7' },
};

export const ParticleLegend: React.FC<ParticleLegendProps> = ({ activeParticles }) => {
  return (
    <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-4 flex flex-col gap-3 shadow-xl w-80 mt-4">
      <h3 className="text-sm font-semibold text-neutral-300 tracking-wide uppercase">Particle Legend</h3>
      <div className="grid grid-cols-2 gap-2">
        {activeParticles.map((type) => {
          const config = PARTICLE_UI_CONFIG[type];
          if (!config) return null;
          
          return (
            <div key={type} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full shadow-sm" 
                style={{ 
                  backgroundColor: config.color,
                  boxShadow: `0 0 8px ${config.color}80` 
                }} 
              />
              <span className="text-xs text-neutral-400 font-medium">{config.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};