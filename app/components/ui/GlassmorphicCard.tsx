'use client';

import React from 'react';

interface GlassmorphicCardProps {
  children: React.ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  borderGlow?: boolean;
  onClick?: () => void;
}

const GlassmorphicCard: React.FC<GlassmorphicCardProps> = ({
  children,
  className = '',
  blur = 'md',
  opacity = 0.1,
  borderGlow = false,
  onClick,
}) => {
  const blurClasses = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
  };

  // Calculate opacity values for better contrast
  const bgOpacity = Math.max(opacity, 0.15); // Minimum 15% opacity for better readability
  const hoverOpacity = Math.min(bgOpacity + 0.05, 0.3);

  return (
    <div
      onClick={onClick}
      className={`
        relative overflow-hidden rounded-2xl
        ${blurClasses[blur]}
        shadow-2xl
        ${borderGlow ? 'shadow-accent/20' : ''}
        transition-all duration-300
        ${className}
      `}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
        borderColor: `rgba(255, 255, 255, ${bgOpacity * 2})`,
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = `rgba(255, 255, 255, ${hoverOpacity})`;
        e.currentTarget.style.borderColor = `rgba(255, 255, 255, ${hoverOpacity * 2})`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = `rgba(255, 255, 255, ${bgOpacity})`;
        e.currentTarget.style.borderColor = `rgba(255, 255, 255, ${bgOpacity * 2})`;
      }}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlassmorphicCard;
