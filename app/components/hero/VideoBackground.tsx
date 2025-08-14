'use client';

import React, { useEffect, useRef } from 'react';

interface VideoBackgroundProps {
  videoUrl?: string;
  posterUrl?: string;
  overlayOpacity?: number;
  mythicOverlay?: boolean;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl = '/videos/loop-visualization.mp4',
  posterUrl = '/images/loop-poster.jpg',
  overlayOpacity = 0.6,
  mythicOverlay = true,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.75; // Slow motion effect
    }
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video Element */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster={posterUrl}
      >
        <source src={videoUrl} type="video/mp4" />
        {/* Fallback for browsers that don't support video */}
        <img 
          src={posterUrl} 
          alt="Loop visualization background" 
          className="absolute inset-0 w-full h-full object-cover"
        />
      </video>

      {/* Dark Overlay */}
      <div 
        className="absolute inset-0 bg-primary"
        style={{ opacity: overlayOpacity }}
      />

      {/* Mythic-Tech Gradient Overlay */}
      {mythicOverlay && (
        <div className="absolute inset-0">
          {/* Top gradient fade */}
          <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-primary via-primary/80 to-transparent" />
          
          {/* Bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-primary via-primary/80 to-transparent" />
          
          {/* Animated golden streaks */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-signal to-transparent animate-pulse animation-delay-2000" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent to-transparent animate-pulse" />
          </div>

          {/* Mythic pattern overlay */}
          <svg 
            className="absolute inset-0 w-full h-full opacity-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern 
                id="mythic-pattern" 
                x="0" 
                y="0" 
                width="100" 
                height="100" 
                patternUnits="userSpaceOnUse"
              >
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#mythic-pattern)" />
          </svg>
        </div>
      )}

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-primary/50" />
    </div>
  );
};

export default VideoBackground;
