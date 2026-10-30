'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2 } from 'lucide-react';
import { MarigoldFlower } from './ReferenceGraphics';
import { sounds } from '@/lib/soundEffects';

interface FitCheckProps {
  onNextSection: () => void;
  guestName: string;
  setGuestName: (name: string) => void;
  outfitColor?: string;
  setOutfitColor?: (color: string) => void;
}

interface PaletteCard {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  quote: string;
  bgColor: string;
  textColor: string;
  accentHex: string;
  iconType: string;
}

const PALETTES: PaletteCard[] = [
  {
    id: 'laal',
    num: '01',
    title: 'LAAL TAMATAR',
    subtitle: 'Poster Red',
    quote: 'Ketchup-coded confidence.',
    bgColor: 'bg-[#D32F2F]',
    textColor: 'text-white',
    accentHex: '#D32F2F',
    iconType: 'tomato',
  },
  {
    id: 'haldi',
    num: '02',
    title: 'HALDI GANG',
    subtitle: 'Marigold Yellow',
    quote: 'Glowing before the diyas do.',
    bgColor: 'bg-[#F5C842]',
    textColor: 'text-black',
    accentHex: '#F5C842',
    iconType: 'marigold',
  },
  {
    id: 'hari',
    num: '03',
    title: 'HARI MIRCH',
    subtitle: 'Emerald Green',
    quote: 'Spicy. Sharp. Slightly dangerous.',
    bgColor: 'bg-[#0F3D27]',
    textColor: 'text-white',
    accentHex: '#0F3D27',
    iconType: 'mirch',
  },
  {
    id: 'mor',
    num: '04',
    title: 'MOR PANKH',
    subtitle: 'Peacock Blue',
    quote: 'Peacock confidence, on loop.',
    bgColor: 'bg-[#0284C7]',
    textColor: 'text-white',
    accentHex: '#0284C7',
    iconType: 'peacock',
  },
  {
    id: 'gulabi',
    num: '05',
    title: 'GULABI GANG',
    subtitle: 'Hot Pink',
    quote: 'Loud, lovely, a little extra.',
    bgColor: 'bg-[#E91E8C]',
    textColor: 'text-white',
    accentHex: '#E91E8C',
    iconType: 'lotus',
  },
  {
    id: 'narangi',
    num: '06',
    title: 'NARANGI BARFI',
    subtitle: 'Saffron Orange',
    quote: 'Sweet, saffron, sorted.',
    bgColor: 'bg-[#EA580C]',
    textColor: 'text-white',
    accentHex: '#EA580C',
    iconType: 'barfi',
  },
];

