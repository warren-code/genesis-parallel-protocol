'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';
import { FiFileText, FiSearch, FiShield, FiZap, FiUsers, FiEye } from 'react-icons/fi';

export default function FoiaProtocol() {
  const features = [
    {
      icon: <FiSearch className="w-8 h-8" />,
      title: "Automated Document Discovery",
      description: "AI-powered systems that identify, catalog, and prioritize documents for strategic FOIA requests.",
      details: [
        "Machine learning analysis of government document patterns",
        "Cross-reference detection for related information requests",
        "Priority scoring based on public interest and impact potential",
        "Automated filing calendar and deadline management"
      ]
    },
    {
      icon: <FiFileText className="w-8 h-8" />,
      title: "Multi-Jurisdictional Request System",
      description: "Coordinated FOIA requests across federal, state, and local levels with unified tracking and management.",
      details: [
        "Simultaneous filing across multiple agencies",
        "Jurisdiction-specific form generation and compliance",
        "Appeal process automation and escalation tracking",
        "International transparency law integration"
      ]
    },
    {
      icon: <FiEye className="w-8 h-8" />,
      title: "Public Release Workflows",
      description: "Streamlined processes for analyzing, redacting, and publishing obtained documents for maximum impact.",
      details: [
        "Automated redaction detection and analysis",
        "Collaborative document review and verification",
        "Strategic release timing and media coordination",
        "Public access portal with searchable document databases"
      ]
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Liquefaction Protocol Integration",
      description: "Systematic exposure of Babylonian corruption through coordinated transparency and legal action campaigns.",
      details: [
        "Strategic document release for maximum systemic impact",
        "Coordinated media campaigns and public education",
        "Legal action coordination and class action facilitation",
        "Network effect amplification through community organizing"
      ]
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Whistleblower Protection",
      description: "Secure channels and legal support for insiders exposing government and corporate corruption.",
      details: [
        "Anonymous document submission and verification systems",
        "Legal defense fund and representation coordination",
        "Secure communication and identity protection protocols",
        "Community support networks for whistleblower safety"
      ]
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community Coordination",
      description: "Decentralized networks of researchers, journalists, and activists working together on transparency campaigns.",
      details: [
        "Collaborative research and investigation tools",
        "Distributed legal action and advocacy coordination",
        "Public education and awareness campaign management",
        "Community decision-making on investigation priorities"
      ]
    }
  ];

  const liquefactionStrategies = [
    {
      strategy: "Information Cascades",
      description: "Strategic document release timing to create maximum systemic pressure and public awareness",
      tactics: [
        "Coordinated release across multiple media outlets",
        "Sequential revelation building narrative pressure",
        "Cross-referenced evidence creating undeniable patterns",
        "Public education campaigns explaining significance and impact"
      ]
    },
    {
      strategy: "Legal Pressure Campaigns",
      description: "Multi-pronged legal action to force compliance and create precedent for transparency",
      tactics: [
        "Class action lawsuits representing affected communities",
        "Criminal referrals for clear violations of law",
        "Civil rights actions challenging systematic oppression",
        "International human rights complaints and oversight"
      ]
    },
    {
      strategy: "Network Disruption",
      description: "Exposing and dismantling networks of corruption through systematic transparency",
      tactics: [
        "Mapping corruption networks through document analysis",
        "Exposing financial flows and conflicts of interest",
        "Revealing coordination between government and corporate actors",
        "Highlighting patterns of regulatory capture and institutional betrayal"
      ]
    }
  ];

  const technicalCapabilities = [
    {
      capability: "AI-Powered Document Analysis",
      description: "Advanced natural language processing and pattern recognition for document discovery",
      tools: [
        "Semantic search and topic modeling for document categorization",
        "Entity extraction and relationship mapping",
        "Redaction analysis and information reconstruction",
        "Cross-document correlation and verification"
      ],
      color: "border-blue-500"
    },
    {
      capability: "Secure Communication Systems",
      description: "Military-grade encryption and anonymization for source protection",
      tools: [
        "End-to-end encrypted submission portals",
        "Tor-based anonymous access and communication",
        "Decentralized storage with redundant backups",
        "Self-destructing message systems for sensitive communications"
      ],
      color: "border-green-500"
    },
    {
      capability: "Legal Automation Tools",
      description: "Streamlined filing, tracking, and management of transparency requests",
      tools: [
        "Automated form generation and submission",
        "Deadline tracking and appeal management",
        "Cost calculation and fee waiver automation",
        "Compliance verification and error detection"
      ],
      color: "border-purple-500"
    },
    {
      capability: "Public Engagement Platforms",
      description: "Community-driven investigation and impact amplification systems",
      tools: [
        "Collaborative investigation and annotation tools",
        "Public voting on investigation priorities",
        "Social media integration for awareness campaigns",
        "Educational resources and training materials"
      ],
      color: "border-yellow-500"
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
            <div className="text-8xl mb-6">🔍</div>
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <span className="text-accent font-display text-sm uppercase tracking-widest">Radical Transparency</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
            FOIA Protocol
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Structured, multi-jurisdictional Freedom of Information Act request and legal action system 
            that automates document discovery, public release workflows, and integrates with 
            Liquefaction Protocols for exposing Babylonian corruption through radical transparency.
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
                Sunlight as Disinfectant
              </h2>
              <div className="h-0.5 w-24 bg-accent mx-auto mb-8" />
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  <span className="text-accent font-semibold">Babylonian corruption</span> thrives in darkness, 
                  behind closed doors where power brokers make deals that extract wealth 
                  and resources while externalizing costs to communities and ecosystems.
                </p>
                <p>
                  The FOIA Protocol weaponizes <span className="text-white font-semibold">radical transparency</span>, 
                  using coordinated information requests, legal pressure, and strategic document releases 
                  to expose the networks of extraction and create unstoppable momentum for systemic change.
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

        {/* Liquefaction Strategies */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Liquefaction Strategies
          </h2>
          <div className="space-y-8">
            {liquefactionStrategies.map((strategy, index) => (
              <motion.div
                key={strategy.strategy}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className="p-8 border-l-4 border-signal/70">
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {strategy.strategy}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {strategy.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {strategy.tactics.map((tactic, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <div className="w-2 h-2 bg-signal rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-300 text-sm">{tactic}</span>
                      </div>
                    ))}
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Capabilities */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Technical Capabilities
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {technicalCapabilities.map((capability, index) => (
              <motion.div
                key={capability.capability}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className={`p-8 border-l-4 ${capability.color} h-full`}>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {capability.capability}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {capability.description}
                  </p>
                  <div className="space-y-3">
                    {capability.tools.map((tool, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-300 text-sm">{tool}</span>
                      </div>
                    ))}
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Implementation Framework */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <GlassmorphicCard blur="md" className="p-12 border-2 border-accent/30">
            <h2 className="text-3xl font-display font-semibold text-accent mb-8 text-center">
              Implementation Phases
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Phase 1: Foundation</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span>Deploy secure communication infrastructure</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span>Build automated FOIA filing systems</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span>Recruit and train volunteer researchers</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span>Establish legal support network</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Phase 2: Scaling</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span>Launch multi-jurisdictional campaigns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span>Integrate AI document analysis tools</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span>Build public engagement platforms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span>Coordinate with media and advocacy organizations</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Phase 3: Liquefaction</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">•</span>
                    <span>Execute coordinated exposure campaigns</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">•</span>
                    <span>Launch systematic legal challenges</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">•</span>
                    <span>Create unstoppable momentum for reform</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-red-400">•</span>
                    <span>Dismantle networks of extraction</span>
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
              Expose the Truth, Transform the System
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to weaponize transparency against corruption? Download the FOIA Protocol 
              and start building the infrastructure needed to expose Babylonian networks 
              and accelerate systemic transformation.
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
                Join Transparency Network
              </motion.button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
