'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';
import { FiHome, FiUsers, FiRefreshCw, FiSettings, FiDatabase } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa';

export default function HousingProtocol() {
  const features = [
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "DAO-Managed Infrastructure",
      description: "Community-owned housing networks with transparent governance and shared decision-making.",
      details: [
        "Resident voting on major infrastructure decisions",
        "Transparent treasury management",
        "Democratic maintenance prioritization",
        "Community-driven development planning"
      ]
    },
    {
      icon: <FiRefreshCw className="w-8 h-8" />,
      title: "Circular Resource Flows",
      description: "Closed-loop systems for construction materials, water, and energy with zero waste principles.",
      details: [
        "Reclaimed and recycled building materials",
        "Greywater recycling and treatment systems",
        "Rainwater harvesting and storage",
        "Waste-to-energy conversion systems"
      ]
    },
    {
      icon: <FiHome className="w-8 h-8" />,
      title: "Cooperative Ownership",
      description: "Shared equity models that eliminate speculation and ensure housing remains affordable.",
      details: [
        "Limited equity cooperative structures",
        "Community land trust integration",
        "Resident equity building programs",
        "Anti-speculation protection mechanisms"
      ]
    },
    {
      icon: <FiSettings className="w-8 h-8" />,
      title: "Automated Maintenance",
      description: "Smart systems for predictive maintenance, energy optimization, and resource management.",
      details: [
        "IoT sensor networks for early detection",
        "Automated scheduling of maintenance tasks",
        "Energy consumption optimization",
        "Resource usage monitoring and alerts"
      ]
    },
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Regenerative Design",
      description: "Biomimetic architecture and permaculture integration that enhances local ecosystems.",
      details: [
        "Living building materials and green roofs",
        "Permaculture food production systems",
        "Native species habitat integration",
        "Carbon sequestration through design"
      ]
    },
    {
      icon: <FiDatabase className="w-8 h-8" />,
      title: "Equitable Access Systems",
      description: "Fair allocation mechanisms ensuring housing access based on need, not wealth.",
      details: [
        "Need-based allocation algorithms",
        "Sliding scale contribution systems",
        "Skills-sharing work programs",
        "Community care integration"
      ]
    }
  ];

  const infrastructureSystems = [
    {
      category: "Energy Systems",
      systems: [
        "Solar panel microgrids with battery storage",
        "Geothermal heating and cooling networks",
        "Wind micro-turbines for supplemental power",
        "Peer-to-peer energy trading platforms"
      ],
      color: "border-yellow-500"
    },
    {
      category: "Water Systems",
      systems: [
        "Atmospheric water generation units",
        "Greywater treatment and recycling",
        "Rainwater harvesting with filtration",
        "Blackwater composting systems"
      ],
      color: "border-blue-500"
    },
    {
      category: "Food Systems",
      systems: [
        "Vertical farming towers in common areas",
        "Permaculture gardens and food forests",
        "Community kitchens with tool libraries",
        "Composting and soil regeneration hubs"
      ],
      color: "border-green-500"
    },
    {
      category: "Materials Systems",
      systems: [
        "On-site 3D printing with recycled materials",
        "Modular construction component libraries",
        "Bio-based insulation and building materials",
        "Repair cafes and tool sharing networks"
      ],
      color: "border-purple-500"
    }
  ];

  const governanceStructure = [
    {
      level: "Household Level",
      description: "Individual dwellings with private decision-making autonomy",
      powers: [
        "Interior design and personal modifications",
        "Individual resource usage allocation",
        "Personal contribution method selection",
        "Privacy and access control settings"
      ]
    },
    {
      level: "Building Level",
      description: "Small groups managing shared building infrastructure",
      powers: [
        "Common area maintenance and upgrades",
        "Building-level resource sharing policies",
        "Noise and community living guidelines",
        "Minor infrastructure modifications"
      ]
    },
    {
      level: "Community Level",
      description: "Neighborhood-scale coordination and major decisions",
      powers: [
        "Major infrastructure development",
        "Community resource allocation",
        "Conflict resolution and mediation",
        "External partnership agreements"
      ]
    },
    {
      level: "Network Level",
      description: "Inter-community coordination and resource sharing",
      powers: [
        "Protocol standard development",
        "Inter-community resource trading",
        "Knowledge and technology sharing",
        "Collective advocacy and representation"
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
            <div className="text-8xl mb-6">🏘️</div>
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <span className="text-accent font-display text-sm uppercase tracking-widest">Habitat Protocol</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
            Housing Protocol
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            DAO-managed housing infrastructure ensuring circular resource flows, equitable access, 
            and regenerative design through cooperative ownership, automated maintenance scheduling, 
            and local ecosystem integration.
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
                Housing as Human Right
              </h2>
              <div className="h-0.5 w-24 bg-accent mx-auto mb-8" />
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Shelter is not a commodity to be bought and sold, but a <span className="text-accent font-semibold">fundamental right</span> 
                  that forms the foundation of human dignity and community resilience.
                </p>
                <p>
                  The Housing Protocol eliminates the extractive landlord-tenant relationship, replacing it with 
                  <span className="text-white font-semibold"> cooperative ownership</span> that builds equity for residents 
                  while ensuring permanent affordability through community stewardship.
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

        {/* Infrastructure Systems */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Infrastructure Systems
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {infrastructureSystems.map((system, index) => (
              <motion.div
                key={system.category}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className={`p-8 border-l-4 ${system.color} h-full`}>
                  <h3 className="text-2xl font-semibold text-white mb-6">
                    {system.category}
                  </h3>
                  <div className="space-y-4">
                    {system.systems.map((item, idx) => (
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

        {/* Governance Structure */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Nested Governance Structure
          </h2>
          <div className="space-y-6">
            {governanceStructure.map((level, index) => (
              <motion.div
                key={level.level}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className="p-8 border-l-4 border-signal/70">
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between">
                    <div className="lg:w-1/3 mb-6 lg:mb-0">
                      <h3 className="text-2xl font-semibold text-white mb-2">
                        {level.level}
                      </h3>
                      <p className="text-gray-400 text-sm">{level.description}</p>
                    </div>
                    <div className="lg:w-2/3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {level.powers.map((power, idx) => (
                          <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                            <div className="w-1.5 h-1.5 bg-signal rounded-full flex-shrink-0 mt-2" />
                            <span className="text-gray-300 text-sm">{power}</span>
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

        {/* Economic Model */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <GlassmorphicCard blur="md" className="p-12 border-2 border-accent/30">
            <h2 className="text-3xl font-display font-semibold text-accent mb-8 text-center">
              Cooperative Economic Model
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Ownership Structure</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Community Land Trust:</strong> Land owned permanently by community</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Limited Equity Cooperative:</strong> Resident ownership of improvements</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Shared Infrastructure:</strong> Common systems owned collectively</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Democratic Control:</strong> One resident, one vote governance</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Contribution Systems</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Sliding Scale Housing Costs:</strong> Based on income and family size</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Work Contribution:</strong> Skills and labor for community maintenance</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Resource Sharing:</strong> Tools, vehicles, and equipment libraries</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Care Networks:</strong> Childcare, eldercare, and mutual aid</span>
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
              Create Housing Justice
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to build cooperative housing in your community? Download the protocol 
              specifications and start creating permanently affordable, community-owned homes.
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
                Find Local Groups
              </motion.button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