export default function ReferenceFitCheck({
  onNextSection,
  guestName,
  setGuestName,
  outfitColor,
  setOutfitColor,
}: FitCheckProps) {
  const [selectedColor, setSelectedColor] = useState<PaletteCard | null>(() => {
    if (outfitColor) {
      return PALETTES.find((p) => p.title === outfitColor) || null;
    }
    return null;
  });

  const handleSelect = (palette: PaletteCard) => {
    sounds.playClick();
    setSelectedColor(palette);
    setOutfitColor?.(palette.title);
  };

  const handleShare = () => {
    sounds.playClick();
    const shareText = `Check out my Diwali Fit: ${selectedColor ? selectedColor.title : 'Festive Chic'} for Aarya's Diwali Soirée!`;
    if (navigator.share) {
      navigator.share({ title: 'Diwali Fit Pass', text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Invite link copied!');
    }
  };

  return (
    <section
      id="fit-check"
      className="relative min-h-screen bg-[#F5F2EB] text-black py-20 px-4 sm:px-8 bg-cream-dots flex flex-col items-center justify-center select-none"
    >
      {/* Top Section Indicator */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 rounded-full border-2 border-[#D32F2F] flex items-center justify-center font-syne text-[#D32F2F] text-sm font-bold">
          03
        </div>
        <span className="font-syne tracking-[0.25em] text-[#D32F2F] text-xs sm:text-sm uppercase font-extrabold">
          DRESS CODE
        </span>
      </div>

      {/* Main Title */}
      <div className="text-center mb-12">
        <h2 className="font-anton text-5xl sm:text-7xl lg:text-8xl leading-none text-black">
          FIT CHECK,{' '}
          <span className="font-playfair italic font-black text-[#E91E8C] lowercase text-5xl sm:text-7xl lg:text-8xl">
            festive
          </span>{' '}
          EDITION.
        </h2>
        <p className="text-neutral-600 text-sm sm:text-base font-sans-clean mt-2">
          Pick your colour. Enter your{' '}
          <em className="font-playfair font-bold text-black">main-character era.</em>
        </p>
      </div>

      {/* Grid: 6 Color Cards on Left, Pass on Right */}
      <div className="max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 6 Color Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PALETTES.map((card) => {
            const isSelected = selectedColor?.id === card.id;
            return (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98, y: 1 }}
                onClick={() => handleSelect(card)}
                className={`p-4 rounded-2xl border-[2.5px] border-black cursor-pointer shadow-[4px_4px_0px_#171714] hover:shadow-[6px_6px_0px_#171714] active:shadow-[1px_1px_0px_#171714] transition-all ${
                  card.bgColor
                } ${card.textColor} ${
                  isSelected ? 'ring-4 ring-black ring-offset-2' : ''
                }`}
              >
                {/* Card Header */}
                <div className="flex items-center justify-between mb-3">
                  <span className="font-syne text-xs tracking-wider opacity-85 font-extrabold">
                    {card.num}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white border border-black flex items-center justify-center text-xs shadow-xs">
                    {card.iconType === 'marigold' && '🌼'}
                    {card.iconType === 'tomato' && '🍅'}
                    {card.iconType === 'mirch' && '🌶️'}
                    {card.iconType === 'peacock' && '🦚'}
                    {card.iconType === 'lotus' && '🌸'}
                    {card.iconType === 'barfi' && '🔶'}
                  </div>
                </div>

                <div className="font-anton text-2xl tracking-wide leading-none mb-0.5">
                  {card.title}
                </div>
                <div className="font-playfair italic text-xs font-bold opacity-90 mb-2">
                  {card.subtitle}
                </div>
                <p className="text-[11px] font-sans-clean leading-tight opacity-85">
                  {card.quote}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Name Input & Live Pass */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          {/* Name Input */}
          <div>
            <label className="block font-syne text-xs tracking-widest text-neutral-600 mb-1.5 uppercase font-extrabold">
              YOUR NAME (OPTIONAL)
            </label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="So your pass says it's you"
              className="w-full px-4 py-3 bg-[#EFE9D7] border-2 border-black rounded-xl text-black placeholder-neutral-500 text-sm font-medium focus:outline-none focus:bg-white transition-colors shadow-retro-sm"
            />
          </div>

          {/* Fit Pass Print Area */}
          <div
            className={`w-full min-h-[220px] rounded-2xl border-2 border-dashed border-black p-6 flex flex-col items-center justify-center text-center transition-all ${
              selectedColor
                ? `${selectedColor.bgColor} ${selectedColor.textColor} border-solid shadow-[5px_5px_0px_#171714]`
                : 'bg-[#EFE9D7]/60 text-neutral-800'
            }`}
          >
            {selectedColor ? (
              <div className="space-y-2">
                <MarigoldFlower className="w-14 h-14 mx-auto drop-shadow-sm" />
                <div className="text-[10px] font-syne tracking-widest uppercase opacity-85 font-extrabold">
                  OFFICIAL FIT PASS
                </div>
                <div className="font-barlow font-black text-3xl tracking-wide leading-none uppercase">
                  {selectedColor.title}
                </div>
                <div className="font-playfair italic text-sm font-bold">
                  {guestName ? `For: ${guestName}` : 'Main Character Energy'}
                </div>
                <p className="text-xs font-sans-clean max-w-xs opacity-90 pt-1">
                  &ldquo;{selectedColor.quote}&rdquo;
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <MarigoldFlower className="w-12 h-12 mx-auto opacity-70" />
                <div className="font-barlow font-black text-2xl tracking-wider text-black uppercase">
                  YOUR FIT PASS PRINTS HERE
                </div>
                <p className="text-xs text-neutral-600 font-sans-clean">
                  Tap a colour to lock in your look.
                </p>
              </div>
            )}
          </div>

          {/* Share Button with .btn-poster */}
          <button
            onClick={handleShare}
            className="btn-poster w-full py-2.5 px-6 rounded-full bg-[#FFC928] text-[#171714] font-barlow text-base sm:text-lg tracking-wider uppercase border-[2.5px] border-[#171714] shadow-[3.5px_3.5px_0_#171714] hover:shadow-[5px_5px_0_#171714] flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <Share2 className="w-4 h-4" />
            <span>SHARE THE INVITE</span>
          </button>

          {/* Next Link */}
          <button
            onClick={onNextSection}
            className="text-center font-barlow text-sm font-black tracking-widest uppercase text-black/70 hover:text-black mt-1 transition-colors cursor-pointer"
          >
            NEXT: PHOTO WALL ↓
          </button>
        </div>
      </div>
    </section>
  );
}
