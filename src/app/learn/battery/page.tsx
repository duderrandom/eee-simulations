import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Battery, Lightbulb } from 'lucide-react';

export default function BatteryTheoryPage() {
  return (
    <div className="w-full h-full overflow-y-auto bg-black p-8 md:p-12 flex justify-center">
      <article className="max-w-3xl w-full text-neutral-300 flex flex-col gap-10 pb-20">
        
        {/* Header Section */}
        <div className="flex flex-col gap-6 border-b border-neutral-800 pb-8 mt-4">
          <Link 
            href="/battery" 
            className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-blue-400 transition-colors w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Simulation
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Lithium-Ion Batteries</h1>
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <Battery className="w-8 h-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" /> Core Concept
          </h2>
          <p className="leading-relaxed text-lg text-neutral-400">
            A lithium-ion (Li-ion) battery is an advanced battery technology that uses lithium ions as a key component of its electrochemistry. During a discharge cycle, lithium atoms in the anode are ionized and separated from their electrons.
          </p>
        </section>

        {/* Step-by-step Working */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">How It Works</h2>
          <div className="grid gap-4">
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-blue-400 mb-2">1. Discharging (Powering a Device)</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                Lithium ions (Li<sup>+</sup>) move from the negative electrode (Anode) through the liquid electrolyte to the positive electrode (Cathode). The membrane separator prevents electrons from taking this internal path. Instead, the electrons (e<sup>-</sup>) are forced through the external circuit, creating the electrical current that powers your device.
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-green-400 mb-2">2. Charging (Storing Energy)</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                When plugged into a power source, the process reverses. The external voltage pushes electrons back into the Anode. To maintain neutrality, the Lithium ions travel back through the electrolyte from the Cathode to the Anode, storing potential energy.
              </p>
            </div>
          </div>
        </section>

        {/* Chemical Reactions (Math/Chemistry) */}
        {/* Chemical Reactions (Math/Chemistry) */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Electrochemical Reactions</h2>
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl font-mono text-sm overflow-x-auto">
            <div className="mb-6">
              <p className="text-neutral-500 mb-2 uppercase tracking-wider text-xs">Anode Half-Reaction (Oxidation):</p>
              <p className="text-white text-base tracking-wider">
                LiC<sub>6</sub> &rarr; Li<sup>+</sup> + e<sup>-</sup> + C<sub>6</sub>
              </p>
            </div>
            <div>
              <p className="text-neutral-500 mb-2 uppercase tracking-wider text-xs">Cathode Half-Reaction (Reduction):</p>
              <p className="text-white text-base tracking-wider">
                CoO<sub>2</sub> + Li<sup>+</sup> + e<sup>-</sup> &rarr; LiCoO<sub>2</sub>
              </p>
            </div>
          </div>
        </section>

        {/* Real-world Relevance */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" /> Real-World Relevance
          </h2>
          <p className="leading-relaxed text-neutral-400">
            Because of their extremely high energy density, lack of "memory effect," and low self-discharge rate, Li-ion chemistries are the foundational energy storage mechanism for modern Electric Vehicles (EVs), grid-scale energy storage, and billions of portable electronics worldwide.
          </p>
        </section>

      </article>
    </div>
  );
}