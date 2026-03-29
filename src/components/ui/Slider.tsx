import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({ label, value, min, max, step = 1, unit = "", onChange }) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center text-sm">
        <label className="text-neutral-300">{label}</label>
        <span className="text-neutral-400 font-mono">{value}{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-1.5 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
      />
    </div>
  );
};