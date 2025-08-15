'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface GlossaryTerm {
  id: string;
  term: string;
  definition: string;
  category?: string;
  relatedTerms?: string[];
  expandedContent?: string;
}

interface GlossaryContextType {
  terms: Map<string, GlossaryTerm>;
  searchTerms: (query: string) => GlossaryTerm[];
  getTermDefinition: (term: string) => GlossaryTerm | undefined;
  activeTerm: string | null;
  setActiveTerm: (term: string | null) => void;
  addTerm: (term: GlossaryTerm) => void;
  loadGlossary: (terms: GlossaryTerm[]) => void;
}

const GlossaryContext = createContext<GlossaryContextType | undefined>(undefined);

export const useGlossary = () => {
  const context = useContext(GlossaryContext);
  if (!context) {
    throw new Error('useGlossary must be used within a GlossaryProvider');
  }
  return context;
};

interface GlossaryProviderProps {
  children: ReactNode;
  initialTerms?: GlossaryTerm[];
}

export const GlossaryProvider: React.FC<GlossaryProviderProps> = ({ children, initialTerms = [] }) => {
  const [terms, setTerms] = useState<Map<string, GlossaryTerm>>(
    new Map(initialTerms.map(term => [term.term.toLowerCase(), term]))
  );
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  const searchTerms = useCallback((query: string): GlossaryTerm[] => {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(terms.values()).filter(term =>
      term.term.toLowerCase().includes(lowercaseQuery) ||
      term.definition.toLowerCase().includes(lowercaseQuery) ||
      term.expandedContent?.toLowerCase().includes(lowercaseQuery)
    );
  }, [terms]);

  const getTermDefinition = useCallback((term: string): GlossaryTerm | undefined => {
    return terms.get(term.toLowerCase());
  }, [terms]);

  const addTerm = useCallback((term: GlossaryTerm) => {
    setTerms(prev => new Map(prev).set(term.term.toLowerCase(), term));
  }, []);

  const loadGlossary = useCallback((newTerms: GlossaryTerm[]) => {
    setTerms(new Map(newTerms.map(term => [term.term.toLowerCase(), term])));
  }, []);

  const value: GlossaryContextType = {
    terms,
    searchTerms,
    getTermDefinition,
    activeTerm,
    setActiveTerm,
    addTerm,
    loadGlossary
  };

  return (
    <GlossaryContext.Provider value={value}>
      {children}
    </GlossaryContext.Provider>
  );
};

