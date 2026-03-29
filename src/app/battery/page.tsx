"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { CanvasScene } from "@/components/canvas/CanvasScene";
import { BatterySimulation } from "@/components/canvas/BatterySimulation";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { Slider } from "@/components/ui/Slider";
import { Toggle } from "@/components/ui/Toggle";
import { ParticleLegend } from "@/components/ui/ParticleLegend";

export default function BatteryPage() {
  const [speed, setSpeed] = useState(2);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isCharging, setIsCharging] = useState(false);

  return (
    <div className="flex h-full w-full p-8 gap-8">
      <div className="flex-1 relative">
        <CanvasScene>
          <BatterySimulation isRunning={isSimulating} isCharging={isCharging} speed={speed} />
        </CanvasScene>
      </div>
      <div className="h-full flex flex-col justify-start">
        <ControlPanel title="Battery Controls">
          <Toggle label="Run Simulation" checked={isSimulating} onChange={setIsSimulating} />
          <Toggle label={isCharging ? "Mode: Charging" : "Mode: Discharging"} checked={isCharging} onChange={setIsCharging} />
          <Slider label="Simulation Speed" value={speed} min={0.5} max={5} step={0.5} unit="x" onChange={setSpeed} />
          
          <Link href="/learn/battery" className="mt-2 flex items-center justify-center gap-2 w-full bg-neutral-800 hover:bg-neutral-700 text-white py-2.5 px-4 rounded-lg border border-neutral-700 transition-all font-medium text-sm">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Learn Theory
          </Link>
        </ControlPanel>
        <ParticleLegend activeParticles={['ion', 'electron']} />
      </div>
    </div>
  );
}