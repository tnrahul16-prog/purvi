import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, Star } from 'lucide-react';
import { LotusFlower } from './LotusFlower';
import { ClickHereHint } from './ClickHereHint';

interface KeepsakeThoughtProps {
  title: string;
  teaser: string;
  openButtonText: string;
  lines: string[];
  finalQuote: string;
  language?: 'hi' | 'en';
}

export const KeepsakeThought: React.FC<KeepsakeThoughtProps> = ({
  title,
  teaser,
  openButtonText,
  lines,
  finalQuote,
  language = 'en',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Revealed line count: reveals in pairs (2 at a time) or can be incremented
  const [visibleCount, setVisibleCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // When user opens the thought, start revealing the first pair immediately
  const handleOpen = () => {
    setIsOpen(true);
    setVisibleCount(2);
  };

  // Timer to slowly reveal 1-2 lines at a time with a calm, peaceful cadence
  useEffect(() => {
    if (!isOpen || isFinished) return;

    if (visibleCount >= lines.length) {
      const timer = setTimeout(() => {
        setIsFinished(true);
      }, 900);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 2, lines.length));
    }, 2800);

    return () => clearTimeout(timer);
  }, [isOpen, visibleCount, lines.length, isFinished]);

  // Optional manual advance for Purvi if she wants to read the next lines immediately
  const handleAdvance = () => {
    if (visibleCount < lines.length) {
      setVisibleCount((prev) => Math.min(prev + 2, lines.length));
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85dvh] py-20 sm:py-28 px-4 max-w-xl mx-auto flex flex-col items-center justify-center text-center select-none overflow-hidden"
    >
      {/* 💛 Warm glowing ambient background aura */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
        <div
          className="w-80 sm:w-[32rem] h-80 sm:h-[32rem] rounded-full bg-gradient-to-tr from-[#FFD700]/15 via-[#FFC107]/10 to-transparent blur-3xl opacity-75 animate-pulse"
          style={{ animationDuration: '7s' }}
        />
      </div>

      {/* ✨ Slowly floating subtle golden petals and tiny stars */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Floating petal 1 */}
        <motion.div
          animate={{
            y: [-10, 25, -10],
            x: [-8, 12, -8],
            rotate: [0, 20, 0],
            opacity: [0.35, 0.65, 0.35],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-12 left-8 text-[#FFD700]/60"
        >
          <LotusFlower size={20} variant="soft-pink" />
        </motion.div>

        {/* Floating petal 2 */}
        <motion.div
          animate={{
            y: [15, -20, 15],
            x: [10, -10, 10],
            rotate: [15, -15, 15],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-24 right-10 text-[#FFC107]/50"
        >
          <LotusFlower size={18} variant="white" />
        </motion.div>

        {/* Floating petal 3 (bottom left) */}
        <motion.div
          animate={{
            y: [-15, 18, -15],
            x: [-6, 8, -6],
            rotate: [-10, 15, -10],
            opacity: [0.25, 0.55, 0.25],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute bottom-16 left-12 text-[#FFD700]/50"
        >
          <LotusFlower size={16} variant="soft-pink" />
        </motion.div>

        {/* Tiny twinkling star 1 */}
        <motion.div
          animate={{
            scale: [0.8, 1.25, 0.8],
            opacity: [0.3, 0.75, 0.3],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 right-16 text-[#FFD700]"
        >
          <Star className="w-3.5 h-3.5 fill-[#FFC107]" />
        </motion.div>

        {/* Tiny twinkling star 2 */}
        <motion.div
          animate={{
            scale: [1, 0.7, 1],
            opacity: [0.4, 0.85, 0.4],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-1/3 left-10 text-[#FFD700]/70"
        >
          <Star className="w-3 h-3 fill-[#FFD700]/50" />
        </motion.div>
      </div>

      {/* Subtle Lotus Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 mb-3"
      >
        <LotusFlower size={20} variant="soft-pink" />
        <span className="text-xs uppercase tracking-widest text-[#FFD700] font-medium font-sans-clean">
          {title}
        </span>
        <LotusFlower size={20} variant="soft-pink" />
      </motion.div>

      {/* Main Section Heading */}
      <motion.h3
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#FFD700] font-normal mb-6 tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]"
      >
        {title}
      </motion.h3>

      {/* Initial Teaser & Open Button (Before Opening) */}
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center max-w-md mx-auto"
          >
            {/* Soft nostalgic teaser */}
            <p className="text-lg sm:text-xl text-[#FFF4B8] font-serif italic mb-8 leading-relaxed px-4">
              "{teaser}"
            </p>

            {/* Glowing button to open this little thought */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpen}
              className="min-h-[48px] px-7 py-3 rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] text-[#080808] font-sans-clean text-sm sm:text-base font-semibold shadow-[0_8px_20px_rgba(255,215,0,0.35)] hover:shadow-[0_10px_25px_rgba(255,215,0,0.45)] border border-[#FFF4B8]/60 transition-all cursor-pointer flex items-center gap-2 touch-manipulation pointer-events-auto active:scale-95 [-webkit-tap-highlight-color:transparent]"
            >
              <span>{openButtonText}</span>
              <Heart className="w-4 h-4 fill-[#080808] text-[#080808]" />
            </motion.button>
            <ClickHereHint onClick={handleOpen} language={language} />
          </motion.div>
        ) : (
          /* Revealed Thought Card with Slow Progressive Lines */
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative rounded-3xl p-6 sm:p-10 text-start bg-[#151515] backdrop-blur-md border border-[#FFD700]/40 shadow-[0_15px_35px_rgba(255,215,0,0.15)]"
          >
            {/* Subtle corner lotus accents */}
            <div className="absolute top-4 right-4 text-[#FFD700]/40 pointer-events-none">
              <LotusFlower size={18} variant="soft-pink" />
            </div>
            <div className="absolute top-4 left-4 text-[#FFD700]/40 pointer-events-none">
              <LotusFlower size={18} variant="soft-pink" />
            </div>

            {/* Message lines container */}
            <div className="space-y-4 sm:space-y-5 text-[#FFF4B8] font-serif leading-relaxed text-base sm:text-lg">
              {lines.slice(0, visibleCount).map((line, idx) => (
                <motion.p
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.75, ease: 'easeOut' }}
                  className={`transition-colors ${
                    idx >= lines.length - 2
                      ? 'font-medium text-[#FFD700] text-lg sm:text-xl pt-2'
                      : 'text-[#FFF4B8]'
                  }`}
                >
                  {line}
                </motion.p>
              ))}
            </div>

            {/* Reading pace indicator while lines are unveiling */}
            {!isFinished && visibleCount < lines.length && (
              <div className="mt-8 flex items-center justify-between pt-4 border-t border-[#FFD700]/20 text-xs text-[#FFD700] font-sans-clean">
                <span className="flex items-center gap-1.5 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD700]" />
                  <span>...</span>
                </span>
                <button
                  onClick={handleAdvance}
                  className="min-h-[44px] px-3 py-1.5 rounded-full hover:bg-[#1E1E1E] text-[#FFD700] font-medium transition-colors cursor-pointer touch-manipulation active:scale-95"
                >
                  {visibleCount + 2 >= lines.length ? '💛' : '...'}
                </button>
              </div>
            )}

            {/* ✨ Final Effect: Glowing golden heart + Quote + Settling sparkles */}
            <AnimatePresence>
              {isFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="mt-10 pt-8 border-t border-[#FFD700]/25 flex flex-col items-center text-center"
                >
                  {/* Glowing golden heart surrounded by gentle settled sparkles */}
                  <div className="relative mb-5 flex items-center justify-center">
                    {/* Pulsing warm glow halo */}
                    <div className="absolute w-14 h-14 rounded-full bg-[#FFD700]/25 blur-md animate-pulse" />

                    {/* Surrounding tiny sparkles */}
                    <motion.div
                      animate={{
                        scale: [0.9, 1.15, 0.9],
                        rotate: [0, 45, 0],
                        opacity: [0.6, 0.9, 0.6],
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="absolute -top-2 -left-2 text-[#FFD700]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                    </motion.div>

                    <motion.div
                      animate={{
                        scale: [1, 0.85, 1],
                        rotate: [0, -30, 0],
                        opacity: [0.5, 0.85, 0.5],
                      }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                      className="absolute -bottom-1 -right-2 text-[#FFC107]"
                    >
                      <Sparkles className="w-3 h-3" />
                    </motion.div>

                    <motion.div
                      animate={{
                        scale: [0.85, 1.1, 0.85],
                        opacity: [0.4, 0.8, 0.4],
                      }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                      className="absolute top-0 -right-3 text-[#FFD700]"
                    >
                      <Star className="w-2.5 h-2.5 fill-[#FFC107]" />
                    </motion.div>

                    {/* Small glowing golden heart */}
                    <motion.div
                      animate={{
                        scale: [1, 1.08, 1],
                      }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                      className="relative z-10 w-10 h-10 rounded-full bg-[#080808] flex items-center justify-center shadow-[0_0_15px_rgba(255,215,0,0.45)] border border-[#FFD700]/50"
                    >
                      <Heart className="w-5 h-5 fill-[#FFD700] text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                    </motion.div>
                  </div>

                  {/* Final quote */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.9 }}
                    className="text-base sm:text-lg font-serif italic text-[#FFF4B8] leading-relaxed max-w-md px-2"
                  >
                    "{finalQuote}"
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
