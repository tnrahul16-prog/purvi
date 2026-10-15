import React from 'react';

interface LotusFlowerProps {
  className?: string;
  size?: number;
  variant?: 'blush' | 'gold' | 'white' | 'soft-pink';
}

export const LotusFlower: React.FC<LotusFlowerProps> = ({
  className = '',
  size = 32,
  variant = 'soft-pink',
}) => {
  const getGradients = () => {
    switch (variant) {
      case 'gold':
        return {
          c1: '#FFF4B8',
          c2: '#E5B341',
          glow: 'rgba(229, 179, 65, 0.5)',
        };
      case 'white':
        return {
          c1: '#FFFFFF',
          c2: '#FFF4B8',
          glow: 'rgba(255, 255, 255, 0.6)',
        };
      case 'blush':
        return {
          c1: '#FFD700',
          c2: '#FFC107',
          glow: 'rgba(255, 193, 7, 0.45)',
        };
      case 'soft-pink':
      default:
        return {
          c1: '#FFF4B8',
          c2: '#FFD700',
          glow: 'rgba(255, 215, 0, 0.5)',
        };
    }
  };

  const { c1, c2 } = getGradients();
  const gradientId = `lotus-grad-${variant}-${Math.random().toString(36).substring(2, 7)}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block transition-transform duration-300 ${className}`}
    >
      <defs>
        <linearGradient id={gradientId} x1="50" y1="10" x2="50" y2="75" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <linearGradient id={`${gradientId}-petal`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="100%" stopColor={c2} stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Outer Lotus Petals */}
      <path
        d="M 50 68 C 25 68 8 52 14 38 C 20 28 35 44 48 62 Z"
        fill={`url(#${gradientId})`}
        opacity="0.75"
      />
      <path
        d="M 50 68 C 75 68 92 52 86 38 C 80 28 65 44 52 62 Z"
        fill={`url(#${gradientId})`}
        opacity="0.75"
      />

      {/* Mid Petals */}
      <path
        d="M 50 66 C 30 62 20 42 26 26 C 34 20 44 40 49 60 Z"
        fill={`url(#${gradientId}-petal)`}
        opacity="0.88"
      />
      <path
        d="M 50 66 C 70 62 80 42 74 26 C 66 20 56 40 51 60 Z"
        fill={`url(#${gradientId}-petal)`}
        opacity="0.88"
      />

      {/* Center Main Lotus Petal */}
      <path
        d="M 50 12 C 40 32 42 55 50 68 C 58 55 60 32 50 12 Z"
        fill={`url(#${gradientId})`}
      />

      {/* Delicate Lotus Core Sparkle */}
      <circle cx="50" cy="58" r="3.5" fill="#FFFFFF" opacity="0.95" />
      <circle cx="45" cy="61" r="2.2" fill="#FFF4B8" opacity="0.85" />
      <circle cx="55" cy="61" r="2.2" fill="#FFF4B8" opacity="0.85" />
    </svg>
  );
};
