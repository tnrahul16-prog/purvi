import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Heart, ArrowUp } from 'lucide-react';
import { LotusFlower } from './LotusFlower';
import { SafePhoto } from './SafePhoto';
import { ClickHereHint } from './ClickHereHint';

interface InteractiveCakeProps {
  birthdayImageUrl: string;
  introTransitionText?: string;
  introBuildUpText?: string;
  revealButtonText?: string;
  revealInstructionText?: string;
  traditionBadgeText?: string;
  wishPromptText?: string;
  wishButtonText?: string;
  tapCakeHintText?: string;
  wishingStatusText?: string;
  blowingCandlesText?: string;
  candleOutWishRevealedText?: string;
  candlesOutPromptText?: string;
  cutButtonText?: string;
  cuttingStatusText?: string;
  cutCakeTitleText?: string;
  yayTitleText?: string;
  postCutTitleText?: string;
  postCutSubtitleText?: string;
  scrollDownHintText?: string;
  happyBirthdayFallbackText?: string;
  onCakeCutCompleted: () => void;
  onMoodChange: (mood: 'normal' | 'emotional' | 'celebratory') => void;
  onAtmosphereChange: (isDarker: boolean) => void;
}

type CakePhase =
  | 'intro' // Build up text
  | 'revealed' // Cake visible, candles lit, prompt to make wish
  | 'wishing' // Candles flickering/blowing out
  | 'candles_out' // Prompt to cut cake
  | 'cutting' // Knife moving, cake slicing
  | 'cut_completed' // Slice separated, fireworks/confetti
  | 'birthday_reveal'; // happy-birthday-farha.png revealed

