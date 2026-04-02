"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Battery,
  Fuel,
  Car,
  RotateCcw,
  Plug,
  Brain,
  Zap,
} from "lucide-react";

const ROUTES = [
  { name: "Welcome", path: "/", icon: Home },
  { name: "Battery Cell", path: "/battery", icon: Battery },
  { name: "Fuel Cell", path: "/fuel-cell", icon: Fuel },
  { name: "EV Architectures", path: "/ev-types", icon: Car },
  { name: "Regen Braking", path: "/regen", icon: RotateCcw },
  { name: "AC/DC Charging", path: "/charging", icon: Plug },
  { name: "Knowledge Quiz", path: "/quiz", icon: Brain },
];

// Group routes by category
const NAV_SECTIONS = [
  {
    title: "Overview",
    routes: [{ name: "Welcome", path: "/", icon: Home }],
  },
  {
    title: "Simulations",
    routes: [
      { name: "Battery Cell", path: "/battery", icon: Battery },
      { name: "Fuel Cell", path: "/fuel-cell", icon: Fuel },
      { name: "EV Architectures", path: "/ev-types", icon: Car },
      { name: "Regen Braking", path: "/regen", icon: RotateCcw },
      { name: "AC/DC Charging", path: "/charging", icon: Plug },
    ],
  },
  {
    title: "Assessment",
    routes: [{ name: "Knowledge Quiz", path: "/quiz", icon: Brain }],
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "w-68 h-full",
        "bg-slate-900/40 backdrop-blur-xl",
        "border-r border-slate-800/50",
        "flex flex-col",
        "shadow-2xl shadow-black/20"
      )}
    >
      {/* Header */}
      <div className="px-6 pt-6 pb-4">
        {/* Logo / Brand */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-100">
              EEE <span className="text-cyan-400">Sims</span>
            </h1>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-xs text-slate-500 font-mono">
          Interactive Learning Platform
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent mx-6" />

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto">
        <div className="space-y-6">
          {NAV_SECTIONS.map((section) => (
            <div key={section.title}>
              {/* Section header */}
              <h3 className="px-3 mb-2 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                {section.title}
              </h3>

              {/* Routes */}
              <div className="space-y-1">
                {section.routes.map((route) => {
                  const isActive = pathname === route.path;
                  const Icon = route.icon;

                  return (
                    <Link
                      key={route.path}
                      href={route.path}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl",
                        "text-sm font-medium transition-all duration-200",
                        "group relative",
                        // Active state
                        isActive
                          ? cn(
                              "bg-slate-800/80 text-slate-100",
                              "border-l-2 border-cyan-400",
                              "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]"
                            )
                          : cn(
                              "text-slate-400",
                              "hover:bg-slate-800/40 hover:text-slate-200",
                              "border-l-2 border-transparent"
                            )
                      )}
                    >
                      {/* Icon */}
                      <Icon
                        className={cn(
                          "w-4 h-4 shrink-0 transition-colors duration-200",
                          isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300"
                        )}
                      />

                      {/* Label */}
                      <span>{route.name}</span>

                      {/* Active indicator dot */}
                      {isActive && (
                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-slate-800/50">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>Powered by</span>
          <span className="text-slate-400 font-medium">Next.js</span>
          <span>&</span>
          <span className="text-slate-400 font-medium">Three.js</span>
        </div>
      </div>
    </div>
  );
};