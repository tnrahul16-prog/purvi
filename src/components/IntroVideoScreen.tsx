import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LotusFlower } from './LotusFlower';

interface IntroVideoScreenProps {
  videoUrl: string;
  onComplete: () => void;
  language: 'hi' | 'en';
}

export const IntroVideoScreen: React.FC<IntroVideoScreenProps> = ({
  videoUrl,
  onComplete,
  language,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const completedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const handleFinish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsFadingOut(true);

    if (videoRef.current) {
      try {
        videoRef.current.pause();
        videoRef.current.muted = true;
      } catch {}
    }

    setTimeout(() => {
      if (videoRef.current) {
        try {
          videoRef.current.pause();
          videoRef.current.muted = true;
          videoRef.current.currentTime = 0;
          videoRef.current.src = '';
          videoRef.current.load();
        } catch {}
      }
      onCompleteRef.current();
    }, 650);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let fallbackTimeout: NodeJS.Timeout | null = null;

    const startPlayback = async () => {
      try {
        video.muted = false;
        await video.play();
      } catch {
        try {
          video.muted = true;
          await video.play();
          // Unmute once user touches anywhere if initially blocked
          video.muted = false;
        } catch {
          // If playback error, let fallback handle it
        }
      }
    };

    startPlayback();

    // Safety fallback only if the video stalls completely and never progresses for 40s
    fallbackTimeout = setTimeout(() => {
      if (!completedRef.current) {
        const currentVid = videoRef.current;
        // Do not cut off if actively playing
        if (currentVid && !currentVid.paused && !currentVid.ended) {
          return;
        }
        handleFinish();
      }
    }, 40000);

    return () => {
      if (fallbackTimeout) clearTimeout(fallbackTimeout);
      if (video) {
        try {
          video.pause();
          video.muted = true;
          video.currentTime = 0;
        } catch {}
      }
    };
  }, [videoUrl]);

  const handleScreenClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      video.play().catch(() => {
        video.muted = true;
        video.play().catch(() => {});
      });
    } else if (video.muted) {
      video.muted = false;
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (video.currentTime >= video.duration - 0.25) {
      handleFinish();
    }
  };

  const handleError = () => {
    setVideoError(true);
    setTimeout(() => {
      handleFinish();
    }, 1200);
  };

  const isHi = language === 'hi';

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          key="intro-video"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.02 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 min-h-[100dvh] w-full z-50 flex flex-col items-center justify-center bg-[#080808] text-[#FFF4B8] overflow-hidden select-none touch-manipulation cursor-pointer"
          onClick={handleScreenClick}
        >
          {/* Subtle Ambient Glow Behind Video */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FFD700]/10 via-[#151515]/90 to-[#080808] pointer-events-none" />

          {/* Video Container - Preserves 886x1920 (9:19.5) proportions perfectly */}
          <div className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden pointer-events-none">
            <video
              ref={videoRef}
              src={videoUrl}
              playsInline
              preload="auto"
              autoPlay
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleFinish}
              onError={handleError}
              className="w-full h-full max-h-[100dvh] max-w-[calc(100dvh*886/1920)] object-contain mx-auto"
            />

            {/* Graceful Soft Loading State / Error Handled */}
            {videoError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <LotusFlower size={36} variant="soft-pink" className="animate-pulse mb-3" />
                <p className="text-[#FFF4B8] text-sm font-light">
                  {isHi ? 'बस एक पल… 💛' : 'One moment… 💛'}
                </p>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

