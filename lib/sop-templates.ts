import { SOPTemplate } from '@/types/sop';

export const workplaceSOP: SOPTemplate = {
  id: 'workplace-default',
  name: 'Workplace Incident Response SOP',
  organizationType: 'workplace',
  description: 'Standard operating procedures for handling incidents in workplace environments',
  version: '1.0.0',
  lastUpdated: new Date(),
  createdBy: 'system',
  isPublic: true,
  tags: ['workplace', 'safety', 'incident-response'],
  sections: [
    {
      id: 'wp-1',
      title: 'Initial Response',
      order: 1,
      content: 'Immediate actions to take when an incident occurs',
      required: true,
      steps: [
        {
          id: 'wp-1-1',
          order: 1,
          description: 'Ensure your own safety first',
          warnings: ['Do not enter dangerous areas', 'Call 911 if immediate danger exists'],
          tips: ['Stay calm', 'Document everything']
        },
        {
          id: 'wp-1-2',
          order: 2,
          description: 'Alert supervisor or manager immediately',
          duration: '1-2 minutes',
          materials: ['Emergency contact list', 'Phone or radio']
        },
        {
          id: 'wp-1-3',
          order: 3,
          description: 'Secure the area if safe to do so',
          warnings: ['Do not touch evidence', 'Keep unauthorized personnel away']
        }
      ]
    },
    {
      id: 'wp-2',
      title: 'Documentation',
      order: 2,
      content: 'Proper documentation procedures for workplace incidents',
      required: true,
      steps: [
        {
          id: 'wp-2-1',
          order: 1,
          description: 'Fill out incident report form',
          duration: '10-15 minutes',
          materials: ['Incident report form', 'Pen', 'Camera (if applicable)']
        },
        {
          id: 'wp-2-2',
          order: 2,
          description: 'Take photographs if appropriate',
          tips: ['Include wide and close-up shots', 'Document from multiple angles']
        }
      ]
    },
    {
      id: 'wp-3',
      title: 'Follow-up Actions',
      order: 3,
      content: 'Steps to take after initial response',
      required: true,
      steps: [
        {
          id: 'wp-3-1',
          order: 1,
          description: 'Submit report to HR within 24 hours',
          duration: '5 minutes'
        },
        {
          id: 'wp-3-2',
          order: 2,
          description: 'Participate in incident review meeting',
          tips: ['Be prepared to discuss what happened', 'Suggest improvements']
        }
      ]
    }
  ]
};

export const schoolSOP: SOPTemplate = {
  id: 'school-default',
  name: 'School Security Incident SOP',
  organizationType: 'school',
  description: 'Procedures for handling security incidents in educational settings',
  version: '1.0.0',
  lastUpdated: new Date(),
  createdBy: 'system',
  isPublic: true,
  tags: ['school', 'education', 'security', 'safety'],
  sections: [
    {
      id: 'sc-1',
      title: 'Threat Assessment',
      order: 1,
      content: 'Initial evaluation of potential threats',
      required: true,
      steps: [
        {
          id: 'sc-1-1',
          order: 1,
          description: 'Identify the nature of the threat',
          warnings: ['Do not confront suspicious individuals directly'],
          tips: ['Trust your instincts', 'Better safe than sorry']
        },
        {
          id: 'sc-1-2',
          order: 2,
          description: 'Initiate appropriate response protocol',
          materials: ['Emergency response guide', 'Communication device']
        }
      ]
    },
    {
      id: 'sc-2',
      title: 'Lockdown Procedures',
      order: 2,
      content: 'Steps for securing the school during an incident',
      required: true,
      videoUrl: '/training/school-lockdown.mp4',
      steps: [
        {
          id: 'sc-2-1',
          order: 1,
          description: 'Announce lockdown via PA system',
          duration: '30 seconds',
          warnings: ['Use clear, calm voice', 'Repeat announcement twice']
        },
        {
          id: 'sc-2-2',
          order: 2,
          description: 'Teachers secure classrooms',
          tips: ['Lock doors', 'Turn off lights', 'Move students away from windows']
        },
        {
          id: 'sc-2-3',
          order: 3,
          description: 'Account for all students and staff',
          materials: ['Class rosters', 'Emergency attendance sheets']
        }
      ]
    },
    {
      id: 'sc-3',
      title: 'Communication Protocol',
      order: 3,
      content: 'Managing communications during incidents',
      required: true,
      steps: [
        {
          id: 'sc-3-1',
          order: 1,
          description: 'Contact law enforcement',
          duration: '1-2 minutes',
          materials: ['Emergency contact numbers']
        },
        {
          id: 'sc-3-2',
          order: 2,
          description: 'Notify district administration',
          tips: ['Provide clear, factual information', 'Avoid speculation']
        },
        {
          id: 'sc-3-3',
          order: 3,
          description: 'Prepare parent communication',
          warnings: ['Do not release information without approval']
        }
      ]
    }
  ]
};

