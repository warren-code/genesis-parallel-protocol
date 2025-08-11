'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import GlassmorphicCard from '../ui/GlassmorphicCard';
import { useAuth } from '@/contexts/AuthContext';
import SearchBar from '../search/SearchBar';
import NotificationSystem from '../notifications/NotificationSystem';

interface MenuItem {
  label: string;
  href: string;
  icon: string;
  realm?: string;
  requiresAuth?: boolean;
  roles?: string[];
}

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, profile, signOut } = useAuth();

  const publicMenuItems: MenuItem[] = [
    { label: 'Gateway', href: '/', icon: '◈', realm: 'foundation' },
    { label: 'Protocols', href: '/protocols', icon: '◉', realm: 'synthesis' },
    { label: 'Peaceful Militance', href: '/peaceful-militance', icon: '☮', realm: 'transcendence' },
    { label: 'Know Your Rights', href: '/know-your-rights', icon: '⚖', realm: 'justice' },
    { label: 'Learning', href: '/learning', icon: '◊', realm: 'emergence' },
    { label: 'Community', href: '/community', icon: '⬢', realm: 'neural' },
  ];

  const authenticatedMenuItems: MenuItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: '◈', realm: 'foundation', requiresAuth: true },
    { label: 'Rapid Response', href: '/rapid-response', icon: '🚨', realm: 'response', requiresAuth: true },
    { label: 'SOPs', href: '/sops', icon: '📋', realm: 'protocol', requiresAuth: true },
    { label: 'Legal/Bond', href: '/legal-bond', icon: '⚖️', realm: 'justice', requiresAuth: true },
    { label: 'Memory Layer', href: '/memory-layer', icon: '🔒', realm: 'archive', requiresAuth: true },
    { label: 'Services', href: '/parallel-services', icon: '🤝', realm: 'network', requiresAuth: true },
    { label: 'Loop Economics', href: '/economics', icon: '♻️', realm: 'economics', requiresAuth: true },
    { label: 'Governance', href: '/governance', icon: '⚖️', realm: 'governance', requiresAuth: true },
    { label: 'Memetics', href: '/memetics', icon: '🧬', realm: 'memetics', requiresAuth: true },
    { label: 'Resources', href: '/resources', icon: '📦', realm: 'resources', requiresAuth: true },
    { label: 'Network', href: '/network', icon: '🌐', realm: 'network', requiresAuth: true },
    { label: 'Research', href: '/research', icon: '◉', realm: 'synthesis', requiresAuth: true, roles: ['admin', 'organizer'] },
    { label: 'Settings', href: '/settings', icon: '⬡', realm: 'temporal', requiresAuth: true },
  ];

  const adminMenuItems: MenuItem[] = [
    { label: 'Admin', href: '/admin', icon: '⚡', realm: 'quantum', requiresAuth: true, roles: ['admin'] },
  ];

  // Combine menu items based on authentication status
  const menuItems = [
    ...publicMenuItems,
    ...(user ? authenticatedMenuItems : []),
    ...(user && profile?.role === 'admin' ? adminMenuItems : []),
    { label: 'Support', href: '/support', icon: '⟳', realm: 'transcendence' },
  ];

  // Filter menu items based on roles
  const filteredMenuItems = menuItems.filter(item => {
    if (!item.requiresAuth) return true;
    if (!user) return false;
    if (!item.roles || item.roles.length === 0) return true;
    return item.roles.includes(profile?.role || '');
  });

  const isActiveLink = (href: string) => {
    if (href === '/') return pathname === href;
    return pathname.startsWith(href);
  };

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 px-4 py-4">
        <GlassmorphicCard blur="lg" opacity={0.15} borderGlow>
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent to-signal flex items-center justify-center">
                  <span className="text-primary font-display font-bold text-xl">G3</span>
                </div>
                <span className="text-ink font-display text-xl font-semibold hidden sm:block">
                  Genesis Protocol
                </span>
              </div>

              {/* Search Bar */}
              <div className="hidden lg:block flex-1 max-w-md mx-4">
                <SearchBar />
              </div>

              {/* Desktop Menu */}
              <div className="hidden lg:flex items-center space-x-1">
                {filteredMenuItems.slice(0, 6).map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 font-body text-sm ${
                      isActiveLink(item.href)
                        ? 'text-ink bg-accent/10 border border-accent/20'
                        : 'text-gray hover:text-ink hover:bg-ink/10 border border-transparent'
                    }`}
                  >
                    <span className="text-accent">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}

                {/* Notification System */}
                {user && (
                  <NotificationSystem className="ml-2" />
                )}

                {/* User Profile Section */}
                {user ? (
                  <div className="ml-4 flex items-center space-x-2">
                    <div className="h-6 w-px bg-gray/20" />
                    <div className="flex items-center space-x-3">
                      <div className="flex flex-col items-end">
                        <span className="text-sm font-medium text-ink">
                          {profile?.full_name || user.email?.split('@')[0]}
                        </span>
                        <span className="text-xs text-gray capitalize">
                          {profile?.role || 'User'}
                        </span>
                      </div>
                      <button
                        onClick={handleSignOut}
                        className="p-2 rounded-lg hover:bg-ink/10 transition-colors text-gray hover:text-ink"
                        aria-label="Sign out"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="ml-4 flex items-center space-x-2">
                    <div className="h-6 w-px bg-gray/20" />
                    <Link
                      href="/auth/login"
                      className="px-4 py-2 rounded-lg bg-accent text-primary hover:bg-accent/90 transition-colors font-body text-sm font-medium"
                    >
                      Sign In
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-ink/10 transition-colors"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-ink transition-transform duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block h-0.5 w-full bg-ink transition-opacity duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 w-full bg-ink transition-transform duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </GlassmorphicCard>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-primary/95 backdrop-blur-xl z-30 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="pt-24 px-4 pb-8 h-full overflow-y-auto">
          {/* Search Bar for Mobile */}
          <div className="mb-6 px-4">
            <SearchBar />
          </div>

          {/* User Profile Section for Mobile */}
          {user && (
            <div className="mb-6 px-4">
              <GlassmorphicCard blur="md" opacity={0.1} className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-ink font-medium">
                      {profile?.full_name || user.email?.split('@')[0]}
                    </p>
                    <p className="text-sm text-gray capitalize">
                      {profile?.role || 'User'}
                    </p>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="p-2 rounded-lg hover:bg-ink/10 transition-colors text-gray hover:text-ink"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </button>
                </div>
              </GlassmorphicCard>
            </div>
          )}

          {/* Loop-based Navigation Grid */}
          <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto">
            {filteredMenuItems.map((item, index) => {
              const isActive = isActiveLink(item.href);
              const delay = index * 50;
              
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="group"
                  style={{ animationDelay: `${delay}ms` }}
                >
                  <GlassmorphicCard 
                    blur="sm" 
                    opacity={0.05} 
                    className={`p-4 transition-all duration-200 ${
                      isActive 
                        ? 'border-accent/50 bg-accent/5' 
                        : 'hover:border-accent/50'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <span className={`text-2xl transition-transform ${
                        isActive 
                          ? 'text-accent scale-110' 
                          : 'text-accent group-hover:scale-110'
                      }`}>
                        {item.icon}
                      </span>
                      <span className={`font-body text-sm ${
                        isActive 
                          ? 'text-ink font-medium' 
                          : 'text-gray group-hover:text-ink'
                      }`}>
                        {item.label}
                      </span>
                    </div>
                  </GlassmorphicCard>
                </Link>
              );
            })}
          </div>

          {/* Sign In Button for Mobile */}
          {!user && (
            <div className="mt-6 px-4">
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="block w-full"
              >
                <GlassmorphicCard blur="md" opacity={0.1} className="p-4 text-center hover:border-accent/50 transition-all">
                  <span className="text-accent font-medium">Sign In to Continue</span>
                </GlassmorphicCard>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navigation;
