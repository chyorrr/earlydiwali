'use client';
import { motion } from 'framer-motion';
import { Share2, Calendar, Camera } from 'lucide-react';
import { ToranBunting, DesiApprovedStamp } from './ReferenceGraphics';
import { sounds } from '@/lib/soundEffects';

interface FinalSceneProps {
  guestName: string;
  onGoToFit: () => void;
  onGoToRSVP: () => void;
  onGoToWall: () => void;
}

export default function ReferenceFinalScene({
  guestName,
  onGoToFit,
  onGoToRSVP,
  onGoToWall,
}: FinalSceneProps) {
  const handleShareScene = () => {
    sounds.playClick();
    const shareText = `Scene set hai! You're invited to Early Diwali at Aarya's (Hosted by Aarya and Family) on Saturday, Oct 31, 2026 at 5:30 PM!`;
    if (navigator.share) {
      navigator.share({ title: 'Diwali Scene Set Hai!', text: shareText, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  const handleCalendar = () => {
    sounds.playClick();
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Early+Diwali+at+Aarya%27s&dates=20261031T120000Z/20261031T180000Z&details=Early+Diwali+celebration+with+Aarya+and+Family&location=402%2C+Sumit+Pramukh+Enclave%2C+Bachhani+Nagar%2C+Malad+East`;
    window.open(calUrl, '_blank');
  };

  return (
    <section id="final-scene" className="relative bg-[#D92720] text-white select-none">
      {/* Toran Bunting on the divider */}
      <ToranBunting />

      <div className="py-20 px-4 sm:px-8 max-w-5xl w-full mx-auto">
        {/* Top Indicator */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center font-barlow text-white text-sm font-black">
            05
          </div>
          <span className="font-barlow tracking-[0.25em] text-white text-sm uppercase font-black">
            FINAL SCENE
          </span>
        </div>

        {/* Content Flex */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Text & CTAs */}
          <div className="flex-1 text-center lg:text-left">
            {/* Exact 4-line typography matching reference screenshot */}
            <div className="space-y-0 leading-none mb-4">
              <h2 className="font-barlow font-black text-[#FFC928] leading-[0.88] text-5xl sm:text-7xl lg:text-8xl m-0 uppercase">
                SCENE SET
              </h2>
              <div className="font-barlow font-black text-[#FFC928] leading-[0.88] text-5xl sm:text-7xl lg:text-8xl m-0 uppercase">
                HAI.
              </div>
              <div className="font-barlow font-black text-white leading-[0.88] text-5xl sm:text-7xl lg:text-8xl m-0 uppercase">
                TU BAS
              </div>
              <div className="font-playfair italic font-black text-[#FFF0D2] leading-[0.88] text-5xl sm:text-7xl lg:text-8xl m-0 pt-1">
                aaja.
              </div>
            </div>

            <p className="text-white/95 text-base sm:text-lg font-sans-clean mb-8 max-w-md">
              Outfit sorted. Plans locked.{' '}
              <em className="font-playfair italic font-bold text-[#FFC928]">Ab mithai ka hisaab baad mein.</em>
            </p>

            {/* Buttons with .btn-poster */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={handleShareScene}
                className="btn-poster py-2.5 px-6 rounded-full bg-[#FFC928] text-[#171714] font-barlow text-base sm:text-lg tracking-wider uppercase border-[2.5px] border-[#171714] shadow-[3.5px_3.5px_0_#171714] flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Share2 className="w-4 h-4" />
                <span>SHARE THE SCENE</span>
              </button>

              <button
                onClick={handleCalendar}
                className="btn-poster py-2 px-4 rounded-full bg-[#FFF0D2] text-[#171714] font-barlow text-xs sm:text-sm tracking-wider uppercase border-[2px] border-[#171714] shadow-[3px_3px_0_#171714] flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>ADD TO CALENDAR</span>
              </button>

              <button
                onClick={onGoToWall}
                className="btn-poster py-2 px-4 rounded-full bg-[#F22978] text-white font-barlow text-xs sm:text-sm tracking-wider uppercase border-[2px] border-[#171714] shadow-[3px_3px_0_#171714] flex items-center gap-1.5 cursor-pointer active:scale-95"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>PHOTO WALL DEKH</span>
              </button>
            </div>
          </div>

          {/* Right Summary Box with Seal */}
          <div className="relative w-full max-w-sm">
            <div className="rounded-3xl bg-[#075B36] border-[3px] border-[#171714] p-6 sm:p-7 shadow-[6px_6px_0px_#171714] text-white space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-barlow font-black text-sm tracking-widest text-[#FFC928] uppercase">
                  YOUR SCENE, SUMMARISED
                </span>
                <span className="text-xs text-[#FFC928] font-black">★ VIP ★</span>
              </div>

              <div>
                <div className="font-barlow text-xs tracking-wider text-[#FFC928] font-black uppercase">WHEN</div>
                <div className="font-sans-clean font-medium text-sm text-white">
                  Saturday, 31 October 2026 &bull; 5:30 PM onwards
                </div>
              </div>

              <div className="border-t border-dashed border-white/10 pt-3">
                <div className="font-barlow text-xs tracking-wider text-[#FFC928] font-black uppercase">WHERE</div>
                <div className="font-sans-clean font-medium text-sm text-white">
                  402, Sumit Pramukh Enclave, Bachhani Nagar, Malad East
                </div>
              </div>

              <div className="border-t border-dashed border-white/10 pt-3">
                <div className="font-barlow text-xs tracking-wider text-[#FFC928] font-black uppercase">YOUR FIT</div>
                <button
                  onClick={onGoToFit}
                  className="font-sans-clean text-xs text-[#FFF0D2] underline hover:text-white cursor-pointer text-left"
                >
                  {guestName ? `${guestName}'s Fit Selected` : 'Not picked yet — choose a colour'}
                </button>
              </div>

              <div className="border-t border-dashed border-white/10 pt-3">
                <div className="font-barlow text-xs tracking-wider text-[#FFC928] font-black uppercase">HOST</div>
                <div className="font-sans-clean font-medium text-sm text-white">
                  Aarya and Family
                </div>
              </div>
            </div>

            {/* Circular Desi Approved Seal overlapping bottom right */}
            <div className="absolute -bottom-6 -right-5 z-10 rotate-12">
              <DesiApprovedStamp className="w-24 h-24 sm:w-28 sm:h-28" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
