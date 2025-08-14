'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface MapProps {
  incidents: Array<{
    id: string;
    type: string;
    coordinates: [number, number];
    location: string;
    severity: number;
  }>;
  onIncidentClick: (incident: any) => void;
}

const Map: React.FC<MapProps> = ({ incidents, onIncidentClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  // Mock map implementation
  // In production, this would integrate with a real mapping library like Leaflet or Mapbox
  useEffect(() => {
    // Simulate map initialization
    console.log('Map initialized with incidents:', incidents);
  }, [incidents]);

  const getIncidentColor = (type: string) => {
    switch (type) {
      case 'police_aggression': return 'bg-red-500';
      case 'medical_emergency': return 'bg-yellow-500';
      case 'arrest': return 'bg-blue-500';
      case 'de_escalation_success': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div ref={mapRef} className="relative h-[600px] bg-[#0a0a0a] overflow-hidden">
      {/* Mock map background */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-10 grid-rows-10 h-full">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="border border-gray-800"
              style={{
                background: `radial-gradient(circle at ${Math.random() * 100}% ${Math.random() * 100}%, rgba(0, 255, 0, 0.1) 0%, transparent 70%)`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Street grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-30">
        <defs>
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#333" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Incident markers */}
      {incidents.map((incident, index) => {
        // Calculate position based on coordinates (mock positioning)
        const x = ((incident.coordinates[1] + 74.01) * 1000) % 80 + 10;
        const y = ((incident.coordinates[0] - 40.7) * 1000) % 80 + 10;

        return (
          <motion.div
            key={incident.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute cursor-pointer"
            style={{ left: `${x}%`, top: `${y}%` }}
            onClick={() => onIncidentClick(incident)}
          >
            {/* Ripple effect */}
            <motion.div
              animate={{
                scale: [1, 2, 2.5, 3],
                opacity: [0.4, 0.3, 0.2, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
              className={`absolute inset-0 rounded-full ${getIncidentColor(incident.type)}`}
              style={{
                width: `${incident.severity * 20}px`,
                height: `${incident.severity * 20}px`,
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Marker */}
            <motion.div
              whileHover={{ scale: 1.2 }}
              className={`relative z-10 w-4 h-4 rounded-full ${getIncidentColor(incident.type)} shadow-lg`}
              style={{
                boxShadow: `0 0 20px ${getIncidentColor(incident.type).replace('bg-', 'rgb(').replace('500', '500 / 0.5')}`,
              }}
            />

            {/* Label on hover */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileHover={{ opacity: 1, y: 0 }}
              className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-[#1a1a1a] border border-gray-700 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap z-20"
            >
              {incident.location}
            </motion.div>
          </motion.div>
        );
      })}

      {/* Map controls */}
      <div className="absolute top-4 left-4 space-y-2">
        <button className="w-10 h-10 bg-[#1a1a1a]/90 backdrop-blur-sm border border-gray-700 rounded-lg text-white hover:bg-[#2a2a2a] transition-colors flex items-center justify-center">
          +
        </button>
        <button className="w-10 h-10 bg-[#1a1a1a]/90 backdrop-blur-sm border border-gray-700 rounded-lg text-white hover:bg-[#2a2a2a] transition-colors flex items-center justify-center">
          -
        </button>
      </div>

      {/* Center marker */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-2 border-[#00ff00]/20 rounded-full"
        />
      </div>
    </div>
  );
};

export default Map;
