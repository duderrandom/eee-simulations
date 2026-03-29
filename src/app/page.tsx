"use client";

import React from "react";

const TEAM_MEMBERS = [
  { name: "Arnav Tiwari", reg: "RA2511026011525" },
  { name: "Ewan J", reg: "RA2511026011524" },
  { name: "Akshitha G", reg: "RA2511026011608" },
  { name: "Jai Akash R", reg: "RA2511026011522" },
  { name: "Ahmed Ashik A", reg: "RA2511026011523" },
];

export default function WelcomePage() {
  // Radius defines how far out the names sit from the center. 
  // 300px creates a 600px wide perfect pentagon.
  const radius = 300; 

  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
      
      {/* TASK 6: Low-Opacity SVG Pattern Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.04]"
        style={{
          // A subtle geometric grid/dot pattern that looks like a PCB or circuit board
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* TASK 5: Pentagon Layout Assembly */}
      <div className="relative z-10 w-[800px] h-[800px] flex items-center justify-center scale-75 md:scale-100">
        
        {/* Center Node: Project Info */}
        <div className="absolute flex flex-col items-center text-center max-w-sm z-20">
          <div className="px-4 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-widest rounded-full mb-6 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            GROUP 8
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
            EEE Project
          </h1>
          <p className="text-base text-neutral-400 leading-relaxed max-w-xs">
            An interactive simulation platform for understanding EEE concepts like batteries, fuel cells, EVs, and energy systems.
          </p>
        </div>

        {/* 5 Nodes: Mapped using standard Trigonometry */}
        {TEAM_MEMBERS.map((member, index) => {
          // 360 degrees / 5 members = 72 degrees apart.
          // Subtracting 90 degrees rotates the starting point to the top center.
          const angleInDegrees = (index * 72) - 90;
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          
          const x = Math.cos(angleInRadians) * radius;
          const y = Math.sin(angleInRadians) * radius;

          return (
            <div
              key={member.reg}
              className="absolute flex flex-col items-center bg-neutral-900/80 backdrop-blur-md border border-neutral-800 px-6 py-4 rounded-2xl shadow-xl transition-all hover:scale-110 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] z-30"
              style={{
                transform: `translate(${x}px, ${y}px)`,
              }}
            >
              <span className="text-white font-bold text-sm whitespace-nowrap tracking-wide">{member.name}</span>
              <span className="text-blue-400 font-mono text-xs mt-1.5 opacity-80">{member.reg}</span>
            </div>
          );
        })}
        
      </div>
    </div>
  );
}