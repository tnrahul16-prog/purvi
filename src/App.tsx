/**
 * =======================================================================
 * 💛 PURVI'S BIRTHDAY SURPRISE - MAIN STORY EXPERIENCE
 * =======================================================================
 * Created by Rahul for Purvi.
 * A personal, warm, romantic, and deeply appreciative birthday surprise
 * celebrating the special love between Kerala 🌴 and Uttar Pradesh 🌸.
 * =======================================================================
 */

import React, { useState, useEffect } from 'react';
import { BIRTHDAY_CONFIG } from './config';
import { Language, TRANSLATIONS } from './translations';
import { TranslateButton } from './components/TranslateButton';
import { IntroLoader } from './components/IntroLoader';
import { OpeningScreen } from './components/OpeningScreen';
import { FloatingGardenBackground } from './components/FloatingGardenBackground';
import { PinkMagicTaps } from './components/PinkMagicTaps';
import { MusicPlayer } from './components/MusicPlayer';
import { WelcomeSection } from './components/WelcomeSection';
import { InternetStoryTimeline } from './components/InternetStoryTimeline';
import { FirstPhotoReveal } from './components/FirstPhotoReveal';
import { ThingsAboutFarha } from './components/ThingsAboutFarha';
import { AppreciationSection } from './components/AppreciationSection';
import { AcrossDistance } from './components/AcrossDistance';
import { SecondPhotoScrapbook } from './components/SecondPhotoScrapbook';
import { EvenWithoutMeeting } from './components/EvenWithoutMeeting';
import { ThirdPhotoLotusFrame } from './components/ThirdPhotoLotusFrame';
import { ThingsWeDoInFuture } from './components/ThingsWeDoInFuture';
import { ThankYouSection } from './components/ThankYouSection';

