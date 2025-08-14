'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaBrain, FaNetworkWired, FaChartBar, FaRobot, FaDatabase,
  FaUserShield, FaCogs, FaCodeBranch, FaChartLine, FaUsers,
  FaMicrochip, FaShieldAlt, FaBalanceScale, FaSyncAlt, FaLightbulb
} from 'react-icons/fa';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import Link from 'next/link';

const AIPage = () => {
  const aiSystems = [
    {
      icon: <FaChartBar className="text-3xl" />,
      title: "Supply Chain Optimization",
      description: "AI coordinating material flows to minimize waste and maximize reuse",
      features: [
        "Predictive demand modeling",
        "Dynamic routing optimization",
        "Waste-to-resource matching",
        "Real-time inventory balancing"
      ]
    },
    {
      icon: <FaBalanceScale className="text-3xl" />,
      title: "Governance Support",
      description: "AI tools enhancing democratic decision-making and consensus building",
      features: [
        "Proposal impact modeling",
        "Sentiment analysis",
        "Consensus facilitation",
        "Sybil attack detection"
      ]
    },
    {
      icon: <FaSyncAlt className="text-3xl" />,
      title: "Resource Allocation",
      description: "Intelligent distribution of community resources based on needs and capacity",
      features: [
        "Need-based prioritization",
        "Capacity optimization",
        "Fairness algorithms",
        "Emergency response"
      ]
    },
    {
      icon: <FaLightbulb className="text-3xl" />,
      title: "Innovation Matching",
      description: "Connecting problems with solutions across the network",
      features: [
        "Skill-need matching",
        "Knowledge graph navigation",
        "Collaboration suggestions",
        "Project success prediction"
      ]
    }
  ];

  const openAIStack = [
    {
      component: "Local Models",
      description: "Community-hosted AI without corporate surveillance",
      examples: ["LLaMA variants", "Stable Diffusion", "Whisper", "BLOOM"],
      benefits: "Data sovereignty, customization, no API costs"
    },
    {
      component: "Federated Learning",
      description: "Training models across distributed data without centralization",
      examples: ["Flower framework", "PySyft", "TensorFlow Federated"],
      benefits: "Privacy preservation, collective intelligence"
    },
    {
      component: "Edge Computing",
      description: "AI inference at the point of need",
      examples: ["Raspberry Pi clusters", "NVIDIA Jetson", "Intel NUC"],
      benefits: "Low latency, offline capability, energy efficiency"
    },
    {
      component: "Ethical Frameworks",
      description: "Ensuring AI serves community values",
      examples: ["Algorithmic auditing", "Bias detection", "Explainable AI"],
      benefits: "Trust, accountability, aligned incentives"
    }
  ];

  const implementationLevels = [
    {
      level: "Monitoring & Analytics",
      complexity: "Low",
      timeframe: "1-3 months",
      applications: [
        "Resource usage dashboards",
        "Pattern detection",
        "Anomaly alerts",
        "Basic predictions"
      ],
      requirements: "Basic sensors, database, visualization tools"
    },
    {
      level: "Optimization & Automation",
      complexity: "Medium",
      timeframe: "3-6 months",
      applications: [
        "Route optimization",
        "Energy load balancing",
        "Inventory management",
        "Process automation"
      ],
      requirements: "IoT network, compute cluster, ML models"
    },
    {
      level: "Coordination & Governance",
      complexity: "High",
      timeframe: "6-12 months",
      applications: [
        "Multi-agent coordination",
        "Consensus mechanisms",
        "Resource allocation",
        "Conflict resolution"
      ],
      requirements: "Distributed systems, governance protocols, community buy-in"
    }
  ];

  const economicImpact = [
    {
      metric: "Efficiency Gains",
      value: "25-40%",
      area: "Resource utilization",
      details: "Through predictive optimization and waste reduction"
    },
    {
      metric: "Cost Reduction",
      value: "30-50%",
      area: "Operations",
      details: "Automation of routine tasks and smart scheduling"
    },
    {
      metric: "Decision Speed",
      value: "10x",
      area: "Governance",
      details: "AI-assisted proposal analysis and impact modeling"
    },
    {
      metric: "Innovation Rate",
      value: "3x",
      area: "Problem solving",
      details: "Knowledge graph navigation and solution matching"
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
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500">
            <FaBrain className="text-4xl text-white" />
          </div>
          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI for Coordination
            </h1>
            <p className="text-xl text-gray-400 mt-2">
              Intelligent systems optimizing community resources and governance
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
        <div className="glassmorphic-card p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">Intelligence Without Surveillance</h2>
          <p className="text-lg text-gray-300 leading-relaxed mb-6">
            AI should amplify collective intelligence, not extract data for corporate profit. Through 
            <GlossaryTooltip term="Loop Economics">local models</GlossaryTooltip>, federated learning, 
            and open algorithms, communities can harness AI's power while maintaining sovereignty. 
            Every optimization improves the commons; every model serves the people who train it.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <FaUserShield className="text-3xl text-cyan-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Privacy First</h4>
              <p className="text-sm text-gray-400">
                Local processing, encrypted data, no surveillance capitalism
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <FaCodeBranch className="text-3xl text-cyan-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Open Source</h4>
              <p className="text-sm text-gray-400">
                Transparent algorithms, auditable decisions, community control
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
                <FaUsers className="text-3xl text-cyan-400" />
              </div>
              <h4 className="font-semibold text-white mb-2">Collective Benefit</h4>
              <p className="text-sm text-gray-400">
                Optimizing for community wellbeing, not profit extraction
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* AI Applications */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaNetworkWired className="text-cyan-400" />
          Community AI Applications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {aiSystems.map((system, index) => (
            <motion.div
              key={system.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 text-cyan-400">
                  {system.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{system.title}</h3>
                  <p className="text-gray-400 mb-4">{system.description}</p>
                  <ul className="space-y-2">
                    {system.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                        <FaMicrochip className="text-cyan-500 mt-1 flex-shrink-0" />
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

      {/* Open AI Stack */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaCogs className="text-cyan-400" />
          Open AI Technology Stack
        </h2>
        <div className="space-y-4">
          {openAIStack.map((component, index) => (
            <motion.div
              key={component.component}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400">{component.component}</h3>
                  <p className="text-sm text-gray-400 mt-1">{component.description}</p>
                </div>
                <div className="lg:col-span-2">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Examples:</h4>
                  <div className="flex flex-wrap gap-2">
                    {component.examples.map((example, idx) => (
                      <span key={idx} className="px-3 py-1 bg-cyan-500/10 rounded-full text-xs text-cyan-300 border border-cyan-500/20">
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Benefits:</h4>
                  <p className="text-sm text-blue-300">{component.benefits}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Implementation Levels */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaChartLine className="text-cyan-400" />
          Progressive Implementation
        </h2>
        <div className="space-y-6">
          {implementationLevels.map((level, index) => (
            <motion.div
              key={level.level}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6"
            >
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <h3 className="text-xl font-semibold text-cyan-400">{level.level}</h3>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-gray-400">
                      Complexity: <span className={`font-medium ${
                        level.complexity === 'Low' ? 'text-green-400' : 
                        level.complexity === 'Medium' ? 'text-yellow-400' : 
                        'text-red-400'
                      }`}>{level.complexity}</span>
                    </p>
                    <p className="text-sm text-gray-400">
                      Timeframe: <span className="text-blue-300">{level.timeframe}</span>
                    </p>
                  </div>
                </div>
                <div className="lg:w-1/3">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Applications:</h4>
                  <ul className="space-y-1">
                    {level.applications.map((app, idx) => (
                      <li key={idx} className="text-sm text-gray-400 flex items-start gap-2">
                        <span className="text-cyan-500 mt-1">•</span>
                        {app}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="lg:w-1/3">
                  <h4 className="text-sm font-medium text-gray-300 mb-2">Requirements:</h4>
                  <p className="text-sm text-gray-400">{level.requirements}</p>
                </div>
              </div>
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
          <FaChartBar className="text-cyan-400" />
          Measurable Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {economicImpact.map((metric, index) => (
            <motion.div
              key={metric.metric}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="glassmorphic-card p-6 text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <h3 className="text-3xl font-bold text-cyan-400 mb-2">{metric.value}</h3>
              <p className="text-lg font-medium text-white mb-1">{metric.metric}</p>
              <p className="text-sm text-gray-400 mb-3">{metric.area}</p>
              <p className="text-xs text-gray-500 italic">{metric.details}</p>
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
        <div className="glassmorphic-card p-8 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6">Case Study: Barcelona's Decidim Platform</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">AI-Enhanced Participatory Democracy</h3>
              <p className="text-gray-300 mb-4">
                Barcelona's Decidim platform uses AI to facilitate citizen participation in governance. 
                Natural language processing analyzes thousands of proposals, machine learning identifies 
                consensus points, and recommendation algorithms connect citizens with relevant initiatives.
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <FaUsers className="text-cyan-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Citizen Engagement</h4>
                    <p className="text-sm text-gray-400">
                      70,000+ participants, 20,000+ proposals processed
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaBrain className="text-cyan-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">AI Capabilities</h4>
                    <p className="text-sm text-gray-400">
                      Proposal clustering, sentiment analysis, impact prediction
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FaShieldAlt className="text-cyan-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Open Source</h4>
                    <p className="text-sm text-gray-400">
                      100% free software, replicated in 100+ cities
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-cyan-500/10 rounded-lg">
                <h4 className="font-semibold text-white mb-3">Technical Architecture</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    Ruby on Rails backend with PostgreSQL
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    GraphQL API for data access
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    Python ML pipeline for analysis
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-cyan-500">•</span>
                    Ethereum integration for verification
                  </li>
                </ul>
              </div>
              <div className="p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20">
                <h4 className="font-semibold text-white mb-2">Key Lessons</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• AI enhances, not replaces, human decision-making</li>
                  <li>• Transparency builds trust in algorithmic systems</li>
                  <li>• Local hosting ensures data sovereignty</li>
                  <li>• Open source enables rapid innovation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Implementation Guide */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <FaRobot className="text-cyan-400" />
          Community AI Implementation Guide
        </h2>
        <div className="glassmorphic-card p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Technical Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaDatabase className="text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Data Infrastructure</h4>
                    <p className="text-sm text-gray-400">
                      Local storage, encrypted backups, federated access
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaMicrochip className="text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Compute Resources</h4>
                    <p className="text-sm text-gray-400">
                      GPU cluster for training, edge devices for inference
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCodeBranch className="text-blue-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Software Stack</h4>
                    <p className="text-sm text-gray-400">
                      PyTorch/TensorFlow, Kubernetes, monitoring tools
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Governance Requirements</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <FaBalanceScale className="text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Ethical Guidelines</h4>
                    <p className="text-sm text-gray-400">
                      Community-defined values, audit procedures, redress mechanisms
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaUserShield className="text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Privacy Protocols</h4>
                    <p className="text-sm text-gray-400">
                      Data minimization, consent management, right to deletion
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaUsers className="text-purple-500 mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Stakeholder Engagement</h4>
                    <p className="text-sm text-gray-400">
                      Education programs, feedback loops, participatory design
                    </p>
                  </div>
                </li>
              </ul>
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
        <div className="glassmorphic-card p-8 text-center border border-cyan-500/30">
          <h2 className="text-3xl font-bold text-white mb-4">Intelligence for All, Controlled by All</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto">
            AI is too powerful to leave in corporate hands. By building local models, sharing knowledge, 
            and maintaining democratic control, communities can harness artificial intelligence for genuine 
            collective benefit. Start with a simple optimization problem. Build toward comprehensive 
            coordination. The future of AI is distributed, transparent, and community-owned.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/loop-economics">
              <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300">
                Explore All Sectors
              </button>
            </Link>
            <Link href="/protocols">
              <button className="px-8 py-4 bg-black/50 border border-cyan-500/50 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500/10 transition-all duration-300">
                Download AI Protocols
              </button>
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default AIPage;
