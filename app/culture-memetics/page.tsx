'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';
import { 
  FaMusic, FaLink, FaExclamationTriangle, FaCheckCircle,
  FaPlay, FaPause, FaExternalLinkAlt, FaDownload,
  FaBroadcastTower, FaCode, FaUsers, FaCopy,
  FaChartLine, FaTools, FaRocket, FaQrcode
} from 'react-icons/fa';
import OperationalAudioPlayer from '@/components/OperationalAudioPlayer';

const CultureMemeticsPage = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  const memeticSupplyChain = [
    { stage: 'A&R/Label Advances', result: 'Debt obedience', outcome: 'Trend cloning' },
    { stage: 'DSP Playlists/Algorithms', result: 'Engagement capture', outcome: 'Emotional opiates' },
    { stage: 'Influencer Loops', result: 'Identity tribalism', outcome: 'Narrative polarization' },
    { stage: 'Ad-Tech Targeting', result: 'Behavioral funnels', outcome: 'Consumption compulsion' },
    { stage: 'Catalog Finance (PE)', result: 'Risk minimization', outcome: 'Cultural monocrops' }
  ];

  const memeticWeaponFramework = [
    { 
      title: 'Earworm Loop Programming',
      description: 'hooks encode a 7±2 syllable actionable phrase',
      icon: FaMusic
    },
    { 
      title: 'Semantic Spine',
      description: 'verse→pre→hook escalates problem → agency → protocol',
      icon: FaCode
    },
    { 
      title: 'Protocol Cards in Liner Notes',
      description: 'QR to SRL cards (e.g., Pure Collapse, Parallel Protocol)',
      icon: FaQrcode
    },
    { 
      title: 'Cue-Stacks in Arrangements',
      description: 'rhythmic/FX cues map to breathwork or focus states',
      icon: FaBroadcastTower
    },
    { 
      title: 'Call-Through UX',
      description: 'track pages trigger \'Act, not distract\' flows',
      icon: FaRocket
    }
  ];

  const actionMetrics = [
    { metric: 'Primary KPI', value: 'Action completions', examples: 'sign-ups, volunteer shifts, donations' },
    { metric: 'Secondary KPI', value: 'SRL retention', examples: 'weekly practice streaks, protocol usage' },
    { metric: 'Tertiary KPI', value: 'Streams as reach proxy', examples: 'only for awareness measurement' }
  ];

  const creatorToolkit = [
    'Hook Script Generator (earworm→action)',
    'CTA-Linked Canvas/Shorts templates',
    'Release Playbook (7-day sprint calendar with community ops)',
    'Attribution & Licensing for Operational Art (copy-left with action-preserving clauses)'
  ];

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute inset-0"
              animate={{
                background: [
                  'radial-gradient(circle at 0% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 100% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                  'radial-gradient(circle at 0% 50%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)'
                ]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500">
                <FaMusic className="text-3xl text-white" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white">
                Culture & Memetics
              </h1>
            </div>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl">
              How culture is engineered to enforce Babylonian code — and how we reclaim it. 
              Maps the pipelines that co-opt artists into <GlossaryTooltip term="CERL">CERL</GlossaryTooltip> 
              propagation and provides counter-design for <GlossaryTooltip term="Operational Art">Operational Art</GlossaryTooltip>: 
              music and media that seed <GlossaryTooltip term="SRL">SRLs</GlossaryTooltip> and measurable action.
            </p>

            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300">
                Cultural Engineering
              </div>
              <div className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300">
                Memetic Design
              </div>
              <div className="px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300">
                Action Metrics
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* How Artists Get Co-opted */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <FaLink className="text-2xl text-red-400" />
            <h2 className="text-2xl font-bold text-white">How Artists Get Co-opted</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            Babylon's cultural stack recruits creators via advances, catalog lock-in, algorithmic throttling, 
            and incentive schemes that reward distraction loops over development loops. Result: virality fuels 
            <GlossaryTooltip term="CERL">CERLs</GlossaryTooltip> (hedonism, consumer idolatry, nihilism); 
            dissent is aestheticized but de-teethed; 'authenticity' is packaged as safe spectacle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Debt Slavery', 'Algorithm Capture', 'Identity Commodification'].map((trap, idx) => (
              <div key={trap} className="p-4 bg-red-500/10 rounded-lg border border-red-500/30">
                <h4 className="font-semibold text-red-400 mb-2">{trap}</h4>
                <p className="text-sm text-gray-400">
                  {idx === 0 && 'Label advances create financial dependency, forcing trend compliance'}
                  {idx === 1 && 'Platforms reward engagement over substance, creating dopamine loops'}
                  {idx === 2 && 'Authenticity becomes brand, rebellion becomes aesthetic'}
                </p>
              </div>
            ))}
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Memetic Supply Chain Diagnosis */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mb-16"
      >
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Memetic Supply Chain (Diagnosis)
        </h2>
        
        <div className="space-y-4">
          {memeticSupplyChain.map((link, index) => (
            <motion.div
              key={link.stage}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GlassmorphicCard className="p-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-red-500/20 border-2 border-red-500/50 flex items-center justify-center">
                      <span className="text-red-400 font-bold">{index + 1}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{link.stage}</h4>
                      <p className="text-sm text-gray-400">{link.result}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaExclamationTriangle className="text-yellow-500" />
                    <span className="text-yellow-400 text-sm">{link.outcome}</span>
                  </div>
                </div>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Operational Art Counter-Design */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8 border-2 border-green-500/30">
          <div className="flex items-center gap-3 mb-6">
            <FaCheckCircle className="text-2xl text-green-400" />
            <h2 className="text-2xl font-bold text-white">
              <GlossaryTooltip term="Operational Art">Operational Art</GlossaryTooltip> (Counter-Design)
            </h2>
          </div>
          
          <p className="text-gray-300 mb-8">
            Art as <GlossaryTooltip term="SRL">SRL</GlossaryTooltip> engineering: compose, arrange, 
            and release works to instantiate actions in listeners (learn, build, organize, contribute, heal). 
            Every drop embeds calls-to-action and micro-protocols; releases are timed with community sprints 
            and DAO proposals; metrics track action completed, not just streams.
          </p>

          {/* Memetic Weapon Framework */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaTools className="text-primary" />
              <GlossaryTooltip term="Memetic Weapon">Memetic Weapon</GlossaryTooltip> Framework
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {memeticWeaponFramework.map((tool) => (
                <div key={tool.title} className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <tool.icon className="text-2xl text-primary mb-3" />
                  <h4 className="font-semibold text-white mb-2">
                    {tool.title === 'Earworm Loop Programming' ? (
                      <GlossaryTooltip term="Earworm Loop Programming">{tool.title}</GlossaryTooltip>
                    ) : tool.title}
                  </h4>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action-First Analytics */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <FaChartLine className="text-primary" />
              Action-First Analytics
            </h3>
            <div className="space-y-3">
              {actionMetrics.map((kpi) => (
                <div key={kpi.metric} className="flex items-start gap-4 p-3 bg-black/30 rounded-lg">
                  <span className="font-semibold text-primary min-w-[120px]">{kpi.metric}:</span>
                  <div>
                    <span className="text-white">{kpi.value}</span>
                    <span className="text-gray-400 text-sm ml-2">({kpi.examples})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Featured Artist Section with Audio Player */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mb-16"
      >
        <GlassmorphicCard className="p-8">
          <h2 className="text-2xl font-bold text-white mb-6">
            Featured Artist: <GlossaryTooltip term="Operational Art">Operational Art</GlossaryTooltip> in Practice
          </h2>
          
          <p className="text-gray-300 mb-6">
            This catalog is not entertainment; it's <strong>operational art</strong> — tracks are memetic tools 
            built to seed <GlossaryTooltip term="SRL">SRLs</GlossaryTooltip> and trigger constructive loops in the listener.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Audio Player Section */}
            <div>
              <OperationalAudioPlayer 
                trackTitle="Act, Not Distract"
                artistName="Genesis Protocol Artist"
                audioUrl="#" // Replace with actual audio URL
              />
              
              <div className="mt-6 space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <h4 className="font-semibold text-blue-400 mb-2">How to Use</h4>
                  <p className="text-sm text-gray-300">
                    Start with "Act, Not Distract." Use it as a pre-work sprint cue; 
                    the hook anchors the shift from passive consumption to immediate action.
                  </p>
                </div>
                
                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">Use Case</h4>
                  <p className="text-sm text-gray-300">
                    Pair playback with 'Act Stack' — a 3-step micro-task 
                    (e.g., 90s inbox zero, 3 outreach messages, 1 DAO vote).
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4">
              <Link href="https://soundcouch.soundcloud.com/#/profile/1566767877" target="_blank">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2">
                  <FaPlay />
                  Listen: Act, Not Distract
                  <FaExternalLinkAlt className="text-sm" />
                </button>
              </Link>
              
              <Link href="/protocols">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300 flex items-center justify-center gap-2">
                  <FaDownload />
                  Get Protocol Cards
                </button>
              </Link>
              
              <Link href="/dao-governance">
                <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 flex items-center justify-center gap-2">
                  <FaUsers />
                  Join DAO & Contribute
                </button>
              </Link>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Creator Toolkit */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <GlassmorphicCard className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <FaTools className="text-2xl text-primary" />
            <h2 className="text-2xl font-bold text-white">Creator Toolkit</h2>
          </div>
          
          <p className="text-gray-300 mb-6">
            A reproducible kit for artists to author SRL-aligned releases.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {creatorToolkit.map((tool, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <FaCheckCircle className="text-primary mt-1" />
                <span className="text-gray-300">{tool}</span>
              </div>
            ))}
          </div>

          {/* Make it Operational Sidebar */}
          <div className="mt-8 p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/30">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <FaRocket className="text-primary" />
              Make it Operational
            </h3>
            <div className="space-y-3">
              <button 
                onClick={() => navigator.clipboard.writeText('Act, not distract')}
                className="w-full px-4 py-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors flex items-center justify-between group"
              >
                <span className="text-sm text-gray-300">Copy: "Act, not distract"</span>
                <FaCopy className="text-gray-500 group-hover:text-primary transition-colors" />
              </button>
              <Link href="/protocols">
                <button className="w-full px-4 py-2 bg-black/30 rounded-lg hover:bg-black/50 transition-colors flex items-center justify-between group">
                  <span className="text-sm text-gray-300">Get Protocol QR Codes</span>
                  <FaQrcode className="text-gray-500 group-hover:text-primary transition-colors" />
                </button>
              </Link>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>
    </div>
  );
};

export default CultureMemeticsPage;
