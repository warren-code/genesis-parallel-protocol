'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';

export default function VerticalFarmingProtocol() {
  const implementationSteps = [
    {
      step: 1,
      title: 'Modular Farm Units',
      description: 'Modular vertical farm units (10–200m²) deployed in urban/edge zones.'
    },
    {
      step: 2,
      title: 'Hydroponic Integration',
      description: 'Hydroponic + aeroponic integration for max yield per m².'
    },
    {
      step: 3,
      title: 'AI Optimization',
      description: 'AI-driven nutrient and light cycles tailored to local climate data.'
    },
    {
      step: 4,
      title: 'Waste Loop Integration',
      description: 'Organic waste from Genesis supply chains becomes feedstock for compost teas and biogas for farm power.'
    },
    {
      step: 5,
      title: 'DAO Co-Ownership',
      description: 'Farms governed by local Genesis cells with transparent profit distribution.'
    },
    {
      step: 6,
      title: 'Output Priority',
      description: '80% for community nutrition security, 20% for trade surplus.'
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
            Genesis Vertical Farming Protocol
          </h1>
          <div className="h-1 w-24 bg-accent mb-8" />
          <p className="text-xl text-gray-300 leading-relaxed">
            <span className="font-semibold text-white">Objective:</span> End Babylonian food dependency by replacing centralised agribusiness with hyper-local, closed-loop farms.
          </p>
        </div>

        {/* Implementation Steps */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-semibold text-white mb-8">
            Implementation Steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {implementationSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard blur="sm" className="p-6 h-full hover:border-accent/50 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                      <span className="text-accent font-bold">{item.step}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-accent mb-2">{item.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <GlassmorphicCard blur="sm" className="p-6 text-center border-t-4 border-accent">
            <h3 className="text-2xl font-bold text-accent mb-2">90%</h3>
            <p className="text-sm text-gray-400">Water Reduction vs Traditional</p>
          </GlassmorphicCard>
          <GlassmorphicCard blur="sm" className="p-6 text-center border-t-4 border-accent">
            <h3 className="text-2xl font-bold text-accent mb-2">365</h3>
            <p className="text-sm text-gray-400">Days/Year Production</p>
          </GlassmorphicCard>
          <GlassmorphicCard blur="sm" className="p-6 text-center border-t-4 border-accent">
            <h3 className="text-2xl font-bold text-accent mb-2">10x</h3>
            <p className="text-sm text-gray-400">Yield per Square Meter</p>
          </GlassmorphicCard>
        </div>

        {/* Call to Action */}
        <GlassmorphicCard blur="md" className="p-8 border-2 border-accent/30 text-center">
          <h3 className="text-2xl font-display font-semibold text-accent mb-4">
            Join the Food Revolution
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Deploy vertical farming technology in your community. Break free from industrial agriculture. Feed your people.
          </p>
          <button className="px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-all">
            Start Your Farm
          </button>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}

