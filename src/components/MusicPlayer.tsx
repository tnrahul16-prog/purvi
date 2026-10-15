import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Music, AlertCircle, ArrowLeftRight, Languages, X, ChevronDown, Check } from 'lucide-react';
import { Language } from '../translations';

interface MusicPlayerProps {
  songUrl: string; // Purvi Song (Default / Primary)
  song2Url?: string; // Purvi Song 2 (Secondary option)
  autoStartRequested: boolean;
  mood?: 'normal' | 'emotional' | 'celebratory';
  farhaSongLabel?: string;
  song1Label?: string;
  song2Label?: string;
  switchSongLabel?: string;
  mutedLabel?: string;
  tapToPlayLabel?: string;
  currentLanguage?: Language;
  onToggleLanguage?: () => void;
  languageLabel?: string;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  songUrl = '/baby-doll-song.mp3',
  song2Url = '/farha-song.mp3',
  autoStartRequested,
  mood = 'normal',
  song1Label = 'Purvi’s Song',
  song2Label = 'Purvi Melody ♫',
  switchSongLabel = 'Switch Song',
  mutedLabel = 'Muted 🔇',
  tapToPlayLabel = 'Tap to play music 🎵',
  currentLanguage = 'en',
  onToggleLanguage,
  languageLabel = 'हिन्दी',
}) => {
  // Dual preloaded audio elements for instantaneous zero-delay switching
  const audio1Ref = useRef<HTMLAudioElement | null>(null);
  const audio2Ref = useRef<HTMLAudioElement | null>(null);

  const synthIntervalRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const hasAutoStartedRef = useRef<boolean>(false);
  const userMutedRef = useRef<boolean>(false);
  const crossfadeTimerRef = useRef<number | null>(null);

  // Selected track: default to track1 (Farha Song)
  const [selectedTrack, setSelectedTrack] = useState<'track1' | 'track2'>('track1');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [usingSynthFallback, setUsingSynthFallback] = useState<boolean>(false);
  const [showManualPrompt, setShowManualPrompt] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.65);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Reference to current active audio element
  const getActiveAudio = useCallback(
    (track: 'track1' | 'track2' = selectedTrack) => {
      return track === 'track1' ? audio1Ref.current : audio2Ref.current;
    },
    [selectedTrack]
  );

  // Soft ambient bell notes as fallback only if audio file fails to load
  const synthMelody = [
    523.25, 659.25, 783.99, 880.0, 783.99, 659.25, 523.25, 659.25,
    587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5, 880.0,
  ];
  const synthStepRef = useRef<number>(0);

  const playSynthChime = useCallback((freq: number, currentVol: number) => {
    try {
      const ctx = audioContextRef.current;
      if (!ctx || ctx.state === 'suspended') return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const now = ctx.currentTime;
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(currentVol * 0.18, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 1.9);
    } catch {
      // Ignore audio synthesis errors
    }
  }, []);

  const startSynth = useCallback(() => {
    try {
      if (!audioContextRef.current) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioContextRef.current = new AudioCtx();
      }
      if (audioContextRef.current.state === 'suspended') {
        audioContextRef.current.resume();
      }

      setUsingSynthFallback(true);
      setIsPlaying(true);
      setShowManualPrompt(false);

      if (synthIntervalRef.current) clearInterval(synthIntervalRef.current);

      synthIntervalRef.current = window.setInterval(() => {
        const note = synthMelody[synthStepRef.current % synthMelody.length];
        synthStepRef.current += 1;
        playSynthChime(note, volume);
      }, 600);
    } catch (e) {
      console.warn('Synth fallback error', e);
    }
  }, [playSynthChime, volume, synthMelody]);

  const stopSynth = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    setUsingSynthFallback(false);
  }, []);

  const startAudio = useCallback(async () => {
    const active = getActiveAudio(selectedTrack);
    if (active) {
      active.volume = volume;
      active.muted = false;
      try {
        await active.play();
        setIsPlaying(true);
        setShowManualPrompt(false);
        stopSynth();
      } catch (err) {
        console.warn('Audio play error, using fallback:', err);
        startSynth();
      }
    } else {
      startSynth();
    }
  }, [getActiveAudio, selectedTrack, volume, startSynth, stopSynth]);

  // Touch to toggle mute/play
  const toggleMute = () => {
    if (isPlaying) {
      // User tapped to mute
      userMutedRef.current = true;
      if (audio1Ref.current) {
        audio1Ref.current.pause();
        audio1Ref.current.muted = true;
      }
      if (audio2Ref.current) {
        audio2Ref.current.pause();
        audio2Ref.current.muted = true;
      }
      stopSynth();
      setIsPlaying(false);
    } else {
      // User tapped to unmute
      userMutedRef.current = false;
      const active = getActiveAudio(selectedTrack);
      if (active) {
        active.muted = false;
      }
      startAudio();
    }
  };

  // Zero-delay smooth crossfade switch between Farha Song and Farha Song 2
  const switchTrack = (targetTrack?: 'track1' | 'track2') => {
    const nextTrack = targetTrack || (selectedTrack === 'track1' ? 'track2' : 'track1');
    if (nextTrack === selectedTrack) return;

    // Clear any previous crossfade interval
    if (crossfadeTimerRef.current) {
      window.clearInterval(crossfadeTimerRef.current);
      crossfadeTimerRef.current = null;
    }

    const currentAudio = selectedTrack === 'track1' ? audio1Ref.current : audio2Ref.current;
    const nextAudio = nextTrack === 'track1' ? audio1Ref.current : audio2Ref.current;

    setSelectedTrack(nextTrack);

    // If sound is active and not user-muted, perform a seamless crossfade with 0 delay
    if (isPlaying && !userMutedRef.current && nextAudio) {
      // Prepare incoming track immediately with volume 0
      nextAudio.volume = 0;
      nextAudio.muted = false;

      // Start playing incoming track right now (no network buffering delay, it's preloaded!)
      const playPromise = nextAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Next audio play error:', err);
        });
      }

      // Smooth crossfade over 350ms (14 steps of 25ms)
      const targetVolume = volume;
      const duration = 350;
      const stepTime = 25;
      const totalSteps = duration / stepTime;
      let step = 0;

      crossfadeTimerRef.current = window.setInterval(() => {
        step += 1;
        const progress = Math.min(step / totalSteps, 1);

        if (currentAudio) {
          currentAudio.volume = Math.max(0, targetVolume * (1 - progress));
        }
        if (nextAudio) {
          nextAudio.volume = Math.min(targetVolume, targetVolume * progress);
        }

        if (step >= totalSteps) {
          if (crossfadeTimerRef.current) {
            window.clearInterval(crossfadeTimerRef.current);
            crossfadeTimerRef.current = null;
          }
          if (currentAudio) {
            currentAudio.pause();
            currentAudio.volume = targetVolume;
          }
          if (nextAudio) {
            nextAudio.volume = targetVolume;
          }
        }
      }, stepTime);
    } else {
      // If paused or muted, just switch the active track seamlessly
      if (currentAudio) currentAudio.pause();
    }
  };

  // Trigger when user taps "Open Your Surprise 💗" or video ends
  useEffect(() => {
    if (autoStartRequested && !hasAutoStartedRef.current && !userMutedRef.current) {
      hasAutoStartedRef.current = true;
      startAudio().catch(() => {
        setShowManualPrompt(true);
      });
    }
  }, [autoStartRequested, startAudio]);

  // Adjust volume based on mood smoothly
  useEffect(() => {
    let targetVol = 0.65;
    if (mood === 'emotional') {
      targetVol = 0.45; // Soften slightly during deep heartfelt message
    } else if (mood === 'celebratory') {
      targetVol = 0.75; // More vibrant during celebration
    }
    setVolume(targetVol);

    const active = selectedTrack === 'track1' ? audio1Ref.current : audio2Ref.current;
    if (active && !usingSynthFallback) {
      active.volume = targetVol;
    }
  }, [mood, selectedTrack, usingSynthFallback]);

  // Cleanup and ensure all audio stops immediately on unmount, page refresh, or navigation
  useEffect(() => {
    const handleStopAll = () => {
      if (audio1Ref.current) {
        try {
          audio1Ref.current.pause();
          audio1Ref.current.currentTime = 0;
        } catch {}
      }
      if (audio2Ref.current) {
        try {
          audio2Ref.current.pause();
          audio2Ref.current.currentTime = 0;
        } catch {}
      }
      stopSynth();
    };

    window.addEventListener('beforeunload', handleStopAll);
    window.addEventListener('pagehide', handleStopAll);

    return () => {
      window.removeEventListener('beforeunload', handleStopAll);
      window.removeEventListener('pagehide', handleStopAll);
      handleStopAll();
      if (crossfadeTimerRef.current) {
        clearInterval(crossfadeTimerRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stopSynth]);

  return (
    <>
      {/* Active Track Preloaded for Instant Playback, Secondary Track On-Demand to Save Mobile Bandwidth */}
      <audio
        ref={audio1Ref}
        src={songUrl}
        loop
        preload={selectedTrack === 'track1' ? 'auto' : 'metadata'}
        onError={() => {
          if (autoStartRequested && !isPlaying && selectedTrack === 'track1') {
            startSynth();
          }
        }}
      />

      <audio
        ref={audio2Ref}
        src={song2Url || songUrl}
        loop
        preload={selectedTrack === 'track2' ? 'auto' : 'none'}
        onError={() => {
          if (autoStartRequested && !isPlaying && selectedTrack === 'track2') {
            startSynth();
          }
        }}
      />

      {/* ─────────────────────────────────────────────────────────────
          1. DESKTOP FLOATING MUSIC BAR (Preserved for sm: screens and up)
         ───────────────────────────────────────────────────────────── */}
      <div className="fixed top-4 right-4 z-[60] hidden sm:flex items-center gap-1.5 select-none">
        {showManualPrompt && !isPlaying && (
          <button
            onClick={startAudio}
            className="touch-manipulation flex items-center gap-1 px-3 py-2 min-h-[44px] rounded-full bg-[#FFD700] text-[#080808] text-xs font-semibold shadow-md shadow-[#FFD700]/20 backdrop-blur-md animate-bounce active:scale-95 cursor-pointer [-webkit-tap-highlight-color:transparent]"
          >
            <AlertCircle size={13} className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{tapToPlayLabel}</span>
          </button>
        )}

        {/* Unified Song Selection & Audio Control Bar */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-full bg-[#151515]/95 border border-[#FFD700]/40 shadow-lg shadow-[#FFD700]/15 backdrop-blur-xl">
          {/* Direct Song Selection Segmented Pill */}
          <div
            className="flex items-center bg-[#080808] p-0.5 rounded-full border border-[#FFD700]/30"
            role="group"
            aria-label="Select song track"
          >
            {/* Purvi Song */}
            <button
              type="button"
              onClick={() => switchTrack('track1')}
              title={`${song1Label} (Primary Song)`}
              aria-pressed={selectedTrack === 'track1'}
              className={`touch-manipulation px-3 py-1.5 min-h-[38px] rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 [-webkit-tap-highlight-color:transparent] ${
                selectedTrack === 'track1'
                  ? 'bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] text-[#080808] shadow-sm shadow-[#FFD700]/30 font-semibold'
                  : 'text-[#FFF4B8] hover:text-[#FFD700] hover:bg-[#1E1E1E]'
              }`}
            >
              <Music size={11} className={selectedTrack === 'track1' ? 'animate-pulse text-[#080808]' : 'opacity-60 text-[#FFD700]'} />
              <span>{song1Label}</span>
            </button>

            {/* Quick Song Switching Button (Zero Delay / Smooth Transition) */}
            <button
              type="button"
              onClick={() => switchTrack()}
              title={switchSongLabel || 'Switch Song'}
              aria-label="Switch between songs"
              className="touch-manipulation p-1.5 min-h-[38px] min-w-[32px] rounded-full text-[#FFD700] hover:bg-[#1E1E1E] transition-all duration-200 active:scale-90 flex items-center justify-center cursor-pointer [-webkit-tap-highlight-color:transparent]"
            >
              <ArrowLeftRight size={13} className="transition-transform duration-300 hover:rotate-180" />
            </button>

            {/* Song 2 */}
            {song2Url && (
              <button
                type="button"
                onClick={() => switchTrack('track2')}
                title={`${song2Label} (Secondary Song)`}
                aria-pressed={selectedTrack === 'track2'}
                className={`touch-manipulation px-3 py-1.5 min-h-[38px] rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 [-webkit-tap-highlight-color:transparent] ${
                  selectedTrack === 'track2'
                    ? 'bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] text-[#080808] shadow-sm shadow-[#FFD700]/30 font-semibold'
                    : 'text-[#FFF4B8] hover:text-[#FFD700] hover:bg-[#1E1E1E]'
                }`}
              >
                <Music size={11} className={selectedTrack === 'track2' ? 'animate-pulse text-[#080808]' : 'opacity-60 text-[#FFD700]'} />
                <span>{song2Label}</span>
              </button>
            )}
          </div>

          {/* Touch-to-Mute / Play Pill */}
          <button
            onClick={toggleMute}
            aria-label={isPlaying ? 'Touch to mute music' : 'Touch to play music'}
            title={isPlaying ? 'Touch to mute' : 'Touch to play'}
            className={`touch-manipulation flex items-center gap-2 px-3.5 py-2 min-h-[38px] rounded-full border transition-all duration-300 active:scale-95 cursor-pointer [-webkit-tap-highlight-color:transparent] ${
              isPlaying
                ? 'bg-[#080808] border-[#FFD700]/50 text-[#FFD700] hover:bg-[#151515]'
                : 'bg-[#151515] border-[#FFD700]/30 text-[#FFF4B8]/80 hover:bg-[#1E1E1E]'
            }`}
          >
            <div className="relative flex items-center justify-center shrink-0">
              <Music
                size={14}
                className={`w-3.5 h-3.5 transition-transform duration-500 ${
                  isPlaying ? 'scale-110 rotate-6 text-[#FFD700]' : 'scale-95 text-[#FFF4B8]/60'
                }`}
              />
              {isPlaying && (
                <span className="absolute -top-1 -right-1 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFC107]"></span>
                </span>
              )}
            </div>

            <span className="text-xs font-medium tracking-tight whitespace-nowrap font-sans-clean">
              {isPlaying ? (selectedTrack === 'track1' ? '♫ 1' : '♫ 2') : mutedLabel}
            </span>

            {isPlaying ? (
              <Volume2 size={13} className="text-[#FFD700] shrink-0" />
            ) : (
              <VolumeX size={13} className="text-[#FFF4B8]/60 shrink-0" />
            )}
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          2. MOBILE COMPACT UNIFIED FLOATING CONTROL (< sm screens)
             Combines Translation & Song Selection in a sleek, unobtrusive pill
         ───────────────────────────────────────────────────────────── */}
      <div className="fixed top-[max(0.6rem,env(safe-area-inset-top))] right-[max(0.6rem,env(safe-area-inset-right))] z-[70] flex sm:hidden items-center select-none">
        {showManualPrompt && !isPlaying && (
          <button
            onClick={startAudio}
            className="touch-manipulation mr-1.5 flex items-center gap-1 px-2.5 py-1 min-h-[34px] rounded-full bg-[#FFD700] text-[#080808] text-[10px] font-semibold shadow-md shadow-[#FFD700]/20 backdrop-blur-md animate-bounce active:scale-95 cursor-pointer [-webkit-tap-highlight-color:transparent]"
          >
            <AlertCircle size={12} className="shrink-0" />
            <span className="truncate max-w-[70px]">{tapToPlayLabel}</span>
          </button>
        )}

        {/* Compact Lotus Floating Pill */}
        <div className="flex items-center p-0.5 rounded-full bg-[#151515]/95 border border-[#FFD700]/40 shadow-md shadow-[#FFD700]/15 backdrop-blur-xl">
          {/* Quick Language Toggle Button (Instant 1-tap) */}
          {onToggleLanguage && (
            <button
              type="button"
              onClick={onToggleLanguage}
              title={`Switch Language to ${currentLanguage === 'hi' ? 'English' : 'हिन्दी'}`}
              className="touch-manipulation flex items-center gap-1 px-2 py-1 min-h-[32px] rounded-full text-[11px] font-semibold text-[#FFD700] hover:bg-[#1E1E1E] active:scale-95 transition-all cursor-pointer [-webkit-tap-highlight-color:transparent]"
            >
              <Languages size={12} className="text-[#FFD700]" />
              <span>{currentLanguage === 'hi' ? 'EN' : 'हिन्दी'}</span>
            </button>
          )}

          {/* Divider */}
          <div className="w-px h-3.5 bg-[#FFD700]/30 mx-0.5" />

          {/* Music Control / Options Opener */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open music and options menu"
            className={`touch-manipulation flex items-center gap-1.5 px-2.5 py-1 min-h-[32px] rounded-full transition-all active:scale-95 cursor-pointer [-webkit-tap-highlight-color:transparent] ${
              isPlaying
                ? 'bg-[#080808] text-[#FFD700] font-medium'
                : 'bg-transparent text-[#FFF4B8]/60'
            }`}
          >
            <div className="relative flex items-center justify-center shrink-0">
              <Music
                size={12}
                className={`transition-transform duration-300 ${
                  isPlaying ? 'text-[#FFD700] scale-105' : 'text-[#FFF4B8]/60'
                }`}
              />
              {isPlaying && (
                <span className="absolute -top-0.5 -right-0.5 flex h-1 w-1">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFD700] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1 w-1 bg-[#FFC107]"></span>
                </span>
              )}
            </div>

            <span className="text-[11px] font-semibold">
              {isPlaying ? (selectedTrack === 'track1' ? '♫ 1' : '♫ 2') : '🔇'}
            </span>

            {isPlaying ? (
              <Volume2 size={11} className="text-[#FFD700] shrink-0" />
            ) : (
              <VolumeX size={11} className="text-[#FFF4B8]/60 shrink-0" />
            )}

            <ChevronDown size={11} className="text-[#FFD700]/80 -mr-0.5" />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          3. MOBILE POPUP / OPTIONS MENU (Opened via compact pill)
         ───────────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-[80] sm:hidden"
            />

            {/* Floating Options Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="fixed top-[calc(max(0.6rem,env(safe-area-inset-top))+42px)] right-[max(0.6rem,env(safe-area-inset-right))] z-[85] w-[calc(100vw-1.5rem)] max-w-[310px] rounded-2xl bg-[#151515] backdrop-blur-2xl border border-[#FFD700]/40 shadow-2xl shadow-[#FFD700]/20 p-3.5 text-[#FFF4B8] font-sans-clean select-none sm:hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#FFD700]/25">
                <div className="flex items-center gap-1.5 text-[#FFD700] font-semibold text-xs">
                  <span className="text-sm">💛</span>
                  <span>{currentLanguage === 'hi' ? 'नियंत्रण और संगीत' : 'Music & Options'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 rounded-full text-[#FFD700] hover:bg-[#1E1E1E] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Song Selection */}
              <div className="space-y-1.5 mb-2.5">
                <div className="flex items-center justify-between text-[11px] text-[#FFF4B8]/80 font-medium px-0.5">
                  <span>{currentLanguage === 'hi' ? 'गीत चयन' : 'Song Selection'}</span>
                  <span className="text-[10px] text-[#FFD700] font-normal">
                    {isPlaying ? (currentLanguage === 'hi' ? 'बज रहा है ♫' : 'Now Playing ♫') : mutedLabel}
                  </span>
                </div>

                {/* Song 1 (Primary) */}
                <button
                  type="button"
                  onClick={() => switchTrack('track1')}
                  className={`w-full touch-manipulation flex items-center justify-between p-2 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                    selectedTrack === 'track1'
                      ? 'bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] text-[#080808] border-[#FFF4B8] shadow-sm shadow-[#FFD700]/30 font-semibold'
                      : 'bg-[#080808] hover:bg-[#1A1A1A] border-[#FFD700]/30 text-[#FFF4B8]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Music size={13} className={selectedTrack === 'track1' && isPlaying ? 'animate-pulse text-[#080808]' : 'opacity-70 text-[#FFD700]'} />
                    <div>
                      <p className="text-xs font-semibold leading-tight">{song1Label}</p>
                      <p className={`text-[10px] leading-tight ${selectedTrack === 'track1' ? 'text-[#080808]/80' : 'text-[#FFF4B8]/60'}`}>
                        {currentLanguage === 'hi' ? 'पहला गीत' : 'Primary Song'}
                      </p>
                    </div>
                  </div>
                  {selectedTrack === 'track1' && <Check size={14} className="text-[#080808] shrink-0" />}
                </button>

                {/* Song 2 (Secondary) */}
                {song2Url && (
                  <button
                    type="button"
                    onClick={() => switchTrack('track2')}
                    className={`w-full touch-manipulation flex items-center justify-between p-2 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                      selectedTrack === 'track2'
                        ? 'bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] text-[#080808] border-[#FFF4B8] shadow-sm shadow-[#FFD700]/30 font-semibold'
                        : 'bg-[#080808] hover:bg-[#1A1A1A] border-[#FFD700]/30 text-[#FFF4B8]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Music size={13} className={selectedTrack === 'track2' && isPlaying ? 'animate-pulse text-[#080808]' : 'opacity-70 text-[#FFD700]'} />
                      <div>
                        <p className="text-xs font-semibold leading-tight">{song2Label}</p>
                        <p className={`text-[10px] leading-tight ${selectedTrack === 'track2' ? 'text-[#080808]/80' : 'text-[#FFF4B8]/60'}`}>
                          {currentLanguage === 'hi' ? 'दूसरा गीत' : 'Secondary Song'}
                        </p>
                      </div>
                    </div>
                    {selectedTrack === 'track2' && <Check size={14} className="text-[#080808] shrink-0" />}
                  </button>
                )}

                {/* Smooth Switch Track Button (0 Delay) */}
                <button
                  type="button"
                  onClick={() => switchTrack()}
                  className="w-full touch-manipulation py-1.5 px-2 rounded-lg bg-[#080808] hover:bg-[#1A1A1A] text-[#FFD700] text-[11px] font-medium flex items-center justify-center gap-1.5 border border-[#FFD700]/30 transition-colors cursor-pointer"
                >
                  <ArrowLeftRight size={12} />
                  <span>{switchSongLabel || 'Switch Song'}</span>
                </button>
              </div>

              {/* Playback & Volume Toggle */}
              <div className="mb-2.5">
                <button
                  type="button"
                  onClick={toggleMute}
                  className={`w-full touch-manipulation flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-[#080808] border-[#FFD700]/50 text-[#FFD700] hover:bg-[#151515]'
                      : 'bg-[#080808] border-[#FFD700]/25 text-[#FFF4B8]/70 hover:bg-[#151515]'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Volume2 size={14} className="text-[#FFD700]" />
                      <span>{currentLanguage === 'hi' ? 'संगीत बज रहा है (म्यूट करें)' : 'Playing ♫ (Tap to Mute)'}</span>
                    </>
                  ) : (
                    <>
                      <VolumeX size={14} className="text-[#FFF4B8]/70" />
                      <span>{currentLanguage === 'hi' ? 'संगीत म्यूट है (बजाएं)' : 'Muted 🔇 (Tap to Play)'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Language Switcher in Menu */}
              {onToggleLanguage && (
                <div className="pt-2 border-t border-[#FFD700]/20">
                  <div className="flex items-center justify-between text-[11px] text-[#FFF4B8]/80 font-medium px-0.5 mb-1.5">
                    <div className="flex items-center gap-1">
                      <Languages size={12} className="text-[#FFD700]" />
                      <span>{currentLanguage === 'hi' ? 'भाषा' : 'Language'}</span>
                    </div>
                    <span className="text-[10px] text-[#FFD700]">
                      {currentLanguage === 'hi' ? 'हिन्दी' : 'English'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 p-0.5 bg-[#080808] rounded-xl border border-[#FFD700]/30">
                    <button
                      type="button"
                      onClick={() => {
                        if (currentLanguage !== 'en') onToggleLanguage();
                      }}
                      className={`touch-manipulation py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        currentLanguage === 'en'
                          ? 'bg-[#FFD700] text-[#080808] font-semibold shadow-xs'
                          : 'text-[#FFF4B8] hover:text-[#FFD700]'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (currentLanguage !== 'hi') onToggleLanguage();
                      }}
                      className={`touch-manipulation py-1.5 px-2 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                        currentLanguage === 'hi'
                          ? 'bg-[#FFD700] text-[#080808] font-semibold shadow-xs'
                          : 'text-[#FFF4B8] hover:text-[#FFD700]'
                      }`}
                    >
                      हिन्दी
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
