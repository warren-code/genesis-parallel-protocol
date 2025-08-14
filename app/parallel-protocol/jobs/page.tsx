'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlassmorphicCard } from '@/app/components/ui';

export default function Jobs() {
  const jobs = [
    {
      title: 'Circular Feedstock Coordinator',
      replaces: 'Babylonian Waste Manager',
      description: 'Manages real-time matching of waste streams to processors using Genesis Waste Match Engine.'
    },
    {
      title: 'SRL Systems Auditor',
      replaces: 'Corporate Compliance Officer',
      description: 'Audits supply chain recursion health, flags CERL infiltration, and issues stability reports.'
    },
    {
      title: 'Vertical Farm Operator',
      replaces: 'Industrial Agribusiness Labourer',
      description: 'Runs AI-optimised local food production hubs under the Vertical Farming Protocol.'
    },
    {
      title: 'Water Regeneration Engineer',
      replaces: 'Municipal Water Bureaucrat',
      description: 'Designs, installs, and maintains decentralised circular water systems.'
    },
    {
      title: 'Parallel Logistics Agent',
      replaces: 'Babylonian Freight Broker',
      description: 'Coordinates peer-to-peer freight networks for Genesis supply chains.'
    },
    {
      title: 'Cultural Encoding Artisan',
      replaces: 'Advertising Creative',
      description: 'Produces art, media, and design that embed Genesis ethos into community life.'
    },
    {
      title: 'DAO Governance Facilitator',
      replaces: 'Corporate Middle Manager',
      description: 'Guides proposal creation, consensus processes, and tribunal systems.'
    },
    {
      title: 'Energy Loop Technician',
      replaces: 'Fossil Fuel Utility Worker',
      description: 'Deploys and maintains microgrid, biofuel, and renewable energy systems within Genesis cells.'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-accent mb-6">
            Jobs in the Parallel Civilisation
          </h1>
          <div className="h-1 w-24 bg-accent mb-8" />
          <p className="text-xl text-gray-300 leading-relaxed">
            Explore revolutionary roles designed to replace Babylonian occupation with regenerative and sustainable vocations.
          </p>
        </div>

        {/* Jobs Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {jobs.map((job, index) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassmorphicCard 
                blur="sm" 
                className="p-6 h-full border-l-4 border-accent hover:border-accent/70 transition-all"
              >
                <h3 className="text-xl font-semibold text-accent mb-2">{job.title}</h3>
                <p className="text-gray-400 mb-4">Replaces: {job.replaces}</p>
                <p className="text-gray-300 leading-relaxed">{job.description}</p>
              </GlassmorphicCard>
            </motion.div>
          ))}
        </div>

        {/* Join the Movement */}
        <GlassmorphicCard blur="md" className="p-8 border-2 border-accent/30 text-center">
          <h3 className="text-2xl font-display font-semibold text-accent mb-4">
            Join the Movement
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Contribute to the expansion of self-sufficient, self-governed communities with roles that drive the Genesis Protocol.
          </p>

          <button className="px-8 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-all">
            Apply Now
          </button>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}