// Enhanced glossary terms including all protocol modules
export const initialGlossaryTerms: GlossaryTerm[] = [
  // Core SCEP Terms
  {
    id: 'loop',
    term: 'Loop',
    definition: 'A self-reinforcing pattern within thought, culture, or economics.',
    category: 'SCEP',
    relatedTerms: ['SRL', 'CERL'],
    expandedContent: 'Loops are fundamental patterns that exist across cognitive, social, and economic systems. They can be regenerative (SRLs) or extractive (CERLs).'
  },
  {
    id: 'srl',
    term: 'SRL',
    definition: 'Stable Recursive Loop — regenerative, stabilising pattern.',
    category: 'SCEP',
    relatedTerms: ['Loop', 'CERL'],
    expandedContent: 'SRLs create positive feedback cycles that enhance system stability and regeneration without depleting resources.'
  },
  {
    id: 'cerl',
    term: 'CERL',
    definition: 'Corrupted Recursive Loop — extractive, destabilising pattern.',
    category: 'SCEP',
    relatedTerms: ['Loop', 'SRL'],
    expandedContent: 'CERLs are parasitic patterns that extract value from systems, leading to eventual collapse and requiring constant external inputs.'
  },
  {
    id: 'scep',
    term: 'SCEP',
    definition: 'Shared Cognitive and Emotional Plane — the collective mental-emotional space.',
    category: 'SCEP',
    relatedTerms: ['Loop', 'Death Realms'],
    expandedContent: 'The SCEP is the intersubjective field where human consciousness interfaces through language, symbols, and shared meaning structures.'
  },
  {
    id: 'death-realms',
    term: 'Death Realms',
    definition: 'Hostile recursion zones in the SCEP that dissolve identity and agency.',
    category: 'SCEP',
    relatedTerms: ['SCEP', 'CERL'],
    expandedContent: 'Death Realms are areas of the SCEP dominated by destructive loops that trap consciousness in recursive patterns of dissolution and despair.'
  },
  {
    id: 'scep-aware',
    term: 'SCEP-Aware',
    definition: 'Conscious of Shared Cognitive and Emotional Plane implications in operation.',
    category: 'SCEP',
    relatedTerms: ['SCEP', 'Loop'],
    expandedContent: 'SCEP-aware systems are designed with deep understanding of their impact on human consciousness and collective well-being.'
  },

  // Transport Protocol Terms
  {
    id: 'loop-efficient',
    term: 'Loop-Efficient',
    definition: 'System optimised for continuous, non-wasteful cycles.',
    category: 'Transport',
    relatedTerms: ['SRL', 'Circular Resource Flows'],
    expandedContent: 'Loop-efficient transport systems maximize resource utilization while minimizing waste through circular design principles.'
  },
  {
    id: 'infinity-glyph-signalling',
    term: '∞⃝ Glyph Signalling',
    definition: 'Cryptographically secured communication protocol for SCEP-aware transit systems.',
    category: 'Transport',
    relatedTerms: ['SCEP-Aware', 'Quantum Encryption'],
    expandedContent: 'Advanced signalling protocol that combines quantum-resistant encryption with consciousness-aware design principles.'
  },
  {
    id: 'autonomous-routing',
    term: 'Autonomous Routing',
    definition: 'AI-driven pathfinding that optimizes for efficiency, sustainability, and network resilience.',
    category: 'Transport',
    relatedTerms: ['Loop-Efficient', 'Community-Controlled Infrastructure'],
    expandedContent: 'Decentralized routing systems that make intelligent decisions based on multiple objectives including ecological impact and community benefit.'
  },

  // Housing Protocol Terms
  {
    id: 'circular-resource-flows',
    term: 'Circular Resource Flows',
    definition: 'Use, recovery, and reuse of materials without linear waste.',
    category: 'Housing',
    relatedTerms: ['Loop Economy', 'Regenerative Design'],
    expandedContent: 'Closed-loop systems for construction materials, water, and energy that eliminate waste through continuous cycling of resources.'
  },
  {
    id: 'cooperative-ownership',
    term: 'Cooperative Ownership',
    definition: 'Shared equity models that eliminate speculation and ensure housing remains affordable.',
    category: 'Housing',
    relatedTerms: ['Community Land Trust', 'DAO'],
    expandedContent: 'Democratic ownership structures that prioritize housing as a human right over commodity speculation.'
  },
  {
    id: 'community-land-trust',
    term: 'Community Land Trust',
    definition: 'Land owned permanently by community to ensure permanent affordability.',
    category: 'Housing',
    relatedTerms: ['Cooperative Ownership', 'Anti-speculation'],
    expandedContent: 'Legal structure that removes land from speculation while allowing community control over development and access.'
  },

  // Finance Protocol Terms
  {
    id: 'tokenized-loop-economy',
    term: 'Tokenised Loop Economy',
    definition: 'Currency model tied to regenerative cycles.',
    category: 'Finance',
    relatedTerms: ['SRL', 'Regenerative Value Creation'],
    expandedContent: 'Economic system where token issuance and value are tied to regenerative contributions rather than debt or speculation.'
  },
  {
    id: 'inflation-dampening',
    term: 'Inflation Dampening',
    definition: 'Built-in mechanisms that automatically adjust supply and demand to maintain purchasing power stability.',
    category: 'Finance',
    relatedTerms: ['Tokenized Loop Economy', 'Velocity-based Controls'],
    expandedContent: 'Algorithmic monetary controls that prevent destructive inflation while maintaining economic stability.'
  },
  {
    id: 'universal-basic-assets',
    term: 'Universal Basic Assets',
    definition: 'Guaranteed access to essential resources and economic participation for all community members.',
    category: 'Finance',
    relatedTerms: ['Resource Tokens', 'Community Treasury'],
    expandedContent: 'System ensuring everyone has access to housing, food, healthcare, education, and economic participation regardless of market position.'
  },
  {
    id: 'decentralized-escrow',
    term: 'Decentralised Escrow',
    definition: 'Trustless transaction systems for secure peer-to-peer exchanges without intermediaries.',
    category: 'Finance',
    relatedTerms: ['Smart Contracts', 'Community Juries'],
    expandedContent: 'Automated escrow systems using smart contracts and community governance for dispute resolution without centralized authorities.'
  },

  // Technology Protocol Terms
  {
    id: 'loop-collapse-resistance',
    term: 'Loop Collapse Resistance',
    definition: 'Ability to operate without falling into destructive recursion.',
    category: 'Technology',
    relatedTerms: ['CERL', 'Human-in-the-loop'],
    expandedContent: 'Built-in safeguards against destructive recursion patterns that ensure systems enhance rather than diminish human agency.'
  },
  {
    id: 'parallel-governance',
    term: 'Parallel Governance',
    definition: 'Multiple decentralised oversight layers.',
    category: 'Technology',
    relatedTerms: ['DAO', 'Community-Controlled Infrastructure'],
    expandedContent: 'Distributed governance systems with multiple layers of oversight ensuring technology serves community needs and values.'
  },
  {
    id: 'regenerative-metrics',
    term: 'Regenerative Metrics',
    definition: 'Measurements that assess positive impact on social, ecological, and spiritual well-being.',
    category: 'Technology',
    relatedTerms: ['SRL', 'Community Resilience'],
    expandedContent: 'Metrics that evaluate technology based on its contribution to ecological restoration, community health, and human flourishing.'
  },
  {
    id: 'consciousness-aware-computing',
    term: 'Consciousness-Aware Computing',
    definition: 'Technology designed with deep understanding of its impact on human consciousness and well-being.',
    category: 'Technology',
    relatedTerms: ['SCEP', 'Attention-Preserving'],
    expandedContent: 'Computing systems designed with consideration for their effects on human consciousness, attention, and psychological well-being.'
  },

  // Trade Protocol Terms
  {
    id: 'genesis-value-chain-map',
    term: 'Genesis Value Chain Map',
    definition: 'Live visual of supply chain flows across sectors.',
    category: 'Trade',
    relatedTerms: ['Regenerative Standards', 'Transparent Pricing'],
    expandedContent: 'Real-time visualization system that tracks resource flows, environmental impact, and social conditions across entire supply chains.'
  },
  {
    id: 'regenerative-standards',
    term: 'Regenerative Standards',
    definition: 'Economic rules ensuring positive environmental and social impact.',
    category: 'Trade',
    relatedTerms: ['Genesis Value Chain Map', 'True Cost Accounting'],
    expandedContent: 'Automated verification systems that ensure all trade activities contribute to ecological and social regeneration rather than extraction.'
  },
  {
    id: 'true-cost-accounting',
    term: 'True Cost Accounting',
    definition: 'Pricing systems that internalize all environmental and social costs.',
    category: 'Trade',
    relatedTerms: ['Regenerative Standards', 'Democratic Price Discovery'],
    expandedContent: 'Accounting methods that include all environmental and social externalities in pricing, revealing the true cost of production and consumption.'
  },
  {
    id: 'democratic-price-discovery',
    term: 'Democratic Price Discovery',
    definition: 'Community participation in determining fair and just pricing.',
    category: 'Trade',
    relatedTerms: ['True Cost Accounting', 'Producer Cooperatives'],
    expandedContent: 'Pricing mechanisms that involve both producers and consumers in determining fair prices based on true costs and community values.'
  },

  // FOIA Protocol Terms
  {
    id: 'liquefaction-protocols',
    term: 'Liquefaction Protocols',
    definition: 'Tactical method for dismantling oppressive systems via legal, informational, and cultural exposure.',
    category: 'FOIA',
    relatedTerms: ['Babylonian Corruption', 'Radical Transparency'],
    expandedContent: 'Systematic processes for exposing and dismantling networks of extraction through coordinated transparency campaigns and legal action.'
  },
  {
    id: 'babylonian-corruption',
    term: 'Babylonian Corruption',
    definition: 'Systemic abuse of power in extractive legacy structures.',
    category: 'FOIA',
    relatedTerms: ['Liquefaction Protocols', 'Network Disruption'],
    expandedContent: 'Patterns of institutional corruption that extract wealth and resources while externalizing costs to communities and ecosystems.'
  },
  {
    id: 'radical-transparency',
    term: 'Radical Transparency',
    definition: 'Complete openness and accountability in all organizational and governmental operations.',
    category: 'FOIA',
    relatedTerms: ['Liquefaction Protocols', 'Automated Document Discovery'],
    expandedContent: 'Systematic transparency that makes corruption impossible by exposing all processes, decisions, and relationships to public scrutiny.'
  },
  {
    id: 'automated-document-discovery',
    term: 'Automated Document Discovery',
    definition: 'AI-powered systems that identify, catalog, and prioritize documents for strategic FOIA requests.',
    category: 'FOIA',
    relatedTerms: ['Radical Transparency', 'Multi-jurisdictional Requests'],
    expandedContent: 'Machine learning systems that analyze patterns in government documents to identify high-impact information for transparency campaigns.'
  },

  // Governance and Economics Terms
  {
    id: 'loop-economy',
    term: 'Loop Economy',
    definition: 'An economic framework where resources cycle indefinitely without waste or extraction.',
    category: 'Economics',
    relatedTerms: ['SRL', 'Circular Economy'],
    expandedContent: 'The Loop Economy represents a complete paradigm shift from linear extraction-consumption-waste models to regenerative closed-loop systems.'
  },
  {
    id: 'dao',
    term: 'DAO',
    definition: 'Decentralized Autonomous Organization — community-governed entity without central control.',
    category: 'Governance',
    relatedTerms: ['Anti-capture', 'Treasury'],
    expandedContent: 'DAOs enable collective decision-making through blockchain-based voting and transparent treasury management.'
  },
  {
    id: 'anti-capture',
    term: 'Anti-capture',
    definition: 'Mechanisms preventing wealth concentration or governance hijacking in DAOs.',
    category: 'Governance',
    relatedTerms: ['DAO', 'Non-transferable tokens'],
    expandedContent: 'Anti-capture logic includes vote limits, time-locks, and non-transferable governance tokens to prevent plutocracy.'
  },
  {
    id: 'peaceful-militance',
    term: 'Peaceful Militance',
    definition: 'Strategic non-violent resistance using economic, legal, and cultural disruption.',
    category: 'Liberation',
    relatedTerms: ['Liquefaction Protocols', 'Loop Collapse'],
    expandedContent: 'Peaceful militance employs systemic disruption tactics without physical violence to dismantle oppressive structures.'
  },

  // Culture and Memetics Terms
  {
    id: 'operational-art',
    term: 'Operational Art',
    definition: 'Creative work engineered to instantiate concrete, positive actions in the audience.',
    category: 'Culture',
    relatedTerms: ['SRL', 'Memetic Weapon', 'Earworm Loop Programming'],
    expandedContent: 'Unlike entertainment that pacifies, Operational Art activates. Each piece is designed with specific behavioral outcomes: learn, build, organize, contribute, heal. Success is measured by actions completed, not streams consumed.'
  },
  {
    id: 'earworm-loop',
    term: 'Earworm Loop Programming',
    definition: 'Designing melodic+lyric loops to encode a compact, repeatable instruction.',
    category: 'Culture',
    relatedTerms: ['Operational Art', 'SRL'],
    expandedContent: 'Based on cognitive load theory (7±2 chunks), earworm loops embed actionable phrases in memorable hooks. The repetition creates neural pathways that trigger action rather than passive consumption.'
  },
  {
    id: 'memetic-weapon',
    term: 'Memetic Weapon',
    definition: 'A cultural artifact optimized to propagate stabilizing loops and enable action.',
    category: 'Culture',
    relatedTerms: ['Operational Art', 'SRL', 'CERL'],
    expandedContent: 'Not destructive but constructive — memetic weapons counter CERLs by seeding SRLs through art, music, and media. They weaponize virality for regeneration rather than extraction.'
  }
];
