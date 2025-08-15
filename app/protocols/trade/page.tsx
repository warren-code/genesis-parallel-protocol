'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';
import { FiTrendingUp, FiMap, FiShield, FiRefreshCw, FiUsers, FiPackage } from 'react-icons/fi';

export default function TradeProtocol() {
  const features = [
    {
      icon: <FiMap className="w-8 h-8" />,
      title: "Genesis Value Chain Map",
      description: "Real-time visualization of supply chain flows across sectors with full transparency and traceability.",
      details: [
        "Live mapping of resource flows from source to consumer",
        "Carbon footprint tracking for every product movement",
        "Labor conditions and fair wage verification",
        "Environmental impact assessment at each stage"
      ]
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "Circular Supply Networks",
      description: "Closed-loop markets connecting producers, processors, and buyers in regenerative cycles.",
      details: [
        "Waste-to-resource transformation marketplaces",
        "Byproduct exchange and valorization systems",
        "Repair, refurbishment, and upcycling networks",
        "End-of-life product recovery and processing"
      ]
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Regenerative Standards Compliance",
      description: "Automated verification that all trade activities meet ecological and social regeneration criteria.",
      details: [
        "Soil health improvement requirements for agriculture",
        "Biodiversity enhancement standards for land use",
        "Fair labor practices and community benefit verification",
        "Cultural preservation and indigenous rights protection"
      ]
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Cooperative Trade Networks",
      description: "Democratic governance of trade relationships prioritizing community needs over profit extraction.",
      details: [
        "Producer and consumer cooperatives coordination",
        "Fair pricing mechanisms based on true cost accounting",
        "Community-first distribution and access prioritization",
        "Conflict resolution and relationship mediation services"
      ]
    },
    {
      icon: <FiPackage className="w-8 h-8" />,
      title: "Local-First Distribution",
      description: "Prioritizing local production and consumption to build community resilience and reduce transport impacts.",
      details: [
        "Local food systems and seasonal eating promotion",
        "Bioregional manufacturing and resource utilization",
        "Community-supported agriculture and direct sales",
        "Local currency integration for community trade"
      ]
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Transparent Pricing",
      description: "Open-book accounting and true cost pricing that includes environmental and social externalities.",
      details: [
        "Full cost transparency including externalities",
        "Environmental damage costs built into pricing",
        "Social impact premiums for regenerative practices",
        "Democratic price discovery and fair trade mechanisms"
      ]
    }
  ];

  const valueChainComponents = [
    {
      stage: "Resource Extraction",
      description: "Ethical sourcing with regenerative impact on source ecosystems",
      metrics: [
        "Soil health improvement over baseline",
        "Biodiversity enhancement indicators",
        "Water system restoration metrics",
        "Community economic empowerment measures"
      ],
      color: "border-green-500"
    },
    {
      stage: "Processing & Manufacturing",
      description: "Clean production methods with circular resource utilization",
      metrics: [
        "Renewable energy usage percentage",
        "Waste stream elimination and valorization",
        "Worker health and safety improvements",
        "Local economic multiplier effects"
      ],
      color: "border-blue-500"
    },
    {
      stage: "Distribution & Logistics",
      description: "Low-impact transportation with community-controlled networks",
      metrics: [
        "Carbon footprint per unit transported",
        "Local distribution network development",
        "Community ownership of logistics infrastructure",
        "Transport justice and accessibility measures"
      ],
      color: "border-purple-500"
    },
    {
      stage: "Consumption & Use",
      description: "Conscious consumption patterns supporting regenerative systems",
      metrics: [
        "Product lifespan and durability standards",
        "Repair and maintenance accessibility",
        "Community sharing and library systems",
        "Educational value and skill development"
      ],
      color: "border-yellow-500"
    },
    {
      stage: "Recovery & Regeneration",
      description: "End-of-life processing that feeds back into regenerative cycles",
      metrics: [
        "Material recovery and recycling rates",
        "Composting and soil building contributions",
        "Ecosystem restoration through waste processing",
        "Next-generation product improvement feedback"
      ],
      color: "border-red-500"
    }
  ];

  const tradingMechanisms = [
    {
      mechanism: "Regenerative Impact Tokens",
      description: "Additional value tokens awarded for ecological and social restoration activities",
      implementation: [
        "Carbon sequestration credits for regenerative agriculture",
        "Biodiversity restoration bounties for habitat enhancement",
        "Community development bonuses for local capacity building",
        "Cultural preservation rewards for traditional knowledge keeping"
      ]
    },
    {
      mechanism: "True Cost Accounting",
      description: "Pricing systems that internalize all environmental and social costs",
      implementation: [
        "Environmental damage costs built into product pricing",
        "Labor dignity premiums for fair wage and conditions",
        "Community benefit requirements for resource extraction",
        "Long-term sustainability bonds and insurance"
      ]
    },
    {
      mechanism: "Democratic Price Discovery",
      description: "Community participation in determining fair and just pricing",
      implementation: [
        "Producer and consumer assemblies for price negotiation",
        "Transparent cost breakdowns and profit sharing",
        "Sliding scale pricing based on community economic capacity",
        "Emergency access provisions for essential goods and services"
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
            <div className="text-8xl mb-6">🌐</div>
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <span className="text-accent font-display text-sm uppercase tracking-widest">Regenerative Commerce</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
            Trade Protocol
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Transparent, circular supply chain markets connecting producers, processors, and buyers 
            through real-time Genesis Value Chain mapping and automated compliance to regenerative 
            standards that prioritize ecological and social well-being.
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
                Trade as Ecological Restoration
              </h2>
              <div className="h-0.5 w-24 bg-accent mx-auto mb-8" />
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Current trade systems prioritize <span className="text-accent font-semibold">profit extraction</span> over 
                  ecological health, creating supply chains that externalize environmental and social costs 
                  while concentrating wealth in the hands of intermediaries.
                </p>
                <p>
                  The Trade Protocol transforms commerce into <span className="text-white font-semibold">regenerative restoration</span>, 
                  ensuring every transaction contributes to ecological healing, community resilience, 
                  and the flourishing of all life within the trading network.
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

        {/* Value Chain Components */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Genesis Value Chain Components
          </h2>
          <div className="space-y-8">
            {valueChainComponents.map((component, index) => (
              <motion.div
                key={component.stage}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className={`p-8 border-l-4 ${component.color}`}>
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {component.stage}
                      </h3>
                      <p className="text-gray-400 text-sm">{component.description}</p>
                    </div>
                    <div className="lg:w-2/3">
                      <h4 className="text-lg font-semibold text-white mb-4">Regenerative Metrics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {component.metrics.map((metric, idx) => (
                          <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                            <div className="w-1.5 h-1.5 bg-signal rounded-full flex-shrink-0 mt-2" />
                            <span className="text-gray-300 text-sm">{metric}</span>
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

        {/* Trading Mechanisms */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Regenerative Trading Mechanisms
          </h2>
          <div className="space-y-8">
            {tradingMechanisms.map((mechanism, index) => (
              <motion.div
                key={mechanism.mechanism}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className="p-8 border-l-4 border-accent/70">
                  <h3 className="text-2xl font-semibold text-accent mb-4">
                    {mechanism.mechanism}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {mechanism.description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mechanism.implementation.map((item, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-300 text-sm">{item}</span>
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
              Implementation Framework
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Technology Stack</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Blockchain Traceability:</strong> Immutable record of product journey and impact</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>IoT Sensors:</strong> Real-time monitoring of environmental and social conditions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>AI Impact Assessment:</strong> Automated compliance checking and optimization</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Decentralized Marketplaces:</strong> Peer-to-peer trading without extractive middlemen</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Governance Mechanisms</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Producer Cooperatives:</strong> Democratic control of supply chain decisions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Consumer Assemblies:</strong> Community participation in trade standard setting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Ecosystem Stewardship Councils:</strong> Environmental protection oversight</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Conflict Resolution Networks:</strong> Mediation and relationship repair systems</span>
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
              Transform Commerce into Regeneration
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to build trade systems that heal rather than extract? Download the Trade Protocol 
              and start creating transparent, regenerative supply chains that serve life and community.
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
                Join Trade Network
              </motion.button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
