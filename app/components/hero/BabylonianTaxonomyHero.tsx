'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import ParallaxGrid from '../ui/ParallaxGrid';
import RecursionRing from '../animations/RecursionRing';

const BabylonianTaxonomyHero: React.FC = () => {
  // Animation variants for entrance effects
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  const glowVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Dark gradient overlay background using bg-gradient-mythic */}
      <div className="absolute inset-0 bg-gradient-mythic" />
      
      {/* Additional custom gradient overlay for deeper darkness */}
      <div className="absolute inset-0 bg-gradient-to-b from-charcoal-900/80 via-charcoal-900/60 to-charcoal-900/90" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <ParallaxGrid 
          gridSize={80} 
          color="gold" 
          opacity={0.03} 
          speed={0.2}
        />
      </div>

      {/* Floating mythic symbols */}
      <motion.div
        className="absolute top-20 left-10 opacity-20"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <RecursionRing size={200} rings={4} speed={2} color="gold" />
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-10 opacity-15"
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <RecursionRing size={250} rings={5} speed={3} color="gold" />
      </motion.div>

      {/* Main content container */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 py-16 max-w-6xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          {/* Main title with mythic text styling */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold mb-8 tracking-tight"
            variants={itemVariants}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-500 via-gold-600 to-gold-700 text-glow-gold">
              The Babylonian Civilisation Taxonomy
            </span>
            <span className="block mt-2 text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white">
              — and the Genesis Break
            </span>
          </motion.h1>

          {/* Subtitle explaining the purpose */}
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Explore the intricate classification system of ancient Babylonian civilization 
            and discover how the Genesis Protocol creates a fundamental break from extractive 
            historical patterns, forging new pathways for regenerative human coordination.
          </motion.p>

          {/* Mythic divider element */}
          <motion.div 
            className="flex justify-center mb-12"
            variants={glowVariants}
          >
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent rounded-full shadow-gold-glow" />
          </motion.div>

          {/* Call-to-action buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Button 
              variant="primary" 
              size="lg" 
              glowEffect
              className="min-w-[200px]"
            >
              Begin Exploration
            </Button>
            <Button 
              variant="accent" 
              size="lg"
              className="min-w-[200px]"
            >
              View Taxonomy Map
            </Button>
          </motion.div>

          {/* Additional mystical element */}
          <motion.div
            className="mt-16"
            variants={itemVariants}
          >
            <p className="text-sm text-gold-500/70 uppercase tracking-wider font-display">
              Ancient Wisdom • Modern Revolution • Infinite Recursion
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal-900 to-transparent" />
      
      {/* Animated scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ 
          y: [0, 10, 0],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <svg 
          width="24" 
          height="40" 
          viewBox="0 0 24 40" 
          fill="none"
          className="text-gold-500/50"
        >
          <path 
            d="M12 2v28M5 23l7 7 7-7" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
          />
        </svg>
      </motion.div>
    </section>
  );
};

export default BabylonianTaxonomyHero;
