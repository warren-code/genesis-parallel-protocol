'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroSection from './components/hero/HeroSection';
import VideoBackground from './components/hero/VideoBackground';
import AnimatedLoopVisualization from './components/hero/AnimatedLoopVisualization';
import { Button, GlassmorphicCard, ParallaxGrid } from './components/ui';
import FeatureCard from './components/ui/FeatureCard';
import StatsDashboard from './components/dashboard/StatsDashboard';
import RecursionRing from './components/animations/RecursionRing';
import LoopDiagram from './components/animations/LoopDiagram';
import {
  ConsciousnessIcon,
  RecursionIcon,
  CommunityIcon,
  ProtocolIcon,
  RealityIcon,
  TransformIcon,
} from './components/icons';

export default function Home() {
  const keyDomains = [
    { 
      label: 'Loop Economics', 
      icon: <RecursionIcon size={40} />, 
      href: '/economics',
      description: 'Replace extractive systems with regenerative loops'
    },
    { 
      label: 'Governance', 
      icon: <ProtocolIcon size={40} />, 
      href: '/governance',
      description: 'Decentralized decision-making protocols'
    },
    { 
      label: 'Community', 
      icon: <CommunityIcon size={40} />, 
      href: '/community',
      description: 'Build autonomous networks of trust'
    },
    { 
      label: 'FOIA Mills', 
      icon: <TransformIcon size={40} />, 
      href: '/foia',
      description: 'Transparency through automated requests'
    },
  ];

  return (
    <div className="relative bg-primary min-h-screen">
      {/* Hero Section with Video Background */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <VideoBackground />
        
        <div className="relative z-10 container mx-auto px-4 py-16">
          <motion.div 
            className="text-center max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Main Tagline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 tracking-tight">
              Replace Extractive Loops with 
              <span className="text-accent block mt-2">Living Loops</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray mb-12 max-w-3xl mx-auto">
              Join the Genesis Protocol movement to build regenerative systems that sustain communities, 
              not extract from them.
            </p>

            {/* Animated Loop Visualization */}
            <div className="flex justify-center mb-12">
              <AnimatedLoopVisualization size={400} />
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button variant="primary" size="lg" glowEffect>
                Join the Movement
              </Button>
              <Button variant="accent" size="lg">
                Learn More
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
            <path d="M12 2v28M5 23l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </motion.div>
      </section>

      {/* Key Domains Quick Access */}
      <section className="relative py-20 px-4">
        <ParallaxGrid gridSize={60} color="accent" opacity={0.05} />
        
        <div className="relative z-10 container mx-auto max-w-7xl">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
              Enter the Genesis System
            </h2>
            <p className="text-xl text-gray max-w-3xl mx-auto">
              Explore our key domains and discover how to participate in the living loop economy
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {keyDomains.map((domain, index) => (
              <motion.div
                key={domain.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassmorphicCard 
                  blur="md" 
                  className="p-6 h-full hover:border-accent/50 transition-all cursor-pointer group"
                  onClick={() => window.location.href = domain.href}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 text-accent group-hover:scale-110 transition-transform">
                      {domain.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{domain.label}</h3>
                    <p className="text-gray text-sm">{domain.description}</p>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Loop Visualization Section */}
      <section className="relative py-20 px-4">
        <ParallaxGrid gridSize={60} color="signal" opacity={0.05} />
        
        <div className="relative z-10 container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-4">
              The Infinite Loop Architecture
            </h2>
            <p className="text-xl text-gray max-w-3xl mx-auto">
              Experience the power of recursive economic loops and decentralized coordination
            </p>
          </div>

          {/* Central Loop Diagram */}
          <div className="flex justify-center mb-20">
            <GlassmorphicCard blur="lg" className="p-8 md:p-12">
              <LoopDiagram 
                size={400} 
                color="accent" 
                speed={3} 
                showLabels 
                interactive 
                className="mx-auto"
              />
            </GlassmorphicCard>
          </div>

          {/* Quick Action Feature Cards */}
          <div className="mb-20">
            <h3 className="text-3xl font-display font-semibold text-center text-ink mb-12">
              Core Protocol Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureCard
                icon={<RecursionIcon size={56} />}
                title="Loop Economics"
                description="Create self-sustaining economic loops that generate value through recursive patterns and community coordination."
                action={{
                  label: "Explore Loops",
                  onClick: () => console.log('Navigate to economics'),
                }}
                color="accent"
                delay={0.1}
              />
              
              <FeatureCard
                icon={<ProtocolIcon size={56} />}
                title="Decentralized Governance"
                description="Participate in autonomous decision-making through distributed consensus and collective intelligence frameworks."
                action={{
                  label: "Join Governance",
                  onClick: () => console.log('Navigate to governance'),
                }}
                color="signal"
                delay={0.2}
              />
              
              <FeatureCard
                icon={<CommunityIcon size={56} />}
                title="Community Networks"
                description="Join autonomous communities working together through shared protocols and collaborative resource management."
                action={{
                  label: "Join Network",
                  onClick: () => console.log('Navigate to community'),
                }}
                color="danger"
                delay={0.3}
              />
              
              <FeatureCard
                icon={<TransformIcon size={56} />}
                title="Memetic Architecture"
                description="Build and propagate ideas through shared cognitive patterns and emotional loops that strengthen community bonds."
                action={{
                  label: "Explore Memetics",
                  onClick: () => console.log('Navigate to memetics'),
                }}
                color="ink"
                delay={0.4}
              />
              
              <FeatureCard
                icon={<ProtocolIcon size={56} />}
                title="Resource Coordination"
                description="Efficiently manage and distribute resources through decentralized networks and collaborative decision-making."
                action={{
                  label: "View Resources",
                  onClick: () => console.log('Navigate to resources'),
                }}
                color="accent"
                delay={0.5}
              />
              
              <FeatureCard
                icon={<CommunityIcon size={56} />}
                title="Rapid Response"
                description="Coordinate community responses to incidents through real-time alerts and decentralized action networks."
                action={{
                  label: "Join Response",
                  onClick: () => console.log('Navigate to rapid-response'),
                }}
                color="signal"
                delay={0.6}
              />
              
              <FeatureCard
                icon={<ProtocolIcon size={56} />}
                title="FOIA Mills"
                description="Automate Freedom of Information Act requests, track responses, and analyze government data for transparency."
                action={{
                  label: "Start FOIA Request",
                  onClick: () => window.location.href = '/foia',
                }}
                color="danger"
                delay={0.7}
              />
            </div>
          </div>

          {/* Statistics Dashboard */}
          <StatsDashboard
            title="Community Impact Metrics"
            stats={[
              { label: "Active Loops", value: 12847, color: "accent" },
              { label: "Community Nodes", value: 3421, color: "signal" },
              { label: "Resources Shared", value: 89234, color: "danger" },
              { label: "Governance Actions", value: 9999, suffix: "+", color: "ink" },
            ]}
            className="mb-20"
          />

          {/* Loop Process Explanation */}
          <div className="mb-20">
            <GlassmorphicCard blur="md" className="p-12">
              <h3 className="text-3xl font-display font-semibold text-center text-ink mb-12">
                The Loop Process
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                {[
                  { phase: "Input", description: "Resources enter the loop", color: "accent" },
                  { phase: "Process", description: "Value transformation begins", color: "signal" },
                  { phase: "Output", description: "Community benefit emerges", color: "danger" },
                  { phase: "Feedback", description: "Results inform adaptation", color: "ink" },
                  { phase: "Recursion", description: "The cycle self-reinforces", color: "accent" },
                ].map((step, index) => {
                  const colorClasses = {
                    accent: 'text-accent',
                    signal: 'text-signal',
                    danger: 'text-danger',
                    ink: 'text-ink',
                  };
                  
                  return (
                    <div key={step.phase} className="text-center">
                      <div className={`${colorClasses[step.color as keyof typeof colorClasses]} mb-4`}>
                        <RecursionRing size={80} rings={2} speed={2 + index * 0.5} color={step.color as any} />
                      </div>
                      <h4 className={`text-lg font-display font-semibold ${colorClasses[step.color as keyof typeof colorClasses]} mb-2`}>
                        {step.phase}
                      </h4>
                      <p className="text-sm text-gray">
                        {step.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </GlassmorphicCard>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <GlassmorphicCard blur="lg" className="p-12 max-w-3xl mx-auto">
              <h3 className="text-3xl font-display font-semibold text-ink mb-4">
                Ready to Enter the Loop?
              </h3>
              <p className="text-xl text-gray mb-8">
                Join thousands of community builders creating sustainable futures through loop economics and decentralized governance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="primary" size="lg" glowEffect>
                  Initialize Your Loop
                </Button>
                <Button variant="accent" size="lg">
                  Learn More
                </Button>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </section>
    </div>
  );
}
