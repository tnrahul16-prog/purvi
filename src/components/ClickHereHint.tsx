import React from 'react';
import { motion } from 'motion/react';
import { ArrowUp } from 'lucide-react';

interface ClickHereHintProps {
  onClick?: () => void;
  language?: 'hi' | 'en';
  text?: string;
  className?: string;
  delay?: number;
  darkBg?: boolean;
}

export const ClickHereHint: React.FC<ClickHereHintProps> = ({
  onClick,
  language = 'en',
  text,
  className = '',
  delay = 0.2,
  darkBg = false,
}) => {
  const isHi = language === 'hi';
  const defaultText = isHi ? 'यहाँ क्लिक करें ⬆' : 'Click here ⬆';
  const label = text || defaultText;

  const content = (
    <>
      <ArrowUp className="w-3.5 h-3.5 shrink-0 animate-bounce text-[#FFD700]" />
      <span className="tracking-wide font-medium">{label}</span>
      <ArrowUp className="w-3.5 h-3.5 shrink-0 animate-bounce text-[#FFD700]" />
    </>
  );

  if (onClick) {
    return (
      <motion.button
        type="button"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        aria-label={label}
        className={`mt-2.5 min-h-[38px] px-3.5 py-1.5 rounded-full flex items-center justify-center gap-1.5 text-xs sm:text-sm font-sans-clean cursor-pointer touch-manipulation active:scale-95 transition-all shadow-sm select-none pointer-events-auto [-webkit-tap-highlight-color:transparent] ${
          darkBg
            ? 'bg-[#151515] border border-[#FFD700]/50 text-[#FFF4B8] hover:bg-[#1E1E1E] backdrop-blur-md'
            : 'bg-[#151515]/90 border border-[#FFD700]/40 text-[#FFF4B8] hover:bg-[#1E1E1E]'
        } ${className}`}
      >
        {content}
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={`mt-2.5 flex items-center justify-center gap-1.5 text-xs sm:text-sm font-sans-clean select-none pointer-events-none text-[#FFD700] ${className}`}
    >
      {content}
    </motion.div>
  );
};
