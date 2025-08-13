'use client';

import React from 'react';
import { 
  LoopCard, 
  MiniLoopCard, 
  LoopCardGrid, 
  InteractiveLoopCard,
  LoopCardVisualization 
} from '@/app/components/loop-cards';
import {
  ArrowPathIcon,
  BeakerIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

export default function LoopCardsDemoPage() {
  // Example data for the main Loop Card
  const mainLoopData = {
    title: 'Genesis Protocol Loop System',
    description: 'A continuous improvement cycle for peaceful resistance and community empowerment',
    input: {
      title: 'Community Input',
      icon: <DocumentTextIcon className="w-6 h-6" />,
      content: 'Gather resources and identify community needs',
      items: ['Community surveys', 'Resource inventory', 'Stakeholder feedback'],
      color: 'signal' as const,
    },
    process: {
      title: 'Strategic Process',
      icon: <Cog6ToothIcon className="w-6 h-6" />,
      content: 'Transform inputs into actionable strategies',
      items: ['Data analysis', 'Strategy formulation', 'Resource allocation'],
      color: 'gold' as const,
    },
    output: {
      title: 'Action Output',
      icon: <RocketLaunchIcon className="w-6 h-6" />,
      content: 'Implement solutions and deliver results',
      items: ['Service delivery', 'Community programs', 'Documentation'],
      color: 'quantum' as const,
    },
    feedback: {
      title: 'Impact Feedback',
      icon: <ChartBarIcon className="w-6 h-6" />,
      content: 'Monitor effectiveness and gather insights',
      items: ['Performance metrics', 'Community response', 'Impact assessment'],
      color: 'white' as const,
    },
    recursion: {
      title: 'System Evolution',
      icon: <ArrowPathIcon className="w-6 h-6" />,
      content: 'Improve and adapt the system continuously',
      items: ['Process refinement', 'Knowledge integration', 'Scaling strategies'],
      color: 'gold' as const,
    },
  };

  // Mini loop examples
  const miniLoops = [
    {
      title: 'Knowledge Loop',
      steps: [
        { label: 'Learn', icon: <BeakerIcon className="w-4 h-4" /> },
        { label: 'Apply', icon: <LightBulbIcon className="w-4 h-4" /> },
        { label: 'Share', icon: <SparklesIcon className="w-4 h-4" /> },
      ],
      color: 'signal' as const,
    },
    {
      title: 'Action Loop',
      steps: [
        { label: 'Plan', icon: <DocumentTextIcon className="w-4 h-4" /> },
        { label: 'Execute', icon: <RocketLaunchIcon className="w-4 h-4" /> },
        { label: 'Review', icon: <ChartBarIcon className="w-4 h-4" /> },
      ],
      color: 'quantum' as const,
    },
  ];

  // Grid data
  const gridCards = [
    {
      id: '1',
      type: 'full' as const,
      data: {
        title: 'Community Organizing Loop',
        description: 'Building sustainable community networks',
        input: {
          title: 'Needs',
          icon: <DocumentTextIcon className="w-5 h-5" />,
          content: 'Community challenges',
        },
        process: {
          title: 'Organize',
          icon: <Cog6ToothIcon className="w-5 h-5" />,
          content: 'Build networks',
        },
        output: {
          title: 'Actions',
          icon: <RocketLaunchIcon className="w-5 h-5" />,
          content: 'Collective efforts',
        },
        feedback: {
          title: 'Results',
          icon: <ChartBarIcon className="w-5 h-5" />,
          content: 'Impact metrics',
        },
        recursion: {
          title: 'Growth',
          icon: <ArrowPathIcon className="w-5 h-5" />,
          content: 'Scale success',
        },
        variant: 'compact' as const,
      },
    },
    {
      id: '2',
      type: 'mini' as const,
      data: miniLoops[0],
    },
    {
      id: '3',
      type: 'mini' as const,
      data: miniLoops[1],
    },
  ];

  return (
    <div className="min-h-screen bg-primary p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-display font-bold text-gold mb-4">
            Loop Card Component System
          </h1>
          <p className="text-gray max-w-2xl mx-auto">
            Visualize continuous improvement cycles with our 5-column loop system.
            Each component features glass morphism styling, gold accents, and smooth animations.
          </p>
        </div>

        {/* Main Loop Card Demo */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display text-gold">Full Loop Card</h2>
          <LoopCard {...mainLoopData} />
        </section>

        {/* Vertical Variant */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display text-gold">Vertical Loop Card</h2>
          <LoopCard {...mainLoopData} variant="vertical" />
        </section>

        {/* Mini Loop Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display text-gold">Mini Loop Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {miniLoops.map((loop, index) => (
              <MiniLoopCard key={index} {...loop} />
            ))}
          </div>
        </section>

        {/* Loop Card Grid */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display text-gold">Loop Card Grid</h2>
          <LoopCardGrid cards={gridCards} columns={3} />
        </section>

        {/* Interactive Loop Card */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display text-gold">Interactive Loop Card</h2>
          <p className="text-gray mb-4">
            Click the edit button to modify the loop card content in real-time.
          </p>
          <InteractiveLoopCard
            initialTitle="Custom Loop System"
            initialDescription="Edit this loop to create your own continuous improvement cycle"
            onSave={(data) => console.log('Saved loop data:', data)}
          />
        </section>

        {/* Loop Card Visualization */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display text-gold">Loop Card Visualization</h2>
          <p className="text-gray mb-4">
            Animated visualization showing the continuous flow through loop stages.
          </p>
          <div className="flex justify-center bg-charcoal/50 backdrop-blur-md rounded-xl p-8 border border-gold/20">
            <LoopCardVisualization
              stages={[
                { label: 'Input', color: '#00D4FF' },
                { label: 'Process', color: '#FFD700' },
                { label: 'Output', color: '#9945FF' },
                { label: 'Feedback', color: '#FFFFFF' },
                { label: 'Recursion', color: '#FFD700' },
              ]}
              particleCount={8}
              speed="normal"
              size="lg"
            />
          </div>
        </section>

        {/* Usage Examples */}
        <section className="space-y-4">
          <h2 className="text-2xl font-display text-gold">Usage Examples</h2>
          <div className="bg-charcoal/50 backdrop-blur-md rounded-xl p-6 border border-gold/20">
            <pre className="text-sm text-gray overflow-x-auto">
              <code>{`import { LoopCard, MiniLoopCard } from '@/app/components/loop-cards';

// Basic Loop Card
<LoopCard
  title="My Loop System"
  description="Description of the loop"
  input={{ title: 'Input', icon: <Icon />, content: 'Input description' }}
  process={{ title: 'Process', icon: <Icon />, content: 'Process description' }}
  output={{ title: 'Output', icon: <Icon />, content: 'Output description' }}
  feedback={{ title: 'Feedback', icon: <Icon />, content: 'Feedback description' }}
  recursion={{ title: 'Recursion', icon: <Icon />, content: 'Recursion description' }}
/>

// Mini Loop Card
<MiniLoopCard
  title="Quick Loop"
  steps={[
    { label: 'Step 1', icon: <Icon /> },
    { label: 'Step 2', icon: <Icon /> },
    { label: 'Step 3', icon: <Icon /> },
  ]}
  color="gold"
/>`}</code>
            </pre>
          </div>
        </section>
      </div>
    </div>
  );
}
