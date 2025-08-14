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

// Initial glossary terms
export const initialGlossaryTerms: GlossaryTerm[] = [
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
  {
    id: 'liquefaction',
    term: 'Liquefaction Protocols',
    definition: 'Tactical processes for systemic disruption and institutional exposure.',
    category: 'Liberation',
    relatedTerms: ['Peaceful Militance', 'FOIA'],
    expandedContent: 'Liquefaction dissolves rigid institutional structures through transparency demands, legal challenges, and public pressure campaigns.'
  },
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
