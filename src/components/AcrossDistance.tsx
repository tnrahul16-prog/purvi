import React from 'react';
import { motion } from 'motion/react';
import { Plane, Heart, Sparkles, MapPin } from 'lucide-react';
import { LotusFlower } from './LotusFlower';

interface AcrossDistanceProps {
  badge: string;
  title: string;
  indiaLabel: string;
  egyptLabel: string;
  milesApart: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  note: string;
}

export const AcrossDistance: React.FC<AcrossDistanceProps> = ({
  badge,
  title,
  indiaLabel,
  egyptLabel,
  milesApart,
  line1,
  line2,
  line3,
  line4,
  note,
}) => {
  return (
    <section className="relative min-h-[85dvh] py-20 sm:py-24 px-4 max-w-lg mx-auto flex flex-col items-center justify-center text-center">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#FFD700]/15 blur-3xl pointer-events-none" />

      {/* Lotus Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
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
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl text-[#FFD700] font-normal mb-8 sm:mb-10 tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]"
      >
        {title}
      </motion.h3>

      {/* Visual Map Connection Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full p-5 sm:p-8 rounded-3xl bg-[#151515] border border-[#FFD700]/40 shadow-2xl shadow-[#FFD700]/15 mb-8 sm:mb-10 mobile-touch-pop"
      >
        {/* India to Destination Interactive Graphic */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 mb-6">
          {/* India Node */}
          <div className="flex flex-col items-center shrink-0">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#080808] shadow-md border border-[#FFD700]/40 flex items-center justify-center text-xl sm:text-2xl"
            >
              🌴
            </motion.div>
            <span className="font-display text-sm sm:text-base font-medium text-[#FFD700] mt-2 text-center max-w-[130px] sm:max-w-[160px] leading-tight">
              {indiaLabel}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#FFF4B8]/80 font-sans-clean uppercase tracking-wider font-semibold">
              Rahul 💛
            </span>
          </div>

          {/* Curved Flight Path & Distance */}
          <div className="flex-1 min-w-0 relative flex flex-col items-center px-1 sm:px-2">
            {/* Animated dashed curve line */}
            <div className="w-full relative h-12 flex items-center justify-center">
              <svg className="w-full h-12 overflow-visible" viewBox="0 0 200 50">
                <path
                  d="M 10 35 Q 100 5 190 35"
                  fill="transparent"
                  stroke="#FFD700"
                  strokeWidth="2.5"
                  strokeDasharray="6 6"
                  className="opacity-80"
                />
              </svg>

              {/* Floating Plane on the path */}
              <motion.div
                animate={{
                  x: [-30, 30, -30],
                  y: [-6, -14, -6],
                  rotate: [10, -5, 10],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute text-[#080808] bg-[#FFD700] p-1.5 rounded-full shadow-md border border-[#FFF4B8]"
              >
                <Plane size={14} className="fill-[#080808] text-[#080808]" />
              </motion.div>
            </div>

            {/* Distance Pill */}
            <div className="px-2.5 sm:px-3 py-1 rounded-full bg-[#080808] border border-[#FFD700]/40 text-[#FFD700] text-[11px] sm:text-xs font-semibold font-sans-clean mt-1 shadow-sm whitespace-nowrap">
              {milesApart}
            </div>
          </div>

          {/* Destination Node */}
          <div className="flex flex-col items-center shrink-0">
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#080808] shadow-md border border-[#FFD700]/40 flex items-center justify-center text-xl sm:text-2xl"
            >
              🌸
            </motion.div>
            <span className="font-display text-sm sm:text-base font-medium text-[#FFD700] mt-2 text-center max-w-[130px] sm:max-w-[160px] leading-tight">
              {egyptLabel}
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#FFD700] font-sans-clean uppercase tracking-wider font-semibold">
              Purvi 💛
            </span>
          </div>
        </div>

        {/* Story Text Lines */}
        <div className="space-y-3 pt-4 border-t border-[#FFD700]/25 text-center">
          <p className="font-sans-clean text-[#FFF4B8] text-base font-light">
            {line1}
          </p>
          <p className="font-sans-clean text-[#FFF4B8] text-base font-light">
            {line2}
          </p>
          <p className="font-display text-lg sm:text-xl text-[#FFD700] font-normal">
            {line3}
          </p>
          <p className="font-sans-clean text-[#FFF4B8]/90 text-sm sm:text-base font-light leading-relaxed pt-2">
            {line4}
          </p>
        </div>

        {/* Bottom Note */}
        <div className="mt-5 pt-3 border-t border-[#FFD700]/20 flex items-center justify-center gap-1.5 text-xs text-[#FFD700] font-medium">
          <Heart size={13} className="fill-[#FFD700]" />
          <span>{note}</span>
          <Heart size={13} className="fill-[#FFD700]" />
        </div>
      </motion.div>
    </section>
  );
};