export const InteractiveCake: React.FC<InteractiveCakeProps> = ({
  birthdayImageUrl,
  introTransitionText = "Okay babyyy… enough emotional stuff for a moment, hahahaha! 👀",
  introBuildUpText = "There's still one very important thing missing…",
  revealButtonText = "Reveal It 🎂💛",
  revealInstructionText = "Click here 👆",
  traditionBadgeText = "Birthday Tradition",
  wishPromptText = "Make a Wish, Purvi...✨",
  wishButtonText = "Make Your Wish..💛",
  tapCakeHintText = "Tap the cake to blow out candles 🌬️",
  wishingStatusText = "Closing your eyes and making a wish…",
  blowingCandlesText = "Blowing out the candles… 🌬️",
  candleOutWishRevealedText = "May this year bring you endless happiness, my love. 💛",
  candlesOutPromptText = "Okay… now we cut the cake, babyyy! 🎂😭💛",
  cutButtonText = "Cut the Cake 💛",
  cuttingStatusText = "Cutting Purvi’s birthday slice… 🎂✨",
  cutCakeTitleText = "Cutting Purvi’s birthday cake… 💛",
  yayTitleText = "YAY! Happy Birthday, My Love! 🎉",
  postCutTitleText = "HAPPY BIRTHDAY, PURVI! 🎂💛❤️",
  postCutSubtitleText = "Okay… NOW it's officially your birthday... YAYYYY! 😌😂",
  scrollDownHintText = "Scroll down for your birthday letter 💌",
  happyBirthdayFallbackText = "Happy Birthday, Purvi!",
  onCakeCutCompleted,
  onMoodChange,
  onAtmosphereChange,
}) => {
  const [phase, setPhase] = useState<CakePhase>('intro');
  const [candlesLit, setCandlesLit] = useState<boolean>(true);
  const [candleBlowing, setCandleBlowing] = useState<boolean>(false);
  const [sliceSeparated, setSliceSeparated] = useState<boolean>(false);
  const [showKnife, setShowKnife] = useState<boolean>(false);

  // Trigger confetti burst
  const triggerConfetti = () => {
    try {
      // Elegant gold, yellow, white, and black confetti
      confetti({
        particleCount: 95,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFC107', '#FFF4B8', '#FFFFFF', '#E5B341'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 55,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#FFD700', '#FFC107', '#E5B341', '#080808'],
        });
        confetti({
          particleCount: 55,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#FFD700', '#FFC107', '#E5B341', '#080808'],
        });
      }, 300);
    } catch {
      // Confetti fallback
    }
  };

  // Step 1: Make a Wish & Blow out candles sequence
  const handleMakeWish = () => {
    setPhase('wishing');
    setCandleBlowing(true);

    // Sequence:
    // 1. Candles flicker and breeze passes (0 - 1.2s)
    setTimeout(() => {
      setCandlesLit(false);
      setCandleBlowing(false);
      setPhase('candles_out');
      onAtmosphereChange(false);
    }, 1200);
  };

  // Step 2: Cut the Cake Sequence
  const handleCutCake = () => {
    setPhase('cutting');
    setShowKnife(true);

    // Knife animates down (0.7s)
    setTimeout(() => {
      setSliceSeparated(true);
      setShowKnife(false);
      setPhase('cut_completed');
      triggerConfetti();
      onCakeCutCompleted();

      // Transition smoothly into Phase 6: Happy Birthday Image Reveal
      setTimeout(() => {
        setPhase('birthday_reveal');
      }, 1600);
    }, 1400);
  };

  return (
    <section className="relative min-h-[95dvh] flex flex-col items-center justify-center px-4 py-20 text-center max-w-xl mx-auto overflow-hidden">
      {/* ------------------------------------------------------------- */}
      {/* PHASE 1: BUILD UP TO CAKE (Emotional to Playful)              */}
      {/* ------------------------------------------------------------- */}
      {phase === 'intro' && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="my-16 space-y-6"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="font-display text-2xl sm:text-3xl text-[#FFD700] font-normal"
          >
            {introTransitionText}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="text-base sm:text-lg text-[#FFF4B8]/90 font-sans-clean"
          >
            {introBuildUpText}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
            className="pt-4 flex flex-col items-center"
          >
            <button
              onClick={() => setPhase('revealed')}
              className="touch-manipulation px-8 py-3.5 sm:px-9 sm:py-4 min-h-[48px] min-w-[48px] rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#E5B341] text-[#080808] font-bold text-base shadow-lg shadow-[#FFD700]/30 border border-[#FFF4B8]/60 animate-glow-breathe cursor-pointer flex items-center justify-center gap-2 mx-auto active:scale-95 select-none pointer-events-auto [-webkit-tap-highlight-color:transparent]"
            >
              <span>{revealButtonText}</span>
            </button>

            {/* Instruction text with arrow pointing up towards the Reveal It button */}
            <motion.button
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.3, duration: 0.6 }}
              onClick={() => setPhase('revealed')}
              aria-label={revealInstructionText}
              className="mt-3 min-h-[44px] px-4 py-2 rounded-full glass-pink-strong border border-[#FFD700]/40 flex items-center justify-center gap-1.5 text-[#FFD700] font-sans-clean text-xs sm:text-sm font-medium cursor-pointer touch-manipulation active:scale-95 transition-all hover:bg-[#1a1a1a] shadow-sm select-none pointer-events-auto [-webkit-tap-highlight-color:transparent]"
            >
              <ArrowUp className="w-4 h-4 text-[#FFD700] animate-bounce shrink-0" />
              <span className="tracking-wide">{revealInstructionText}</span>
              <ArrowUp className="w-4 h-4 text-[#FFD700] animate-bounce shrink-0" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE 2, 3, 4, 5: CAKE PRESENTATION & INTERACTIONS            */}
      {/* ------------------------------------------------------------- */}
      {phase !== 'intro' && phase !== 'birthday_reveal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center"
        >
          {/* Section Header */}
          <div className="mb-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center justify-center gap-2 mb-2 pointer-events-none select-none"
            >
              <LotusFlower size={22} variant="gold" />
              <span className="text-xs uppercase tracking-widest text-[#E5B341] font-medium font-sans-clean">
                {traditionBadgeText}
              </span>
              <LotusFlower size={22} variant="gold" />
            </motion.div>

            <h3 className="font-display text-3xl sm:text-4xl text-[#FFD700] font-normal">
              {phase === 'revealed' && wishPromptText}
              {phase === 'wishing' && blowingCandlesText}
              {phase === 'candles_out' && candlesOutPromptText}
              {phase === 'cutting' && cutCakeTitleText}
              {phase === 'cut_completed' && yayTitleText}
            </h3>
          </div>

          {/* Realistic-Stylized Birthday Cake Visual Container (Generous 270x270px+ Tap Target) */}
          <div
            role={phase === 'revealed' || phase === 'candles_out' ? 'button' : undefined}
            tabIndex={phase === 'revealed' || phase === 'candles_out' ? 0 : undefined}
            aria-label={
              phase === 'revealed'
                ? wishButtonText
                : phase === 'candles_out'
                ? cutButtonText
                : 'Birthday Cake'
            }
            onClick={() => {
              if (phase === 'revealed') handleMakeWish();
              else if (phase === 'candles_out') handleCutCake();
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (phase === 'revealed') handleMakeWish();
                else if (phase === 'candles_out') handleCutCake();
              }
            }}
            className={`relative w-[270px] xs:w-72 sm:w-80 h-[270px] xs:h-72 sm:h-80 max-w-[88vw] flex items-center justify-center my-3 sm:my-4 select-none touch-manipulation transition-transform duration-200 [-webkit-tap-highlight-color:transparent] ${
              phase === 'revealed' || phase === 'candles_out'
                ? 'cursor-pointer active:scale-[0.97] pointer-events-auto'
                : 'pointer-events-none'
            }`}
          >
            {/* Ambient cake glow */}
            <div
              className={`absolute inset-0 rounded-full transition-all duration-1000 blur-2xl pointer-events-none select-none ${
                candlesLit
                  ? 'bg-amber-300/35 shadow-[0_0_50px_rgba(251,191,36,0.3)]'
                  : 'bg-[#FFD700]/20'
              }`}
            />

            {/* SVG Interactive Cake Illustration */}
            <svg
              viewBox="0 0 320 320"
              className="w-full h-full drop-shadow-2xl overflow-visible pointer-events-none select-none"
            >
              <defs>
                {/* Cake tier gradients in yellow and black */}
                <linearGradient id="cake-plate-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF4B8" />
                  <stop offset="70%" stopColor="#E5B341" />
                  <stop offset="100%" stopColor="#8A6D1C" />
                </linearGradient>

                <linearGradient id="tier-bottom-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFF9C4" />
                  <stop offset="35%" stopColor="#FFD700" />
                  <stop offset="100%" stopColor="#FFC107" />
                </linearGradient>

                <linearGradient id="tier-top-grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="40%" stopColor="#FFF4B8" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>

                <linearGradient id="icing-drip" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="100%" stopColor="#FFF9C4" />
                </linearGradient>

                <linearGradient id="candle-stripes" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFD700" />
                  <stop offset="50%" stopColor="#151515" />
                  <stop offset="100%" stopColor="#FFD700" />
                </linearGradient>

                <linearGradient id="flame-grad" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#FFC107" />
                  <stop offset="40%" stopColor="#FFD700" />
                  <stop offset="80%" stopColor="#FFF4B8" />
                  <stop offset="100%" stopColor="#FFFFFF" />
                </linearGradient>
              </defs>

              {/* Cake Stand / Glass Plate */}
              <ellipse cx="160" cy="275" rx="140" ry="24" fill="url(#cake-plate-grad)" stroke="#E5B341" strokeWidth="2" />
              <ellipse cx="160" cy="272" rx="132" ry="20" fill="#FFFFFF" opacity="0.6" />
              <path d="M 125 275 Q 160 295 195 275 L 205 305 Q 160 315 115 305 Z" fill="url(#cake-plate-grad)" />

              {/* BOTTOM TIER */}
              <g id="bottom-tier">
                {/* Cylinder base */}
                <path d="M 45 205 C 45 235 275 235 275 205 L 275 250 C 275 278 45 278 45 250 Z" fill="url(#tier-bottom-grad)" />
                <ellipse cx="160" cy="205" rx="115" ry="26" fill="#FFE082" />

                {/* White Glossy Cream Drips */}
                <path
                  d="M 45 205 
                     Q 60 225 70 215 
                     Q 85 238 95 210 
                     Q 115 245 130 212 
                     Q 145 232 160 215 
                     Q 175 242 190 214 
                     Q 210 236 225 212 
                     Q 245 235 255 210 
                     Q 265 222 275 205 
                     C 275 190 45 190 45 205 Z"
                  fill="url(#icing-drip)"
                  opacity="0.95"
                />

                {/* Piped Cream Pearl Borders on Bottom Tier */}
                {[...Array(14)].map((_, i) => (
                  <circle key={`pearl-b-${i}`} cx={58 + i * 15.5} cy={250 + Math.sin((i / 13) * Math.PI) * 16} r="4.5" fill="#FFFFFF" opacity="0.9" />
                ))}

                {/* Small Lotus Flowers on Base Tier */}
                <g transform="translate(65, 230) scale(0.32)">
                  <LotusFlower variant="gold" />
                </g>
                <g transform="translate(230, 230) scale(0.32)">
                  <LotusFlower variant="gold" />
                </g>
              </g>

              {/* TOP TIER */}
              <g id="top-tier" className={`transition-transform duration-700 ${sliceSeparated ? 'translate-x-0' : ''}`}>
                {/* Cylinder top base */}
                <path d="M 85 145 C 85 170 235 170 235 145 L 235 195 C 235 220 85 220 85 195 Z" fill="url(#tier-top-grad)" />
                <ellipse cx="160" cy="145" rx="75" ry="18" fill="#FFF4B8" />

                {/* Top tier icing drips */}
                <path
                  d="M 85 145 
                     Q 100 162 110 150 
                     Q 125 170 140 152 
                     Q 160 174 175 152 
                     Q 195 168 210 150 
                     Q 225 162 235 145 
                     C 235 135 85 135 85 145 Z"
                  fill="#FFFFFF"
                />

                {/* “Purvi” Script written on the cake */}
                <text
                  x="160"
                  y="188"
                  textAnchor="middle"
                  fontFamily="'Dancing Script', cursive"
                  fontSize="23"
                  fontWeight="bold"
                  fill="#8A6D1C"
                  letterSpacing="1"
                  filter="drop-shadow(0 1px 1px rgba(255,255,255,0.8))"
                >
                  Purvi 💛
                </text>

                {/* Frosting pearls around top rim */}
                {[...Array(11)].map((_, i) => (
                  <circle key={`pearl-t-${i}`} cx={94 + i * 13} cy={145 + Math.sin((i / 10) * Math.PI) * 11} r="3.5" fill="#FFFFFF" />
                ))}

                {/* Sliced Piece Animation Effect */}
                {sliceSeparated && (
                  <motion.g
                    initial={{ x: 0, y: 0, opacity: 0.9 }}
                    animate={{ x: 26, y: -6, opacity: 1, rotate: 3 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {/* The cake wedge slice */}
                    <path
                      d="M 160 145 L 220 152 L 220 195 L 160 188 Z"
                      fill="#FFFDE7"
                      stroke="#FFD700"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M 160 145 L 195 138 L 220 152 Z"
                      fill="#FFE082"
                    />
                    {/* Golden sponge crumbs */}
                    <circle cx="180" cy="168" r="1.5" fill="#FFC107" />
                    <circle cx="192" cy="175" r="1.2" fill="#FFC107" />
                    <circle cx="205" cy="180" r="1.5" fill="#FFC107" />
                  </motion.g>
                )}
              </g>

              {/* THREE CANDLES */}
              {/* Left Candle */}
              <g id="candle-1">
                <rect x="122" y="98" width="7" height="42" rx="3.5" fill="url(#candle-stripes)" stroke="#FFD700" strokeWidth="0.5" />
                <line x1="125.5" y1="98" x2="125.5" y2="92" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
                {candlesLit && (
                  <g className={candleBlowing ? 'animate-flame-out' : 'animate-candle-flame'}>
                    <ellipse cx="125.5" cy="84" rx="4.5" ry="9" fill="url(#flame-grad)" />
                    <ellipse cx="125.5" cy="85" rx="2.5" ry="5.5" fill="#FFFFFF" opacity="0.9" />
                  </g>
                )}
              </g>

              {/* Center Main Candle */}
              <g id="candle-2">
                <rect x="156.5" y="92" width="7" height="48" rx="3.5" fill="url(#candle-stripes)" stroke="#FFD700" strokeWidth="0.5" />
                <line x1="160" y1="92" x2="160" y2="86" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
                {candlesLit && (
                  <g className={candleBlowing ? 'animate-flame-out' : 'animate-candle-flame'}>
                    <ellipse cx="160" cy="77" rx="5" ry="10" fill="url(#flame-grad)" />
                    <ellipse cx="160" cy="78" rx="3" ry="6" fill="#FFFFFF" opacity="0.9" />
                  </g>
                )}
              </g>

              {/* Right Candle */}
              <g id="candle-3">
                <rect x="191" y="98" width="7" height="42" rx="3.5" fill="url(#candle-stripes)" stroke="#FFD700" strokeWidth="0.5" />
                <line x1="194.5" y1="98" x2="194.5" y2="92" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
                {candlesLit && (
                  <g className={candleBlowing ? 'animate-flame-out' : 'animate-candle-flame'}>
                    <ellipse cx="194.5" cy="84" rx="4.5" ry="9" fill="url(#flame-grad)" />
                    <ellipse cx="194.5" cy="85" rx="2.5" ry="5.5" fill="#FFFFFF" opacity="0.9" />
                  </g>
                )}
              </g>

              {/* Real Animated Knife Cutting Effect */}
              {showKnife && (
                <motion.g
                  initial={{ x: 200, y: 70, rotate: 25, opacity: 0 }}
                  animate={{
                    x: [200, 160, 160],
                    y: [70, 115, 160],
                    rotate: [25, -10, -5],
                    opacity: [0, 1, 1],
                  }}
                  transition={{ duration: 1.4, times: [0, 0.4, 1], ease: 'easeInOut' }}
                >
                  {/* Knife Blade (Polished Gold) */}
                  <path
                    d="M 0 0 L 70 -5 Q 75 0 70 12 L 8 16 Z"
                    fill="url(#cake-plate-grad)"
                    stroke="#FFD700"
                    strokeWidth="1.5"
                    filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
                  />
                  {/* Knife Handle (Charcoal Black) */}
                  <rect x="-40" y="2" width="42" height="12" rx="4" fill="#151515" stroke="#FFD700" strokeWidth="1" />
                  <circle cx="-10" cy="8" r="2" fill="#FFD700" />
                  <circle cx="-30" cy="8" r="2" fill="#FFD700" />
                </motion.g>
              )}
            </svg>
          </div>

          {/* Tap cake hint when revealed */}
          {phase === 'revealed' && (
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={handleMakeWish}
              aria-label={tapCakeHintText}
              className="min-h-[44px] px-4 py-2 mt-2 rounded-full glass-pink-strong border border-[#FFD700]/50 text-xs sm:text-sm text-[#FFD700] font-sans-clean flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation pointer-events-auto active:scale-95 select-none [-webkit-tap-highlight-color:transparent] hover:bg-[#1f1f1f] transition-all shadow-sm"
            >
              <Sparkles size={14} className="text-[#FFD700] shrink-0 animate-pulse" />
              <span>{tapCakeHintText}</span>
              <Sparkles size={14} className="text-[#FFD700] shrink-0 animate-pulse" />
            </motion.button>
          )}

          {/* Tap cake hint when candles are out */}
          {phase === 'candles_out' && (
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleCutCake}
              aria-label={candlesOutPromptText}
              className="min-h-[44px] px-4 py-2 mt-2 rounded-full glass-pink-strong border border-[#FFD700]/70 text-xs sm:text-sm text-[#FFD700] font-sans-clean flex items-center justify-center gap-1.5 cursor-pointer touch-manipulation pointer-events-auto active:scale-95 select-none [-webkit-tap-highlight-color:transparent] hover:bg-[#1f1f1f] transition-all shadow-sm"
            >
              <Sparkles size={13} className="text-[#FFD700] shrink-0 animate-pulse" />
              <span>{candlesOutPromptText}</span>
              <Sparkles size={13} className="text-[#FFD700] shrink-0 animate-pulse" />
            </motion.button>
          )}

          {/* Action Buttons based on Phase */}
          <div className="mt-5 sm:mt-6 flex flex-col items-center w-full px-4">
            {phase === 'revealed' && (
              <div className="flex flex-col items-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMakeWish}
                  className="touch-manipulation px-8 py-3.5 sm:px-9 sm:py-4 min-h-[48px] min-w-[48px] rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#E5B341] text-[#080808] font-bold text-base sm:text-lg shadow-xl shadow-[#FFD700]/30 border border-[#FFF4B8]/60 animate-glow-breathe cursor-pointer flex items-center justify-center gap-2 active:scale-95 select-none pointer-events-auto [-webkit-tap-highlight-color:transparent]"
                >
                  <span>{wishButtonText}</span>
                  <Sparkles size={18} className="text-[#080808]" />
                </motion.button>
                <ClickHereHint onClick={handleMakeWish} text={revealInstructionText} />
              </div>
            )}

            {phase === 'wishing' && (
              <div className="text-[#FFD700] font-sans-clean flex items-center justify-center gap-2 text-base font-medium py-2 min-h-[44px] select-none pointer-events-none">
                <span className="animate-spin">🌟</span>
                <span>{wishingStatusText}</span>
              </div>
            )}

            {phase === 'candles_out' && (
              <div className="flex flex-col items-center space-y-4 sm:space-y-5 w-full">
                {/* Revealed Birthday Wish message */}
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="max-w-sm w-full p-4 rounded-2xl glass-pink-strong border border-[#FFD700]/60 shadow-lg shadow-[#FFD700]/20 text-center select-text"
                >
                  <div className="flex items-center justify-center gap-1.5 text-[#FFD700] mb-1 pointer-events-none">
                    <Sparkles size={14} />
                    <Heart size={14} className="fill-[#FFD700]" />
                    <Sparkles size={14} />
                  </div>
                  <p className="font-display text-base sm:text-xl text-[#FFD700] font-normal">
                    {candleOutWishRevealedText}
                  </p>
                </motion.div>

                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCutCake}
                  className="touch-manipulation px-8 py-3.5 sm:px-9 sm:py-4 min-h-[48px] min-w-[48px] rounded-full bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#E5B341] text-[#080808] font-bold text-base sm:text-lg shadow-xl shadow-[#FFD700]/35 border border-[#FFF4B8]/60 animate-glow-breathe cursor-pointer flex items-center justify-center gap-2.5 active:scale-95 select-none pointer-events-auto [-webkit-tap-highlight-color:transparent]"
                >
                  <span>{cutButtonText}</span>
                  <Heart size={18} className="fill-[#080808]" />
                </motion.button>
                <ClickHereHint onClick={handleCutCake} text={revealInstructionText} />
              </div>
            )}

            {phase === 'cutting' && (
              <div className="text-[#FFD700] font-sans-clean flex items-center justify-center gap-2 text-base font-medium animate-pulse py-2 min-h-[44px] select-none pointer-events-none">
                <span>{cuttingStatusText}</span>
              </div>
            )}

            {phase === 'cut_completed' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[#FFD700] font-display text-2xl font-bold py-2 min-h-[44px] flex items-center justify-center select-none pointer-events-none"
              >
                {yayTitleText}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* PHASE 6: THE BIG "HAPPY BIRTHDAY PURVI" REVEAL                */}
      {/* ------------------------------------------------------------- */}
      {phase === 'birthday_reveal' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full flex flex-col items-center my-6"
        >
          {/* Top Heading */}
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display text-3xl sm:text-5xl text-[#FFD700] font-normal tracking-tight mb-2 text-center"
          >
            {postCutTitleText}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-base sm:text-lg text-[#FFF4B8]/90 font-sans-clean mb-8 text-center"
          >
            {postCutSubtitleText}
          </motion.p>

          {/* The Big Birthday Image: happy-birthday-farha.png with glowing frame */}
          <motion.div
            initial={{ scale: 0.88, filter: 'blur(10px)' }}
            animate={{ scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="relative w-full max-w-sm sm:max-w-md my-4"
          >
            {/* Soft Ambient Radiance */}
            <div className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-[#FFD700]/30 via-[#FFC107]/25 to-[#E5B341]/30 blur-2xl pointer-events-none select-none" />

            <div className="relative p-3 rounded-3xl bg-[#151515]/95 backdrop-blur-2xl border-2 border-[#FFD700]/80 shadow-2xl shadow-[#FFD700]/25 overflow-hidden">
              <div className="rounded-2xl overflow-hidden bg-[#080808]">
                <SafePhoto
                  src={birthdayImageUrl}
                  alt="Happy Birthday Purvi"
                  fallbackSrc="/happy-birthday-farha.png"
                  fallbackTitle={happyBirthdayFallbackText}
                  fallbackSubtitle="Place your file at /public/landscapeimg.png or happy-birthday-farha.png"
                  aspectRatio="wide"
                  className="w-full h-auto object-cover rounded-2xl"
                />
              </div>

              {/* Decorative Corner Lotus Flowers */}
              <div className="absolute top-2 left-2 pointer-events-none select-none">
                <LotusFlower size={26} variant="gold" />
              </div>
              <div className="absolute top-2 right-2 pointer-events-none select-none">
                <LotusFlower size={26} variant="blush" />
              </div>
              <div className="absolute bottom-2 left-2 pointer-events-none select-none">
                <LotusFlower size={24} variant="blush" />
              </div>
              <div className="absolute bottom-2 right-2 pointer-events-none select-none">
                <LotusFlower size={24} variant="gold" />
              </div>
            </div>
          </motion.div>

          {/* Bottom celebration note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="text-xs uppercase tracking-widest text-[#E5B341] mt-6 font-medium flex items-center gap-2 font-sans-clean"
          >
            <span>{scrollDownHintText}</span>
            <Sparkles size={14} />
          </motion.p>
        </motion.div>
      )}
    </section>
  );
};
