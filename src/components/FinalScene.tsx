import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Moon, Star, RotateCcw } from 'lucide-react';
import { LotusFlower } from './LotusFlower';
import { ClickHereHint } from './ClickHereHint';

interface FinalSceneProps {
  mainHeading: string;
  wishes: string;
  keepSmiling: string;
  bestWishesDistance?: string;
  makeAWishButton?: string;
  wishCelebratedTitle?: string;
  wishCelebratedMessage?: string;
  madeWithLove: string;
  signature: string;
  replayButton?: string;
  onReplay?: () => void;
  language?: 'hi' | 'en';
}

export const FinalScene: React.FC<FinalSceneProps> = ({
  mainHeading,
  wishes,
  keepSmiling,
  bestWishesDistance = 'And I hope you always remember that the person who loves you deeply in India is wishing you the very best. 🇮🇳 → 💛',
  makeAWishButton = 'Make a wish ✨',
  wishCelebratedTitle = 'May all your wishes come true! 💛',
  wishCelebratedMessage = 'Wishing you a lifetime of endless happiness, smiles, and our beautiful journey together ✨💛',
  madeWithLove,
  signature,
  replayButton = 'Experience it again 💛',
  onReplay,
  language = 'en',
}) => {
  const [wishMade, setWishMade] = useState(false);

  const handleMakeWish = () => {
    setWishMade(true);
    try {
      confetti({
        particleCount: 110,
        spread: 90,
        origin: { y: 0.7 },
        colors: ['#FFD700', '#FFC107', '#FFF4B8', '#FFFFFF', '#E5B341'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFC107', '#FFF4B8'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFC107', '#FFF4B8'],
        });
      }, 300);
    } catch {}
  };

  const handleScrollToTop = () => {
    if (onReplay) {
      onReplay();
    } else {
      try {
        document.querySelectorAll('audio, video').forEach((el) => {
          try {
            (el as HTMLMediaElement).pause();
            (el as HTMLMediaElement).currentTime = 0;
          } catch {}
        });
        if ('scrollRestoration' in history) {
          history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
      } catch {}
      window.location.reload();
    }
  };

  return (
    <footer className="relative min-h-[85dvh] py-16 sm:py-24 px-4 sm:px-5 pb-safe-bottom flex flex-col items-center justify-center text-center max-w-lg mx-auto overflow-hidden">
      {/* Dreamy Night Glow & Stars Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FFD700]/5 to-[#080808] pointer-events-none" />
      <div className="absolute w-96 h-96 rounded-full bg-gradient-to-tr from-[#FFD700]/15 via-[#FFC107]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Subtle Moon & Stars Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-4 flex items-center justify-center gap-3"
      >
        <Star size={18} className="text-[#FFD700] fill-[#FFC107] animate-pulse" />
        <div className="p-3.5 rounded-full bg-[#151515] backdrop-blur-md shadow-lg border border-[#FFD700]/40 inline-block animate-soft-float">
          <LotusFlower size={42} variant="soft-pink" />
        </div>
        <Moon size={18} className="text-[#FFD700] fill-[#FFD700]/30" />
      </motion.div>

      {/* Main Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="font-display text-4xl sm:text-5xl text-[#FFD700] font-normal tracking-tight mb-8 drop-shadow-[0_2px_12px_rgba(255,215,0,0.3)]"
      >
        {mainHeading}
      </motion.h2>

      {/* Final Heartfelt Wishes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="space-y-5 max-w-sm"
      >
        <p className="font-sans-clean text-lg sm:text-xl text-[#FFF4B8] leading-relaxed font-light">
          {wishes}
        </p>

        <p className="font-display text-xl sm:text-2xl text-[#FFD700] font-normal italic">
          {keepSmiling}
        </p>

        <p className="font-sans-clean text-sm sm:text-base text-[#FFF4B8]/85 font-light pt-2">
          {bestWishesDistance}
        </p>
      </motion.div>

      {/* Interactive Make A Wish Button */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="my-10"
      >
        {!wishMade ? (
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={handleMakeWish}
              className="touch-manipulation min-h-[48px] min-w-[48px] px-7 py-3.5 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] text-[#080808] font-semibold text-base shadow-xl shadow-[#FFD700]/30 border border-[#FFF4B8]/60 animate-glow-breathe cursor-pointer flex items-center justify-center gap-2 mx-auto active:scale-95 transition-transform select-none [-webkit-tap-highlight-color:transparent]"
            >
              <Sparkles size={16} className="text-[#080808]" />
              <span>{makeAWishButton}</span>
              <Heart size={15} className="fill-[#080808] text-[#080808]" />
            </button>
            <ClickHereHint onClick={handleMakeWish} language={language} />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-5 rounded-2xl bg-[#151515] border border-[#FFD700]/50 shadow-xl shadow-[#FFD700]/20 max-w-xs mx-auto"
          >
            <p className="font-display text-lg text-[#FFD700] font-normal mb-1">
              {wishCelebratedTitle}
            </p>
            <p className="font-sans-clean text-xs text-[#FFF4B8] font-light">
              {wishCelebratedMessage}
            </p>
          </motion.div>
        )}
      </motion.div>

      {/* Made with care & Signature */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="space-y-3"
      >
        <p className="font-sans-clean text-xs uppercase tracking-widest text-[#FFD700] font-medium">
          {madeWithLove}
        </p>

        {/* Sender Signature */}
        <p className="font-script text-3xl sm:text-4xl text-[#FFD700] font-bold tracking-wide">
          {signature}
        </p>
      </motion.div>

      {/* Replay Button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="mt-12 flex flex-col items-center justify-center"
      >
        <button
          onClick={handleScrollToTop}
          className="touch-manipulation min-h-[44px] min-w-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#151515] hover:bg-[#1E1E1E] text-[#FFF4B8] text-sm font-sans-clean font-medium shadow-sm hover:shadow-md border border-[#FFD700]/40 active:scale-95 transition-all cursor-pointer select-none [-webkit-tap-highlight-color:transparent]"
        >
          <RotateCcw size={14} className="text-[#FFD700]" />
          <span>{replayButton}</span>
        </button>
        <ClickHereHint onClick={handleScrollToTop} language={language} />
      </motion.div>

      {/* Floating Sparkles Bottom */}
      <div className="flex items-center justify-center gap-3 mt-10 text-[#FFD700]">
        <Sparkles size={16} />
        <Heart size={14} className="fill-[#FFD700]" />
        <LotusFlower size={18} variant="soft-pink" />
        <Heart size={14} className="fill-[#FFD700]" />
        <Sparkles size={16} />
      </div>
    </footer>
  );
};
