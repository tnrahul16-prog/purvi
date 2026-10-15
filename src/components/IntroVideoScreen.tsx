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
  const [isMuted, setIsMuted] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
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
        setIsMuted(false);
      } catch {
        try {
          // If unmuted autoplay is blocked by browser policy, play muted smoothly
          video.muted = true;
          setIsMuted(true);
          await video.play();
        } catch {
          // If playback completely fails, let error handler/fallback transition
        }
      }
    };

    startPlayback();

    // Safety fallback only if the video stalls completely and never finishes
    fallbackTimeout = setTimeout(() => {
      if (!completedRef.current) {
        const currentVid = videoRef.current;
        // Do not cut off if actively playing
        if (currentVid && !currentVid.paused && !currentVid.ended) {
          return;
        }
        handleFinish();
      }
    }, 22000);

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
      setIsMuted(false);
      video.play().catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    } else if (video.muted) {
      video.muted = false;
      setIsMuted(false);
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

          {/* Top Skip Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            className="absolute top-5 right-5 z-30 pointer-events-auto px-3.5 py-1.5 rounded-full bg-black/50 hover:bg-black/80 backdrop-blur-md border border-[#FFD700]/40 text-[#FFF4B8] hover:text-[#FFD700] text-xs font-sans-clean uppercase tracking-wider transition-all duration-200 active:scale-95 flex items-center gap-1.5 shadow-lg shadow-black/40 cursor-pointer"
          >
            <span>{isHi ? 'छोड़ें' : 'Skip'}</span>
            <span>➔</span>
          </button>

          {/* Video Container - Preserves 720x1200 (3:5) proportions perfectly */}
          <div className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden">
            <video
              ref={videoRef}
              src={videoUrl}
              playsInline
              preload="auto"
              autoPlay
              onWaiting={() => setIsBuffering(true)}
              onPlaying={() => setIsBuffering(false)}
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleFinish}
              onError={handleError}
              className="w-full h-full max-h-[100dvh] max-w-[calc(100dvh*720/1200)] object-contain mx-auto"
            />

            {/* Buffering State */}
            {isBuffering && !videoError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
                <LotusFlower size={34} variant="soft-pink" className="animate-pulse mb-2 opacity-80" />
              </div>
            )}

            {/* Graceful Soft Loading State / Error Handled */}
            {videoError && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <LotusFlower size={36} variant="soft-pink" className="animate-pulse mb-3" />
                <p className="text-[#FFF4B8] text-sm font-light">
                  {isHi ? 'बस एक पल… 💛' : 'One moment… 💛'}
                </p>
              </div>
            )}

            {/* Tap to Unmute Hint (appears if browser autoplay muted audio) */}
            {isMuted && !videoError && (
              <div className="absolute bottom-6 z-20 pointer-events-none px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-[#FFD700]/30 text-[#FFD700] text-xs font-sans-clean flex items-center gap-2 animate-pulse shadow-md">
                <span>🔊</span>
                <span>{isHi ? 'आवाज़ के लिए स्क्रीन छुएं' : 'Tap screen for audio'}</span>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

