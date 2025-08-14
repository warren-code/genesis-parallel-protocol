'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';

export default function WaterProtocol() {
  const pillars = [
    {
      number: 1,
      title: 'Measurement',
      description: 'All agents log water use in litres per op, auto-audited weekly.'
    },
    {
      number: 2,
      title: 'Reduction',
      description: 'Deploy closed-loop greywater systems, AI irrigation control, and leak-alert sensors.'
    },
    {
      number: 3,
      title: 'Regeneration',
      description: 'Fund watershed restoration, wetland rewilding, and aquifer recharge projects.'
    },
    {
      number: 4,
      title: 'Incentives',
      description: 'Genesis Water Credits (GWCs) issued for net-positive water impact, redeemable for supply chain priority.'
    },
    {
      number: 5,
      title: 'Transparency Layer',
      description: 'Public ledger shows real-time aggregate water balance for all Genesis nodes.'
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
            Genesis Water Protocol
          </h1>
          <div className="h-1 w-24 bg-accent mb-8" />
          <p className="text-xl text-gray-300 leading-relaxed">
            <span className="font-semibold text-white">Purpose:</span> Track, reduce, and regenerate water use across all Genesis agents, value chains, and communities.
          </p>
        </div>

        {/* Pillars Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-semibold text-white mb-8">
            Protocol Pillars
          </h2>
          <div className="space-y-6">
            {pillars.map((pillar, index) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard blur="sm" className="p-6 border-l-4 border-accent hover:border-accent/70 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold text-lg">{pillar.number}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-accent mb-2">{pillar.title}</h3>
                      <p className="text-gray-300 leading-relaxed">{pillar.description}</p>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Implementation Status */}
        <GlassmorphicCard blur="md" className="p-8 border-2 border-accent/30">
          <h3 className="text-2xl font-display font-semibold text-accent mb-4">
            Implementation Status
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">2,847</div>
              <div className="text-sm text-gray-400">Active Nodes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">847K L</div>
              <div className="text-sm text-gray-400">Water Regenerated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-accent mb-2">12,400</div>
              <div className="text-sm text-gray-400">GWCs Issued</div>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}
