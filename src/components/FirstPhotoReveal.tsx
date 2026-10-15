import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { LotusFlower } from './LotusFlower';
import { SafePhoto } from './SafePhoto';

interface FirstPhotoRevealProps {
  photoUrl: string;
  captionTitle: string;
  captionSubtitle: string;
  memoryBadge?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const FirstPhotoReveal: React.FC<FirstPhotoRevealProps> = ({
  photoUrl,
  captionTitle,
  captionSubtitle,
  memoryBadge = 'Memory',
  fallbackTitle = 'Photo 1 (Purvi)',
  fallbackSubtitle = 'Place your file at /public/photo1.png',
}) => {
  return (
    <section className="relative min-h-[90dvh] flex flex-col items-center justify-center px-4 py-16 sm:py-20 text-center max-w-xl mx-auto overflow-hidden">
      {/* Soft Background Petals floating in section */}
      <div className="absolute top-10 left-6 text-[#FFD700]/30 pointer-events-none">
        <LotusFlower size={38} variant="soft-pink" className="animate-soft-float" />
      </div>
      <div className="absolute bottom-16 right-6 text-[#FFC107]/30 pointer-events-none">
        <LotusFlower size={42} variant="blush" className="animate-soft-float" />
      </div>

      {/* Cinematic Reveal Container */}
      <motion.div
        initial={{ filter: 'blur(10px)', scale: 0.93, opacity: 0.3 }}
        whileInView={{ filter: 'blur(0px)', scale: 1, opacity: 1 }}
        viewport={{ margin: '-10% 0px -10% 0px', once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[86vw] sm:max-w-md my-4 sm:my-6"
      >
        {/* Soft Radiating Glow */}
        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -inset-3 sm:-inset-4 rounded-3xl bg-gradient-to-tr from-[#FFD700]/25 via-[#FFC107]/20 to-[#E5B341]/25 blur-xl pointer-events-none"
        />

        {/* Framing Card */}
        <div className="relative p-2.5 sm:p-3 rounded-3xl bg-[#151515]/90 backdrop-blur-xl border border-[#FFD700]/40 shadow-2xl shadow-[#FFD700]/15 overflow-hidden">
          <div className="rounded-2xl overflow-hidden bg-[#080808]">
            <SafePhoto
              src={photoUrl}
              alt="Purvi smiling"
              fallbackTitle={fallbackTitle}
              fallbackSubtitle={fallbackSubtitle}
              aspectRatio="portrait"
              priority={true}
              className="w-full h-auto object-cover rounded-2xl transition-transform duration-700"
            />
          </div>

          {/* Floating Accent Lotus with RTL support */}
          <div className="absolute top-3.5 ltr:left-3.5 rtl:right-3.5 sm:top-4 sm:ltr:left-4 sm:rtl:right-4 p-1.5 rounded-full bg-[#151515]/85 backdrop-blur-md shadow-sm border border-[#FFD700]/30">
            <LotusFlower size={20} variant="soft-pink" />
          </div>
          <div className="absolute top-3.5 ltr:right-3.5 rtl:left-3.5 sm:top-4 sm:ltr:right-4 sm:rtl:left-4 flex items-center gap-1 text-[#FFD700] bg-[#151515]/85 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-medium border border-[#FFD700]/30">
            <Heart size={12} className="fill-[#FFD700] text-[#FFD700]" />
            <span>{memoryBadge}</span>
          </div>
        </div>
      </motion.div>

      {/* Caption Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="mt-6 text-center space-y-2 px-2"
      >
        <h3 className="font-display text-3xl sm:text-4xl text-[#FFD700] font-normal tracking-tight flex items-center justify-center gap-2 drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]">
          <span>{captionTitle}</span>
          <Sparkles size={20} className="text-[#FFD700]" />
        </h3>
        <p className="text-base sm:text-lg text-[#FFF4B8] font-sans-clean font-light leading-relaxed">
          {captionSubtitle}
        </p>
      </motion.div>
    </section>
  );
};
