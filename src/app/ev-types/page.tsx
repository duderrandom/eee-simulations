"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { CanvasScene } from "@/components/canvas/CanvasScene";
import { EVTypesSimulation } from "@/components/canvas/EVTypesSimulation";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { Slider } from "@/components/ui/Slider";
import { Toggle } from "@/components/ui/Toggle";
import { ParticleLegend } from "@/components/ui/ParticleLegend";
import { cn } from "@/lib/utils";

export default function EVTypesPage() {
  const [speed, setSpeed] = useState(2);
  const [isSimulating, setIsSimulating] = useState(false);
  const [evMode, setEvMode] = useState<'BEV' | 'HEV' | 'PHEV'>('BEV');

  return (
    <div className="flex h-full w-full p-8 gap-8">
      <div className="flex-1 relative">
        <CanvasScene>
          <EVTypesSimulation isRunning={isSimulating} speed={speed} mode={evMode} />
        </CanvasScene>
      </div>
      <div className="h-full flex flex-col justify-start">
        <ControlPanel title="Vehicle Controls">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-300">Architecture</span>
            <div className="flex bg-neutral-800 p-1 rounded-lg">
              {(['BEV', 'HEV', 'PHEV'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setEvMode(mode)}
                  className={cn(
                    "flex-1 py-1.5 text-xs font-semibold rounded-md transition-all",
                    evMode === mode ? "bg-blue-500 text-white shadow-md" : "text-neutral-400 hover:text-white"
                  )}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <div className="h-px bg-neutral-800 w-full my-2" />
          <Toggle label="Run Drivetrain" checked={isSimulating} onChange={setIsSimulating} />
          <Slider label="Output Speed" value={speed} min={0.5} max={5} step={0.5} unit="x" onChange={setSpeed} />
          
          <Link href="/learn/ev-types" className="mt-2 flex items-center justify-center gap-2 w-full bg-neutral-800 hover:bg-neutral-700 text-white py-2.5 px-4 rounded-lg border border-neutral-700 transition-all font-medium text-sm">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Learn Theory
          </Link>
        </ControlPanel>
        <ParticleLegend activeParticles={evMode === 'BEV' ? ['electron', 'kinetic'] : ['gasoline', 'electron', 'kinetic']} />
      </div>
    </div>
  );
}