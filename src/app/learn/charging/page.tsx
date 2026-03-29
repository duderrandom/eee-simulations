import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Plug, Lightbulb } from 'lucide-react';

export default function ChargingTheoryPage() {
  return (
    <div className="w-full h-full overflow-y-auto bg-black p-8 md:p-12 flex justify-center">
      <article className="max-w-3xl w-full text-neutral-300 flex flex-col gap-10 pb-20">
        
        <div className="flex flex-col gap-6 border-b border-neutral-800 pb-8 mt-4">
          <Link href="/charging" className="inline-flex items-center gap-2 text-sm text-neutral-400 hover:text-blue-400 transition-colors w-fit">
            <ArrowLeft className="w-4 h-4" />
            Back to Simulation
          </Link>
          <div className="flex items-center justify-between">
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">AC vs DC Charging</h1>
            <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
              <Plug className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" /> Core Concept
          </h2>
          <p className="leading-relaxed text-lg text-neutral-400">
            Batteries store energy in Direct Current (DC), but the power grid delivers electricity in Alternating Current (AC). Therefore, an AC-to-DC conversion must happen before energy can enter the battery. Where this conversion occurs dictates the speed of charging.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-6">Charging Levels Breakdown</h2>
          
          {/* NEW: Comparison Table */}
          <div className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 mb-8">
            <table className="w-full text-left text-sm">
              <thead className="bg-neutral-900 text-neutral-300 border-b border-neutral-800">
                <tr>
                  <th className="px-6 py-4 font-semibold">Level</th>
                  <th className="px-6 py-4 font-semibold">Voltage / Type</th>
                  <th className="px-6 py-4 font-semibold">Conversion</th>
                  <th className="px-6 py-4 font-semibold">Est. Speed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800 text-neutral-400">
                <tr className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">Level 1</td>
                  <td className="px-6 py-4">120V (AC)</td>
                  <td className="px-6 py-4">Inside Car (OBC)</td>
                  <td className="px-6 py-4">3 - 5 miles/hour</td>
                </tr>
                <tr className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-white">Level 2</td>
                  <td className="px-6 py-4">240V (AC)</td>
                  <td className="px-6 py-4">Inside Car (OBC)</td>
                  <td className="px-6 py-4">15 - 30 miles/hour</td>
                </tr>
                <tr className="hover:bg-neutral-800/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-yellow-400">Level 3</td>
                  <td className="px-6 py-4 text-yellow-100">400V+ (DC)</td>
                  <td className="px-6 py-4 text-yellow-100">Inside Station</td>
                  <td className="px-6 py-4 text-yellow-100">100 - 1000+ miles/hour</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid gap-4">
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-purple-400 mb-2">AC Charging (Levels 1 & 2)</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                AC power from the grid enters the vehicle. The car's internal On-Board Charger (OBC) acts as a rectifier, converting the AC to DC before sending it to the battery. Because OBCs must be small enough to fit inside the car, their conversion speed is limited.
              </p>
            </div>
            <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl">
              <h3 className="text-lg font-medium text-yellow-400 mb-2">DC Fast Charging (Level 3)</h3>
              <p className="leading-relaxed text-neutral-400 text-sm">
                Massive charging stations contain enormous internal rectifiers. They convert AC to DC *before* it reaches the car. By bypassing the vehicle's tiny OBC, they can pump massive amounts of pure DC power directly into the battery pack, achieving rapid charge times.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-500" /> Real-World Relevance
          </h2>
          <p className="leading-relaxed text-neutral-400">
            While AC charging is ideal for overnight residential use, the deployment of high-voltage DC Fast Charging networks along highways is the primary infrastructure solution to eliminate "range anxiety" for long road trips.
          </p>
        </section>

      </article>
    </div>
  );
}