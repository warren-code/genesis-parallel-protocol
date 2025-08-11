'use client';

import React from 'react';
import ParallaxGrid from '../ui/ParallaxGrid';
import RecursionRing from '../animations/RecursionRing';
import RealmTag from '../ui/RealmTag';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import type { RealmType } from '../ui/RealmTag';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  description?: string;
  realm?: RealmType;
  showAnimation?: boolean;
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  description,
  realm = 'foundation',
  showAnimation = true,
  children,
}) => {
  const realmBackgrounds: Record<RealmType, string> = {
    foundation: 'from-accent/20 via-primary to-primary',
    synthesis: 'from-signal/20 via-primary to-primary',
    emergence: 'from-ink/10 via-primary to-primary',
    transcendence: 'from-danger/20 via-primary to-primary',
    quantum: 'from-accent/30 via-signal/10 to-primary',
    neural: 'from-signal/30 via-ink/10 to-primary',
    cosmic: 'from-ink/20 via-accent/10 to-primary',
    temporal: 'from-danger/30 via-accent/10 to-primary',
  };

  return (
    <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Realm-specific background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${realmBackgrounds[realm]} opacity-50`} 
      />
      
      {/* Parallax Grid Background */}
      <ParallaxGrid 
        gridSize={60} 
        color={realm === 'foundation' ? 'accent' : realm === 'synthesis' ? 'signal' : 'ink'} 
        opacity={0.15} 
        speed={0.3}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Realm Tag */}
          {realm && (
            <div className="mb-6">
              <RealmTag realm={realm} size="lg" animated />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-ink mb-6 tracking-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <h2 className="text-xl md:text-2xl lg:text-3xl font-display font-medium text-accent mb-8">
              {subtitle}
            </h2>
          )}

          {/* Description */}
          {description && (
            <div className="mb-12">
              <GlassmorphicCard blur="md" opacity={0.08} className="inline-block px-8 py-6">
                <p className="text-gray font-body text-lg md:text-xl leading-relaxed">
                  {description}
                </p>
              </GlassmorphicCard>
            </div>
          )}

          {/* Children (CTAs, buttons, etc.) */}
          {children && (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {children}
            </div>
          )}
        </div>

        {/* Floating Animation */}
        {showAnimation && (
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 opacity-30 lg:opacity-50">
            <RecursionRing 
              size={400} 
              rings={6} 
              speed={3} 
              color={realm === 'foundation' ? 'accent' : realm === 'synthesis' ? 'signal' : 'ink'}
            />
          </div>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
    </section>
  );
};

export default HeroSection;
