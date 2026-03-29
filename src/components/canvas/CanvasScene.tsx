"use client";

import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CanvasSceneProps {
  children?: React.ReactNode;
}

export const CanvasScene: React.FC<CanvasSceneProps> = ({ children }) => {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  // Function to snap the camera back to the exact starting position
  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className="absolute inset-0 bg-black rounded-xl overflow-hidden border border-neutral-800 shadow-2xl group">
      
      {/* HTML Overlay: Hidden by default, appears on hover over the canvas */}
      <button 
        onClick={resetCamera}
        className="absolute top-4 right-4 z-10 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white px-3 py-1.5 rounded-md text-xs font-mono border border-neutral-700 transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
      >
        [ RESET VIEW ]
      </button>

      <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        {/* Adds realistic but lightweight lighting reflections for our metal materials */}
        <Environment preset="city" />

        <Grid infiniteGrid fadeDistance={20} sectionColor="#444" cellColor="#222" />
        
        {/* Constrained Controls */}
        <OrbitControls 
          ref={controlsRef}
          makeDefault 
          minDistance={3}         // Prevents zooming inside the models
          maxDistance={15}        // Prevents zooming out into the void
          maxPolarAngle={Math.PI / 2 + 0.1} // Prevents looking at the bottom of the grid
          enablePan={false}       // Prevents dragging the models off-screen
        />
        
        {children}
      </Canvas>
    </div>
  );
};