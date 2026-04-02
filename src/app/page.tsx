"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Battery,
  Fuel,
  Car,
  RotateCcw,
  Plug,
  Zap,
  ArrowRight,
  Users,
} from "lucide-react";

const TEAM_MEMBERS = [
  { name: "Arnav Tiwari", reg: "RA2511026011525" },
  { name: "Ewan J", reg: "RA2511026011524" },
  { name: "Akshitha G", reg: "RA2511026011608" },
  { name: "Jai Akash R", reg: "RA2511026011522" },
  { name: "Ahmed Ashik A", reg: "RA2511026011523" },
];

const SIMULATION_LINKS = [
  {
    title: "Battery Cell",
    description: "Understanding electrochemical reactions",
    href: "/battery",
    icon: Battery,
    color: "#22d3ee",
  },
  {
    title: "Fuel Cell",
    description: "Hydrogen-powered energy conversion",
    href: "/fuel-cell",
    icon: Fuel,
    color: "#a855f7",
  },
  {
    title: "EV Architectures",
    description: "BEV, HEV, and PHEV drivetrains",
    href: "/ev-types",
    icon: Car,
    color: "#22c55e",
  },
  {
    title: "Regen Braking",
    description: "Kinetic energy recovery systems",
    href: "/regen",
    icon: RotateCcw,
    color: "#eab308",
  },
  {
    title: "AC/DC Charging",
    description: "Power delivery fundamentals",
    href: "/charging",
    icon: Plug,
    color: "#f97316",
  },
];

export default function WelcomePage() {
  const radius = 280;

  return (
    <div className="relative w-full h-full min-h-screen overflow-hidden bg-slate-950">
      {/* Background circuit pattern */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-cyan-500/5 via-transparent to-transparent pointer-events-none" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col h-full min-h-screen p-8">
        {/* Header */}
        <header className="text-center mb-8 animate-fade-in">
          {/* Group badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full mb-6">
            <Users className="w-3 h-3 text-cyan-400" />
            <span className="text-xs font-semibold text-cyan-400 tracking-widest uppercase">
              Group 8
            </span>
          </div>

          {/* Main title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            EEE Interactive{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Simulation Platform
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Explore electrochemical systems, energy conversion, and electric vehicle
            architectures through interactive 3D simulations.
          </p>
        </header>

        {/* Mobile team members — shown below lg */}
        <div className="lg:hidden w-full max-w-md mx-auto mb-6">
          <p className="text-xs font-semibold text-cyan-400 tracking-widest uppercase text-center mb-3">
            Team Members
          </p>
          <div className="grid grid-cols-1 gap-2">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.reg}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-slate-900/60 border border-slate-700/50"
              >
                <span className="text-sm font-medium text-slate-200">{member.name}</span>
                <span className="text-xs font-mono text-cyan-500/80">{member.reg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main layout: Pentagon + Simulation cards */}
        <div className="flex-1 flex items-center justify-center gap-16">
          {/* Pentagon layout — visible on lg+ */}
          <div className="relative w-[600px] h-[600px] shrink-0 hidden lg:flex items-center justify-center">
            {/* Center node */}
            <div className="absolute flex flex-col items-center text-center z-20">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-lg font-bold text-white">EEE Project</span>
              <span className="text-xs text-slate-500 mt-1">Interactive Learning</span>
            </div>

            {/* Team member nodes */}
            {TEAM_MEMBERS.map((member, index) => {
              const angleInDegrees = index * 72 - 90;
              const angleInRadians = (angleInDegrees * Math.PI) / 180;
              const x = Math.cos(angleInRadians) * radius;
              const y = Math.sin(angleInRadians) * radius;

              return (
                <div
                  key={member.reg}
                  className="absolute flex flex-col items-center group cursor-default"
                  style={{ transform: `translate(${x}px, ${y}px)` }}
                >
                  <div
                    className={cn(
                      "px-5 py-3 rounded-xl",
                      "bg-slate-900/60 backdrop-blur-md",
                      "border border-slate-700/50",
                      "shadow-lg shadow-black/20",
                      "transition-all duration-300",
                      "group-hover:scale-105 group-hover:border-cyan-500/40",
                      "group-hover:shadow-[0_0_25px_rgba(34,211,238,0.15)]"
                    )}
                  >
                    <span className="text-sm font-medium text-slate-200 whitespace-nowrap">
                      {member.name}
                    </span>
                    <span className="block text-xs font-mono text-cyan-500/80 mt-1 text-center">
                      {member.reg}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Simulation cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 max-w-md z-20">
            {SIMULATION_LINKS.map((link, index) => {
              const Icon = link.icon;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative",
                    "p-4 rounded-xl",
                    "bg-slate-900/80 backdrop-blur-md",
                    "border border-slate-800/60",
                    "transition-all duration-300",
                    "hover:bg-slate-800/80 hover:border-slate-600",
                    "hover:shadow-lg hover:shadow-black/30",
                    "hover:translate-x-1"
                  )}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${link.color}15`,
                        border: `1px solid ${link.color}30`,
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: link.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                        {link.title}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {link.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                  </div>

                  {/* Left accent bar on hover */}
                  <div
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-8 rounded-full",
                      "bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent",
                      "opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    )}
                  />
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-600 mt-auto pt-4 pb-2 z-20">
          <span>Built with Next.js, React Three Fiber & Tailwind CSS</span>
        </footer>
      </div>
    </div>
  );
}