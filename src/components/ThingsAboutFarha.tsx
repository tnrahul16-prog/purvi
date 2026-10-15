import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, ChevronDown, ChevronUp } from 'lucide-react';
import { LotusFlower } from './LotusFlower';

interface LearnedItem {
  id: string;
  tag: string;
  teaser: string;
  reveal: string;
  emoji: string;
}

interface ThingsAboutFarhaProps {
  badge: string;
  title: string;
  tapHint: string;
  items: LearnedItem[];
}

export const ThingsAboutFarha: React.FC<ThingsAboutFarhaProps> = ({
  badge,
  title,
  tapHint,
  items,
}) => {
  // Automatically pop out / expand messages as they scroll into view
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => new Set());

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section className="relative min-h-[85dvh] py-20 sm:py-24 px-4 max-w-lg mx-auto flex flex-col items-center">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-[#FFD700]/15 via-[#FFC107]/10 to-transparent blur-3xl pointer-events-none" />

      {/* Lotus Badge Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 mb-3"
      >
        <LotusFlower size={22} variant="blush" />
        <span className="text-xs uppercase tracking-widest text-[#FFD700] font-medium font-sans-clean">
          {badge}
        </span>
        <LotusFlower size={22} variant="blush" />
      </motion.div>

      {/* Main Section Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl text-[#FFD700] font-normal text-center mb-3 tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]"
      >
        {title}
      </motion.h3>

      {/* Pop-Out Hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-xs text-[#FFF4B8]/80 font-sans-clean flex items-center justify-center gap-1.5 mb-8 text-center select-none"
      >
        <Sparkles size={13} className="text-[#FFD700]" />
        <span>{tapHint}</span>
        <Sparkles size={13} className="text-[#FFD700]" />
      </motion.p>

      {/* Interactive Cards Grid */}
      <div className="w-full space-y-4">
        {items.map((item, index) => {
          const isExpanded = expandedIds.has(item.id);
          const isHighlight = index === items.length - 1; // "Purvi deserves the best birthday"

          return (
            <motion.div
              key={item.id}
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              initial={{ opacity: 0, y: 32, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2, margin: '0px 0px -40px 0px' }}
              transition={{
                type: 'spring',
                stiffness: 220,
                damping: 22,
                mass: 0.8,
              }}
              whileHover={{ y: -2, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleExpand(item.id)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggleExpand(item.id);
                }
              }}
              className={`touch-manipulation select-none relative rounded-2xl cursor-pointer transition-all duration-300 overflow-hidden active:scale-[0.98] ${
                isHighlight
                  ? 'bg-[#151515] border border-[#FFD700] shadow-lg shadow-[#FFD700]/20 ring-1 ring-[#FFD700]/40'
                  : isExpanded
                  ? 'bg-[#151515] border border-[#FFD700]/60 shadow-md shadow-[#FFD700]/15'
                  : 'bg-[#151515]/80 border border-[#FFD700]/30 shadow-sm hover:shadow-md hover:border-[#FFD700]/50'
              }`}
            >
              {/* Card Header / Teaser */}
              <div className="p-5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 shadow-sm transition-transform duration-300 ${
                      isHighlight
                        ? 'bg-gradient-to-br from-[#FFD700] to-[#FFC107] text-[#080808]'
                        : isExpanded
                        ? 'bg-[#FFD700]/20 text-[#FFD700] scale-105 border border-[#FFD700]/40'
                        : 'bg-[#080808] border border-[#FFD700]/30 text-[#FFF4B8]'
                    }`}
                  >
                    <span>{item.emoji}</span>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-semibold text-[#FFD700] font-sans-clean block">
                      {item.tag}
                    </span>
                    <h4 className="font-display text-lg sm:text-xl text-[#FFF4B8] font-normal mt-0.5">
                      {item.teaser}
                    </h4>
                  </div>
                </div>

                <div className="shrink-0 text-[#FFD700]">
                  {isExpanded ? <ChevronUp size={20} className="text-[#FFD700]" /> : <ChevronDown size={20} />}
                </div>
              </div>

              {/* Expandable Reveal Body */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, scale: 0.95 }}
                    animate={{ height: 'auto', opacity: 1, scale: 1 }}
                    exit={{ height: 0, opacity: 0, scale: 0.95 }}
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 24,
                      mass: 0.8,
                    }}
                    className="overflow-hidden border-t border-[#FFD700]/30 bg-[#080808]/70 backdrop-blur-sm"
                  >
                    <motion.div
                      initial={{ y: 8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.08, duration: 0.35 }}
                      className="p-5 pt-4"
                    >
                      <p className="font-sans-clean text-base text-[#FFF4B8] leading-relaxed font-normal">
                        {item.reveal}
                      </p>
                      {item.id === 'tl-1' && (
                        <div className="mt-3.5 pt-3 border-t border-[#FFD700]/20 flex flex-wrap items-center gap-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFD700]/15 text-[#FFD700] border border-[#FFD700]/40 shadow-xs">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#FFD700] ring-1 ring-[#FFC107]" />
                            1. Yellow & Gold 💛
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-950/60 text-purple-200 border border-purple-500/40 shadow-xs">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-400 ring-1 ring-purple-300" />
                            2. Purple 💜
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-sky-950/60 text-sky-200 border border-sky-500/40 shadow-xs">
                            <span className="w-2.5 h-2.5 rounded-full bg-sky-400 ring-1 ring-sky-300" />
                            3. Blue 💙
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-950/60 text-emerald-200 border border-emerald-500/40 shadow-xs">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-1 ring-emerald-300" />
                            4. Green 💚
                          </span>
                        </div>
                      )}
                      <div className="mt-3 flex items-center justify-end gap-1.5 text-[#FFD700] text-xs">
                        <Heart size={12} className="fill-[#FFD700] text-[#FFD700] animate-pulse" />
                        <span className="font-medium text-[11px] tracking-wide">Purvi Special</span>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
