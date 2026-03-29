"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const ROUTES = [
  { name: "Welcome", path: "/" },
  { name: "Battery Cell", path: "/battery" },
  { name: "Fuel Cell", path: "/fuel-cell" },
  { name: "EV Architectures", path: "/ev-types" },
  { name: "Regen Braking", path: "/regen" },
  { name: "AC/DC Charging", path: "/charging" },
  { name: "Knowledge Quiz", path: "/quiz" }, // <-- ADDED QUIZ ROUTE
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="w-64 h-full bg-neutral-900/50 backdrop-blur-md border-r border-neutral-800 flex flex-col p-6 shadow-2xl z-20">
      <div className="mb-10">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          EEE <span className="text-blue-500">Sims</span>
        </h1>
        <div className="text-xs text-neutral-500 font-mono mt-1">Interactive Platform</div>
      </div>

      <nav className="flex flex-col gap-2">
        {ROUTES.map((route) => {
          const isActive = pathname === route.path;
          return (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
                  : "text-neutral-400 hover:bg-neutral-800 hover:text-neutral-200"
              )}
            >
              {route.name}
            </Link>
          );
        })}
      </nav>
      
      <div className="mt-auto text-xs text-neutral-600">
        Powered by Next.js & Three.js
      </div>
    </div>
  );
};