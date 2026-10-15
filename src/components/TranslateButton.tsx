import React from 'react';
import { motion } from 'motion/react';
import { Languages } from 'lucide-react';
import { Language } from '../translations';

interface TranslateButtonProps {
  currentLanguage: Language;
  onToggle: () => void;
  label: string;
  ariaLabel: string;
  className?: string;
}

export const TranslateButton: React.FC<TranslateButtonProps> = ({
  currentLanguage,
  onToggle,
  label,
  ariaLabel,
  className = '',
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileTap={{ scale: 0.94 }}
      onClick={onToggle}
      aria-label={ariaLabel}
      className={`fixed top-[max(0.6rem,env(safe-area-inset-top))] left-[max(0.6rem,env(safe-area-inset-left))] sm:top-4 sm:left-4 z-[70] flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2.5 min-h-[36px] sm:min-h-[44px] rounded-full glass-pink-strong border border-[#FFD700]/50 shadow-md sm:shadow-lg shadow-[#FFD700]/15 text-[#FFF4B8] hover:bg-[#1E1E1E] transition-all duration-300 backdrop-blur-xl group cursor-pointer select-none touch-manipulation active:scale-95 ${className}`}
    >
      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FFD700]/20 text-[#FFD700] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
        <Languages size={13} className="sm:w-[15px] sm:h-[15px]" />
      </div>

      {/* Compact on mobile, full label on desktop */}
      <span className="text-[11px] sm:text-sm font-medium tracking-tight whitespace-nowrap text-[#FFF4B8] group-hover:text-[#FFD700] font-sans-clean">
        <span className="sm:hidden">{currentLanguage === 'hi' ? 'EN' : 'हिन्दी'}</span>
        <span className="hidden sm:inline">{label}</span>
      </span>
    </motion.button>
  );
};
