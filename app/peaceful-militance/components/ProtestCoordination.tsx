'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

interface Protest {
  id: string;
  title: string;
  type: string;
  location: string;
  date: string;
  time: string;
  expectedParticipants: number;
  currentParticipants: number;
  organizer: string;
  status: 'planned' | 'active' | 'completed';
  permits: boolean;
  resources: string[];
  safety: {
    medics: boolean;
    legalObservers: boolean;
    deescalation: boolean;
  };
}

const ProtestCoordination = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Mock data
  const protests: Protest[] = [
    {
      id: '1',
      title: 'March for Climate Justice',
      type: 'march',
      location: 'City Hall to Central Park',
      date: 'March 25, 2024',
      time: '2:00 PM',
      expectedParticipants: 5000,
      currentParticipants: 3421,
      organizer: 'Climate Action Coalition',
      status: 'planned',
      permits: true,
      resources: ['Water stations', 'First aid', 'Sound system'],
      safety: {
        medics: true,
        legalObservers: true,
        deescalation: true,
      },
    },
    {
      id: '2',
      title: 'Vigil for Peace',
      type: 'vigil',
      location: 'Memorial Square',
      date: 'March 22, 2024',
      time: '6:00 PM',
      expectedParticipants: 200,
      currentParticipants: 156,
      organizer: 'Peace Network',
      status: 'active',
      permits: true,
      resources: ['Candles', 'Speakers'],
      safety: {
        medics: false,
        legalObservers: true,
        deescalation: true,
      },
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planned': return 'bg-blue-500/20 text-blue-400';
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'completed': return 'bg-gray-500/20 text-gray-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'march': return '🚶‍♀️';
      case 'vigil': return '🕯️';
      case 'sit-in': return '🪑';
      case 'boycott': return '🚫';
      case 'strike': return '✊';
      default: return '📢';
    }
  };

  return (
    <section id="coordination" className="relative py-20 px-6 bg-gradient-to-b from-transparent via-[#0a0a0a] to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Protest <span className="text-[#00ff00]">Coordination Hub</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Organize, join, and support peaceful demonstrations in your community
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-800">
          {['upcoming', 'active', 'past'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-6 font-medium transition-all ${
                activeTab === tab
                  ? 'text-[#00ff00] border-b-2 border-[#00ff00]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)} Actions
            </button>
          ))}
        </div>

        {/* Protest Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {protests.map((protest, index) => (
            <motion.div
              key={protest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 hover:border-[#00ff00]/50 transition-all"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getTypeIcon(protest.type)}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{protest.title}</h3>
                    <p className="text-sm text-gray-400">by {protest.organizer}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(protest.status)}`}>
                  {protest.status}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span>📍</span>
                  <span>{protest.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span>📅</span>
                  <span>{protest.date} at {protest.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <span>👥</span>
                  <span>{protest.currentParticipants} / {protest.expectedParticipants} participants</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(protest.currentParticipants / protest.expectedParticipants) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#00ff00] to-[#00cc00]"
                  />
                </div>
              </div>

              {/* Safety Features */}
              <div className="flex gap-4 mb-4">
                {Object.entries(protest.safety).map(([key, value]) => (
                  <div
                    key={key}
                    className={`flex items-center gap-1 text-xs ${
                      value ? 'text-green-400' : 'text-gray-500'
                    }`}
                  >
                    <span>{value ? '✓' : '✗'}</span>
                    <span>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                ))}
              </div>

              {/* Resources */}
              <div className="flex flex-wrap gap-2 mb-4">
                {protest.resources.map((resource, i) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-[#0a0a0a] rounded-full text-xs text-gray-400"
                  >
                    {resource}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2 bg-[#00ff00] text-black font-bold rounded-lg hover:bg-[#00cc00] transition-colors"
                >
                  Join Action
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2 border border-[#00ff00] text-[#00ff00] font-bold rounded-lg hover:bg-[#00ff00]/10 transition-all"
                >
                  View Details
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create New Protest */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateForm(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00ff00] to-[#00cc00] text-black font-bold rounded-full hover:shadow-lg hover:shadow-[#00ff00]/25 transition-all"
          >
            <span className="text-2xl">+</span>
            <span>Organize New Action</span>
          </motion.button>
        </motion.div>

        {/* Quick Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 grid md:grid-cols-4 gap-4"
        >
          {[
            { icon: '📋', title: 'Action Checklist', link: '#' },
            { icon: '⚖️', title: 'Legal Guidelines', link: '#' },
            { icon: '🏥', title: 'Safety Protocols', link: '#' },
            { icon: '📱', title: 'Digital Security', link: '#' },
          ].map((resource, index) => (
            <Link key={index} href={resource.link}>
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-4 text-center hover:border-[#00ff00]/50 transition-all cursor-pointer"
              >
                <span className="text-3xl block mb-2">{resource.icon}</span>
                <span className="text-sm text-gray-300">{resource.title}</span>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProtestCoordination;
