import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { LotusFlower } from './LotusFlower';
import { ClickHereHint } from './ClickHereHint';

interface PostVideoInterludeProps {
  language: 'hi' | 'en';
  onProceed: () => void;
}

export const PostVideoInterlude: React.FC<PostVideoInterludeProps> = ({
  language,
  onProceed,
}) => {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const isHi = language === 'hi';

  const handleEnter = () => {
    if (isFadingOut) return;
    setIsFadingOut(true);
    setTimeout(() => {
      onProceed();
    }, 900);
  };

  // Auto-transition after 4.2 seconds pause
  useEffect(() => {
    const timer = setTimeout(() => {
      handleEnter();
    }, 4200);

    return () => clearTimeout(timer);
  }, []);

  const interludeBadge = isHi ? '✨ खूबसूरत सफ़र की शुरुआत ✨' : '✨ The Journey Begins ✨';
  const interludeTitle = isHi ? 'और अब… आपकी असली सरप्राइज़ शुरू होती है 💛' : 'And now… your real surprise begins 💛';
  const interludeSubtitle = isHi
    ? 'तुम सिर्फ मेरी प्रेमिका ही नहीं, तुम मेरी हमसफ़र और होने वाली पत्नी हो… जिसके साथ मैं अपनी पूरी ज़िंदगी बिताना चाहता हूँ 💛'
    : 'You are not just the love of my life, you are my soulmate and future wife—the person I want to spend forever with 💛';
  const interludeButton = isHi ? 'अपनी वेबसाइट में प्रवेश करें 💛' : 'Enter Your Website 💛';

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          key="post-video-interlude"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, filter: 'blur(16px)', scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onClick={handleEnter}
          className="fixed inset-0 min-h-[100dvh] w-full z-40 flex flex-col items-center justify-center px-6 text-center bg-[#080808] text-[#FFF4B8] overflow-hidden select-none touch-manipulation cursor-pointer"
        >
          {/* Dreamy Warm Gold Ambient Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#FFD700]/15 via-[#151515] to-[#080808] pointer-events-none" />
          <div className="absolute w-80 sm:w-96 h-80 sm:h-96 rounded-full bg-[#FFD700]/15 blur-3xl pointer-events-none animate-pulse" />

          {/* Floating Lotus Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="mb-6 p-4 rounded-full bg-[#151515] border border-[#FFD700]/40 backdrop-blur-md shadow-xl shadow-[#FFD700]/20"
          >
            <LotusFlower size={48} variant="soft-pink" className="animate-soft-float" />
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/40 text-[#FFD700] text-xs font-medium tracking-wide mb-5"
          >
            <Sparkles size={13} className="text-[#FFD700]" />
            <span>{interludeBadge}</span>
            <Sparkles size={13} className="text-[#FFD700]" />
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.35 }}
            className="text-2xl sm:text-3xl md:text-4xl text-[#FFD700] font-normal tracking-tight mb-4 max-w-md font-display drop-shadow-[0_2px_12px_rgba(255,215,0,0.3)]"
          >
            {interludeTitle}
          </motion.h2>

          {/* Heartfelt Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.45 }}
            className="text-sm sm:text-base text-[#FFF4B8] font-light leading-relaxed max-w-sm mb-10 font-sans-clean"
          >
            {interludeSubtitle}
          </motion.p>

          {/* Enter Button / Tap to Proceed */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-3 pointer-events-auto"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEnter();
              }}
              className="touch-manipulation min-h-[48px] px-8 py-3.5 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] text-[#080808] font-semibold text-sm sm:text-base shadow-xl shadow-[#FFD700]/30 border border-[#FFF4B8]/60 animate-glow-breathe flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all select-none"
            >
              <Heart size={16} className="fill-[#080808] text-[#080808]" />
              <span>{interludeButton}</span>
              <ArrowRight size={16} />
            </button>
            <ClickHereHint onClick={handleEnter} language={language} darkBg={true} />
            <p className="text-[11px] text-[#FFF4B8]/60 font-light tracking-wide">
              {isHi ? 'स्वचालित रूप से आगे बढ़ रहा है… ✨' : 'Transitioning automatically… ✨'}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
