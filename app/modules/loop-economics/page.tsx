'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaRecycle, FaSolarPanel, FaLeaf, FaWater, 
  FaRobot, FaDna, FaBrain, FaArrowRight,
  FaInfinity, FaSeedling, FaBolt, FaChartLine
} from 'react-icons/fa';

const LoopEconomicsPage = () => {
  const subsections = [
    {
      title: 'Energy',
      icon: FaSolarPanel,
      color: 'from-yellow-500 to-orange-500',
      description: 'Localised, closed-loop renewable systems',
      details: 'Biomethane, biodiesel, solar microgrids, waste-to-energy',
      link: '/loop-economics/energy'
    },
    {
      title: 'Food',
      icon: FaLeaf,
      color: 'from-green-500 to-emerald-500',
      description: 'Regenerative agriculture systems',
      details: 'Urban farming, vertical agriculture, aquaponics, waste recapture',
      link: '/loop-economics/food'
    },
    {
      title: 'Water',
      icon: FaWater,
      color: 'from-blue-500 to-cyan-500',
      description: 'Closed-loop water management',
      details: 'Recycling, desalination, community water trusts',
      link: '/loop-economics/water'
    },
    {
      title: 'Robotics',
      icon: FaRobot,
      color: 'from-purple-500 to-indigo-500',
      description: 'Automation for circular systems',
      details: 'Manufacturing, waste sorting, precision agriculture',
      link: '/loop-economics/robotics'
    },
    {
      title: 'Biotech',
      icon: FaDna,
      color: 'from-pink-500 to-rose-500',
      description: 'Bio-based material cycles',
      details: 'Bacterial textiles, enzymatic recycling, bio-polymers',
      link: '/loop-economics/biotech'
    },
    {
      title: 'AI',
      icon: FaBrain,
      color: 'from-indigo-500 to-purple-500',
      description: 'Intelligent system optimization',
      details: 'Supply chains, governance, local economic coordination',
      link: '/loop-economics/ai'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

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
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse animation-delay-2000" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-green-500 to-blue-500">
                <FaInfinity className="text-3xl text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                The <GlossaryTooltip term="Loop Economy">Loop Economy</GlossaryTooltip>
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              An economic framework where resources cycle indefinitely through value chains 
              without waste, extraction, or degradation. The <GlossaryTooltip term="Loop Economy" /> 
              maintains economic activity without ecological collapse through regenerative 
              <GlossaryTooltip term="SRL">closed-loop systems</GlossaryTooltip>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3">
                <FaRecycle className="text-2xl text-green-400" />
                <div>
                  <h3 className="font-semibold text-white">Zero Waste</h3>
                  <p className="text-sm text-gray-400">All outputs become inputs</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaSeedling className="text-2xl text-emerald-400" />
                <div>
                  <h3 className="font-semibold text-white">Regenerative</h3>
                  <p className="text-sm text-gray-400">Systems that heal and grow</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaBolt className="text-2xl text-yellow-400" />
                <div>
                  <h3 className="font-semibold text-white">Self-Sustaining</h3>
                  <p className="text-sm text-gray-400">Energy positive operations</p>
                </div>
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Core Principles */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Breaking the <GlossaryTooltip term="CERL">Extractive Cycle</GlossaryTooltip>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <GlassmorphicCard className="p-6">
            <h3 className="text-xl font-semibold text-red-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">❌</span> Traditional Economy
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                Linear extraction → consumption → waste
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                Depletes natural resources permanently
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                Creates <GlossaryTooltip term="CERL">corrupted loops</GlossaryTooltip> of dependency
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">•</span>
                Concentrates wealth through extraction
              </li>
            </ul>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-6 border-2 border-green-500/30">
            <h3 className="text-xl font-semibold text-green-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">✅</span> Loop Economy
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                Circular regeneration → no waste
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                Resources cycle indefinitely
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                Creates <GlossaryTooltip term="SRL">stable recursive loops</GlossaryTooltip>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 mt-1">•</span>
                Distributes abundance through regeneration
              </li>
            </ul>
          </GlassmorphicCard>
        </div>
      </motion.section>

      {/* Subsections Grid */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Loop Economy Sectors
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subsections.map((section, index) => (
            <motion.div key={section.title} variants={itemVariants}>
              <Link href={section.link}>
                <GlassmorphicCard className="p-6 h-full hover:border-white/30 transition-all duration-300 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${section.color}`}>
                      <section.icon className="text-2xl text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white group-hover:text-text-glow-gold transition-colors">
                        {section.title}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {section.description}
                      </p>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    {section.details}
                  </p>
                  
                  <div className="flex items-center gap-2 text-primary group-hover:text-text-glow-gold transition-colors">
                    <span className="text-sm font-medium">Explore sector</span>
                    <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
                  </div>
                </GlassmorphicCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Implementation Path */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <GlassmorphicCard className="p-8 border-2 border-primary/30">
          <div className="flex items-center gap-4 mb-6">
            <FaChartLine className="text-3xl text-primary" />
            <h2 className="text-2xl font-bold text-white">
              Implementation Path
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { phase: '1', title: 'Local Pilots', desc: 'Community-scale demonstrations' },
              { phase: '2', title: 'Network Effects', desc: 'Interconnected loop systems' },
              { phase: '3', title: 'Scale Infrastructure', desc: 'Regional implementation' },
              { phase: '4', title: 'Global Transition', desc: 'Planetary regeneration' }
            ].map((phase, index) => (
              <div key={phase.phase} className="relative">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
                    <span className="font-bold text-primary">{phase.phase}</span>
                  </div>
                  {index < 3 && (
                    <div className="flex-1 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                  )}
                </div>
                <h4 className="font-semibold text-white mb-1">{phase.title}</h4>
                <p className="text-sm text-gray-400">{phase.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-primary/10 rounded-lg border border-primary/20">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-primary">Note:</span> The Loop Economy 
              operates through <GlossaryTooltip term="DAO">decentralized governance</GlossaryTooltip>, 
              preventing capture by traditional extractive systems. Each sector maintains 
              autonomy while contributing to the whole.
            </p>
          </div>
        </GlassmorphicCard>
      </motion.section>
    </div>
  );
};

export default LoopEconomicsPage;
