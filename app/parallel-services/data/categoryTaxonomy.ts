import { CategoryTaxonomy } from '../types';

export const categoryTaxonomy: CategoryTaxonomy[] = [
  {
    id: 'legal',
    name: 'Legal Services',
    description: 'Legal representation, advice, and support services',
    icon: '⚖️',
    subcategories: [
      { id: 'criminal-defense', name: 'Criminal Defense', description: 'Defense attorneys for criminal cases' },
      { id: 'civil-rights', name: 'Civil Rights', description: 'Civil rights and constitutional law' },
      { id: 'immigration', name: 'Immigration', description: 'Immigration law and deportation defense' },
      { id: 'family-law', name: 'Family Law', description: 'Custody, divorce, and family matters' },
      { id: 'protest-law', name: 'Protest Law', description: 'First amendment and protest rights' },
      { id: 'bail-hearing', name: 'Bail Hearings', description: 'Bail hearing representation' }
    ],
    keywords: ['lawyer', 'attorney', 'legal aid', 'defense', 'representation'],
    priority: 1
  },
  {
    id: 'medical',
    name: 'Medical Services',
    description: 'Healthcare providers and medical support',
    icon: '🏥',
    subcategories: [
      { id: 'emergency-care', name: 'Emergency Care', description: 'Urgent medical treatment' },
      { id: 'street-medic', name: 'Street Medics', description: 'Protest and event medical support' },
      { id: 'clinic', name: 'Community Clinics', description: 'Affordable healthcare clinics' },
      { id: 'specialist', name: 'Specialists', description: 'Specialized medical care' },
      { id: 'pharmacy', name: 'Pharmacy', description: 'Medication and prescriptions' }
    ],
    keywords: ['doctor', 'medical', 'health', 'clinic', 'emergency'],
    priority: 2
  },
  {
    id: 'mental-health',
    name: 'Mental Health',
    description: 'Mental health support and counseling services',
    icon: '🧠',
    subcategories: [
      { id: 'crisis-counseling', name: 'Crisis Counseling', description: 'Immediate mental health support' },
      { id: 'therapy', name: 'Therapy', description: 'Individual and group therapy' },
      { id: 'trauma-support', name: 'Trauma Support', description: 'Specialized trauma counseling' },
      { id: 'peer-support', name: 'Peer Support', description: 'Peer-led support groups' },
      { id: 'substance-abuse', name: 'Substance Abuse', description: 'Addiction and recovery services' }
    ],
    keywords: ['counseling', 'therapy', 'mental health', 'crisis', 'support'],
    priority: 3
  },
  {
    id: 'bail-bond',
    name: 'Bail & Bond Services',
    description: 'Bail bonds and financial assistance for legal matters',
    icon: '💰',
    subcategories: [
      { id: 'bail-bonds', name: 'Bail Bondsmen', description: 'Licensed bail bond services' },
      { id: 'bail-funds', name: 'Bail Funds', description: 'Community bail fund organizations' },
      { id: 'payment-plans', name: 'Payment Plans', description: 'Flexible payment arrangements' },
      { id: 'emergency-funds', name: 'Emergency Funds', description: 'Rapid response financial assistance' }
    ],
    keywords: ['bail', 'bond', 'release', 'funds', 'financial'],
    priority: 4
  },
  {
    id: 'security',
    name: 'Security Services',
    description: 'Personal and event security services',
    icon: '🛡️',
    subcategories: [
      { id: 'personal-security', name: 'Personal Security', description: 'Individual protection services' },
      { id: 'event-security', name: 'Event Security', description: 'Event and venue security' },
      { id: 'digital-security', name: 'Digital Security', description: 'Cybersecurity and privacy' },
      { id: 'safe-houses', name: 'Safe Houses', description: 'Temporary secure locations' },
      { id: 'escort-services', name: 'Safety Escorts', description: 'Safe transportation and escorts' }
    ],
    keywords: ['security', 'protection', 'safety', 'guard', 'escort'],
    priority: 5
  },
  {
    id: 'media',
    name: 'Media Services',
    description: 'Press, documentation, and media support',
    icon: '📹',
    subcategories: [
      { id: 'legal-observers', name: 'Legal Observers', description: 'Trained legal observation' },
      { id: 'videographers', name: 'Videographers', description: 'Video documentation services' },
      { id: 'journalists', name: 'Journalists', description: 'Independent press coverage' },
      { id: 'live-streaming', name: 'Live Streaming', description: 'Real-time broadcast services' },
      { id: 'media-training', name: 'Media Training', description: 'Communication and PR training' }
    ],
    keywords: ['media', 'press', 'documentation', 'video', 'journalist'],
    priority: 6
  },
  {
    id: 'technology',
    name: 'Technology Services',
    description: 'Technical support and digital services',
    icon: '💻',
    subcategories: [
      { id: 'communications', name: 'Secure Communications', description: 'Encrypted communication tools' },
      { id: 'data-recovery', name: 'Data Recovery', description: 'Device and data recovery' },
      { id: 'app-development', name: 'App Development', description: 'Custom application development' },
      { id: 'it-support', name: 'IT Support', description: 'Technical troubleshooting' },
      { id: 'digital-forensics', name: 'Digital Forensics', description: 'Evidence preservation' }
    ],
    keywords: ['tech', 'IT', 'computer', 'digital', 'software'],
    priority: 7
  },
  {
    id: 'education',
    name: 'Education & Training',
    description: 'Educational resources and training programs',
    icon: '📚',
    subcategories: [
      { id: 'know-your-rights', name: 'Know Your Rights', description: 'Legal rights education' },
      { id: 'de-escalation', name: 'De-escalation', description: 'Conflict resolution training' },
      { id: 'first-aid', name: 'First Aid', description: 'Medical training' },
      { id: 'organizing', name: 'Organizing', description: 'Community organizing skills' },
      { id: 'workshops', name: 'Workshops', description: 'Various skill workshops' }
    ],
    keywords: ['training', 'education', 'workshop', 'teach', 'learn'],
    priority: 8
  },
  {
    id: 'housing',
    name: 'Housing Services',
    description: 'Temporary and permanent housing assistance',
    icon: '🏠',
    subcategories: [
      { id: 'emergency-shelter', name: 'Emergency Shelter', description: 'Immediate housing needs' },
      { id: 'transitional-housing', name: 'Transitional Housing', description: 'Short-term housing' },
      { id: 'housing-advocacy', name: 'Housing Advocacy', description: 'Tenant rights and advocacy' },
      { id: 'relocation', name: 'Relocation Services', description: 'Moving and relocation help' }
    ],
    keywords: ['housing', 'shelter', 'home', 'accommodation', 'rent'],
    priority: 9
  },
  {
    id: 'financial',
    name: 'Financial Services',
    description: 'Financial assistance and advisory services',
    icon: '💳',
    subcategories: [
      { id: 'emergency-funds', name: 'Emergency Funds', description: 'Immediate financial help' },
      { id: 'legal-funds', name: 'Legal Defense Funds', description: 'Financial support for legal fees' },
      { id: 'crowdfunding', name: 'Crowdfunding', description: 'Fundraising platforms' },
      { id: 'financial-planning', name: 'Financial Planning', description: 'Budget and financial advice' }
    ],
    keywords: ['money', 'funds', 'financial', 'assistance', 'support'],
    priority: 10
  },
  {
    id: 'logistics',
    name: 'Logistics & Transport',
    description: 'Transportation and logistical support',
    icon: '🚐',
    subcategories: [
      { id: 'transport', name: 'Transportation', description: 'Vehicle and transport services' },
      { id: 'supplies', name: 'Supply Distribution', description: 'Equipment and supply logistics' },
      { id: 'coordination', name: 'Event Coordination', description: 'Logistical planning' },
      { id: 'jail-support', name: 'Jail Support', description: 'Transportation from detention' }
    ],
    keywords: ['transport', 'logistics', 'supplies', 'coordination', 'vehicle'],
    priority: 11
  },
  {
    id: 'translation',
    name: 'Translation Services',
    description: 'Language interpretation and translation',
    icon: '🗣️',
    subcategories: [
      { id: 'court-interpreters', name: 'Court Interpreters', description: 'Legal interpretation' },
      { id: 'document-translation', name: 'Document Translation', description: 'Written translation' },
      { id: 'real-time-interpretation', name: 'Live Interpretation', description: 'On-site interpretation' },
      { id: 'sign-language', name: 'Sign Language', description: 'ASL and other sign languages' }
    ],
    keywords: ['translation', 'interpreter', 'language', 'translate', 'bilingual'],
    priority: 12
  },
  {
    id: 'advocacy',
    name: 'Advocacy Groups',
    description: 'Community advocacy and support organizations',
    icon: '✊',
    subcategories: [
      { id: 'civil-rights-orgs', name: 'Civil Rights Organizations', description: 'Rights advocacy groups' },
      { id: 'community-groups', name: 'Community Groups', description: 'Local community organizations' },
      { id: 'policy-advocacy', name: 'Policy Advocacy', description: 'Policy reform organizations' },
      { id: 'mutual-aid', name: 'Mutual Aid', description: 'Community mutual aid networks' }
    ],
    keywords: ['advocacy', 'organization', 'community', 'support', 'rights'],
    priority: 13
  },
  {
    id: 'emergency',
    name: 'Emergency Services',
    description: '24/7 emergency response services',
    icon: '🚨',
    subcategories: [
      { id: 'hotlines', name: 'Crisis Hotlines', description: '24/7 support hotlines' },
      { id: 'rapid-response', name: 'Rapid Response Teams', description: 'Emergency response teams' },
      { id: 'emergency-contacts', name: 'Emergency Contacts', description: 'Critical contact information' },
      { id: 'safe-spaces', name: 'Safe Spaces', description: 'Emergency safe locations' }
    ],
    keywords: ['emergency', 'crisis', 'urgent', '24/7', 'hotline'],
    priority: 1
  },
  {
    id: 'other',
    name: 'Other Services',
    description: 'Miscellaneous support services',
    icon: '🔧',
    subcategories: [
      { id: 'childcare', name: 'Childcare', description: 'Childcare services' },
      { id: 'pet-care', name: 'Pet Care', description: 'Animal care services' },
      { id: 'food-services', name: 'Food Services', description: 'Meal provision' },
      { id: 'general-support', name: 'General Support', description: 'Various support services' }
    ],
    keywords: ['other', 'miscellaneous', 'support', 'help', 'services'],
    priority: 15
  }
];
