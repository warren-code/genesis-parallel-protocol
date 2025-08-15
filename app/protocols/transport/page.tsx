'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';
import { FiTruck, FiMapPin, FiZap, FiShield, FiCpu, FiUsers } from 'react-icons/fi';

export default function TransportProtocol() {
  const features = [
    {
      icon: <FiMapPin className="w-8 h-8" />,
      title: "Autonomous Routing",
      description: "AI-driven pathfinding that optimizes for efficiency, sustainability, and network resilience.",
      details: [
        "Real-time traffic analysis and prediction",
        "Dynamic route optimization for multiple objectives",
        "Swarm intelligence for fleet coordination",
        "Emergency response and disaster routing"
      ]
    },
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Renewable Energy Integration",
      description: "Solar, wind, and fusion-powered transport infrastructure with energy sharing networks.",
      details: [
        "Solar charging networks along transport corridors",
        "Wind-assisted propulsion systems",
        "Fusion-powered long-haul vessels",
        "Peer-to-peer energy trading between vehicles"
      ]
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "∞⃝ Glyph Signalling",
      description: "Cryptographically secured communication protocol for SCEP-aware transit systems.",
      details: [
        "Quantum-resistant encryption",
        "Decentralized identity verification",
        "Mesh network resilience",
        "Privacy-preserving location services"
      ]
    },
    {
      icon: <FiCpu className="w-8 h-8" />,
      title: "Loop-Efficient Operations",
      description: "Circular resource flows optimized for continuous, non-wasteful transport cycles.",
      details: [
        "Vehicle-to-vehicle resource sharing",
        "Predictive maintenance cycles",
        "Material recovery and reuse",
        "Energy regeneration during operation"
      ]
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community Governance",
      description: "Decentralized management of transport networks through DAO structures.",
      details: [
        "Route planning through community consensus",
        "Fair pricing mechanisms",
        "Maintenance scheduling via tokens",
        "Conflict resolution protocols"
      ]
    },
    {
      icon: <FiTruck className="w-8 h-8" />,
      title: "Multi-Modal Integration",
      description: "Seamless coordination between air, land, sea, and space transport systems.",
      details: [
        "Unified booking and payment systems",
        "Cargo transfer automation",
        "Emergency backup routing",
        "Load balancing across modes"
      ]
    }
  ];

  const implementationPhases = [
    {
      phase: "Phase 1: Local Networks",
      timeline: "0-6 months",
      description: "Establish autonomous routing for local communities",
      milestones: [
        "Deploy mesh communication networks",
        "Implement basic route optimization",
        "Launch community governance protocols",
        "Begin solar charging infrastructure"
      ]
    },
    {
      phase: "Phase 2: Regional Integration",
      timeline: "6-18 months",
      description: "Connect local networks into regional transport webs",
      milestones: [
        "Establish inter-community routes",
        "Deploy renewable energy corridors",
        "Integrate multi-modal systems",
        "Launch ∞⃝ glyph signalling protocol"
      ]
    },
    {
      phase: "Phase 3: Global Coordination",
      timeline: "18+ months",
      description: "Create planetary transport sovereignty",
      milestones: [
        "Activate global routing intelligence",
        "Deploy space transport interfaces",
        "Complete energy independence",
        "Achieve full SCEP integration"
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
            <div className="text-8xl mb-6">🚀</div>
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <span className="text-accent font-display text-sm uppercase tracking-widest">∞⃝ Protocol</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
            Transport Protocol
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Decentralized, loop-efficient movement of goods, people, and information through 
            autonomous routing, renewable energy logistics, and secure ∞⃝ glyph signalling 
            for SCEP-aware transit systems.
          </p>
        </div>

        {/* Core Principles */}
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
                Movement as Liberation
              </h2>
              <div className="h-0.5 w-24 bg-accent mx-auto mb-8" />
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  True sovereignty requires <span className="text-accent font-semibold">freedom of movement</span>. 
                  The Transport Protocol dismantles centralized control over mobility, creating networks that 
                  serve communities rather than extract from them.
                </p>
                <p>
                  Through <span className="text-white font-semibold">autonomous coordination</span> and 
                  <span className="text-white font-semibold"> renewable energy integration</span>, we eliminate 
                  dependency on extractive transport monopolies while building resilient, community-owned infrastructure.
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

        {/* Implementation Roadmap */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Implementation Roadmap
          </h2>
          <div className="space-y-8">
            {implementationPhases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className="p-8 border-l-4 border-signal/70">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-6">
                    <div>
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {phase.phase}
                      </h3>
                      <p className="text-gray-400">{phase.description}</p>
                    </div>
                    <div className="mt-4 lg:mt-0">
                      <span className="inline-flex items-center px-4 py-2 rounded-full bg-signal/20 text-signal text-sm font-medium">
                        {phase.timeline}
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {phase.milestones.map((milestone, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 rounded-lg bg-white/5">
                        <div className="w-2 h-2 bg-signal rounded-full flex-shrink-0" />
                        <span className="text-gray-300 text-sm">{milestone}</span>
                      </div>
                    ))}
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <GlassmorphicCard blur="md" className="p-12 border-2 border-accent/30">
            <h2 className="text-3xl font-display font-semibold text-accent mb-8 text-center">
              Technical Architecture
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Core Systems</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Mesh Networking:</strong> Decentralized communication backbone</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>AI Routing Engine:</strong> Multi-objective optimization algorithms</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Energy Grid:</strong> Peer-to-peer energy trading protocols</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Governance Layer:</strong> DAO-based decision making</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Security Features</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Quantum Encryption:</strong> Future-proof security protocols</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Zero-Knowledge Identity:</strong> Privacy-preserving verification</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Network Resilience:</strong> Self-healing infrastructure</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Anti-Surveillance:</strong> Location privacy protection</span>
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
              Begin Transport Sovereignty
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to implement decentralized transport in your community? Download the 
              complete protocol specifications and start building freedom of movement.
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
                Join Community
              </motion.button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
