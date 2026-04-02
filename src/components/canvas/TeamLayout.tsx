import React from 'react';

// Your complete Group 8 roster
const teamMembers = [
  { name: "Arnav Tiwari", reg: "RA2511026011525" },
  { name: "Ahmed Ashik A", reg: "RA2511026011523" },
  { name: "Ewan J", reg: "RA2511026011524" },
  { name: "Akshitha G", reg: "RA2511026011608" },
  { name: "Jai Akash R", reg: "RA2511026011522" }
];

export default function TeamLayout() {
  // Radius defines how far the nodes sit from the center hub (in pixels)
  const radius = 250; 
  const totalMembers = teamMembers.length;

  return (
    // The main container needs to be relative and large enough to hold the circle
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
      
      {/* The Central Hub */}
      <div className="absolute z-10 w-40 h-40 bg-blue-600 rounded-full flex items-center justify-center shadow-xl shadow-blue-500/20">
        <h1 className="text-white font-bold text-center">
          EEE Project<br/>Group 8
        </h1>
      </div>

      {/* The Team Member Nodes */}
      {teamMembers.map((member, index) => {
        // Calculate the angle for each member (in radians)
        // We subtract Math.PI / 2 to start the first node at the very top (12 o'clock)
        const angle = (index / totalMembers) * (2 * Math.PI) - (Math.PI / 2);
        
        // Calculate X and Y using standard polar to cartesian conversion
        const x = radius * Math.cos(angle);
        const y = radius * Math.sin(angle);

        return (
          <div 
            key={member.reg}
            className="absolute w-48 p-4 bg-gray-800 border border-gray-700 rounded-xl shadow-lg flex flex-col items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110"
            style={{
              // Apply the calculated offsets relative to the center of the screen
              left: `calc(50% + ${x}px)`,
              top: `calc(50% + ${y}px)`
            }}
          >
            <h2 className="text-white font-semibold text-center">{member.name}</h2>
            <p className="text-gray-400 text-sm text-center">{member.reg}</p>
          </div>
        );
      })}
    </div>
  );
}