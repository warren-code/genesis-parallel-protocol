export interface PlaybookResource {
  id: string;
  name: string;
  type: 'document' | 'template' | 'checklist' | 'contact' | 'link' | 'tool';
  url?: string;
  description?: string;
  required: boolean;
  completed?: boolean;
}

export interface PlaybookStep {
  id: string;
  title: string;
  description: string;
  duration: string; // e.g., "30 minutes", "2 hours"
  priority: 'critical' | 'high' | 'medium' | 'low';
  resources: PlaybookResource[];
  substeps?: string[];
  warningNotes?: string[];
  tips?: string[];
  completed?: boolean;
  completedAt?: Date;
  notes?: string;
}

export interface PlaybookPhase {
  id: string;
  name: string;
  description: string;
  timeframe: string; // e.g., "0-6 hours", "6-24 hours", "24-72 hours"
  steps: PlaybookStep[];
  completionPercentage?: number;
}

export interface Playbook {
  id: string;
  title: string;
  description: string;
  category: 'crisis' | 'legal' | 'security' | 'organizing' | 'wellness' | 'communications';
  icon?: string;
  totalDuration: string;
  lastUpdated: Date;
  version: string;
  phases: PlaybookPhase[];
  overview?: string;
  prerequisites?: string[];
  outcomes?: string[];
  relatedPlaybooks?: string[];
  tags?: string[];
}

export interface PlaybookProgress {
  playbookId: string;
  userId: string;
  startedAt: Date;
  lastAccessedAt: Date;
  completedSteps: string[]; // Array of step IDs
  notes: { [stepId: string]: string };
  overallProgress: number; // 0-100
  currentPhaseId?: string;
  completed?: boolean;
  completedAt?: Date;
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  description?: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
}

export interface ResourceChecklist {
  id: string;
  title: string;
  description: string;
  items: ChecklistItem[];
  category: string;
}

export interface PlaybookPrintData {
  playbook: Playbook;
  progress?: PlaybookProgress;
  includeNotes: boolean;
  includeResources: boolean;
  includeChecklists: boolean;
  generatedAt: Date;
}
