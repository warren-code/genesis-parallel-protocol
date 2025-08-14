'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';

export default function DAOLaws() {
  const laws = [
    {
      number: 1,
      title: 'One-Person-One-Vote',
      description: 'One-Person-One-Vote via non-transferable identity keys; no stake-weighting.'
    },
    {
      number: 2,
      title: 'Proposal Time-Lock',
      description: 'Minimum 7 days for review; emergency ops require multi-sig from 3+ veteran operatives.'
    },
    {
      number: 3,
      title: 'Anti-Capture',
      description: 'Automatic fork protocol if >30% governance nodes detect Babylonian recursion.'
    },
    {
      number: 4,
      title: 'Treasury Allocation',
      description: '60% regenerative ops, 25% infrastructure, 10% ops reserves, 5% discretionary innovation.'
    },
    {
      number: 5,
      title: 'Transparency',
      description: 'All votes, code, and financials on public chain; private intel only for live op security.'
    },
    {
      number: 6,
      title: 'Recall Mechanism',
      description: 'Any operative can be suspended via 2/3 vote pending tribunal.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-accent mb-6">
            Genesis DAO Laws
          </h1>
          <div className="h-1 w-24 bg-accent mb-8" />
          
          {/* Core Law Banner */}
          <GlassmorphicCard blur="md" className="p-6 border-2 border-accent/50 mb-8">
            <p className="text-xl text-white font-semibold text-center">
              <span className="text-accent">Core Law:</span> All governance serves SRL expansion and CERL collapse — no exceptions.
            </p>
          </GlassmorphicCard>
        </div>

        {/* Laws Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {laws.map((law, index) => (
            <motion.div
              key={law.number}
              initial={{ opacity: 0, rotateY: -10 }}
              animate={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassmorphicCard 
                blur="sm" 
                className="p-6 h-full border-l-4 border-accent hover:border-accent/70 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-14 h-14 bg-accent/10 border-2 border-accent/30 rounded-lg flex items-center justify-center group-hover:bg-accent/20 transition-all">
                    <span className="text-accent font-bold text-xl">{law.number}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-accent mb-2">{law.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{law.description}</p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>

        {/* Governance Stats */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-semibold text-white mb-8 text-center">
            Current Governance Status
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <GlassmorphicCard blur="sm" className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">3,847</div>
              <div className="text-sm text-gray-400">Active Operatives</div>
            </GlassmorphicCard>
            <GlassmorphicCard blur="sm" className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">127</div>
              <div className="text-sm text-gray-400">Active Proposals</div>
            </GlassmorphicCard>
            <GlassmorphicCard blur="sm" className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">98.4%</div>
              <div className="text-sm text-gray-400">Consensus Rate</div>
            </GlassmorphicCard>
            <GlassmorphicCard blur="sm" className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">0</div>
              <div className="text-sm text-gray-400">Babylon Captures</div>
            </GlassmorphicCard>
          </div>
        </div>

        {/* Enforcement Notice */}
        <GlassmorphicCard blur="md" className="p-8 border-2 border-danger/30 bg-danger/5">
          <h3 className="text-2xl font-display font-semibold text-danger mb-4">
            Enforcement Protocol
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            These laws are immutable and self-enforcing through smart contracts. Any attempt to circumvent or modify these laws outside of the prescribed governance process will result in immediate suspension and tribunal review.
          </p>
          <p className="text-sm text-gray-400">
            Last audit: Block #847,293 | Next scheduled audit: Block #850,000
          </p>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}

