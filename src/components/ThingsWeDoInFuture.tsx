import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Heart,
  Sparkles,
  CheckCircle2,
  MapPin,
  Flame,
  Award,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { LotusFlower } from './LotusFlower';

export interface FutureDreamItem {
  id: string;
  number: string;
  tag: string;
  title: string;
  story: string;
  vow: string;
  location?: string;
  iconType: 'taj-mahal' | 'taj-proposal' | 'nyc-marriage' | 'pani-puri' | 'chotta-rahul-purvi' | 'grow-old';
}

export interface ThingsWeDoInFutureProps {
  badge: string;
  title: string;
  subtitle: string;
  items: FutureDreamItem[];
  sealPromiseText?: string;
  promiseSealedText?: string;
  progressText?: string;
  sealAllButton?: string;
  allSealedCelebrationTitle?: string;
  allSealedCelebrationDesc?: string;
  signature?: string;
}

/* =======================================================================
 * 🎨 CUSTOM SVG ART FOR EACH FUTURE DREAM
 * ======================================================================= */

// 1. Taj Mahal Monument
const TajMahalSvg = () => (
  <svg
    viewBox="0 0 80 70"
    className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="tajGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B8" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#E5B341" />
      </linearGradient>
    </defs>
    {/* Base Podium */}
    <rect x="10" y="58" width="60" height="4" rx="1.5" fill="url(#tajGoldGrad)" />
    <rect x="6" y="62" width="68" height="3" rx="1" fill="#FFC107" opacity="0.8" />
    {/* Left Minaret */}
    <line x1="12" y1="24" x2="12" y2="58" stroke="url(#tajGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M10 24 L14 24 L12 20 Z" fill="url(#tajGoldGrad)" />
    <circle cx="12" cy="18" r="1.2" fill="#FFF4B8" />
    {/* Right Minaret */}
    <line x1="68" y1="24" x2="68" y2="58" stroke="url(#tajGoldGrad)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M66 24 L70 24 L68 20 Z" fill="url(#tajGoldGrad)" />
    <circle cx="68" cy="18" r="1.2" fill="#FFF4B8" />
    {/* Main Building Body */}
    <rect x="22" y="32" width="36" height="26" rx="2" fill="url(#tajGoldGrad)" fillOpacity="0.25" stroke="url(#tajGoldGrad)" strokeWidth="1.5" />
    {/* Central Main Arch (Iwan) */}
    <path d="M33 58 V44 Q40 38 47 44 V58 Z" fill="#151515" stroke="url(#tajGoldGrad)" strokeWidth="1.5" />
    {/* Inner decorative arch */}
    <path d="M36 58 V48 Q40 43 44 48 V58 Z" fill="url(#tajGoldGrad)" fillOpacity="0.4" />
    {/* Left Sub-Arch */}
    <path d="M24 42 V37 Q27 34 30 37 V42 Z" stroke="url(#tajGoldGrad)" strokeWidth="1" fill="none" />
    <path d="M24 53 V48 Q27 45 30 48 V53 Z" stroke="url(#tajGoldGrad)" strokeWidth="1" fill="none" />
    {/* Right Sub-Arch */}
    <path d="M50 42 V37 Q53 34 56 37 V42 Z" stroke="url(#tajGoldGrad)" strokeWidth="1" fill="none" />
    <path d="M50 53 V48 Q53 45 56 48 V53 Z" stroke="url(#tajGoldGrad)" strokeWidth="1" fill="none" />
    {/* Main Central Onion Dome */}
    <path
      d="M31 32 C31 22, 36 14, 40 10 C44 14, 49 22, 49 32 Z"
      fill="url(#tajGoldGrad)"
      stroke="#FFF4B8"
      strokeWidth="1"
    />
    {/* Spire / Finial */}
    <line x1="40" y1="10" x2="40" y2="3" stroke="#FFF4B8" strokeWidth="1.8" strokeLinecap="round" />
    <circle cx="40" cy="2" r="1.2" fill="#FFF4B8" />
    {/* Left Side Dome */}
    <path d="M25 32 C25 26, 27 22, 29 20 C31 22, 33 26, 33 32 Z" fill="url(#tajGoldGrad)" fillOpacity="0.7" />
    {/* Right Side Dome */}
    <path d="M47 32 C47 26, 49 22, 51 20 C53 22, 55 26, 55 32 Z" fill="url(#tajGoldGrad)" fillOpacity="0.7" />
    {/* Water Reflection Ripples */}
    <line x1="28" y1="67" x2="52" y2="67" stroke="#FFD700" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    <line x1="34" y1="69" x2="46" y2="69" stroke="#FFD700" strokeWidth="0.8" strokeLinecap="round" opacity="0.4" />
  </svg>
);

