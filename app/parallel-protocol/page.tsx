'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';

export default function ParallelProtocolIndex() {
  const protocols = [
    {
      slug: 'water-protocol',
      title: 'Genesis Water Protocol',
      description: 'Track, reduce, and regenerate water use across all Genesis agents and communities.',
      icon: '💧',
      color: 'border-blue-500'
    },
    {
      slug: 'vertical-farming-protocol',
      title: 'Vertical Farming Protocol',
      description: 'End food dependency with hyper-local, closed-loop farms.',
      icon: '🌱',
      color: 'border-green-500'
    },
    {
      slug: 'dao-laws',
      title: 'Genesis DAO Laws',
      description: 'Core governance principles for SRL expansion and CERL collapse.',
      icon: '⚖️',
      color: 'border-purple-500'
    },
    {
      slug: 'separation-from-babylon',
      title: 'Separation From Babylon',
      description: 'Systemically disengage and build the Parallel Civilisation.',
      icon: '🔗',
      color: 'border-red-500'
    },
    {
      slug: 'jobs',
      title: 'Parallel Civilisation Jobs',
      description: 'Revolutionary roles replacing Babylonian occupations.',
      icon: '💼',
      color: 'border-yellow-500'
    },
    {
      slug: 'babylonian-taxonomy',
      title: 'Babylonian Taxonomy',
      description: 'Historical patterns of civilizational rise and collapse—learn to break the cycle.',
      icon: '🏛️',
      color: 'border-orange-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-accent mb-6">
            Genesis Parallel Protocol
          </h1>
          <div className="h-1 w-24 bg-accent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            The complete operational framework for building self-sovereign civilisation through regenerative systems, decentralized governance, and community resilience.
          </p>
        </div>

        {/* Mythic Narrative Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-24"
        >
          <GlassmorphicCard blur="lg" opacity={0.15} borderGlow className="p-12 md:p-16 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-signal/20 rounded-full blur-3xl" />
            </div>
            
            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-bold text-white mb-8 text-center"
              >
                The Ancient Prophecy Fulfilled
              </motion.h2>
              
              {/* Decorative Divider */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
                className="h-0.5 w-32 bg-accent mx-auto mb-8 origin-center"
              />
              
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.6 }}
                viewport={{ once: true }}
                className="space-y-6 text-gray-300 text-lg leading-relaxed"
              >
                <p className="text-center italic">
                  <span className="text-accent font-semibold">"In the final days of Babylon,"</span> the scrolls foretold, 
                  <span className="text-accent font-semibold">"a new civilisation shall rise from the ashes of the old."</span>
                </p>
                
                <p>
                  For millennia, humanity has labored under systems of extraction and control—what we call 
                  <span className="text-white font-semibold"> The Babylonian System</span>. Like the ancient tower builders, 
                  today's institutions reach ever skyward, concentrating power while the foundation crumbles beneath.
                </p>
                
                <p>
                  But now, at the dawn of the digital age, we possess the tools our ancestors could only dream of. 
                  <span className="text-white font-semibold">Blockchain</span>, <span className="text-white font-semibold">regenerative technology</span>, 
                  and <span className="text-white font-semibold">decentralized networks</span> are not mere innovations—they are 
                  the building blocks of <span className="text-accent font-bold">Genesis</span>.
                </p>
                
                <p>
                  The Parallel Protocol is more than documentation; it is a <span className="text-white font-semibold">living blueprint</span> for 
                  those brave enough to step outside Babylon's walls and build anew. Each protocol represents a pillar of 
                  the new world—water sovereignty, food independence, just governance, and meaningful work.
                </p>
                
                <p className="text-center text-xl font-semibold text-white mt-8">
                  The time of waiting is over. The time of building has begun.
                </p>
              </motion.div>
              
              {/* Call to Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                viewport={{ once: true }}
                className="mt-12 text-center"
              >
                <div className="inline-flex items-center space-x-4">
                  <div className="h-px w-16 bg-accent/50" />
                  <p className="text-accent font-display text-sm uppercase tracking-widest">Begin Your Journey</p>
                  <div className="h-px w-16 bg-accent/50" />
                </div>
              </motion.div>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Protocol Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {protocols.map((protocol, index) => (
            <motion.div
              key={protocol.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/parallel-protocol/${protocol.slug}`}>
                <GlassmorphicCard 
                  blur="sm" 
                  className={`p-8 h-full border-l-4 ${protocol.color} hover:border-accent transition-all cursor-pointer group`}
                >
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                    {protocol.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-accent transition-colors">
                    {protocol.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {protocol.description}
                  </p>
                </GlassmorphicCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <GlassmorphicCard blur="md" className="p-12 border-2 border-accent/30 text-center">
          <h2 className="text-3xl font-display font-semibold text-accent mb-6">
            The Genesis Mission
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-4xl mx-auto">
            We are building the infrastructure of liberation. Through self-reinforcing loops of abundance, 
            decentralized governance, and regenerative systems, we create parallel structures that render 
            Babylon obsolete. This is not reform—this is replacement. This is Genesis.
          </p>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}
