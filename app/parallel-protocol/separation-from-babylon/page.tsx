'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';

export default function SeparationFromBabylon() {
  const stages = [
    {
      stage: 1,
      title: 'Recognition',
      description: 'Train operatives to detect Babylonian recursion patterns in economy, governance, and culture.',
      color: 'text-signal'
    },
    {
      stage: 2,
      title: 'Withdrawal',
      description: 'Remove Genesis supply chains from Babylonian intermediaries and currency dependencies.',
      color: 'text-accent'
    },
    {
      stage: 3,
      title: 'Replacement',
      description: 'Deploy parallel SRL-aligned systems — food, water, energy, housing, media — at cell scale.',
      color: 'text-danger'
    },
    {
      stage: 4,
      title: 'Defense',
      description: 'Harden infrastructure against economic sanctions, cyber interference, and narrative capture.',
      color: 'text-ink'
    },
    {
      stage: 5,
      title: 'Cultural Encoding',
      description: 'Embed Genesis ethos in art, language, architecture, and daily ritual.',
      color: 'text-accent'
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
            Genesis: The Separation From Babylon
          </h1>
          <div className="h-1 w-24 bg-accent mb-8" />
          <p className="text-xl text-gray-300 leading-relaxed">
            <span className="font-semibold text-white">Mission:</span> Systemically disengage from Babylonian economic, political, and cultural loops while building Parallel Civilisation.
          </p>
        </div>

        {/* Stages Timeline */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-semibold text-white mb-8">
            The Five Stages of Separation
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-accent/30" />
            
            <div className="space-y-8">
              {stages.map((stage, index) => (
                <motion.div
                  key={stage.stage}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="relative"
                >
                  {/* Stage number circle */}
                  <div className="absolute left-0 w-16 h-16 bg-primary border-4 border-accent rounded-full flex items-center justify-center">
                    <span className="text-accent font-bold text-xl">{stage.stage}</span>
                  </div>
                  
                  {/* Stage content */}
                  <div className="ml-24">
                    <GlassmorphicCard blur="sm" className="p-6 hover:border-accent/50 transition-all">
                      <h3 className={`text-2xl font-semibold ${stage.color} mb-2`}>
                        {stage.title}
                      </h3>
                      <p className="text-gray-300 leading-relaxed">
                        {stage.description}
                      </p>
                    </GlassmorphicCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* End State */}
        <GlassmorphicCard blur="md" className="p-8 border-2 border-accent/50 mb-16">
          <h3 className="text-2xl font-display font-semibold text-accent mb-4">
            End State Vision
          </h3>
          <p className="text-lg text-gray-300 leading-relaxed">
            A self-sovereign civilisation immune to Babylon's collapse cycles, operating entirely in regenerative recursion. Each Genesis cell functions as an autonomous node in a distributed network of life-affirming systems, creating abundance through circular economics and collective intelligence.
          </p>
        </GlassmorphicCard>

        {/* Key Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <GlassmorphicCard blur="sm" className="p-6 text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h4 className="text-lg font-semibold text-accent mb-2">Economic Sovereignty</h4>
            <p className="text-sm text-gray-400">Independent value creation outside fiat systems</p>
          </GlassmorphicCard>
          <GlassmorphicCard blur="sm" className="p-6 text-center">
            <div className="text-4xl mb-4">🛡️</div>
            <h4 className="text-lg font-semibold text-accent mb-2">Cultural Defense</h4>
            <p className="text-sm text-gray-400">Memetic immunity to Babylonian programming</p>
          </GlassmorphicCard>
          <GlassmorphicCard blur="sm" className="p-6 text-center">
            <div className="text-4xl mb-4">∞</div>
            <h4 className="text-lg font-semibold text-accent mb-2">Regenerative Loops</h4>
            <p className="text-sm text-gray-400">Self-reinforcing cycles of abundance</p>
          </GlassmorphicCard>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <GlassmorphicCard blur="lg" className="p-8 max-w-3xl mx-auto border-2 border-accent/30">
            <h3 className="text-2xl font-display font-semibold text-accent mb-4">
              Begin Your Separation
            </h3>
            <p className="text-gray-300 mb-6">
              The path to freedom starts with recognition. Join Genesis operatives worldwide in building the infrastructure of liberation.
            </p>
            <button className="px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-all">
              Start Recognition Training
            </button>
          </GlassmorphicCard>
        </div>
      </motion.div>
    </div>
  );
}