// Dynamic code splitting with React.lazy for downstream screens and heavy celebration sections
// Keeps the initial mobile bundle ultra-lightweight and blazingly fast on 2G/3G/4G networks
const IntroVideoScreen = React.lazy(() =>
  import('./components/IntroVideoScreen').then((m) => ({ default: m.IntroVideoScreen }))
);
const ThreeDNeonLotusTransition = React.lazy(() =>
  import('./components/ThreeDNeonLotusTransition').then((m) => ({ default: m.ThreeDNeonLotusTransition }))
);
const PostVideoInterlude = React.lazy(() =>
  import('./components/PostVideoInterlude').then((m) => ({ default: m.PostVideoInterlude }))
);
const InteractiveCake = React.lazy(() =>
  import('./components/InteractiveCake').then((m) => ({ default: m.InteractiveCake }))
);
const BirthdayLetter = React.lazy(() =>
  import('./components/BirthdayLetter').then((m) => ({ default: m.BirthdayLetter }))
);
const KeepsakeThought = React.lazy(() =>
  import('./components/KeepsakeThought').then((m) => ({ default: m.KeepsakeThought }))
);
const SecretEnvelope = React.lazy(() =>
  import('./components/SecretEnvelope').then((m) => ({ default: m.SecretEnvelope }))
);
const WebsiteGiftText = React.lazy(() =>
  import('./components/WebsiteGiftText').then((m) => ({ default: m.WebsiteGiftText }))
);
const FinalScene = React.lazy(() =>
  import('./components/FinalScene').then((m) => ({ default: m.FinalScene }))
);
const AssetCustomizerModal = React.lazy(() =>
  import('./components/AssetCustomizerModal').then((m) => ({ default: m.AssetCustomizerModal }))
);

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [introState, setIntroState] = useState<'loading' | 'gateway' | 'video' | 'lotus_bloom' | 'interlude' | 'main'>('loading');
  const hasEntered = introState === 'main';
  const isPrepared = introState === 'video' || introState === 'lotus_bloom' || introState === 'interlude' || introState === 'main';
  const showControls = introState !== 'video' && introState !== 'lotus_bloom';
  const [autoStartMusic, setAutoStartMusic] = useState(false);
  const [musicMood, setMusicMood] = useState<'normal' | 'emotional' | 'celebratory'>('normal');
  const [isDarkerAtmosphere, setIsDarkerAtmosphere] = useState(false);
  const [isCakeCutCompleted, setIsCakeCutCompleted] = useState(false);

  // Sync document direction and lang with current language
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = 'ltr';
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'hi' ? 'en' : 'hi'));
  };

  const t = TRANSLATIONS[language];

  // Dynamic asset paths (defaults to config, overridable in dev mode)
  const [assets, setAssets] = useState({
    photo1Url: BIRTHDAY_CONFIG.photo1Url,
    photo2Url: BIRTHDAY_CONFIG.photo2Url,
    photo3Url: BIRTHDAY_CONFIG.photo3Url,
    landscapeImgUrl: BIRTHDAY_CONFIG.landscapeImgUrl,
    birthdayImageUrl: BIRTHDAY_CONFIG.birthdayImageUrl,
    songUrl: BIRTHDAY_CONFIG.songUrl,
    song2Url: BIRTHDAY_CONFIG.song2Url,
    introVideoUrl: BIRTHDAY_CONFIG.introVideoUrl,
  });

  // Progressive background prefetching: primes downstream video, transitions & components during idle times
  useEffect(() => {
    // 1. Prime video metadata so it begins zero-latency streaming on user tap
    try {
      const v = document.createElement('video');
      v.preload = 'metadata';
      v.src = assets.introVideoUrl;
    } catch {}

    // 2. Prefetch video & lotus bloom components during initial loader
    const timer1 = setTimeout(() => {
      import('./components/IntroVideoScreen');
      import('./components/ThreeDNeonLotusTransition');
    }, 1000);

    // 3. Prefetch cake & finale celebration components
    const timer2 = setTimeout(() => {
      import('./components/InteractiveCake');
      import('./components/BirthdayLetter');
      import('./components/KeepsakeThought');
      import('./components/SecretEnvelope');
      import('./components/WebsiteGiftText');
      import('./components/FinalScene');
    }, 3500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [assets.introVideoUrl]);

  const stopAllMedia = React.useCallback(() => {
    try {
      document.querySelectorAll('audio, video').forEach((el) => {
        const media = el as HTMLMediaElement;
        try {
          media.pause();
          media.currentTime = 0;
        } catch {}
      });
    } catch {}
  }, []);

  // Stop all audio/video playback when refreshing or navigating away
  useEffect(() => {
    const handlePageUnload = () => {
      stopAllMedia();
    };
    window.addEventListener('beforeunload', handlePageUnload);
    window.addEventListener('pagehide', handlePageUnload);
    return () => {
      window.removeEventListener('beforeunload', handlePageUnload);
      window.removeEventListener('pagehide', handlePageUnload);
    };
  }, [stopAllMedia]);

  const handleOpenSurprise = React.useCallback(() => {
    // Stop any residual media before starting video
    stopAllMedia();
    setAutoStartMusic(false);
    // Flow: Gateway -> 20s Intro Video -> Full Black Screen -> Realistic Lotus Bloom -> Existing Website Revealed
    setIntroState('video');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [stopAllMedia]);

  const handleVideoComplete = React.useCallback(() => {
    // Video ended -> Full Black Screen -> Realistic Lotus Bloom -> Existing Website Revealed
    stopAllMedia();
    setIntroState('lotus_bloom');
    setAutoStartMusic(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [stopAllMedia]);

  const handleLotusComplete = React.useCallback(() => {
    // Lotus finished blooming -> Smoothly reveal existing birthday website
    setIntroState('main');
    setAutoStartMusic(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleInterludeComplete = React.useCallback(() => {
    // Interlude finished -> Smoothly reveal main birthday website
    setIntroState('main');
    setAutoStartMusic(true);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleReplay = React.useCallback(() => {
    // Cleanly stop all media when taking the website again
    stopAllMedia();
    setAutoStartMusic(false);
    setIsCakeCutCompleted(false);
    setIsDarkerAtmosphere(false);
    setMusicMood('normal');
    setIntroState('gateway');
    try {
      if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    } catch {}
  }, [stopAllMedia]);

  const handleUpdateAssets = (newAssets: {
    photo1Url?: string;
    photo2Url?: string;
    photo3Url?: string;
    landscapeImgUrl?: string;
    birthdayImageUrl?: string;
    songUrl?: string;
    song2Url?: string;
    introVideoUrl?: string;
  }) => {
    setAssets((prev) => ({
      ...prev,
      ...newAssets,
    }));
  };

  return (
    <div
      className={`min-h-screen relative transition-colors duration-1000 ${
        isDarkerAtmosphere ? 'bg-[#080808] text-[#FFF4B8]' : 'bg-[#080808] text-[#FFF4B8]'
      }`}
    >
      {/* 🌸 Falling Flower Petals Animation (Restored with exact appearance, movement, timing, and effect) */}
      <FloatingGardenBackground
        reducedDensity={isDarkerAtmosphere}
        visible={introState !== 'video' && introState !== 'lotus_bloom' && introState !== 'interlude'}
        className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 transform-gpu will-change-transform ${
          introState === 'main' ? 'z-[30]' : 'z-[52]'
        }`}
      />

      {/* ✨ Interactive Pink Magic Particles on Touch/Click */}
      <PinkMagicTaps />

      {/* 🎀 SCREEN 1: CINEMATIC INTRO LOADER (Progressive loading sequence) */}
      {introState === 'loading' && (
        <IntroLoader
          steps={t.introLoader}
          onComplete={() => setIntroState('gateway')}
        />
      )}

      {/* 🌸 SCREEN 2: GATEWAY SCREEN (Personalized greeting & glowing open button) */}
      {introState === 'gateway' && (
        <OpeningScreen
          onOpen={handleOpenSurprise}
          greeting={t.opening.greeting}
          subheading={t.opening.subheading}
          ctaText={t.opening.ctaText}
          badge={t.opening.badge}
          language={language}
        />
      )}

      {/* 🎬 SCREEN 3: 20-SECOND VERTICAL INTRO VIDEO (Seamless 886x1920 mobile experience) */}
      {introState === 'video' && (
        <React.Suspense fallback={null}>
          <IntroVideoScreen
            videoUrl={assets.introVideoUrl}
            onComplete={handleVideoComplete}
            language={language}
          />
        </React.Suspense>
      )}

      {/* 🌸 SCREEN 4: FULL BLACK SCREEN & 3D NEON LOTUS BLOOM & BIRTHDAY TEXT TRANSITION */}
      {introState === 'lotus_bloom' && (
        <React.Suspense fallback={null}>
          <ThreeDNeonLotusTransition
            onComplete={handleLotusComplete}
            language={language}
          />
        </React.Suspense>
      )}

      {/* Legacy Post-Video Interlude (preserved in codebase) */}
      {introState === 'interlude' && (
        <React.Suspense fallback={null}>
          <PostVideoInterlude
            language={language}
            onProceed={handleInterludeComplete}
          />
        </React.Suspense>
      )}

      {/* 🌐 Translate Button (Visible at all times EXCEPT when video is playing; on mobile, integrated into unified control during main) */}
      {showControls && (
        <TranslateButton
          currentLanguage={language}
          onToggle={toggleLanguage}
          label={t.translateButtonLabel}
          ariaLabel={t.translateButtonAria}
          className={introState === 'main' ? 'hidden sm:flex' : 'flex'}
        />
      )}

      {/* 🎵 Background Music Player (Only appears when the main section starts after the video) */}
      {introState === 'main' && (
        <MusicPlayer
          songUrl={assets.songUrl}
          song2Url={assets.song2Url}
          autoStartRequested={autoStartMusic}
          mood={musicMood}
          farhaSongLabel={t.musicPlayer.farhaSong}
          song1Label={t.musicPlayer.song1}
          song2Label={t.musicPlayer.song2}
          switchSongLabel={t.musicPlayer.switchSong}
          mutedLabel={t.musicPlayer.muted}
          tapToPlayLabel={t.musicPlayer.tapToPlay}
          currentLanguage={language}
          onToggleLanguage={toggleLanguage}
          languageLabel={t.translateButtonLabel}
        />
      )}

      {/* 🌸 MAIN STORY JOURNEY (Prepared silently in background while video plays) */}
      {isPrepared && (
        <main
          className={`relative z-20 pb-20 transition-opacity duration-1000 ease-out ${
            introState === 'main'
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none fixed inset-0 overflow-hidden'
          }`}
        >
          {/* 🌷 1. Welcome Section */}
          <WelcomeSection
            photoUrl={assets.photo1Url}
            badge={t.welcome.badge}
            title={t.welcome.title}
            intro={t.welcome.intro}
            instruction={t.welcome.instruction}
            scrollHint={t.welcome.scrollHint}
          />

          {/* 💻 2. Our Little Internet Story (Kerala 🌴 ⟷ Uttar Pradesh 🌸) */}
          <InternetStoryTimeline
            badge={t.internetStory.badge}
            title={t.internetStory.title}
            subtitle={t.internetStory.subtitle}
            steps={t.internetStory.steps}
          />

          {/* 📸 3. First Photo: Cinematic Reveal */}
          <FirstPhotoReveal
            photoUrl={assets.photo1Url}
            captionTitle={t.photo1Section.captionTitle}
            captionSubtitle={t.photo1Section.captionSubtitle}
            memoryBadge={t.photo1Section.memoryBadge}
            fallbackTitle={t.photo1Section.fallbackTitle}
            fallbackSubtitle={t.photo1Section.fallbackSubtitle}
          />

          {/* 🌷 4. Things I've Learned About Farha (Interactive cards) */}
          <ThingsAboutFarha
            badge={t.thingsLearned.badge}
            title={t.thingsLearned.title}
            tapHint={t.thingsLearned.tapHint}
            items={t.thingsLearned.items}
          />

          {/* 💗 5. Appreciation Section (Heartfelt cards) */}
          <AppreciationSection
            title={t.appreciation.title}
            cards={t.appreciation.cards}
            badge={t.appreciation.badge}
            tapToRevealHint={t.appreciation.tapToRevealHint}
          />

          {/* 🌍 6. Across The Distance (Kerala 🌴 ⟷ Uttar Pradesh 🌸) */}
          <AcrossDistance
            badge={t.acrossDistance.badge}
            title={t.acrossDistance.title}
            indiaLabel={t.acrossDistance.indiaLabel}
            egyptLabel={t.acrossDistance.egyptLabel}
            milesApart={t.acrossDistance.milesApart}
            line1={t.acrossDistance.line1}
            line2={t.acrossDistance.line2}
            line3={t.acrossDistance.line3}
            line4={t.acrossDistance.line4}
            note={t.acrossDistance.note}
          />

          {/* 📸 7. Second Photo: Scrapbook Moment */}
          <SecondPhotoScrapbook
            photoUrl={assets.photo2Url}
            title={t.photo2Section.title}
            subtitle={t.photo2Section.subtitle}
            scrapbookTag={t.photo2Section.scrapbookTag}
            fallbackTitle={t.photo2Section.fallbackTitle}
            fallbackSubtitle={t.photo2Section.fallbackSubtitle}
          />

          {/* 💭 8. Even Without Meeting (Deep reflection on real friendship) */}
          <EvenWithoutMeeting
            badge={t.evenWithoutMeeting.badge}
            title={t.evenWithoutMeeting.title}
            lines={t.evenWithoutMeeting.lines}
            closing={t.evenWithoutMeeting.closing}
          />

          {/* 🪷 8b. Third Photo: Lotus Grace & Serenity */}
          <ThirdPhotoLotusFrame
            photoUrl={assets.photo3Url}
            badge={t.photo3Section.badge}
            title={t.photo3Section.title}
            subtitle={t.photo3Section.subtitle}
            quote={t.photo3Section.quote}
            fallbackTitle={t.photo3Section.fallbackTitle}
            fallbackSubtitle={t.photo3Section.fallbackSubtitle}
          />

          {/* 🌟 9. Things We Do in Future (Our Forever Dreams & Promises) */}
          <ThingsWeDoInFuture
            badge={t.thingsInFuture.badge}
            title={t.thingsInFuture.title}
            subtitle={t.thingsInFuture.subtitle}
            items={t.thingsInFuture.items}
            sealPromiseText={t.thingsInFuture.sealPromiseText}
            promiseSealedText={t.thingsInFuture.promiseSealedText}
            progressText={t.thingsInFuture.progressText}
            sealAllButton={t.thingsInFuture.sealAllButton}
            allSealedCelebrationTitle={t.thingsInFuture.allSealedCelebrationTitle}
            allSealedCelebrationDesc={t.thingsInFuture.allSealedCelebrationDesc}
            signature={t.thingsInFuture.signature}
          />

          {/* 🥹 10. Thank-You Section (Emotional messages) */}
          <ThankYouSection
            badge={t.thankYou.badge}
            title={t.thankYou.title}
            messages={t.thankYou.messages}
            highlightTitle={t.thankYou.highlightTitle}
            highlightText={t.thankYou.highlightText}
          />

          {/* 🎂 10. Build-up, Interactive Cake, Candle Blowout, Cake Cutting & Happy Birthday Reveal */}
          <React.Suspense fallback={null}>
            <InteractiveCake
              birthdayImageUrl={assets.birthdayImageUrl}
              introTransitionText={t.cakeIntro.transitionText}
              introBuildUpText={t.cakeIntro.buildUpText}
              revealButtonText={t.cakeIntro.revealButton}
              revealInstructionText={t.cakeIntro.clickHereInstruction}
              traditionBadgeText={t.cakeIntro.traditionBadge}
              wishPromptText={t.cake.wishPrompt}
              wishButtonText={t.cake.wishButtonText}
              tapCakeHintText={t.cake.tapCakeHint}
              wishingStatusText={t.cake.wishingStatus}
              blowingCandlesText={t.cake.blowingCandles}
              candleOutWishRevealedText={t.cake.candleOutWishRevealed}
              candlesOutPromptText={t.cake.candlesOutPrompt}
              cutButtonText={t.cake.cutButtonText}
              cuttingStatusText={t.cake.cuttingStatus}
              cutCakeTitleText={t.cake.cutCakeTitle}
              yayTitleText={t.cake.yayTitle}
              postCutTitleText={t.cake.postCutTitle}
              postCutSubtitleText={t.cake.postCutSubtitle}
              scrollDownHintText={t.cake.scrollDownHint}
              happyBirthdayFallbackText={t.cake.happyBirthdayFallback}
              onCakeCutCompleted={() => {
                setIsCakeCutCompleted(true);
                setMusicMood('normal');
              }}
              onMoodChange={setMusicMood}
              onAtmosphereChange={setIsDarkerAtmosphere}
            />

            {/* 💌 11. Personal Birthday Letter (Unlocked after cake cutting) */}
            {isCakeCutCompleted && (
              <>
                <BirthdayLetter
                  title={t.letter.title}
                  salutation={t.letter.salutation}
                  paragraphs={t.letter.paragraphs}
                  closingRemark={t.letter.closingRemark}
                  senderName={t.senderName}
                  badge={t.letter.badge}
                  bffBadge={t.letter.bffBadge}
                  birthdaySpecialTag={t.letter.birthdaySpecialTag}
                />

                {/* 🎀 11b. Just Something I Wanted to Keep... (Quiet memory & thought) */}
                <KeepsakeThought
                  title={t.keepsake.title}
                  teaser={t.keepsake.teaser}
                  openButtonText={t.keepsake.openButton}
                  lines={t.keepsake.lines}
                  finalQuote={t.keepsake.finalHeartQuote}
                  language={language}
                />

                {/* 💌 12. Secret Envelope ('One Last Thing 👀') */}
                <SecretEnvelope
                  title={t.secretEnvelope.title}
                  buttonText={t.secretEnvelope.buttonText}
                  message={t.secretEnvelope.message}
                  sealTag={t.secretEnvelope.sealTag}
                  footerNote={t.secretEnvelope.footerNote}
                  preBuildup={t.secretEnvelope.preBuildup}
                  language={language}
                />

                {/* 🌸 13. Consider This Website As A Gift (Text) */}
                <WebsiteGiftText
                  message={t.giftText.message}
                  subtext={t.giftText.subtext}
                  forFarhaTag={t.giftText.forFarhaTag}
                />

                {/* 🌙 14. Dreamy Final Birthday Scene & Replay */}
                <FinalScene
                  mainHeading={t.finalScene.mainHeading}
                  wishes={t.finalScene.wishes}
                  keepSmiling={t.finalScene.keepSmiling}
                  bestWishesDistance={t.finalScene.bestWishesDistance}
                  makeAWishButton={t.finalScene.makeAWishButton}
                  wishCelebratedTitle={t.finalScene.wishCelebratedTitle}
                  wishCelebratedMessage={t.finalScene.wishCelebratedMessage}
                  madeWithLove={t.finalScene.madeWithLove}
                  signature={t.finalScene.signature}
                  replayButton={t.finalScene.replayButton}
                  onReplay={handleReplay}
                  language={language}
                />
              </>
            )}
          </React.Suspense>
        </main>
      )}

      {/* 🛠️ Rahul's Asset Setup Guide & Live Tester Modal (dev-only or Shift+D) */}
      <React.Suspense fallback={null}>
        <AssetCustomizerModal
          currentPhoto1={assets.photo1Url}
          currentPhoto2={assets.photo2Url}
          currentPhoto3={assets.photo3Url}
          currentLandscapeImage={assets.landscapeImgUrl}
          currentBirthdayImage={assets.birthdayImageUrl}
          currentSong={assets.songUrl}
          currentSong2={assets.song2Url}
          currentIntroVideo={assets.introVideoUrl}
          onUpdateAssets={handleUpdateAssets}
        />
      </React.Suspense>
    </div>
  );
}
