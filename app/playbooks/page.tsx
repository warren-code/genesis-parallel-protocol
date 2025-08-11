'use client';

import React, { useState } from 'react';
import InteractivePlaybookViewer from './components/InteractivePlaybookViewer';
import { seventyTwoHourStarterPlaybook } from './data/72-hour-starter';
import { PlaybookProgress } from './types';

export default function PlaybooksPage() {
  const [progress, setProgress] = useState<PlaybookProgress | undefined>(undefined);

  const handleProgressUpdate = (newProgress: PlaybookProgress) => {
    setProgress(newProgress);
    // Here you would typically save to database/API
    localStorage.setItem(`playbook-progress-${newProgress.playbookId}`, JSON.stringify(newProgress));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Emergency Response Playbooks
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Step-by-step guides for critical situations. Follow these playbooks to ensure 
            comprehensive response and coordination during emergencies.
          </p>
        </div>

        <InteractivePlaybookViewer
          playbook={seventyTwoHourStarterPlaybook}
          progress={progress}
          onProgressUpdate={handleProgressUpdate}
        />
      </div>
    </div>
  );
}
