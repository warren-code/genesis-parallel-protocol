'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaRobot, FaCogs, FaRecycle, FaSeedling, FaIndustry,
  FaTools, FaNetworkWired, FaMicrochip, FaChartLine, FaUsers,
  FaBoxOpen, FaWrench, FaCodeBranch, FaCubes, FaHandsHelping
} from 'react-icons/fa';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import Link from 'next/link';

const RoboticsPage = () => {
  const roboticsSystems = [
    {
      icon: <FaRecycle className="text-3xl" />,
      title: "Waste Sorting Automation",
      description: "AI-powered robotic systems for material recovery and recycling optimization",
      features: [
        "Computer vision sorting",
        "Multi-stream separation",
        "Contamination detection",
        "24/7 operation capacity"
      ]
    },
    {
      icon: <FaSeedling className="text-3xl" />,
      title: "Precision Agriculture",
      description: "Autonomous farming robots for planting, monitoring, and harvesting",
      features: [
        "GPS-guided planting",
        "Selective harvesting",
        "Pest identification",
        "Soil health monitoring"
      ]
    },
    {
      icon: <FaIndustry className="text-3xl" />,
      title: "Distributed Manufacturing",
      description: "Small-scale production cells for local goods and repair services",
      features: [
        "3D printing farms",
        "CNC machining cells",
        "Assembly automation",
        "Quality control systems"
      ]
    },
    {
      icon: <FaTools className="text-3xl" />,
      title: "Maintenance Robotics",
      description: "Service robots for infrastructure inspection and preventive care",
      features: [
        "Pipeline inspection",
        "Solar panel cleaning",
        "HVAC maintenance",
        "Predictive diagnostics"
      ]
    }
  ];

  const openHardwareStack = [
    {
      layer: "Design Commons",
      description: "Open-source CAD files, schematics, and documentation",
      tools: ["FreeCAD", "KiCad", "OpenSCAD", "GitLab"],
      benefits: "No licensing fees, community improvements"
    },
    {
      layer: "Modular Components",
      description: "Standardized interfaces for motors, sensors, and controllers",
      tools: ["Arduino", "Raspberry Pi", "ROS", "RISC-V"],
      benefits: "Interchangeable parts, easier repairs"
    },
    {
      layer: "Local Production",
      description: "Community makerspaces and fabrication facilities",
      tools: ["3D printers", "Laser cutters", "PCB mills", "Pick-and-place"],
      benefits: "Reduced shipping, custom solutions"
    },
    {
      layer: "Skill Sharing",
      description: "Workshops, documentation, and peer learning networks",
      tools: ["Video tutorials", "Build parties", "Repair cafes", "Hackathons"],
      benefits: "Distributed knowledge, community resilience"
    }
  ];

  const economicModels = [
    {
      model: "Robot Cooperatives",
      structure: "Shared ownership of automation tools",
      examples: [
        "Farm equipment pools",
        "Manufacturing cells",
        "Inspection drones"
      ],
      investment: "$50K-200K",
      members: "10-50 businesses",
      roi: "2-3 years"
    },
    {
      model: "Service Subscriptions",
      structure: "Robotics-as-a-Service for small operations",
      examples: [
        "Harvest assistance",
        "Waste processing",
        "Maintenance rounds"
      ],
      investment: "$10K-50K setup",
      pricing: "$500-2000/month",
      roi: "6-12 months"
    },
    {
      model: "Build-Operate-Transfer",
      structure: "Community builds capacity over time",
      examples: [
        "Recycling facilities",
        "Food processing",
        "Repair workshops"
      ],
      investment: "$200K-1M",
      timeline: "3-5 year transfer",
      roi: "4-5 years"
    }
  ];

  const implementationRoadmap = [
    {
      phase: "Assessment",
      duration: "Months 1-2",
      activities: [
        "Task automation mapping",
        "Skills inventory",
        "Infrastructure audit",
        "Community needs survey"
      ]
    },
    {
      phase: "Pilot Projects",
      duration: "Months 3-6",
      activities: [
        "First robot deployment",
        "Operator training",
        "Process optimization",
        "Data collection"
      ]
    },
    {
      phase: "Scaling",
      duration: "Months 6-12",
      activities: [
        "Fleet expansion",
        "Integration with systems",
        "Maintenance protocols",
        "Revenue generation"
      ]
    },
    {
      phase: "Replication",
      duration: "Year 2+",
      activities: [
        "Open-source releases",
        "Training programs",
        "Regional networks",
        "Innovation cycles"
      ]
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
          <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500">
            <FaRobot className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Robotics for Circularity
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              Automation serving community needs, not corporate profits
            </p>
          </div>
        </div>
      </motion.div>

      {/* Vision Statement */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Democratizing Automation</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            Robotics shouldn't replace workers—it should amplify human creativity and eliminate drudgery. 
            Through <GlossaryTooltip term="Loop Economics">open hardware</GlossaryTooltip> and cooperative ownership, 
            communities can deploy automation that serves local needs: sorting waste, tending crops, 
            manufacturing essentials, and maintaining infrastructure. Every robot working is a person freed to innovate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                <FaCodeBranch className="text-3xl text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Open Source First</h4>
              <p className="text-sm text-gray-400">
                All designs, code, and documentation freely shared
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                <FaHandsHelping className="text-3xl text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Community Owned</h4>
              <p className="text-sm text-gray-400">
                Cooperative models prevent wealth extraction
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                <FaWrench className="text-3xl text-purple-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Locally Maintained</h4>
              <p className="text-sm text-gray-400">
                Repairable with common tools and skills
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Robotics Applications */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaCogs className="text-purple-400" />
          Circular Economy Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {roboticsSystems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-indigo-500/20 text-purple-400">
                  {system.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{system.title}</h3>
                  <p className="text-gray-400 mb-4">{system.description}</p>
                  <ul className="space-y-2">
                    {system.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <FaMicrochip className="text-purple-500 mt-1 flex-shrink-0" />
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

      {/* Open Hardware Stack */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaCubes className="text-purple-400" />
          Open Hardware Stack
        </h2>
        <div className="space-y-4">
          {openHardwareStack.map((layer, index) => (
            <motion.div
              key={layer.layer}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-purple-400">{layer.layer}</h3>
                  <p className="text-sm text-gray-400 mt-1">{layer.description}</p>
                </div>
                <div className="lg:col-span-2">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Technologies & Tools:</h4>
                  <div className="flex flex-wrap gap-2">
                    {layer.tools.map((tool, idx) => (
                      <span key={idx} className="px-3 py-1 bg-purple-500/10 rounded-full text-xs text-purple-300 border border-purple-500/20">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Community Benefits:</h4>
                  <p className="text-sm text-indigo-300">{layer.benefits}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Economic Models */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaUsers className="text-purple-400" />
          Cooperative Economic Models
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {economicModels.map((model, index) => (
            <motion.div
              key={model.model}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6"
            >
              <h3 className="text-xl font-semibold text-purple-400 mb-2">{model.model}</h3>
              <p className="text-sm text-gray-400 mb-4">{model.structure}</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Applications:</h4>
                  <ul className="space-y-1">
                    {model.examples.map((example, idx) => (
                      <li key={idx} className="text-sm text-gray-300 flex items-start gap-2">
                        <span className="text-purple-500">•</span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-gray-700 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Investment:</span>
                    <span className="text-white font-medium">{model.investment}</span>
                  </div>
                  {model.members && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Scale:</span>
                      <span className="text-purple-300">{model.members}</span>
                    </div>
                  )}
                  {model.pricing && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Pricing:</span>
                      <span className="text-purple-300">{model.pricing}</span>
                    </div>
                  )}
                  {model.timeline && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Timeline:</span>
                      <span className="text-purple-300">{model.timeline}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">ROI:</span>
                    <span className="text-green-400 font-medium">{model.roi}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Implementation Timeline */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaChartLine className="text-purple-400" />
          Implementation Roadmap
        </h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 to-indigo-500" />
          <div className="space-y-8">
            {implementationRoadmap.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="relative flex gap-8"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold z-10">
                  {index + 1}
                </div>
                <div className="flex-1 glassmorphic-card p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-purple-400">{phase.phase}</h3>
                    <span className="text-sm text-gray-400">{phase.duration}</span>
                  </div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {phase.activities.map((activity, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <FaCogs className="text-purple-500 mt-1 flex-shrink-0" />
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Technical Deep Dive */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Example: Open Source Waste Sorter</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">System Architecture</h3>
              <div className="space-y-3">
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Vision System</h4>
                  <p className="text-sm text-gray-400">
                    Multiple cameras + TensorFlow models for material identification
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Sorting Mechanism</h4>
                  <p className="text-sm text-gray-400">
                    Pneumatic pushers + conveyor system for stream separation
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Control System</h4>
                  <p className="text-sm text-gray-400">
                    Raspberry Pi cluster + ROS for real-time coordination
                  </p>
                </div>
                <div className="p-3 bg-purple-500/10 rounded-lg">
                  <h4 className="font-medium text-white mb-1">Data Analytics</h4>
                  <p className="text-sm text-gray-400">
                    Material flow tracking + contamination reporting
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Community Impact</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-indigo-400 mb-2">Performance Metrics</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 95% sorting accuracy across 12 material types</li>
                    <li>• 2 tons/hour processing capacity</li>
                    <li>• 80% reduction in contamination rates</li>
                    <li>• $50K build cost (vs $500K commercial)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-indigo-400 mb-2">Local Benefits</h4>
                  <ul className="space-y-1 text-sm text-gray-300">
                    <li>• 5 technical jobs created</li>
                    <li>• $200K annual revenue from materials</li>
                    <li>• 90% landfill diversion achieved</li>
                    <li>• Knowledge transfer to 3 nearby communities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Success Story */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <div className="glassmorphic-card p-8 border border-purple-500/20">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Case Study: FarmBot Revolution</h2>
          <p className="text-gray-300 mb-6">
            FarmBot's open-source precision farming robot proves that democratized automation can transform 
            food production. With over 10,000 units deployed globally, communities are growing more food 
            with less water, no pesticides, and minimal labor.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Open Design</h4>
              <p className="text-sm text-gray-400">CAD files, BOM, and software on GitHub</p>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">DIY Builds</h4>
              <p className="text-sm text-gray-400">$1,500 in parts vs $4,000 pre-built</p>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Community Mods</h4>
              <p className="text-sm text-gray-400">100+ user-created improvements</p>
            </div>
            <div className="text-center p-4 bg-purple-500/10 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Educational Impact</h4>
              <p className="text-sm text-gray-400">500+ schools teaching robotics</p>
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
        <div className="glassmorphic-card p-8 text-center border border-purple-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">Build the Future, Share the Blueprints</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            Every community needs different automation, but all communities benefit from shared knowledge. 
            Start with one robot solving one local problem. Document everything. Share your designs. 
            Together, we build an economy where machines amplify human potential instead of replacing it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/loop-economics">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300">
                Explore All Sectors
              </button>
            </Link>
            <Link href="/protocols">
              <button className="px-8 py-4 bg-black/50 border border-purple-500/50 text-purple-400 font-semibold rounded-lg hover:bg-purple-500/10 transition-all duration-300">
                Download Robotics Guides
              </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default RoboticsPage;
