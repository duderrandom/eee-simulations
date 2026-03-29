import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Car, Lightbulb } from 'lucide-react';

export default function EVTypesTheoryPage() {
  return (
    <div className="w-full h-full overflow-y-auto bg-black p-8 md:p-12 flex justify-center">
      <article className="max-w-3xl w-full text-neutral-300 flex flex-col gap-10 pb-20">
        
        <div className="flex flex-col gap-6 border-b border-neutral-800 pb-8 mt-4">
          <Link href="/ev-types" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-blue-400 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Simulation
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">EV Architectures</h1>
            <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
              <Car className="w-8 h-8 text-green-400" />
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" /> Core Concept
          </h2>
          <p className="leading-relaxed text-lg text-neutral-400">
            Electric Vehicles are categorized by how they combine traditional internal combustion engines (ICE) with electric motors and batteries. The architecture determines fuel efficiency and emissions.
          </p>
          
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">The Three Main Architectures</h2>
          <div className="grid gap-4">
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-blue-400 mb-2">BEV (Battery Electric Vehicle)</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                100% Electric. A massive battery pack sends DC power to an inverter, which drives an electric motor. There is no gas tank and no exhaust.
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-orange-400 mb-2">HEV (Hybrid Electric Vehicle)</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                Primarily gas-powered. A small battery and electric motor assist the ICE to improve fuel economy. The battery is charged strictly via regenerative braking, not by plugging in.
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-green-400 mb-2">PHEV (Plug-in Hybrid Electric Vehicle)</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                A bridge technology. Features a medium-sized battery that can be plugged in to charge. The car drives purely on electricity for short commutes, and the gas engine kicks in for long road trips.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" /> Real-World Relevance
          </h2>
          <p className="leading-relaxed text-neutral-400">
            Understanding these architectures is crucial for grid infrastructure planning and consumer adoption as the automotive industry transitions toward net-zero emissions.
          </p>
        </section>

      </article>
    </div>
  );
}