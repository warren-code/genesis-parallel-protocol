'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaMusic, FaUpload, FaInfoCircle, FaLock, FaCheck } from 'react-icons/fa';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossaryTooltip } from '@/components/GlossaryTooltip';

export default function ArtistSubmissionPage() {
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const criteriaList = [
    { 
      title: "Action-Oriented SRL Design",
      description: "Music must be structured to seed specific SRLs and trigger measurable actions",
      icon: FaCheck
    },
    { 
      title: "Protocol Integration",
      description: "Releases should align with DAO proposals or community initiatives",
      icon: FaCheck
    },
    { 
      title: "Creative Commons License",
      description: "Work must be licensed under CC BY-SA for community remixing",
      icon: FaCheck
    },
    { 
      title: "Technical Requirements",
      description: "High-quality audio (WAV/AIFF), artwork, and liner notes",
      icon: FaCheck
    }
  ];

  const benefits = [
    "Access to Genesis Protocol's distribution network",
    "Integration with DAO governance and treasury",
    "Collaboration opportunities with other operational artists",
    "Support for protocol-aligned releases and events",
    "Revenue sharing through community token models"
  ];

  if (submitted) {
    return (
      <div className="min-h-screen py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlassmorphicCard className="p-12 border-glow-gold">
              <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
                <FaCheck className="text-4xl text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Submission Received!
              </h2>
              <p className="text-gray-300 mb-8">
                Thank you for submitting your operational art. Our community curators will review your work 
                and respond within 3-5 business days.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/culture-memetics">
                  <button className="px-6 py-3 bg-accent/10 hover:bg-accent/20 border border-accent/30 rounded-lg text-accent transition-all duration-200">
                    Return to Culture & Memetics
                  </button>
                </Link>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Submit Your Operational Art
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join the movement of artists creating <GlossaryTooltip term="Operational Art">operational art</GlossaryTooltip> to 
            seed <GlossaryTooltip term="SRL">SRLs</GlossaryTooltip> and catalyze tangible actions in service of our collective future.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column: Submission Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GlassmorphicCard className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Artist/Project Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-accent/30 text-white focus:border-accent focus:outline-none"
                    placeholder="Your artist or project name"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Track Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-accent/30 text-white focus:border-accent focus:outline-none"
                    placeholder="Title of your operational art piece"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">
                    Target SRL & Action
                    <FaInfoCircle className="inline-block ml-2 text-sm text-accent" />
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-accent/30 text-white focus:border-accent focus:outline-none"
                    placeholder="e.g., Daily meditation practice, Community organizing"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Description</label>
                  <textarea
                    className="w-full px-4 py-2 rounded-lg bg-black/30 border border-accent/30 text-white focus:border-accent focus:outline-none"
                    rows={4}
                    placeholder="Describe how your piece instantiates action through SRLs..."
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Upload Files</label>
                  <div className="border-2 border-dashed border-accent/30 rounded-lg p-8 text-center">
                    <FaUpload className="text-3xl text-accent/50 mx-auto mb-4" />
                    <p className="text-gray-400 mb-2">Drop your files here or click to browse</p>
                    <p className="text-xs text-gray-500">
                      Supports WAV, AIFF, MP3 (320kbps), artwork (PNG/JPG), and documentation (PDF)
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      isSubmitting
                        ? 'bg-accent/50 cursor-wait'
                        : 'bg-gradient-to-r from-accent to-signal text-white hover:shadow-lg hover:shadow-accent/25'
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Operational Art'}
                  </button>
                </div>
              </form>
            </GlassmorphicCard>
          </motion.div>

          {/* Right Column: Guidelines & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-8"
          >
            {/* Submission Criteria */}
            <GlassmorphicCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Submission Criteria</h3>
              <div className="space-y-4">
                {criteriaList.map((criteria, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-accent/5 rounded-lg border border-accent/20"
                  >
                    <criteria.icon className="text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold text-white mb-1">{criteria.title}</h4>
                      <p className="text-sm text-gray-400">{criteria.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassmorphicCard>

            {/* Benefits */}
            <GlassmorphicCard className="p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Artist Benefits</h3>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-300">
                    <FaCheck className="text-green-400 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </GlassmorphicCard>

            {/* Legal Notice */}
            <GlassmorphicCard className="p-6 border-accent/20">
              <div className="flex items-start gap-3">
                <FaLock className="text-accent mt-1" />
                <div className="text-sm text-gray-400">
                  By submitting, you agree to license your work under Creative Commons BY-SA 
                  and grant Genesis Protocol non-exclusive rights for protocol-aligned distribution.
                  <Link href="/legal-bond" className="text-accent hover:text-accent/80 block mt-2">
                    View Full Terms →
                  </Link>
                </div>
              </div>
            </GlassmorphicCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
