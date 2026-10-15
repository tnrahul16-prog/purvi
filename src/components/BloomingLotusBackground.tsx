import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface BloomingLotusBackgroundProps {
  className?: string;
}

export const BloomingLotusBackground: React.FC<BloomingLotusBackgroundProps> = ({
  className = '',
}) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mq.matches);

      const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  // Smooth natural blossoming bezier curve
  const bloomEase = [0.22, 1, 0.36, 1] as const;

  return (
    <div
      aria-hidden="true"
      className={`relative w-full h-full flex items-center justify-center pointer-events-none select-none ${className}`}
    >
      {/* Ambient Breathing Container for the Fully Bloomed Lotus */}
      <motion.div
        animate={
          prefersReducedMotion
            ? {}
            : {
                scale: [1, 1.025, 1],
                y: [0, -3, 0],
              }
        }
        transition={{
          duration: 7.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 5.5,
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <svg
          viewBox="0 0 400 320"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-w-full max-h-full overflow-visible drop-shadow-[0_8px_30px_rgba(255,215,0,0.22)]"
        >
          <defs>
            {/* Extremely Subtle Ambient Light Halo */}
            <radialGradient id="lotus-ambient-halo" cx="50%" cy="55%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.25" />
              <stop offset="45%" stopColor="#FFC107" stopOpacity="0.12" />
              <stop offset="75%" stopColor="#FFF4B8" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#080808" stopOpacity="0" />
            </radialGradient>

            {/* Water / Pond Base Ripple Glow */}
            <radialGradient id="lotus-base-water" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#E5B341" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#151515" stopOpacity="0" />
            </radialGradient>

            {/* Outermost / Base Sepals Gradient (Golden Amber to Soft Golden Yellow) */}
            <linearGradient id="lotus-petal-outer-l" x1="60" y1="240" x2="160" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E5B341" stopOpacity="0.90" />
              <stop offset="35%" stopColor="#FFC107" stopOpacity="0.93" />
              <stop offset="75%" stopColor="#FFD700" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#FFF4B8" stopOpacity="0.98" />
            </linearGradient>

            <linearGradient id="lotus-petal-outer-r" x1="340" y1="240" x2="240" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E5B341" stopOpacity="0.90" />
              <stop offset="35%" stopColor="#FFC107" stopOpacity="0.93" />
              <stop offset="75%" stopColor="#FFD700" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#FFF4B8" stopOpacity="0.98" />
            </linearGradient>

            {/* Mid Tier Petals (Luminous Gold to Pearlescent White) */}
            <linearGradient id="lotus-petal-mid-l" x1="100" y1="240" x2="180" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFC107" stopOpacity="0.88" />
              <stop offset="40%" stopColor="#FFD700" stopOpacity="0.92" />
              <stop offset="80%" stopColor="#FFF4B8" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.98" />
            </linearGradient>

            <linearGradient id="lotus-petal-mid-r" x1="300" y1="240" x2="220" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFC107" stopOpacity="0.88" />
              <stop offset="40%" stopColor="#FFD700" stopOpacity="0.92" />
              <stop offset="80%" stopColor="#FFF4B8" stopOpacity="0.96" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.98" />
            </linearGradient>

            {/* Inner Tier Petals (Tender Yellow to Pure Ivory) */}
            <linearGradient id="lotus-petal-inner" x1="200" y1="240" x2="200" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.90" />
              <stop offset="40%" stopColor="#FFE082" stopOpacity="0.94" />
              <stop offset="80%" stopColor="#FFF4B8" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.99" />
            </linearGradient>

            {/* Front Cupping Petals (Softest Satin Gold) */}
            <linearGradient id="lotus-petal-front" x1="200" y1="240" x2="200" y2="160" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E5B341" stopOpacity="0.92" />
              <stop offset="45%" stopColor="#FFD700" stopOpacity="0.95" />
              <stop offset="85%" stopColor="#FFF4B8" stopOpacity="0.98" />
              <stop offset="100%" stopColor="#FFFFFF" />
            </linearGradient>

            {/* Golden Heart / Stamens Receptacle Gradient */}
            <radialGradient id="lotus-gold-core" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="45%" stopColor="#FDE047" />
              <stop offset="80%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </radialGradient>

            {/* Golden Pollen Glow Filter */}
            <filter id="golden-subtle-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ─────────────────────────────────────────────────────────────
              LAYER 0: Very Subtle Soft Glow Halo & Floating Water Ripple
             ───────────────────────────────────────────────────────────── */}
          <motion.circle
            cx="200"
            cy="175"
            r="125"
            fill="url(#lotus-ambient-halo)"
            initial={prefersReducedMotion ? { opacity: 0.6, scale: 1 } : { opacity: 0.15, scale: 0.55 }}
            animate={{ opacity: 0.65, scale: 1.12 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 4.8,
              delay: prefersReducedMotion ? 0 : 0.8,
              ease: bloomEase,
            }}
          />

          <motion.ellipse
            cx="200"
            cy="245"
            rx="85"
            ry="12"
            fill="url(#lotus-base-water)"
            initial={prefersReducedMotion ? { opacity: 0.7, scaleX: 1 } : { opacity: 0.2, scaleX: 0.4 }}
            animate={{ opacity: 0.75, scaleX: 1.05 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 4.5,
              delay: prefersReducedMotion ? 0 : 0.5,
              ease: bloomEase,
            }}
          />

          {/* ─────────────────────────────────────────────────────────────
              LAYER 1: OUTERMOST BASE PETALS / SEPALS (Opens First: 0.8s - 3.8s)
              Starts hugging bud tightly, then slowly spreads wide like open wings
             ───────────────────────────────────────────────────────────── */}
          {/* Outermost Left Low Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, scaleY: 1, opacity: 0.95 }
                : { rotate: 48, scaleX: 0.32, scaleY: 0.82, opacity: 0.55 }
            }
            animate={{ rotate: 0, scaleX: 1, scaleY: 1, opacity: 0.95 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.4,
              delay: prefersReducedMotion ? 0 : 0.8,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 130 238 55 218 62 184 C 94 204 158 228 200 240 Z"
              fill="url(#lotus-petal-outer-l)"
            />
            {/* Subtle delicate vein */}
            <path
              d="M 200 240 Q 130 220 78 190"
              stroke="#FFF0F5"
              strokeWidth="0.8"
              strokeOpacity="0.4"
              fill="none"
            />
          </motion.g>

          {/* Outermost Right Low Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, scaleY: 1, opacity: 0.95 }
                : { rotate: -48, scaleX: 0.32, scaleY: 0.82, opacity: 0.55 }
            }
            animate={{ rotate: 0, scaleX: 1, scaleY: 1, opacity: 0.95 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.4,
              delay: prefersReducedMotion ? 0 : 0.8,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 270 238 345 218 338 184 C 306 204 242 228 200 240 Z"
              fill="url(#lotus-petal-outer-r)"
            />
            <path
              d="M 200 240 Q 270 220 322 190"
              stroke="#FFF0F5"
              strokeWidth="0.8"
              strokeOpacity="0.4"
              fill="none"
            />
          </motion.g>

          {/* Low Base Left Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, scaleY: 1, opacity: 0.9 }
                : { rotate: 38, scaleX: 0.36, scaleY: 0.85, opacity: 0.5 }
            }
            animate={{ rotate: 0, scaleX: 1, scaleY: 1, opacity: 0.9 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.3,
              delay: prefersReducedMotion ? 0 : 1.1,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 145 244 85 234 80 214 C 110 226 165 238 200 240 Z"
              fill="url(#lotus-petal-outer-l)"
              opacity="0.85"
            />
          </motion.g>

          {/* Low Base Right Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, scaleY: 1, opacity: 0.9 }
                : { rotate: -38, scaleX: 0.36, scaleY: 0.85, opacity: 0.5 }
            }
            animate={{ rotate: 0, scaleX: 1, scaleY: 1, opacity: 0.9 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.3,
              delay: prefersReducedMotion ? 0 : 1.1,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 255 244 315 234 320 214 C 290 226 235 238 200 240 Z"
              fill="url(#lotus-petal-outer-r)"
              opacity="0.85"
            />
          </motion.g>

          {/* ─────────────────────────────────────────────────────────────
              LAYER 2: MID-TIER PETALS (Opens Second: 1.8s - 4.6s)
              Spreads outward at medium elevation, filling the flower volume
             ───────────────────────────────────────────────────────────── */}
          {/* Mid Outer-Left Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 }
                : { rotate: 30, scaleX: 0.42, scaleY: 0.9, opacity: 0.65 }
            }
            animate={{ rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.5,
              delay: prefersReducedMotion ? 0 : 1.7,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 142 225 78 194 98 144 C 134 178 174 218 200 240 Z"
              fill="url(#lotus-petal-mid-l)"
            />
            <path
              d="M 200 240 Q 140 195 110 155"
              stroke="#FFFFFF"
              strokeWidth="0.9"
              strokeOpacity="0.5"
              fill="none"
            />
          </motion.g>

          {/* Mid Outer-Right Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 }
                : { rotate: -30, scaleX: 0.42, scaleY: 0.9, opacity: 0.65 }
            }
            animate={{ rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.5,
              delay: prefersReducedMotion ? 0 : 1.7,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 258 225 322 194 302 144 C 266 178 226 218 200 240 Z"
              fill="url(#lotus-petal-mid-r)"
            />
            <path
              d="M 200 240 Q 260 195 290 155"
              stroke="#FFFFFF"
              strokeWidth="0.9"
              strokeOpacity="0.5"
              fill="none"
            />
          </motion.g>

          {/* Mid Intermediate-Left Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 }
                : { rotate: 20, scaleX: 0.5, opacity: 0.7 }
            }
            animate={{ rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.4,
              delay: prefersReducedMotion ? 0 : 2.1,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 158 214 114 164 134 110 C 164 148 184 204 200 240 Z"
              fill="url(#lotus-petal-mid-l)"
            />
          </motion.g>

          {/* Mid Intermediate-Right Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 }
                : { rotate: -20, scaleX: 0.5, opacity: 0.7 }
            }
            animate={{ rotate: 0, scaleX: 1, scaleY: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.4,
              delay: prefersReducedMotion ? 0 : 2.1,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 242 214 286 164 266 110 C 236 148 216 204 200 240 Z"
              fill="url(#lotus-petal-mid-r)"
            />
          </motion.g>

          {/* ─────────────────────────────────────────────────────────────
              LAYER 3: INNER PETALS (Opens Third: 2.6s - 5.4s)
              Delicately cups around the golden heart
             ───────────────────────────────────────────────────────────── */}
          {/* Inner Left Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, opacity: 1 }
                : { rotate: 12, scaleX: 0.65, opacity: 0.8 }
            }
            animate={{ rotate: 0, scaleX: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.2,
              delay: prefersReducedMotion ? 0 : 2.6,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 172 204 142 144 164 88 C 188 134 196 194 200 240 Z"
              fill="url(#lotus-petal-inner)"
            />
            <path
              d="M 200 240 Q 176 170 170 110"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeOpacity="0.6"
              fill="none"
            />
          </motion.g>

          {/* Inner Right Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleX: 1, opacity: 1 }
                : { rotate: -12, scaleX: 0.65, opacity: 0.8 }
            }
            animate={{ rotate: 0, scaleX: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.2,
              delay: prefersReducedMotion ? 0 : 2.6,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 228 204 258 144 236 88 C 212 134 204 194 200 240 Z"
              fill="url(#lotus-petal-inner)"
            />
            <path
              d="M 200 240 Q 224 170 230 110"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              strokeOpacity="0.6"
              fill="none"
            />
          </motion.g>

          {/* Central Tall Petal (The Crown Petal) */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { scaleX: 1, scaleY: 1, opacity: 1 }
                : { scaleX: 0.6, scaleY: 0.92, opacity: 0.85 }
            }
            animate={{ scaleX: 1, scaleY: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.6,
              delay: prefersReducedMotion ? 0 : 2.4,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 180 200 174 130 200 74 C 226 130 220 200 200 240 Z"
              fill="url(#lotus-petal-inner)"
            />
            <path
              d="M 200 240 L 200 86"
              stroke="#FFFFFF"
              strokeWidth="1.1"
              strokeOpacity="0.7"
              fill="none"
            />
          </motion.g>

          {/* ─────────────────────────────────────────────────────────────
              LAYER 4: THE GOLDEN HEART & STAMENS (Revealed: 3.2s - 5.8s)
              Warm glowing receptacle with sunlit carpels & stamens
             ───────────────────────────────────────────────────────────── */}
          <motion.g
            style={{ transformOrigin: '200px 212px' }}
            initial={
              prefersReducedMotion
                ? { scale: 1, opacity: 1 }
                : { scale: 0.15, opacity: 0 }
            }
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 2.8,
              delay: prefersReducedMotion ? 0 : 3.2,
              ease: bloomEase,
            }}
          >
            {/* Receptacle Dome */}
            <ellipse cx="200" cy="214" rx="22" ry="12" fill="url(#lotus-gold-core)" />
            <ellipse cx="200" cy="213" rx="16" ry="8" fill="#FEF08A" opacity="0.8" />

            {/* Seed pores / carpels on top of receptacle */}
            <circle cx="200" cy="212" r="2.2" fill="#D97706" opacity="0.9" />
            <circle cx="193" cy="211" r="1.8" fill="#D97706" opacity="0.85" />
            <circle cx="207" cy="211" r="1.8" fill="#D97706" opacity="0.85" />
            <circle cx="187" cy="214" r="1.5" fill="#D97706" opacity="0.75" />
            <circle cx="213" cy="214" r="1.5" fill="#D97706" opacity="0.75" />
            <circle cx="196" cy="216" r="1.5" fill="#D97706" opacity="0.75" />
            <circle cx="204" cy="216" r="1.5" fill="#D97706" opacity="0.75" />

            {/* Radiant Golden Stamens with Pollen Tips */}
            <g stroke="#FDE047" strokeWidth="1" strokeLinecap="round" opacity="0.95" filter="url(#golden-subtle-glow)">
              <line x1="184" y1="210" x2="178" y2="202" />
              <line x1="188" y1="207" x2="184" y2="198" />
              <line x1="193" y1="205" x2="191" y2="195" />
              <line x1="198" y1="204" x2="197" y2="194" />
              <line x1="202" y1="204" x2="203" y2="194" />
              <line x1="207" y1="205" x2="209" y2="195" />
              <line x1="212" y1="207" x2="216" y2="198" />
              <line x1="216" y1="210" x2="222" y2="202" />
            </g>
            {/* Pollen heads */}
            <circle cx="178" cy="202" r="1.6" fill="#FEF08A" />
            <circle cx="184" cy="198" r="1.6" fill="#FEF08A" />
            <circle cx="191" cy="195" r="1.7" fill="#FEF08A" />
            <circle cx="197" cy="194" r="1.8" fill="#FEF08A" />
            <circle cx="203" cy="194" r="1.8" fill="#FEF08A" />
            <circle cx="209" cy="195" r="1.7" fill="#FEF08A" />
            <circle cx="216" cy="198" r="1.6" fill="#FEF08A" />
            <circle cx="222" cy="202" r="1.6" fill="#FEF08A" />
          </motion.g>

          {/* ─────────────────────────────────────────────────────────────
              LAYER 5: FOREGROUND CUPPING PETALS (Relaxes: 2.8s - 5.6s)
              Front petals that cup the base and open down slightly
             ───────────────────────────────────────────────────────────── */}
          {/* Front Left Cupping Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleY: 1 }
                : { rotate: 8, scaleY: 1.08 }
            }
            animate={{ rotate: 0, scaleY: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.4,
              delay: prefersReducedMotion ? 0 : 2.7,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 170 230 146 204 166 174 C 186 198 194 224 200 240 Z"
              fill="url(#lotus-petal-front)"
            />
          </motion.g>

          {/* Front Right Cupping Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { rotate: 0, scaleY: 1 }
                : { rotate: -8, scaleY: 1.08 }
            }
            animate={{ rotate: 0, scaleY: 1 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.4,
              delay: prefersReducedMotion ? 0 : 2.7,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 206 224 214 198 234 174 C 254 204 230 230 200 240 Z"
              fill="url(#lotus-petal-front)"
            />
          </motion.g>

          {/* Front Center Base Petal */}
          <motion.g
            style={{ transformOrigin: '200px 240px' }}
            initial={
              prefersReducedMotion
                ? { scaleY: 1, opacity: 0.95 }
                : { scaleY: 1.15, opacity: 0.85 }
            }
            animate={{ scaleY: 1, opacity: 0.95 }}
            transition={{
              duration: prefersReducedMotion ? 0.01 : 3.5,
              delay: prefersReducedMotion ? 0 : 2.9,
              ease: bloomEase,
            }}
          >
            <path
              d="M 200 240 C 182 226 180 196 200 178 C 220 196 218 226 200 240 Z"
              fill="url(#lotus-petal-front)"
            />
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
};
