'use client';

import React from 'react';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  borderGlow?: boolean;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  blur = 'md',
  opacity = 0.1,
  borderGlow = false,
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-2xl
        ${blurClasses[blur]}
        bg-ink/[${opacity}]
        border border-ink/20
        shadow-2xl
        ${borderGlow ? 'shadow-accent/20' : ''}
        transition-all duration-300
        hover:bg-ink/[${opacity + 0.05}]
        hover:border-ink/30
        ${className}
      `}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-ink/5 via-transparent to-primary/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassmorphicCard;
