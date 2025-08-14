'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import map component to avoid SSR issues
const Map = dynamic(() => import('./Map'), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-[#1a1a1a] rounded-lg animate-pulse" />
});

interface Incident {
  id: string;
  type: string;
  location: string;
  coordinates: [number, number];
  severity: number;
  time: string;
  description: string;
  status: string;
  witnesses: number;
}

const IncidentMap = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [filter, setFilter] = useState('all');

  // Mock incidents for demonstration
  const mockIncidents: Incident[] = [
    {
      id: '1',
      type: 'police_aggression',
      location: 'City Hall Plaza',
      coordinates: [40.7128, -74.0060],
      severity: 4,
      time: '10 mins ago',
      description: 'Excessive force used against peaceful protesters',
      status: 'verified',
      witnesses: 15,
    },
    {
      id: '2',
      type: 'medical_emergency',
      location: 'Market Street',
      coordinates: [40.7150, -74.0080],
      severity: 3,
      time: '25 mins ago',
      description: 'Protester needs medical attention',
      status: 'resolved',
      witnesses: 8,
    },
    {
      id: '3',
      type: 'de_escalation_success',
      location: 'Union Square',
      coordinates: [40.7359, -73.9911],
      severity: 1,
      time: '1 hour ago',
      description: 'Successful peaceful negotiation with authorities',
      status: 'verified',
      witnesses: 20,
    },
  ];

  useEffect(() => {
    setIncidents(mockIncidents);
  }, []);

  const getIncidentColor = (type: string) => {
    switch (type) {
      case 'police_aggression': return '#ef4444';
      case 'medical_emergency': return '#f59e0b';
      case 'arrest': return '#3b82f6';
      case 'de_escalation_success': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getIncidentIcon = (type: string) => {
    switch (type) {
      case 'police_aggression': return '⚡';
      case 'medical_emergency': return '🏥';
      case 'arrest': return '🚔';
      case 'de_escalation_success': return '✅';
      case 'counter_protest': return '⚠️';
      default: return '📍';
    }
  };

  const filteredIncidents = filter === 'all' 
    ? incidents 
    : incidents.filter(inc => inc.type === filter);

  return (
    <div id="incident-map" className="relative">
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex gap-2">
          {['all', 'police_aggression', 'medical_emergency', 'de_escalation_success'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === type
                  ? 'bg-[#00ff00] text-black'
                  : 'bg-[#1a1a1a] text-gray-400 hover:text-white'
              }`}
            >
              {type === 'all' ? 'All' : type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReportForm(true)}
          className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-full transition-colors"
        >
          🚨 Report Incident
        </motion.button>
      </div>

      {/* Map Container */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <div className="relative rounded-lg overflow-hidden border border-gray-800">
            <Map incidents={filteredIncidents} onIncidentClick={setSelectedIncident} />
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-[#1a1a1a]/90 backdrop-blur-sm rounded-lg p-4 border border-gray-800">
              <h4 className="text-sm font-semibold text-white mb-2">Incident Types</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-gray-300">Police Aggression</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                  <span className="text-gray-300">Medical Emergency</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  <span className="text-gray-300">De-escalation Success</span>
                </div>
              </div>
            </div>

            {/* Live Indicator */}
            <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              <span className="text-sm font-medium">LIVE</span>
            </div>
          </div>
        </div>

        {/* Incident List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-4">Recent Incidents</h3>
          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {filteredIncidents.map((incident, index) => (
              <motion.div
                key={incident.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedIncident(incident)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedIncident?.id === incident.id
                    ? 'border-[#00ff00] bg-[#00ff00]/10'
                    : 'border-gray-800 bg-[#1a1a1a] hover:border-gray-700'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div 
                    className="text-2xl"
                    style={{ color: getIncidentColor(incident.type) }}
                  >
                    {getIncidentIcon(incident.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-medium text-white text-sm">
                        {incident.location}
                      </h4>
                      <span className="text-xs text-gray-400">{incident.time}</span>
                    </div>
                    <p className="text-xs text-gray-300 mb-2">{incident.description}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={`px-2 py-0.5 rounded-full ${
                        incident.status === 'verified' 
                          ? 'bg-green-500/20 text-green-400'
                          : incident.status === 'resolved'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {incident.status}
                      </span>
                      <span className="text-gray-400">
                        👁 {incident.witnesses} witnesses
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Form Modal */}
      {showReportForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowReportForm(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[#1a1a1a] rounded-2xl p-6 max-w-md w-full border border-gray-800"
          >
            <h3 className="text-2xl font-bold text-white mb-4">Report Incident</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Incident Type
                </label>
                <select className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white focus:border-[#00ff00] focus:outline-none">
                  <option>Police Aggression</option>
                  <option>Medical Emergency</option>
                  <option>Arrest</option>
                  <option>Counter Protest</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Street address or landmark"
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00ff00] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief description of the incident"
                  className="w-full px-4 py-2 bg-[#0a0a0a] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00ff00] focus:outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Severity (1-5)
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <button
                      key={level}
                      type="button"
                      className="w-10 h-10 rounded-lg bg-[#0a0a0a] border border-gray-700 text-white hover:border-[#00ff00] hover:bg-[#00ff00]/10 transition-all"
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
                >
                  Submit Report
                </motion.button>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowReportForm(false)}
                  className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default IncidentMap;
