import React from 'react';
import { Playbook } from '../../types';

interface PlaybookViewerProps {
  playbook: Playbook;
}

const PlaybookViewer: React.FC<PlaybookViewerProps> = ({ playbook }) => {
  return (
    <div>
      <h2>Playbook Overview</h2>
      <p>Title: {playbook.title}</p>
      <div>{playbook.phases.map(phase => (
        <div key={phase.id}>
          <h3>Phase: {phase.name}</h3>
          <p>{phase.description}</p>
        </div>
      ))}</div>
    </div>
  );
};

export default PlaybookViewer;
