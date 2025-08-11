import { Playbook } from '../types';

export const seventyTwoHourStarterPlaybook: Playbook = {
  id: '72-hour-starter',
  title: '72-Hour Crisis Response Playbook',
  description: 'Comprehensive guide for the first 72 hours of a crisis situation, including immediate actions, resource mobilization, and community coordination.',
  category: 'crisis',
  icon: '🚨',
  totalDuration: '72 hours',
  lastUpdated: new Date('2025-01-08'),
  version: '1.0.0',
  overview: 'This playbook provides step-by-step guidance for responding to crisis situations in the first critical 72 hours. It covers immediate safety measures, legal protections, communication protocols, and resource mobilization.',
  prerequisites: [
    'Emergency contact list prepared',
    'Basic understanding of your legal rights',
    'Access to communication devices',
    'Emergency fund or financial resources available'
  ],
  outcomes: [
    'Immediate safety and security established',
    'Legal representation secured if needed',
    'Communication channels established',
    'Support network activated',
    'Resources mobilized for ongoing response'
  ],
  tags: ['crisis', 'emergency', 'rapid-response', '72-hour'],
  phases: [
    {
      id: 'phase-1',
      name: 'Immediate Response (0-6 hours)',
      description: 'Critical actions for the first 6 hours focusing on safety, documentation, and initial communications.',
      timeframe: '0-6 hours',
      steps: [
        {
          id: 'step-1-1',
          title: 'Ensure Immediate Safety',
          description: 'Assess and secure physical safety for yourself and others involved.',
          duration: '30 minutes',
          priority: 'critical',
          resources: [
            {
              id: 'res-1-1-1',
              name: 'Safety Assessment Checklist',
              type: 'checklist',
              description: 'Quick evaluation of immediate threats and safety needs',
              required: true
            },
            {
              id: 'res-1-1-2',
              name: 'Emergency Services Contact',
              type: 'contact',
              description: '911 or local emergency services',
              required: true
            }
          ],
          substeps: [
            'Move to a safe location if in immediate danger',
            'Account for all persons involved',
            'Contact emergency services if needed',
            'Document any injuries or immediate threats'
          ],
          warningNotes: [
            'Do not return to unsafe locations',
            'Prioritize physical safety over property'
          ],
          tips: [
            'Keep your phone charged and accessible',
            'Stay with trusted individuals if possible'
          ]
        },
        {
          id: 'step-1-2',
          title: 'Document Everything',
          description: 'Begin comprehensive documentation of the incident and all related information.',
          duration: '1 hour',
          priority: 'critical',
          resources: [
            {
              id: 'res-1-2-1',
              name: 'Incident Documentation Template',
              type: 'template',
              description: 'Structured format for recording incident details',
              required: true
            },
            {
              id: 'res-1-2-2',
              name: 'Evidence Collection Guide',
              type: 'document',
              description: 'Best practices for preserving evidence',
              required: true
            }
          ],
          substeps: [
            'Write down timeline of events while fresh in memory',
            'Take photos/videos of relevant evidence',
            'Collect contact information of witnesses',
            'Save all relevant communications',
            'Create backup copies of all documentation'
          ],
          tips: [
            'Use cloud storage for backup',
            'Time-stamp all documentation',
            'Be factual and detailed in descriptions'
          ]
        },
        {
          id: 'step-1-3',
          title: 'Activate Legal Support',
          description: 'Contact legal representation and understand your rights.',
          duration: '1 hour',
          priority: 'high',
          resources: [
            {
              id: 'res-1-3-1',
              name: 'Legal Hotline Numbers',
              type: 'contact',
              description: '24/7 legal support hotlines',
              required: true
            },
            {
              id: 'res-1-3-2',
              name: 'Know Your Rights Card',
              type: 'document',
              description: 'Quick reference for legal rights',
              required: true
            },
            {
              id: 'res-1-3-3',
              name: 'Attorney Contact List',
              type: 'contact',
              description: 'Pre-vetted legal representatives',
              required: false
            }
          ],
          substeps: [
            'Contact legal hotline or attorney',
            'Do not make statements without legal advice',
            'Request legal representation if detained',
            'Document all legal interactions'
          ],
          warningNotes: [
            'You have the right to remain silent',
            'You have the right to an attorney',
            'Do not sign anything without legal review'
          ]
        },
        {
          id: 'step-1-4',
          title: 'Secure Communications',
          description: 'Establish secure communication channels and inform key contacts.',
          duration: '45 minutes',
          priority: 'high',
          resources: [
            {
              id: 'res-1-4-1',
              name: 'Secure Messaging Apps',
              type: 'tool',
              description: 'Signal, encrypted email services',
              required: true
            },
            {
              id: 'res-1-4-2',
              name: 'Emergency Contact Tree',
              type: 'template',
              description: 'Structured communication plan',
              required: true
            }
          ],
          substeps: [
            'Switch to encrypted communication methods',
            'Inform immediate family/emergency contacts',
            'Designate a point person for communications',
            'Create communication schedule/check-ins'
          ],
          tips: [
            'Keep messages factual and brief',
            'Avoid social media initially',
            'Use code words if pre-established'
          ]
        }
      ]
    },
    {
      id: 'phase-2',
      name: 'Stabilization (6-24 hours)',
      description: 'Focus on stabilizing the situation, expanding support network, and planning next steps.',
      timeframe: '6-24 hours',
      steps: [
        {
          id: 'step-2-1',
          title: 'Expand Support Network',
          description: 'Activate broader support network and coordinate resources.',
          duration: '2 hours',
          priority: 'high',
          resources: [
            {
              id: 'res-2-1-1',
              name: 'Community Support Directory',
              type: 'document',
              description: 'List of community organizations and resources',
              required: true
            },
            {
              id: 'res-2-1-2',
              name: 'Mutual Aid Network Contacts',
              type: 'contact',
              description: 'Local mutual aid coordinators',
              required: false
            }
          ],
          substeps: [
            'Contact community support organizations',
            'Coordinate with mutual aid networks',
            'Assign roles to support team members',
            'Create shared resource document'
          ]
        },
        {
          id: 'step-2-2',
          title: 'Media and Public Communications',
          description: 'Develop media strategy and manage public communications.',
          duration: '3 hours',
          priority: 'medium',
          resources: [
            {
              id: 'res-2-2-1',
              name: 'Media Statement Template',
              type: 'template',
              description: 'Framework for public statements',
              required: true
            },
            {
              id: 'res-2-2-2',
              name: 'Social Media Guidelines',
              type: 'document',
              description: 'Best practices for crisis communications',
              required: true
            }
          ],
          substeps: [
            'Designate official spokesperson',
            'Prepare initial statement if needed',
            'Monitor social media and news',
            'Coordinate with legal team on messaging'
          ],
          warningNotes: [
            'All statements should be reviewed by legal counsel',
            'Avoid speculation or unverified information'
          ]
        },
        {
          id: 'step-2-3',
          title: 'Resource Assessment and Planning',
          description: 'Evaluate available resources and plan for ongoing needs.',
          duration: '2 hours',
          priority: 'high',
          resources: [
            {
              id: 'res-2-3-1',
              name: 'Resource Inventory Checklist',
              type: 'checklist',
              description: 'Comprehensive list of needed resources',
              required: true
            },
            {
              id: 'res-2-3-2',
              name: 'Emergency Fund Guidelines',
              type: 'document',
              description: 'Managing financial resources in crisis',
              required: false
            }
          ],
          substeps: [
            'Inventory available financial resources',
            'Identify immediate resource needs',
            'Create resource allocation plan',
            'Set up donation/support infrastructure if needed'
          ]
        }
      ]
    },
    {
      id: 'phase-3',
      name: 'Sustained Response (24-72 hours)',
      description: 'Maintain momentum, address ongoing needs, and prepare for long-term response.',
      timeframe: '24-72 hours',
      steps: [
        {
          id: 'step-3-1',
          title: 'Health and Wellness Check',
          description: 'Ensure physical and mental health needs are being addressed.',
          duration: '2 hours',
          priority: 'high',
          resources: [
            {
              id: 'res-3-1-1',
              name: 'Crisis Counseling Resources',
              type: 'contact',
              description: 'Mental health support services',
              required: true
            },
            {
              id: 'res-3-1-2',
              name: 'Self-Care Checklist',
              type: 'checklist',
              description: 'Essential self-care during crisis',
              required: true
            }
          ],
          substeps: [
            'Schedule mental health check-ins',
            'Ensure basic needs are met (food, rest, medication)',
            'Rotate support team to prevent burnout',
            'Document any health concerns'
          ]
        },
        {
          id: 'step-3-2',
          title: 'Legal Strategy Development',
          description: 'Work with legal team to develop comprehensive legal strategy.',
          duration: '4 hours',
          priority: 'high',
          resources: [
            {
              id: 'res-3-2-1',
              name: 'Legal Strategy Worksheet',
              type: 'template',
              description: 'Framework for legal planning',
              required: true
            },
            {
              id: 'res-3-2-2',
              name: 'Court Preparation Guide',
              type: 'document',
              description: 'Preparing for legal proceedings',
              required: false
            }
          ],
          substeps: [
            'Review all documentation with legal team',
            'Identify legal options and strategies',
            'Prepare for potential court appearances',
            'File necessary legal documents'
          ]
        },
        {
          id: 'step-3-3',
          title: 'Long-term Planning',
          description: 'Begin planning for sustained response beyond 72 hours.',
          duration: '3 hours',
          priority: 'medium',
          resources: [
            {
              id: 'res-3-3-1',
              name: 'Long-term Response Plan Template',
              type: 'template',
              description: 'Framework for extended crisis response',
              required: true
            },
            {
              id: 'res-3-3-2',
              name: 'Sustainability Checklist',
              type: 'checklist',
              description: 'Ensuring sustainable support systems',
              required: true
            }
          ],
          substeps: [
            'Assess likely duration of crisis',
            'Develop rotating support schedule',
            'Identify long-term resource needs',
            'Create transition plan for ongoing response'
          ]
        }
      ]
    }
  ]
};
