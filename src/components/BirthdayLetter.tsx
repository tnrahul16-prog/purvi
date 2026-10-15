import React from 'react';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { LotusFlower } from './LotusFlower';

interface BirthdayLetterProps {
  title: string;
  salutation: string;
  paragraphs: string[];
  closingRemark: string;
  senderName: string;
  badge?: string;
  bffBadge?: string;
  birthdaySpecialTag?: string;
}

export const BirthdayLetter: React.FC<BirthdayLetterProps> = ({
  title,
  salutation,
  paragraphs,
  closingRemark,
  senderName,
  badge = 'A Letter For You',
  bffBadge = 'My Forever Person & Future Wife',
  birthdaySpecialTag = 'Birthday Special',
}) => {
  return (
    <section className="relative min-h-[85dvh] py-16 sm:py-24 px-4 max-w-lg mx-auto flex flex-col items-center justify-center">
      {/* Lotus Seal Accent */}
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

      {/* Header */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl text-[#FFD700] font-normal text-center mb-8 sm:mb-10 tracking-tight drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]"
      >
        {title}
      </motion.h3>

      {/* The Letter Parchment Card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ margin: '-30px', once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full rounded-3xl bg-[#151515] border border-[#FFD700]/40 p-6 sm:p-9 shadow-2xl shadow-[#FFD700]/15 overflow-hidden mobile-touch-pop select-text"
      >
        {/* Soft Decorative Watermark Lotus in Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
          <LotusFlower size={280} variant="soft-pink" />
        </div>

        {/* Vintage Postmark Stamp with RTL positioning */}
        <div className="absolute top-5 ltr:right-5 rtl:left-5 flex flex-col items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[#FFD700]/40 p-1 rotate-6 opacity-80 pointer-events-none text-center">
          <LotusFlower size={14} variant="soft-pink" />
          <span className="text-[9px] font-sans-clean text-[#FFD700] font-medium tracking-tight leading-none mt-0.5">
            {birthdaySpecialTag}
          </span>
        </div>

        {/* Letter Content */}
        <div className="relative z-10 space-y-4">
          <p className="font-handwriting text-3xl text-[#FFD700] font-bold">
            {salutation}
          </p>

          <div className="space-y-4 text-[#FFF4B8] font-sans-clean text-base sm:text-lg leading-relaxed font-light">
            {paragraphs.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-[#FFD700]/25 mt-6 space-y-4">
            <p className="font-handwriting text-2xl text-[#FFC107] font-semibold italic">
              {closingRemark}
            </p>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-1.5 text-[#FFD700]">
                <Heart size={16} className="fill-[#FFD700]" />
                <span className="text-xs uppercase tracking-widest text-[#FFD700]/90 font-sans-clean font-medium">
                  {bffBadge}
                </span>
              </div>

              <p className="font-script text-2xl text-[#FFD700] font-bold">
                — {senderName}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
