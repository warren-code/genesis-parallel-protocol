'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { fadeInUp } from '@/lib/animations';
import { FaBrain, FaHandshake, FaLeaf, FaShieldAlt, FaChartLine, FaGlobe } from 'react-icons/fa';

export default function WhyGenesisPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-display font-bold text-ink mb-6">
          Why Genesis?
        </h1>
        <p className="text-xl text-gray max-w-3xl mx-auto">
          The current systems have failed us. It's time to build something new—a civilization that serves humanity, not institutions.
        </p>
      </motion.div>

      {/* The Problems Section */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <h2 className="text-3xl font-display font-bold text-ink mb-8 text-center">
          The Current System Is Broken
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <FaBrain className="w-8 h-8" />,
              title: "Mental Health Crisis",
              description: "Rising anxiety, depression, and isolation in a system that prioritizes profit over wellbeing"
            },
            {
              icon: <FaChartLine className="w-8 h-8" />,
              title: "Economic Inequality",
              description: "Wealth concentration at unprecedented levels while working families struggle to survive"
            },
            {
              icon: <FaLeaf className="w-8 h-8" />,
              title: "Environmental Collapse",
              description: "Climate change accelerating while corporations continue extractive practices"
            },
            {
              icon: <FaShieldAlt className="w-8 h-8" />,
              title: "Failed Governance",
              description: "Democratic institutions captured by special interests, unable to address real problems"
            },
            {
              icon: <FaHandshake className="w-8 h-8" />,
              title: "Social Fragmentation",
              description: "Communities dissolved by individualism and digital isolation"
            },
            {
              icon: <FaGlobe className="w-8 h-8" />,
              title: "Global Instability",
              description: "Rising conflicts over dwindling resources in a zero-sum game"
            }
          ].map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
            >
              <GlassmorphicCard className="h-full p-6">
                <div className="text-red-400 mb-4">{problem.icon}</div>
                <h3 className="text-xl font-bold text-ink mb-3">{problem.title}</h3>
                <p className="text-gray">{problem.description}</p>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Why Change Has Failed Section */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <GlassmorphicCard className="p-12 border-accent">
          <h2 className="text-3xl font-display font-bold text-ink mb-8 text-center">
            Why Traditional Solutions Have Failed
          </h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-accent mb-3">1. Working Within the System</h3>
              <p className="text-gray leading-relaxed">
                Reform attempts are absorbed and neutralized. The system is designed to protect itself, not to change. 
                Electoral politics, corporate responsibility, and incremental reforms have proven insufficient against 
                entrenched power structures.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-accent mb-3">2. Isolated Communities</h3>
              <p className="text-gray leading-relaxed">
                Individual communes and intentional communities remain vulnerable to external pressures. Without 
                economic sovereignty and legal protection, they cannot scale or sustain themselves against 
                systemic forces.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-accent mb-3">3. Technological Solutionism</h3>
              <p className="text-gray leading-relaxed">
                Technology alone cannot solve problems rooted in power structures and incentive systems. 
                Blockchain, AI, and other innovations are tools—they need proper governance and values 
                to serve humanity.
              </p>
            </div>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* The Genesis Solution */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        <h2 className="text-3xl font-display font-bold text-ink mb-8 text-center">
          The Genesis Solution: Build Parallel
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <GlassmorphicCard className="p-8">
            <h3 className="text-2xl font-bold text-accent mb-4">What Makes Genesis Different</h3>
            <ul className="space-y-4 text-gray">
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">→</span>
                <span><strong className="text-ink">Complete System:</strong> Not just economics or governance, but a full civilizational stack</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">→</span>
                <span><strong className="text-ink">Economic Sovereignty:</strong> Loop economics creates independence from exploitative markets</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">→</span>
                <span><strong className="text-ink">Legal Protection:</strong> DAO structure provides legitimate organizational framework</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">→</span>
                <span><strong className="text-ink">Scalable Design:</strong> Built to grow from local nodes to global network</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-3 mt-1">→</span>
                <span><strong className="text-ink">Values-First:</strong> Human flourishing as the core metric, not profit</span>
              </li>
            </ul>
          </GlassmorphicCard>
          
          <GlassmorphicCard className="p-8">
            <h3 className="text-2xl font-bold text-signal mb-4">The Path Forward</h3>
            <div className="space-y-4 text-gray">
              <p>
                Genesis doesn't try to fix the broken system—it builds a new one alongside it. 
                By creating parallel structures for governance, economics, and community, we can 
                transition peacefully from the failing paradigm to one that serves life.
              </p>
              <p>
                This isn't escapism or utopianism. It's practical construction of alternatives 
                that can outcompete destructive systems by better serving human needs. When 
                people have a choice between exploitation and flourishing, the transition 
                becomes inevitable.
              </p>
              <p className="font-bold text-ink">
                The question isn't whether the current system will fail—it's whether we'll 
                have something better ready when it does.
              </p>
            </div>
          </GlassmorphicCard>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <GlassmorphicCard className="inline-block p-12 border-glow-gold">
          <h2 className="text-3xl font-display font-bold text-ink mb-6">
            Ready to Build Something Better?
          </h2>
          <p className="text-xl text-gray mb-8 max-w-2xl mx-auto">
            Join thousands who are creating the parallel structures for a civilization 
            that serves humanity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/parallel-protocol"
              className="px-8 py-4 bg-gradient-to-r from-accent to-signal text-primary rounded-xl font-bold hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              Explore the Protocol
            </Link>
            <Link
              href="/mission"
              className="px-8 py-4 border-2 border-ink text-ink rounded-xl font-bold hover:bg-ink hover:text-primary transition-all duration-300"
            >
              Read Our Mission
            </Link>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}
