/**
 * =======================================================================
 * 💛 PURVI'S BIRTHDAY SURPRISE - EASY ASSET & CONTENT CONFIGURATION
 * =======================================================================
 * 
 * Hi Rahul! You can easily customize files and messages here:
 * 
 * 1. ASSETS IN THE /public FOLDER:
 *    - Place Purvi's first photo at:         /public/photo1.png
 *    - Place Purvi's second photo at:        /public/photo2.png
 *    - Place Purvi's third photo at:         /public/photo3.png
 *    - Place your custom landscape image at: /public/landscapeimg.png
 *    - Place your custom birthday banner at: /public/happy-birthday-farha.png
 *    - Place her favorite songs at:          /public/baby-doll-song.mp3 (Samjhawan) & /public/farha-song.mp3
 *    - Place her intro video at:             /public/intro-video.mp4
 * 
 * 2. EDITING MESSAGES:
 *    - You can edit any text below directly.
 * =======================================================================
 */

import { BirthdayConfig } from './types';

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  // Names
  recipientName: "Purvi",
  playfulNickname: "My Love",
  senderName: "Rahul",

  // -------------------------------------------------------------
  // 📸 FILE ASSETS (Served directly from /public)
  // -------------------------------------------------------------
  photo1Url: '/photo1.png',
  photo2Url: '/photo2.png',
  photo3Url: '/photo3.png',
  landscapeImgUrl: '/landscapeimg.png',
  birthdayImageUrl: '/happy-birthday-farha.png',
  songUrl: '/baby-doll-song.mp3', // Selected by default
  song2Url: '/farha-song.mp3', // Secondary option
  introVideoUrl: '/intro-video.mp4',

  // -------------------------------------------------------------
  // 🎀 SCREEN 1: OPENING
  // -------------------------------------------------------------
  opening: {
    greeting: "Hey Purvi… 💛",
    subheading: "I made something special for you.",
    ctaText: "Open Your Surprise 💛",
  },

  // -------------------------------------------------------------
  // 🌷 SCREEN 2: WELCOME
  // -------------------------------------------------------------
  welcome: {
    title: "Welcome, My Love 💛",
    intro: "Okay Purvi… your birthday surprise officially starts here... 😌💛",
    instruction: "Scroll slowly... I poured my whole heart into this for you...",
  },

  // -------------------------------------------------------------
  // 📸 SCREEN 3: FIRST PHOTO CINEMATIC REVEAL
  // -------------------------------------------------------------
  photo1Section: {
    captionTitle: "Those Eyes. ❤️",
    captionSubtitle: "Honestly, loving you is the easiest thing in the world. 😌💛",
  },

  // -------------------------------------------------------------
  // 💗 SCREEN 4: APPRECIATION CARDS
  // -------------------------------------------------------------
  appreciation: {
    title: "A Few Things I Love and Appreciate About You… 💛",
    cards: [
      { id: "app-1", text: "Your radiant smile ❤️" },
      { id: "app-2", text: "Your gentle, kind heart 🌸" },
      { id: "app-3", text: "Your silly jokes and childish laughter 😂" },
      { id: "app-4", text: "The way you turn ordinary moments into magic ✨" },
      { id: "app-5", text: "The way you always believe in me and lift me up." },
      { id: "app-6", text: "The comfort, peace, and warmth of simply being with you." },
      { id: "app-7", text: "And simply… you being Purvi. 💛" },
    ],
  },

  // -------------------------------------------------------------
  // 📸 SCREEN 5: SECOND PHOTO SCRAPBOOK MOMENT
  // -------------------------------------------------------------
  photo2Section: {
    title: "And then there’s just… you. 💛",
    subtitle: "The most beautiful girl in my world.",
  },

  // -------------------------------------------------------------
  // 🥹 SCREEN 6: THANK-YOU MESSAGES
  // -------------------------------------------------------------
  thankYou: {
    title: "Things I Probably Don't Say Enough… 💛",
    messages: [
      {
        id: "ty-1",
        text: "Thank you for being there during my bad times, even when I didn't know how to explain what I was feeling.",
      },
      {
        id: "ty-2",
        text: "Thank you for listening when I just needed someone to hear me, thank you for loving me so patiently...",
      },
      {
        id: "ty-3",
        text: "Thank you for believing in me and motivating me whenever I started doubting myself.",
      },
      {
        id: "ty-4",
        text: "Thank you for every random conversation that turned a hard day into a joyful one.",
      },
      {
        id: "ty-5",
        text: "Thank you for making me smile and laugh when I didn't feel like smiling at all...",
      },
      {
        id: "ty-6",
        text: "Thank you for all the little things you do that show me how deeply you care...",
      },
    ],
    highlightTitle: "Most importantly…",
    highlightText: "Thank you for simply being you, Purvi. You are not just my love, you are the person I want to spend my entire life with.... ❤️",
  },

  // -------------------------------------------------------------
  // 🎂 SCREEN 7: CAKE BUILD-UP
  // -------------------------------------------------------------
  cakeIntro: {
    transitionText: "Okay babyyy… enough emotional stuff for a moment, hahahaha! 👀",
    buildUpText: "There's still one very important thing missing…",
    cakeRevealText: "YOUR BIRTHDAY CAKE 🎂💛",
  },

  // -------------------------------------------------------------
  // 🎂 SCREEN 8 & 9: INTERACTIVE CAKE & CUTTING
  // -------------------------------------------------------------
  cake: {
    wishPrompt: "Make a Wish, Purvi...✨",
    wishButtonText: "Make Your Wish..💛",
    blowOutMessage: "Okay… now we cut the cake, babyyy! 🎂😭💛",
    cutButtonText: "Cut the Cake 💛",
    postCutTitle: "HAPPY BIRTHDAY, PURVI! 🎂💛❤️",
    postCutSubtitle: "Okay… NOW it's officially your birthday... YAYYYY! 😌😂",
  },

  // -------------------------------------------------------------
  // 💌 SCREEN 10: PERSONAL BIRTHDAY LETTER
  // -------------------------------------------------------------
  letter: {
    title: "A Little Message For You, Purvi 💛",
    salutation: "My Dearest Purvi,",
    paragraphs: [
      "Happy Birthday, My Love! ❤️",
      "I don't know if I can put everything I want to say into words, but I'm genuinely grateful that you came into my life and chose to love me. You are my girlfriend, my best friend, and my future wife. From our late-night conversations and silly jokes to every little moment that made me fall deeper in love with you, I'm thankful for every single second with you.",
      "Thank you for being there through every high and low, for listening when I needed someone, and for believing in me whenever I doubted myself. You probably don't realize how much light and peace you bring into my world.",
      "You deserve a year filled with pure happiness, peace, beautiful dreams fulfilled, and all the love this universe has to offer.",
      "You are my today and all of my tomorrows. One day soon, I hope to celebrate every single birthday right beside you, holding your hand.",
      "Once again, Happy Birthday, my baby, my Purvi. 💛✨",
    ],
    closingRemark: "And yes… Purvi deserves the absolute best birthday. No arguments. 😌💛",
  },

  // -------------------------------------------------------------
  // 💌 SCREEN 11: SECRET ENVELOPE
  // -------------------------------------------------------------
  secretEnvelope: {
    title: "Purvi… One Last Thing 👀",
    buttonText: "Open It...💌",
    message: "No matter how many miles separate us right now, my heart is always right beside you.\n\nYou are my favourite person, my greatest blessing, and the love of my life.\n\nI can't wait for the day we get to celebrate every single birthday together as husband and wife. Happy Birthday, my baby! 💛✨",
  },

  // -------------------------------------------------------------
  // 🌸 SCREEN 12: CONSIDER THIS WEBSITE AS A GIFT
  // -------------------------------------------------------------
  giftText: {
    message: "Consider this website as a gift 💛",
    subtext: "No wrapped boxes or ribbons—just pure love, genuine words, and a piece of my heart created especially for my girlfriend and future wife....",
  },

  // -------------------------------------------------------------
  // 🌸 SCREEN 13: FINAL BIRTHDAY SCENE
  // -------------------------------------------------------------
  finalScene: {
    mainHeading: "Happy Birthday, Purvi! 🎂💛❤️",
    wishes: "May this year bring you more happiness than you expect, more memories than you can count, and countless reasons to smile....",
    keepSmiling: "Stay happy. Stay you. And keep that radiant, beautiful smile. I love you so much. ❤️",
    madeWithLove: "Made with all my heart and endless love. 💛",
    signature: "— Forever yours, Rahul 💛",
  },
};
