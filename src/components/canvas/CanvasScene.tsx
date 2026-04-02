"use client";

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import { cn } from '@/lib/utils';
import { RotateCcw, Move3D } from 'lucide-react';

interface CanvasSceneProps {
  children?: React.ReactNode;
}

function CameraController({ onResetReady }: { onResetReady: (fn: () => void) => void }) {
  const { camera } = useThree();
  const isResettingRef = useRef(false);

  const resetCamera = useCallback(() => {
    if (isResettingRef.current) return;

    isResettingRef.current = true;
    const targetPosition = { x: 8, y: 6, z: 8 };

    // Animate to position over 600ms
    const startPosition = { x: camera.position.x, y: camera.position.y, z: camera.position.z };
    const duration = 600;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      camera.position.set(
        startPosition.x + (targetPosition.x - startPosition.x) * ease,
        startPosition.y + (targetPosition.y - startPosition.y) * ease,
        startPosition.z + (targetPosition.z - startPosition.z) * ease
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isResettingRef.current = false;
      }
    };

    requestAnimationFrame(animate);
  }, [camera]);

  // Register the reset function once
  useEffect(() => {
    onResetReady(resetCamera);
  }, [onResetReady, resetCamera]);

  return (
    <OrbitControls
      makeDefault
      minDistance={4}
      maxDistance={20}
      maxPolarAngle={Math.PI / 2 + 0.15}
      enablePan={false}
      enableDamping
      dampingFactor={0.05}
      rotateSpeed={0.8}
    />
  );
}

export const CanvasScene: React.FC<CanvasSceneProps> = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);
  const resetFnRef = useRef<(() => void) | null>(null);

  const handleResetView = useCallback(() => {
    if (resetFnRef.current) {
      resetFnRef.current();
    }
  }, []);

  const handleResetReady = useCallback((fn: () => void) => {
    resetFnRef.current = fn;
  }, []);

  return (
    <div
      className={cn(
        "absolute inset-0",
        "rounded-2xl overflow-hidden",
        "bg-gradient-to-b from-slate-900/50 to-slate-950/50",
        "border border-slate-700/30",
        "shadow-2xl shadow-black/40",
        "group transition-all duration-300"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top-left: Scene info badge */}
      <div
        className={cn(
          "absolute top-4 left-4 z-10",
          "flex items-center gap-2",
          "bg-slate-900/70 backdrop-blur-sm",
          "border border-slate-700/50 rounded-xl px-3 py-2",
          "text-xs text-slate-400 font-mono",
          "transition-all duration-300",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}
      >
        <Move3D className="w-3 h-3" />
        <span>3D Scene</span>
      </div>

      {/* Top-right: Reset view button */}
      <button
        onClick={handleResetView}
        className={cn(
          "absolute top-4 right-4 z-10",
          "flex items-center gap-2",
          "bg-slate-900/70 backdrop-blur-sm",
          "border border-slate-700/50 rounded-xl px-3 py-2",
          "text-xs text-slate-400 font-mono",
          "transition-all duration-300",
          "hover:bg-slate-800/80 hover:text-cyan-400 hover:border-cyan-500/30",
          "hover:shadow-[0_0_12px_rgba(34,211,238,0.15)]",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}
      >
        <RotateCcw className="w-3 h-3" />
        <span>Reset View</span>
      </button>

      {/* Bottom-left: Instructions overlay */}
      <div
        className={cn(
          "absolute bottom-4 left-4 z-10",
          "flex items-center gap-3",
          "bg-slate-900/60 backdrop-blur-sm",
          "border border-slate-700/30 rounded-xl px-4 py-2",
          "transition-all duration-400",
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        )}
      >
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
            <span className="text-[10px] text-slate-400 font-bold">L</span>
          </div>
          <span className="text-[10px] text-slate-500">Drag to rotate</span>
        </div>
        <div className="w-px h-3 bg-slate-700" />
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center">
            <span className="text-[10px] text-slate-400 font-bold">R</span>
          </div>
          <span className="text-[10px] text-slate-500">Scroll to zoom</span>
        </div>
      </div>

      <Canvas
        camera={{ position: [8, 6, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <CameraController onResetReady={handleResetReady} />

        {/* Lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
        <pointLight position={[-5, 5, -5]} intensity={0.3} color="#22d3ee" />

        {/* Environment */}
        <Environment preset="city" />

        {/* Grid */}
        <Grid
          infiniteGrid
          fadeDistance={25}
          sectionColor="#1e293b"
          cellColor="#0f172a"
          sectionSize={5}
          cellSize={1}
        />

        {children}
      </Canvas>
    </div>
  );
};