// 2. Solitaire Engagement Ring
const TajProposalSvg = () => (
  <svg
    viewBox="0 0 80 70"
    className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B8" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#E5B341" />
      </linearGradient>
      <linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="60%" stopColor="#E0F2FE" />
        <stop offset="100%" stopColor="#BAE6FD" />
      </linearGradient>
    </defs>
    {/* Sparkling rays around diamond */}
    <line x1="40" y1="2" x2="40" y2="7" stroke="#FFF4B8" strokeWidth="2" strokeLinecap="round" />
    <line x1="24" y1="8" x2="28" y2="12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="56" y1="8" x2="52" y2="12" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="20" x2="23" y2="21" stroke="#FFF4B8" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="62" y1="20" x2="57" y2="21" stroke="#FFF4B8" strokeWidth="1.5" strokeLinecap="round" />
    {/* Golden Ring Band */}
    <ellipse cx="40" cy="44" rx="22" ry="18" stroke="url(#ringGoldGrad)" strokeWidth="4.5" fill="none" />
    <ellipse cx="40" cy="44" rx="20" ry="16" stroke="#080808" strokeWidth="1" fill="none" opacity="0.4" />
    {/* Crown / Prong Setting */}
    <path d="M34 26 L30 20 L33 19 L36 24 Z" fill="url(#ringGoldGrad)" />
    <path d="M46 26 L50 20 L47 19 L44 24 Z" fill="url(#ringGoldGrad)" />
    {/* Brilliant Cut Solitaire Diamond */}
    <polygon points="32,18 48,18 54,23 40,34 26,23" fill="url(#diamondGrad)" stroke="#FFFFFF" strokeWidth="1.2" />
    {/* Diamond Facet Lines */}
    <line x1="32" y1="18" x2="40" y2="34" stroke="#93C5FD" strokeWidth="0.8" opacity="0.8" />
    <line x1="48" y1="18" x2="40" y2="34" stroke="#93C5FD" strokeWidth="0.8" opacity="0.8" />
    <line x1="26" y1="23" x2="54" y2="23" stroke="#93C5FD" strokeWidth="0.8" opacity="0.8" />
    <polygon points="36,18 44,18 46,23 40,28 34,23" fill="#FFFFFF" fillOpacity="0.85" />
    {/* Tiny Heart in center of ring */}
    <path
      d="M40 50 C38.5 48 35 48.5 35 51 C35 53.5 40 56.5 40 56.5 C40 56.5 45 53.5 45 51 C45 48.5 41.5 48 40 50 Z"
      fill="#FFD700"
      opacity="0.9"
    />
  </svg>
);

