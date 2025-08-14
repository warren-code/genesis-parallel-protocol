'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const timelineEvents = [
  {
    year: 1930,
    title: "Salt March",
    location: "India",
    leader: "Mahatma Gandhi",
    description: "A 240-mile march to the Arabian Sea to protest British salt monopoly, sparking widespread civil disobedience.",
    impact: "Catalyzed Indian independence movement and inspired global non-violent resistance.",
    participants: "80,000+",
    duration: "24 days",
  },
  {
    year: 1955,
    title: "Montgomery Bus Boycott",
    location: "Alabama, USA",
    leader: "Rosa Parks & Martin Luther King Jr.",
    description: "381-day boycott of Montgomery buses after Rosa Parks refused to give up her seat.",
    impact: "Led to desegregation of public transportation and launched the civil rights movement.",
    participants: "40,000+",
    duration: "381 days",
  },
  {
    year: 1963,
    title: "March on Washington",
    location: "Washington D.C., USA",
    leader: "Martin Luther King Jr.",
    description: "Peaceful march for jobs and freedom, featuring the iconic 'I Have a Dream' speech.",
    impact: "Accelerated passage of Civil Rights Act and Voting Rights Act.",
    participants: "250,000+",
    duration: "1 day",
  },
  {
    year: 1986,
    title: "People Power Revolution",
    location: "Philippines",
    leader: "Corazon Aquino",
    description: "Millions of Filipinos peacefully protested the Marcos regime on EDSA highway.",
    impact: "Overthrew 20-year dictatorship without bloodshed, inspiring democratic movements worldwide.",
    participants: "2,000,000+",
    duration: "4 days",
  },
  {
    year: 1989,
    title: "Velvet Revolution",
    location: "Czechoslovakia",
    leader: "Václav Havel",
    description: "Non-violent transition from Communist rule through mass demonstrations and strikes.",
    impact: "Ended 41 years of one-party rule, established democracy in Czechoslovakia.",
    participants: "500,000+",
    duration: "6 weeks",
  },
  {
    year: 2011,
    title: "Arab Spring",
    location: "Tunisia, Egypt, and beyond",
    leader: "Grassroots movement",
    description: "Wave of peaceful protests against authoritarian regimes across the Arab world.",
    impact: "Toppled multiple dictatorships, reshaped Middle Eastern politics.",
    participants: "Millions",
    duration: "2+ years",
  },
];

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<number | null>(null);

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#00ff00]/20 via-[#00ff00]/50 to-[#00ff00]/20" />

      {/* Timeline Events */}
      <div className="space-y-20">
        {timelineEvents.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`relative flex items-center ${
              index % 2 === 0 ? 'justify-start' : 'justify-end'
            }`}
          >
            {/* Event Card */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              onHoverStart={() => setHoveredEvent(index)}
              onHoverEnd={() => setHoveredEvent(null)}
              onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
              className={`relative w-full md:w-5/12 p-6 bg-[#1a1a1a] border-2 border-[#00ff00]/30 rounded-lg cursor-pointer transition-all ${
                hoveredEvent === index ? 'border-[#00ff00] shadow-lg shadow-[#00ff00]/20' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{event.title}</h3>
                  <p className="text-[#00ff00] font-semibold">{event.year} • {event.location}</p>
                </div>
                <motion.div
                  animate={{ rotate: selectedEvent === index ? 180 : 0 }}
                  className="text-[#00ff00] text-2xl"
                >
                  ↓
                </motion.div>
              </div>
              
              <p className="text-gray-300 mb-3">{event.description}</p>
              
              <div className="flex gap-4 text-sm">
                <span className="text-gray-400">Leader: <span className="text-white">{event.leader}</span></span>
                <span className="text-gray-400">Participants: <span className="text-[#00ff00]">{event.participants}</span></span>
              </div>

              {/* Expanded Details */}
              <AnimatePresence>
                {selectedEvent === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-[#00ff00]/30"
                  >
                    <p className="text-gray-400 mb-2">Duration: <span className="text-white">{event.duration}</span></p>
                    <p className="text-gray-300">
                      <span className="text-[#00ff00] font-semibold">Impact:</span> {event.impact}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Timeline Node */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-[#00ff00] rounded-full border-4 border-[#0a0a0a] z-10"
            >
              <div className="absolute inset-0 bg-[#00ff00] rounded-full animate-ping opacity-30" />
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Timeline End */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mt-20"
      >
        <p className="text-2xl text-[#00ff00] font-bold">The Movement Continues...</p>
        <p className="text-gray-400 mt-2">Every act of peaceful resistance writes a new chapter in history</p>
      </motion.div>
    </div>
  );
};

export default InteractiveTimeline;
