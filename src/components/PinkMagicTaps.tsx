import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
  rotation: number;
}

const PARTICLES = ['💛', '✨', '⭐', '💛', '👑'];

export const PinkMagicTaps: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);
  const pointerDownRef = React.useRef<{ x: number; y: number; time: number } | null>(null);

  const spawnParticles = useCallback((clientX: number, clientY: number) => {
    // Generate 2 subtle particles at tap position
    const count = 2;
    const newItems: Particle[] = [];
    const timestamp = Date.now();

    for (let i = 0; i < count; i++) {
      const offsetX = (Math.random() - 0.5) * 40;
      const offsetY = (Math.random() - 0.5) * 30;
      newItems.push({
        id: timestamp + i + Math.random(),
        x: clientX + offsetX,
        y: clientY + offsetY,
        emoji: PARTICLES[Math.floor(Math.random() * PARTICLES.length)],
        size: 14 + Math.random() * 8,
        rotation: (Math.random() - 0.5) * 40,
      });
    }

    setParticles((prev) => [...prev.slice(-8), ...newItems]);
  }, []);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    pointerDownRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    };
  }, []);

  const handlePointerUp = useCallback((e: PointerEvent) => {
    if (!pointerDownRef.current) return;
    const { x, y, time } = pointerDownRef.current;
    pointerDownRef.current = null;

    const dx = e.clientX - x;
    const dy = e.clientY - y;
    const dist = Math.hypot(dx, dy);
    const duration = Date.now() - time;

    // Only spawn on stationary taps (not scroll/pan gestures)
    if (dist < 10 && duration < 400) {
      spawnParticles(e.clientX, e.clientY);
    }
  }, [spawnParticles]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [handlePointerDown, handlePointerUp]);

  const removeParticle = useCallback((id: number) => {
    setParticles((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0.9, scale: 0.5, x: p.x, y: p.y, rotate: p.rotation }}
            animate={{
              opacity: 0,
              scale: 1.3,
              y: p.y - 65,
              x: p.x + (Math.random() - 0.5) * 30,
              rotate: p.rotation + (Math.random() - 0.5) * 30,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
            onAnimationComplete={() => removeParticle(p.id)}
            style={{
              position: 'fixed',
              left: 0,
              top: 0,
              fontSize: `${p.size}px`,
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >
            {p.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
