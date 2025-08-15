'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';

export default function ProtocolsIndex() {
  const protocols = [
    {
      slug: 'transport',
      title: 'Transport Protocol',
      icon: '🚀',
      description: 'Decentralized, loop-efficient movement of goods, people, and information through autonomous routing, renewable energy logistics, and secure ∞⃝ glyph signalling.',
      keyFeatures: [
        'Autonomous routing systems',
        'Renewable energy integration',
        'SCEP-aware transit networks',
        'Community-controlled infrastructure'
      ],
      color: 'border-blue-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10'
    },
    {
      slug: 'housing',
      title: 'Housing Protocol',
      icon: '🏘️',
      description: 'DAO-managed housing infrastructure ensuring circular resource flows, equitable access, and regenerative design through cooperative ownership and automated maintenance.',
      keyFeatures: [
        'Cooperative ownership models',
        'Circular resource flows',
        'Automated maintenance systems',
        'Community land trusts'
      ],
      color: 'border-green-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10'
    },
    {
      slug: 'finance',
      title: 'Finance Protocol',
      icon: '💰',
      description: 'Non-debt-based tokenized loop economies replacing extractive fiat systems through inflation dampening, SRL rewards, and decentralized escrow.',
      keyFeatures: [
        'Tokenized loop economies',
        'Automatic inflation controls',
        'SRL reward incentives',
        'Decentralized escrow systems'
      ],
      color: 'border-yellow-500',
      bgGradient: 'from-yellow-500/10 to-orange-500/10'
    },
    {
      slug: 'technology',
      title: 'Technology Protocol',
      icon: '⚙️',
      description: 'Open-source, SCEP-integrated development stack with regenerative metrics, loop collapse resistance tests, and parallel governance layers.',
      keyFeatures: [
        'Open-source development',
        'SCEP-integrated architecture',
        'Loop collapse resistance',
        'Parallel governance systems'
      ],
      color: 'border-purple-500',
      bgGradient: 'from-purple-500/10 to-violet-500/10'
    },
    {
      slug: 'trade',
      title: 'Trade Protocol',
      icon: '🌐',
      description: 'Transparent, circular supply chain markets with Genesis Value Chain mapping and automated compliance to regenerative standards.',
      keyFeatures: [
        'Genesis Value Chain mapping',
        'Circular supply networks',
        'Regenerative standards compliance',
        'Democratic price discovery'
      ],
      color: 'border-indigo-500',
      bgGradient: 'from-indigo-500/10 to-blue-500/10'
    },
    {
      slug: 'foia',
      title: 'FOIA Protocol',
      icon: '🔍',
      description: 'Multi-jurisdictional transparency system with automated document discovery and Liquefaction Protocol integration for exposing Babylonian corruption.',
      keyFeatures: [
        'Automated document discovery',
        'Multi-jurisdictional requests',
        'Liquefaction Protocol integration',
        'Whistleblower protection'
      ],
      color: 'border-red-500',
      bgGradient: 'from-red-500/10 to-pink-500/10'
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="text-8xl mb-6">🌟</div>
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <span className="text-accent font-display text-sm uppercase tracking-widest">Genesis Protocols</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
            Protocol Suite
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Six foundational protocols for building parallel civilization infrastructure that 
            serves life, community, and ecological regeneration rather than extraction and control.
          </p>
        </div>

        {/* Mythic Introduction */}
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
                The Architecture of Liberation
              </motion.h2>
              
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
                className="space-y-6 text-gray-300 text-lg leading-relaxed text-center"
              >
                <p>
                  Each protocol represents a pillar of the <span className="text-accent font-semibold">new world</span> we are building—
                  infrastructure that serves life rather than extracting from it.
                </p>
                <p>
                  Together, these six protocols form an integrated system of <span className="text-white font-semibold">regenerative civilization</span> that 
                  makes the old extractive systems obsolete through superior alternatives that actually work for people and planet.
                </p>
                <p className="text-accent font-semibold">
                  This is not reform. This is replacement. This is Genesis.
                </p>
              </motion.div>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Protocol Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {protocols.map((protocol, index) => (
            <motion.div
              key={protocol.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Link href={`/protocols/${protocol.slug}`}>
                <GlassmorphicCard 
                  className={`p-8 h-full border-l-4 ${protocol.color} hover:border-accent transition-all cursor-pointer group relative overflow-hidden`}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${protocol.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="text-6xl group-hover:scale-110 transition-transform">
                        {protocol.icon}
                      </div>
                      <div className="text-gray-400 group-hover:text-accent transition-colors">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                    
                    <h3 className="text-3xl font-display font-bold text-white mb-4 group-hover:text-accent transition-colors">
                      {protocol.title}
                    </h3>
                    
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {protocol.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Key Features</h4>
                      <ul className="space-y-2 text-sm text-gray-500">
                        {protocol.keyFeatures.map((feature, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <div className="w-1 h-1 bg-accent rounded-full" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </GlassmorphicCard>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Integration Vision */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <GlassmorphicCard blur="md" className="p-12 border-2 border-accent/30">
            <h2 className="text-3xl font-display font-semibold text-accent mb-8 text-center">
              Integrated Systems Vision
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">System Interconnections</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Transport + Trade:</strong> Circular supply chains with regenerative logistics</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Housing + Finance:</strong> Community land trusts with tokenized ownership</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Technology + FOIA:</strong> Open-source transparency tools</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>All Protocols:</strong> Unified governance and resource sharing</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Regenerative Outcomes</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Ecological Restoration:</strong> Every transaction heals the planet</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Community Resilience:</strong> Local self-reliance and mutual aid</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Economic Justice:</strong> Wealth flows to value creation, not extraction</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Radical Transparency:</strong> Corruption becomes impossible in open systems</span>
                  </li>
                </ul>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center"
        >
          <GlassmorphicCard className="p-12 bg-gradient-to-br from-accent/10 to-signal/10 border-2 border-accent/50">
            <h2 className="text-3xl font-display font-bold text-white mb-6">
              Begin Your Protocol Journey
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Choose a protocol that resonates with your skills and passion. Each one offers 
              concrete steps toward building the regenerative civilization we all need.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-accent text-primary font-semibold rounded-xl transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25"
              >
                Download Complete Suite
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 border-2 border-accent text-accent font-semibold rounded-xl transition-all hover:bg-accent/10"
              >
                Join Protocol Network
              </motion.button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