// 3. New York City Skyline & Marriage Proposal
const NycMarriageSvg = () => (
  <svg
    viewBox="0 0 80 70"
    className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="nycGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B8" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#E5B341" />
      </linearGradient>
    </defs>
    {/* Crescent Moon */}
    <path
      d="M62 10 A7 7 0 0 0 54 16 A7 7 0 0 1 60 11 A5 5 0 0 1 62 10 Z"
      fill="#FFF4B8"
    />
    {/* Twinkling Stars */}
    <circle cx="16" cy="12" r="1" fill="#FFF4B8" />
    <circle cx="28" cy="8" r="1.3" fill="#FFD700" />
    <circle cx="48" cy="6" r="1" fill="#FFF4B8" />
    <circle cx="68" cy="22" r="1.2" fill="#FFD700" />
    {/* Ground / Water Base */}
    <line x1="6" y1="62" x2="74" y2="62" stroke="url(#nycGold)" strokeWidth="2" strokeLinecap="round" />
    <line x1="12" y1="65" x2="68" y2="65" stroke="url(#nycGold)" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    {/* Left Building (Classic Flat Top) */}
    <rect x="10" y="36" width="10" height="26" fill="url(#nycGold)" fillOpacity="0.2" stroke="url(#nycGold)" strokeWidth="1.2" />
    {/* Windows */}
    <circle cx="13" cy="42" r="0.9" fill="#FFF4B8" />
    <circle cx="17" cy="42" r="0.9" fill="#FFF4B8" />
    <circle cx="13" cy="48" r="0.9" fill="#FFF4B8" />
    <circle cx="17" cy="48" r="0.9" fill="#FFF4B8" />
    <circle cx="13" cy="54" r="0.9" fill="#FFF4B8" />
    <circle cx="17" cy="54" r="0.9" fill="#FFF4B8" />
    {/* Chrysler Style Building */}
    <path d="M23 62 V30 L27 22 L27 16 L29 16 L29 22 L33 30 V62 Z" fill="url(#nycGold)" fillOpacity="0.3" stroke="url(#nycGold)" strokeWidth="1.2" />
    <line x1="28" y1="16" x2="28" y2="10" stroke="#FFF4B8" strokeWidth="1.5" strokeLinecap="round" />
    {/* Empire State Building (Centerpiece) */}
    <rect x="36" y="24" width="14" height="38" fill="url(#nycGold)" fillOpacity="0.35" stroke="url(#nycGold)" strokeWidth="1.2" />
    <rect x="38" y="16" width="10" height="8" fill="url(#nycGold)" stroke="url(#nycGold)" strokeWidth="1" />
    <rect x="41" y="10" width="4" height="6" fill="url(#nycGold)" stroke="url(#nycGold)" strokeWidth="0.8" />
    <line x1="43" y1="10" x2="43" y2="3" stroke="#FFF4B8" strokeWidth="1.8" strokeLinecap="round" />
    {/* Windows on ESB */}
    <line x1="39" y1="28" x2="47" y2="28" stroke="#FFF4B8" strokeWidth="1" strokeDasharray="1.5 1.5" />
    <line x1="39" y1="34" x2="47" y2="34" stroke="#FFF4B8" strokeWidth="1" strokeDasharray="1.5 1.5" />
    <line x1="39" y1="40" x2="47" y2="40" stroke="#FFF4B8" strokeWidth="1" strokeDasharray="1.5 1.5" />
    <line x1="39" y1="46" x2="47" y2="46" stroke="#FFF4B8" strokeWidth="1" strokeDasharray="1.5 1.5" />
    <line x1="39" y1="52" x2="47" y2="52" stroke="#FFF4B8" strokeWidth="1" strokeDasharray="1.5 1.5" />
    {/* One World Trade Style / Angled Skyscraper */}
    <polygon points="52,62 52,22 62,26 62,62" fill="url(#nycGold)" fillOpacity="0.25" stroke="url(#nycGold)" strokeWidth="1.2" />
    <line x1="52" y1="22" x2="52" y2="15" stroke="#FFF4B8" strokeWidth="1.5" strokeLinecap="round" />
    {/* Two Entwined Wedding Rings in the Sky */}
    <ellipse cx="64" cy="38" rx="5" ry="3.5" stroke="#FFD700" strokeWidth="1.4" fill="none" transform="rotate(-15 64 38)" />
    <ellipse cx="68" cy="36" rx="5" ry="3.5" stroke="#FFF4B8" strokeWidth="1.4" fill="none" transform="rotate(15 68 36)" />
  </svg>
);

