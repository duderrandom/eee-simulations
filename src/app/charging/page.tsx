"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { CanvasScene } from "@/components/canvas/CanvasScene";
import { EVChargingSimulation } from "@/components/canvas/EVChargingSimulation";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { Slider } from "@/components/ui/Slider";
import { Toggle } from "@/components/ui/Toggle";
import { ParticleLegend } from "@/components/ui/ParticleLegend";
import { cn } from "@/lib/utils";

export default function ChargingPage() {
  const [speed, setSpeed] = useState(2);
  const [isCharging, setIsCharging] = useState(false);
  const [chargerType, setChargerType] = useState<'AC' | 'DC'>('AC');

  return (
    <div className="flex h-full w-full p-8 gap-8">
      <div className="flex-1 relative">
        <CanvasScene>
          <EVChargingSimulation isCharging={isCharging} chargerType={chargerType} speed={speed} />
        </CanvasScene>
      </div>
      <div className="h-full flex flex-col justify-start">
        <ControlPanel title="Charging Station">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-neutral-300">Connection Type</span>
            <div className="flex bg-neutral-800 p-1 rounded-lg">
              <button
                onClick={() => setChargerType('AC')}
                className={cn("flex-1 py-1.5 text-xs font-semibold rounded-md transition-all", chargerType === 'AC' ? "bg-purple-500 text-white shadow-md" : "text-neutral-400 hover:text-white")}
              >
                AC (Level 2)
              </button>
              <button
                onClick={() => setChargerType('DC')}
                className={cn("flex-1 py-1.5 text-xs font-semibold rounded-md transition-all", chargerType === 'DC' ? "bg-yellow-500 text-white shadow-md" : "text-neutral-400 hover:text-white")}
              >
                DC Fast (Level 3)
              </button>
            </div>
          </div>
          <div className="h-px bg-neutral-800 w-full my-2" />
          <Toggle label="Plug In Vehicle" checked={isCharging} onChange={setIsCharging} />
          <Slider label="Visualization Speed" value={speed} min={0.5} max={5} step={0.5} unit="x" onChange={setSpeed} />
          
          <Link href="/learn/charging" className="mt-2 flex items-center justify-center gap-2 w-full bg-neutral-800 hover:bg-neutral-700 text-white py-2.5 px-4 rounded-lg border border-neutral-700 transition-all font-medium text-sm">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Learn Theory
          </Link>
        </ControlPanel>
        <ParticleLegend activeParticles={chargerType === 'AC' ? ['ac_electron', 'electron'] : ['electron']} />
      </div>
    </div>
  );
}