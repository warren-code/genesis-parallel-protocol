'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import SidebarNavigation from '@/app/components/navigation/SidebarNavigation';
import { useNavigation } from '@/hooks/useNavigation';

interface AppLayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export default function AppLayout({ children, showSidebar = true }: AppLayoutProps) {
  const pathname = usePathname();
  const { isSidebarOpen, closeSidebar } = useNavigation();
  
  // Don't show sidebar on certain pages
  const noSidebarPages = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/'];
  const shouldShowSidebar = showSidebar && pathname && !noSidebarPages.includes(pathname);

  return (
    <div className="relative">
      {shouldShowSidebar && (
        <>
          {/* Sidebar */}
          <SidebarNavigation isOpen={isSidebarOpen} onClose={closeSidebar} />
          
          {/* Mobile overlay */}
          {isSidebarOpen && (
            <div
              className="fixed inset-0 bg-primary/50 backdrop-blur-sm z-10 lg:hidden"
              onClick={closeSidebar}
            />
          )}
        </>
      )}
      
      {/* Main content */}
      <main className={`
        transition-all duration-300 ease-in-out
        ${shouldShowSidebar && isSidebarOpen ? 'lg:ml-64' : ''}
      `}>
        {children}
      </main>
    </div>
  );
}
