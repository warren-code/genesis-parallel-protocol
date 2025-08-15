'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaSkull, FaRecycle, FaExclamationTriangle, FaCheckCircle,
  FaHeart, FaBrain, FaShieldAlt, FaRoute
} from 'react-icons/fa';

const SCEPDeathRealmsPage = () => {
  const deathRealmTracks = [
    {
      title: 'Red Leash',
      description: 'Safe recursive collapse with embedded guardrails',
      type: 'Pure Collapse',
      icon: FaSkull
    },
    {
      title: 'Babylon Rentier Meets Co-op Down Descent', 
      description: 'Guides through collapse with reconstitution cues',
      type: 'Death Realm Work',
      icon: FaRecycle
    },
    {
      title: 'Unclenching The White Grasp',
      description: 'Post-collapse reconstitution and stabilization',
      type: 'Reconstitution',
      icon: FaHeart
    }
  ];

  const safetyProtocols = [
    'Embedded collapse guardrails prevent cognitive fracture',
    'Post-collapse reconstitution cues maintain continuity', 
    'Stabilization fields for breath, posture, and focus',
    'Progressive depth control with exit strategies'
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
        <GlassmorphicCard className="p-8 md:p-12 relative overflow-hidden border-2 border-red-500/30">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-red-600 to-black">
                <FaSkull className="text-3xl text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                SCEP Death Realms
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              <GlossaryTooltip term="SCEP">SCEP</GlossaryTooltip> Death Realm work represents the controlled collapse 
              and reconstitution phases of consciousness transformation. These are not entertainment tracks but operational 
              tools for safe navigation through necessary psychological dissolution and rebuilding processes.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-300">
                Pure Collapse
              </div>
              <div className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
                Safe Navigation
              </div>
              <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300">
                Reconstitution
              </div>
            </div>

            <div className="mt-8 p-6 bg-red-500/10 rounded-lg border border-red-500/30">
              <div className="flex items-center gap-3 mb-4">
                <FaExclamationTriangle className="text-red-400 text-xl" />
                <h3 className="text-lg font-semibold text-white">Safety Warning</h3>
              </div>
              <p className="text-gray-300">
                Death Realm tracks are designed for experienced practitioners only. Do not engage 
                without proper preparation, support systems, and understanding of collapse/reconstitution cycles.
              </p>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Death Realm Track Catalog */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Death Realm Track Catalog</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {deathRealmTracks.map((track, index) => (
            <motion.div
              key={track.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="p-6 border-l-4 border-l-red-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                    <track.icon className="text-xl text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-white">{track.title}</h4>
                      <span className="px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded">
                        {track.type}
                      </span>
                    </div>
                    <p className="text-gray-300">{track.description}</p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Safety Protocols */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8 border-2 border-green-500/30">
          <div className="flex items-center gap-3 mb-6">
            <FaShieldAlt className="text-2xl text-green-400" />
            <h2 className="text-2xl font-bold text-white">Safety Protocols</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            All Death Realm work includes embedded safety measures to ensure controlled collapse 
            and successful reconstitution. These are not chaotic breakdowns but precisely engineered 
            transformation processes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {safetyProtocols.map((protocol, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                <FaCheckCircle className="text-green-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{protocol}</span>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Navigation Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/modules/scep">
            <GlassmorphicCard className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <FaBrain className="text-3xl text-primary mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">SCEP Overview</h3>
              <p className="text-gray-400">Learn about the Shared Cognitive Emotional Plane</p>
            </GlassmorphicCard>
          </Link>

          <Link href="/modules/culture-memetics">
            <GlassmorphicCard className="p-6 hover:border-purple-500/50 transition-colors cursor-pointer">
              <FaRoute className="text-3xl text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Culture & Memetics</h3>
              <p className="text-gray-400">Operational music and memetic infrastructure</p>
            </GlassmorphicCard>
          </Link>

          <Link href="/protocols">
            <GlassmorphicCard className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <FaRecycle className="text-3xl text-accent mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Protocol Suite</h3>
              <p className="text-gray-400">Complete operational framework</p>
            </GlassmorphicCard>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default SCEPDeathRealmsPage;
