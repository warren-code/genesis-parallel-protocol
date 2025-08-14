'use client';

import React from 'react';

interface G3LoopMarkProps {
  opacity?: number;
  size?: number;
  animated?: boolean;
}

const G3LoopMark: React.FC<G3LoopMarkProps> = ({
  opacity = 0.3,
  size = 120,
  animated = true,
}) => {
  return (
    <div
      className="fixed bottom-8 right-8 z-50 pointer-events-none"
      style={{ opacity }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        className={`${animated ? 'animate-spin-slow' : ''}`}
      >
        <defs>
          <linearGradient id="g3-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4C567" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#47D7AC" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E8ECEF" stopOpacity="0.4" />
          </linearGradient>
          
          <filter id="g3-glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* G3 Symbol - Three interlocking loops */}
        <g transform="translate(60, 60)">
          {/* First loop */}
          <path
            d="M -20,-20 Q -20,0 0,0 Q 20,0 20,-20 Q 20,-40 0,-40 Q -20,-40 -20,-20"
            fill="none"
            stroke="url(#g3-gradient)"
            strokeWidth="3"
            filter="url(#g3-glow)"
          />
          
          {/* Second loop */}
          <path
            d="M -20,20 Q -20,0 0,0 Q 20,0 20,20 Q 20,40 0,40 Q -20,40 -20,20"
            fill="none"
            stroke="url(#g3-gradient)"
            strokeWidth="3"
            filter="url(#g3-glow)"
            transform="rotate(120)"
          />
          
          {/* Third loop */}
          <path
            d="M -20,20 Q -20,0 0,0 Q 20,0 20,20 Q 20,40 0,40 Q -20,40 -20,20"
            fill="none"
            stroke="url(#g3-gradient)"
            strokeWidth="3"
            filter="url(#g3-glow)"
            transform="rotate(240)"
          />
          
          {/* Center dot */}
          <circle
            cx="0"
            cy="0"
            r="5"
            fill="url(#g3-gradient)"
            filter="url(#g3-glow)"
          />
        </g>

        {/* Outer ring */}
        <circle
          cx="60"
          cy="60"
          r="55"
          fill="none"
          stroke="url(#g3-gradient)"
          strokeWidth="1"
          strokeDasharray="5 10"
          opacity="0.5"
        />
      </svg>

      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default G3LoopMark;
