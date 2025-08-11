'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ParallaxGridProps {
  gridSize?: number;
  color?: string;
  opacity?: number;
  speed?: number;
  className?: string;
}

const ParallaxGrid: React.FC<ParallaxGridProps> = ({
  gridSize = 40,
  color = 'ink',
  opacity = 0.1,
  speed = 0.5,
  className = '',
}) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      observer.observe(gridRef.current);
    }

    return () => {
      if (gridRef.current) {
        observer.unobserve(gridRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollX = window.scrollX;
      
      setOffset({
        x: scrollX * speed,
        y: scrollY * speed,
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, speed]);

  const colorMap: Record<string, string> = {
    ink: '#E8ECEF',
    accent: '#E4C567',
    signal: '#47D7AC',
    danger: '#D9534F',
  };

  const gridColor = colorMap[color] || colorMap.ink;

  return (
    <div
      ref={gridRef}
      className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${-offset.x % gridSize}px, ${-offset.y % gridSize}px)`,
          transition: isVisible ? 'none' : 'transform 0.3s ease-out',
        }}
      >
        <svg
          width="100%"
          height="100%"
          className="absolute inset-0"
          style={{
            width: `calc(100% + ${gridSize}px)`,
            height: `calc(100% + ${gridSize}px)`,
          }}
        >
          <defs>
            <pattern
              id="grid-pattern"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke={gridColor}
                strokeWidth="1"
                opacity={opacity}
              />
              <circle
                cx={gridSize}
                cy={gridSize}
                r="2"
                fill={gridColor}
                opacity={opacity * 2}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>

        {/* Gradient overlay for depth */}
        <div
          className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-primary/50"
          style={{
            background: `radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(15, 19, 32, 0.5) 100%)`,
          }}
        />
      </div>

      {/* Animated grid lines */}
      <div className="absolute inset-0">
        {isVisible && (
          <>
            <div
              className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent"
              style={{
                animation: 'scan-vertical 4s ease-in-out infinite',
              }}
            />
            <div
              className="absolute left-0 top-0 w-full h-px bg-gradient-to-r from-transparent via-signal/20 to-transparent"
              style={{
                animation: 'scan-horizontal 4s ease-in-out infinite',
              }}
            />
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes scan-vertical {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(100vw);
          }
        }

        @keyframes scan-horizontal {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(100vh);
          }
        }
      `}</style>
    </div>
  );
};

export default ParallaxGrid;
