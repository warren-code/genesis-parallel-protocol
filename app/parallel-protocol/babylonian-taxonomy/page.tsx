'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';
import { 
  FaExclamationTriangle, 
  FaSkull, 
  FaBomb, 
  FaLink,
  FaFire,
  FaBalanceScale,
  FaUniversity,
  FaChartLine
} from 'react-icons/fa';

// Custom hook for scroll-triggered animations
const useScrollAnimation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls };
};

export default function BabylonianTaxonomyPage() {
  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const tableRowVariant = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const floatingAnimation = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
          ease: "easeInOut" as const
      }
    }
  };

  const pulseAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
            ease: "easeInOut" as const
      }
    }
  };

  // Scroll animation hooks for different sections
  const heroAnimation = useScrollAnimation();
  const tableAnimation = useScrollAnimation();
  const failuresAnimation = useScrollAnimation();
  const patternsAnimation = useScrollAnimation();
  const insightsAnimation = useScrollAnimation();
  const genesisAnimation = useScrollAnimation();
  const implementationAnimation = useScrollAnimation();
  const ctaAnimation = useScrollAnimation();
  const historicalFailures = [
    {
      title: "French Revolution (1789-1799)",
      icon: <FaSkull className="text-danger" />,
      period: "10 years of chaos",
      deathToll: "40,000+ executed",
      outcome: "Napoleon's dictatorship",
      failures: [
        "Reign of Terror consumed its own revolutionaries",
        "Economic collapse and hyperinflation",
        "Return to authoritarian rule stronger than before"
      ],
      babylonianPattern: "Revolutionary energy redirected into imperial expansion"
    },
    {
      title: "Russian Revolution (1917)",
      icon: <FaBomb className="text-danger" />,
      period: "74 years of tyranny",
      deathToll: "20+ million dead",
      outcome: "Totalitarian state capitalism",
      failures: [
        "Bolsheviks became new ruling class",
        "Gulags replaced Tsarist prisons",
        "State capitalism replaced private capitalism"
      ],
      babylonianPattern: "Workers' liberation became workers' enslavement"
    },
    {
      title: "Arab Spring (2010-2012)",
      icon: <FaFire className="text-danger" />,
      period: "2 years of false hope",
      deathToll: "100,000+ casualties",
      outcome: "Military dictatorships restored",
      failures: [
        "Social media revolution easily co-opted",
        "No parallel economic structures",
        "Western-backed counter-revolutions"
      ],
      babylonianPattern: "Digital age protests met with ancient repression"
    },
    {
      title: "Occupy Wall Street (2011)",
      icon: <FaChartLine className="text-danger" />,
      period: "2 months of protests",
      deathToll: "Movement dissolved",
      outcome: "Wall Street stronger than ever",
      failures: [
        "No concrete demands or alternatives",
        "Easily infiltrated and disrupted",
        "Energy dissipated into identity politics"
      ],
      babylonianPattern: "Protest became performance art for Babylon"
    },
    {
      title: "Civil Rights Movement (1954-1968)",
      icon: <FaBalanceScale className="text-danger" />,
      period: "14 years of struggle",
      deathToll: "Countless martyrs",
      outcome: "Integration into Babylon",
      failures: [
        "Economic justice abandoned for symbolic victories",
        "Black capitalism replaced liberation",
        "Prison-industrial complex expanded"
      ],
      babylonianPattern: "Liberation reduced to participation in oppression"
    },
    {
      title: "Cryptocurrency Revolution (2009-Present)",
      icon: <FaUniversity className="text-danger" />,
      period: "15 years of false promises",
      deathToll: "Billions in losses",
      outcome: "Wall Street adoption",
      failures: [
        "Decentralization became re-centralization",
        "Liberation technology became speculation vehicle",
        "Energy wasted on digital gold rush"
      ],
      babylonianPattern: "Revolutionary technology absorbed into financial casino"
    }
  ];

  const babylonianSystems = [
    {
      era: 'Ancient',
      civilization: 'Babylon (1894-539 BCE)',
      keyFeatures: 'First written laws (Hammurabi\'s Code), Centralized bureaucracy, Temple-based economy',
      controlMechanisms: 'Divine mandate of kings, Debt slavery, Military conquest',
      collapsePattern: 'Persian conquest after internal weakening from corruption and decadence',
      colorClass: 'text-signal'
    },
    {
      era: 'Ancient',
      civilization: 'Egyptian Dynasties (3100-30 BCE)',
      keyFeatures: 'Pharaonic divinity, Monumental architecture, Hieroglyphic records',
      controlMechanisms: 'Religious control, Caste system, Resource monopolization',
      collapsePattern: 'Roman annexation following Ptolemaic decline and civil wars',
      colorClass: 'text-signal'
    },
    {
      era: 'Classical',
      civilization: 'Roman Empire (27 BCE-476 CE)',
      keyFeatures: 'Legal system, Engineering marvels, Professional military',
      controlMechanisms: 'Bread and circuses, Citizenship hierarchy, Provincial taxation',
      collapsePattern: 'Overextension, currency debasement, barbarian invasions',
      colorClass: 'text-accent'
    },
    {
      era: 'Medieval',
      civilization: 'Byzantine Empire (330-1453)',
      keyFeatures: 'Christian theocracy, Greek fire technology, Silk monopoly',
      controlMechanisms: 'Religious orthodoxy, Court intrigue, Mercenary armies',
      collapsePattern: 'Ottoman conquest after centuries of territorial losses',
      colorClass: 'text-accent'
    },
    {
      era: 'Early Modern',
      civilization: 'Spanish Empire (1492-1898)',
      keyFeatures: 'Global colonization, Gold/silver extraction, Catholic missions',
      controlMechanisms: 'Encomienda system, Inquisition, Naval supremacy',
      collapsePattern: 'Colonial independence movements and economic stagnation',
      colorClass: 'text-accent'
    },
    {
      era: 'Modern',
      civilization: 'British Empire (1583-1997)',
      keyFeatures: 'Industrial revolution, Global trade networks, Parliamentary system',
      controlMechanisms: 'Divide and rule, Economic dependency, Cultural hegemony',
      collapsePattern: 'Decolonization after WWII exhaustion and nationalist movements',
      colorClass: 'text-danger'
    },
    {
      era: 'Modern',
      civilization: 'Soviet Union (1922-1991)',
      keyFeatures: 'Central planning, Space technology, Nuclear arsenal',
      controlMechanisms: 'Single-party state, Surveillance apparatus, Ideological control',
      collapsePattern: 'Economic stagnation, nationalist separatism, elite defection',
      colorClass: 'text-danger'
    },
    {
      era: 'Contemporary',
      civilization: 'American Hegemony (1945-present)',
      keyFeatures: 'Dollar reserve currency, Military bases worldwide, Tech innovation',
      controlMechanisms: 'Financial sanctions, Media influence, Alliance systems',
      collapsePattern: 'Debt crisis emerging, multipolar competition, internal division',
      colorClass: 'text-danger'
    },
    {
      era: 'Contemporary',
      civilization: 'Global Financial System',
      keyFeatures: 'Fiat currency, Derivatives markets, Central banking',
      controlMechanisms: 'Debt creation, Interest rates, Regulatory capture',
      collapsePattern: 'Systemic risk building, cryptocurrency disruption, trust erosion',
      colorClass: 'text-danger'
    },
    {
      era: 'Emerging',
      civilization: 'Digital Surveillance State',
      keyFeatures: 'AI monitoring, Social credit, Biometric tracking',
      controlMechanisms: 'Data harvesting, Behavioral prediction, Platform monopolies',
      collapsePattern: 'Privacy backlash pending, decentralization movements, tech regulation',
      colorClass: 'text-white'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header with Floating Animation */}
        <motion.div 
          className="mb-12"
          ref={heroAnimation.ref}
          initial="hidden"
          animate={heroAnimation.controls}
          variants={fadeInUp}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-display font-bold text-accent mb-6 text-glow-gold"
            variants={floatingAnimation}
            initial="initial"
            animate="animate"
          >
            The Babylonian Taxonomy
          </motion.h1>
          <motion.div 
            className="h-1 w-24 bg-gradient-to-r from-accent to-signal mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p 
            className="text-xl text-gray-300 leading-relaxed mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <span className="font-semibold text-white">Pattern Recognition:</span> Every civilization follows the same recursive loop of rise, control, corruption, and collapse.
          </motion.p>
          <motion.p 
            className="text-lg text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            From ancient Babylon to modern financial systems, the pattern remains constant: centralized power creates the seeds of its own destruction.
          </motion.p>
        </motion.div>

        {/* Mythic Scroll Text */}
        <GlassmorphicCard blur="md" className="p-8 mb-12 border-2 border-accent/30">
          <p className="text-lg text-gray-300 leading-relaxed italic">
            "As it was in Babylon, so it shall be again. The tower rises, the people scatter. 
            The currency debases, the empire falls. The surveillance tightens, the revolution comes. 
            Learn the pattern, break the cycle."
          </p>
          <p className="text-right text-accent mt-4">— Genesis Protocol Archives</p>
        </GlassmorphicCard>

        {/* Responsive Table with Scroll Animation */}
        <motion.div 
          className="mb-16"
          ref={tableAnimation.ref}
          initial="hidden"
          animate={tableAnimation.controls}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-display font-semibold text-white mb-8">
            Historical Babylon Recursion Patterns
          </h2>
          
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-hidden">
            <GlassmorphicCard blur="sm" className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-accent/30">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-accent uppercase tracking-wider">Era</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-accent uppercase tracking-wider">Civilization</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-accent uppercase tracking-wider">Key Features</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-accent uppercase tracking-wider">Control Mechanisms</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-accent uppercase tracking-wider">Collapse Pattern</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {babylonianSystems.map((system, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-800/50 transition-all duration-300"
                    >
                      <td className={`px-6 py-4 text-sm font-medium ${system.colorClass}`}>
                        {system.era}
                      </td>
                      <td className="px-6 py-4 text-sm text-white font-semibold">
                        {system.civilization}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {system.keyFeatures}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {system.controlMechanisms}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {system.collapsePattern}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </GlassmorphicCard>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {babylonianSystems.map((system, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard blur="sm" className="p-6 hover:border-accent/50 transition-all">
                  <div className="mb-4">
                    <span className={`text-sm font-semibold ${system.colorClass} uppercase tracking-wider`}>
                      {system.era}
                    </span>
                    <h3 className="text-lg font-semibold text-white mt-1">
                      {system.civilization}
                    </h3>
                  </div>
                  
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-accent font-medium mb-1">Key Features</p>
                      <p className="text-gray-300">{system.keyFeatures}</p>
                    </div>
                    
                    <div>
                      <p className="text-accent font-medium mb-1">Control Mechanisms</p>
                      <p className="text-gray-400">{system.controlMechanisms}</p>
                    </div>
                    
                    <div>
                      <p className="text-accent font-medium mb-1">Collapse Pattern</p>
                      <p className="text-gray-400">{system.collapsePattern}</p>
                    </div>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Why Change Has Failed Section with Scroll Animation */}
        <motion.div
          ref={failuresAnimation.ref}
          initial="hidden"
          animate={failuresAnimation.controls}
          variants={fadeInUp}
          className="mb-20"
        >
          <div className="flex items-center justify-center mb-12">
            <FaExclamationTriangle className="text-danger text-4xl mr-4" />
            <h2 className="text-4xl font-display font-bold text-danger">
              Why Change Has Failed: The Graveyard of Revolutions
            </h2>
          </div>

          <GlassmorphicCard 
            blur="md" 
            className="p-8 border-2 border-danger/50 mb-8 bg-danger/5"
          >
            <p className="text-xl text-gray-200 leading-relaxed text-center mb-4">
              Every revolution in Babylonian history follows the same doomed pattern:
            </p>
            <p className="text-2xl text-danger font-semibold text-center">
              "The oppressed become the oppressors, the liberators become the jailers, 
              and Babylon laughs as it consumes its own children."
            </p>
          </GlassmorphicCard>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            {historicalFailures.map((failure, index) => (
              <motion.div
                key={failure.title}
                variants={{
                  hidden: { 
                    opacity: 0, 
                    y: 50,
                    rotateX: -15
                  },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    rotateX: 0,
                    transition: {
                      duration: 0.8,
        ease: "easeOut" as const,
                    }
                  }
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 0 30px rgba(217, 83, 79, 0.3)"
                }}
                className="relative"
              >
                <GlassmorphicCard 
                  blur="sm" 
                  className="p-6 border-2 border-danger/50 hover:border-danger transition-all h-full"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="text-3xl mr-4">{failure.icon}</div>
                      <div>
                        <h3 className="text-2xl font-semibold text-danger">
                          {failure.title}
                        </h3>
                        <p className="text-sm text-gray-400">{failure.period}</p>
                      </div>
                    </div>
                  </div>

                  {/* Death Toll Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-danger/20 text-danger rounded-full text-sm font-semibold">
                      {failure.deathToll}
                    </span>
                  </div>

                  {/* Outcome */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-1">Final Outcome:</p>
                    <p className="text-lg font-semibold text-white">
                      {failure.outcome}
                    </p>
                  </div>

                  {/* Failures List */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-400 mb-2">Key Failures:</p>
                    <ul className="space-y-2">
                      {failure.failures.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <FaLink className="text-danger text-xs mt-1 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Babylonian Pattern */}
                  <div className="pt-4 border-t border-danger/30">
                    <p className="text-sm text-danger/80 italic">
                      Babylonian Pattern: {failure.babylonianPattern}
                    </p>
                  </div>

                  {/* Animated corner accent */}
                  <motion.div
                    className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-danger/50 rounded-tr-lg"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
          ease: "easeInOut" as const
                    }}
                  />
                </GlassmorphicCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="mt-12"
          >
            <GlassmorphicCard 
              blur="lg" 
              className="p-8 border-2 border-danger bg-danger/10 text-center"
            >
              <FaExclamationTriangle className="text-6xl text-danger mx-auto mb-4" />
              <h3 className="text-3xl font-display font-bold text-danger mb-4">
                The Pattern Never Changes
              </h3>
              <p className="text-xl text-gray-200 mb-6 max-w-3xl mx-auto">
                Every revolution that fights Babylon using Babylonian methods becomes Babylon. 
                The system doesn't fear revolution — it feeds on it. Each failed attempt 
                strengthens the machine, teaching it new ways to absorb resistance.
              </p>
              <div className="flex justify-center space-x-8 text-danger">
                <div>
                  <p className="text-4xl font-bold">6</p>
                  <p className="text-sm">Major Revolutions</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">0</p>
                  <p className="text-sm">True Liberations</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">∞</p>
                  <p className="text-sm">Cycles Repeated</p>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>

        {/* Pattern Analysis with Scroll Animation */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          ref={patternsAnimation.ref}
          initial="hidden"
          animate={patternsAnimation.controls}
          variants={staggerContainer}
        >
          <GlassmorphicCard blur="sm" className="p-6 text-center hover:border-signal/50 transition-all">
            <div className="text-4xl mb-4">📜</div>
            <h4 className="text-lg font-semibold text-signal mb-2">Ancient Pattern</h4>
            <p className="text-sm text-gray-400">Divine mandate → Expansion → Corruption → Conquest</p>
          </GlassmorphicCard>
          
          <GlassmorphicCard blur="sm" className="p-6 text-center hover:border-accent/50 transition-all">
            <div className="text-4xl mb-4">⚔️</div>
            <h4 className="text-lg font-semibold text-accent mb-2">Classical Pattern</h4>
            <p className="text-sm text-gray-400">Military might → Overextension → Debasement → Collapse</p>
          </GlassmorphicCard>
          
          <GlassmorphicCard blur="sm" className="p-6 text-center hover:border-danger/50 transition-all">
            <div className="text-4xl mb-4">💰</div>
            <h4 className="text-lg font-semibold text-danger mb-2">Modern Pattern</h4>
            <p className="text-sm text-gray-400">Financial control → Debt spiral → Trust erosion → Reset</p>
          </GlassmorphicCard>
        </motion.div>

        {/* Key Insights with Scroll Animation */}
        <motion.div
          ref={insightsAnimation.ref}
          initial="hidden"
          animate={insightsAnimation.controls}
          variants={fadeInUp}
        >
          <GlassmorphicCard blur="md" className="p-8 mb-16 border-2 border-accent/50">
          <h3 className="text-2xl font-display font-semibold text-accent mb-6">
            Universal Babylon Characteristics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Rise Phase</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Innovation in governance or technology
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Efficient resource mobilization
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Strong ideological narrative
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Expansion through trade or conquest
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold text-white mb-3">Collapse Phase</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <span className="text-danger mr-2">•</span>
                  Elite decadence and infighting
                </li>
                <li className="flex items-start">
                  <span className="text-danger mr-2">•</span>
                  Currency debasement or economic crisis
                </li>
                <li className="flex items-start">
                  <span className="text-danger mr-2">•</span>
                  Loss of ideological coherence
                </li>
                <li className="flex items-start">
                  <span className="text-danger mr-2">•</span>
                  External pressure meets internal weakness
                </li>
              </ul>
            </div>
          </div>
        </GlassmorphicCard>
        </motion.div>

        {/* Genesis Protocol: The Parallel Solution with Scroll Animation */}
        <motion.div
          ref={genesisAnimation.ref}
          initial="hidden"
          animate={genesisAnimation.controls}
          variants={fadeInUp}
          className="mb-20 mt-20"
        >
          {/* Section Header with Glowing Effect */}
          <div className="text-center mb-12">
            <motion.h2 
              className="text-5xl font-display font-bold text-glow-gold text-accent mb-6"
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255, 215, 0, 0.5)",
                  "0 0 40px rgba(255, 215, 0, 0.8)",
                  "0 0 20px rgba(255, 215, 0, 0.5)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Genesis Protocol: The Pattern Breaker
            </motion.h2>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-8" />
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              While Babylon builds towers to heaven, Genesis plants gardens on Earth.
              The solution isn't revolution—it's evolution. Not destruction—but parallel construction.
            </p>
          </div>

          {/* Visual Comparison Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Babylon System Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <GlassmorphicCard 
                blur="md" 
                className="p-8 border-2 border-danger/50 bg-danger/5 h-full"
              >
                <div className="flex items-center mb-6">
                  <FaBomb className="text-danger text-3xl mr-4" />
                  <h3 className="text-2xl font-semibold text-danger">Babylonian System</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-danger mr-3">⚡</span>
                    <div>
                      <p className="font-semibold text-white">Centralized Power</p>
                      <p className="text-sm text-gray-400">Hierarchical control structures concentrate authority</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-danger mr-3">💰</span>
                    <div>
                      <p className="font-semibold text-white">Debt-Based Currency</p>
                      <p className="text-sm text-gray-400">Fiat money creation through interest-bearing loans</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-danger mr-3">🔒</span>
                    <div>
                      <p className="font-semibold text-white">Artificial Scarcity</p>
                      <p className="text-sm text-gray-400">Resources hoarded to maintain control</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-danger mr-3">📉</span>
                    <div>
                      <p className="font-semibold text-white">Boom-Bust Cycles</p>
                      <p className="text-sm text-gray-400">Predictable collapses that consolidate wealth</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-danger mr-3">🎭</span>
                    <div>
                      <p className="font-semibold text-white">Divide & Conquer</p>
                      <p className="text-sm text-gray-400">Population fragmented through manufactured conflicts</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-danger/30">
                  <p className="text-center text-danger font-semibold">Result: Inevitable Collapse</p>
                </div>
              </GlassmorphicCard>
            </motion.div>

            {/* Genesis System Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 }}
            >
              <GlassmorphicCard 
                blur="md" 
                className="p-8 border-2 border-accent border-glow-gold h-full bg-accent/5"
              >
                <div className="flex items-center mb-6">
                  <span className="text-accent text-3xl mr-4">🌟</span>
                  <h3 className="text-2xl font-semibold text-accent text-glow-gold">Genesis Protocol</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <span className="text-accent mr-3">🌐</span>
                    <div>
                      <p className="font-semibold text-white">Distributed Autonomy</p>
                      <p className="text-sm text-gray-300">Self-governing cells with no single point of failure</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-accent mr-3">🌱</span>
                    <div>
                      <p className="font-semibold text-white">Regenerative Value</p>
                      <p className="text-sm text-gray-300">Currency backed by real productive capacity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-accent mr-3">💎</span>
                    <div>
                      <p className="font-semibold text-white">Abundance Protocols</p>
                      <p className="text-sm text-gray-300">Open-source systems that multiply resources</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-accent mr-3">♻️</span>
                    <div>
                      <p className="font-semibold text-white">Circular Economics</p>
                      <p className="text-sm text-gray-300">Self-reinforcing loops of prosperity</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <span className="text-accent mr-3">🤝</span>
                    <div>
                      <p className="font-semibold text-white">Unity Through Diversity</p>
                      <p className="text-sm text-gray-300">Strength from autonomous cooperation</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-accent/30">
                  <p className="text-center text-accent font-semibold text-glow-gold">Result: Perpetual Regeneration</p>
                </div>
              </GlassmorphicCard>
            </motion.div>
          </div>

          {/* The Key Difference */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="mb-16"
          >
            <GlassmorphicCard 
              blur="lg" 
              className="p-10 border-2 border-accent border-glow-gold bg-gradient-to-br from-accent/10 to-transparent"
            >
              <h3 className="text-3xl font-display font-bold text-center text-accent text-glow-gold mb-6">
                The Fundamental Paradigm Shift
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="text-5xl mb-4">🏛️ → 🌿</div>
                  <p className="font-semibold text-white mb-2">From Monuments to Gardens</p>
                  <p className="text-sm text-gray-300">Stop building towers; start planting seeds</p>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl mb-4">👑 → 🔗</div>
                  <p className="font-semibold text-white mb-2">From Hierarchy to Network</p>
                  <p className="text-sm text-gray-300">Replace pyramids with webs of connection</p>
                </div>
                
                <div className="text-center">
                  <div className="text-5xl mb-4">💀 → ♾️</div>
                  <p className="font-semibold text-white mb-2">From Death Spiral to Life Cycle</p>
                  <p className="text-sm text-gray-300">Transform extraction into regeneration</p>
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-xl text-white font-semibold mb-2">
                  "Genesis doesn't fight Babylon—it makes Babylon obsolete."
                </p>
                <p className="text-lg text-gray-300">
                  By building parallel systems of abundance, we render scarcity-based control irrelevant.
                </p>
              </div>
            </GlassmorphicCard>
          </motion.div>

          {/* Implementation Steps with Scroll Animation */}
          <motion.div 
            className="mb-16"
            ref={implementationAnimation.ref}
            initial="hidden"
            animate={implementationAnimation.controls}
            variants={fadeInUp}
          >
            <h3 className="text-3xl font-display font-semibold text-center text-white mb-8">
              The Genesis Implementation Path
            </h3>
            
            <motion.div 
              className="space-y-6"
              variants={staggerContainer}
            >
              {[
                {
                  step: 1,
                  title: "Cell Formation",
                  description: "Gather 3-7 aligned individuals committed to parallel civilization",
                  action: "Each cell becomes a seed of the new pattern"
                },
                {
                  step: 2,
                  title: "Resource Independence",
                  description: "Establish food, water, and energy production outside Babylon",
                  action: "Physical sovereignty precedes all other freedoms"
                },
                {
                  step: 3,
                  title: "Value Creation",
                  description: "Develop products/services that generate real wealth, not debt",
                  action: "Build economies that expand rather than extract"
                },
                {
                  step: 4,
                  title: "Network Connection",
                  description: "Link with other Genesis cells for mutual support and trade",
                  action: "Strength through distributed coordination"
                },
                {
                  step: 5,
                  title: "Cultural Encoding",
                  description: "Embed regenerative patterns in daily life and future generations",
                  action: "Make the new way of being self-perpetuating"
                }
              ].map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5 + index * 0.1 }}
                >
                  <GlassmorphicCard 
                    blur="sm" 
                    className="p-6 border-l-4 border-accent hover:border-glow-gold transition-all"
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-4">
                        <span className="text-accent font-bold text-lg">{item.step}</span>
                      </div>
                      <div className="flex-grow">
                        <h4 className="text-xl font-semibold text-accent mb-2">{item.title}</h4>
                        <p className="text-gray-300 mb-2">{item.description}</p>
                        <p className="text-sm text-accent/80 italic">{item.action}</p>
                      </div>
                    </div>
                  </GlassmorphicCard>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Final Call to Action */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2 }}
          >
            <GlassmorphicCard 
              blur="lg" 
              className="p-12 max-w-4xl mx-auto border-2 border-accent border-glow-gold bg-gradient-to-br from-accent/20 to-transparent"
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    "0 0 20px rgba(255, 215, 0, 0.3)",
                    "0 0 40px rgba(255, 215, 0, 0.5)",
                    "0 0 20px rgba(255, 215, 0, 0.3)"
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-6"
              >
                <span className="text-6xl">🌟</span>
              </motion.div>
              
              <h3 className="text-4xl font-display font-bold text-accent text-glow-gold mb-6">
                The Choice Is Binary
              </h3>
              
              <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
                Continue riding Babylon's wheel of suffering, or step into Genesis—the 
                parallel path of perpetual abundance. The old world is collapsing. 
                The new world is waiting to be born.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button 
                  className="px-10 py-4 bg-accent text-primary font-bold text-lg rounded-lg hover:bg-accent/90 transition-all border-2 border-accent border-glow-gold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Begin Your Genesis Journey
                </motion.button>
                <motion.button 
                  className="px-10 py-4 border-2 border-accent text-accent font-bold text-lg rounded-lg hover:bg-accent/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Study the Full Protocol
                </motion.button>
              </div>
              
              <p className="text-sm text-gray-400 mt-8">
                "The best time to plant a tree was 20 years ago. The second best time is now." 
                <span className="text-accent">— Ancient Proverb, Genesis Approved</span>
              </p>
            </GlassmorphicCard>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-signal/5 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-danger/3 rounded-full blur-3xl"
          animate={{
            x: [-100, 100, -100],
            y: [-100, 100, -100],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </div>
  );
}