// 4. Pani Puri Street Food Love Date
const PaniPuriSvg = () => (
  <svg
    viewBox="0 0 80 70"
    className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="puriGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B8" />
        <stop offset="60%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#D97706" />
      </linearGradient>
      <linearGradient id="paaniGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#84CC16" />
        <stop offset="100%" stopColor="#15803D" />
      </linearGradient>
    </defs>
    {/* Bowl (Donā) Base */}
    <path
      d="M16 42 Q40 64 64 42 L60 38 Q40 54 20 38 Z"
      fill="#78350F"
      stroke="#FFD700"
      strokeWidth="1.5"
    />
    {/* Puri 1 (Left Puffed Puri) */}
    <circle cx="28" cy="34" r="10" fill="url(#puriGrad)" stroke="#FFD700" strokeWidth="1.4" />
    <ellipse cx="28" cy="28" rx="4" ry="2.5" fill="#92400E" opacity="0.75" />
    {/* Spicy Teekha Paani Droplet */}
    <circle cx="28" cy="28" r="2" fill="url(#paaniGrad)" />
    {/* Puri 2 (Right Puffed Puri) */}
    <circle cx="52" cy="34" r="10" fill="url(#puriGrad)" stroke="#FFD700" strokeWidth="1.4" />
    <ellipse cx="52" cy="28" rx="4" ry="2.5" fill="#92400E" opacity="0.75" />
    <circle cx="52" cy="28" r="2" fill="url(#paaniGrad)" />
    {/* Puri 3 (Center Hero Puri Being Fed by Hand) */}
    <circle cx="40" cy="22" r="12" fill="url(#puriGrad)" stroke="#FFF4B8" strokeWidth="1.8" />
    {/* Hole with crispy edges */}
    <ellipse cx="40" cy="15" rx="5" ry="3.5" fill="#78350F" />
    {/* Filling + Tangy Green Mint Paani Splash */}
    <circle cx="40" cy="15" r="3" fill="url(#paaniGrad)" />
    {/* Paani droplets leaping with joy */}
    <path d="M40 7 Q42 10 40 12 Q38 10 40 7 Z" fill="#84CC16" />
    <circle cx="33" cy="11" r="1.3" fill="#84CC16" />
    <circle cx="47" cy="10" r="1.3" fill="#F59E0B" />
    {/* Steam / Aroma / Spice swirls */}
    <path d="M22 18 Q20 12 24 8" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
    <path d="M58 18 Q60 12 56 8" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.7" />
    {/* Two Little Hands / Hearts Touching */}
    <path
      d="M40 54 C38 52 34 52.5 34 55 C34 58 40 61 40 61 C40 61 46 58 46 55 C46 52.5 42 52 40 54 Z"
      fill="#EF4444"
      opacity="0.9"
    />
  </svg>
);

