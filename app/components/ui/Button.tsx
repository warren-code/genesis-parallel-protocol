'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'signal' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  glowEffect?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  loading = false,
  glowEffect = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3.5 text-lg',
  };

  const baseClasses = `
    relative inline-flex items-center justify-center gap-2
    font-body font-medium rounded-lg
    transition-all duration-300 ease-out
    transform active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full' : ''}
  `;

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-accent to-accent/80
      text-primary
      hover:from-accent/90 hover:to-accent/70
      hover:shadow-lg hover:shadow-accent/25
      ${glowEffect ? 'shadow-lg shadow-accent/30' : ''}
    `,
    secondary: `
      bg-gradient-to-r from-signal to-signal/80
      text-primary
      hover:from-signal/90 hover:to-signal/70
      hover:shadow-lg hover:shadow-signal/25
      ${glowEffect ? 'shadow-lg shadow-signal/30' : ''}
    `,
    accent: `
      bg-ink/10 backdrop-blur-sm
      text-accent border border-accent/30
      hover:bg-accent/20 hover:border-accent/50
      hover:shadow-lg hover:shadow-accent/20
      ${glowEffect ? 'shadow-lg shadow-accent/20' : ''}
    `,
    signal: `
      bg-ink/10 backdrop-blur-sm
      text-signal border border-signal/30
      hover:bg-signal/20 hover:border-signal/50
      hover:shadow-lg hover:shadow-signal/20
      ${glowEffect ? 'shadow-lg shadow-signal/20' : ''}
    `,
    danger: `
      bg-gradient-to-r from-danger to-danger/80
      text-ink
      hover:from-danger/90 hover:to-danger/70
      hover:shadow-lg hover:shadow-danger/25
      ${glowEffect ? 'shadow-lg shadow-danger/30' : ''}
    `,
    ghost: `
      bg-transparent
      text-gray hover:text-ink
      hover:bg-ink/10
    `,
  };

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* Loading spinner */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit rounded-lg">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      )}

      {/* Button content */}
      <span className={`flex items-center gap-2 ${loading ? 'invisible' : ''}`}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </span>

      {/* Hover effect overlay */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </button>
  );
};

export default Button;
