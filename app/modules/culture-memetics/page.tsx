'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaMusic, FaLink, FaExclamationTriangle, FaCheckCircle,
  FaPlay, FaPause, FaExternalLinkAlt, FaDownload,
  FaBroadcastTower, FaCode, FaUsers, FaCopy,
  FaChartLine, FaTools, FaRocket, FaQrcode, FaHeadphones
} from 'react-icons/fa';

const CultureMemeticsPage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const operationalTracks = [
    { 
      title: 'Loop The Loop', 
      type: 'G2 Operational Pattern',
      description: 'Encodes G2 operational patterns (collapse ▷ build ▷ meta ▷ seed)',
      category: 'activation'
    },
    { 
      title: 'Red Leash', 
      type: 'Pure Collapse SCEP',
      description: 'Safe recursive collapse with embedded guardrails',
      category: 'collapse'
    },
    { 
      title: 'Babylon Rentier Meets Co-op Down Descent', 
      type: 'Death Realm Work',
      description: 'Guides through collapse with reconstitution cues',
      category: 'collapse'
    },
    { 
      title: 'Unclenching The White Grasp', 
      type: 'Death Realm Work',
      description: 'Post-collapse reconstitution and stabilization',
      category: 'collapse'
    }
  ];

  const memethicDifferences = [
    {
      aspect: 'Purpose',
      babylon: 'Sedation via dopamine loops',
      genesis: 'Activation via operational code'
    },
    {
      aspect: 'Structure', 
      babylon: 'Shallow repetition for replay',
      genesis: 'Recursive scaffolds for growth'
    },
    {
      aspect: 'Payload',
      babylon: 'Lifestyle branding & compliance',
      genesis: 'SRLs, collapse, rebuild protocols'
    },
    {
      aspect: 'Result',
      babylon: 'Compliant attention harvesting',
      genesis: 'Loop autonomy & parallel capacity'
    }
  ];

  const softCollapseFeatures = [
    'Removes corrupted loops without cognitive whiplash',
    'Lays stabilization fields (breath, posture, focal timing)',
    'Trains loop recognition and diagnosis in daily life',
    'Routes energy from consumption to constructive action'
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                <FaMusic className="text-3xl text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Culture & Memetics
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              In the current cultural/memetic meta, music is largely a carrier for Babylonian code: attention-harvesting hooks, 
              shallow repetition, and emotional saturation that reinforce extractive cycles. Genesis-aligned music flips that axis—each 
              piece is composed as an operational artifact: a <GlossaryTooltip term="Memetic Weapon">memetic weapon</GlossaryTooltip> and 
              earworm loop designed to <strong>activate</strong>.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300">
                Operational Music
              </div>
              <div className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
                Memetic Infrastructure
              </div>
              <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                Cultural Code
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Genesis vs Babylonian Meta */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <FaExclamationTriangle className="text-yellow-500" />
            How Genesis Music Differs from the Meta
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-semibold">Aspect</th>
                  <th className="text-left py-3 px-4 text-red-400 font-semibold">Babylonian Meta</th>
                  <th className="text-left py-3 px-4 text-green-400 font-semibold">Genesis Approach</th>
                </tr>
              </thead>
              <tbody>
                {memethicDifferences.map((diff, index) => (
                  <tr key={diff.aspect} className="border-b border-gray-800/50">
                    <td className="py-4 px-4 font-medium text-white">{diff.aspect}</td>
                    <td className="py-4 px-4 text-red-300">{diff.babylon}</td>
                    <td className="py-4 px-4 text-green-300">{diff.genesis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Operational Track Catalog */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Operational Track Catalog
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {operationalTracks.map((track, index) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphicCard className={`p-6 border-l-4 ${
                track.category === 'activation' 
                  ? 'border-l-green-500 bg-green-500/5' 
                  : 'border-l-purple-500 bg-purple-500/5'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    track.category === 'activation' 
                      ? 'bg-green-500/20 border border-green-500/30' 
                      : 'bg-purple-500/20 border border-purple-500/30'
                  }`}>
                    <FaHeadphones className={`text-xl ${
                      track.category === 'activation' ? 'text-green-400' : 'text-purple-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{track.title}</h4>
                    <p className="text-sm text-gray-400 mb-2">{track.type}</p>
                    <p className="text-sm text-gray-300">{track.description}</p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Soft-Collapse Sequences */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8 border-2 border-blue-500/30">
          <div className="flex items-center gap-3 mb-6">
            <FaBroadcastTower className="text-2xl text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Soft-Collapse Sequences</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            Transitional bridges that remove corrupted loops without cognitive whiplash, 
            laying in stabilization fields for daily life integration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {softCollapseFeatures.map((feature, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <FaCheckCircle className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Featured Music Player & Actions */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Listen & Integrate
          </h2>
          
          <p className="text-gray-300 mb-8">
            This catalog is both art <em>and</em> infrastructure: cultural code that interoperates with 
            governance, economics, and parallel services. Where Babylonian meta rewards starting (dopamine), 
            Genesis music rewards finishing (closure).
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Listen Section */}
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/30">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <FaMusic className="text-purple-400" />
                  Operational Music Catalog
                </h3>
                <p className="text-gray-300 mb-4">
                  Each track aims to close a loop, install a cleaner schema/engine, and route energy to constructive action.
                </p>
                <Link 
                  href="https://on.soundcloud.com/q1jny3W7lkZYRA3H32" 
                  target="_blank"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                >
                  <FaPlay />
                  Listen on SoundCloud
                  <FaExternalLinkAlt className="text-sm" />
                </Link>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/30">
                <h4 className="font-semibold text-green-400 mb-2">Production Microstructure</h4>
                <p className="text-sm text-gray-300">
                  Symbolic layering, timed motif recurrence, counter-rhythmic 'interrupts', 
                  and semantic echo train loop recognition and diagnosis in real-time.
                </p>
              </div>
            </div>

            {/* Action Section */}
            <div className="space-y-4">
              <Link href="/protocols">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2">
                  <FaDownload />
                  Get Protocol Cards
                </button>
              </Link>
              
              <Link href="/dao-governance">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2">
                  <FaUsers />
                  Join DAO & Contribute
                </button>
              </Link>

              <Link href="/modules/loop-economics">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2">
                  <FaRocket />
                  Explore Loop Economics
                </button>
              </Link>

              {/* Quick Actions */}
              <div className="pt-4 space-y-3">
                <button 
                  onClick={() => navigator.clipboard.writeText('Act, not distract')}
                  className="w-full px-4 py-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors flex items-center justify-between group"
                >
                  <span className="text-sm text-gray-300">Copy: "Act, not distract"</span>
                  <FaCopy className="text-gray-500 group-hover:text-primary transition-colors" />
                </button>
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Cultural Interoperability */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GlassmorphicCard className="p-8 border border-accent/30">
          <div className="flex items-center gap-3 mb-6">
            <FaCode className="text-2xl text-accent" />
            <h2 className="text-2xl font-bold text-white">Cultural Interoperability</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
                <FaUsers className="text-2xl text-green-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Governance</h4>
              <p className="text-sm text-gray-400">DAO proposals timed with releases</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <FaChartLine className="text-2xl text-blue-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Economics</h4>
              <p className="text-sm text-gray-400">Tracks action completions over streams</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                <FaTools className="text-2xl text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Parallel Services</h4>
              <p className="text-sm text-gray-400">Community sprints synchronized with drops</p>
            </div>
          </div>

          <div className="mt-8 p-6 bg-gradient-to-br from-accent/10 to-signal/10 rounded-lg border border-accent/30">
            <h3 className="text-lg font-semibold text-white mb-4">Implementation Notes</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                <span>Lyric microstructure carries <GlossaryTooltip term="SRL">SRL</GlossaryTooltip> embedding and collapse routines</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                <span>Arrangements include stabilizers and post-collapse reconstitution cues</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                <span>Metrics track action completed, not engagement time</span>
              </li>
            </ul>
          </div>
        </GlassmorphicCard>
      </motion.section>
    </div>
  );
};

export default CultureMemeticsPage;
