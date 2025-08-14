'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface LoopDiagramProps {
  size?: number;
  color?: 'accent' | 'signal' | 'danger' | 'ink';
  speed?: number;
  showLabels?: boolean;
  interactive?: boolean;
  className?: string;
}

const LoopDiagram: React.FC<LoopDiagramProps> = ({
  size = 300,
  color = 'accent',
  speed = 3,
  showLabels = true,
  interactive = true,
  className = '',
}) => {
  const controls = useAnimation();
  const svgRef = useRef<SVGSVGElement>(null);

  const colorClasses = {
    accent: '#00FF88',
    signal: '#FFD700',
    danger: '#FF0066',
    ink: '#1A1A2E',
  };

  const nodePositions = [
    { x: size / 2, y: 0, label: 'Input', angle: -90 },
    { x: size, y: size / 2, label: 'Process', angle: 0 },
    { x: size / 2, y: size, label: 'Output', angle: 90 },
    { x: 0, y: size / 2, label: 'Feedback', angle: 180 },
    { x: size / 2, y: size / 2, label: 'Recursion', angle: 0 },
  ];

  useEffect(() => {
    controls.start({
      rotate: 360,
      transition: {
        duration: speed * 10,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  }, [controls, speed]);

  const handleNodeHover = (index: number) => {
    if (!interactive) return;
    
    // Add hover effect
    const node = svgRef.current?.querySelector(`#node-${index}`);
    if (node) {
      node.classList.add('scale-110');
    }
  };

  const handleNodeLeave = (index: number) => {
    if (!interactive) return;
    
    // Remove hover effect
    const node = svgRef.current?.querySelector(`#node-${index}`);
    if (node) {
      node.classList.remove('scale-110');
    }
  };

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        {/* Animated gradient */}
        <defs>
          <linearGradient id={`loop-gradient-${color}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colorClasses[color]} stopOpacity="0.8">
              <animate
                attributeName="stop-opacity"
                values="0.8;0.4;0.8"
                dur={`${speed}s`}
                repeatCount="indefinite"
              />
            </stop>
            <stop offset="50%" stopColor={colorClasses[color]} stopOpacity="0.5" />
            <stop offset="100%" stopColor={colorClasses[color]} stopOpacity="0.2">
              <animate
                attributeName="stop-opacity"
                values="0.2;0.6;0.2"
                dur={`${speed}s`}
                repeatCount="indefinite"
              />
            </stop>
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection paths */}
        <g className="opacity-60">
          {/* Input to Process */}
          <path
            d={`M ${nodePositions[0].x} ${nodePositions[0].y + 20} Q ${size * 0.75} ${size * 0.25} ${nodePositions[1].x - 20} ${nodePositions[1].y}`}
            fill="none"
            stroke={colorClasses[color]}
            strokeWidth="2"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-10"
              dur={`${speed / 2}s`}
              repeatCount="indefinite"
            />
          </path>

          {/* Process to Output */}
          <path
            d={`M ${nodePositions[1].x} ${nodePositions[1].y + 20} Q ${size * 0.75} ${size * 0.75} ${nodePositions[2].x} ${nodePositions[2].y - 20}`}
            fill="none"
            stroke={colorClasses[color]}
            strokeWidth="2"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-10"
              dur={`${speed / 2}s`}
              repeatCount="indefinite"
            />
          </path>

          {/* Output to Feedback */}
          <path
            d={`M ${nodePositions[2].x - 20} ${nodePositions[2].y} Q ${size * 0.25} ${size * 0.75} ${nodePositions[3].x + 20} ${nodePositions[3].y}`}
            fill="none"
            stroke={colorClasses[color]}
            strokeWidth="2"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-10"
              dur={`${speed / 2}s`}
              repeatCount="indefinite"
            />
          </path>

          {/* Feedback to Input */}
          <path
            d={`M ${nodePositions[3].x} ${nodePositions[3].y - 20} Q ${size * 0.25} ${size * 0.25} ${nodePositions[0].x} ${nodePositions[0].y + 20}`}
            fill="none"
            stroke={colorClasses[color]}
            strokeWidth="2"
            strokeDasharray="5,5"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-10"
              dur={`${speed / 2}s`}
              repeatCount="indefinite"
            />
          </path>

          {/* Center recursion connections */}
          {nodePositions.slice(0, 4).map((pos, index) => (
            <line
              key={`recursion-${index}`}
              x1={nodePositions[4].x}
              y1={nodePositions[4].y}
              x2={pos.x}
              y2={pos.y}
              stroke={colorClasses[color]}
              strokeWidth="1"
              opacity="0.3"
              strokeDasharray="3,3"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-6"
                dur={`${speed}s`}
                repeatCount="indefinite"
              />
            </line>
          ))}
        </g>

        {/* Nodes */}
        <g>
          {nodePositions.map((pos, index) => (
            <g
              key={`node-${index}`}
              id={`node-${index}`}
              transform={`translate(${pos.x}, ${pos.y})`}
              className="transition-transform duration-300"
              onMouseEnter={() => handleNodeHover(index)}
              onMouseLeave={() => handleNodeLeave(index)}
            >
              <circle
                r={index === 4 ? 30 : 20}
                fill={`url(#loop-gradient-${color})`}
                filter="url(#glow)"
                className="cursor-pointer"
              >
                <animate
                  attributeName="r"
                  values={index === 4 ? "30;35;30" : "20;25;20"}
                  dur={`${speed * 2}s`}
                  repeatCount="indefinite"
                />
              </circle>
              
              {index === 4 && (
                <motion.circle
                  r="40"
                  fill="none"
                  stroke={colorClasses[color]}
                  strokeWidth="2"
                  opacity="0.3"
                  animate={controls}
                />
              )}
            </g>
          ))}
        </g>

        {/* Labels */}
        {showLabels && (
          <g className="pointer-events-none">
            {nodePositions.map((pos, index) => (
              <text
                key={`label-${index}`}
                x={pos.x}
                y={pos.y + (index === 4 ? 0 : 50)}
                textAnchor="middle"
                className="fill-current text-gray font-mono text-sm"
                style={{ fontSize: size / 25 }}
              >
                {pos.label}
              </text>
            ))}
          </g>
        )}

        {/* Animated particles */}
        {[...Array(5)].map((_, i) => (
          <circle
            key={`particle-${i}`}
            r="2"
            fill={colorClasses[color]}
            opacity="0.6"
          >
            <animateMotion
              dur={`${speed * (i + 1)}s`}
              repeatCount="indefinite"
              path={`M ${nodePositions[0].x} ${nodePositions[0].y} Q ${size * 0.75} ${size * 0.25} ${nodePositions[1].x} ${nodePositions[1].y} Q ${size * 0.75} ${size * 0.75} ${nodePositions[2].x} ${nodePositions[2].y} Q ${size * 0.25} ${size * 0.75} ${nodePositions[3].x} ${nodePositions[3].y} Q ${size * 0.25} ${size * 0.25} ${nodePositions[0].x} ${nodePositions[0].y}`}
            />
          </circle>
        ))}
      </svg>
    </div>
  );
};

export default LoopDiagram;
