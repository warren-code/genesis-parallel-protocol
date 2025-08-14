'use client';

import React from 'react';
import BabylonianTaxonomyHero from '../components/hero/BabylonianTaxonomyHero';
import { motion } from 'framer-motion';
import GlassmorphicCard from '../components/ui/GlassmorphicCard';

export default function BabylonianTaxonomyPage() {
  return (
    <div className="min-h-screen bg-charcoal-900">
      {/* Hero Section */}
      <BabylonianTaxonomyHero />
      
      {/* Sample content section to show the page continues */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassmorphicCard blur="md" className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gold-500 mb-6">
                Understanding the Taxonomy
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                The Babylonian Civilisation Taxonomy represents a comprehensive framework for understanding 
                the complex social, economic, and spiritual structures of ancient Babylon. Through the lens 
                of the Genesis Protocol, we can see how these patterns have influenced modern extractive 
                systems and how we can break free from them.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-gold-500 mb-2">7</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Primary Classes</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-gold-500 mb-2">49</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Sub-Categories</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-display font-bold text-gold-500 mb-2">∞</div>
                  <div className="text-sm text-gray-400 uppercase tracking-wider">Recursive Loops</div>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