export const clinicSOP: SOPTemplate = {
  id: 'clinic-default',
  name: 'Medical Facility Security SOP',
  organizationType: 'clinic',
  description: 'Security procedures for healthcare facilities',
  version: '1.0.0',
  lastUpdated: new Date(),
  createdBy: 'system',
  isPublic: true,
  tags: ['healthcare', 'clinic', 'medical', 'security'],
  sections: [
    {
      id: 'cl-1',
      title: 'Patient Safety Protocol',
      order: 1,
      content: 'Ensuring patient safety during security incidents',
      required: true,
      steps: [
        {
          id: 'cl-1-1',
          order: 1,
          description: 'Assess immediate threat to patients',
          warnings: ['Prioritize critical care patients', 'Do not abandon patients'],
          duration: '1-2 minutes'
        },
        {
          id: 'cl-1-2',
          order: 2,
          description: 'Initiate facility security response',
          materials: ['Security alert system', 'Emergency codes reference']
        },
        {
          id: 'cl-1-3',
          order: 3,
          description: 'Secure medication and equipment',
          tips: ['Lock pharmacy', 'Secure controlled substances']
        }
      ]
    },
    {
      id: 'cl-2',
      title: 'Code Gray Response',
      order: 2,
      content: 'Managing combative or threatening individuals',
      required: true,
      videoUrl: '/training/code-gray-response.mp4',
      steps: [
        {
          id: 'cl-2-1',
          order: 1,
          description: 'Call Code Gray and location',
          duration: '30 seconds',
          warnings: ['Stay at safe distance', 'Do not attempt restraint alone']
        },
        {
          id: 'cl-2-2',
          order: 2,
          description: 'Clear area of other patients and visitors',
          tips: ['Direct people to safe areas', 'Close doors to contain situation']
        },
        {
          id: 'cl-2-3',
          order: 3,
          description: 'Document incident thoroughly',
          materials: ['Incident report form', 'Security camera footage request']
        }
      ]
    },
    {
      id: 'cl-3',
      title: 'HIPAA Compliance During Incidents',
      order: 3,
      content: 'Maintaining patient privacy during security events',
      required: true,
      steps: [
        {
          id: 'cl-3-1',
          order: 1,
          description: 'Secure patient records and screens',
          tips: ['Log out of computers', 'Cover physical documents']
        },
        {
          id: 'cl-3-2',
          order: 2,
          description: 'Limit information shared with law enforcement',
          warnings: ['Only share minimum necessary information', 'Document all disclosures']
        }
      ]
    }
  ]
};

export const faithSOP: SOPTemplate = {
  id: 'faith-default',
  name: 'Faith Organization Security SOP',
  organizationType: 'faith',
  description: 'Security procedures for religious institutions',
  version: '1.0.0',
  lastUpdated: new Date(),
  createdBy: 'system',
  isPublic: true,
  tags: ['faith', 'religious', 'worship', 'security'],
  sections: [
    {
      id: 'fa-1',
      title: 'Worship Service Security',
      order: 1,
      content: 'Maintaining safety during services',
      required: true,
      steps: [
        {
          id: 'fa-1-1',
          order: 1,
          description: 'Pre-service security check',
          duration: '15-20 minutes',
          materials: ['Security checklist', 'Communication devices'],
          tips: ['Check all entrances', 'Verify emergency exits are clear']
        },
        {
          id: 'fa-1-2',
          order: 2,
          description: 'Position security team members',
          tips: ['Cover all entrances', 'Maintain visibility', 'Blend with congregation']
        },
        {
          id: 'fa-1-3',
          order: 3,
          description: 'Monitor during service',
          warnings: ['Watch for unusual behavior', 'Note unfamiliar vehicles']
        }
      ]
    },
    {
      id: 'fa-2',
      title: 'Evacuation Procedures',
      order: 2,
      content: 'Safe evacuation of congregation',
      required: true,
      videoUrl: '/training/faith-evacuation.mp4',
      steps: [
        {
          id: 'fa-2-1',
          order: 1,
          description: 'Announce evacuation calmly',
          duration: '30 seconds',
          warnings: ['Avoid causing panic', 'Use predetermined language']
        },
        {
          id: 'fa-2-2',
          order: 2,
          description: 'Direct congregation to exits',
          tips: ['Use all available exits', 'Assist elderly and disabled']
        },
        {
          id: 'fa-2-3',
          order: 3,
          description: 'Account for all members at rally point',
          materials: ['Member lists', 'Emergency contact information']
        }
      ]
    },
    {
      id: 'fa-3',
      title: 'Child Protection Protocol',
      order: 3,
      content: 'Ensuring safety of children during incidents',
      required: true,
      steps: [
        {
          id: 'fa-3-1',
          order: 1,
          description: 'Secure children\'s areas immediately',
          warnings: ['Do not release children without proper authorization'],
          tips: ['Have teachers do headcount', 'Keep children calm']
        },
        {
          id: 'fa-3-2',
          order: 2,
          description: 'Implement parent reunification process',
          materials: ['Child sign-in/out sheets', 'Parent ID verification'],
          duration: '5-10 minutes per child'
        }
      ]
    }
  ]
};

export const defaultTemplates = {
  workplace: workplaceSOP,
  school: schoolSOP,
  clinic: clinicSOP,
  faith: faithSOP
};

export function getTemplateByType(type: 'workplace' | 'school' | 'clinic' | 'faith'): SOPTemplate {
  return defaultTemplates[type];
}
