'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import HeroSection from './components/HeroSection';
import ConceptExplainer from './components/ConceptExplainer';
import InteractiveTimeline from './components/InteractiveTimeline';
import CaseStudies from './components/CaseStudies';
import ResourcesSection from './components/ResourcesSection';
import ParallaxDivider from './components/ParallaxDivider';
import IncidentMap from './components/IncidentMap';
import AlertSystem from './components/AlertSystem';
import ProtestCoordination from './components/ProtestCoordination';
import TrainingHub from './components/TrainingHub';
import SecureComms from './components/SecureComms';
import QuickActions from './components/QuickActions';

export default function PeacefulMilitancePage() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = window.scrollY / totalHeight;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#00ff00] to-[#00cc00] z-50"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Hero Section with Title */}
      <HeroSection />

      {/* Quick Actions Bar */}
      <QuickActions />

      {/* Real-time Alert System */}
      <AlertSystem />

      {/* Incident Reporting with Map */}
      <section className="relative py-20 px-6 bg-[#0f0f0f]/50">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            Live <span className="text-[#00ff00]">Incident Tracking</span>
          </motion.h2>
          <IncidentMap />
        </div>
      </section>

      {/* Parallax Divider */}
      <ParallaxDivider 
        imageSrc="/images/peaceful-resistance-1.jpg"
        quote="In the end, we will remember not the words of our enemies, but the silence of our friends."
        author="Martin Luther King Jr."
      />

      {/* Concept Explanation with Scrollytelling */}
      <ConceptExplainer />

      {/* Parallax Divider */}
      <ParallaxDivider 
        imageSrc="/images/peaceful-resistance-2.jpg"
        quote="Non-violence is the greatest force at the disposal of mankind."
        author="Mahatma Gandhi"
      />

      {/* Interactive Timeline */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          >
            History of <span className="text-[#00ff00]">Peaceful Resistance</span>
          </motion.h2>
          <InteractiveTimeline />
        </div>
      </section>

      {/* Parallax Divider */}
      <ParallaxDivider 
        imageSrc="/images/peaceful-resistance-3.jpg"
        quote="The arc of the moral universe is long, but it bends toward justice."
        author="Theodore Parker"
      />

      {/* Case Studies */}
      <CaseStudies />

      {/* Protest Coordination Tools */}
      <ProtestCoordination />

      {/* Parallax Divider */}
      <ParallaxDivider 
        imageSrc="/images/peaceful-resistance-4.jpg"
        quote="Courage is what it takes to stand up and speak; courage is also what it takes to sit down and listen."
        author="Winston Churchill"
      />

      {/* Training Materials Hub */}
      <TrainingHub />

      {/* Secure Communication Channels */}
      <SecureComms />

      {/* Resources Section */}
      <ResourcesSection />

      {/* Call to Action */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#00ff00]/10 to-transparent" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white">
            Be the Change
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">
            Peaceful militance is not passive. It's the most powerful form of active resistance.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-[#00ff00] text-black font-bold rounded-full text-lg hover:bg-[#00cc00] transition-colors"
          >
            Join the Movement
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
