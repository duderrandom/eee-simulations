"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: [
    "bg-cyan-500/20 text-cyan-400 border-cyan-500/50",
    "hover:bg-cyan-500/30 hover:border-cyan-400",
    "active:scale-95",
  ].join(' '),
  secondary: [
    "bg-slate-800/80 text-slate-200 border-slate-600/50",
    "hover:bg-slate-700/80 hover:border-slate-500",
    "active:scale-95",
  ].join(' '),
  ghost: [
    "bg-transparent text-slate-400 border-transparent",
    "hover:bg-slate-800/50 hover:text-slate-200",
    "active:scale-95",
  ].join(' '),
  danger: [
    "bg-red-500/20 text-red-400 border-red-500/50",
    "hover:bg-red-500/30 hover:border-red-400",
    "active:scale-95",
  ].join(' '),
  success: [
    "bg-green-500/20 text-green-400 border-green-500/50",
    "hover:bg-green-500/30 hover:border-green-400",
    "active:scale-95",
  ].join(' '),
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5 rounded-lg',
  md: 'px-4 py-2.5 text-sm gap-2 rounded-xl',
  lg: 'px-6 py-3 text-base gap-2.5 rounded-xl',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        // Base styles
        "relative inline-flex items-center justify-center font-medium",
        "border transition-all duration-200",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        // Variant
        VARIANT_STYLES[variant],
        // Size
        SIZE_STYLES[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Loading spinner */}
      {isLoading && (
        <Loader2 className="w-4 h-4 animate-spin" />
      )}

      {/* Left icon */}
      {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}

      {/* Children */}
      {children}

      {/* Right icon */}
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
};

// Specialized Button for mode selection (like BEV/HEV/PHEV selector)
interface ModeButtonProps {
  modes: string[];
  activeMode: string;
  onChange: (mode: string) => void;
  variant?: 'default' | 'accent';
  size?: ButtonSize;
}

export const ModeSelector: React.FC<ModeButtonProps> = ({
  modes,
  activeMode,
  onChange,
  variant = 'default',
  size = 'md',
}) => {
  return (
    <div className={cn(
      "flex bg-slate-800/60 p-1 rounded-xl gap-1",
      size === 'lg' && "p-1.5 rounded-2xl gap-1.5"
    )}>
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => onChange(mode)}
          className={cn(
            "flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200",
            activeMode === mode
              ? variant === 'accent'
                ? "bg-cyan-500 text-white shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                : "bg-slate-600 text-white shadow-md"
              : "text-slate-400 hover:text-white hover:bg-slate-700/50",
            size === 'lg' && "py-2 text-sm rounded-xl"
          )}
        >
          {mode}
        </button>
      ))}
    </div>
  );
};

// Specialized Button for pedal controls (GAS/BRAKE)
interface PedalButtonProps {
  label: string;
  isActive: boolean;
  onMouseDown: () => void;
  onMouseUp: () => void;
  onMouseLeave?: () => void;
  variant?: 'accelerate' | 'brake';
}

export const PedalButton: React.FC<PedalButtonProps> = ({
  label,
  isActive,
  onMouseDown,
  onMouseUp,
  onMouseLeave,
  variant = 'accelerate',
}) => {
  const variantStyles = {
    accelerate: isActive
      ? "bg-cyan-500 text-white shadow-[0_0_20px_rgba(34,211,238,0.4)]"
      : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200",
    brake: isActive
      ? "bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]"
      : "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-slate-200",
  };

  return (
    <button
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
      className={cn(
        "flex-1 py-8 rounded-xl font-bold tracking-wider",
        "transition-all duration-150 select-none",
        "active:scale-95",
        variantStyles[variant]
      )}
    >
      {label}
    </button>
  );
};