'use client';

import React from 'react';
import { PlaybookPhase } from '../types';

interface PhaseNavigationProps {
  phases: PlaybookPhase[];
  currentPhaseIndex: number;
  completedSteps: Set<string>;
  onPhaseSelect: (index: number) => void;
}

const PhaseNavigation: React.FC<PhaseNavigationProps> = ({
  phases,
  currentPhaseIndex,
  completedSteps,
  onPhaseSelect
}) => {
  const calculatePhaseProgress = (phase: PlaybookPhase) => {
    const phaseStepIds = phase.steps.map(step => step.id);
    const completedPhaseSteps = phaseStepIds.filter(id => completedSteps.has(id)).length;
    return Math.round((completedPhaseSteps / phase.steps.length) * 100);
  };

  return (
    <div className="phase-navigation bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center justify-between space-x-4 overflow-x-auto">
        {phases.map((phase, index) => {
          const progress = calculatePhaseProgress(phase);
          const isActive = index === currentPhaseIndex;
          const isComplete = progress === 100;

          return (
            <button
              key={phase.id}
              onClick={() => onPhaseSelect(index)}
              className={`phase-item flex-1 min-w-[200px] p-4 rounded-lg transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : isComplete
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-sm">Phase {index + 1}</span>
                {isComplete && (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <h4 className="font-medium text-left mb-1">{phase.name}</h4>
              <p className="text-xs opacity-80 text-left">{phase.timeframe}</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 bg-opacity-50 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isActive ? 'bg-white' : isComplete ? 'bg-green-600' : 'bg-blue-500'
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs mt-1 opacity-80">{progress}% complete</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PhaseNavigation;
