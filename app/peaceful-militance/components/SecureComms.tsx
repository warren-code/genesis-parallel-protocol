'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface Channel {
  id: string;
  name: string;
  type: 'emergency' | 'coordination' | 'legal' | 'medical' | 'general';
  participants: number;
  maxParticipants: number;
  isActive: boolean;
  encrypted: boolean;
  joinCode?: string;
  description: string;
  admin: string;
}

const SecureComms = () => {
  const [activeChannels, setActiveChannels] = useState<Channel[]>([
    {
      id: '1',
      name: 'Emergency Response',
      type: 'emergency',
      participants: 45,
      maxParticipants: 100,
      isActive: true,
      encrypted: true,
      joinCode: 'EMRG-2024',
      description: 'Real-time emergency coordination and rapid response',
      admin: 'Safety Team',
    },
    {
      id: '2',
      name: 'Legal Support Network',
      type: 'legal',
      participants: 23,
      maxParticipants: 50,
      isActive: true,
      encrypted: true,
      joinCode: 'LEGAL-AID',
      description: 'Connect with legal observers and attorneys',
      admin: 'NLG Chapter',
    },
    {
      id: '3',
      name: 'Medical Team Coord',
      type: 'medical',
      participants: 18,
      maxParticipants: 30,
      isActive: true,
      encrypted: true,
      joinCode: 'MED-HELP',
      description: 'Street medic coordination and supply locations',
      admin: 'Street Medics',
    },
  ]);

  const [showCreateChannel, setShowCreateChannel] = useState(false);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);

  const getChannelIcon = (type: string) => {
    switch (type) {
      case 'emergency': return '🚨';
      case 'coordination': return '📡';
      case 'legal': return '⚖️';
      case 'medical': return '🏥';
      case 'general': return '💬';
      default: return '📱';
    }
  };

  const getChannelColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'from-red-500 to-red-600';
      case 'coordination': return 'from-blue-500 to-blue-600';
      case 'legal': return 'from-purple-500 to-purple-600';
      case 'medical': return 'from-green-500 to-green-600';
      case 'general': return 'from-gray-500 to-gray-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <section id="secure-comms" className="relative py-20 px-6 bg-gradient-to-b from-transparent via-[#0a0a0a] to-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Secure <span className="text-[#00ff00]">Communication Channels</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            End-to-end encrypted channels for safe coordination during actions
          </p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          {[
            { icon: '🔐', title: 'End-to-End Encryption', description: 'Military-grade encryption' },
            { icon: '👤', title: 'Anonymous Access', description: 'No personal data required' },
            { icon: '⏱️', title: 'Self-Destructing Messages', description: 'Auto-delete after reading' },
            { icon: '🌐', title: 'Decentralized Network', description: 'No central point of failure' },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-[#1a1a1a] border border-gray-800 rounded-lg p-6 text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Active Channels */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activeChannels.map((channel, index) => (
            <motion.div
              key={channel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-2xl"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${getChannelColor(channel.type)} opacity-10`} />
              
              <div className="relative bg-[#1a1a1a] border border-gray-800 rounded-2xl p-6 hover:border-[#00ff00]/50 transition-all">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getChannelIcon(channel.type)}</span>
                    <div>
                      <h3 className="text-lg font-bold text-white">{channel.name}</h3>
                      <p className="text-xs text-gray-400">Managed by {channel.admin}</p>
                    </div>
                  </div>
                  {channel.isActive && (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Active
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 mb-4">{channel.description}</p>

                {/* Stats */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Participants</span>
                    <span className="text-white font-medium">
                      {channel.participants} / {channel.maxParticipants}
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(channel.participants / channel.maxParticipants) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-[#00ff00] to-[#00cc00]"
                    />
                  </div>
                </div>

                {/* Security Badges */}
                <div className="flex gap-2 mb-4">
                  {channel.encrypted && (
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                      🔒 Encrypted
                    </span>
                  )}
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">
                    📱 Mobile Ready
                  </span>
                </div>

                {/* Join Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedChannel(channel)}
                  className="w-full py-3 bg-[#00ff00] text-black font-bold rounded-lg hover:bg-[#00cc00] transition-colors"
                >
                  Join Channel
                </motion.button>

                {/* Join Code */}
                {channel.joinCode && (
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Code: <span className="font-mono text-gray-400">{channel.joinCode}</span>
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Channel Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCreateChannel(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#00ff00] to-[#00cc00] text-black font-bold rounded-full hover:shadow-lg hover:shadow-[#00ff00]/25 transition-all"
          >
            <span>➕</span>
            <span>Create Secure Channel</span>
          </motion.button>
        </motion.div>

        {/* Best Practices */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-2xl p-8 border border-yellow-500/30"
        >
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span>⚠️</span>
            Security Best Practices
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#00ff00] mt-1">✓</span>
                <p className="text-gray-300">Use unique join codes for each action</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00ff00] mt-1">✓</span>
                <p className="text-gray-300">Never share sensitive info in channels</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00ff00] mt-1">✓</span>
                <p className="text-gray-300">Verify channel authenticity before joining</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-[#00ff00] mt-1">✓</span>
                <p className="text-gray-300">Use VPN or Tor for additional security</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00ff00] mt-1">✓</span>
                <p className="text-gray-300">Enable disappearing messages when possible</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-[#00ff00] mt-1">✓</span>
                <p className="text-gray-300">Regularly rotate channel access codes</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Download Apps */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <h3 className="text-xl font-bold text-white mb-6">Get the Secure Comms App</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#00ff00]/50 transition-all"
            >
              <span className="flex items-center gap-2">
                <span>📱</span>
                <span>iOS App</span>
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#00ff00]/50 transition-all"
            >
              <span className="flex items-center gap-2">
                <span>🤖</span>
                <span>Android App</span>
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-[#1a1a1a] border border-gray-800 rounded-lg hover:border-[#00ff00]/50 transition-all"
            >
              <span className="flex items-center gap-2">
                <span>💻</span>
                <span>Web Access</span>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecureComms;
