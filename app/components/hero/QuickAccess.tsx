'use client';

import React from 'react';
import { Button } from '../ui';

interface QuickAccessProps {
  domains: { label: string; icon: React.ReactNode; href: string }[];
}

const QuickAccess: React.FC<QuickAccessProps> = ({ domains }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 py-12">
      {domains.map((domain) => (
        <div key={domain.label} className="flex flex-col items-center">
          <div className="w-16 h-16 mb-4 flex items-center justify-center bg-primary rounded-full shadow-lg">
            {domain.icon}
          </div>
          <Button
            variant="accent"
            size="lg"
            onClick={() => (window.location.href = domain.href)}
          >
            {domain.label}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default QuickAccess;

