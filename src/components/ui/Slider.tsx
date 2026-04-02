"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
  showValue?: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
  showValue = true
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Calculate percentage for the filled track
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div
      className="flex flex-col gap-3 w-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header row - label and value */}
      <div className="flex justify-between items-center">
        <label className="text-sm text-slate-300 font-medium transition-colors duration-200 group-hover:text-slate-200">
          {label}
        </label>
        {showValue && (
          <span
            className={cn(
              "text-sm font-mono tabular-nums transition-all duration-200",
              isHovered ? "text-cyan-400" : "text-slate-400"
            )}
          >
            {value}{unit}
          </span>
        )}
      </div>

      {/* Slider track and thumb */}
      <div className="relative h-6 flex items-center">
        {/* Track background */}
        <div className="absolute w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          {/* Filled portion */}
          <div
            className="h-full bg-gradient-to-r from-cyan-500/80 to-cyan-400 rounded-full transition-all duration-150"
            style={{ width: `${percentage}%` }}
          />
        </div>

        {/* Range input - layered on top */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className={cn(
            "absolute w-full h-6 appearance-none cursor-pointer",
            "[&::-webkit-slider-thumb]:appearance-none",
            "[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4",
            "[&::-webkit-slider-thumb]:rounded-full",
            "[&::-webkit-slider-thumb]:bg-cyan-400",
            "[&::-webkit-slider-thumb]:shadow-md shadow-cyan-400/30",
            "[&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-200",
            "[&::-webkit-slider-thumb]:cursor-pointer",
            "[&::-webkit-slider-thumb]:hover:scale-125",
            "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4",
            "[&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0",
            "[&::-moz-range-thumb]:bg-cyan-400",
            "[&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:shadow-cyan-400/30"
          )}
          style={{
            background: 'transparent'
          }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex justify-between">
        <span className="text-xs text-slate-600">{min}{unit}</span>
        <span className="text-xs text-slate-600">{max}{unit}</span>
      </div>
    </div>
  );
};