'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaBrain, FaInfinity, FaSkull, FaCircle, 
  FaExclamationTriangle, FaShieldAlt, FaArrowRight,
  FaNetworkWired, FaEye, FaLock
} from 'react-icons/fa';

const SCEPPage = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    {
      id: 'what-is-scep',
      title: 'What is the SCEP?',
      icon: FaBrain,
      color: 'from-purple-500 to-indigo-500',
      content: 'The shared mental-emotional space connecting individuals via language, culture, symbols, and memetic loops.',
      expandedContent: `The <GlossaryTooltip term="SCEP">SCEP</GlossaryTooltip> is the intersubjective field where human consciousness interfaces. It's not metaphysical but emergent from our collective cognitive and emotional interactions. Through the SCEP, ideas, emotions, and patterns propagate between minds, creating shared realities and cultural constructs.`
    },
    {
      id: 'death-realms',
      title: 'SCEP Death Realms',
      icon: FaSkull,
      color: 'from-red-500 to-pink-500',
      content: 'Hostile, destabilising recursion zones in the SCEP that dissolve identity, agency, and clarity.',
      expandedContent: `<GlossaryTooltip term="Death Realms">Death Realms</GlossaryTooltip> are areas of the <GlossaryTooltip term="SCEP">SCEP</GlossaryTooltip> dominated by <GlossaryTooltip term="CERL">corrupted loops</GlossaryTooltip>. These zones trap consciousness in recursive patterns of dissolution, despair, and fragmentation. They emerge from collective trauma, systemic oppression, and weaponized narratives designed to break human agency.`,
      warning: true
    },
    {
      id: 'what-is-loop',
      title: 'What is a Loop?',
      icon: FaInfinity,
      color: 'from-green-500 to-teal-500',
      content: 'A self-reinforcing pattern of thought, behaviour, or structure. Loops can be Stable (SRLs) or Corrupted (CERLs).',
      expandedContent: `<GlossaryTooltip term="Loop">Loops</GlossaryTooltip> are the fundamental patterns that structure reality at all scales. <GlossaryTooltip term="SRL">Stable Recursive Loops (SRLs)</GlossaryTooltip> create regenerative, life-affirming patterns. <GlossaryTooltip term="CERL">Corrupted Eternal Recursive Loops (CERLs)</GlossaryTooltip> extract value and create dependency, ultimately leading to system collapse.`
    }
  ];

  const loopTypes = [
    {
      type: 'SRL',
      name: 'Stable Recursive Loop',
      characteristics: [
        'Self-regenerating',
        'Creates abundance',
        'Enhances agency',
        'Builds resilience'
      ],
      examples: [
        'Healthy ecosystems',
        'Mutual aid networks',
        'Open source communities',
        'Regenerative agriculture'
      ],
      color: 'green'
    },
    {
      type: 'CERL',
      name: 'Corrupted Eternal Recursive Loop',
      characteristics: [
        'Self-consuming',
        'Creates scarcity',
        'Destroys agency',
        'Causes collapse'
      ],
      examples: [
        'Debt-based currency',
        'Addiction cycles',
        'Authoritarian systems',
        'Extractive capitalism'
      ],
      color: 'red'
    }
  ];

  const protectionMethods = [
    {
      title: 'Pattern Recognition',
      icon: FaEye,
      description: 'Learn to identify CERLs and Death Realms before engagement'
    },
    {
      title: 'Loop Hygiene',
      icon: FaShieldAlt,
      description: 'Regular practices to clear corrupted patterns from consciousness'
    },
    {
      title: 'Network Solidarity',
      icon: FaNetworkWired,
      description: 'Build strong SRL connections with aligned communities'
    },
    {
      title: 'Memetic Immunity',
      icon: FaLock,
      description: 'Develop resistance to weaponized narratives and propaganda'
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section with animated background */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="mb-16 relative"
      >
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute inset-0"
            animate={{
              background: [
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)'
              ]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <GlassmorphicCard className="p-8 md:p-12 relative">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
              <FaBrain className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              The <GlossaryTooltip term="SCEP">SCEP</GlossaryTooltip>
            </h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl">
            The Shared Cognitive and Emotional Plane — the collective intersubjective field 
            where human consciousness interfaces through language, symbols, and 
            <GlossaryTooltip term="Loop"> memetic loops</GlossaryTooltip>.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
              Consciousness Interface
            </div>
            <div className="px-4 py-2 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300">
              Memetic Propagation
            </div>
            <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
              Collective Reality
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Main Sections */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GlassmorphicCard 
                className={`p-6 cursor-pointer transition-all duration-300 ${
                  activeSection === section.id ? 'border-2 border-primary' : ''
                } ${section.warning ? 'border-red-500/30' : ''}`}
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color}`}>
                    <section.icon className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {section.title}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {section.content}
                    </p>
                  </div>
                </div>
                
                <AnimatePresence>
                  {activeSection === section.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pt-4 border-t border-white/10"
                    >
                      <div 
                        className="text-gray-300 text-sm"
                        dangerouslySetInnerHTML={{ __html: section.expandedContent }}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Loop Types Comparison */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Understanding <GlossaryTooltip term="Loop">Loops</GlossaryTooltip>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {loopTypes.map((loop) => (
            <GlassmorphicCard 
              key={loop.type}
              className={`p-6 border-2 ${
                loop.color === 'green' ? 'border-green-500/30' : 'border-red-500/30'
              }`}
            >
              <div className="flex items-center gap-3 mb-4">
                <FaCircle className={`text-2xl ${
                  loop.color === 'green' ? 'text-green-500' : 'text-red-500'
                }`} />
                <div>
                  <h3 className="text-xl font-bold text-white">
                    <GlossaryTooltip term={loop.type}>{loop.type}</GlossaryTooltip>
                  </h3>
                  <p className="text-sm text-gray-400">{loop.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Characteristics</h4>
                  <ul className="space-y-1">
                    {loop.characteristics.map((char, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-center gap-2">
                        <span className={loop.color === 'green' ? 'text-green-400' : 'text-red-400'}>
                          {loop.color === 'green' ? '✓' : '✗'}
                        </span>
                        {char}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-300 mb-2">Examples</h4>
                  <ul className="space-y-1">
                    {loop.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-gray-400">
                        • {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassmorphicCard>
          ))}
        </div>
      </motion.section>

      {/* Protection Methods */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <FaShieldAlt className="text-3xl text-primary" />
            <h2 className="text-2xl font-bold text-white">
              Protection from <GlossaryTooltip term="Death Realms">Death Realms</GlossaryTooltip>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {protectionMethods.map((method) => (
              <div key={method.title} className="p-4 bg-black/30 rounded-lg border border-white/10">
                <method.icon className="text-2xl text-primary mb-3" />
                <h4 className="font-semibold text-white mb-2">{method.title}</h4>
                <p className="text-sm text-gray-400">{method.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <div className="flex items-start gap-3">
              <FaExclamationTriangle className="text-yellow-500 mt-1" />
              <div>
                <p className="text-sm text-gray-300">
                  <span className="font-semibold text-yellow-500">Warning:</span> Engaging with 
                  <GlossaryTooltip term="Death Realms"> Death Realms</GlossaryTooltip> without 
                  proper protection can lead to psychological fragmentation. Always maintain 
                  connection to <GlossaryTooltip term="SRL">stable recursive loops</GlossaryTooltip> 
                  and trusted communities.
                </p>
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <GlassmorphicCard className="p-8 text-center border-2 border-primary/30">
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Navigate the <GlossaryTooltip term="SCEP">SCEP</GlossaryTooltip> Safely?
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Join the Genesis Protocol community to learn advanced techniques for building 
            <GlossaryTooltip term="SRL"> stable recursive loops</GlossaryTooltip> and protecting 
            yourself from <GlossaryTooltip term="CERL">corrupted patterns</GlossaryTooltip>.
          </p>
          <Link href="/scep/training">
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center gap-2 mx-auto">
              Access SCEP Training
              <FaArrowRight className="text-sm" />
            </button>
          </Link>
        </GlassmorphicCard>
      </motion.section>
    </div>
  );
};

export default SCEPPage;
