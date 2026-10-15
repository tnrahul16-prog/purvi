import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Exact 4-stage realistic blooming neon lotus assets (preserved untouched)
import neonBudImg from '../assets/images/neon_lotus_bud_1789151790961.jpg';
import neonEarlyImg from '../assets/images/neon_lotus_early_1789151814103.jpg';
import neonMidImg from '../assets/images/neon_lotus_mid_1789151845746.jpg';
import neonFullImg from '../assets/images/neon_lotus_full_1789151827504.jpg';

interface ThreeDNeonLotusTransitionProps {
  onComplete: () => void;
  language?: 'hi' | 'en';
}

type BloomPhase =
  | 'black' // 0.0s: Pure pitch-black screen
  | 'spark' // 1.0s: Radiant central spark
  | 'drawing' // 1.8s: Neon laser sketch/drawing effect of lotus contours
  | 'bud' // 3.6s: Closed neon lotus bud illuminates with glowing lines
  | 'early_bloom' // 5.6s: Outer petals unfurl
  | 'mid_bloom' // 7.8s: Petals curve outward and expand
  | 'full_bloom' // 9.8s: Full sacred radial mandala bloom
  | 'text_reveal' // 11.2s: "HAPPY BIRTHDAY PURVI" appears above flower
  | 'hold' // 14.0s: Cinematic hold
  | 'dissolve'; // 16.2s: Smooth dissolve into website

