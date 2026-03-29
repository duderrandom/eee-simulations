import React from 'react';

interface ControlPanelProps {
  title: string;
  children: React.ReactNode;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({ title, children }) => {
  return (
    <div className="bg-neutral-900/80 backdrop-blur-md border border-neutral-800 rounded-xl p-5 flex flex-col gap-6 shadow-xl w-80">
      <h2 className="text-lg font-semibold text-neutral-100 tracking-tight">{title}</h2>
      <div className="flex flex-col gap-5">
        {children}
      </div>
    </div>
  );
};