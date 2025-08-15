'use client';

import React, { useState } from 'react';
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
  const pathname = usePathname();

  // Enhanced navigation with protocol suite
  const navItems: NavItem[] = [
    { label: 'Home', href: '/', description: 'Gateway to Genesis Protocol' },
    { label: 'Protocols', href: '/protocols', description: 'Six foundational protocol suite' },
    { label: 'Parallel Protocol', href: '/parallel-protocol', description: 'Complete operational framework' },
    { label: 'DAO Governance', href: '/dao-governance', description: 'Decentralized governance framework' },
    { label: 'Loop Economics', href: '/loop-economics', description: 'Regenerative economic systems' },
    { label: 'SCEP', href: '/scep', description: 'Shared Cognitive Emotional Plane' },
    { label: 'Transport Protocol', href: '/protocols/transport', description: 'Decentralized movement systems' },
    { label: 'Housing Protocol', href: '/protocols/housing', description: 'DAO-managed housing infrastructure' },
    { label: 'Finance Protocol', href: '/protocols/finance', description: 'Non-debt tokenized economies' },
    { label: 'Technology Protocol', href: '/protocols/technology', description: 'SCEP-integrated tech stack' },
    { label: 'Trade Protocol', href: '/protocols/trade', description: 'Transparent supply chains' },
    { label: 'FOIA Protocol', href: '/protocols/foia', description: 'Radical transparency system' },
    { label: 'Culture', href: '/culture-memetics', description: 'Arts and cultural preservation' },
    { label: 'Education', href: '/learning', description: 'Learning and knowledge systems' },
    { label: 'Health', href: '/parallel-protocol#health', description: 'Community health infrastructure' },
    { label: 'Security', href: '/parallel-protocol#security', description: 'Community safety protocols' },
    { label: 'Waste', href: '/loop-economics#waste', description: 'Waste management and recycling' },
    { label: 'Why Genesis', href: '/why-genesis', description: 'The need for new civilization' },
    { label: 'Compare', href: '/compare', description: 'Genesis vs traditional systems' },
    { label: 'Download', href: '/download', description: 'Resources and documentation' },
  ];

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname?.startsWith(href) || false;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
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
                {navItems.slice(0, 6).map((item) => (
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

                {/* More Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    className="px-4 py-2 rounded-lg text-gray hover:text-ink hover:bg-ink/5 transition-all duration-200 text-sm font-medium flex items-center gap-2"
                  >
                    More
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-64 py-2 z-50">
                      <GlassmorphicCard blur="lg" opacity={0.1} borderGlow>
                        <div className="max-h-96 overflow-y-auto">
                          {navItems.slice(6).map((item) => (
                            <Link
                              key={item.label}
                              href={item.href}
                              className={`block px-4 py-3 transition-all duration-200 hover:bg-ink/5 ${
                                isActiveLink(item.href)
                                  ? 'text-ink bg-gradient-to-r from-accent/5 to-signal/5 border-l-2 border-accent'
                                  : 'text-gray hover:text-ink'
                              }`}
                            >
                              <div className="font-medium text-sm">{item.label}</div>
                              {item.description && (
                                <div className="text-xs text-gray/70 mt-1">
                                  {item.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </GlassmorphicCard>
                    </div>
                  )}
                </div>
                
                {/* Glossary Search */}
                <div className="ml-4">
                  <GlossarySearch />
                </div>
              </nav>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-ink/10 transition-all duration-200"
                aria-label="Toggle navigation menu"
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
        className={`fixed inset-0 bg-primary/98 backdrop-blur-2xl z-40 transition-all duration-300 lg:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="pt-24 px-4 pb-8 h-full overflow-y-auto">
          <div className="space-y-2 max-w-lg mx-auto">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