// 5. Chotta Rahul & Chotta Purvi (Little Mini-Rahul & Mini-Purvi)
const ChottaRahulPurviSvg = () => (
  <svg
    viewBox="0 0 80 70"
    className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="boyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#38BDF8" />
      </linearGradient>
      <linearGradient id="girlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FDE68A" />
        <stop offset="100%" stopColor="#F472B6" />
      </linearGradient>
    </defs>
    {/* Left Footprint (Chotta Rahul) */}
    <g transform="translate(18, 14) rotate(-8)">
      {/* Heel */}
      <ellipse cx="10" cy="28" rx="5.5" ry="7" fill="url(#boyGrad)" />
      {/* Ball of foot */}
      <ellipse cx="10" cy="16" rx="7" ry="8" fill="url(#boyGrad)" />
      {/* Big toe */}
      <circle cx="5" cy="4" r="3.2" fill="url(#boyGrad)" />
      {/* Other toes */}
      <circle cx="10" cy="4.5" r="2.2" fill="url(#boyGrad)" />
      <circle cx="14" cy="6" r="1.8" fill="url(#boyGrad)" />
      <circle cx="17" cy="8" r="1.5" fill="url(#boyGrad)" />
      <circle cx="19" cy="11" r="1.2" fill="url(#boyGrad)" />
      {/* Tiny boy crown / star */}
      <polygon points="10,18 11.5,21 15,21 12,23 13,26 10,24 7,26 8,23 5,21 8.5,21" fill="#FFF4B8" />
    </g>

    {/* Right Footprint (Chotta Purvi) */}
    <g transform="translate(42, 14) rotate(8)">
      {/* Heel */}
      <ellipse cx="10" cy="28" rx="5.5" ry="7" fill="url(#girlGrad)" />
      {/* Ball of foot */}
      <ellipse cx="10" cy="16" rx="7" ry="8" fill="url(#girlGrad)" />
      {/* Big toe */}
      <circle cx="15" cy="4" r="3.2" fill="url(#girlGrad)" />
      {/* Other toes */}
      <circle cx="10" cy="4.5" r="2.2" fill="url(#girlGrad)" />
      <circle cx="6" cy="6" r="1.8" fill="url(#girlGrad)" />
      <circle cx="3" cy="8" r="1.5" fill="url(#girlGrad)" />
      <circle cx="1" cy="11" r="1.2" fill="url(#girlGrad)" />
      {/* Tiny cute lotus flower/bow on Chotta Purvi */}
      <circle cx="10" cy="20" r="2.5" fill="#F43F5E" />
      <circle cx="7" cy="18" r="2" fill="#FDA4AF" />
      <circle cx="13" cy="18" r="2" fill="#FDA4AF" />
    </g>

    {/* Central Glowing Golden Heart Linking Them */}
    <path
      d="M40 48 C37 45 31 46 31 50 C31 54 40 60 40 60 C40 60 49 54 49 50 C49 46 43 45 40 48 Z"
      fill="#FFD700"
      stroke="#FFF4B8"
      strokeWidth="1.2"
    />
    {/* Floating tiny golden sparkles */}
    <circle cx="38" cy="8" r="1.2" fill="#FFD700" />
    <circle cx="43" cy="6" r="1" fill="#FFF4B8" />
    <circle cx="40" cy="3" r="1.5" fill="#FFD700" />
  </svg>
);

// 6. Grow Old Together (Infinity of Love & Rocking Chairs)
const GrowOldSvg = () => (
  <svg
    viewBox="0 0 80 70"
    className="w-12 h-12 sm:w-14 sm:h-14 drop-shadow-[0_0_12px_rgba(255,215,0,0.4)]"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="infinityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFF4B8" />
        <stop offset="50%" stopColor="#FFD700" />
        <stop offset="100%" stopColor="#F59E0B" />
      </linearGradient>
    </defs>
    {/* Grand Infinity Symbol (∞) */}
    <path
      d="M40 35 C32 23 18 23 18 35 C18 47 32 47 40 35 C48 23 62 23 62 35 C62 47 48 47 40 35 Z"
      stroke="url(#infinityGrad)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Left Heart (Rahul) */}
    <path
      d="M26 31 C24.5 29.5 21 30 21 32.5 C21 35.5 26 38.5 26 38.5 C26 38.5 31 35.5 31 32.5 C31 30 27.5 29.5 26 31 Z"
      fill="#FFD700"
    />
    {/* Right Heart (Purvi) */}
    <path
      d="M54 31 C52.5 29.5 49 30 49 32.5 C49 35.5 54 38.5 54 38.5 C54 38.5 59 35.5 59 32.5 C59 30 55.5 29.5 54 31 Z"
      fill="#F472B6"
    />
    {/* Radiant Sunset Rays in the Background */}
    <line x1="40" y1="12" x2="40" y2="6" stroke="#FFF4B8" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="28" y1="15" x2="24" y2="10" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="52" y1="15" x2="56" y2="10" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="18" y1="21" x2="13" y2="18" stroke="#FFF4B8" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="62" y1="21" x2="67" y2="18" stroke="#FFF4B8" strokeWidth="1.2" strokeLinecap="round" />
    {/* Bottom Golden Laurel Leaves */}
    <path
      d="M20 54 Q30 59 40 58 Q50 59 60 54"
      stroke="#FFD700"
      strokeWidth="1.5"
      strokeLinecap="round"
      fill="none"
    />
    <circle cx="40" cy="58" r="1.5" fill="#FFF4B8" />
    <circle cx="30" cy="57" r="1.2" fill="#FFD700" />
    <circle cx="50" cy="57" r="1.2" fill="#FFD700" />
  </svg>
);

