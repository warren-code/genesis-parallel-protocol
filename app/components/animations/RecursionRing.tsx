'use client';

import React, { useEffect, useRef } from 'react';

interface RecursionRingProps {
  size?: number;
  rings?: number;
  speed?: number;
  color?: string;
  className?: string;
}

const RecursionRing: React.FC<RecursionRingProps> = ({
  size = 200,
  rings = 5,
  speed = 2,
  color = 'accent',
  className = '',
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const animateRings = () => {
      const ringElements = svgRef.current?.querySelectorAll('.recursion-ring');
      ringElements?.forEach((ring, index) => {
        const element = ring as SVGCircleElement;
        const delay = index * 0.2;
        element.style.animationDelay = `${delay}s`;
      });
    };

    animateRings();
  }, []);

  const colorClasses: Record<string, string> = {
    accent: 'stroke-accent',
    signal: 'stroke-signal',
    danger: 'stroke-danger',
    ink: 'stroke-ink',
    gold: 'stroke-gold-500',
  };

  return (
    <svg
      ref={svgRef}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`recursion-ring-container ${className}`}
    >
      <style>
        {`
          @keyframes recursion-rotate {
            0% {
              transform: rotate(0deg);
              stroke-opacity: 0.1;
            }
            50% {
              stroke-opacity: 0.8;
            }
            100% {
              transform: rotate(360deg);
              stroke-opacity: 0.1;
            }
          }
          
          @keyframes recursion-scale {
            0%, 100% {
              r: var(--ring-radius);
              stroke-width: 2;
            }
            50% {
              r: calc(var(--ring-radius) * 1.1);
              stroke-width: 4;
            }
          }
          
          .recursion-ring {
            animation: 
              recursion-rotate ${speed}s linear infinite,
              recursion-scale ${speed * 0.8}s ease-in-out infinite;
            transform-origin: center;
            fill: none;
          }
        `}
      </style>

      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {Array.from({ length: rings }).map((_, index) => {
        const radius = (size / 2) * (1 - index * 0.15);
        return (
          <circle
            key={index}
            className={`recursion-ring ${colorClasses[color] || 'stroke-accent'}`}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            style={{
              '--ring-radius': `${radius}px`,
            } as React.CSSProperties}
            strokeWidth="2"
            filter="url(#glow)"
          />
        );
      })}

      {/* Center dot */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r="4"
        className={`fill-current ${(colorClasses[color] || 'stroke-accent').replace('stroke-', 'text-')}`}
        filter="url(#glow)"
      />
    </svg>
  );
};

export default RecursionRing;
