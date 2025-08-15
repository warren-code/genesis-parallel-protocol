'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { fadeInUp } from '@/lib/animations';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function ComparePage() {
  const comparisonData = [
    {
      category: "Economic Model",
      traditional: "Extractive capitalism, wealth concentration",
      genesis: "Loop economics, regenerative cycles"
    },
    {
      category: "Governance",
      traditional: "Representative democracy, corporate lobbying",
      genesis: "Direct democracy, liquid delegation, DAO structure"
    },
    {
      category: "Resource Management",
      traditional: "Linear consumption, planned obsolescence",
      genesis: "Circular systems, sustainable production"
    },
    {
      category: "Community Structure",
      traditional: "Individualistic, competitive isolation",
      genesis: "Collaborative, mutual support networks"
    },
    {
      category: "Technology Use",
      traditional: "Surveillance capitalism, data extraction",
      genesis: "Privacy-first, community-owned infrastructure"
    },
    {
      category: "Environmental Impact",
      traditional: "Externalized costs, ecosystem destruction",
      genesis: "Regenerative practices, harmony with nature"
    },
    {
      category: "Decision Making",
      traditional: "Top-down hierarchies, bureaucracy",
      genesis: "Consensus building, distributed authority"
    },
    {
      category: "Value Creation",
      traditional: "Shareholder profits, GDP growth",
      genesis: "Human flourishing, wellbeing metrics"
    },
    {
      category: "Knowledge Sharing",
      traditional: "Proprietary IP, paywalled information",
      genesis: "Open source, collective intelligence"
    },
    {
      category: "Conflict Resolution",
      traditional: "Punitive justice, adversarial courts",
      genesis: "Restorative justice, community mediation"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-display font-bold text-ink mb-6">
          Genesis vs Traditional Systems
        </h1>
        <p className="text-xl text-gray max-w-3xl mx-auto">
          A comprehensive comparison of how Genesis Protocol fundamentally differs from 
          the failing systems it's designed to replace.
        </p>
      </motion.div>

      {/* Quick Summary */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <div className="grid md:grid-cols-2 gap-8">
          <GlassmorphicCard className="p-8 border-red-400">
            <h2 className="text-2xl font-display font-bold text-red-400 mb-6">
              Traditional System Failures
            </h2>
            <ul className="space-y-3">
              {[
                "Wealth concentrated in top 1%",
                "Environmental destruction accelerating",
                "Mental health crisis epidemic",
                "Democratic institutions captured",
                "Communities fragmented and isolated",
                "Innovation stifled by monopolies"
              ].map((item, index) => (
                <li key={index} className="flex items-start text-gray">
                  <FaTimes className="text-red-400 mt-1 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassmorphicCard>

          <GlassmorphicCard className="p-8 border-accent">
            <h2 className="text-2xl font-display font-bold text-accent mb-6">
              Genesis Protocol Solutions
            </h2>
            <ul className="space-y-3">
              {[
                "Wealth circulates in communities",
                "Regenerative environmental practices",
                "Holistic wellbeing prioritized",
                "True democratic participation",
                "Strong community bonds",
                "Open innovation and collaboration"
              ].map((item, index) => (
                <li key={index} className="flex items-start text-gray">
                  <FaCheck className="text-accent mt-1 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </GlassmorphicCard>
        </div>
      </motion.section>

      {/* Detailed Comparison Table */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <h2 className="text-3xl font-display font-bold text-ink mb-8 text-center">
          Detailed System Comparison
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-4 text-ink font-bold border-b border-ink/20">
                  Category
                </th>
                <th className="text-left p-4 text-red-400 font-bold border-b border-ink/20">
                  Traditional System
                </th>
                <th className="text-left p-4 text-accent font-bold border-b border-ink/20">
                  Genesis Protocol
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <motion.tr
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05, duration: 0.6 }}
                  className="border-b border-ink/10 hover:bg-ink/5 transition-colors"
                >
                  <td className="p-4 font-medium text-ink">{row.category}</td>
                  <td className="p-4 text-gray">{row.traditional}</td>
                  <td className="p-4 text-gray">{row.genesis}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.section>

      {/* Key Differentiators */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <GlassmorphicCard className="p-12 border-signal">
          <h2 className="text-3xl font-display font-bold text-ink mb-8 text-center">
            What Makes Genesis Fundamentally Different
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-signal mb-4">Systemic Approach</h3>
              <p className="text-gray mb-4">
                Unlike reform efforts that tinker at the edges, Genesis builds entirely 
                new systems from the ground up. We don't try to fix what's broken—we 
                replace it with something designed for human flourishing.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-signal mb-4">Values-First Design</h3>
              <p className="text-gray mb-4">
                Every component of Genesis starts with the question: "How does this serve 
                human wellbeing and ecological health?" Not profit, not growth, not power—life.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-signal mb-4">Proven Alternatives</h3>
              <p className="text-gray mb-4">
                Genesis isn't theoretical. Each system is based on successful models from 
                around the world, integrated into a coherent whole that can scale globally.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-signal mb-4">Peaceful Transition</h3>
              <p className="text-gray mb-4">
                By building parallel systems, we enable smooth transition without conflict. 
                People can choose Genesis when they're ready, creating inevitable momentum.
              </p>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <GlassmorphicCard className="inline-block p-12 border-glow-gold">
          <h2 className="text-3xl font-display font-bold text-ink mb-6">
            The Choice Is Clear
          </h2>
          <p className="text-xl text-gray mb-8 max-w-2xl mx-auto">
            Continue with systems that are failing humanity and the planet, or join us 
            in building something better. The future is parallel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/why-genesis"
              className="px-8 py-4 bg-gradient-to-r from-accent to-signal text-primary rounded-xl font-bold hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              Learn Why Genesis
            </Link>
            <Link
              href="/parallel-protocol"
              className="px-8 py-4 border-2 border-ink text-ink rounded-xl font-bold hover:bg-ink hover:text-primary transition-all duration-300"
            >
              Explore the Protocol
            </Link>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}
