import React, { useState } from 'react';
import { LotusFlower } from './LotusFlower';
import { Sparkles, Heart } from 'lucide-react';

const ASSET_MAP: Record<string, string> = {
  '/photo1.png': '/photo1.png',
  '/photo2.png': '/photo2.png',
  '/photo3.png': '/photo3.png',
  '/landscapeimg.png': '/landscapeimg.png',
  '/happy-birthday-farha.png': '/happy-birthday-farha.png',
  '/photo1.jpg': '/photo1.png',
  '/photo2.jpg': '/photo2.png',
  '/photo3.jpg': '/photo3.png',
  '/landscapeimg.jpg': '/landscapeimg.png',
};

function resolveAsset(url?: string): string {
  if (!url) return '';
  const clean = url.split('?')[0];
  return ASSET_MAP[clean] || url;
}

interface SafePhotoProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle: string;
  fallbackSubtitle?: string;
  aspectRatio?: 'portrait' | 'square' | 'wide' | 'auto';
  objectFit?: 'cover' | 'contain';
  fallbackSrc?: string;
  priority?: boolean;
}

export const SafePhoto: React.FC<SafePhotoProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle,
  fallbackSubtitle = 'Place your file in /public',
  aspectRatio = 'portrait',
  objectFit = 'cover',
  fallbackSrc,
  priority = false,
}) => {
  const [currentSrc, setCurrentSrc] = useState(() => resolveAsset(src));
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    setCurrentSrc(resolveAsset(src));
    setHasError(false);
  }, [src]);

  const handleError = () => {
    const resolvedFallback = resolveAsset(fallbackSrc);
    if (resolvedFallback && currentSrc !== resolvedFallback) {
      setCurrentSrc(resolvedFallback);
    } else {
      setHasError(true);
    }
  };

  // Aspect ratio classes
  const aspectClass =
    aspectRatio === 'portrait'
      ? 'aspect-[3/4]'
      : aspectRatio === 'square'
      ? 'aspect-square'
      : aspectRatio === 'wide'
      ? 'aspect-[16/9]'
      : '';

  if (hasError || !currentSrc) {
    return (
      <div
        className={`relative flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-[#151515] via-[#101010] to-[#151515] border border-[#FFD700]/30 shadow-inner overflow-hidden text-center select-none ${aspectClass} ${className}`}
      >
        {/* Soft decorative background circles */}
        <div className="absolute w-40 h-40 rounded-full bg-[#FFD700]/10 blur-2xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="p-4 mb-3 rounded-full bg-[#1e1e1e] shadow-sm border border-[#FFD700]/40 animate-soft-float">
            <LotusFlower size={36} variant="gold" />
          </div>
          <p className="font-display text-[#FFD700] font-medium text-lg mb-1">{fallbackTitle}</p>
          <p className="text-xs text-[#FFF4B8]/80 max-w-[200px] leading-tight font-sans-clean">
            {fallbackSubtitle}
          </p>
          <div className="flex items-center gap-1 mt-3 text-[#FFD700]">
            <Heart size={14} className="fill-[#FFD700]" />
            <Sparkles size={14} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
      draggable={false}
      className={`max-w-full ${objectFit === 'cover' ? 'object-cover' : 'object-contain'} ${className}`}
    />
  );
};
