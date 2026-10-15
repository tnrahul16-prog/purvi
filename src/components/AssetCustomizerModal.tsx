import React, { useState } from 'react';
import { Settings, Image as ImageIcon, Music, Video, X, Check, Upload, HelpCircle } from 'lucide-react';
import { LotusFlower } from './LotusFlower';

interface AssetCustomizerModalProps {
  currentPhoto1: string;
  currentPhoto2: string;
  currentPhoto3?: string;
  currentLandscapeImage?: string;
  currentBirthdayImage: string;
  currentSong: string;
  currentSong2?: string;
  currentIntroVideo?: string;
  onUpdateAssets: (newAssets: {
    photo1Url?: string;
    photo2Url?: string;
    photo3Url?: string;
    landscapeImgUrl?: string;
    birthdayImageUrl?: string;
    songUrl?: string;
    song2Url?: string;
    introVideoUrl?: string;
  }) => void;
}

export const AssetCustomizerModal: React.FC<AssetCustomizerModalProps> = ({
  currentPhoto1,
  currentPhoto2,
  currentPhoto3,
  currentLandscapeImage,
  currentBirthdayImage,
  currentSong,
  currentSong2,
  currentIntroVideo,
  onUpdateAssets,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDevMode, setIsDevMode] = useState(false);

  React.useEffect(() => {
    // Check if URL specifies developer mode
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('dev') === 'true' || window.location.hash === '#dev') {
      setIsDevMode(true);
    }

    // Keyboard shortcut Shift + D to toggle dev mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        setIsDevMode((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'photo1' | 'photo2' | 'photo3' | 'landscapeImage' | 'birthdayImage' | 'song' | 'song2' | 'introVideo'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    if (type === 'photo1') onUpdateAssets({ photo1Url: fileUrl });
    if (type === 'photo2') onUpdateAssets({ photo2Url: fileUrl });
    if (type === 'photo3') onUpdateAssets({ photo3Url: fileUrl });
    if (type === 'landscapeImage') onUpdateAssets({ landscapeImgUrl: fileUrl, birthdayImageUrl: fileUrl });
    if (type === 'birthdayImage') onUpdateAssets({ birthdayImageUrl: fileUrl });
    if (type === 'song') onUpdateAssets({ songUrl: fileUrl });
    if (type === 'song2') onUpdateAssets({ song2Url: fileUrl });
    if (type === 'introVideo') onUpdateAssets({ introVideoUrl: fileUrl });
  };

  return (
    <>
      {/* Developer Trigger Button - hidden by default unless ?dev=true or Shift+D */}
      {isDevMode && (
        <div className="fixed bottom-4 left-4 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#151515]/90 hover:bg-[#1f1f1f] text-[#FFD700] border border-[#FFD700]/30 shadow-lg backdrop-blur-md text-xs font-medium transition-all hover:scale-105 cursor-pointer"
            title="Purvi's Asset Setup (Dev Only)"
          >
            <LotusFlower size={14} variant="gold" />
            <span>Asset Setup (Dev)</span>
          </button>
        </div>
      )}

      {/* Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-md rounded-3xl bg-[#151515] border border-[#FFD700]/30 p-6 shadow-2xl space-y-5 text-white max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#FFD700]/20">
              <div className="flex items-center gap-2">
                <LotusFlower size={20} variant="gold" />
                <h4 className="font-display text-lg font-bold text-[#FFD700]">
                  Asset Setup Guide
                </h4>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-full text-zinc-400 hover:text-[#FFD700] hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <div className="text-xs text-[#FFF4B8]/80 space-y-2 leading-relaxed bg-[#080808]/80 p-3.5 rounded-xl border border-[#FFD700]/20">
              <p className="font-semibold text-[#FFD700] flex items-center gap-1">
                <HelpCircle size={14} className="text-[#FFC107]" />
                How to add your real files:
              </p>
              <p>
                1. <strong>Direct File Mode (Permanent):</strong> Drop your files directly into the project's <code className="bg-[#151515] px-1.5 py-0.5 rounded border border-[#FFD700]/30 text-[#FFD700]">public/</code> folder with these names:
              </p>
              <ul className="list-disc pl-5 space-y-0.5 font-mono text-[11px] text-[#FFF4B8]">
                <li>/public/intro-video.mp4</li>
                <li>/public/photo1.png</li>
                <li>/public/photo2.png</li>
                <li>/public/photo3.png</li>
                <li>/public/happy-birthday-farha.png</li>
                <li>/public/landscapeimg.png</li>
                <li>/public/baby-doll-song.mp3 (Samjhawan)</li>
                <li>/public/farha-song.mp3 (Song 2)</li>
              </ul>
              <p>
                2. <strong>Live Preview Tester (Instant):</strong> You can also choose files below to test them right here in the live preview window without waiting!
              </p>
            </div>

            {/* Instant File Pickers */}
            <div className="space-y-3 pt-1">
              {/* Intro Video */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#FFD700]/20 bg-[#080808]/60">
                <div>
                  <p className="text-xs font-semibold text-white">20s Vertical Intro Video</p>
                  <p className="text-[11px] text-zinc-400">Target: /intro-video.mp4</p>
                </div>
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium border border-[#FFD700]/30 flex items-center gap-1 transition-colors">
                  <Video size={13} />
                  <span>Choose</span>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => handleFileUpload(e, 'introVideo')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Photo 1 */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#FFD700]/20 bg-[#080808]/60">
                <div>
                  <p className="text-xs font-semibold text-white">Purvi Photo 1</p>
                  <p className="text-[11px] text-zinc-400">Target: /photo1.png</p>
                </div>
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium border border-[#FFD700]/30 flex items-center gap-1 transition-colors">
                  <Upload size={13} />
                  <span>Choose</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'photo1')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Photo 2 */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#FFD700]/20 bg-[#080808]/60">
                <div>
                  <p className="text-xs font-semibold text-white">Purvi Photo 2 (Scrapbook)</p>
                  <p className="text-[11px] text-zinc-400">Target: /photo2.png</p>
                </div>
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium border border-[#FFD700]/30 flex items-center gap-1 transition-colors">
                  <Upload size={13} />
                  <span>Choose</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'photo2')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Photo 3 */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#FFD700]/20 bg-[#080808]/60">
                <div>
                  <p className="text-xs font-semibold text-white">Purvi Photo 3 (Lotus Grace)</p>
                  <p className="text-[11px] text-zinc-400">Target: /photo3.png</p>
                </div>
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium border border-[#FFD700]/30 flex items-center gap-1 transition-colors">
                  <Upload size={13} />
                  <span>Choose</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'photo3')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Landscape Image */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#FFD700]/20 bg-[#080808]/60">
                <div>
                  <p className="text-xs font-semibold text-white">Landscape Image / Banner</p>
                  <p className="text-[11px] text-zinc-400">Target: /landscapeimg.png</p>
                </div>
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium border border-[#FFD700]/30 flex items-center gap-1 transition-colors">
                  <Upload size={13} />
                  <span>Choose</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'landscapeImage')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Birthday Image */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#FFD700]/20 bg-[#080808]/60">
                <div>
                  <p className="text-xs font-semibold text-white">Happy Birthday Image</p>
                  <p className="text-[11px] text-zinc-400">Target: /happy-birthday-farha.png</p>
                </div>
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium border border-[#FFD700]/30 flex items-center gap-1 transition-colors">
                  <Upload size={13} />
                  <span>Choose</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e, 'birthdayImage')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Song 1 */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#FFD700]/20 bg-[#080808]/60">
                <div>
                  <p className="text-xs font-semibold text-white">Samjhawan (Primary / Default)</p>
                  <p className="text-[11px] text-zinc-400">Target: /baby-doll-song.mp3</p>
                </div>
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium border border-[#FFD700]/30 flex items-center gap-1 transition-colors">
                  <Music size={13} />
                  <span>Choose</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileUpload(e, 'song')}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Song 2 */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-[#FFD700]/20 bg-[#080808]/60">
                <div>
                  <p className="text-xs font-semibold text-white">Special Song (Secondary Option)</p>
                  <p className="text-[11px] text-zinc-400">Target: /farha-song.mp3</p>
                </div>
                <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-[#FFD700]/10 hover:bg-[#FFD700]/20 text-[#FFD700] text-xs font-medium border border-[#FFD700]/30 flex items-center gap-1 transition-colors">
                  <Music size={13} />
                  <span>Choose</span>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileUpload(e, 'song2')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FFD700] to-[#FFC107] text-[#080808] font-bold text-xs hover:brightness-110 transition-all shadow-md cursor-pointer"
            >
              Done & Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
