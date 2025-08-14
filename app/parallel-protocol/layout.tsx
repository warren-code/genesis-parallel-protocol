import React from 'react';
import Image from 'next/image';

export default function ParallelProtocolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-primary">
      {/* Background pattern with gold seal watermark */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/genesis_gold_seal.svg)',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '60%',
          opacity: 0.25,
        }}
      />
      
      {/* Fractal border overlay */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 border-8 border-accent/10" />
        <div className="absolute inset-4 border-4 border-accent/5" />
        <div className="absolute inset-8 border-2 border-accent/5" />
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
          }}
        />
      </div>
      
      {/* Main content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}
