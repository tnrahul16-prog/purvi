import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Flower2 } from 'lucide-react';
import { LotusFlower } from './LotusFlower';
import { SafePhoto } from './SafePhoto';

interface ThirdPhotoLotusFrameProps {
  photoUrl: string;
  badge: string;
  title: string;
  subtitle: string;
  quote: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ThirdPhotoLotusFrame: React.FC<ThirdPhotoLotusFrameProps> = ({
  photoUrl,
  badge,
  title,
  subtitle,
  quote,
  fallbackTitle = 'Photo 3 (Lotus Grace)',
  fallbackSubtitle = 'Place your file at /public/photo3.png',
}) => {
  return (
    <section className="relative min-h-[90dvh] py-16 sm:py-24 px-4 flex flex-col items-center justify-center max-w-xl mx-auto overflow-hidden">
      {/* Dreamy Ambient Lotus Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] bg-gradient-to-tr from-[#FFD700]/20 via-[#FFC107]/15 to-[#080808]/40 blur-3xl pointer-events-none rounded-full" />

      {/* Decorative Floating Lotuses */}
      <div className="absolute top-10 left-4 sm:left-8 pointer-events-none opacity-60">
        <LotusFlower size={36} variant="blush" className="animate-soft-float" />
      </div>
      <div className="absolute bottom-12 right-4 sm:right-8 pointer-events-none opacity-50">
        <LotusFlower size={40} variant="gold" className="animate-soft-float" />
      </div>

      {/* Top Header Badge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 mb-4"
      >
        <LotusFlower size={20} variant="blush" />
        <span className="text-xs uppercase tracking-widest text-[#FFD700] font-medium font-sans-clean">
          {badge}
        </span>
        <LotusFlower size={20} variant="blush" />
      </motion.div>

      {/* Ornate Lotus Framed Portrait Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ margin: '-10% 0px -10% 0px', once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[88vw] sm:max-w-md my-4 mobile-touch-pop"
      >
        {/* Radiating Candlelight Glow Backdrop */}
        <motion.div
          animate={{
            opacity: [0.35, 0.65, 0.35],
            scale: [1, 1.03, 1],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-3 sm:-inset-4 rounded-[32px] bg-gradient-to-b from-[#FFD700]/25 via-[#FFC107]/20 to-[#E5B341]/20 blur-2xl pointer-events-none"
        />

        {/* Outer Frame with Gold Touches */}
        <div className="relative p-3 sm:p-4 rounded-[28px] bg-gradient-to-b from-[#151515] via-[#121212] to-[#080808] backdrop-blur-xl border border-[#FFD700]/40 shadow-2xl shadow-[#FFD700]/15 overflow-hidden">
          {/* Top Delicate Filigree Ornament */}
          <div className="flex items-center justify-center gap-2 py-1.5 mb-1 text-[#FFD700]">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#FFD700]/40" />
            <Flower2 size={16} className="text-[#FFD700]" />
            <LotusFlower size={20} variant="soft-pink" />
            <Flower2 size={16} className="text-[#FFD700]" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#FFD700]/40" />
          </div>

          {/* Photo Frame Container */}
          <div className="rounded-2xl overflow-hidden bg-[#080808] border border-[#FFD700]/30 shadow-inner">
            <SafePhoto
              src={photoUrl}
              alt="Purvi lotus garden portrait"
              fallbackTitle={fallbackTitle}
              fallbackSubtitle={fallbackSubtitle}
              aspectRatio="portrait"
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>

          {/* Bottom Card Footer Ornament & Quote */}
          <div className="pt-4 pb-2 px-2 text-center">
            <p className="font-handwriting text-2xl sm:text-3xl text-[#FFD700] font-bold tracking-wide">
              Purvi 🪷
            </p>
            <p className="font-sans-clean text-xs sm:text-sm text-[#FFF4B8] italic mt-1 leading-relaxed max-w-xs mx-auto">
              {quote}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Caption & Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2 }}
        className="mt-6 text-center space-y-2 px-2 max-w-md"
      >
        <h3 className="font-display text-3xl sm:text-4xl text-[#FFD700] font-normal tracking-tight flex items-center justify-center gap-2 drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]">
          <span>{title}</span>
          <Sparkles size={20} className="text-[#FFD700]" />
        </h3>
        <p className="text-base sm:text-lg text-[#FFF4B8] font-sans-clean font-light leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </section>
  );
};
