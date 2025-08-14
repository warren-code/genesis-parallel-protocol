'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaVoteYea, FaCoins, FaShieldAlt, FaUsers, 
  FaLock, FaClock, FaBalanceScale, FaArrowRight,
  FaExclamationTriangle, FaCheckCircle
} from 'react-icons/fa';

const DAOGovernancePage = () => {
  const antiCaptureFeatures = [
    {
      icon: FaLock,
      title: 'Non-Transferable Tokens',
      description: 'Governance tokens cannot be bought, sold, or transferred, preventing wealth accumulation attacks'
    },
    {
      icon: FaClock,
      title: 'Time-Locked Proposals',
      description: 'All proposals have mandatory cooling-off periods to prevent rushed decisions'
    },
    {
      icon: FaBalanceScale,
      title: 'Monthly Vote Limits',
      description: 'Each member has limited monthly voting power to prevent spam and encourage thoughtful participation'
    },
    {
      icon: FaShieldAlt,
      title: 'Bribery Resistance',
      description: 'Multi-signature oversight and transparent voting records prevent coercion'
    }
  ];

  const governanceModules = [
    {
      title: 'Proposal Creation',
      icon: FaVoteYea,
      link: '/dao-governance/proposals',
      description: 'Submit and develop community proposals',
      features: ['Template system', 'Collaborative drafting', 'Impact assessment']
    },
    {
      title: 'Voting Interface',
      icon: FaUsers,
      link: '/dao-governance/voting',
      description: 'Participate in democratic decision-making',
      features: ['Quadratic voting', 'Delegate options', 'Real-time results']
    },
    {
      title: 'Treasury Dashboard',
      icon: FaCoins,
      link: '/dao-governance/treasury',
      description: 'Full transparency on fund allocation',
      features: ['Real-time tracking', 'Spending reports', 'Audit trails']
    },
    {
      title: 'Role Management',
      icon: FaBalanceScale,
      link: '/dao-governance/roles',
      description: 'Permission-based access control',
      features: ['Dynamic roles', 'Term limits', 'Accountability']
    }
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-primary to-accent">
                <FaVoteYea className="text-3xl text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                <GlossaryTooltip term="DAO">DAO</GlossaryTooltip> Governance
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              Full <GlossaryTooltip term="DAO">decentralized autonomous organization</GlossaryTooltip> 
              governance suite with <GlossaryTooltip term="Anti-capture">anti-capture</GlossaryTooltip> 
              mechanisms, transparent treasury management, and role-based permissions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-gray-300">Community-driven decisions</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-gray-300">Transparent fund allocation</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-gray-300">Sybil attack resistant</span>
              </div>
              <div className="flex items-center gap-3">
                <FaCheckCircle className="text-green-400 text-xl" />
                <span className="text-gray-300">Plutocracy prevention</span>
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Anti-Capture Features */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          <GlossaryTooltip term="Anti-capture">Anti-Capture</GlossaryTooltip> Logic
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {antiCaptureFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="p-6 h-full">
                <feature.icon className="text-3xl text-primary mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400">
                  {feature.description}
                </p>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30 max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <FaExclamationTriangle className="text-yellow-500 mt-1" />
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-yellow-500">Important:</span> Unlike traditional 
              DAOs that suffer from <GlossaryTooltip term="CERL">plutocratic capture</GlossaryTooltip>, 
              Genesis Protocol implements multiple safeguards to ensure true democratic governance 
              and prevent wealth-based control.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Governance Modules */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          Governance Modules
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {governanceModules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={module.link}>
                <GlassmorphicCard className="p-6 h-full hover:border-primary/50 transition-all duration-300 group">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                      <module.icon className="text-2xl text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-text-glow-gold transition-colors">
                        {module.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
                        {module.description}
                      </p>
                      <ul className="space-y-1">
                        {module.features.map((feature, idx) => (
                          <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                            <span className="w-1 h-1 bg-primary rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <FaArrowRight className="text-gray-500 group-hover:text-primary transition-colors mt-2" />
                  </div>
                </GlassmorphicCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Governance Principles */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GlassmorphicCard className="p-8 border-2 border-primary/30">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Core Governance Principles
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className="font-semibold text-primary mb-2">Transparency</h3>
              <p className="text-sm text-gray-400">
                All decisions, votes, and treasury movements are publicly visible and auditable
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Inclusivity</h3>
              <p className="text-sm text-gray-400">
                Every member has equal voice regardless of wealth or status
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Resilience</h3>
              <p className="text-sm text-gray-400">
                Built to resist <GlossaryTooltip term="CERL">corruption loops</GlossaryTooltip> and capture attempts
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link href="/dao-governance/join">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300">
                Join the DAO
              </button>
            </Link>
          </div>
        </GlassmorphicCard>
      </motion.section>
    </div>
  );
};

export default DAOGovernancePage;
