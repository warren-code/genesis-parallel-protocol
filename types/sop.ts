export interface SOPTemplate {
  id: string;
  name: string;
  organizationType: 'workplace' | 'school' | 'clinic' | 'faith';
  description: string;
  sections: SOPSection[];
  version: string;
  lastUpdated: Date;
  createdBy: string;
  isPublic: boolean;
  tags: string[];
}

export interface SOPSection {
  id: string;
  title: string;
  order: number;
  content: string;
  steps?: SOPStep[];
  videoUrl?: string;
  imageUrl?: string;
  required: boolean;
}

export interface SOPStep {
  id: string;
  order: number;
  description: string;
  duration?: string;
  materials?: string[];
  warnings?: string[];
  tips?: string[];
}

export interface SOPVersion {
  id: string;
  sopId: string;
  version: string;
  changes: string;
  createdAt: Date;
  createdBy: string;
  content: SOPTemplate;
}

export interface SOPCustomization {
  id: string;
  templateId: string;
  organizationId: string;
  customSections: SOPSection[];
  customFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainingVideo {
  id: string;
  title: string;
  description: string;
  url: string;
  duration: string;
  sopSectionId?: string;
  tags: string[];
}

export interface SOPPoster {
  id: string;
  sopId: string;
  title: string;
  format: 'a4' | 'letter' | 'a3' | 'custom';
  template: 'basic' | 'detailed' | 'emergency' | 'quickref';
  content: {
    header: string;
    sections: Array<{
      title: string;
      items: string[];
    }>;
    footer?: string;
    emergencyContacts?: Array<{
      name: string;
      number: string;
    }>;
  };
}
