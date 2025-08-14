'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoopNode {
  id: string;
  label: string;
  color: string;
  angle: number;
  description: string;
}

interface AnimatedLoopVisualizationProps {
  size?: number;
  interactive?: boolean;
}

const AnimatedLoopVisualization: React.FC<AnimatedLoopVisualizationProps> = ({
  size = 600,
  interactive = true,
}) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const nodes: LoopNode[] = [
    { id: 'input', label: 'Input', color: '#FFD700', angle: 0, description: 'Resources enter the system' },
    { id: 'process', label: 'Process', color: '#00D4FF', angle: 72, description: 'Value transformation occurs' },
    { id: 'output', label: 'Output', color: '#D9534F', angle: 144, description: 'Community benefits emerge' },
    { id: 'feedback', label: 'Feedback', color: '#9945FF', angle: 216, description: 'Results inform adaptation' },
    { id: 'recursion', label: 'Recursion', color: '#FFD700', angle: 288, description: 'The cycle reinforces itself' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(centerX, centerY) * 0.8;

      // Draw flowing energy lines
      for (let i = 0; i < 5; i++) {
        const startAngle = (time * 0.001 + i * 72) * Math.PI / 180;
        const endAngle = startAngle + Math.PI / 3;
        
        const gradient = ctx.createLinearGradient(
          centerX + Math.cos(startAngle) * radius,
          centerY + Math.sin(startAngle) * radius,
          centerX + Math.cos(endAngle) * radius,
          centerY + Math.sin(endAngle) * radius
        );
        
        gradient.addColorStop(0, 'rgba(255, 215, 0, 0)');
        gradient.addColorStop(0.5, 'rgba(255, 215, 0, 0.3)');
        gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.stroke();
      }

      // Draw particle effects
      for (let i = 0; i < 20; i++) {
        const particleAngle = (time * 0.002 + i * 18) * Math.PI / 180;
        const particleRadius = radius + Math.sin(time * 0.005 + i) * 20;
        const x = centerX + Math.cos(particleAngle) * particleRadius;
        const y = centerY + Math.sin(particleAngle) * particleRadius;
        
        ctx.fillStyle = `rgba(255, 215, 0, ${0.3 + Math.sin(time * 0.01 + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 16;
      if (isAnimating) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isAnimating]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Canvas for flowing animations */}
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="absolute inset-0"
      />

      {/* SVG for main structure */}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute inset-0"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Central circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.15}
          fill="none"
          stroke="url(#centralGradient)"
          strokeWidth="2"
          filter="url(#glow)"
          animate={{
            strokeDasharray: ['0 300', '300 0'],
            rotate: [0, 360],
          }}
          transition={{
            strokeDasharray: { duration: 3, repeat: Infinity },
            rotate: { duration: 20, repeat: Infinity, ease: 'linear' },
          }}
        />

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="centralGradient">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="1" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.5" />
          </radialGradient>
        </defs>

        {/* Outer ring */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size * 0.4}
          fill="none"
          stroke="#FFD700"
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="5 10"
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        {/* Connection lines */}
        {nodes.map((node, index) => {
          const nextNode = nodes[(index + 1) % nodes.length];
          const startX = size / 2 + Math.cos(node.angle * Math.PI / 180) * size * 0.4;
          const startY = size / 2 + Math.sin(node.angle * Math.PI / 180) * size * 0.4;
          const endX = size / 2 + Math.cos(nextNode.angle * Math.PI / 180) * size * 0.4;
          const endY = size / 2 + Math.sin(nextNode.angle * Math.PI / 180) * size * 0.4;

          return (
            <motion.path
              key={`connection-${node.id}`}
              d={`M ${startX} ${startY} Q ${size / 2} ${size / 2} ${endX} ${endY}`}
              fill="none"
              stroke={node.color}
              strokeWidth="2"
              strokeOpacity="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: index * 0.4,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            />
          );
        })}
      </svg>

      {/* Interactive nodes */}
      <AnimatePresence>
        {nodes.map((node) => {
          const x = size / 2 + Math.cos(node.angle * Math.PI / 180) * size * 0.4;
          const y = size / 2 + Math.sin(node.angle * Math.PI / 180) * size * 0.4;

          return (
            <motion.div
              key={node.id}
              className="absolute cursor-pointer"
              style={{
                left: x - 40,
                top: y - 40,
                width: 80,
                height: 80,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + nodes.indexOf(node) * 0.1 }}
              onHoverStart={() => interactive && setActiveNode(node.id)}
              onHoverEnd={() => interactive && setActiveNode(null)}
            >
              {/* Node circle */}
              <motion.div
                className="absolute inset-0 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: node.color + '20',
                  border: `2px solid ${node.color}`,
                }}
                whileHover={{ scale: 1.2 }}
                animate={{
                  boxShadow: activeNode === node.id
                    ? `0 0 30px ${node.color}`
                    : `0 0 10px ${node.color}50`,
                }}
              >
                <span className="text-white text-xs font-bold text-center">
                  {node.label}
                </span>
              </motion.div>

              {/* Tooltip */}
              {activeNode === node.id && (
                <motion.div
                  className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 
                           bg-primary/90 backdrop-blur-md rounded-lg p-3 
                           border border-accent/30 shadow-lg whitespace-nowrap z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="text-white text-sm">{node.description}</p>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Center text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <div className="text-center">
          <h3 className="text-accent font-bold text-lg mb-1">Living Loop</h3>
          <p className="text-white/70 text-sm">Self-Sustaining System</p>
        </div>
      </motion.div>

      {/* Control button */}
      {interactive && (
        <motion.button
          className="absolute bottom-4 right-4 bg-accent/20 hover:bg-accent/30 
                     border border-accent/50 rounded-full p-2 backdrop-blur-sm"
          onClick={() => setIsAnimating(!isAnimating)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isAnimating ? (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <rect x="6" y="4" width="3" height="12" rx="1" />
              <rect x="11" y="4" width="3" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
          )}
        </motion.button>
      )}
    </div>
  );
};

export default AnimatedLoopVisualization;
