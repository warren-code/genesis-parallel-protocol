'use client';

import { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

interface NavigationState {
  isMobileMenuOpen: boolean;
  isSidebarOpen: boolean;
  activeSection: string | null;
  loopProgress: number;
}

export function useNavigation() {
  const pathname = usePathname();
  const [state, setState] = useState<NavigationState>({
    isMobileMenuOpen: false,
    isSidebarOpen: false,
    activeSection: null,
    loopProgress: 0,
  });

  // Close mobile menu on route change
  useEffect(() => {
    setState(prev => ({ ...prev, isMobileMenuOpen: false }));
  }, [pathname]);

  // Update loop progress based on navigation
  useEffect(() => {
    if (pathname) {
      const pathSegments = pathname.split('/').filter(Boolean);
      const progress = Math.min((pathSegments.length / 5) * 100, 100);
      setState(prev => ({ ...prev, loopProgress: progress }));
    }
  }, [pathname]);

  // Toggle functions
  const toggleMobileMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMobileMenuOpen: !prev.isMobileMenuOpen }));
  }, []);

  const toggleSidebar = useCallback(() => {
    setState(prev => ({ ...prev, isSidebarOpen: !prev.isSidebarOpen }));
  }, []);

  const closeMobileMenu = useCallback(() => {
    setState(prev => ({ ...prev, isMobileMenuOpen: false }));
  }, []);

  const closeSidebar = useCallback(() => {
    setState(prev => ({ ...prev, isSidebarOpen: false }));
  }, []);

  const setActiveSection = useCallback((section: string | null) => {
    setState(prev => ({ ...prev, activeSection: section }));
  }, []);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setState(prev => ({ 
          ...prev, 
          isMobileMenuOpen: false,
          isSidebarOpen: true 
        }));
      } else {
        setState(prev => ({ 
          ...prev, 
          isSidebarOpen: false 
        }));
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    ...state,
    toggleMobileMenu,
    toggleSidebar,
    closeMobileMenu,
    closeSidebar,
    setActiveSection,
  };
}
