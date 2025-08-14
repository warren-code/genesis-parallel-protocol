'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  FiZap, 
  FiShield, 
  FiTarget, 
  FiTrendingUp,
  FiActivity,
  FiAward
} from 'react-icons/fi';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { 
  lineChartOptions, 
  barChartOptions, 
  doughnutChartOptions,
  datasetColors,
  mythicTheme 
} from '@/lib/chartConfig';

const MythicThemeDemo = () => {
  // Sample data for charts
  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81, 56, 95],
        ...datasetColors.primary,
      },
    ],
  };

  const barData = {
    labels: ['Gold', 'Signal', 'Danger', 'Charcoal', 'White'],
    datasets: [
      {
        label: 'Values',
        data: [12, 19, 3, 5, 8],
        backgroundColor: [
          mythicTheme.gold[500],
          mythicTheme.signal,
          mythicTheme.danger,
          mythicTheme.charcoal[800],
          mythicTheme.white[50],
        ],
      },
    ],
  };

  const doughnutData = {
    labels: ['Primary', 'Secondary', 'Tertiary'],
    datasets: [
      {
        data: [300, 150, 100],
        backgroundColor: [
          mythicTheme.gold[500],
          mythicTheme.gold[600],
          mythicTheme.gold[700],
        ],
        borderColor: mythicTheme.charcoal[900],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h1 className="text-5xl font-display font-bold text-gold-500 mb-4" style={{textShadow: '0 0 10px rgba(255, 215, 0, 0.5), 0 0 20px rgba(255, 215, 0, 0.3)'}}>
            Mythic-Tech Theme Showcase
          </h1>
          <p className="text-xl text-white-50">
            High contrast design system with gold, white, and charcoal palette
          </p>
        </motion.div>

        {/* Button Showcase */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-gold-500/50"
        >
          <h2 className="text-2xl font-display font-semibold text-gold-500 mb-6">
            Button Components
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gold-500/50 bg-gold-500 text-charcoal-900 hover:bg-gold-600 active:bg-gold-700 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]">
              Primary Button
            </button>
            <button className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gold-500/50 bg-charcoal-800 text-white border-2 border-gold-500 hover:bg-gold-500 hover:text-charcoal-900 hover:shadow-[0_0_20px_rgba(255,215,0,0.5)]">
              Secondary Button
            </button>
            <button className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gold-500/50 bg-transparent text-gold-500 border-2 border-gold-500 hover:bg-gold-500 hover:text-charcoal-900">
              Ghost Button
            </button>
            <button className="px-6 py-3 font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-gold-500/50 bg-gold-500 text-charcoal-900 hover:bg-gold-600 active:bg-gold-700" style={{animation: 'pulse-gold 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'}}>
              Animated Button
            </button>
          </div>
        </motion.section>

        {/* Icon Cards */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-display font-semibold text-gold-500 mb-6">
            Feature Cards
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: FiZap, title: 'Lightning Fast', color: 'text-gold-500' },
              { icon: FiShield, title: 'Secure Shield', color: 'text-signal' },
              { icon: FiTarget, title: 'Precise Target', color: 'text-danger' },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-gold-500/50 cursor-pointer group"
              >
                <item.icon className={`h-12 w-12 ${item.color} mb-4 group-hover:animate-pulse`} />
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray">
                  Experience the power of high-contrast design with smooth animations.
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Form Elements */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-gold-500/50"
        >
          <h2 className="text-2xl font-display font-semibold text-gold-500 mb-6">
            Form Elements
          </h2>
          <div className="space-y-4 max-w-md">
            <div>
              <label className="block text-sm font-medium text-gold-500 mb-2">
                Input Field
              </label>
              <input
                type="text"
                placeholder="Enter text here..."
                className="w-full px-4 py-2 bg-charcoal-800 border-2 border-charcoal-700 rounded-lg text-white placeholder-gray-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gold-500 mb-2">
                Select Field
              </label>
              <select className="w-full px-4 py-2 bg-charcoal-800 border-2 border-charcoal-700 rounded-lg text-white placeholder-gray-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50 transition-all duration-200">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gold-500 mb-2">
                Textarea
              </label>
              <textarea
                rows={4}
                placeholder="Enter your message..."
                className="w-full px-4 py-2 bg-charcoal-800 border-2 border-charcoal-700 rounded-lg text-white placeholder-gray-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/50 transition-all duration-200 resize-none"
              />
            </div>
          </div>
        </motion.section>

        {/* Charts Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-display font-semibold text-gold-500 mb-6">
            Data Visualization
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-gold-500/50">
              <h3 className="text-lg font-semibold text-white mb-4">Line Chart</h3>
              <div className="h-64">
                <Line data={lineData} options={lineChartOptions} />
              </div>
            </div>
            <div className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-gold-500/50">
              <h3 className="text-lg font-semibold text-white mb-4">Bar Chart</h3>
              <div className="h-64">
                <Bar data={barData} options={barChartOptions} />
              </div>
            </div>
            <div className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-gold-500/50">
              <h3 className="text-lg font-semibold text-white mb-4">Doughnut Chart</h3>
              <div className="h-64">
                <Doughnut data={doughnutData} options={doughnutChartOptions} />
              </div>
            </div>
          </div>
        </motion.section>

        {/* Stats Cards */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-display font-semibold text-gold-500 mb-6">
            Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { icon: FiTrendingUp, label: 'Growth', value: '+45%', color: 'text-gold-500' },
              { icon: FiActivity, label: 'Activity', value: '92%', color: 'text-signal' },
              { icon: FiAward, label: 'Achievement', value: '100', color: 'text-gold-600' },
              { icon: FiShield, label: 'Security', value: 'A+', color: 'text-gold-700' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-gold-500/50 text-center" style={{boxShadow: 'inset 0 0 0 1px var(--color-gold-500), 0 0 20px rgba(255, 215, 0, 0.2)'}}
              >
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Color Palette */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-charcoal-800 border border-charcoal-700 rounded-lg p-6 shadow-lg transition-all duration-300 hover:border-gold-500/50"
        >
          <h2 className="text-2xl font-display font-semibold text-gold-500 mb-6">
            Color Palette
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="h-24 bg-gold-500 rounded-lg mb-2" style={{animation: 'glow 2s ease-in-out infinite alternate'}} />
              <p className="text-sm text-white">Gold 500</p>
              <p className="text-xs text-gray">#FFD700</p>
            </div>
            <div>
              <div className="h-24 bg-gold-600 rounded-lg mb-2" />
              <p className="text-sm text-white">Gold 600</p>
              <p className="text-xs text-gray">#FFC107</p>
            </div>
            <div>
              <div className="h-24 bg-gold-700 rounded-lg mb-2" />
              <p className="text-sm text-white">Gold 700</p>
              <p className="text-xs text-gray">#FFB300</p>
            </div>
            <div>
              <div className="h-24 bg-white border border-charcoal-700 rounded-lg mb-2" />
              <p className="text-sm text-white">White</p>
              <p className="text-xs text-gray">#FFFFFF</p>
            </div>
            <div>
              <div className="h-24 bg-charcoal-700 rounded-lg mb-2" />
              <p className="text-sm text-white">Charcoal 700</p>
              <p className="text-xs text-gray">#3D3D3D</p>
            </div>
            <div>
              <div className="h-24 bg-charcoal-800 rounded-lg mb-2" />
              <p className="text-sm text-white">Charcoal 800</p>
              <p className="text-xs text-gray">#2D2D2D</p>
            </div>
            <div>
              <div className="h-24 bg-charcoal-900 rounded-lg mb-2" />
              <p className="text-sm text-white">Charcoal 900</p>
              <p className="text-xs text-gray">#1A1A1A</p>
            </div>
            <div>
              <div className="h-24 bg-signal rounded-lg mb-2" />
              <p className="text-sm text-white">Signal</p>
              <p className="text-xs text-gray">#00D4FF</p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default MythicThemeDemo;
