'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaBolt, FaIndustry, FaRecycle, FaTint,
  FaLeaf, FaChartLine, FaCog, FaTruck
} from 'react-icons/fa';
import { FaFlask } from 'react-icons/fa';

const EnergyPage = () => {
  const energySystems = [
    {
      title: 'Cotton Waste Collection',
      description: 'Systematic collection and preprocessing of discarded cotton clothing',
      icon: FaRecycle,
      features: ['Textile waste sorting', 'Cotton fiber extraction', 'Community collection hubs']
    },
    {
      title: 'Hydrogen Production',
      description: 'Advanced gasification and electrolysis for clean hydrogen fuel generation',
      icon: FaFlask,
      features: ['Biomass gasification', 'Steam reforming', 'Electrolytic purification']
    },
    {
      title: 'Liquid Hydrogen Storage',
      description: 'Cryogenic storage and distribution systems for fuel supply chains',
      icon: FaTint,
      features: ['Cryogenic tanks', 'Distribution networks', 'Refueling stations']
    },
    {
      title: 'Supply Chain Integration',
      description: 'End-to-end logistics for waste-to-fuel transformation',
      icon: FaTruck,
      features: ['Transportation logistics', 'Processing facilities', 'Fuel delivery systems']
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
            Revolutionary waste-to-fuel supply chain converting discarded cotton clothing 
            into liquid hydrogen, creating a circular economy that transforms textile waste 
            into clean energy infrastructure.
          </p>

          <div className="flex flex-wrap gap-4">
            <div className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300">
              Waste-to-Fuel Conversion
            </div>
            <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300">
              Circular Economy
            </div>
            <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
              Clean Hydrogen
            </div>
            <div className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
              Supply Chain Innovation
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
        <h2 className="text-2xl font-bold text-white mb-6">Cotton-to-Hydrogen Supply Chain</h2>
        
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
