'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const caseStudies = [
  {
    id: 1,
    title: "The Power of Sit-Ins",
    subtitle: "Greensboro Lunch Counter Protests",
    year: "1960",
    image: "/images/case-study-1.jpg",
    stats: {
      duration: "6 months",
      participants: "70,000+",
      citiesAffected: "55 cities",
      result: "Desegregation of Woolworth's"
    },
    description: "Four African American college students sat at a whites-only lunch counter, igniting a movement that spread across the South.",
    tactics: ["Non-violent resistance", "Economic pressure", "Media attention", "Youth mobilization"],
    quote: "We wore our best clothes because we wanted to represent our race well.",
    quotee: "Joseph McNeil",
  },
  {
    id: 2,
    title: "Women's Suffrage Movement",
    subtitle: "Silent Sentinels",
    year: "1917-1919",
    image: "/images/case-study-2.jpg",
    stats: {
      duration: "2.5 years",
      participants: "2,000+",
      arrests: "500+",
      result: "19th Amendment ratified"
    },
    description: "Women stood silently outside the White House for over two years, enduring arrests and violence to win the right to vote.",
    tactics: ["Silent protest", "Civil disobedience", "Hunger strikes", "Public shaming"],
    quote: "Mr. President, how long must women wait for liberty?",
    quotee: "Silent Sentinel banner",
  },
  {
    id: 3,
    title: "Baltic Way",
    subtitle: "Human Chain for Freedom",
    year: "1989",
    image: "/images/case-study-3.jpg",
    stats: {
      duration: "1 day",
      participants: "2 million",
      distance: "600 km",
      result: "Independence restored"
    },
    description: "Two million people joined hands across Estonia, Latvia, and Lithuania, forming a human chain to protest Soviet occupation.",
    tactics: ["Mass mobilization", "International awareness", "Symbolic unity", "Peaceful demonstration"],
    quote: "We showed the world that we are one, and we want to be free.",
    quotee: "Edgar Savisaar",
  }
];

const CaseStudies = () => {
  const [activeStudy, setActiveStudy] = useState(0);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Case Studies in <span className="text-[#00ff00]">Peaceful Power</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real-world examples of how peaceful militance has changed the course of history
          </p>
        </motion.div>

        {/* Case Study Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {caseStudies.map((study, index) => (
            <motion.button
              key={study.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveStudy(index)}
              className={`px-6 py-3 rounded-full font-semibold transition-all ${
                activeStudy === index
                  ? 'bg-[#00ff00] text-black'
                  : 'bg-transparent border-2 border-[#00ff00]/50 text-[#00ff00] hover:border-[#00ff00]'
              }`}
            >
              {study.title}
            </motion.button>
          ))}
        </div>

        {/* Active Case Study Display */}
        <motion.div
          key={activeStudy}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Visual Side */}
          <div className="relative">
            <div className="aspect-video bg-gradient-to-br from-[#00ff00]/20 to-[#00cc00]/20 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-[#1a1a1a] flex items-center justify-center">
                <span className="text-6xl opacity-50">📸</span>
              </div>
            </div>
            
            {/* Stats Overlay */}
            <div className="absolute -bottom-6 -right-6 bg-[#0a0a0a] border-2 border-[#00ff00] rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(caseStudies[activeStudy].stats).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-xs text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-lg font-bold text-[#00ff00]">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-white mb-2">
                {caseStudies[activeStudy].subtitle}
              </h3>
              <p className="text-[#00ff00] text-xl">{caseStudies[activeStudy].year}</p>
            </div>

            <p className="text-lg text-gray-300">
              {caseStudies[activeStudy].description}
            </p>

            {/* Tactics Used */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-3">Key Tactics</h4>
              <div className="flex flex-wrap gap-2">
                {caseStudies[activeStudy].tactics.map((tactic, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-[#00ff00]/10 border border-[#00ff00]/30 rounded-full text-sm text-[#00ff00]"
                  >
                    {tactic}
                  </span>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="border-l-4 border-[#00ff00] pl-6 py-2">
              <p className="text-xl text-gray-300 italic mb-2">
                "{caseStudies[activeStudy].quote}"
              </p>
              <cite className="text-[#00ff00] not-italic">
                — {caseStudies[activeStudy].quotee}
              </cite>
            </blockquote>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#00ff00] text-black font-bold rounded-full hover:bg-[#00cc00] transition-colors"
            >
              Read Full Case Study
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudies;
