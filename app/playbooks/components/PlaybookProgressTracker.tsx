import React from 'react';
import { PlaybookProgress } from '../types';

interface PlaybookProgressTrackerProps {
  progress: PlaybookProgress;
}

const PlaybookProgressTracker: React.FC<PlaybookProgressTrackerProps> = ({ progress }) => {
  return (
    <div>
      <h2>Progress Tracker</h2>
      <p>Overall Progress: {progress.overallProgress}%</p>
      <div>
        {progress.completedSteps.map(stepId => (
          <p key={stepId}>Step {stepId} completed</p>
        ))}
      </div>
    </div>
  );
};

export default PlaybookProgressTracker;
