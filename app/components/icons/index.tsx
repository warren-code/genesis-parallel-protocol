import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

export const ConsciousnessIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" opacity="0.3" />
    <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="2" />
    <circle cx="24" cy="24" r="3" fill="currentColor" />
    <path
      d="M24 3 L24 45 M3 24 L45 24"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.2"
      strokeDasharray="2 4"
    />
  </svg>
);

export const RecursionIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 8 Q40 8 40 24 Q40 40 24 40 Q8 40 8 24 Q8 8 24 8"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M24 16 Q32 16 32 24 Q32 32 24 32 Q16 32 16 24 Q16 16 24 16"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      opacity="0.7"
    />
    <circle cx="24" cy="24" r="4" fill="currentColor" />
  </svg>
);

export const CommunityIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="12" cy="28" r="6" stroke="currentColor" strokeWidth="2" />
    <circle cx="36" cy="28" r="6" stroke="currentColor" strokeWidth="2" />
    <path
      d="M24 18 L24 24 M18 24 L12 28 M30 24 L36 28"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

export const ProtocolIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="8" y="8" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M16 16 L32 16 M16 24 L32 24 M16 32 L24 32"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="32" cy="32" r="3" fill="currentColor" />
  </svg>
);

export const RealityIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 4 L40 16 L40 32 L24 44 L8 32 L8 16 Z"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M24 4 L24 44 M8 16 L40 32 M40 16 L8 32"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.5"
    />
    <circle cx="24" cy="24" r="6" fill="currentColor" opacity="0.8" />
  </svg>
);

export const TransformIcon: React.FC<IconProps> = ({ size = 48, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 12 L12 36 L36 36"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M12 32 Q20 24 24 20 Q28 16 36 8"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <circle cx="12" cy="32" r="3" fill="currentColor" />
    <circle cx="24" cy="20" r="3" fill="currentColor" />
    <circle cx="36" cy="8" r="3" fill="currentColor" />
  </svg>
);
