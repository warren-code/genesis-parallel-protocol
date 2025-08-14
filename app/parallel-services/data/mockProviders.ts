import { ServiceProvider } from '../types';

export const mockProviders: ServiceProvider[] = [
  {
    id: '1',
    name: 'Freedom Legal Defense',
    category: 'legal',
    subcategories: ['criminal-defense', 'protest-law', 'civil-rights'],
    description: 'Experienced criminal defense attorneys specializing in protest-related arrests and civil rights violations.',
    services: [
      'Criminal defense representation',
      'Bail hearings',
      'Civil rights litigation',
      'Know Your Rights training',
      'Pro bono consultations'
    ],
    contact: {
      phone: '555-0100',
      email: 'help@freedomlegal.org',
      website: 'https://freedomlegal.org',
      address: '123 Justice Way, Liberty City',
      emergencyContact: '555-0911'
    },
    availability: '24/7',
    languages: ['English', 'Spanish', 'Mandarin'],
    coverage: {
      areas: ['Liberty City', 'Downtown', 'Metro Area'],
      remote: true,
      onsite: true
    },
    pricing: {
      type: 'sliding-scale',
      details: 'Fees based on income, pro bono available for qualifying cases',
      acceptsInsurance: false
    },
    verification: {
      status: 'certified',
      verifiedAt: new Date('2024-01-15'),
      verifiedBy: 'National Lawyers Guild',
      credentials: ['Bar License', 'NLG Certification'],
      licenses: [
        {
          type: 'State Bar',
          number: 'SB123456',
          expiresAt: new Date('2025-12-31')
        }
      ]
    },
    ratings: {
      overall: 4.8,
      totalReviews: 127,
      responsiveness: 4.9,
      professionalism: 4.8,
      effectiveness: 4.7
    },
    specializations: ['First Amendment', 'Police Misconduct', 'Protest Law'],
    experience: {
      yearsInService: 15,
      casesHandled: 500,
      successRate: 85
    },
    metadata: {
      createdAt: new Date('2023-06-01'),
      updatedAt: new Date('2024-12-01'),
      createdBy: 'admin',
      featured: true,
      active: true,
      tags: ['emergency', 'trusted', 'movement-lawyer']
    }
  },
  {
    id: '2',
    name: 'Street Medic Collective',
    category: 'medical',
    subcategories: ['street-medic', 'emergency-care'],
    description: 'Volunteer medics providing emergency medical care at protests and community events.',
    services: [
      'Emergency first aid',
      'Tear gas treatment',
      'Trauma care',
      'Medical supply distribution',
      'First aid training'
    ],
    contact: {
      phone: '555-0200',
      email: 'dispatch@streetmedics.org',
      emergencyContact: '555-0911'
    },
    availability: 'on-demand',
    languages: ['English', 'Spanish', 'ASL'],
    coverage: {
      areas: ['Citywide'],
      remote: false,
      onsite: true
    },
    pricing: {
      type: 'free',
      details: 'All services provided free of charge'
    },
    verification: {
      status: 'verified',
      verifiedAt: new Date('2024-03-20'),
      verifiedBy: 'Community Health Network',
      credentials: ['EMT Certification', 'First Aid Certified']
    },
    ratings: {
      overall: 4.9,
      totalReviews: 89,
      responsiveness: 5.0,
      professionalism: 4.8,
      effectiveness: 4.9
    },
    specializations: ['Protest Medicine', 'Chemical Weapons Exposure', 'Trauma Care'],
    experience: {
      yearsInService: 8,
      casesHandled: 1000
    },
    metadata: {
      createdAt: new Date('2023-07-15'),
      updatedAt: new Date('2024-11-30'),
      createdBy: 'admin',
      featured: true,
      active: true,
      tags: ['emergency', 'volunteer', 'trusted']
    }
  },
  {
    id: '3',
    name: 'Community Bail Fund',
    category: 'bail-bond',
    subcategories: ['bail-funds', 'emergency-funds'],
    description: 'Non-profit organization providing bail assistance for those who cannot afford it.',
    services: [
      'Bail payment assistance',
      'Court date reminders',
      'Transportation to court',
      'Legal referrals'
    ],
    contact: {
      phone: '555-0300',
      email: 'support@communitybailfund.org',
      website: 'https://communitybailfund.org'
    },
    availability: '24/7',
    languages: ['English', 'Spanish', 'French', 'Arabic'],
    coverage: {
      areas: ['County-wide'],
      remote: true,
      onsite: false
    },
    pricing: {
      type: 'free',
      details: 'No cost to recipients, funded by donations'
    },
    verification: {
      status: 'certified',
      verifiedAt: new Date('2024-02-10'),
      verifiedBy: 'National Bail Fund Network',
      credentials: ['501(c)(3) Status', 'NBFN Member']
    },
    ratings: {
      overall: 4.7,
      totalReviews: 234,
      responsiveness: 4.8,
      professionalism: 4.6,
      effectiveness: 4.7
    },
    specializations: ['Protest Arrests', 'Immigration Bonds', 'Youth Cases'],
    experience: {
      yearsInService: 5,
      casesHandled: 800
    },
    metadata: {
      createdAt: new Date('2023-05-20'),
      updatedAt: new Date('2024-12-05'),
      createdBy: 'admin',
      featured: true,
      active: true,
      tags: ['bail', 'nonprofit', 'emergency']
    }
  },
  {
    id: '4',
    name: 'Crisis Counseling Network',
    category: 'mental-health',
    subcategories: ['crisis-counseling', 'trauma-support'],
    description: 'Licensed therapists providing immediate mental health support and trauma counseling.',
    services: [
      '24/7 crisis hotline',
      'Individual counseling',
      'Group therapy sessions',
      'Trauma-informed care',
      'Referral services'
    ],
    contact: {
      phone: '555-0400',
      email: 'help@crisiscounseling.org',
      emergencyContact: '555-HELP'
    },
    availability: '24/7',
    languages: ['English', 'Spanish', 'Mandarin', 'Vietnamese'],
    coverage: {
      areas: ['Regional'],
      remote: true,
      onsite: true
    },
    pricing: {
      type: 'sliding-scale',
      details: 'Based on income, insurance accepted',
      acceptsInsurance: true,
      insuranceTypes: ['Medicaid', 'Medicare', 'Most major providers']
    },
    verification: {
      status: 'certified',
      verifiedAt: new Date('2024-04-01'),
      verifiedBy: 'State Mental Health Board',
      credentials: ['Licensed Clinical Social Workers', 'Board Certified'],
      licenses: [
        {
          type: 'LCSW',
          number: 'MH789012',
          expiresAt: new Date('2025-06-30')
        }
      ]
    },
    ratings: {
      overall: 4.6,
      totalReviews: 156,
      responsiveness: 4.7,
      professionalism: 4.8,
      effectiveness: 4.4
    },
    specializations: ['Trauma', 'PTSD', 'Crisis Intervention', 'Police Violence'],
    experience: {
      yearsInService: 12,
      casesHandled: 3000
    },
    metadata: {
      createdAt: new Date('2023-08-10'),
      updatedAt: new Date('2024-12-02'),
      createdBy: 'admin',
      featured: false,
      active: true,
      tags: ['mental-health', 'crisis', 'trauma']
    }
  },
  {
    id: '5',
    name: 'Secure Communications Hub',
    category: 'technology',
    subcategories: ['communications', 'digital-security'],
    description: 'Digital security experts providing encrypted communication tools and privacy training.',
    services: [
      'Encrypted messaging setup',
      'Device security audits',
      'Digital privacy training',
      'Secure data storage',
      'Emergency comms infrastructure'
    ],
    contact: {
      email: 'secure@commshub.org',
      website: 'https://securecomms.onion'
    },
    availability: 'business-hours',
    languages: ['English', 'Spanish', 'Russian'],
    coverage: {
      areas: ['Global'],
      remote: true,
      onsite: false
    },
    pricing: {
      type: 'free',
      details: 'Open source tools and free training'
    },
    verification: {
      status: 'verified',
      verifiedAt: new Date('2024-05-15'),
      verifiedBy: 'Electronic Frontier Foundation',
      credentials: ['EFF Partner', 'Security Audited']
    },
    ratings: {
      overall: 4.8,
      totalReviews: 67,
      responsiveness: 4.6,
      professionalism: 4.9,
      effectiveness: 4.9
    },
    specializations: ['Encryption', 'OpSec', 'Counter-surveillance', 'Digital Forensics'],
    experience: {
      yearsInService: 6
    },
    metadata: {
      createdAt: new Date('2023-09-01'),
      updatedAt: new Date('2024-11-28'),
      createdBy: 'admin',
      featured: false,
      active: true,
      tags: ['security', 'privacy', 'technology']
    }
  },
  {
    id: '6',
    name: 'Community Translation Services',
    category: 'translation',
    subcategories: ['court-interpreters', 'document-translation', 'real-time-interpretation'],
    description: 'Professional interpreters and translators specializing in legal and crisis situations.',
    services: [
      'Court interpretation',
      'Legal document translation',
      'Real-time event interpretation',
      'Emergency hotline translation',
      'Written translation services'
    ],
    contact: {
      phone: '555-0600',
      email: 'translate@communitylang.org',
      website: 'https://communitylang.org'
    },
    availability: 'on-demand',
    languages: ['English', 'Spanish', 'Mandarin', 'Arabic', 'French', 'Russian', 'Vietnamese', 'Korean'],
    coverage: {
      areas: ['Tri-State Area'],
      remote: true,
      onsite: true
    },
    pricing: {
      type: 'sliding-scale',
      details: 'Rates based on type of service and client income'
    },
    verification: {
      status: 'verified',
      verifiedAt: new Date('2024-06-10'),
      verifiedBy: 'Court Interpreters Association',
      credentials: ['Court Certified', 'ATA Member']
    },
    ratings: {
      overall: 4.7,
      totalReviews: 98,
      responsiveness: 4.8,
      professionalism: 4.9,
      effectiveness: 4.5
    },
    specializations: ['Legal Translation', 'Medical Interpretation', 'Crisis Communication'],
    experience: {
      yearsInService: 10,
      casesHandled: 2500
    },
    metadata: {
      createdAt: new Date('2023-10-15'),
      updatedAt: new Date('2024-11-25'),
      createdBy: 'admin',
      featured: false,
      active: true,
      tags: ['translation', 'multilingual', 'court']
    }
  },
  {
    id: '7',
    name: 'Rapid Response Transport Network',
    category: 'logistics',
    subcategories: ['transport', 'jail-support', 'coordination'],
    description: 'Volunteer drivers providing emergency transportation for activists and those in need.',
    services: [
      'Emergency transportation',
      'Jail release pickup',
      'Court appearance transport',
      'Medical appointment rides',
      'Supply distribution'
    ],
    contact: {
      phone: '555-0700',
      emergencyContact: '555-RIDE'
    },
    availability: '24/7',
    languages: ['English', 'Spanish'],
    coverage: {
      areas: ['Metro Area', 'Suburbs'],
      remote: false,
      onsite: true
    },
    pricing: {
      type: 'free',
      details: 'All transportation provided free of charge'
    },
    verification: {
      status: 'verified',
      verifiedAt: new Date('2024-07-20'),
      verifiedBy: 'Community Safety Network',
      credentials: ['Background Checked', 'Safety Trained']
    },
    ratings: {
      overall: 4.9,
      totalReviews: 167,
      responsiveness: 5.0,
      professionalism: 4.8,
      effectiveness: 4.9
    },
    specializations: ['Emergency Response', 'Jail Support', 'Medical Transport'],
    experience: {
      yearsInService: 4,
      casesHandled: 1200
    },
    metadata: {
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-12-01'),
      createdBy: 'admin',
      featured: true,
      active: true,
      tags: ['transport', 'emergency', 'volunteer']
    }
  },
  {
    id: '8',
    name: 'Know Your Rights Educators',
    category: 'education',
    subcategories: ['know-your-rights', 'workshops', 'organizing'],
    description: 'Legal educators providing community training on civil rights and protest safety.',
    services: [
      'Know Your Rights workshops',
      'Protest safety training',
      'Legal observer training',
      'Community organizer education',
      'Youth rights programs'
    ],
    contact: {
      email: 'education@kyrights.org',
      website: 'https://kyrights.org'
    },
    availability: 'appointment',
    languages: ['English', 'Spanish', 'ASL'],
    coverage: {
      areas: ['Statewide'],
      remote: true,
      onsite: true
    },
    pricing: {
      type: 'free',
      details: 'All educational programs are free'
    },
    verification: {
      status: 'certified',
      verifiedAt: new Date('2024-08-15'),
      verifiedBy: 'National Lawyers Guild',
      credentials: ['NLG Certified Trainer', 'Legal Education License']
    },
    ratings: {
      overall: 4.8,
      totalReviews: 203,
      responsiveness: 4.7,
      professionalism: 4.9,
      effectiveness: 4.8
    },
    specializations: ['Constitutional Rights', 'Protest Law', 'Police Encounters'],
    experience: {
      yearsInService: 7,
      casesHandled: 500
    },
    metadata: {
      createdAt: new Date('2023-11-20'),
      updatedAt: new Date('2024-11-30'),
      createdBy: 'admin',
      featured: true,
      active: true,
      tags: ['education', 'rights', 'training']
    }
  }
];
