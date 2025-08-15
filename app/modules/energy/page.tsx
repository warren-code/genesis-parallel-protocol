'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaBolt, FaSolarPanel, FaWind, FaIndustry,
  FaLeaf, FaChartLine, FaCog
} from 'react-icons/fa';
import { FaBatteryFull } from 'react-icons/fa';

const EnergyPage = () => {
  const energySystems = [
    {
      title: 'Solar Grid Networks',
      description: 'Distributed solar collection with peer-to-peer energy trading',
      icon: FaSolarPanel,
      features: ['Rooftop solar arrays', 'Community solar gardens', 'Energy storage systems']
    },
    {
      title: 'Wind Generation',
      description: 'Community-owned wind farms integrated with local grids',
      icon: FaWind,
      features: ['Micro wind turbines', 'Community wind cooperatives', 'Grid stabilization']
    },
    {
      title: 'Energy Storage',
      description: 'Distributed battery systems for grid resilience and autonomy',
      icon: FaBatteryFull,
      features: ['Home battery systems', 'Community storage banks', 'Grid balancing']
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
            <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
              <FaBolt className="text-3xl text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Energy</h1>
          </div>
          
          <p className="text-xl text-gray-300 mb-8 max-w-4xl">
            Distributed renewable energy systems that prioritize community ownership, 
            resilience, and environmental sustainability over centralized profit extraction.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300">
              Distributed Generation
            </div>
            <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300">
              Community Ownership
            </div>
            <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
              Grid Resilience
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
        <h2 className="text-2xl font-bold text-white mb-6">Energy Systems</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {energySystems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-yellow-500/20 border border-yellow-500/30">
                    <system.icon className="text-xl text-yellow-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-2">{system.title}</h4>
                    <p className="text-gray-300 mb-4">{system.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {system.features.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 text-xs bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 rounded-full">
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
          <Link href="/modules/loop-economics">
            <GlassmorphicCard className="p-6 hover:border-primary/50 transition-colors cursor-pointer">
              <FaChartLine className="text-3xl text-primary mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Loop Economics</h3>
              <p className="text-gray-400">Regenerative economic systems</p>
            </GlassmorphicCard>
          </Link>

          <Link href="/modules/technology">
            <GlassmorphicCard className="p-6 hover:border-purple-500/50 transition-colors cursor-pointer">
              <FaCog className="text-3xl text-purple-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Technology</h3>
              <p className="text-gray-400">SCEP-integrated tech stack</p>
            </GlassmorphicCard>
          </Link>

          <Link href="/modules/housing">
            <GlassmorphicCard className="p-6 hover:border-accent/50 transition-colors cursor-pointer">
              <FaLeaf className="text-3xl text-accent mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Housing</h3>
              <p className="text-gray-400">DAO-managed housing infrastructure</p>
            </GlassmorphicCard>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default EnergyPage;
