"use client";

import React from 'react';
import { cn } from '@/lib/utils';

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange, description }) => {
  return (
    <div className="flex items-center justify-between w-full group">
      {/* Label section */}
      <div className="flex flex-col gap-0.5">
        <span className="text-sm text-slate-300 font-medium">{label}</span>
        {description && (
          <span className="text-xs text-slate-500">{description}</span>
        )}
      </div>

      {/* Toggle switch */}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer",
          "items-center rounded-full border-2 border-transparent",
          "transition-all duration-200 ease-in-out",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900",
          checked ? "bg-cyan-500/20 border-cyan-500" : "bg-slate-700/50 border-slate-600"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full",
            "bg-slate-400 shadow-md transition-all duration-200 ease-in-out",
            checked ? "translate-x-6 bg-cyan-400" : "translate-x-1 bg-slate-400"
          )}
        />
      </button>
    </div>
  );
};