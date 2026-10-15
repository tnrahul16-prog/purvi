export type Language = 'hi' | 'en';

import { HINDI_TRANSLATIONS } from './hindiTranslations';

export interface SiteContent {
  recipientName: string;
  playfulNickname: string;
  senderName: string;

  // Translate toggle labels
  translateButtonLabel: string;
  translateButtonAria: string;

  // Intro Loader (Screen 0)
  introLoader: {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    skip: string;
  };

  // Screen 1: Opening
  opening: {
    greeting: string;
    subheading: string;
    ctaText: string;
    badge: string;
  };

  // Screen 2: Welcome
  welcome: {
    badge: string;
    title: string;
    intro: string;
    instruction: string;
    scrollHint: string;
  };

  // Screen 3: Photo 1
  photo1Section: {
    captionTitle: string;
    captionSubtitle: string;
    memoryBadge: string;
    fallbackTitle: string;
    fallbackSubtitle: string;
  };

  // Our Little Internet Story
  internetStory: {
    badge: string;
    title: string;
    subtitle: string;
    steps: Array<{
      id: string;
      title: string;
      desc: string;
      icon: string;
    }>;
  };

  // Screen 4: Appreciation
  appreciation: {
    badge: string;
    title: string;
    tapToRevealHint: string;
    cards: Array<{
      id: string;
      text: string;
      extra?: string;
    }>;
  };

  // Screen 5: Photo 2
  photo2Section: {
    title: string;
    subtitle: string;
    scrapbookTag: string;
    fallbackTitle: string;
    fallbackSubtitle: string;
  };

  // Photo 3: Lotus Grace & Radiance
  photo3Section: {
    badge: string;
    title: string;
    subtitle: string;
    quote: string;
    fallbackTitle: string;
    fallbackSubtitle: string;
  };

  // Things I Love About Purvi
  thingsLearned: {
    badge: string;
    title: string;
    tapHint: string;
    items: Array<{
      id: string;
      tag: string;
      teaser: string;
      reveal: string;
      emoji: string;
    }>;
  };

  // Across the Distance
  acrossDistance: {
    badge: string;
    title: string;
    indiaLabel: string;
    egyptLabel: string;
    milesApart: string;
    line1: string;
    line2: string;
    line3: string;
    line4: string;
    note: string;
  };

  // Even Without Meeting
  evenWithoutMeeting: {
    badge: string;
    title: string;
    lines: string[];
    closing: string;
  };

  // Screen 6: Thank You
  thankYou: {
    badge: string;
    title: string;
    messages: Array<{ id: string; text: string }>;
    highlightTitle: string;
    highlightText: string;
  };

  // Screen 7: Cake Build-Up
  cakeIntro: {
    transitionText: string;
    buildUpText: string;
    revealButton: string;
    traditionBadge: string;
    clickHereInstruction: string;
  };

  // Screen 8 & 9: Cake & Cutting
  cake: {
    wishPrompt: string;
    wishButtonText: string;
    tapCakeHint: string;
    wishingStatus: string;
    blowingCandles: string;
    candleOutWishRevealed: string;
    candlesOutPrompt: string;
    cutButtonText: string;
    cuttingStatus: string;
    cutCakeTitle: string;
    yayTitle: string;
    postCutTitle: string;
    postCutSubtitle: string;
    scrollDownHint: string;
    happyBirthdayFallback: string;
  };

  // Screen 10: Birthday Letter
  letter: {
    badge: string;
    title: string;
    salutation: string;
    paragraphs: string[];
    closingRemark: string;
    bffBadge: string;
    birthdaySpecialTag: string;
  };

  // Screen 10b: A Forever Promise (Keepsake)
  keepsake: {
    title: string;
    teaser: string;
    openButton: string;
    lines: string[];
    finalHeartQuote: string;
  };

  // Screen 11: Secret Envelope
  secretEnvelope: {
    preBuildup: string;
    title: string;
    buttonText: string;
    message: string;
    sealTag: string;
    footerNote: string;
  };

  // Screen 12: Consider This Website As A Gift
  giftText: {
    message: string;
    subtext: string;
    forFarhaTag: string;
  };

