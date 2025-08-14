'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBolt, FaSolarPanel, FaRecycle, FaLeaf, FaWind, 
  FaBatteryFull, FaIndustry, FaHome, FaChartLine,
  FaNetworkWired, FaShieldAlt, FaUsers, FaCoins,
  FaSeedling, FaFire, FaWater, FaAtom, FaBook
} from 'react-icons/fa';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { GlossarySection } from '@/components/GlossarySection';
import Link from 'next/link';

const EnergyPage = () => {
  const energySystems = [
    {
      icon: <FaLeaf className="text-3xl" />,
      title: "Biomethane Production",
      description: "Community-scale anaerobic digestion converting organic waste into renewable gas",
      features: [
        "Food waste to energy conversion",
        "Agricultural residue processing",
        "Digestate for soil enrichment",
        "Local grid independence"
      ]
    },
    {
      icon: <FaSeedling className="text-3xl" />,
      title: "Biodiesel Networks",
      description: "Waste oil collection and processing for vehicle fuel sovereignty",
      features: [
        "Restaurant oil collection loops",
        "Algae biofuel cultivation",
        "Community fuel cooperatives",
        "Fleet conversion programs"
      ]
    },
    {
      icon: <FaSolarPanel className="text-3xl" />,
      title: "Solar Microgrids",
      description: "Distributed solar with community battery storage and peer-to-peer trading",
      features: [
        "Rooftop solar arrays",
        "Community battery banks",
        "Smart grid management",
        "Energy credit systems"
      ]
    },
    {
      icon: <FaRecycle className="text-3xl" />,
      title: "Waste-to-Energy",
      description: "Advanced thermal and biological processing of non-recyclable waste",
      features: [
        "Plasma gasification systems",
        "Pyrolysis oil production",
        "Heat recovery networks",
        "Zero landfill targets"
      ]
    }
  ];

  const implementationPhases = [
    {
      phase: "Foundation",
      duration: "Months 1-6",
      tasks: [
        "Community energy audit",
        "Resource flow mapping",
        "Technology assessment",
        "Cooperative formation"
      ]
    },
    {
      phase: "Pilot Systems",
      duration: "Months 6-12",
      tasks: [
        "First biomethane digester",
        "Solar demo installations",
        "Waste oil collection routes",
        "Smart meter deployment"
      ]
    },
    {
      phase: "Scale & Integrate",
      duration: "Months 12-24",
      tasks: [
        "Multi-site deployment",
        "Grid interconnection",
        "Storage network build",
        "Revenue sharing launch"
      ]
    },
    {
      phase: "Full Autonomy",
      duration: "Year 2+",
      tasks: [
        "Complete energy sovereignty",
        "Export surplus energy",
        "Technology manufacturing",
        "Regional replication"
      ]
    }
  ];

  const economicMetrics = [
    { metric: "Energy Cost Reduction", value: "60-80%", description: "vs. grid dependence" },
    { metric: "Local Job Creation", value: "15-20", description: "per MW capacity" },
    { metric: "Carbon Reduction", value: "85%+", description: "lifecycle emissions" },
    { metric: "ROI Timeline", value: "3-5 years", description: "full system payback" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <div className="p-4 rounded-xl bg-gradient-to-br from-yellow-500 to-orange-500">
            <FaBolt className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Energy Sovereignty
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              Localised, closed-loop renewable systems for community resilience
            </p>
          </div>
        </div>
      </motion.div>

      {/* Core Principle */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-yellow-500/20">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Core Principle</h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Energy is the foundation of sovereignty. By creating <GlossaryTooltip term="Loop Economics">closed-loop</GlossaryTooltip> energy 
            systems that convert local waste into power, communities break free from extractive utility monopolies. 
            Every watt generated locally is a watt of independence, every BTU recovered is value retained.
          </p>
          <div className="mt-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
            <p className="text-sm text-yellow-300">
              <strong>Key Insight:</strong> Traditional energy systems extract wealth through centralized control. 
              Loop energy systems distribute both power generation and economic benefits throughout the community.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Energy Systems Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaNetworkWired className="text-yellow-400" />
          Integrated Energy Systems
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {energySystems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 hover:shadow-lg hover:shadow-yellow-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20 text-yellow-400">
                  {system.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{system.title}</h3>
                  <p className="text-gray-400 mb-4">{system.description}</p>
                  <ul className="space-y-2">
                    {system.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <FaBolt className="text-yellow-500 mt-1 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technical Architecture */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaAtom className="text-yellow-400" />
          Technical Architecture
        </h2>
        <div className="glassmorphic-card p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-400">Generation Layer</h3>
              <div className="space-y-3">
                <div className="p-3 bg-black/50 rounded-lg border border-yellow-500/20">
                  <p className="text-sm font-medium text-white">Distributed Sources</p>
                  <p className="text-xs text-gray-400 mt-1">Solar, wind, biomass, waste heat</p>
                </div>
                <div className="p-3 bg-black/50 rounded-lg border border-yellow-500/20">
                  <p className="text-sm font-medium text-white">Smart Inverters</p>
                  <p className="text-xs text-gray-400 mt-1">Grid-forming capabilities</p>
                </div>
                <div className="p-3 bg-black/50 rounded-lg border border-yellow-500/20">
                  <p className="text-sm font-medium text-white">IoT Monitoring</p>
                  <p className="text-xs text-gray-400 mt-1">Real-time production tracking</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-orange-400">Storage & Distribution</h3>
              <div className="space-y-3">
                <div className="p-3 bg-black/50 rounded-lg border border-orange-500/20">
                  <p className="text-sm font-medium text-white">Community Batteries</p>
                  <p className="text-xs text-gray-400 mt-1">Neighborhood-scale storage</p>
                </div>
                <div className="p-3 bg-black/50 rounded-lg border border-orange-500/20">
                  <p className="text-sm font-medium text-white">Peer-to-Peer Grid</p>
                  <p className="text-xs text-gray-400 mt-1">Direct energy trading</p>
                </div>
                <div className="p-3 bg-black/50 rounded-lg border border-orange-500/20">
                  <p className="text-sm font-medium text-white">Load Balancing AI</p>
                  <p className="text-xs text-gray-400 mt-1">Demand response optimization</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-red-400">Economic Layer</h3>
              <div className="space-y-3">
                <div className="p-3 bg-black/50 rounded-lg border border-red-500/20">
                  <p className="text-sm font-medium text-white">Energy Credits</p>
                  <p className="text-xs text-gray-400 mt-1">Local currency for kWh</p>
                </div>
                <div className="p-3 bg-black/50 rounded-lg border border-red-500/20">
                  <p className="text-sm font-medium text-white">Revenue Sharing</p>
                  <p className="text-xs text-gray-400 mt-1">Automatic distribution</p>
                </div>
                <div className="p-3 bg-black/50 rounded-lg border border-red-500/20">
                  <p className="text-sm font-medium text-white">Green Bonds</p>
                  <p className="text-xs text-gray-400 mt-1">Community investment</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Implementation Timeline */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaChartLine className="text-yellow-400" />
          Implementation Roadmap
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {implementationPhases.map((phase, index) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="relative"
            >
              <div className="glassmorphic-card p-6 h-full">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-yellow-400">{phase.phase}</h3>
                  <span className="text-sm text-gray-400">{phase.duration}</span>
                </div>
                <ul className="space-y-2">
                  {phase.tasks.map((task, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5 flex-shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {index < implementationPhases.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-yellow-500 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Economic Impact */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaCoins className="text-yellow-400" />
          Economic Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {economicMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 text-center"
            >
              <h3 className="text-3xl font-bold text-yellow-400 mb-2">{metric.value}</h3>
              <p className="text-lg font-medium text-white mb-1">{metric.metric}</p>
              <p className="text-sm text-gray-400">{metric.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Case Study */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-yellow-500/20">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">Case Study: Brooklyn Microgrid</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <p className="text-gray-300 mb-4">
                The Brooklyn Microgrid demonstrates how peer-to-peer energy trading creates resilient communities. 
                Using blockchain-based energy credits, neighbors trade surplus solar power directly, bypassing 
                utility monopolies.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-start gap-2">
                  <FaShieldAlt className="text-yellow-500 mt-1" />
                  <span>Grid independence during outages</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaUsers className="text-yellow-500 mt-1" />
                  <span>50+ participating households</span>
                </li>
                <li className="flex items-start gap-2">
                  <FaChartLine className="text-yellow-500 mt-1" />
                  <span>40% average cost reduction</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Key Technologies</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Smart meters with blockchain integration</li>
                  <li>• Community battery storage systems</li>
                  <li>• AI-powered load forecasting</li>
                  <li>• Mobile app for energy trading</li>
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg">
                <h4 className="font-semibold text-white mb-2">Lessons Learned</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Regulatory navigation is critical</li>
                  <li>• Community education drives adoption</li>
                  <li>• Simple UX enables participation</li>
                  <li>• Shared ownership ensures longevity</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 text-center border border-yellow-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Build Energy Sovereignty?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Join communities worldwide who are taking control of their energy future. Start with a single 
            solar panel, a small biodigester, or a waste oil collection route. Every step toward energy 
            independence is a step away from Babylon's extraction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/loop-economics">
              <button className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-yellow-500/50 transition-all duration-300">
                Explore All Sectors
              </button>
            </Link>
            <Link href="/protocols">
              <button className="px-8 py-4 bg-black/50 border border-yellow-500/50 text-yellow-400 font-semibold rounded-lg hover:bg-yellow-500/10 transition-all duration-300">
                Download Energy Protocols
              </button>
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Glossary Section */}
      <GlossarySection
        accentColor="yellow"
        icon={<FaBook className="text-2xl text-yellow-400" />}
        terms={[
          {
            term: "Energy Sovereignty",
            definition: "The ability of a community to produce, store, and distribute its own energy without dependence on centralized utilities or fossil fuel infrastructure.",
            related: ["Microgrids", "Energy Democracy"]
          },
          {
            term: "Microgrids",
            definition: "Localized electrical grids that can disconnect from the traditional grid to operate autonomously, enhancing resilience and enabling peer-to-peer energy trading.",
            related: ["Smart Grid", "Distributed Generation"]
          },
          {
            term: "Anaerobic Digestion",
            definition: "A biological process that breaks down organic matter without oxygen, producing biogas (methane) for energy and digestate for fertilizer.",
            related: ["Biomethane", "Circular Economy"]
          },
          {
            term: "Peer-to-Peer Energy Trading",
            definition: "Direct energy transactions between prosumers (producer-consumers) without intermediaries, often using blockchain for transparent accounting.",
            related: ["Energy Credits", "Prosumer"]
          },
          {
            term: "Community Battery",
            definition: "Shared energy storage systems that serve multiple households, reducing individual costs while providing grid stability and backup power.",
            related: ["Energy Storage", "Grid Resilience"]
          },
          {
            term: "Waste-to-Energy",
            definition: "Technologies that convert non-recyclable waste materials into usable heat, electricity, or fuel through thermal, chemical, or biological processes.",
            related: ["Circular Economy", "Zero Waste"]
          },
          {
            term: "Energy Democracy",
            definition: "Community ownership and democratic control of energy resources, prioritizing local needs and environmental sustainability over profit.",
            related: ["Energy Sovereignty", "Cooperative Models"]
          },
          {
            term: "Load Balancing",
            definition: "The distribution of electrical demand across available supply sources to optimize efficiency and prevent overloads in decentralized systems.",
            related: ["Smart Grid", "Demand Response"]
          }
        ]}
      />
    </div>
  );
};

export default EnergyPage;
