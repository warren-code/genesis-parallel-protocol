'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Playbook, PlaybookPhase, PlaybookStep, PlaybookProgress } from '../types';
import StepDetails from './StepDetails';
import ProgressBar from './ProgressBar';
import PhaseNavigation from './PhaseNavigation';

interface InteractivePlaybookViewerProps {
  playbook: Playbook;
  progress?: PlaybookProgress;
  onProgressUpdate?: (progress: PlaybookProgress) => void;
}

const InteractivePlaybookViewer: React.FC<InteractivePlaybookViewerProps> = ({
  playbook,
  progress,
  onProgressUpdate
}) => {
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(
    new Set(progress?.completedSteps || [])
  );
  const [stepNotes, setStepNotes] = useState<{ [stepId: string]: string }>(
    progress?.notes || {}
  );

  const currentPhase = playbook.phases[currentPhaseIndex];
  const currentStep = currentPhase?.steps[currentStepIndex];
  const totalSteps = playbook.phases.reduce((acc, phase) => acc + phase.steps.length, 0);
  const completedStepsCount = completedSteps.size;
  const overallProgress = Math.round((completedStepsCount / totalSteps) * 100);

  useEffect(() => {
    if (progress?.currentPhaseId) {
      const phaseIndex = playbook.phases.findIndex(p => p.id === progress.currentPhaseId);
      if (phaseIndex !== -1) {
        setCurrentPhaseIndex(phaseIndex);
      }
    }
  }, [progress, playbook.phases]);

  const handleStepComplete = (stepId: string) => {
    const newCompletedSteps = new Set(completedSteps);
    if (completedSteps.has(stepId)) {
      newCompletedSteps.delete(stepId);
    } else {
      newCompletedSteps.add(stepId);
    }
    setCompletedSteps(newCompletedSteps);

    if (onProgressUpdate) {
      const updatedProgress: PlaybookProgress = {
        playbookId: playbook.id,
        userId: progress?.userId || 'current-user',
        startedAt: progress?.startedAt || new Date(),
        lastAccessedAt: new Date(),
        completedSteps: Array.from(newCompletedSteps),
        notes: stepNotes,
        overallProgress: Math.round((newCompletedSteps.size / totalSteps) * 100),
        currentPhaseId: currentPhase.id,
        completed: newCompletedSteps.size === totalSteps,
        completedAt: newCompletedSteps.size === totalSteps ? new Date() : undefined
      };
      onProgressUpdate(updatedProgress);
    }
  };

  const handleNoteUpdate = (stepId: string, note: string) => {
    const newNotes = { ...stepNotes, [stepId]: note };
    setStepNotes(newNotes);
  };

  const navigateToStep = (phaseIndex: number, stepIndex: number) => {
    setCurrentPhaseIndex(phaseIndex);
    setCurrentStepIndex(stepIndex);
  };

  const goToNextStep = () => {
    if (currentStepIndex < currentPhase.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else if (currentPhaseIndex < playbook.phases.length - 1) {
      setCurrentPhaseIndex(currentPhaseIndex + 1);
      setCurrentStepIndex(0);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    } else if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(currentPhaseIndex - 1);
      const previousPhase = playbook.phases[currentPhaseIndex - 1];
      setCurrentStepIndex(previousPhase.steps.length - 1);
    }
  };

  return (
    <div className="interactive-playbook-viewer">
      {/* Header with Title and Progress */}
      <div className="playbook-header bg-gray-800 p-6 rounded-t-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <span className="text-4xl">{playbook.icon}</span>
              {playbook.title}
            </h1>
            <p className="text-gray-300 mt-2">{playbook.description}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-400">Version {playbook.version}</p>
            <p className="text-sm text-gray-400">
              Last updated: {new Date(playbook.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        </div>
        <ProgressBar progress={overallProgress} />
      </div>

      {/* Phase Navigation */}
      <PhaseNavigation
        phases={playbook.phases}
        currentPhaseIndex={currentPhaseIndex}
        completedSteps={completedSteps}
        onPhaseSelect={setCurrentPhaseIndex}
      />

      {/* Main Content Area */}
      <div className="playbook-content bg-white rounded-b-lg p-6">
        <AnimatePresence mode="wait">
          {currentStep && (
            <motion.div
              key={`${currentPhase.id}-${currentStep.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <StepDetails
                step={currentStep}
                phase={currentPhase}
                isCompleted={completedSteps.has(currentStep.id)}
                note={stepNotes[currentStep.id] || ''}
                onComplete={() => handleStepComplete(currentStep.id)}
                onNoteUpdate={(note) => handleNoteUpdate(currentStep.id, note)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Controls */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={goToPreviousStep}
            disabled={currentPhaseIndex === 0 && currentStepIndex === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous Step
          </button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Phase {currentPhaseIndex + 1} of {playbook.phases.length} • 
              Step {currentStepIndex + 1} of {currentPhase.steps.length}
            </p>
          </div>

          <button
            onClick={goToNextStep}
            disabled={
              currentPhaseIndex === playbook.phases.length - 1 &&
              currentStepIndex === currentPhase.steps.length - 1
            }
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next Step →
          </button>
        </div>
      </div>

      <style jsx>{`
        .interactive-playbook-viewer {
          max-width: 1200px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default InteractivePlaybookViewer;
