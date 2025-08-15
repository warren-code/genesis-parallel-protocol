'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';
import { FiDollarSign, FiRefreshCw, FiShield, FiTrendingUp, FiUsers, FiDatabase } from 'react-icons/fi';

export default function FinanceProtocol() {
  const features = [
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "Tokenized Loop Economy",
      description: "Currency model tied to regenerative cycles, eliminating debt-based extraction and speculation.",
      details: [
        "Value backed by regenerative contributions",
        "Automatic loop rewards for positive actions",
        "Wealth caps to prevent excessive accumulation",
        "Democratic monetary policy through DAO governance"
      ]
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Inflation Dampening",
      description: "Built-in mechanisms that automatically adjust supply and demand to maintain purchasing power stability.",
      details: [
        "Algorithmic supply adjustments based on usage",
        "Velocity-based monetary controls",
        "Ecosystem health indicators as economic signals",
        "Community resilience index integration"
      ]
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "SRL Reward Incentives",
      description: "Stable Recursive Loop rewards that encourage regenerative behaviors and system contributions.",
      details: [
        "Environmental restoration rewards",
        "Community care and mutual aid bonuses",
        "Knowledge sharing and education incentives",
        "Innovation and tool development rewards"
      ]
    },
    {
      icon: <FiDatabase className="w-8 h-8" />,
      title: "Decentralized Escrow",
      description: "Trustless transaction systems for secure peer-to-peer exchanges without intermediaries.",
      details: [
        "Smart contract automated settlements",
        "Multi-signature security protocols",
        "Dispute resolution through community juries",
        "Cross-protocol interoperability"
      ]
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community Treasury",
      description: "Collectively managed funds for infrastructure, research, and mutual aid programs.",
      details: [
        "Transparent budget allocation processes",
        "Democratic funding proposal systems",
        "Impact measurement and accountability",
        "Emergency response fund management"
      ]
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Universal Basic Assets",
      description: "Guaranteed access to essential resources and economic participation for all community members.",
      details: [
        "Housing, food, and healthcare guarantees",
        "Education and skill development access",
        "Technology and tool sharing programs",
        "Entrepreneurship and creative support"
      ]
    }
  ];

  const economicPrinciples = [
    {
      principle: "Regenerative Value Creation",
      description: "Economic value flows toward activities that restore and enhance social and ecological systems",
      examples: [
        "Carbon sequestration farming receives higher token rewards",
        "Community care work valued equally with technical labor",
        "Waste reduction and recycling generate circular economy tokens",
        "Biodiversity enhancement projects receive ecosystem service payments"
      ]
    },
    {
      principle: "Wealth Distribution Mechanisms",
      description: "Automatic systems prevent excessive accumulation and ensure equitable resource access",
      examples: [
        "Maximum wealth ratios (e.g., 10:1 between highest and lowest earners)",
        "Progressive contribution scales based on resource abundance",
        "Wealth decay algorithms for unused holdings",
        "Gift economy integration for surplus redistribution"
      ]
    },
    {
      principle: "Democratic Economic Governance",
      description: "Community members collectively decide monetary policy and resource allocation",
      examples: [
        "Quarterly token supply adjustment votes",
        "Community budget prioritization assemblies",
        "Economic policy proposal and voting systems",
        "Impact assessment and course correction mechanisms"
      ]
    }
  ];

  const tokenomics = [
    {
      tokenType: "Genesis Tokens (GEN)",
      purpose: "Primary medium of exchange for goods and services",
      issuance: "Minted based on regenerative contributions and community needs",
      backing: "Backed by real-world assets and ecosystem services",
      features: [
        "Stable purchasing power through algorithmic controls",
        "Democratic governance of monetary policy",
        "Anti-speculation mechanisms",
        "Cross-community interoperability"
      ]
    },
    {
      tokenType: "Stewardship Tokens (STEW)",
      purpose: "Non-transferable governance tokens for long-term community members",
      issuance: "Earned through consistent positive contributions over time",
      backing: "Reputation and trust within the community network",
      features: [
        "Cannot be bought, sold, or transferred",
        "Voting power increases with community tenure",
        "Access to advanced governance proposals",
        "Mentorship and knowledge sharing incentives"
      ]
    },
    {
      tokenType: "Resource Tokens (RES)",
      purpose: "Specific allocation tokens for scarce or specialized resources",
      issuance: "Distributed based on need algorithms and community priorities",
      backing: "Direct claims on physical resources and services",
      features: [
        "Housing access tokens",
        "Healthcare service allocation",
        "Education and skill development credits",
        "Emergency assistance reserves"
      ]
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
            <div className="text-8xl mb-6">💰</div>
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <span className="text-accent font-display text-sm uppercase tracking-widest">Economic Sovereignty</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
            Finance Protocol
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Non-debt-based tokenized loop economies replacing extractive fiat systems through 
            automatic inflation dampening, SRL reward incentives, and decentralized escrow 
            for truly trustless transactions.
          </p>
        </div>

        {/* Core Philosophy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-24"
        >
          <GlassmorphicCard blur="lg" opacity={0.15} borderGlow className="p-12 md:p-16">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8">
                Beyond Debt Slavery
              </h2>
              <div className="h-0.5 w-24 bg-accent mx-auto mb-8" />
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  The current monetary system is built on <span className="text-accent font-semibold">debt extraction</span>, 
                  requiring endless growth on a finite planet while concentrating wealth in the hands of the few.
                </p>
                <p>
                  The Finance Protocol creates <span className="text-white font-semibold">abundance-based economics</span> where 
                  currency is issued to reward regenerative contributions, not to trap communities in cycles of extraction and scarcity.
                </p>
              </div>
            </div>
          </GlassmorphicCard>
        </motion.div>

        {/* Features Grid */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Protocol Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className="p-8 h-full border-l-4 border-accent/50 hover:border-accent transition-all group">
                  <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-2 text-sm text-gray-500">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <div className="w-1 h-1 bg-accent rounded-full" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Economic Principles */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Economic Principles
          </h2>
          <div className="space-y-8">
            {economicPrinciples.map((principle, index) => (
              <motion.div
                key={principle.principle}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className="p-8 border-l-4 border-signal/70">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {principle.principle}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {principle.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {principle.examples.map((example, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <div className="w-2 h-2 bg-signal rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-300 text-sm">{example}</span>
                      </div>
                    ))}
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tokenomics */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Token Economics
          </h2>
          <div className="space-y-8">
            {tokenomics.map((token, index) => (
              <motion.div
                key={token.tokenType}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className="p-8 border-l-4 border-accent/70">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6">
                    <div className="lg:w-1/2 mb-6 lg:mb-0">
                      <h3 className="text-2xl font-semibold text-accent mb-2">
                        {token.tokenType}
                      </h3>
                      <p className="text-gray-400 mb-4">{token.purpose}</p>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-white font-medium">Issuance: </span>
                          <span className="text-gray-300">{token.issuance}</span>
                        </div>
                        <div>
                          <span className="text-white font-medium">Backing: </span>
                          <span className="text-gray-300">{token.backing}</span>
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <h4 className="text-lg font-semibold text-white mb-4">Key Features</h4>
                      <div className="space-y-3">
                        {token.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0 mt-2" />
                            <span className="text-gray-300 text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Implementation Architecture */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <GlassmorphicCard blur="md" className="p-12 border-2 border-accent/30">
            <h2 className="text-3xl font-display font-semibold text-accent mb-8 text-center">
              Technical Implementation
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Blockchain Layer</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Substrate-based Parachain:</strong> Interoperable with Polkadot ecosystem</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Proof of Contribution:</strong> Consensus based on community value creation</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Smart Contract Platform:</strong> Automated escrow and reward distribution</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Cross-chain Bridges:</strong> Integration with existing ecosystems</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Economic Algorithms</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Velocity-based Supply Control:</strong> Inflation adjusts to spending patterns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Contribution Measurement:</strong> AI-assisted impact assessment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Resource Allocation:</strong> Need-based distribution algorithms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Anti-Gaming Mechanisms:</strong> Sybil resistance and wealth caps</span>
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
              Build Economic Sovereignty
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to implement regenerative economics in your community? Download the Finance Protocol 
              and start building abundance-based currency systems that serve life, not extraction.
            </p>
            <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 bg-accent text-primary font-semibold rounded-xl transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25"
              >
                Download Protocol
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto px-8 py-4 border-2 border-accent text-accent font-semibold rounded-xl transition-all hover:bg-accent/10"
              >
                Join Economic DAO
              </motion.button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
