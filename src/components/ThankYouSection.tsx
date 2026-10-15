import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { ThankYouMessage } from '../types';
import { LotusFlower } from './LotusFlower';

interface ThankYouSectionProps {
  title: string;
  messages: ThankYouMessage[];
  highlightTitle: string;
  highlightText: string;
  badge?: string;
}

export const ThankYouSection: React.FC<ThankYouSectionProps> = ({
  title,
  messages,
  highlightTitle,
  highlightText,
  badge = 'To My Love & Future Wife',
}) => {
  return (
    <section className="relative min-h-[85dvh] py-16 sm:py-24 px-4 max-w-lg mx-auto flex flex-col items-center">
      {/* Header Lotus Motif */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 mb-3"
      >
        <LotusFlower size={24} variant="soft-pink" />
        <span className="text-xs uppercase tracking-widest text-[#FFD700] font-medium font-sans-clean">
          {badge}
        </span>
        <LotusFlower size={24} variant="soft-pink" />
      </motion.div>

      {/* Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl text-[#FFD700] font-normal text-center mb-10 sm:mb-14 tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]"
      >
        {title}
      </motion.h3>

      {/* Individual Message Cards */}
      <div className="w-full space-y-4 sm:space-y-5 mb-8 sm:mb-10">
        {messages.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ margin: '-30px', once: true, amount: 0.2 }}
            transition={{
              duration: 0.7,
              delay: 0.08 * index,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="p-4 sm:p-5 rounded-2xl bg-[#151515] border border-[#FFD700]/30 shadow-md shadow-[#FFD700]/10 relative overflow-hidden mobile-touch-pop select-text"
          >
            {/* Subtle left gradient accent */}
            <div className="flex items-start gap-3 sm:gap-3.5">
              <div className="mt-1 w-6 h-6 rounded-full bg-[#080808] border border-[#FFD700]/30 flex items-center justify-center shrink-0 text-[#FFD700]">
                <Heart size={13} className="fill-[#FFD700] text-[#FFD700]" />
              </div>
              <p className="font-sans-clean text-[#FFF4B8] text-sm sm:text-base leading-relaxed">
                {item.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Special Highlight Card: Most Importantly */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 24 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ margin: '-40px', once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full p-6 sm:p-7 rounded-3xl bg-[#151515] border border-[#FFD700]/60 shadow-2xl shadow-[#FFD700]/20 overflow-hidden text-center mobile-touch-pop select-text"
      >
        {/* Soft Ambient Radiance */}
        <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-[#FFD700]/20 via-[#FFC107]/20 to-[#FFD700]/20 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center">
          <div className="p-3 mb-3 rounded-full bg-[#080808] border border-[#FFD700]/40 shadow-sm animate-soft-float">
            <LotusFlower size={34} variant="soft-pink" />
          </div>

          <p className="text-xs uppercase tracking-widest text-[#FFD700] font-semibold mb-2 font-sans-clean">
            {highlightTitle}
          </p>

          <p className="font-display text-xl sm:text-2xl text-[#FFD700] font-normal leading-relaxed mb-4">
            {highlightText}
          </p>

          <div className="flex items-center justify-center gap-2 text-[#FFD700]">
            <Sparkles size={16} />
            <Heart size={16} className="fill-[#FFD700]" />
            <Sparkles size={16} />
          </div>
        </div>
      </motion.div>
    </section>
  );
};
