'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarNavigationProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ isOpen = true, onClose }) => {
  const pathname = usePathname();
  const { user, profile } = useAuth();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Loop-based navigation structure
  const navigationSections = [
    {
      title: 'Core Realms',
      icon: '◈',
      items: [
        { label: 'Gateway', href: '/', icon: '◈', description: 'Entry point to consciousness' },
        { label: 'Realms', href: '/realms', icon: '◆', description: 'Explore parallel dimensions', requiresAuth: true },
        { label: 'Protocols', href: '/protocols', icon: '◉', description: 'System architectures' },
      ]
    },
    {
      title: 'Consciousness Flow',
      icon: '⬢',
      items: [
        { label: 'Consciousness', href: '/consciousness', icon: '⬢', description: 'Neural pathways', requiresAuth: true },
        { label: 'Emergence', href: '/emergence', icon: '◊', description: 'Patterns of creation', requiresAuth: true },
        { label: 'Resonance', href: '/resonance', icon: '✦', description: 'Harmonic frequencies', requiresAuth: true },
      ]
    },
    {
      title: 'Synthesis Loop',
      icon: '⬡',
      items: [
        { label: 'Synthesis', href: '/synthesis', icon: '⬡', description: 'Merge realities', requiresAuth: true },
        { label: 'Transcendence', href: '/transcendence', icon: '⟳', description: 'Beyond boundaries', requiresAuth: true },
        { label: 'Interface', href: '/interface', icon: '✦', description: 'Connection points', requiresAuth: true },
      ]
    },
    {
      title: 'Community',
      icon: '⬢',
      items: [
        { label: 'Community', href: '/community', icon: '⬢', description: 'Connect with others' },
        { label: 'Learning', href: '/learning', icon: '◊', description: 'Expand knowledge' },
        { label: 'Research', href: '/research', icon: '◉', description: 'Deep investigations', requiresAuth: true, roles: ['admin', 'organizer'] },
      ]
    },
    {
      title: 'Truth Operations',
      icon: '⚔',
      items: [
        { label: 'Truth Map', href: '/truth-map', icon: '🛡️', description: 'Fact-check misinformation' },
        { label: 'FOIA Hub', href: '/foia', icon: '📄', description: 'Information requests' },
        { label: 'Rights Guide', href: '/know-your-rights', icon: '⚖️', description: 'Legal protections' },
      ]
    },
    {
      title: 'System',
      icon: '⚡',
      items: [
        { label: 'Dashboard', href: '/dashboard', icon: '◈', description: 'Personal overview', requiresAuth: true },
        { label: 'Settings', href: '/settings', icon: '⬡', description: 'Configure experience', requiresAuth: true },
        { label: 'Admin', href: '/admin', icon: '⚡', description: 'System control', requiresAuth: true, roles: ['admin'] },
        { label: 'Support', href: '/support', icon: '⟳', description: 'Get assistance' },
      ]
    }
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  const filterItems = (items: any[]) => {
    return items.filter(item => {
      if (!item.requiresAuth) return true;
      if (!user) return false;
      if (!item.roles || item.roles.length === 0) return true;
      return item.roles.includes(profile?.role || '');
    });
  };

  useEffect(() => {
    // Auto-expand section containing active link
    navigationSections.forEach(section => {
      if (section.items.some(item => isActiveLink(item.href))) {
        setExpandedSection(section.title);
      }
    });
  }, [pathname]);

  return (
    <aside className={`
      fixed left-0 top-20 h-[calc(100vh-5rem)] w-64 z-20
      transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <GlassmorphicCard 
        blur="md" 
        opacity={0.1} 
        className="h-full overflow-hidden"
        borderGlow
      >
        <div className="p-4 h-full overflow-y-auto custom-scrollbar">
          {/* Loop Indicator */}
          <div className="mb-6">
            <div className="relative w-full h-2 bg-ink/10 rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-accent to-signal rounded-full animate-loop-progress" />
            </div>
            <p className="text-xs text-gray mt-2 text-center">Consciousness Loop Active</p>
          </div>

          {/* Navigation Sections */}
          <nav className="space-y-4">
            {navigationSections.map((section) => {
              const filteredItems = filterItems(section.items);
              if (filteredItems.length === 0) return null;

              const isExpanded = expandedSection === section.title;

              return (
                <div key={section.title} className="space-y-2">
                  <button
                    onClick={() => setExpandedSection(isExpanded ? null : section.title)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-ink/5 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-accent">{section.icon}</span>
                      <span className="text-sm font-medium text-gray">{section.title}</span>
                    </div>
                    <svg 
                      className={`w-4 h-4 text-gray transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div className={`space-y-1 overflow-hidden transition-all duration-300 ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    {filteredItems.map((item) => {
                      const isActive = isActiveLink(item.href);
                      
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className={`
                            block p-3 rounded-lg transition-all duration-200
                            ${isActive 
                              ? 'bg-accent/10 border-l-2 border-accent' 
                              : 'hover:bg-ink/5 hover:border-l-2 hover:border-gray/20'
                            }
                          `}
                        >
                          <div className="flex items-start space-x-3">
                            <span className={`text-lg ${isActive ? 'text-accent' : 'text-gray'}`}>
                              {item.icon}
                            </span>
                            <div className="flex-1">
                              <p className={`text-sm font-medium ${isActive ? 'text-ink' : 'text-gray'}`}>
                                {item.label}
                              </p>
                              <p className="text-xs text-gray/70 mt-1">
                                {item.description}
                              </p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </nav>

          {/* Loop Completion Indicator */}
          <div className="mt-8 p-4 border border-accent/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray">Loop Progress</span>
              <span className="text-xs text-accent">72%</span>
            </div>
            <div className="w-full h-1 bg-ink/10 rounded-full overflow-hidden">
              <div className="h-full w-[72%] bg-gradient-to-r from-accent to-signal rounded-full" />
            </div>
          </div>
        </div>
      </GlassmorphicCard>
    </aside>
  );
};

export default SidebarNavigation;