export const ThreeDNeonLotusTransition: React.FC<ThreeDNeonLotusTransitionProps> = ({
  onComplete,
  language = 'en',
}) => {
  const [phase, setPhase] = useState<BloomPhase>('black');
  const [isExiting, setIsExiting] = useState(false);
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Preload all 4 high-res neon lotus images immediately on mount
  useEffect(() => {
    [neonBudImg, neonEarlyImg, neonMidImg, neonFullImg].forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  // Background Particle System (60fps Canvas, pure deep black cosmos with neon stardust & floating bokeh)
  useEffect(() => {
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle pool: 75 glowing neon embers and stardust specks
    const particleCount = 75;
    const particles = Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -0.25 - Math.random() * 0.65, // gentle upward drift
      radius: 0.8 + Math.random() * 2.6,
      baseAlpha: 0.2 + Math.random() * 0.7,
      alpha: 0,
      color: Math.random() > 0.35 ? '#FFD700' : Math.random() > 0.5 ? '#FFC107' : '#ffffff',
      pulseSpeed: 0.015 + Math.random() * 0.03,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render all floating background particles
      for (let i = 0; i < particleCount; i++) {
        const p = particles[i];
        p.x += p.vx + Math.sin(time + p.pulseOffset) * 0.15;
        p.y += p.vy;

        // Wrap around viewport edges
        if (p.y < -10) p.y = height + 10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Twinkle pulse
        p.alpha = p.baseAlpha * (0.6 + 0.4 * Math.sin(time * 2 + p.pulseOffset));

        // Outer soft glow halo
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha * 0.25;
        ctx.shadowBlur = 12;
        ctx.shadowColor = p.color;
        ctx.fill();

        // Core bright center
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = p.alpha * 0.9;
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Sequence Timing
  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    // 1.0s: Radiant neon point of light sparks in center
    timers.push(
      setTimeout(() => {
        setPhase('spark');
      }, 1000)
    );

    // 1.8s: Neon laser sketch / drawing effect traces lotus contours
    timers.push(
      setTimeout(() => {
        setPhase('drawing');
      }, 1800)
    );

    // 3.8s: Closed neon lotus bud illuminates seamlessly inside the drawn lines
    timers.push(
      setTimeout(() => {
        setPhase('bud');
      }, 3800)
    );

    // 5.8s: Early bloom — outer petals start unfurling
    timers.push(
      setTimeout(() => {
        setPhase('early_bloom');
      }, 5800)
    );

    // 8.0s: Mid bloom — petals curve outwards and expand
    timers.push(
      setTimeout(() => {
        setPhase('mid_bloom');
      }, 8000)
    );

    // 10.0s: Full bloom — sacred top-down radial mandala lotus
    timers.push(
      setTimeout(() => {
        setPhase('full_bloom');
      }, 10000)
    );

    // 11.4s: "HAPPY BIRTHDAY FARHA" appears strictly above the lotus
    timers.push(
      setTimeout(() => {
        setPhase('text_reveal');
      }, 11400)
    );

    // 14.2s: Cinematic hold
    timers.push(
      setTimeout(() => {
        setPhase('hold');
      }, 14200)
    );

    // 16.4s: Dissolve into website
    timers.push(
      setTimeout(() => {
        setIsExiting(true);
        setPhase('dissolve');
      }, 16400)
    );

    // 17.8s: Callback on complete
    timers.push(
      setTimeout(() => {
        onCompleteRef.current();
      }, 17800)
    );

    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const handleSkip = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onCompleteRef.current();
    }, 500);
  };

  const showSpark = phase === 'spark' || phase === 'drawing';
  const showDrawing =
    phase === 'drawing' ||
    phase === 'bud' ||
    phase === 'early_bloom';
  const isBudActive = phase === 'bud';
  const isEarlyActive = phase === 'early_bloom';
  const isMidActive = phase === 'mid_bloom';
  const isFullActive =
    phase === 'full_bloom' ||
    phase === 'text_reveal' ||
    phase === 'hold' ||
    phase === 'dissolve';
  const showText =
    phase === 'text_reveal' || phase === 'hold' || phase === 'dissolve';

  // Strict anti-black-box styles:
  // 1. mixBlendMode: 'screen' turns any black or near-black background 100% transparent.
  // 2. radial-gradient mask smoothly feathers all outer square edges into nothing.
  const seamlessLotusImageStyle: React.CSSProperties = {
    mixBlendMode: 'screen',
    maskImage: 'radial-gradient(circle at 50% 50%, black 58%, transparent 88%)',
    WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black 58%, transparent 88%)',
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="neon-lotus-transition-viewport"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 min-h-[100dvh] w-full z-[60] bg-[#000000] flex flex-col items-center justify-center overflow-hidden select-none touch-manipulation"
          style={{ backgroundColor: '#000000' }}
        >
          {/* 1. Pure Pitch Black Void */}
          <div className="absolute inset-0 bg-[#000000] pointer-events-none" />

          {/* 2. Pure Black Background Particles Canvas (Full-screen, behind flower) */}
          <canvas
            ref={particleCanvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
            style={{ width: '100%', height: '100%', backgroundColor: 'transparent' }}
          />

          {/* 3. Soft Ambient Radial Pink Atmosphere behind the flower (No box edges) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isFullActive
                ? 0.65
                : isMidActive
                ? 0.5
                : isEarlyActive
                ? 0.35
                : isBudActive
                ? 0.22
                : 0,
              scale: isFullActive ? 1.25 : 1.0,
            }}
            transition={{ duration: 2.0, ease: 'easeOut' }}
            className="absolute w-[80vw] h-[80vw] max-w-[620px] max-h-[620px] rounded-full pointer-events-none z-15"
            style={{
              background:
                'radial-gradient(circle at center, rgba(255, 45, 135, 0.24) 0%, rgba(255, 20, 147, 0.08) 45%, transparent 70%)',
              filter: 'blur(45px)',
            }}
          />

          {/* 4. Central Radiant Spark Point */}
          <AnimatePresence>
            {showSpark && (
              <motion.div
                key="central-spark"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: [0, 1.8, 1.2],
                  opacity: [0, 1, 0.95],
                }}
                exit={{ scale: [1.2, 2.2, 0], opacity: [0.95, 0.8, 0] }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
                className="absolute z-35 w-4 h-4 rounded-full bg-white pointer-events-none"
                style={{
                  boxShadow:
                    '0 0 12px #ffffff, 0 0 28px #ff2d87, 0 0 55px #ff0080, 0 0 90px #ff2d87',
                }}
              />
            )}
          </AnimatePresence>

          {/* 5. The Lotus Bloom Container (Completely Seamless, Zero Black Box) */}
          <div className="relative z-30 w-[85vw] h-[85vw] max-w-[480px] max-h-[480px] sm:max-w-[500px] sm:max-h-[500px] md:max-w-[530px] md:max-h-[530px] aspect-square flex items-center justify-center mt-10 sm:mt-12">
            
            {/* ══════════════════════════════════════════════════════════════════
                A. NEON DRAWING EFFECT (Glowing laser strokes tracing the lotus)
               ══════════════════════════════════════════════════════════════════ */}
            <AnimatePresence>
              {showDrawing && (
                <motion.svg
                  key="lotus-neon-drawing"
                  viewBox="0 0 500 500"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: phase === 'drawing' ? 1 : phase === 'bud' ? 0.85 : 0.25,
                  }}
                  exit={{ opacity: 0, filter: 'blur(8px)' }}
                  transition={{ duration: 1.2, ease: 'easeInOut' }}
                  className="absolute inset-0 w-full h-full pointer-events-none z-35"
                  style={{
                    filter:
                      'drop-shadow(0 0 6px #ffffff) drop-shadow(0 0 14px #ff2d87) drop-shadow(0 0 28px #ff007f)',
                  }}
                >
                  <defs>
                    <linearGradient id="neonPinkGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="25%" stopColor="#ffb6db" />
                      <stop offset="65%" stopColor="#ff2d87" />
                      <stop offset="100%" stopColor="#ff70b8" />
                    </linearGradient>
                  </defs>

                  {/* 1. Stem Path: rising upward */}
                  <motion.path
                    d="M 250 475 C 248 435, 252 390, 250 345"
                    fill="none"
                    stroke="url(#neonPinkGrad)"
                    strokeWidth="3.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 0.1, ease: 'easeOut' }}
                  />

                  {/* 2. Calyx Base */}
                  <motion.path
                    d="M 225 350 C 238 362, 262 362, 275 350"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
                  />

                  {/* 3. Outer Left Petal Contour */}
                  <motion.path
                    d="M 250 345 C 175 330, 135 245, 170 170 C 192 125, 230 98, 250 88"
                    fill="none"
                    stroke="url(#neonPinkGrad)"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* 4. Outer Right Petal Contour */}
                  <motion.path
                    d="M 250 345 C 325 330, 365 245, 330 170 C 308 125, 270 98, 250 88"
                    fill="none"
                    stroke="url(#neonPinkGrad)"
                    strokeWidth="3.4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* 5. Mid Left Petal Curve */}
                  <motion.path
                    d="M 250 345 C 195 305, 168 215, 208 145 C 226 112, 242 98, 250 88"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* 6. Mid Right Petal Curve */}
                  <motion.path
                    d="M 250 345 C 305 305, 332 215, 292 145 C 274 112, 258 98, 250 88"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.4, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />

                  {/* 7. Inner Bud Left Petal */}
                  <motion.path
                    d="M 250 345 C 222 295, 215 205, 236 132 C 242 110, 248 96, 250 88"
                    fill="none"
                    stroke="url(#neonPinkGrad)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.3, delay: 1.2, ease: 'easeOut' }}
                  />

                  {/* 8. Inner Bud Right Petal */}
                  <motion.path
                    d="M 250 345 C 278 295, 285 205, 264 132 C 258 110, 252 96, 250 88"
                    fill="none"
                    stroke="url(#neonPinkGrad)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.3, delay: 1.2, ease: 'easeOut' }}
                  />

                  {/* 9. Center Core Vertical Spine */}
                  <motion.path
                    d="M 250 345 L 250 88"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.8"
                    strokeDasharray="4 6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.1, delay: 1.4, ease: 'easeOut' }}
                  />

                  {/* 10. Botanical Vein Striations */}
                  <motion.path
                    d="M 250 345 Q 190 235 200 165"
                    fill="none"
                    stroke="#ff5ea7"
                    strokeWidth="1.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
                  />
                  <motion.path
                    d="M 250 345 Q 310 235 300 165"
                    fill="none"
                    stroke="#ff5ea7"
                    strokeWidth="1.6"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.2, delay: 1.3, ease: 'easeOut' }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>

            {/* ══════════════════════════════════════════════════════════════════
                B. ORIGINAL LOTUS STAGES (Preserved untouched, with screen blend)
               ══════════════════════════════════════════════════════════════════ */}

            {/* Stage 1: Closed Bud with Glowing Contours and Stem */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{
                opacity: isBudActive ? 1 : 0,
                scale: isBudActive ? 1 : 0.98,
              }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img
                src={neonBudImg}
                alt="Neon Lotus Bud"
                className="w-full h-full object-contain select-none"
                style={{
                  ...seamlessLotusImageStyle,
                  filter: 'drop-shadow(0 0 24px rgba(255, 45, 135, 0.6))',
                }}
              />
            </motion.div>

            {/* Stage 2: Early Bloom (Outer Petals Unfurling) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{
                opacity: isEarlyActive ? 1 : 0,
                scale: isEarlyActive ? 1.01 : 0.98,
              }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img
                src={neonEarlyImg}
                alt="Neon Lotus Early Bloom"
                className="w-full h-full object-contain select-none"
                style={{
                  ...seamlessLotusImageStyle,
                  filter: 'drop-shadow(0 0 28px rgba(255, 45, 135, 0.7))',
                }}
              />
            </motion.div>

            {/* Stage 3: Mid Bloom (Petals Expanding) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{
                opacity: isMidActive ? 1 : 0,
                scale: isMidActive ? 1.02 : 0.99,
              }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img
                src={neonMidImg}
                alt="Neon Lotus Mid Bloom"
                className="w-full h-full object-contain select-none"
                style={{
                  ...seamlessLotusImageStyle,
                  filter: 'drop-shadow(0 0 32px rgba(255, 45, 135, 0.8))',
                }}
              />
            </motion.div>

            {/* Stage 4: Full Sacred Bloom (Radial Mandala Lotus) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{
                opacity: isFullActive ? 1 : 0,
                scale: isFullActive ? [1.0, 1.03, 1.01] : 0.99,
              }}
              transition={{
                opacity: { duration: 1.6, ease: 'easeInOut' },
                scale: { duration: 3.5, ease: 'easeInOut' },
              }}
              className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
            >
              <img
                src={neonFullImg}
                alt="Neon Lotus Full Bloom"
                className="w-full h-full object-contain select-none"
                style={{
                  ...seamlessLotusImageStyle,
                  filter:
                    'drop-shadow(0 0 36px rgba(255, 215, 0, 0.9)) drop-shadow(0 0 70px rgba(255, 193, 7, 0.5)) hue-rotate(60deg)',
                }}
              />
            </motion.div>
          </div>

          {/* 6. "HAPPY BIRTHDAY PURVI" — Positioned Strictly Above the Lotus */}
          <div className="absolute top-[8vh] sm:top-[10vh] md:top-[12vh] z-40 w-full px-4 flex flex-col items-center justify-center pointer-events-none">
            <AnimatePresence>
              {showText && (
                <motion.div
                  key="birthday-title-block"
                  initial={{
                    opacity: 0,
                    y: 18,
                    filter: 'blur(8px)',
                    scale: 0.94,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.3,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="text-center px-4"
                >
                  <motion.h1
                    initial={{ letterSpacing: '0.14em' }}
                    animate={{ letterSpacing: '0.24em' }}
                    transition={{ duration: 2.0, ease: 'easeOut' }}
                    className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-[34px] font-semibold uppercase text-[#ffffff] select-none whitespace-nowrap"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      textShadow:
                        '0 0 8px #FFD700, 0 0 18px #FFC107, 0 0 35px rgba(255, 215, 0, 0.9), 0 0 65px rgba(229, 179, 65, 0.65)',
                    }}
                  >
                    HAPPY BIRTHDAY PURVI
                  </motion.h1>

                  {/* Luminous Neon Horizontal Line */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 0.9 }}
                    transition={{ duration: 1.1, delay: 0.25, ease: 'easeOut' }}
                    className="h-[1.5px] w-36 sm:w-56 mx-auto mt-3 rounded-full"
                    style={{
                      background:
                        'linear-gradient(90deg, transparent, #FFD700, #ffffff, #FFD700, transparent)',
                      boxShadow:
                        '0 0 10px #FFD700, 0 0 20px rgba(255, 193, 7, 0.8)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 7. Discreet Skip Button in Top Right */}
          {phase !== 'black' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.65 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="absolute top-4 right-4 z-50 pt-safe pr-safe pointer-events-auto"
            >
              <button
                onClick={handleSkip}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 text-xs tracking-wider transition-all font-sans cursor-pointer backdrop-blur-sm border border-white/15 active:scale-95"
                aria-label={language === 'hi' ? 'छोड़ें' : 'Skip'}
              >
                {language === 'hi' ? 'छोड़ें ➔' : 'Skip →'}
              </button>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
