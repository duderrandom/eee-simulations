import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Droplet, Lightbulb } from 'lucide-react';

export default function FuelCellTheoryPage() {
  return (
    <div className="w-full h-full overflow-y-auto bg-black p-8 md:p-12 flex justify-center">
      <article className="max-w-3xl w-full text-neutral-300 flex flex-col gap-10 pb-20">
        
        <div className="flex flex-col gap-6 border-b border-neutral-800 pb-8 mt-4">
          <Link href="/fuel-cell" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-blue-400 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Simulation
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Hydrogen Fuel Cells</h1>
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
              <Droplet className="w-8 h-8 text-purple-400" />
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" /> Core Concept
          </h2>
          <p className="leading-relaxed text-lg text-neutral-400">
            A Proton Exchange Membrane (PEM) fuel cell generates electricity through an electrochemical reaction between hydrogen and oxygen, producing only water and heat as byproducts.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">How It Works</h2>
          <div className="grid gap-4">
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-blue-400 mb-2">1. Hydrogen Splitting</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                Hydrogen gas (H<sub>2</sub>) enters the Anode. A catalyst splits the hydrogen molecules into protons (H<sup>+</sup>) and electrons (e<sup>-</sup>). 
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-purple-400 mb-2">2. The Membrane & Circuit</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                The PEM strictly allows only protons to pass through to the Cathode. The electrons are blocked, forcing them to travel through an external circuit, creating usable electricity.
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-blue-400 mb-2">3. Water Formation</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                At the Cathode, oxygen (O<sub>2</sub>) from the air combines with the electrons returning from the circuit and the protons crossing the membrane to form pure water (H<sub>2</sub>O).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Electrochemical Reactions</h2>
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl font-mono text-sm overflow-x-auto">
            <div className="mb-6">
              <p className="text-neutral-500 mb-2 uppercase tracking-wider text-xs">Anode Reaction:</p>
              <p className="text-white text-base tracking-wider">
                H<sub>2</sub> &rarr; 2H<sup>+</sup> + 2e<sup>-</sup>
              </p>
            </div>
            <div>
              <p className="text-neutral-500 mb-2 uppercase tracking-wider text-xs">Cathode Reaction:</p>
              <p className="text-white text-base tracking-wider">
                &frac12; O<sub>2</sub> + 2H<sup>+</sup> + 2e<sup>-</sup> &rarr; H<sub>2</sub>O
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" /> Real-World Relevance
          </h2>
          <p className="leading-relaxed text-neutral-400">
            Fuel cells offer continuous power as long as fuel is supplied. They are critical for zero-emission heavy-duty transportation (buses, trucks) and aerospace applications.
          </p>
        </section>

      </article>
    </div>
  );
}