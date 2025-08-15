'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaEye, FaLink, FaExclamationTriangle, FaCheckCircle,
  FaBook, FaBrain, FaShieldAlt, FaRoute, FaCog
} from 'react-icons/fa';

const BabylonLoopsPage = () => {
  const babylonLoops = [
    {
      title: 'Consumption Loops',
      description: 'Engineered addiction cycles that convert time and attention into profit',
      mechanisms: ['Social media algorithms', 'Shopping platforms', 'Entertainment streaming'],
      icon: FaLink
    },
    {
      title: 'Debt Servicing Loops',
      description: 'Financial structures that trap individuals in perpetual payment cycles',
      mechanisms: ['Credit systems', 'Mortgages', 'Student loans'],
      icon: FaCog
    },
    {
      title: 'Identity Reinforcement Loops',
      description: 'Psychological patterns that lock people into limiting self-concepts',
      mechanisms: ['Brand loyalty', 'Political tribalism', 'Status signaling'],
      icon: FaBrain
    }
  ];

  const detectionMethods = [
    'Pattern recognition training for loop identification',
    'Behavioral audit tools for personal loop diagnosis',
    'Environmental mapping of loop-generating systems',
    'Social contagion analysis and protection protocols'
  ];

  const counterStrategies = [
    {
      strategy: 'Loop Breaking',
      description: 'Tactical methods for immediate loop interruption',
      tools: ['Attention redirection', 'Behavioral substitution', 'Environmental modification']
    },
    {
      strategy: 'Loop Immunity',
      description: 'Building resistance to loop formation and capture',
      tools: ['Mental models', 'Value clarification', 'Decision frameworks']
    },
    {
      strategy: 'Loop Replacement',
      description: 'Installing constructive loops that serve genuine development',
      tools: ['SRL protocols', 'Habit stacking', 'Community accountability']
    }
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
        <GlassmorphicCard className="p-8 md:p-12 relative overflow-hidden border-2 border-yellow-500/30">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-600 to-red-600">
                <FaEye className="text-3xl text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Babylon's Loops & Playbook
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-4xl">
              Understanding Babylon's engineering of human behavior through carefully designed loops that harvest 
              attention, extract value, and maintain control. This module exposes the mechanisms and provides 
              practical tools for detection, resistance, and replacement with <GlossaryTooltip term="SRL">SRLs</GlossaryTooltip>.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/30 text-red-300">
                Loop Detection
              </div>
              <div className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300">
                Pattern Analysis
              </div>
              <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300">
                Counter-Strategies
              </div>
            </div>

            <div className="mt-8 p-6 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
              <div className="flex items-center gap-3 mb-4">
                <FaExclamationTriangle className="text-yellow-400 text-xl" />
                <h3 className="text-lg font-semibold text-white">Essential Knowledge</h3>
              </div>
              <p className="text-gray-300">
                These loops are not accidental byproducts but engineered systems designed to maximize extraction 
                and minimize resistance. Understanding their mechanics is the first step toward freedom.
              </p>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Babylon Loop Categories */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Primary Babylon Loop Categories</h2>
        
        <div className="space-y-6">
          {babylonLoops.map((loop, index) => (
            <motion.div
              key={loop.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="p-6 border-l-4 border-l-red-500">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30">
                    <loop.icon className="text-xl text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{loop.title}</h4>
                    <p className="text-gray-300 mb-4">{loop.description}</p>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-400">Common Mechanisms:</h5>
                      <div className="flex flex-wrap gap-2">
                        {loop.mechanisms.map((mechanism, idx) => (
                          <span key={idx} className="px-3 py-1 text-xs bg-red-500/10 border border-red-500/30 text-red-300 rounded-full">
                            {mechanism}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Detection Methods */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8 border-2 border-blue-500/30">
          <div className="flex items-center gap-3 mb-6">
            <FaShieldAlt className="text-2xl text-blue-400" />
            <h2 className="text-2xl font-bold text-white">Loop Detection Methods</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            Babylon loops are often invisible because they've been normalized. These detection methods 
            help identify when you're caught in extractive patterns.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detectionMethods.map((method, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <FaCheckCircle className="text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300">{method}</span>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Counter-Strategies */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Counter-Strategies</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {counterStrategies.map((counter, index) => (
            <motion.div
              key={counter.strategy}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="p-6 border border-green-500/30">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30">
                    <FaRoute className="text-xl text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{counter.strategy}</h4>
                    <p className="text-gray-300 mb-4">{counter.description}</p>
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-400">Available Tools:</h5>
                      <div className="flex flex-wrap gap-2">
                        {counter.tools.map((tool, idx) => (
                          <span key={idx} className="px-3 py-1 text-xs bg-green-500/10 border border-green-500/30 text-green-300 rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Navigation & Resources */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/playbooks">
            <GlassmorphicCard className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <FaBook className="text-3xl text-primary mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Playbooks</h3>
              <p className="text-gray-400">Practical guides for loop breaking and SRL installation</p>
            </GlassmorphicCard>
          </Link>

          <Link href="/modules/scep">
            <GlassmorphicCard className="p-6 hover:border-purple-500/50 transition-colors cursor-pointer">
              <FaBrain className="text-3xl text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">SCEP</h3>
              <p className="text-gray-400">Shared Cognitive Emotional Plane protocols</p>
            </GlassmorphicCard>
          </Link>

          <Link href="/modules/culture-memetics">
            <GlassmorphicCard className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <FaRoute className="text-3xl text-accent mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Culture & Memetics</h3>
              <p className="text-gray-400">Understanding cultural engineering and counter-design</p>
            </GlassmorphicCard>
          </Link>
        </div>

        <div className="mt-8">
          <GlassmorphicCard className="p-8 border border-accent/30">
            <h3 className="text-xl font-semibold text-white mb-4">Implementation Guidelines</h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                <span>Start with personal loop audit before attempting to help others</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                <span>Focus on one loop category at a time for sustainable progress</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                <span>Build replacement <GlossaryTooltip term="SRL">SRLs</GlossaryTooltip> before breaking existing loops</span>
              </li>
              <li className="flex items-start gap-2">
                <FaCheckCircle className="text-accent mt-1 flex-shrink-0" />
                <span>Document patterns and share insights with the community</span>
              </li>
            </ul>
          </GlassmorphicCard>
        </div>
      </motion.section>
    </div>
  );
};

export default BabylonLoopsPage;
