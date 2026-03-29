"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

const QUIZ_DATA = [
  {
    question: "In a Lithium-Ion battery, what physically travels through the external wire to power a device?",
    options: ["Lithium Ions", "Protons", "Electrons", "Liquid Electrolyte"],
    correctIndex: 2,
    explanation: "While Lithium Ions (Li+) travel internally through the electrolyte to balance the charge, Electrons (e-) are forced through the external wire, creating the usable electrical current."
  },
  {
    question: "What is the only exhaust byproduct of a pure Hydrogen Fuel Cell?",
    options: ["Carbon Dioxide", "Pure Water", "Methane Gas", "Ozone"],
    correctIndex: 1,
    explanation: "Fuel cells combine Hydrogen (H2) and Oxygen (O2) to generate electricity. The chemical reaction leaves pure Water (H2O) as the only emission."
  },
  {
    question: "During Regenerative Braking, the EV's electric motor temporarily acts as a...",
    options: ["Resistor", "Generator", "Capacitor", "Inverter"],
    correctIndex: 1,
    explanation: "The kinetic momentum of the car physically spins the motor backwards. This mechanical resistance slows the car down while turning the motor into a generator that pumps electrons back into the battery."
  },
  {
    question: "Why is Level 3 (DC Fast Charging) significantly faster than Level 2 (AC Charging)?",
    options: ["It uses thicker cables", "It bypasses the car's On-Board Charger", "It increases battery temperature", "It uses wireless induction"],
    correctIndex: 1,
    explanation: "Batteries only store DC power. Level 3 stations convert AC to DC outside the car, bypassing the vehicle's tiny internal On-Board Charger (OBC) and pumping high-voltage DC directly into the battery."
  }
];

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const currentQ = QUIZ_DATA[currentIndex];
  const isAnswered = selectedOption !== null;

  const handleSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    if (idx === currentQ.correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < QUIZ_DATA.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      setIsComplete(true);
    }
  };

  if (isComplete) {
    return (
      <div className="w-full h-full bg-black p-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-10 text-center shadow-2xl">
          <div className="w-20 h-20 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Quiz Complete!</h2>
          <p className="text-neutral-400 mb-8">You scored {score} out of {QUIZ_DATA.length}</p>
          <button 
            onClick={() => { setCurrentIndex(0); setSelectedOption(null); setScore(0); setIsComplete(false); }}
            className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-neutral-200 transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-black p-6 md:p-10 flex flex-col items-center justify-center overflow-y-auto">
      <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-10 shadow-2xl my-auto">
        
        <div className="flex justify-between items-center border-b border-neutral-800 pb-6 mb-8">
          <span className="text-neutral-400 font-mono text-sm tracking-widest uppercase">Knowledge Check</span>
          <span className="bg-neutral-800 text-neutral-300 px-3 py-1 rounded-full text-sm font-medium">
            Question {currentIndex + 1} of {QUIZ_DATA.length}
          </span>
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 leading-snug">
          {currentQ.question}
        </h2>

        <div className="flex flex-col gap-3 mb-8">
          {currentQ.options.map((opt, idx) => {
            const isCorrect = idx === currentQ.correctIndex;
            const isSelected = idx === selectedOption;
            
            let btnClass = "bg-neutral-800/50 border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:border-neutral-600";
            let Icon = null;
            
            if (isAnswered) {
              if (isCorrect) {
                btnClass = "bg-green-900/20 border-green-500/50 text-green-400";
                Icon = <CheckCircle2 className="w-5 h-5 text-green-500" />;
              } else if (isSelected) {
                btnClass = "bg-red-900/20 border-red-500/50 text-red-400";
                Icon = <XCircle className="w-5 h-5 text-red-500" />;
              } else {
                btnClass = "bg-neutral-900 border-neutral-800 text-neutral-600 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswered}
                onClick={() => handleSelect(idx)}
                className={cn(
                  "w-full text-left px-6 py-4 rounded-xl border transition-all font-medium flex items-center justify-between", 
                  btnClass
                )}
              >
                <span>{opt}</span>
                {Icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="bg-blue-950/30 border border-blue-900/50 rounded-xl p-6 mb-8">
            <span className="flex items-center gap-2 text-blue-400 font-bold mb-2 uppercase text-sm tracking-wider">
              Explanation
            </span>
            <p className="text-neutral-300 text-sm md:text-base leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        <div className="flex justify-end border-t border-neutral-800 pt-6">
          <button
            disabled={!isAnswered}
            onClick={handleNext}
            className="flex items-center gap-2 px-6 py-3 bg-white hover:bg-neutral-200 text-black font-bold rounded-lg disabled:opacity-20 disabled:cursor-not-allowed transition-all"
          >
            {currentIndex === QUIZ_DATA.length - 1 ? "View Results" : "Next Question"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}