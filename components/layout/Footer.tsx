'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import GlassmorphicCard from '@/app/components/ui/GlassmorphicCard';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  const footerSections: FooterSection[] = [
    {
      title: 'Core Systems',
      links: [
        { label: 'Energy Infrastructure', href: '/energy' },
        { label: 'Food Sovereignty', href: '/food' },
        { label: 'Water Management', href: '/water' },
        { label: 'Housing Solutions', href: '/housing' },
        { label: 'Health Services', href: '/health' },
      ],
    },
    {
      title: 'Governance',
      links: [
        { label: 'DAO Laws', href: '/dao-laws' },
        { label: 'Voting System', href: '/governance#voting' },
        { label: 'Proposals', href: '/governance#proposals' },
        { label: 'Treasury', href: '/finance#treasury' },
        { label: 'Community Guidelines', href: '/dao-laws#guidelines' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/download' },
        { label: 'Developer Tools', href: '/technology#tools' },
        { label: 'Educational Materials', href: '/education#resources' },
        { label: 'Research Papers', href: '/download#research' },
        { label: 'API Access', href: '/technology#api' },
      ],
    },
    {
      title: 'Community',
      links: [
        { label: 'Join Genesis', href: '/why-genesis#join' },
        { label: 'Events', href: '/culture#events' },
        { label: 'Forums', href: '/community' },
        { label: 'Support', href: '/support' },
        { label: 'Contact', href: '/contact' },
      ],
    },
  ];

  const operationalLinks: FooterLink[] = [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Security', href: '/security-policy' },
    { label: 'Open Source', href: 'https://github.com/genesis-protocol', external: true },
    { label: 'Status', href: '/status' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 relative">
      {/* Gradient Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      
      <div className="px-4 py-12">
        <GlassmorphicCard blur="md" opacity={0.05} className="backdrop-saturate-150">
          <div className="px-6 py-12 md:px-12">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-ink font-display font-semibold text-lg mb-4">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray hover:text-ink transition-colors duration-200 text-sm flex items-center gap-1"
                          >
                            {link.label}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-gray hover:text-ink transition-colors duration-200 text-sm"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Genesis Manifesto Section */}
            <div className="mt-12 pt-8 border-t border-gray/10">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2">
                  <h4 className="text-ink font-display font-semibold text-base mb-2">
                    Building Parallel Civilizations
                  </h4>
                  <p className="text-gray text-sm leading-relaxed">
                    Genesis Protocol enables communities to create autonomous, sustainable civilizations 
                    through decentralized infrastructure, loop economics, and collective governance. 
                    We're not just building technology—we're architecting the future of human coordination.
                  </p>
                </div>
                <div className="flex justify-start lg:justify-end">
                  <Link
                    href="/why-genesis"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-accent/10 to-signal/10 border border-accent/20 text-ink hover:border-accent/40 transition-all duration-200"
                  >
                    <span className="text-sm font-medium">Learn Why Genesis</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Operational Links & Copyright */}
            <div className="mt-8 pt-8 border-t border-gray/10">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-3">
                  {/* Genesis Logo Mark */}
                  <div className="w-8 h-8 rounded-lg overflow-hidden">
                    <Image 
                      src="/images/golden-rings-logo.svg" 
                      alt="Genesis Protocol Logo"
                      width={32}
                      height={32}
                      className="object-contain p-0.5 rotate-180"
                    />
                  </div>
                  <p className="text-gray text-sm">
                    © {currentYear} Genesis Protocol. Building the future, together.
                  </p>
                </div>

                {/* Operational Links */}
                <nav className="flex flex-wrap justify-center gap-4">
                  {operationalLinks.map((link, index) => (
                    <React.Fragment key={link.label}>
                      {link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray hover:text-ink transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-gray hover:text-ink transition-colors duration-200 text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                      {index < operationalLinks.length - 1 && (
                        <span className="text-gray/30">•</span>
                      )}
                    </React.Fragment>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </GlassmorphicCard>
      </div>
    </footer>
  );
};

export default Footer;
