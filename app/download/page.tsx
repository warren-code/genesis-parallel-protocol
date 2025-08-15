'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { fadeInUp } from '@/lib/animations';
import { FaFilePdf, FaGithub, FaBook, FaCode, FaVideo, FaDownload } from 'react-icons/fa';

export default function DownloadPage() {
  const resources = [
    {
      category: "Core Documentation",
      icon: <FaBook className="w-6 h-6" />,
      items: [
        {
          title: "Genesis Protocol Whitepaper",
          description: "Complete technical and philosophical foundation",
          size: "2.4 MB",
          format: "PDF",
          link: "#"
        },
        {
          title: "Implementation Guide",
          description: "Step-by-step instructions for launching a Genesis node",
          size: "1.8 MB",
          format: "PDF",
          link: "#"
        },
        {
          title: "DAO Constitution Template",
          description: "Legal framework and governance documents",
          size: "845 KB",
          format: "PDF",
          link: "#"
        }
      ]
    },
    {
      category: "Technical Resources",
      icon: <FaCode className="w-6 h-6" />,
      items: [
        {
          title: "Genesis Node Software",
          description: "Core infrastructure for running a Genesis node",
          size: "Source Code",
          format: "GitHub",
          link: "#"
        },
        {
          title: "Smart Contract Templates",
          description: "DAO governance and Loop Economics contracts",
          size: "Source Code",
          format: "GitHub",
          link: "#"
        },
        {
          title: "API Documentation",
          description: "Integration guides and technical specifications",
          size: "Online",
          format: "Docs",
          link: "#"
        }
      ]
    },
    {
      category: "Educational Materials",
      icon: <FaVideo className="w-6 h-6" />,
      items: [
        {
          title: "Genesis Overview Video Series",
          description: "10-part introduction to all Genesis systems",
          size: "Streaming",
          format: "Video",
          link: "#"
        },
        {
          title: "Loop Economics Explained",
          description: "Visual guide to regenerative economics",
          size: "1.2 GB",
          format: "Video",
          link: "#"
        },
        {
          title: "Community Building Playbook",
          description: "Practical guide to organizing your local node",
          size: "3.1 MB",
          format: "PDF",
          link: "#"
        }
      ]
    },
    {
      category: "Research Papers",
      icon: <FaFilePdf className="w-6 h-6" />,
      items: [
        {
          title: "Behavioral Economics of Loop Systems",
          description: "Academic research on circular economic models",
          size: "1.5 MB",
          format: "PDF",
          link: "#"
        },
        {
          title: "DAO Governance Case Studies",
          description: "Analysis of successful decentralized organizations",
          size: "2.2 MB",
          format: "PDF",
          link: "#"
        },
        {
          title: "SCEP Psychological Framework",
          description: "Research on collective emotional intelligence",
          size: "980 KB",
          format: "PDF",
          link: "#"
        }
      ]
    }
  ];

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
          Resources & Downloads
        </h1>
        <p className="text-xl text-gray max-w-3xl mx-auto">
          Everything you need to understand, implement, and contribute to the Genesis Protocol. 
          All resources are open source and free to use.
        </p>
      </motion.div>

      {/* Quick Start Section */}
      <motion.section 
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <GlassmorphicCard className="p-12 border-accent">
          <h2 className="text-3xl font-display font-bold text-ink mb-6 text-center">
            Quick Start Package
          </h2>
          <p className="text-gray text-center mb-8 max-w-2xl mx-auto">
            New to Genesis? Download our complete starter package with everything you need 
            to understand the protocol and get involved.
          </p>
          <div className="flex justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-accent to-signal text-primary rounded-xl font-bold hover:shadow-lg hover:shadow-accent/25 transition-all duration-300 flex items-center gap-3">
              <FaDownload />
              Download Starter Package (12.5 MB)
            </button>
          </div>
        </GlassmorphicCard>
      </motion.section>

      {/* Resource Categories */}
      {resources.map((category, categoryIndex) => (
        <motion.section 
          key={categoryIndex}
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 + categoryIndex * 0.1, duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="text-accent">{category.icon}</div>
            <h2 className="text-2xl font-display font-bold text-ink">{category.category}</h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item, itemIndex) => (
              <motion.div
                key={itemIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + categoryIndex * 0.1 + itemIndex * 0.05, duration: 0.6 }}
              >
                <GlassmorphicCard className="h-full p-6 hover:border-accent transition-all duration-300">
                  <h3 className="text-lg font-bold text-ink mb-2">{item.title}</h3>
                  <p className="text-gray text-sm mb-4">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray">
                      <span className="px-2 py-1 bg-ink/10 rounded">{item.format}</span>
                      <span>{item.size}</span>
                    </div>
                    <Link
                      href={item.link}
                      className="text-accent hover:text-signal transition-colors"
                      aria-label={`Download ${item.title}`}
                    >
                      {item.format === 'GitHub' ? (
                        <FaGithub className="w-5 h-5" />
                      ) : (
                        <FaDownload className="w-5 h-5" />
                      )}
                    </Link>
                  </div>
                </GlassmorphicCard>
              </motion.div>
            ))}
          </div>
        </motion.section>
      ))}

      {/* Open Source Notice */}
      <motion.section
        className="mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <GlassmorphicCard className="p-12 border-signal text-center">
          <h2 className="text-2xl font-display font-bold text-ink mb-4">
            Open Source & Community Driven
          </h2>
          <p className="text-gray mb-6 max-w-3xl mx-auto">
            Genesis Protocol is entirely open source. All code, documentation, and resources 
            are freely available under the MIT license. We believe in transparency, collaboration, 
            and collective ownership of the tools that will build our future.
          </p>
          <Link
            href="https://github.com/genesis-protocol"
            className="inline-flex items-center gap-3 px-6 py-3 bg-ink/10 hover:bg-ink/20 rounded-lg transition-all duration-200"
          >
            <FaGithub className="w-5 h-5" />
            <span>View on GitHub</span>
          </Link>
        </GlassmorphicCard>
      </motion.section>

      {/* Contributing Section */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.0, duration: 0.8 }}
      >
        <GlassmorphicCard className="inline-block p-12 border-glow-gold">
          <h2 className="text-3xl font-display font-bold text-ink mb-6">
            Contribute to Genesis
          </h2>
          <p className="text-xl text-gray mb-8 max-w-2xl mx-auto">
            Have expertise to share? Genesis is built by the community, for the community. 
            Join us in creating the resources that will empower millions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/community"
              className="px-8 py-4 bg-gradient-to-r from-accent to-signal text-primary rounded-xl font-bold hover:shadow-lg hover:shadow-accent/25 transition-all duration-300"
            >
              Join the Community
            </Link>
            <Link
              href="https://github.com/genesis-protocol/contribute"
              className="px-8 py-4 border-2 border-ink text-ink rounded-xl font-bold hover:bg-ink hover:text-primary transition-all duration-300"
            >
              Contribution Guide
            </Link>
          </div>
        </GlassmorphicCard>
      </motion.div>
    </div>
  );
}
