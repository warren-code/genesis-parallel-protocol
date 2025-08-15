'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';
import { GlossarySearch } from '@/components/GlossarySearch';

interface NavItem {
  label: string;
  href: string;
  description?: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModulesOpen, setIsModulesOpen] = useState(false);
  const pathname = usePathname();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.classList.add('mobile-menu-open');
    } else {
      document.body.classList.remove('mobile-menu-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-menu-open');
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when clicking outside or changing routes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsModulesOpen(false);
  }, [pathname]);

  // Top-level navigation items
  const navItems: NavItem[] = [
    { label: 'Home', href: '/', description: 'Gateway to Genesis Protocol' },
    { label: 'Genesis Parallel Protocol', href: '/parallel-protocol', description: 'Complete operational framework' },
  ];

  // Modules dropdown items
  const moduleItems: NavItem[] = [
    { label: 'Loop Economics', href: '/modules/loop-economics', description: 'Regenerative economic systems' },
    { label: 'Energy', href: '/modules/energy', description: 'Sustainable energy systems' },
    { label: 'Food', href: '/modules/food', description: 'Food production and distribution' },
    { label: 'Water', href: '/modules/water', description: 'Water management systems' },
    { label: 'Robotics', href: '/modules/robotics', description: 'Automation and robotics' },
    { label: 'Biotech', href: '/modules/biotech', description: 'Biotechnology applications' },
    { label: 'AI', href: '/modules/ai', description: 'Artificial intelligence integration' },
    { label: 'Education', href: '/modules/education', description: 'Learning and knowledge systems' },
    { label: 'Housing', href: '/modules/housing', description: 'DAO-managed housing infrastructure' },
    { label: 'Health', href: '/modules/health', description: 'Community health infrastructure' },
    { label: 'SCEP', href: '/modules/scep', description: 'Shared Cognitive Emotional Plane' },
    { label: 'SCEP Death Realms', href: '/modules/scep-death-realms', description: 'Controlled collapse and reconstitution' },
    { label: 'Babylon\'s Loops & Playbook', href: '/modules/babylon-loops', description: 'Understanding and breaking extraction loops' },
    { label: 'Culture & Memetics', href: '/modules/culture-memetics', description: 'Operational music and cultural infrastructure' },
  ];

  // Protocol items
  const protocolItems: NavItem[] = [
    { label: 'FOIA Protocol', href: '/modules/foia', description: 'Radical transparency system' },
    { label: 'Trade Protocol', href: '/modules/trade', description: 'Transparent supply chains' },
    { label: 'Finance Protocol', href: '/modules/finance', description: 'Non-debt tokenized economies' },
    { label: 'Technology Protocol', href: '/modules/technology', description: 'SCEP-integrated tech stack' },
    { label: 'Transport Protocol', href: '/modules/transport', description: 'Decentralized movement systems' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname?.startsWith(href) || false;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] px-4 py-4">
        <GlassmorphicCard blur="xl" opacity={0.08} borderGlow className="backdrop-saturate-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Genesis Logo */}
              <Link href="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent via-signal to-quantum opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                    {/* Glow effect layer */}
                    <div className="absolute inset-0 bg-accent/30 blur-md" />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-signal/30 to-quantum/20 blur-lg animate-pulse" />
                    <Image 
                      src="/images/golden-rings-logo.svg" 
                      alt="Genesis Protocol Logo"
                      width={48}
                      height={48}
                      className="relative object-contain p-1 rotate-180 drop-shadow-[0_0_10px_rgba(228,197,103,0.5)] filter brightness-110"
                    />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-ink font-display text-xl font-bold tracking-tight">
                    Genesis
                  </span>
                  <span className="text-gray text-xs font-body uppercase tracking-widest">
                    Parallel Protocol
                  </span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-1">
                {/* Primary Navigation Items */}
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      isActiveLink(item.href)
                        ? 'text-ink bg-gradient-to-r from-accent/10 to-signal/10 border border-accent/20'
                        : 'text-gray hover:text-ink hover:bg-ink/5 border border-transparent'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}


                {/* Protocol Links */}
                {protocolItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium ${
                      isActiveLink(item.href)
                        ? 'text-ink bg-gradient-to-r from-accent/10 to-signal/10 border border-accent/20'
                        : 'text-gray hover:text-ink hover:bg-ink/5 border border-transparent'
                    }`}
                  >
                    {item.label.replace(' Protocol', '')}
                  </Link>
                ))}
                
                {/* Glossary Search */}
                <div className="ml-4">
                  <GlossarySearch />
                </div>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-ink/10 transition-all duration-200 mobile-touch-target"
                aria-label="Toggle navigation menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span
                    className={`block h-0.5 w-full bg-ink transition-all duration-300 ${
                      isMobileMenuOpen
                        ? 'rotate-45 translate-y-2 bg-accent'
                        : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-ink transition-all duration-300 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`}
                  />
                  <span
                    className={`block h-0.5 w-full bg-ink transition-all duration-300 ${
                      isMobileMenuOpen
                        ? '-rotate-45 -translate-y-2 bg-accent'
                        : ''
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </GlassmorphicCard>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 mobile-menu-backdrop z-[90] transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="pt-24 px-4 pb-8 h-full overflow-y-auto">
          <div className="space-y-2 max-w-lg mx-auto">
            {/* Main Navigation */}
            {navItems.map((item, index) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <GlassmorphicCard
                  blur="sm"
                  opacity={0.05}
                  className={`p-4 transition-all duration-200 ${
                    isActiveLink(item.href)
                      ? 'border-accent/50 bg-accent/5'
                      : 'hover:border-accent/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div
                        className={`font-medium ${
                          isActiveLink(item.href) ? 'text-ink' : 'text-gray'
                        }`}
                      >
                        {item.label}
                      </div>
                      {item.description && (
                        <div className="text-xs text-gray/60 mt-1">
                          {item.description}
                        </div>
                      )}
                    </div>
                    <svg
                      className={`w-5 h-5 transition-colors ${
                        isActiveLink(item.href) ? 'text-accent' : 'text-gray/30'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </GlassmorphicCard>
              </Link>
            ))}
            
            {/* Modules Section */}
            <div className="pt-4 pb-2">
              <h3 className="text-gray font-semibold text-sm px-4 pb-2">Modules</h3>
              {moduleItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                  style={{ animationDelay: `${(navItems.length + index) * 30}ms` }}
                >
                  <GlassmorphicCard
                    blur="sm"
                    opacity={0.05}
                    className={`p-3 mb-1 transition-all duration-200 ${
                      isActiveLink(item.href)
                        ? 'border-accent/50 bg-accent/5'
                        : 'hover:border-accent/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`font-medium text-sm ${
                            isActiveLink(item.href) ? 'text-ink' : 'text-gray'
                          }`}
                        >
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray/60 mt-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <svg
                        className={`w-4 h-4 transition-colors ${
                          isActiveLink(item.href) ? 'text-accent' : 'text-gray/30'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </GlassmorphicCard>
                </Link>
              ))}
            </div>
            
            {/* Protocols Section */}
            <div className="pt-4 pb-2">
              <h3 className="text-gray font-semibold text-sm px-4 pb-2">Protocols</h3>
              {protocolItems.map((item, index) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                  style={{ animationDelay: `${(navItems.length + moduleItems.length + index) * 30}ms` }}
                >
                  <GlassmorphicCard
                    blur="sm"
                    opacity={0.05}
                    className={`p-3 mb-1 transition-all duration-200 ${
                      isActiveLink(item.href)
                        ? 'border-accent/50 bg-accent/5'
                        : 'hover:border-accent/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div
                          className={`font-medium text-sm ${
                            isActiveLink(item.href) ? 'text-ink' : 'text-gray'
                          }`}
                        >
                          {item.label}
                        </div>
                        {item.description && (
                          <div className="text-xs text-gray/60 mt-1">
                            {item.description}
                          </div>
                        )}
                      </div>
                      <svg
                        className={`w-4 h-4 transition-colors ${
                          isActiveLink(item.href) ? 'text-accent' : 'text-gray/30'
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </GlassmorphicCard>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
