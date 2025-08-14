import React, { useEffect, useState } from 'react';
import { Playbook, PlaybookProgress } from './types';
import PlaybookViewer from './components/PlaybookViewer';
import PlaybookProgressTracker from './components/PlaybookProgressTracker';
import ResourceChecklist from './components/ResourceChecklist';
import PrintablePlaybook from './components/PrintablePlaybook';

interface PlaybookDashboardProps {
  playbookId: string;
}

const PlaybookDashboard: React.FC<PlaybookDashboardProps> = ({ playbookId }) => {
  const [playbook, setPlaybook] = useState<Playbook | null>(null);
  const [progress, setProgress] = useState<PlaybookProgress | null>(null);

  useEffect(() => {
    // Fetch the playbook data from the API or local data source
    const fetchPlaybook = async () => {
      // Replace with actual data fetching logic
      const fetchedPlaybook: Playbook = await fetch(`/api/playbooks/${playbookId}`).then(res => res.json());
      setPlaybook(fetchedPlaybook);
    };

    // Fetch the user's progress
    const fetchProgress = async () => {
      const fetchedProgress: PlaybookProgress = await fetch(`/api/progress/${playbookId}`).then(res => res.json());
      setProgress(fetchedProgress);
    };

    fetchPlaybook();
    fetchProgress();
  }, [playbookId]);

  if (!playbook) return <div>Loading...</div>;

  return (
    <div>
      <h1>{playbook.title}</h1>
      <PlaybookViewer playbook={playbook} />
      {progress && <PlaybookProgressTracker progress={progress} />}
      {playbook.phases.map(phase => (
        <ResourceChecklist key={phase.id} phase={phase} />
      ))}
      {playbook && <PrintablePlaybook playbook={playbook} progress={progress} />}
    </div>
  );
};

export default PlaybookDashboard;

