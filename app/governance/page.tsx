'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { fadeInUp } from '@/lib/animations';
import { FaVoteYea, FaBalanceScale, FaUsers, FaShieldAlt, FaNetworkWired, FaGavel } from 'react-icons/fa';

export default function GovernancePage() {
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
          Governance Systems
        </h1>
        <p className="text-xl text-gray max-w-3xl mx-auto">
          Democratic decision-making that scales from local communities to global coordination, 
          built on transparency and collective wisdom.
        </p>
      </motion.div>

      {/* Core Principles */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2 className="text-3xl font-display font-bold text-ink mb-8 text-center">
          Core Governance Principles
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <FaVoteYea className="w-8 h-8" />,
              title: "Direct Democracy",
              description: "Members directly vote on proposals that affect their communities, with no intermediaries"
            },
            {
              icon: <FaBalanceScale className="w-8 h-8" />,
              title: "Liquid Democracy",
              description: "Delegate your voting power to trusted experts in specific domains when needed"
            },
            {
              icon: <FaUsers className="w-8 h-8" />,
              title: "Consensus Building",
              description: "Emphasis on finding solutions that work for all stakeholders, not just majorities"
            },
            {
              icon: <FaShieldAlt className="w-8 h-8" />,
              title: "Constitutional Rights",
              description: "Core human rights and values protected from simple majority override"
            },
            {
              icon: <FaNetworkWired className="w-8 h-8" />,
              title: "Federated Structure",
              description: "Local autonomy with coordination protocols for inter-community decisions"
            },
            {
              icon: <FaGavel className="w-8 h-8" />,
              title: "Dispute Resolution",
              description: "Community-based justice systems focused on restoration, not punishment"
            }
          ].map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            >
              <GlassmorphicCard className="h-full p-6 hover:border-accent transition-all duration-300">
                <div className="text-accent mb-4">{principle.icon}</div>
                <h3 className="text-xl font-bold text-ink mb-3">{principle.title}</h3>
                <p className="text-gray">{principle.description}</p>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Governance Layers */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <GlassmorphicCard className="p-12 border-signal">
          <h2 className="text-3xl font-display font-bold text-ink mb-8 text-center">
            Multi-Layer Governance Structure
          </h2>
          
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold text-signal mb-4">Local Community Layer</h3>
                <ul className="space-y-3 text-gray">
                  <li className="flex items-start">
                    <span className="text-signal mr-3">•</span>
                    <span>Neighborhood assemblies for immediate community decisions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-signal mr-3">•</span>
                    <span>Resource allocation for local projects and initiatives</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-signal mr-3">•</span>
                    <span>Community standards and cultural preservation</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-signal mr-3">•</span>
                    <span>Direct participation in all local matters</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-signal mb-4">Regional Coordination</h3>
                <ul className="space-y-3 text-gray">
                  <li className="flex items-start">
                    <span className="text-signal mr-3">•</span>
                    <span>Inter-community resource sharing and trade</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-signal mr-3">•</span>
                    <span>Regional infrastructure development</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-signal mr-3">•</span>
                    <span>Conflict resolution between communities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-signal mr-3">•</span>
                    <span>Delegates chosen by local assemblies</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-ink/20">
              <h3 className="text-xl font-bold text-signal mb-4">Global Protocol Layer</h3>
              <p className="text-gray mb-4">
                The highest layer focuses on maintaining the core protocol, standards, and values that 
                unite all Genesis communities while preserving local autonomy.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-bold text-ink mb-2">Protocol Development</h4>
                  <p className="text-sm text-gray">Updates to core systems and standards</p>
                </div>
                <div>
                  <h4 className="font-bold text-ink mb-2">Resource Networks</h4>
                  <p className="text-sm text-gray">Global supply chains and resource flows</p>
                </div>
                <div>
                  <h4 className="font-bold text-ink mb-2">External Relations</h4>
                  <p className="text-sm text-gray">Interface with traditional institutions</p>
                </div>
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Decision Making Process */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <h2 className="text-3xl font-display font-bold text-ink mb-8 text-center">
          Decision-Making Process
        </h2>
        
        <div className="space-y-6">
          {[
            {
              step: "1",
              title: "Proposal Submission",
              description: "Any member can submit proposals with required stake/endorsements"
            },
            {
              step: "2",
              title: "Community Discussion",
              description: "Open forum for debate, amendments, and consensus building"
            },
            {
              step: "3",
              title: "Impact Assessment",
              description: "Analysis of effects on different stakeholders and systems"
            },
            {
              step: "4",
              title: "Voting Period",
              description: "Time-boxed voting with quorum requirements based on proposal scope"
            },
            {
              step: "5",
              title: "Implementation",
              description: "Execution with clear accountability and progress tracking"
            },
            {
              step: "6",
              title: "Review & Iteration",
              description: "Regular assessment and adjustment based on outcomes"
            }
          ].map((process, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.6 }}
            >
              <GlassmorphicCard className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-signal flex items-center justify-center text-primary font-bold text-xl">
                    {process.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-ink mb-1">{process.title}</h3>
                    <p className="text-gray">{process.description}</p>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Links to Related Systems */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <GlassmorphicCard className="inline-block p-12 border-glow-gold">
          <h2 className="text-3xl font-display font-bold text-ink mb-6">
            Explore Related Systems
          </h2>
          <p className="text-xl text-gray mb-8 max-w-2xl mx-auto">
            Governance is integrated with all aspects of the Genesis Protocol
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dao-governance"
              className="px-8 py-4 bg-gradient-to-r from-accent to-signal text-primary rounded-xl font-bold hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              DAO Framework
            </Link>
            <Link
              href="/legal-bond"
              className="px-8 py-4 border-2 border-ink text-ink rounded-xl font-bold hover:bg-ink hover:text-primary transition-all duration-300"
            >
              Legal Structures
            </Link>
            <Link
              href="/scep"
              className="px-8 py-4 border-2 border-ink text-ink rounded-xl font-bold hover:bg-ink hover:text-primary transition-all duration-300"
            >
              SCEP Integration
            </Link>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}
