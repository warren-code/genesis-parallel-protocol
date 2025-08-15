'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';
import { FiCpu, FiGitBranch, FiShield, FiTrendingUp, FiUsers, FiLayers } from 'react-icons/fi';

export default function TechnologyProtocol() {
  const features = [
    {
      icon: <FiGitBranch className="w-8 h-8" />,
      title: "Open-Source Development Stack",
      description: "Fully transparent, community-governed technology development with collaborative code review and shared ownership.",
      details: [
        "Decentralized version control and code hosting",
        "Community-driven feature prioritization",
        "Transparent development funding mechanisms",
        "Multi-stakeholder code review processes"
      ]
    },
    {
      icon: <FiCpu className="w-8 h-8" />,
      title: "SCEP-Integrated Architecture",
      description: "Technology designed with awareness of Shared Cognitive and Emotional Plane implications and consciousness interfaces.",
      details: [
        "Mindful user experience design principles",
        "Anti-addiction and attention-preserving interfaces",
        "Community well-being impact assessments",
        "Cognitive load optimization algorithms"
      ]
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Regenerative Metrics",
      description: "All technology advances measured against positive impact on social, ecological, and spiritual well-being.",
      details: [
        "Environmental impact tracking and optimization",
        "Community health and resilience indicators",
        "Resource efficiency and circular design metrics",
        "Educational value and knowledge sharing assessment"
      ]
    },
    {
      icon: <FiShield className="w-8 h-8" />,
      title: "Loop Collapse Resistance",
      description: "Built-in safeguards against destructive recursion, ensuring systems enhance rather than diminish human agency.",
      details: [
        "Anti-CERL pattern detection and prevention",
        "Human-in-the-loop decision checkpoints",
        "Graceful degradation and failsafe mechanisms",
        "Continuous monitoring for extractive patterns"
      ]
    },
    {
      icon: <FiLayers className="w-8 h-8" />,
      title: "Parallel Governance",
      description: "Multiple decentralized oversight layers ensuring technology serves community needs and values.",
      details: [
        "Technical council for architecture decisions",
        "Ethics board for impact assessment",
        "Community representatives for user advocacy",
        "Open audit and transparency mechanisms"
      ]
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community-Controlled Infrastructure",
      description: "Collectively owned and operated technology infrastructure independent of corporate control.",
      details: [
        "Community-owned servers and data centers",
        "Cooperative cloud computing networks",
        "Decentralized communication protocols",
        "Local manufacturing and repair capabilities"
      ]
    }
  ];

  const developmentPrinciples = [
    {
      principle: "Liberation-First Design",
      description: "Technology that increases human agency, community resilience, and ecological regeneration",
      implementations: [
        "Privacy-by-design architecture protecting user autonomy",
        "Decentralized systems reducing dependency on corporate platforms",
        "Open protocols enabling community self-determination",
        "Tools that enhance rather than replace human capabilities"
      ]
    },
    {
      principle: "Regenerative Engineering",
      description: "Development practices that restore and enhance the systems they operate within",
      implementations: [
        "Carbon-negative computing through renewable energy and efficiency",
        "Circular hardware design with full lifecycle responsibility",
        "Biomimetic algorithms inspired by natural systems",
        "Knowledge commons expansion through open source contribution"
      ]
    },
    {
      principle: "Consciousness-Aware Computing",
      description: "Technology designed with deep understanding of its impact on human consciousness and well-being",
      implementations: [
        "Attention-preserving interface design principles",
        "Mental health impact assessment for new features",
        "Community connection enhancement over individual engagement",
        "Spiritual and philosophical consideration in system design"
      ]
    }
  ];

  const technologyDomains = [
    {
      domain: "Communication Systems",
      description: "Decentralized, private, and community-controlled communication networks",
      technologies: [
        "Mesh networking protocols for local resilience",
        "End-to-end encrypted messaging with perfect forward secrecy",
        "Decentralized identity and reputation systems",
        "Community-moderated content and information sharing"
      ],
      color: "border-blue-500"
    },
    {
      domain: "Computational Infrastructure",
      description: "Community-owned computing resources and distributed processing networks",
      technologies: [
        "Cooperative cloud computing platforms",
        "Edge computing with local data sovereignty",
        "Distributed AI training and inference networks",
        "Renewable-powered data centers and server farms"
      ],
      color: "border-purple-500"
    },
    {
      domain: "Manufacturing & Fabrication",
      description: "Open-source production tools and distributed manufacturing capabilities",
      technologies: [
        "3D printing networks with shared design libraries",
        "Community workshops with professional-grade equipment",
        "Circular supply chains for electronics and hardware",
        "Local repair and refurbishment capabilities"
      ],
      color: "border-green-500"
    },
    {
      domain: "Data & Knowledge Systems",
      description: "Community-controlled data storage and knowledge preservation systems",
      technologies: [
        "Distributed storage with community-controlled access",
        "Open knowledge graphs and semantic web tools",
        "Community-curated educational content platforms",
        "Traditional knowledge preservation and sharing systems"
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
            <div className="text-8xl mb-6">⚙️</div>
            <div className="inline-flex items-center space-x-4 mb-6">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-accent" />
              <span className="text-accent font-display text-sm uppercase tracking-widest">Conscious Technology</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </motion.div>
          
          <h1 className="text-6xl md:text-7xl font-display font-bold text-white mb-6">
            Technology Protocol
          </h1>
          <div className="h-1 w-32 bg-accent mx-auto mb-8" />
          <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Open-source, SCEP-integrated technological development stack ensuring all advances meet 
            regenerative metrics, pass loop collapse resistance tests, and operate under 
            parallel governance layers that serve community liberation.
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
                Technology as Liberation Tool
              </h2>
              <div className="h-0.5 w-24 bg-accent mx-auto mb-8" />
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Technology is not neutral. Current tech systems concentrate power, extract data, 
                  and optimize for <span className="text-accent font-semibold">engagement over well-being</span>, 
                  creating digital addiction and social fragmentation.
                </p>
                <p>
                  The Technology Protocol creates <span className="text-white font-semibold">consciousness-aware computing</span> that 
                  enhances human agency, supports community resilience, and operates within 
                  regenerative principles that serve life rather than extract from it.
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

        {/* Development Principles */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Development Principles
          </h2>
          <div className="space-y-8">
            {developmentPrinciples.map((principle, index) => (
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
                    {principle.implementations.map((implementation, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <div className="w-2 h-2 bg-signal rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-300 text-sm">{implementation}</span>
                      </div>
                    ))}
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technology Domains */}
        <div className="mb-24">
          <h2 className="text-4xl font-display font-bold text-center text-white mb-12">
            Technology Domains
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {technologyDomains.map((domain, index) => (
              <motion.div
                key={domain.domain}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <GlassmorphicCard className={`p-8 border-l-4 ${domain.color} h-full`}>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {domain.domain}
                  </h3>
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {domain.description}
                  </p>
                  <div className="space-y-3">
                    {domain.technologies.map((tech, idx) => (
                      <div key={idx} className="flex items-start space-x-3 p-3 rounded-lg bg-white/5">
                        <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0 mt-2" />
                        <span className="text-gray-300 text-sm">{tech}</span>
                      </div>
                    ))}
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Governance Structure */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          className="mb-16"
        >
          <GlassmorphicCard blur="md" className="p-12 border-2 border-accent/30">
            <h2 className="text-3xl font-display font-semibold text-accent mb-8 text-center">
              Parallel Governance Structure
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Technical Governance</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Architecture Council:</strong> Long-term technical direction and standards</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Security Review Board:</strong> Ongoing security assessment and response</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Open Source Maintainers:</strong> Day-to-day development and code review</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-accent">•</span>
                    <span><strong>Documentation Guild:</strong> Knowledge preservation and sharing</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Community Governance</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Ethics Advisory Board:</strong> Impact assessment and ethical guidelines</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>User Experience Council:</strong> Community needs and usability advocacy</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Resource Allocation DAO:</strong> Funding priorities and resource distribution</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="text-signal">•</span>
                    <span><strong>Conflict Resolution Assembly:</strong> Community dispute and decision mediation</span>
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
              Build Conscious Technology
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Ready to create technology that serves liberation rather than extraction? 
              Download the Technology Protocol and start building community-controlled, 
              consciousness-aware computing systems.
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
                Join Developer Collective
              </motion.button>
            </div>
          </GlassmorphicCard>
        </motion.div>
      </motion.div>
    </div>
  );
}
