import React from 'react';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';

export default function MissionPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-display font-bold text-ink mb-6">
              Our Mission
            </h1>
            <p className="text-xl text-gray max-w-3xl mx-auto">
              Building autonomous, sustainable civilizations through decentralized technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {/* Mission Pillars */}
            <GlassmorphicCard blur="md" opacity={0.05} borderGlow className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-accent to-signal flex items-center justify-center">
                  <span className="text-3xl">🌍</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-ink mb-3">
                  Parallel Civilization
                </h3>
                <p className="text-gray text-sm">
                  Create independent systems that operate alongside traditional structures,
                  offering true alternatives for human coordination and governance.
                </p>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard blur="md" opacity={0.05} borderGlow className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-signal to-quantum flex items-center justify-center">
                  <span className="text-3xl">♻️</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-ink mb-3">
                  Loop Economics
                </h3>
                <p className="text-gray text-sm">
                  Implement circular economic models that create sustainable value flows,
                  eliminating waste and maximizing resource efficiency.
                </p>
              </div>
            </GlassmorphicCard>

            <GlassmorphicCard blur="md" opacity={0.05} borderGlow className="p-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-quantum to-accent flex items-center justify-center">
                  <span className="text-3xl">⚖️</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-ink mb-3">
                  True Autonomy
                </h3>
                <p className="text-gray text-sm">
                  Empower communities with self-sovereign infrastructure for energy,
                  food, water, and governance without external dependencies.
                </p>
              </div>
            </GlassmorphicCard>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto">
          <GlassmorphicCard blur="lg" opacity={0.03} className="p-12">
            <h2 className="text-3xl font-display font-bold text-ink mb-6 text-center">
              The Genesis Vision
            </h2>
            <div className="space-y-6 text-gray">
              <p>
                Genesis Protocol represents more than technology—it's a blueprint for human
                civilization that prioritizes sovereignty, sustainability, and collective
                prosperity. We believe that the current systems have reached their limits,
                and it's time to build something new from first principles.
              </p>
              <p>
                Our mission is to provide communities worldwide with the tools, knowledge,
                and infrastructure needed to create their own autonomous civilizations.
                These aren't isolated communes or temporary experiments—they're fully
                functional parallel societies with their own economies, governance systems,
                and cultural identities.
              </p>
              <p>
                Through decentralized technology, loop economics, and collective intelligence,
                we're not just solving today's problems—we're architecting tomorrow's
                possibilities. Join us in building a future where human potential is
                unleashed, not constrained.
              </p>
            </div>
            
            <div className="mt-8 flex justify-center">
              <a
                href="/why-genesis"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent to-signal text-primary font-medium hover:shadow-gold-glow transition-all duration-300"
              >
                Learn Why Genesis Matters
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </GlassmorphicCard>
        </div>
      </section>
    </div>
  );
}