const getDreamIcon = (iconType: FutureDreamItem['iconType']) => {
  switch (iconType) {
    case 'taj-mahal':
      return <TajMahalSvg />;
    case 'taj-proposal':
      return <TajProposalSvg />;
    case 'nyc-marriage':
      return <NycMarriageSvg />;
    case 'pani-puri':
      return <PaniPuriSvg />;
    case 'chotta-rahul-purvi':
      return <ChottaRahulPurviSvg />;
    case 'grow-old':
      return <GrowOldSvg />;
    default:
      return <Heart size={32} className="text-[#FFD700]" />;
  }
};

/* =======================================================================
 * 💖 MAIN COMPONENT
 * ======================================================================= */

export const ThingsWeDoInFuture: React.FC<ThingsWeDoInFutureProps> = ({
  badge = 'Our Forever Dreams 💛',
  title = 'Things We Do in Future',
  subtitle = 'A little promise book of our beautiful tomorrow — every dream we are going to live together, hand in hand.',
  items,
  sealPromiseText = 'Seal This Promise 💛',
  promiseSealedText = 'Promise Sealed with Love 💖✓',
  progressText = 'Promises Sealed',
  sealAllButton = 'Seal All 6 Future Dreams ✨',
  allSealedCelebrationTitle = 'All 6 Dreams Sealed in Our Hearts! 💍💛',
  allSealedCelebrationDesc = 'Every single one of these vows is a promise from my soul, Purvi. One day soon, every dream on this list will be our beautiful reality. I love you forever. 💛',
  signature = '— Forever Yours, Rahul 💛',
}) => {
  // Set of dream IDs that have been sealed by Purvi / user
  const [sealedIds, setSealedIds] = useState<Set<string>>(() => new Set());
  // Expanded state for reading full vow / story
  const [expandedIds, setExpandedIds] = useState<Set<string>>(
    () => new Set(items.map((i) => i.id)) // Default all expanded for optimal reading experience
  );
  const [justSealedId, setJustSealedId] = useState<string | null>(null);

  const isAllSealed = items.length > 0 && sealedIds.size === items.length;

  // Trigger local burst of confetti when sealing a dream
  const handleSealItem = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();

    setSealedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        setJustSealedId(id);
        setTimeout(() => setJustSealedId(null), 1000);

        // Confetti burst for this card
        try {
          const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
          const x = (rect.left + rect.width / 2) / window.innerWidth;
          const y = (rect.top + rect.height / 2) / window.innerHeight;

          confetti({
            particleCount: 45,
            spread: 60,
            origin: { x, y },
            colors: ['#FFD700', '#FFC107', '#FFF4B8', '#F472B6', '#FFFFFF'],
          });
        } catch {}
      }
      return next;
    });
  };

  // Seal all promises at once with grand fireworks
  const handleSealAll = () => {
    setSealedIds(new Set(items.map((i) => i.id)));
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#FFD700', '#FFC107', '#FFF4B8', '#F472B6', '#FFFFFF'],
      });
      setTimeout(() => {
        confetti({
          particleCount: 60,
          angle: 60,
          spread: 60,
          origin: { x: 0.1, y: 0.7 },
          colors: ['#FFD700', '#FFC107', '#FFF4B8'],
        });
        confetti({
          particleCount: 60,
          angle: 120,
          spread: 60,
          origin: { x: 0.9, y: 0.7 },
          colors: ['#FFD700', '#FFC107', '#FFF4B8'],
        });
      }, 250);
    } catch {}
  };

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const progressPercent = items.length > 0 ? (sealedIds.size / items.length) * 100 : 0;

  return (
    <section className="relative min-h-[85dvh] py-20 sm:py-28 px-4 max-w-xl mx-auto flex flex-col items-center">
      {/* 💛 Ambient Golden Glow in the background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-tr from-[#FFD700]/15 via-[#FFC107]/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-[#F472B6]/10 via-[#FFD700]/10 to-transparent blur-3xl pointer-events-none" />

      {/* 🪷 Header Lotus Badges */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8 }}
        className="flex items-center gap-2 mb-3"
      >
        <LotusFlower size={24} variant="blush" />
        <span className="text-xs uppercase tracking-widest text-[#FFD700] font-medium font-sans-clean">
          {badge}
        </span>
        <LotusFlower size={24} variant="blush" />
      </motion.div>

      {/* 👑 Section Title */}
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="font-display text-3xl sm:text-4xl text-[#FFD700] font-normal text-center mb-3 tracking-tight leading-snug drop-shadow-[0_2px_10px_rgba(255,215,0,0.25)]"
      >
        {title}
      </motion.h3>

      {/* 📜 Heartfelt Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-base text-[#FFF4B8] font-sans-clean text-center max-w-md mb-8 sm:mb-10 font-light leading-relaxed"
      >
        {subtitle}
      </motion.p>

      {/* 📊 Interactive Promise Tracker & Progress Bar */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="w-full mb-8 sm:mb-10 p-4 sm:p-5 rounded-2xl bg-[#121212] border border-[#FFD700]/30 shadow-lg shadow-[#FFD700]/10 flex flex-col gap-2.5"
      >
        <div className="flex items-center justify-between text-xs sm:text-sm font-sans-clean">
          <div className="flex items-center gap-1.5 text-[#FFD700] font-medium">
            <Sparkles size={15} className="text-[#FFD700]" />
            <span>{progressText}</span>
          </div>
          <span className="font-mono text-[#FFF4B8] font-bold">
            {sealedIds.size} / {items.length} {isAllSealed ? '💛✨' : ''}
          </span>
        </div>

        {/* Progress Track */}
        <div className="w-full h-2 rounded-full bg-[#1c1c1c] overflow-hidden border border-[#FFD700]/20">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFF4B8] rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>

        {/* Quick action button if not all sealed */}
        {!isAllSealed && (
          <button
            onClick={handleSealAll}
            className="mt-1 self-center text-xs text-[#FFD700] hover:text-[#FFF4B8] font-sans-clean underline decoration-[#FFD700]/50 hover:decoration-[#FFF4B8] transition-colors py-1 px-2 cursor-pointer touch-target-44 flex items-center gap-1"
          >
            <span>{sealAllButton}</span>
          </button>
        )}
      </motion.div>

      {/* 🌟 The 6 Future Dreams List */}
      <div className="w-full space-y-6 sm:space-y-8 mb-10">
        {items.map((item, index) => {
          const isSealed = sealedIds.has(item.id);
          const isExpanded = expandedIds.has(item.id);
          const isJustSealed = justSealedId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.75,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={() => toggleExpand(item.id)}
              className={`relative rounded-3xl p-5 sm:p-7 bg-[#151515] border transition-all duration-500 overflow-hidden cursor-pointer select-text mobile-touch-pop ${
                isSealed
                  ? 'border-[#FFD700] shadow-[0_0_30px_rgba(255,215,0,0.22)] bg-gradient-to-b from-[#181818] to-[#121212]'
                  : 'border-[#FFD700]/35 shadow-md shadow-[#FFD700]/10 hover:border-[#FFD700]/60'
              }`}
            >
              {/* Subtle Ambient Glow for Sealed Card */}
              {isSealed && (
                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-44 h-44 bg-[#FFD700]/15 rounded-full blur-2xl pointer-events-none" />
              )}

              {/* Card Header: Dream Number, Tag, Location */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="flex items-center gap-2 flex-wrap">
                  {/* Number Badge */}
                  <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#080808] border border-[#FFD700]/40 text-[#FFD700]">
                    {item.number}
                  </span>
                  {/* Dream Tag */}
                  <span className="text-[11px] sm:text-xs font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-[#FFD700]/10 text-[#FFD700] border border-[#FFD700]/25 font-sans-clean">
                    {item.tag}
                  </span>
                </div>

                {/* Location Badge if available */}
                {item.location && (
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-[#FFF4B8]/70 font-sans-clean">
                    <MapPin size={11} className="text-[#FFD700]" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>

              {/* Center Layout: Custom Artwork + Title */}
              <div className="flex items-start gap-4 mb-4">
                {/* Visual Artwork Container with glowing halo */}
                <div className="shrink-0 p-2.5 sm:p-3 rounded-2xl bg-[#0a0a0a] border border-[#FFD700]/30 shadow-inner flex items-center justify-center">
                  {getDreamIcon(item.iconType)}
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-xl sm:text-2xl text-[#FFD700] font-normal leading-snug drop-shadow-sm mb-1">
                    {item.title}
                  </h4>
                  {item.location && (
                    <div className="flex sm:hidden items-center gap-1 text-[11px] text-[#FFF4B8]/70 font-sans-clean">
                      <MapPin size={11} className="text-[#FFD700]" />
                      <span>{item.location}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Story Description */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4 pt-1"
                  >
                    <p className="font-sans-clean text-[#FFF4B8] text-sm sm:text-base leading-relaxed font-light">
                      {item.story}
                    </p>

                    {/* 💛 Rahul's Personal Vow Callout Box */}
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#0c0c0c] border border-[#FFD700]/30 flex items-start gap-3 relative overflow-hidden">
                      <div className="shrink-0 mt-0.5 text-[#FFD700]">
                        <Heart size={15} className="fill-[#FFD700] text-[#FFD700]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-handwriting text-base sm:text-lg text-[#FFC107] font-semibold leading-relaxed">
                          "{item.vow}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Bottom Card Actions: Seal Promise Button + Toggle Hint */}
              <div className="mt-5 pt-4 border-t border-[#FFD700]/20 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={(e) => handleSealItem(e, item.id)}
                  aria-pressed={isSealed}
                  className={`touch-target-44 px-4 py-2 rounded-full text-xs sm:text-sm font-sans-clean font-medium flex items-center gap-2 transition-all duration-300 cursor-pointer shadow-md ${
                    isSealed
                      ? 'bg-gradient-to-r from-[#FFD700] to-[#E5B341] text-[#080808] font-bold shadow-[0_0_15px_rgba(255,215,0,0.4)] hover:brightness-110 scale-[1.02]'
                      : 'bg-[#080808] text-[#FFD700] border border-[#FFD700]/40 hover:border-[#FFD700] hover:bg-[#FFD700]/10'
                  }`}
                >
                  {isSealed ? (
                    <>
                      <CheckCircle2 size={16} className="text-[#080808] shrink-0" />
                      <span>{promiseSealedText}</span>
                    </>
                  ) : (
                    <>
                      <Heart size={15} className="fill-[#FFD700]/30 text-[#FFD700] shrink-0" />
                      <span>{sealPromiseText}</span>
                    </>
                  )}
                </button>

                {/* Subtle Expand/Collapse Indicator */}
                <div className="flex items-center gap-1 text-xs text-[#FFF4B8]/60 font-sans-clean">
                  {isExpanded ? (
                    <ChevronUp size={16} className="text-[#FFD700]/60" />
                  ) : (
                    <ChevronDown size={16} className="text-[#FFD700]/60" />
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 🎊 Grand All-Promises Sealed Celebration Card */}
      <AnimatePresence>
        {isAllSealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-[#181818] via-[#151515] to-[#0d0d0d] border border-[#FFD700] shadow-2xl shadow-[#FFD700]/30 text-center overflow-hidden"
          >
            {/* Ambient gold glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#FFD700]/20 via-[#FFC107]/20 to-[#FFD700]/20 blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <div className="p-3 mb-3 rounded-full bg-[#080808] border border-[#FFD700]/50 shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                <LotusFlower size={36} variant="soft-pink" />
              </div>

              <h4 className="font-display text-2xl sm:text-3xl text-[#FFD700] font-normal mb-3 leading-snug drop-shadow-md">
                {allSealedCelebrationTitle}
              </h4>

              <p className="font-sans-clean text-sm sm:text-base text-[#FFF4B8] font-light leading-relaxed mb-5 max-w-md">
                {allSealedCelebrationDesc}
              </p>

              <div className="p-3 rounded-2xl bg-[#080808] border border-[#FFD700]/30 inline-block">
                <p className="font-handwriting text-xl sm:text-2xl text-[#FFD700] font-bold">
                  {signature}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
