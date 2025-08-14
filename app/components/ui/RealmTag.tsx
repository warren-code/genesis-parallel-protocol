'use client';

import React from 'react';

export type RealmType = 
  | 'foundation'
  | 'synthesis'
  | 'emergence'
  | 'transcendence'
  | 'quantum'
  | 'neural'
  | 'cosmic'
  | 'temporal';

interface RealmTagProps {
  realm: RealmType;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost';
  animated?: boolean;
  className?: string;
}

const RealmTag: React.FC<RealmTagProps> = ({
  realm,
  size = 'md',
  variant = 'solid',
  animated = false,
  className = '',
}) => {
  const realmConfig: Record<RealmType, { color: string; bgGradient: string; icon: string }> = {
    foundation: {
      color: 'accent',
      bgGradient: 'from-accent/20 to-accent/10',
      icon: '◆',
    },
    synthesis: {
      color: 'signal',
      bgGradient: 'from-signal/20 to-signal/10',
      icon: '◈',
    },
    emergence: {
      color: 'ink',
      bgGradient: 'from-ink/20 to-ink/10',
      icon: '◉',
    },
    transcendence: {
      color: 'danger',
      bgGradient: 'from-danger/20 to-danger/10',
      icon: '◊',
    },
    quantum: {
      color: 'accent',
      bgGradient: 'from-accent/30 via-signal/20 to-accent/10',
      icon: '⬢',
    },
    neural: {
      color: 'signal',
      bgGradient: 'from-signal/30 via-ink/20 to-signal/10',
      icon: '⬡',
    },
    cosmic: {
      color: 'ink',
      bgGradient: 'from-ink/30 via-accent/20 to-ink/10',
      icon: '✦',
    },
    temporal: {
      color: 'danger',
      bgGradient: 'from-danger/30 via-accent/20 to-danger/10',
      icon: '⟳',
    },
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  const config = realmConfig[realm];
  const colorClass = `text-${config.color}`;
  const borderClass = `border-${config.color}`;

  const baseClasses = `
    inline-flex items-center gap-1.5 rounded-full font-display font-medium
    transition-all duration-300 cursor-pointer select-none
    ${sizeClasses[size]}
    ${animated ? 'hover:scale-105 active:scale-95' : ''}
  `;

  const variantClasses = {
    solid: `bg-gradient-to-r ${config.bgGradient} ${colorClass} border border-${config.color}/30`,
    outline: `bg-transparent ${colorClass} ${borderClass} border-2 hover:bg-${config.color}/10`,
    ghost: `bg-transparent ${colorClass} hover:bg-${config.color}/20`,
  };

  return (
    <span
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${className}
      `}
    >
      <span 
        className={`
          ${size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base'}
          ${animated ? 'animate-pulse' : ''}
        `}
      >
        {config.icon}
      </span>
      <span className="uppercase tracking-wider">
        {realm}
      </span>
    </span>
  );
};

export default RealmTag;
