'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface TrainingModule {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  completionRate: number;
  enrolled: number;
  rating: number;
  objectives: string[];
  instructor: string;
}

const TrainingHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedModule, setSelectedModule] = useState<TrainingModule | null>(null);

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'de_escalation', name: 'De-escalation', icon: '🕊️' },
    { id: 'legal_rights', name: 'Legal Rights', icon: '⚖️' },
    { id: 'first_aid', name: 'First Aid', icon: '🏥' },
    { id: 'organizing', name: 'Organizing', icon: '📢' },
    { id: 'digital_security', name: 'Digital Security', icon: '🔐' },
  ];

  const trainingModules: TrainingModule[] = [
    {
      id: '1',
      title: 'De-escalation Techniques for Peaceful Protests',
      category: 'de_escalation',
      duration: '45 mins',
      difficulty: 'beginner',
      completionRate: 87,
      enrolled: 3456,
      rating: 4.8,
      objectives: [
        'Identify escalation triggers',
        'Apply calming communication techniques',
        'Create buffer zones safely',
        'Coordinate with peace teams',
      ],
      instructor: 'Dr. Sarah Chen',
    },
    {
      id: '2',
      title: 'Know Your Rights: Protester Legal Fundamentals',
      category: 'legal_rights',
      duration: '60 mins',
      difficulty: 'beginner',
      completionRate: 92,
      enrolled: 5678,
      rating: 4.9,
      objectives: [
        'Understand constitutional protections',
        'Know arrest procedures',
        'Document police interactions',
        'Access legal support',
      ],
      instructor: 'Attorney Marcus Johnson',
    },
    {
      id: '3',
      title: 'Street Medic Training: Emergency Response',
      category: 'first_aid',
      duration: '90 mins',
      difficulty: 'intermediate',
      completionRate: 78,
      enrolled: 2345,
      rating: 4.7,
      objectives: [
        'Treat common protest injuries',
        'Handle tear gas exposure',
        'Create safe treatment areas',
        'Coordinate with EMS',
      ],
      instructor: 'EMT Lisa Rodriguez',
    },
    {
      id: '4',
      title: 'Digital Security for Activists',
      category: 'digital_security',
      duration: '75 mins',
      difficulty: 'intermediate',
      completionRate: 65,
      enrolled: 4123,
      rating: 4.6,
      objectives: [
        'Secure communications',
        'Protect digital identity',
        'Safe data storage',
        'Counter surveillance',
      ],
      instructor: 'Tech Expert Alex Kim',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400';
      case 'intermediate': return 'text-yellow-400';
      case 'advanced': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const filteredModules = selectedCategory === 'all' 
    ? trainingModules 
    : trainingModules.filter(module => module.category === selectedCategory);

  return (
    <section id="training" className="relative py-20 px-6 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Training <span className="text-[#00ff00]">Materials Hub</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Learn essential skills for safe and effective peaceful resistance
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          {categories.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-[#00ff00] text-black'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span>{category.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Training Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setSelectedModule(module)}
              className="bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 hover:border-[#00ff00]/50 transition-all cursor-pointer group"
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#00ff00] transition-colors">
                    {module.title}
                  </h3>
                  <span className={`text-sm font-medium ${getDifficultyColor(module.difficulty)}`}>
                    {module.difficulty}
                  </span>
                </div>
                <p className="text-sm text-gray-400">by {module.instructor}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-white">{module.duration}</p>
                  <p className="text-xs text-gray-400">Duration</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{module.rating}</p>
                  <p className="text-xs text-gray-400">Rating</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{module.enrolled}</p>
                  <p className="text-xs text-gray-400">Enrolled</p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>Completion Rate</span>
                  <span>{module.completionRate}%</span>
                </div>
                <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${module.completionRate}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-[#00ff00] to-[#00cc00]"
                  />
                </div>
              </div>

              {/* Learning Objectives */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-300 mb-2">You'll learn:</h4>
                <ul className="space-y-1">
                  {module.objectives.slice(0, 3).map((objective, i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-start gap-2">
                      <span className="text-[#00ff00] mt-0.5">✓</span>
                      <span>{objective}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-[#00ff00]/10 border border-[#00ff00]/50 text-[#00ff00] font-bold rounded-lg hover:bg-[#00ff00]/20 transition-all"
              >
                Start Learning
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Interactive Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-16 bg-gradient-to-r from-[#00ff00]/10 to-[#00cc00]/10 rounded-2xl p-8 border border-[#00ff00]/30"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 mx-auto mb-4 rounded-full border-4 border-[#00ff00] border-t-transparent"
              />
              <h3 className="text-xl font-bold text-white mb-2">Live Workshops</h3>
              <p className="text-gray-400">Join weekly sessions with expert trainers</p>
            </div>
            <div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-4 bg-[#00ff00]/20 rounded-full flex items-center justify-center text-3xl"
              >
                📱
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Mobile Learning</h3>
              <p className="text-gray-400">Access training materials on the go</p>
            </div>
            <div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-20 h-20 mx-auto mb-4 bg-[#00ff00]/20 rounded-full flex items-center justify-center text-3xl"
              >
                🏆
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-2">Certifications</h3>
              <p className="text-gray-400">Earn badges and certificates</p>
            </div>
          </div>
        </motion.div>

        {/* Quick Start Guide */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00ff00] text-black font-bold rounded-full hover:bg-[#00cc00] transition-colors shadow-lg shadow-[#00ff00]/25"
          >
            <span>🚀</span>
            <span>Download Training Guide</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default TrainingHub;
