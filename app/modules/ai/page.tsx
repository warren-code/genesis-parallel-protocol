'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaBrain, FaRobot, FaShieldAlt, FaUsers,
  FaCog, FaLeaf, FaChartLine, FaEye
} from 'react-icons/fa';

const AIPage = () => {
  const aiPrinciples = [
    {
      title: 'Community-Controlled AI',
      description: 'AI development and deployment controlled by DAOs rather than corporations',
      icon: FaUsers,
      features: ['Democratic governance', 'Open source models', 'Community ownership']
    },
    {
      title: 'SCEP Integration',
      description: 'AI systems designed to enhance human cognitive and emotional capacity',
      icon: FaBrain,
      features: ['Cognitive amplification', 'Emotional intelligence', 'Collective wisdom']
    },
    {
      title: 'Transparent Operations',
      description: 'Fully auditable AI systems with explainable decision-making processes',
      icon: FaEye,
      features: ['Open algorithms', 'Decision traceability', 'Bias detection']
    }
  ];

  return (
    <div className="min-h-screen py-12">
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500">
              <FaBrain className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">AI</h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-8 max-w-4xl">
            Artificial Intelligence integrated with <GlossaryTooltip term="SCEP">SCEP</GlossaryTooltip> principles, 
            prioritizing human flourishing, community control, and transparent operation over profit maximization and control.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
              Community Control
            </div>
            <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
              SCEP Integration
            </div>
            <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300">
              Transparent Operations
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-white mb-6">AI Development Principles</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {aiPrinciples.map((principle, index) => (
            <motion.div
              key={principle.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-purple-500/20 border border-purple-500/30">
                    <principle.icon className="text-xl text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{principle.title}</h4>
                    <p className="text-gray-300 mb-4">{principle.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {principle.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 text-xs bg-purple-500/10 border border-purple-500/30 text-purple-300 rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/modules/scep">
            <GlassmorphicCard className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <FaBrain className="text-3xl text-primary mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">SCEP</h3>
              <p className="text-gray-400">Shared Cognitive Emotional Plane</p>
            </GlassmorphicCard>
          </Link>

          <Link href="/modules/technology">
            <GlassmorphicCard className="p-6 hover:border-purple-500/50 transition-colors cursor-pointer">
              <FaCog className="text-3xl text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Technology</h3>
              <p className="text-gray-400">SCEP-integrated tech stack</p>
            </GlassmorphicCard>
          </Link>

          <Link href="/modules/robotics">
            <GlassmorphicCard className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <FaRobot className="text-3xl text-accent mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Robotics</h3>
              <p className="text-gray-400">Automation and robotics integration</p>
            </GlassmorphicCard>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default AIPage;
