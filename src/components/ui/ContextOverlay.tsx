"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';

interface ContextOverlayProps {
  message: string;
  className?: string;
  icon?: React.ReactNode;
}

export const ContextOverlay: React.FC<ContextOverlayProps> = ({
  message,
  className,
  icon = <Info className="w-3 h-3" />,
}) => {
  return (
    <div
      className={cn(
        "absolute bottom-6 left-6 z-10",
        "flex items-center gap-2",
        "bg-slate-900/70 backdrop-blur-sm",
        "border border-slate-700/40 rounded-xl px-4 py-2.5",
        "text-xs text-slate-300",
        "transition-all duration-500",
        "animate-fade-in",
        className
      )}
    >
      <span className="text-cyan-400 shrink-0">{icon}</span>
      <span className="font-medium">{message}</span>
    </div>
  );
};

// In-scene 3D label component (for Three.js)
// Usage: Place inside Canvas with <Text> from @react-three/drei
// export const InSceneLabel: React.FC<{ position: [number, number, number]; text: string; color?: string; fontSize?: number }> = ({ position, text, color = '#94a3b8', fontSize = 0.8 }) => { ... }