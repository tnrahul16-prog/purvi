export interface AppreciationCard {
  id: string;
  text: string;
  emoji?: string;
}

export interface ThankYouMessage {
  id: string;
  text: string;
}

export interface BirthdayConfig {
  recipientName: string;
  playfulNickname: string;
  senderName: string;
  
  // Asset Paths (placed in /public directory)
  photo1Url: string;
  photo2Url: string;
  photo3Url?: string;
  landscapeImgUrl?: string;
  birthdayImageUrl: string;
  songUrl: string;
  song2Url?: string;
  introVideoUrl?: string;

  // Text content
  opening: {
    greeting: string;
    subheading: string;
    ctaText: string;
  };
  welcome: {
    title: string;
    intro: string;
    instruction: string;
  };
  photo1Section: {
    captionTitle: string;
    captionSubtitle: string;
  };
  appreciation: {
    title: string;
    cards: AppreciationCard[];
  };
  photo2Section: {
    title: string;
    subtitle: string;
  };
  thankYou: {
    title: string;
    messages: ThankYouMessage[];
    highlightTitle: string;
    highlightText: string;
  };
  cakeIntro: {
    transitionText: string;
    buildUpText: string;
    cakeRevealText: string;
  };
  cake: {
    wishPrompt: string;
    wishButtonText: string;
    blowOutMessage: string;
    cutButtonText: string;
    postCutTitle: string;
    postCutSubtitle: string;
  };
  letter: {
    title: string;
    salutation: string;
    paragraphs: string[];
    closingRemark: string;
  };
  secretEnvelope: {
    title: string;
    buttonText: string;
    message: string;
  };
  giftText: {
    message: string;
    subtext?: string;
  };
  finalScene: {
    mainHeading: string;
    wishes: string;
    keepSmiling: string;
    madeWithLove: string;
    signature: string;
  };
}