  // Screen 13: Final Scene
  finalScene: {
    mainHeading: string;
    wishes: string;
    keepSmiling: string;
    bestWishesDistance: string;
    makeAWishButton: string;
    wishCelebratedTitle: string;
    wishCelebratedMessage: string;
    madeWithLove: string;
    signature: string;
    replayButton: string;
  };

  // Music Player
  musicPlayer: {
    farhaSong: string;
    song1: string;
    song2: string;
    switchSong: string;
    muted: string;
    tapToPlay: string;
  };
}

export const TRANSLATIONS: Record<Language, SiteContent> = {
  // =========================================================================
  // 🇮🇳 HINDI
  // =========================================================================
  hi: HINDI_TRANSLATIONS,

  // =========================================================================
  // 🇬🇧 ENGLISH
  // =========================================================================
  en: {
    recipientName: 'Purvi',
    playfulNickname: 'My Love',
    senderName: 'Rahul',

    translateButtonLabel: 'हिन्दी में अनुवाद करें 🇮🇳',
    translateButtonAria: 'Switch language to Hindi',

    introLoader: {
      step1: 'Preparing something special for Purvi… 💛',
      step2: 'Adding golden starlight… ✨',
      step3: 'Sprinkling birthday magic… 🌟',
      step4: 'Almost ready, my love… 💖',
      step5: 'Okay… let’s begin, babyyy. 💛',
      skip: 'Skip',
    },

    opening: {
      greeting: 'Hey Purvi… 💛',
      subheading: 'I made something special for you.',
      ctaText: 'Open Your Surprise 💛',
      badge: 'A Birthday Surprise for Purvi 💛',
    },

    welcome: {
      badge: 'For My Girlfriend & Future Wife 💛',
      title: 'Welcome, My Love 💛',
      intro: 'Okay Purvi… your birthday surprise officially starts here... 😌💛',
      instruction: 'Scroll slowly... I poured my whole heart into this for you...',
      scrollHint: 'Keep scrolling, babyyy',
    },

    photo1Section: {
      captionTitle: 'Those Eyes. ❤️',
      captionSubtitle: 'Honestly, loving you is the easiest thing in the world. 😌💛',
      memoryBadge: 'My Favorite Memory',
      fallbackTitle: 'Purvi (My Love)',
      fallbackSubtitle: 'Place your file at /public/photo1.png',
    },

    internetStory: {
      badge: 'Our Story 🌍',
      title: 'How Two Strangers Became Soulmates 🌍',
      subtitle: 'How our paths crossed on the internet and you became the love of my life, my other half, and my future wife.',
      steps: [
        {
          id: 'step-1',
          title: 'Somewhere on the internet… 🌍',
          desc: 'Out of billions of people in this world, destiny brought us together.',
          icon: 'globe',
        },
        {
          id: 'step-2',
          title: 'We started talking. 💬',
          desc: 'Just casual messages at first, with no idea you would soon become my whole world.',
          icon: 'message',
        },
        {
          id: 'step-3',
          title: 'Random conversations became my favorite part of every day. ☕',
          desc: 'Talking about everything and nothing at all, falling for you a little more each day.',
          icon: 'coffee',
        },
        {
          id: 'step-4',
          title: 'Miles apart, different cities. ✈️',
          desc: 'Thousands of miles could never weaken what our hearts felt for each other.',
          icon: 'plane',
        },
        {
          id: 'step-5',
          title: 'Love bridged every distance. ✨',
          desc: 'Proving that distance means nothing when someone means everything to you.',
          icon: 'sparkles',
        },
        {
          id: 'step-6',
          title: 'You became my girlfriend, my best friend, and my future wife. 💛',
          desc: 'The girl I love with all my heart, and the one I want to spend my entire life with.',
          icon: 'heart',
        },
        {
          id: 'step-7',
          title: 'And now… it’s your birthday, baby! 🎂💛',
          desc: 'Celebrating you today with all my love, warmth, and all of my heart.',
          icon: 'cake',
        },
      ],
    },

    appreciation: {
      badge: 'From the Bottom of My Heart 💛',
      title: 'A Few Things I Love and Appreciate About You… 💛',
      tapToRevealHint: 'Tap any card to reveal a note from my heart 💛',
      cards: [
        {
          id: 'app-1',
          text: 'Your radiant smile ❤️',
          extra: 'It genuinely lights up my darkest days. Never let anything take that beautiful smile away. 💛',
        },
        {
          id: 'app-2',
          text: 'Your gentle, caring heart 🌸',
          extra: 'A pure and selfless soul that always cares so deeply and makes the world a warmer place.',
        },
        {
          id: 'app-3',
          text: 'Your silly jokes and childish laughter 😂',
          extra: 'Those adorable, funny moments that make me fall in love with you all over again! 😂',
        },
        {
          id: 'app-4',
          text: 'The way you turn ordinary moments into magic ✨',
          extra: 'Just hearing your voice turns any normal day into a cherished memory.',
        },
        {
          id: 'app-5',
          text: 'The way you always believe in me',
          extra: 'You give me strength, confidence, and courage even when I doubt myself.',
        },
        {
          id: 'app-6',
          text: 'The comfort and warmth of being with you',
          extra: 'No judgment, no pretenses—with you, I am truly at peace and at home.',
        },
        {
          id: 'app-7',
          text: 'And simply… you being Purvi. 💛',
          extra: 'My girlfriend, my partner, and my future wife. You are my greatest dream come true.',
        },
      ],
    },

    photo2Section: {
      title: 'And then there’s just… you. 💛',
      subtitle: 'The most beautiful girl in my world.',
      scrapbookTag: 'A precious moment etched in my heart forever',
      fallbackTitle: 'Photo 2 (Purvi)',
      fallbackSubtitle: 'Place your file at /public/photo2.png',
    },

    photo3Section: {
      badge: 'Lotus Grace & Serenity 🪷',
      title: 'A Soul as Pure and Graceful as a Lotus 💛',
      subtitle: 'Gentle, elegant, and bringing pure peace into my life.',
      quote: '“Some people don’t just enter your life—they bring peace, warmth, and lifelong love into it.”',
      fallbackTitle: 'Photo 3 (Lotus Grace)',
      fallbackSubtitle: 'Place your file at /public/photo3.png',
    },

    thingsLearned: {
      badge: 'Special Things 🎀',
      title: 'Things I Love About Purvi 💛',
      tapHint: 'Tap each card to reveal 💛',
      items: [
        {
          id: 'tl-1',
          tag: 'Favorite Colors 🌸',
          teaser: 'Her favorite colors in order… 🌸',
          reveal: 'Pink, Purple, Blue, then Green! But today, this entire royal world is dressed in elegant Yellow & Black for my queen! 👑💛',
          emoji: '🌸',
        },
        {
          id: 'tl-2',
          tag: 'Her Adorable Laugh 😂',
          teaser: 'A little thing that makes her laugh… 😂',
          reveal: 'Random silly conversations and cute funny clips that brighten up even our hardest days! 😂',
          emoji: '😂',
        },
        {
          id: 'tl-3',
          tag: 'Her Superpower ✨',
          teaser: 'Her superpower that lifts me up… ✨',
          reveal: 'She has a natural gift of motivating me whenever I feel down, lifting me up with unconditional love.',
          emoji: '✨',
        },
        {
          id: 'tl-4',
          tag: 'Her Pure Heart 💛',
          teaser: 'Something genuinely rare about her… 💛',
          reveal: 'Her kindness and warmth make our love feel like the safest and most beautiful haven in the world.',
          emoji: '💛',
        },
        {
          id: 'tl-5',
          tag: 'Standing by Me ❤️',
          teaser: 'Being there through every storm… ❤️',
          reveal: 'She’s the one who stays by my side, listens to my heart, and loves me completely through everything.',
          emoji: '❤️',
        },
        {
          id: 'tl-6',
          tag: 'Birthday Rule 😌',
          teaser: 'One undisputed birthday rule… 😌',
          reveal: 'Purvi deserves the absolute best, most magical birthday in the entire world. No arguments accepted! 😌💛',
          emoji: '👑',
        },
      ],
    },

    acrossDistance: {
      badge: 'Across The Miles 🌍',
      title: 'Connected Across The Miles ✈️ 💛',
      indiaLabel: 'Kerala 🌴',
      egyptLabel: 'Uttar Pradesh 🌸',
      milesApart: 'Kerala ➔ UP (~2,400 km)',
      line1: 'From the serene backwaters of Kerala to beautiful Uttar Pradesh…',
      line2: 'Over 2,400 kilometers apart, living under different skies.',
      line3: 'Yet love bridged every single mile, bringing my heart right to yours.',
      line4: 'Distance can never keep us apart — we share our laughs, our dreams, our hearts, and our future together.',
      note: 'Distance means so little when you mean the world to me. Always yours 💛',
    },

    evenWithoutMeeting: {
      badge: 'Soulmates Across Distance 💛',
      title: 'Even Without Meeting… 🥹',
      lines: [
        'We don’t have hundreds of photographs together yet.',
        'We don’t have years of sitting side-by-side every day.',
        'But somehow…',
        'You’ve become the keeper of my heart and the love of my life.',
        'You became my girlfriend, my best friend, and my future wife.',
        'I thank the universe every day that our paths crossed.',
      ],
      closing: 'Having you in my life is my greatest blessing, Purvi 💛',
    },

    thankYou: {
      badge: 'From My Heart 💛',
      title: 'Things I Probably Don’t Say Enough… 💛',
      messages: [
        {
          id: 'ty-1',
          text: 'Thank you for being there during my bad times, even when I didn’t know how to explain what I was feeling.',
        },
        {
          id: 'ty-2',
          text: 'Thank you for listening when I just needed someone to hear me, thank you for loving me so patiently...',
        },
        {
          id: 'ty-3',
          text: 'Thank you for believing in me and motivating me whenever I started doubting myself.',
        },
        {
          id: 'ty-4',
          text: 'Thank you for every random conversation that turned a hard day into a joyful one.',
        },
        {
          id: 'ty-5',
          text: 'Thank you for making me smile and laugh when I didn’t feel like smiling at all...',
        },
        {
          id: 'ty-6',
          text: 'Thank you for all the little things you do that show me how deeply you care...',
        },
      ],
      highlightTitle: 'Most importantly…',
      highlightText:
        'Thank you for simply being you, Purvi. You are not just my love, you are the person I want to spend my entire life with.... ❤️',
    },

    cakeIntro: {
      transitionText: 'Okay babyyy… enough emotional stuff for a moment, hahahaha! 👀',
      buildUpText: 'There’s still one very important thing missing…',
      revealButton: 'Reveal It 🎂💛',
      traditionBadge: 'Birthday Tradition',
      clickHereInstruction: 'Click here 👆',
    },

    cake: {
      wishPrompt: 'Make a Wish, Purvi...✨',
      wishButtonText: 'Make Your Wish..💛',
      tapCakeHint: 'Tap the cake to blow out the candles 🌬️',
      wishingStatus: 'Closing your eyes and making a wish…',
      blowingCandles: 'Blowing out the candles… 🌬️',
      candleOutWishRevealed: 'May this year bring you endless happiness, my love. 💛',
      candlesOutPrompt: 'Okay… now we cut the cake, babyyy! 🎂😭💛',
      cutButtonText: 'Cut the Cake 💛',
      cuttingStatus: 'Cutting Purvi’s birthday slice… 🎂✨',
      cutCakeTitle: 'Cutting Purvi’s birthday cake… 💛',
      yayTitle: 'YAY! Happy Birthday, My Love! 🎉',
      postCutTitle: 'HAPPY BIRTHDAY, PURVI! 🎂💛❤️',
      postCutSubtitle: 'Okay… NOW it’s officially your birthday... YAYYYY! 😌😂',
      scrollDownHint: 'Scroll down for your birthday letter 💌',
      happyBirthdayFallback: 'Happy Birthday, Purvi!',
    },

    letter: {
      badge: 'To My Future Wife 💛',
      title: 'A Little Message For You, Purvi 💛',
      salutation: 'My Dearest Purvi,',
      paragraphs: [
        'Happy Birthday, My Love! ❤️',
        'I don’t know if I can put everything I want to say into words, but I’m genuinely grateful that you came into my life and chose to love me. You are my girlfriend, my best friend, and my future wife. From our late-night conversations and silly jokes to every little moment that made me fall deeper in love with you, I’m thankful for every single second with you.',
        'Thank you for being there through every high and low, for listening when I needed someone, and for believing in me whenever I doubted myself. You probably don’t realize how much light and peace you bring into my world.',
        'You deserve a year filled with pure happiness, peace, beautiful dreams fulfilled, and all the love this universe has to offer.',
        'You are my today and all of my tomorrows. One day soon, I hope to celebrate every single birthday right beside you, holding your hand.',
        'Once again, Happy Birthday, my baby, my Purvi. 💛✨',
      ],
      closingRemark: 'And yes… Purvi deserves the absolute best birthday. No arguments. 😌💛',
      bffBadge: 'My Forever Person',
      birthdaySpecialTag: 'Birthday Special',
    },

    keepsake: {
      title: 'A Forever Promise… 💛',
      teaser: 'You are not just my love, you are the person I want to spend my entire life with. 💛',
      openButton: 'Open this little thought 💛',
      lines: [
        'Life has a beautiful way of bringing two souls together.',
        'Out of billions of people in this world, my heart found its home in you.',
        'No matter where life takes us or what tomorrow brings…',
        'I want you to know that you are my choice, today, tomorrow, and forever.',
        'I don’t just want sweet memories of the past with you.',
        'I want a lifetime of new tomorrows, holding your hand through everything.',
        'You are my girlfriend, my closest companion, and my future wife.',
        'And that’s why I created this special little corner for you.',
        'As a token of my love and a promise for all the years ahead.',
        'Whenever you look at this, remember how deeply and truly you are loved.',
        'Happy Birthday, my babyyyy. 💛✨',
      ],
      finalHeartQuote: 'You are my today and all of my tomorrows. 💛',
    },

    secretEnvelope: {
      preBuildup: 'Okay… I saved this one for last. 👀💛',
      title: 'Purvi… One Last Thing 👀',
      buttonText: 'Open It...💌',
      message:
        'No matter how many miles separate us right now, my heart is always right beside you.\n\nYou are my favourite person, my greatest blessing, and the love of my life.\n\nI can’t wait for the day we get to celebrate every single birthday together as husband and wife. Happy Birthday, my baby! 💛✨',
      sealTag: 'For Purvi',
      footerNote: 'Forever yours',
    },

    giftText: {
      message: 'Consider this website as a gift 💛',
      subtext:
        'No wrapped boxes or ribbons—just pure love, genuine words, and a piece of my heart created especially for my girlfriend and future wife....',
      forFarhaTag: 'For Purvi',
    },

    finalScene: {
      mainHeading: 'Happy Birthday, Purvi! 🎂💛❤️',
      wishes:
        'May this year bring you more happiness than you expect, more memories than you can count, and countless reasons to smile....',
      keepSmiling: 'Stay happy. Stay you. And keep that radiant, beautiful smile. I love you so much. ❤️',
      bestWishesDistance: 'Sending all my love across the miles straight into your heart. 🇮🇳 ✈️ 💛',
      makeAWishButton: 'Make a wish ✨',
      wishCelebratedTitle: 'May all your wishes come true, my love! 💛',
      wishCelebratedMessage: 'Wishing you a year filled with happiness, peace, and endless love ✨💛',
      madeWithLove: 'Made with all my heart and endless love. 💛',
      signature: '— Forever yours, Rahul 💛',
      replayButton: 'Experience it again 🎀',
    },

    musicPlayer: {
      farhaSong: 'Purvi’s Melody ♫',
      song1: 'Purvi Song',
      song2: 'Samjhawan',
      switchSong: 'Switch Song',
      muted: 'Muted 🔇',
      tapToPlay: 'Tap to play music 🎵',
    },
  },
};
