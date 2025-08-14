import React from 'react';
import { PlaybookPhase } from '../types';

interface ResourceChecklistProps {
  phase: PlaybookPhase;
}

const ResourceChecklist: React.FC<ResourceChecklistProps> = ({ phase }) => {
  return (
    <div>
      <h2>Resource Checklist for {phase.name}</h2>
      <ul>
      {phase.steps.map(step => (
        step.resources.map(resource => (
          <li key={resource.id}>
            {resource.name} - {resource.completed ? 'Completed' : 'Pending'}
          </li>
        ))
      ))}
      </ul>
    </div>
  );
};

export default ResourceChecklist;
