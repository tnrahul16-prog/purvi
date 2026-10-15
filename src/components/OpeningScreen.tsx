import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { LotusFlower } from './LotusFlower';
import { BloomingLotusBackground } from './BloomingLotusBackground';
import { ClickHereHint } from './ClickHereHint';

interface OpeningScreenProps {
  onOpen: () => void;
  greeting: string;
  subheading: string;
  ctaText: string;
  badge?: string;
  language?: 'hi' | 'en';
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  onOpen,
  greeting,
  subheading,
  ctaText,
  badge = 'A Birthday Surprise for Purvi',
  language = 'en',
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    // Smooth cinematic delay allowing the expanding light & petals animation
    setTimeout(() => {
      onOpen();
    }, 1100);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.05 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 min-h-[100dvh] w-full z-50 flex flex-col items-center justify-center p-5 sm:p-6 text-center overflow-hidden touch-manipulation"
        style={{
          background: 'radial-gradient(ellipse at center, #151515 0%, #0d0d0d 50%, #080808 100%)',
        }}
      >
        {/* Soft Ambient Light Blobs */}
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.3, 0.55, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute w-96 h-96 rounded-full bg-[#FFD700]/15 blur-3xl pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.45, 0.2],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#FFC107]/15 blur-3xl pointer-events-none"
        />

        {/* 🪷 Golden Lotus Blooming Animation */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 pointer-events-none select-none z-0 overflow-visible flex items-center justify-center"
          style={{
            top: 'clamp(54vh, 58vh, 60vh)',
            transform: 'translate(-50%, -50%)',
            width: 'min(92vw, clamp(280px, 46vw, 540px))',
            height: 'min(50vh, clamp(210px, 36vh, 410px))',
          }}
        >
          <BloomingLotusBackground />
        </div>

        {/* Expanding Ring on click */}
        {isOpening && (
          <motion.div
            initial={{ scale: 0, opacity: 0.9 }}
            animate={{ scale: 30, opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute z-30 w-32 h-32 rounded-full bg-[#FFD700] blur-xl pointer-events-none"
          />
        )}

        {/* Lotus Icon Accent */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="mb-8 relative z-10"
        >
          <div className="p-4 rounded-full bg-[#151515]/80 backdrop-blur-md shadow-lg shadow-[#FFD700]/20 border border-[#FFD700]/40">
            <LotusFlower size={44} variant="soft-pink" className="animate-soft-float" />
          </div>
          <div className="absolute -top-1 -right-1 text-[#FFD700]">
            <Sparkles size={16} className="animate-pulse" />
          </div>
        </motion.div>

        {/* Greeting Text */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
          className="relative z-10 font-display text-4xl sm:text-5xl md:text-6xl text-[#FFD700] font-normal tracking-tight mb-4 drop-shadow-[0_2px_12px_rgba(255,215,0,0.3)]"
        >
          {greeting}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
          className="relative z-10 text-lg sm:text-xl text-[#FFF4B8]/85 font-light max-w-xs sm:max-w-md mx-auto mb-10 leading-relaxed font-sans-clean"
        >
          {subheading}
        </motion.p>

        {/* The Breathing Glow Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 2.0, ease: 'easeOut' }}
          className="relative z-20"
        >
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleClick}
            disabled={isOpening}
            className="touch-manipulation select-none relative group px-8 py-4 min-h-[48px] rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] text-[#080808] font-semibold text-base sm:text-lg shadow-xl shadow-[#FFD700]/30 border border-[#FFF4B8]/60 overflow-hidden transition-all duration-300 animate-glow-breathe cursor-pointer active:brightness-95"
          >
            {/* Shimmer Highlight */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out pointer-events-none" />

            <div className="flex items-center justify-center gap-2.5">
              <span>{ctaText}</span>
              <Heart size={18} className="fill-[#080808] text-[#080808] animate-pulse" />
            </div>
          </motion.button>

          {/* Click here prompt with up arrow pointing up to the button */}
          <div className="flex justify-center">
            <ClickHereHint onClick={handleClick} language={language} delay={2.4} />
          </div>
        </motion.div>

        {/* Bottom subtle note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 2.8, duration: 1 }}
          className="absolute bottom-8 z-10 text-xs text-[#E5B341]/80 tracking-widest uppercase font-sans-clean"
        >
          {badge}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
