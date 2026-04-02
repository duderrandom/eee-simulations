"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ControlPanelProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ title, children, className }) => {
  return (
    <div
      className={cn(
        // Base panel styling - premium floating card
        "bg-slate-900/60 backdrop-blur-md",
        "border border-slate-700/50 rounded-2xl",
        "shadow-lg shadow-black/20",
        "p-6 flex flex-col gap-6",
        // Animation
        "transition-all duration-200",
        // Override width constraints from individual pages
        className
      )}
      style={{ width: 'auto', minWidth: '280px' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 pb-3 border-b border-slate-700/30">
        {/* Indicator dot */}
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <h2 className="text-lg font-semibold text-slate-100 tracking-tight">
          {title}
        </h2>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
};