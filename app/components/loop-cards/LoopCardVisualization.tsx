'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoopCardVisualizationProps {
  stages: {
    label: string;
    color: string;
  }[];
  particleCount?: number;
  speed?: 'slow' | 'normal' | 'fast';
  size?: 'sm' | 'md' | 'lg';
}

const LoopCardVisualization: React.FC<LoopCardVisualizationProps> = ({
  stages,
  particleCount = 5,
  speed = 'normal',
  size = 'md',
}) => {
  const [particles, setParticles] = useState<number[]>([]);

  const speedMap = {
    slow: 8,
    normal: 5,
    fast: 3,
  };

  const sizeMap = {
    sm: { width: 300, height: 300, radius: 100 },
    md: { width: 400, height: 400, radius: 140 },
    lg: { width: 500, height: 500, radius: 180 },
  };

  const { width, height, radius } = sizeMap[size];
  const centerX = width / 2;
  const centerY = height / 2;
  const duration = speedMap[speed];

  useEffect(() => {
    // Initialize particles with staggered delays
    const initialParticles = Array.from({ length: particleCount }, (_, i) => i);
    setParticles(initialParticles);
  }, [particleCount]);

  // Calculate position on the circle for each stage
  const getStagePosition = (index: number) => {
    const angle = (index * 2 * Math.PI) / stages.length - Math.PI / 2;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  };

  // Create path for particles to follow
  const createPath = () => {
    const points = stages.map((_, index) => {
      const pos = getStagePosition(index);
      return `${pos.x},${pos.y}`;
    });
    // Close the loop
    points.push(points[0]);
    return `M ${points.join(' L ')}`;
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg width={width} height={height} className="overflow-visible">
        {/* Background circle */}
        <circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1"
          strokeDasharray="4 2"
          opacity="0.3"
        />

        {/* Gradient definitions */}
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#FFC107" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FFB300" stopOpacity="0.3" />
          </linearGradient>
          
          <radialGradient id="particleGlow">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFD700" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Stage nodes */}
        {stages.map((stage, index) => {
          const pos = getStagePosition(index);
          return (
            <g key={index}>
              {/* Node glow */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="30"
                fill={stage.color}
                opacity="0.1"
                className="animate-pulse-slow"
              />
              
              {/* Node circle */}
              <circle
                cx={pos.x}
                cy={pos.y}
                r="20"
                fill="none"
                stroke={stage.color}
                strokeWidth="2"
                opacity="0.8"
              />
              
              {/* Stage label */}
              <text
                x={pos.x}
                y={pos.y + 40}
                textAnchor="middle"
                className="fill-white text-sm font-display"
                opacity="0.9"
              >
                {stage.label}
              </text>
            </g>
          );
        })}

        {/* Animated particles */}
        <AnimatePresence>
          {particles.map((particleId) => (
            <motion.g key={particleId}>
              <motion.circle
                r="8"
                fill="url(#particleGlow)"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: particleId * (duration / particleCount),
                }}
              >
                <animateMotion
                  path={createPath()}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                  begin={`${particleId * (duration / particleCount)}s`}
                />
              </motion.circle>
              
              {/* Particle trail */}
              <motion.circle
                r="4"
                fill="#FFD700"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 0.8, 0.8, 0],
                }}
                transition={{
                  duration: duration,
                  repeat: Infinity,
                  delay: particleId * (duration / particleCount),
                }}
              >
                <animateMotion
                  path={createPath()}
                  dur={`${duration}s`}
                  repeatCount="indefinite"
                  begin={`${particleId * (duration / particleCount)}s`}
                />
              </motion.circle>
            </motion.g>
          ))}
        </AnimatePresence>

        {/* Center logo/icon */}
        <g>
          <motion.circle
            cx={centerX}
            cy={centerY}
            r="40"
            fill="none"
            stroke="#FFD700"
            strokeWidth="1"
            opacity="0.3"
            animate={{
              r: [40, 45, 40],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <text
            x={centerX}
            y={centerY}
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-gold text-4xl"
          >
            ∞
          </text>
        </g>
      </svg>
    </div>
  );
};

export default LoopCardVisualization;
