"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { CanvasScene } from "@/components/canvas/CanvasScene";
import { RegenBrakingSimulation } from "@/components/canvas/RegenBrakingSimulation";
import { ControlPanel } from "@/components/ui/ControlPanel";
import { Slider } from "@/components/ui/Slider";
import { ParticleLegend } from "@/components/ui/ParticleLegend";
import { cn } from "@/lib/utils";

export default function RegenBrakingPage() {
  const [intensity, setIntensity] = useState(3);
  const [action, setAction] = useState<'idle' | 'accelerate' | 'brake'>('idle');

  return (
    <div className="flex h-full w-full p-8 gap-8">
      <div className="flex-1 relative">
        <CanvasScene>
          <RegenBrakingSimulation action={action} intensity={intensity} />
        </CanvasScene>
      </div>
      <div className="h-full flex flex-col justify-start">
        <ControlPanel title="Driver Controls">
          <div className="flex gap-4 w-full">
            <button
              onMouseDown={() => setAction('accelerate')} onMouseUp={() => setAction('idle')} onMouseLeave={() => setAction('idle')}
              className={cn("flex-1 py-8 rounded-xl font-bold tracking-wider transition-all select-none active:scale-95", action === 'accelerate' ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.5)]" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700")}
            >
              GAS
            </button>
            <button
              onMouseDown={() => setAction('brake')} onMouseUp={() => setAction('idle')} onMouseLeave={() => setAction('idle')}
              className={cn("flex-1 py-8 rounded-xl font-bold tracking-wider transition-all select-none active:scale-95", action === 'brake' ? "bg-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.5)]" : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700")}
            >
              BRAKE
            </button>
          </div>
          <div className="h-px bg-neutral-800 w-full my-2" />
          <Slider label="Pedal Pressure" value={intensity} min={1} max={5} step={1} onChange={setIntensity} />
          
          <Link href="/learn/regen" className="mt-2 flex items-center justify-center gap-2 w-full bg-neutral-800 hover:bg-neutral-700 text-white py-2.5 px-4 rounded-lg border border-neutral-700 transition-all font-medium text-sm">
            <BookOpen className="w-4 h-4 text-blue-400" />
            Learn Theory
          </Link>
        </ControlPanel>
        <ParticleLegend activeParticles={['electron', 'kinetic']} />
      </div>
    </div>
  );
}