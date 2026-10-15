import React, { useEffect, useRef } from 'react';

interface FloatingGardenBackgroundProps {
  reducedDensity?: boolean; // Used during cake suspense
  visible?: boolean;
  className?: string;
}

export const FloatingGardenBackground: React.FC<FloatingGardenBackgroundProps> = ({
  reducedDensity = false,
  visible = true,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!visible) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const isMobile = window.innerWidth < 768;

    const setCanvasDimensions = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions, { passive: true });

    // Generous, graceful petal count
    const count = isMobile
      ? reducedDensity ? 18 : 28
      : reducedDensity ? 28 : 42;

    const items: Array<{
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      rotation: number;
      rotSpeed: number;
      flip: number;
      flipSpeed: number;
      type: 'petal' | 'sparkle';
      opacity: number;
      sway: number;
      swaySpeed: number;
    }> = [];

    for (let i = 0; i < count; i++) {
      // 80% petals, 20% delicate warm sparkles
      const isPetal = i % 5 !== 0;
      items.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isPetal
          ? (isMobile ? 8 + Math.random() * 6 : 10 + Math.random() * 8)
          : 2 + Math.random() * 3,
        speedY: 0.55 + Math.random() * (isMobile ? 0.65 : 0.85),
        speedX: (Math.random() - 0.5) * 0.35,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * (isMobile ? 0.016 : 0.024),
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.012 + Math.random() * 0.02,
        type: isPetal ? 'petal' : 'sparkle',
        opacity: isPetal ? 0.35 + Math.random() * 0.45 : 0.4 + Math.random() * 0.4,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.014 + Math.random() * 0.018,
      });
    }

    const drawPetal = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rot: number,
      flip: number,
      opacity: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rot);

      // 3D tumbling effect by scaling along flip axis
      const scaleX = Math.cos(flip);
      c.scale(scaleX, 1);
      c.globalAlpha = opacity;

      // Soft golden yellow lotus petal shape
      c.beginPath();
      c.moveTo(0, -size);
      c.bezierCurveTo(size * 0.75, -size * 0.45, size * 0.7, size * 0.55, 0, size);
      c.bezierCurveTo(-size * 0.7, size * 0.55, -size * 0.75, -size * 0.45, 0, -size);

      const grad = c.createLinearGradient(0, -size, 0, size);
      grad.addColorStop(0, '#FFF4B8');
      grad.addColorStop(0.5, '#FFD700');
      grad.addColorStop(1, '#FFC107');
      c.fillStyle = grad;
      c.fill();
      c.restore();
    };

    const drawSparkle = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number
    ) => {
      c.save();
      c.translate(x, y);
      c.globalAlpha = opacity;

      c.beginPath();
      c.arc(0, 0, size, 0, Math.PI * 2);
      c.fillStyle = '#FFF4B8';
      c.fill();
      c.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      items.forEach((item) => {
        item.y += item.speedY;
        item.sway += item.swaySpeed;
        item.x += Math.sin(item.sway) * (isMobile ? 0.7 : 1.0) + item.speedX;
        item.rotation += item.rotSpeed;
        item.flip += item.flipSpeed;

        if (item.y > height + 25) {
          item.y = -25;
          item.x = Math.random() * width;
        }
        if (item.x < -30) item.x = width + 30;
        if (item.x > width + 30) item.x = -30;

        if (item.type === 'petal') {
          drawPetal(ctx, item.x, item.y, item.size, item.rotation, item.flip, item.opacity);
        } else {
          drawSparkle(ctx, item.x, item.y, item.size, item.opacity);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedDensity, visible]);

  const defaultClasses = 'fixed inset-0 pointer-events-none z-[30] transition-opacity duration-1000 transform-gpu will-change-transform';

  return (
    <canvas
      ref={canvasRef}
      className={className || defaultClasses}
      style={{
        width: '100vw',
        height: '100vh',
        opacity: visible ? (reducedDensity ? 0.45 : 0.9) : 0,
      }}
    />
  );
};

