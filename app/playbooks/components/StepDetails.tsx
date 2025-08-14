'use client';

import React, { useState } from 'react';
import { PlaybookStep, PlaybookPhase } from '../types';
import ResourceList from './ResourceList';
import ChecklistItem from './ChecklistItem';

interface StepDetailsProps {
  step: PlaybookStep;
  phase: PlaybookPhase;
  isCompleted: boolean;
  note: string;
  onComplete: () => void;
  onNoteUpdate: (note: string) => void;
}

const StepDetails: React.FC<StepDetailsProps> = ({
  step,
  phase,
  isCompleted,
  note,
  onComplete,
  onNoteUpdate
}) => {
  const [isNoteExpanded, setIsNoteExpanded] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'text-red-600 bg-red-100 border-red-300';
      case 'high':
        return 'text-orange-600 bg-orange-100 border-orange-300';
      case 'medium':
        return 'text-yellow-600 bg-yellow-100 border-yellow-300';
      case 'low':
        return 'text-green-600 bg-green-100 border-green-300';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  return (
    <div className="step-details">
      {/* Step Header */}
      <div className="step-header mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{step.title}</h2>
              <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getPriorityColor(step.priority)}`}>
                {step.priority.charAt(0).toUpperCase() + step.priority.slice(1)} Priority
              </span>
            </div>
            <p className="text-gray-600">{step.description}</p>
            <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Estimated time: {step.duration}
              </span>
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Phase: {phase.name}
              </span>
            </div>
          </div>
          <button
            onClick={onComplete}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              isCompleted
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {isCompleted ? '✓ Completed' : 'Mark Complete'}
          </button>
        </div>
      </div>

      {/* Warning Notes */}
      {step.warningNotes && step.warningNotes.length > 0 && (
        <div className="warning-notes mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Important Warnings
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {step.warningNotes.map((warning, index) => (
              <li key={index} className="text-red-700">{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Sub-steps */}
      {step.substeps && step.substeps.length > 0 && (
        <div className="substeps mb-6">
          <h3 className="font-semibold text-gray-900 mb-3">Action Steps:</h3>
          <div className="space-y-2">
            {step.substeps.map((substep, index) => (
              <ChecklistItem
                key={index}
                id={`substep-${index}`}
                label={substep}
                checked={false}
                onChange={() => {}}
              />
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      {step.tips && step.tips.length > 0 && (
        <div className="tips mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Helpful Tips
          </h3>
          <ul className="list-disc list-inside space-y-1">
            {step.tips.map((tip, index) => (
              <li key={index} className="text-blue-700">{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Resources */}
      <div className="resources mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Resources:</h3>
        <ResourceList resources={step.resources} />
      </div>

      {/* Notes Section */}
      <div className="notes-section">
        <button
          onClick={() => setIsNoteExpanded(!isNoteExpanded)}
          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <span className="font-medium text-gray-700">Personal Notes</span>
          <svg
            className={`w-5 h-5 text-gray-500 transform transition-transform ${isNoteExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {isNoteExpanded && (
          <div className="mt-3">
            <textarea
              value={note}
              onChange={(e) => onNoteUpdate(e.target.value)}
              placeholder="Add your notes for this step..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default StepDetails;
