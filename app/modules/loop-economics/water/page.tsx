'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaTint, FaRecycle, FaCloud, FaFilter, FaWater,
  FaFlask, FaHome, FaIndustry, FaChartLine, FaShieldAlt,
  FaCogs, FaLeaf, FaUserFriends, FaExchangeAlt, FaSyncAlt
} from 'react-icons/fa';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import Link from 'next/link';

const WaterPage = () => {
  const waterSystems = [
    {
      icon: <FaRecycle className="text-3xl" />,
      title: "Greywater Recycling",
      description: "Household water reuse systems for irrigation and non-potable applications",
      features: [
        "Biological filtration systems",
        "Automated diversion valves",
        "Subsurface irrigation",
        "Real-time quality monitoring"
      ]
    },
    {
      icon: <FaCloud className="text-3xl" />,
      title: "Atmospheric Harvest",
      description: "Fog nets and dew collectors capturing moisture from air",
      features: [
        "Mesh fog collectors",
        "Solar-powered condensers",
        "Humidity optimization",
        "Decentralized collection"
      ]
    },
    {
      icon: <FaWater className="text-3xl" />,
      title: "Rainwater Capture",
      description: "Comprehensive stormwater management and storage infrastructure",
      features: [
        "Permeable surfaces",
        "Underground cisterns",
        "First-flush diverters",
        "Smart release systems"
      ]
    },
    {
      icon: <FaFilter className="text-3xl" />,
      title: "Community Filtration",
      description: "Neighborhood-scale water treatment using natural and advanced methods",
      features: [
        "Living machine systems",
        "UV sterilization",
        "Ceramic filtration",
        "Mineral remineralization"
      ]
    }
  ];

  const waterMetrics = [
    {
      metric: "Water Independence",
      value: "85%+",
      description: "self-sufficiency achieved",
      impact: "Reduces municipal demand and increases resilience"
    },
    {
      metric: "Usage Reduction",
      value: "70%",
      description: "less consumption per capita",
      impact: "Through recycling, conservation, and smart monitoring"
    },
    {
      metric: "Quality Improvement",
      value: "99.9%",
      description: "contaminant removal",
      impact: "Multi-stage filtration exceeds EPA standards"
    },
    {
      metric: "Cost Savings",
      value: "60%",
      description: "lower water bills",
      impact: "After system payback period of 3-5 years"
    }
  ];

  const implementationStages = [
    {
      stage: "Assessment",
      timeline: "Month 1-2",
      activities: [
        "Water audit and flow mapping",
        "Quality testing at all points",
        "Infrastructure evaluation",
        "Community needs survey"
      ],
      deliverables: "Baseline metrics and system design"
    },
    {
      stage: "Conservation",
      timeline: "Month 2-4",
      activities: [
        "Low-flow fixture installation",
        "Leak detection and repair",
        "Behavioral change campaign",
        "Smart meter deployment"
      ],
      deliverables: "30% immediate reduction"
    },
    {
      stage: "Harvesting",
      timeline: "Month 4-8",
      activities: [
        "Rainwater system installation",
        "Greywater plumbing retrofit",
        "Atmospheric collectors setup",
        "Storage tank construction"
      ],
      deliverables: "Alternative supply online"
    },
    {
      stage: "Treatment",
      timeline: "Month 8-12",
      activities: [
        "Filtration system build",
        "Quality monitoring network",
        "Distribution optimization",
        "Maintenance training"
      ],
      deliverables: "Full loop closure"
    }
  ];

  const communityModels = [
    {
      name: "Block-Level System",
      scale: "10-20 homes",
      infrastructure: "Shared cistern, greywater treatment, rain gardens",
      management: "Rotating maintenance duties",
      cost: "$5-10K per household"
    },
    {
      name: "Neighborhood Network",
      scale: "100-200 homes",
      infrastructure: "Distributed storage, centralized treatment, smart grid",
      management: "Water cooperative with paid operator",
      cost: "$3-7K per household"
    },
    {
      name: "District Hub",
      scale: "1000+ homes",
      infrastructure: "Industrial-scale recycling, aquifer recharge, distribution",
      management: "Professional utility alternative",
      cost: "$2-5K per household"
    }
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
          <div className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
            <FaTint className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Water Sovereignty
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              Closed-loop water management for community resilience
            </p>
          </div>
        </div>
      </motion.div>

      {/* Core Philosophy */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-blue-500/20">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Water as Commons, Not Commodity</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Water scarcity is manufactured by waste, not nature. Through <GlossaryTooltip term="Loop Economics">closed-loop systems</GlossaryTooltip>, 
            every drop is captured, cleaned, and cycled. Communities that manage their own water cycles break free from 
            both drought vulnerability and utility monopolies. The technology exists—what's needed is organized implementation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 text-center">
              <FaTint className="text-3xl text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Capture</h4>
              <p className="text-xs text-gray-400 mt-1">Every source harvested</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 text-center">
              <FaFilter className="text-3xl text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Clean</h4>
              <p className="text-xs text-gray-400 mt-1">Natural + tech filtration</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 text-center">
              <FaSyncAlt className="text-3xl text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Cycle</h4>
              <p className="text-xs text-gray-400 mt-1">Continuous reuse loops</p>
            </div>
            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30 text-center">
              <FaUserFriends className="text-3xl text-blue-400 mx-auto mb-2" />
              <h4 className="font-semibold text-white">Control</h4>
              <p className="text-xs text-gray-400 mt-1">Community ownership</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Water Systems Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaWater className="text-blue-400" />
          Integrated Water Systems
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {waterSystems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 text-blue-400">
                  {system.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{system.title}</h3>
                  <p className="text-gray-400 mb-4">{system.description}</p>
                  <ul className="space-y-2">
                    {system.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <FaTint className="text-blue-500 mt-1 flex-shrink-0" />
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

      {/* Performance Metrics */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaChartLine className="text-blue-400" />
          System Performance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {waterMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-center mb-4">
                <h3 className="text-4xl font-bold text-blue-400 mb-2">{metric.value}</h3>
                <p className="text-lg font-medium text-white">{metric.metric}</p>
                <p className="text-sm text-gray-400">{metric.description}</p>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <p className="text-xs text-gray-500 italic">{metric.impact}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Implementation Roadmap */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaCogs className="text-blue-400" />
          Implementation Roadmap
        </h2>
        <div className="space-y-6">
          {implementationStages.map((stage, index) => (
            <motion.div
              key={stage.stage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-xl font-semibold text-blue-400">{stage.stage}</h3>
                  <p className="text-sm text-gray-400 mt-1">{stage.timeline}</p>
                </div>
                <div className="lg:col-span-2">
                  <h4 className="font-medium text-white mb-2">Key Activities:</h4>
                  <ul className="space-y-1">
                    {stage.activities.map((activity, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-white mb-2">Deliverable:</h4>
                  <p className="text-sm text-blue-300">{stage.deliverables}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Community Models */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaHome className="text-blue-400" />
          Scale-Appropriate Solutions
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {communityModels.map((model, index) => (
            <motion.div
              key={model.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-4">{model.name}</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-400">Scale</p>
                  <p className="text-white font-medium">{model.scale}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Infrastructure</p>
                  <p className="text-gray-300 text-sm">{model.infrastructure}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Management</p>
                  <p className="text-gray-300 text-sm">{model.management}</p>
                </div>
                <div className="pt-3 border-t border-gray-700">
                  <p className="text-sm text-gray-400">Investment</p>
                  <p className="text-lg font-semibold text-blue-300">{model.cost}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Technology Deep Dive */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-blue-500/20">
          <h2 className="text-2xl font-bold text-blue-400 mb-6">Advanced Treatment Technologies</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Living Machine Systems</h3>
              <p className="text-gray-300 mb-4">
                Biological treatment using constructed wetlands and aquatic plants creates 
                self-maintaining filtration that improves over time. These systems handle 
                greywater and blackwater with minimal energy input.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <FaLeaf className="text-green-500" />
                  <span className="text-sm text-gray-300">Constructed wetlands with native plants</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaFlask className="text-blue-500" />
                  <span className="text-sm text-gray-300">Aerobic/anaerobic treatment zones</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-purple-500" />
                  <span className="text-sm text-gray-300">Pathogen removal via UV exposure</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Smart Monitoring Network</h3>
              <p className="text-gray-300 mb-4">
                IoT sensors throughout the system provide real-time data on water quality, 
                flow rates, and system health. AI algorithms optimize treatment and predict 
                maintenance needs.
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-sm font-medium text-white">pH Sensors</p>
                  <p className="text-xs text-gray-400">Continuous monitoring</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-sm font-medium text-white">Turbidity</p>
                  <p className="text-xs text-gray-400">Clarity tracking</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-sm font-medium text-white">Flow Meters</p>
                  <p className="text-xs text-gray-400">Usage patterns</p>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg">
                  <p className="text-sm font-medium text-white">Contaminants</p>
                  <p className="text-xs text-gray-400">Heavy metal detection</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Case Study */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-blue-500/20">
          <h2 className="text-2xl font-bold text-blue-400 mb-4">Case Study: Singapore's Water Independence</h2>
          <p className="text-gray-300 mb-6">
            Singapore transformed from water-scarce to water-secure through comprehensive loop closure. 
            Their "Four National Taps" strategy proves that any community can achieve water sovereignty 
            with proper planning and technology.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FaCloud className="text-2xl text-blue-400" />
              </div>
              <h4 className="font-medium text-white mb-1">Local Catchment</h4>
              <p className="text-xs text-gray-400">2/3 of land area harvests rain</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FaRecycle className="text-2xl text-blue-400" />
              </div>
              <h4 className="font-medium text-white mb-1">NEWater</h4>
              <p className="text-xs text-gray-400">40% from recycled wastewater</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FaWater className="text-2xl text-blue-400" />
              </div>
              <h4 className="font-medium text-white mb-1">Desalination</h4>
              <p className="text-xs text-gray-400">30% from seawater processing</p>
            </div>
            <div className="text-center p-4">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-blue-500/20 flex items-center justify-center">
                <FaExchangeAlt className="text-2xl text-blue-400" />
              </div>
              <h4 className="font-medium text-white mb-1">Imports</h4>
              <p className="text-xs text-gray-400">Reduced to backup only</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="max-w-7xl mx-auto"
      >
        <div className="glassmorphic-card p-8 text-center border border-blue-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">Every Drop Counts, Every Action Matters</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Water sovereignty begins with your next shower, your next rainstorm, your next community meeting. 
            Start capturing, start conserving, start organizing. The technology is proven—what we need is 
            collective action to implement it at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/loop-economics">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
                Explore All Sectors
              </button>
            </Link>
            <Link href="/protocols">
              <button className="px-8 py-4 bg-black/50 border border-blue-500/50 text-blue-400 font-semibold rounded-lg hover:bg-blue-500/10 transition-all duration-300">
                Download Water Protocols
              </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default WaterPage;
