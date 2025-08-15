'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';

export default function ParallelProtocolIndex() {
  // Core Protocol Frameworks
  const coreProtocols = [
    {
      slug: 'water-protocol',
      title: 'Genesis Water Protocol',
      description: 'Track, reduce, and regenerate water use across all Genesis agents and communities.',
      icon: '💧',
      color: 'border-blue-500',
      category: 'infrastructure'
    },
    {
      slug: 'vertical-farming-protocol',
      title: 'Vertical Farming Protocol',
      description: 'End food dependency with hyper-local, closed-loop farms.',
      icon: '🌱',
      color: 'border-green-500',
      category: 'infrastructure'
    },
    {
      slug: 'dao-laws',
      title: 'Genesis DAO Laws',
      description: 'Core governance principles for SRL expansion and CERL collapse.',
      icon: '⚖️',
      color: 'border-purple-500',
      category: 'governance'
    },
    {
      slug: 'separation-from-babylon',
      title: 'Separation From Babylon',
      description: 'Systemically disengage and build the Parallel Civilisation.',
      icon: '🔗',
      color: 'border-red-500',
      category: 'strategy'
    },
    {
      slug: 'jobs',
      title: 'Parallel Civilisation Jobs',
      description: 'Revolutionary roles replacing Babylonian occupations.',
      icon: '💼',
      color: 'border-yellow-500',
      category: 'economy'
    },
    {
      slug: 'babylonian-taxonomy',
      title: 'Babylonian Taxonomy',
      description: 'Historical patterns of civilizational rise and collapse—learn to break the cycle.',
      icon: '🏛️',
      color: 'border-orange-500',
      category: 'analysis'
    }
  ];

  // Module Protocols (from navigation)
  const moduleProtocols = [
    {
      title: 'Loop Economics',
      href: '/modules/loop-economics',
      description: 'Regenerative economic systems that create abundance through recursive patterns',
      icon: '♻️',
      color: 'border-green-400'
    },
    {
      title: 'Energy Protocol',
      href: '/modules/energy',
      description: 'Cotton clothing waste to liquid hydrogen supply chain for green fuel',
      icon: '⚡',
      color: 'border-yellow-400'
    },
    {
      title: 'Food Systems',
      href: '/modules/food',
      description: 'Decentralized food production and distribution networks',
      icon: '🍃',
      color: 'border-green-500'
    },
    {
      title: 'Water Management',
      href: '/modules/water',
      description: 'Sustainable water systems and conservation protocols',
      icon: '🌊',
      color: 'border-blue-400'
    },
    {
      title: 'Robotics & Automation',
      href: '/modules/robotics',
      description: 'Automation systems for parallel infrastructure',
      icon: '🤖',
      color: 'border-purple-400'
    },
    {
      title: 'Biotechnology',
      href: '/modules/biotech',
      description: 'Regenerative biotechnology applications',
      icon: '🧬',
      color: 'border-pink-400'
    },
    {
      title: 'AI Integration',
      href: '/modules/ai',
      description: 'Decentralized artificial intelligence systems',
      icon: '🧠',
      color: 'border-indigo-400'
    },
    {
      title: 'Education Systems',
      href: '/modules/education',
      description: 'Parallel learning and knowledge distribution',
      icon: '📚',
      color: 'border-blue-500'
    },
    {
      title: 'Housing Protocol',
      href: '/modules/housing',
      description: 'DAO-managed housing infrastructure and community living',
      icon: '🏠',
      color: 'border-orange-400'
    },
    {
      title: 'Health Systems',
      href: '/modules/health',
      description: 'Community-based health infrastructure and wellness protocols',
      icon: '⚕️',
      color: 'border-red-400'
    },
    {
      title: 'SCEP Framework',
      href: '/modules/scep',
      description: 'Shared Cognitive Emotional Plane for collective coordination',
      icon: '🌐',
      color: 'border-purple-500'
    },
    {
      title: 'Culture & Memetics',
      href: '/modules/culture-memetics',
      description: 'Operational music and cultural infrastructure systems',
      icon: '🎵',
      color: 'border-pink-500'
    }
  ];

  // Service Protocols (the ones that were in the navigation)
  const serviceProtocols = [
    {
      title: 'FOIA Protocol',
      href: '/modules/foia',
      description: 'Radical transparency system for information liberation',
      icon: '📋',
      color: 'border-cyan-400'
    },
    {
      title: 'Trade Protocol',
      href: '/modules/trade',
      description: 'Transparent supply chains and ethical commerce',
      icon: '🔄',
      color: 'border-emerald-400'
    },
    {
      title: 'Finance Protocol',
      href: '/modules/finance',
      description: 'Non-debt tokenized economies and mutual aid systems',
      icon: '💰',
      color: 'border-yellow-500'
    },
    {
      title: 'Technology Protocol',
      href: '/modules/technology',
      description: 'SCEP-integrated technology stack and infrastructure',
      icon: '⚙️',
      color: 'border-slate-400'
    },
    {
      title: 'Transport Protocol',
      href: '/modules/transport',
      description: 'Decentralized movement systems and logistics networks',
      icon: '🚀',
      color: 'border-violet-400'
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

        {/* Core Protocol Frameworks */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-accent mb-4">
              Core Protocol Frameworks
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              The foundational systems that establish sovereignty and self-governance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreProtocols.map((protocol, index) => (
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
        </motion.div>

        {/* Module Protocol Systems */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-accent mb-4">
              Module Protocol Systems
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Specialized infrastructure modules for comprehensive parallel civilization
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {moduleProtocols.map((protocol, index) => (
              <motion.div
                key={protocol.href}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={protocol.href}>
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
        </motion.div>

        {/* Service Protocol Networks */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mb-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-accent mb-4">
              Service Protocol Networks
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Essential services and exchange systems for the parallel economy
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceProtocols.map((protocol, index) => (
              <motion.div
                key={protocol.href}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link href={protocol.href}>
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
        </motion.div>

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
