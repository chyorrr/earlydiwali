'use client';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MarigoldFlower, TraditionalDiya, DiyaSunburst } from './ReferenceGraphics';
import { sounds } from '@/lib/soundEffects';

interface HeroProps {
  onLightDiya: () => void;
  onSkip: () => void;
}

export default function ReferenceHero({ onLightDiya, onSkip }: HeroProps) {
  const [diyaLit, setDiyaLit] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  // Scroll animation: scrolling over the diya ignites the flame and rotates the sunburst
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrollProgress(scrollY);

      // Scroll over threshold ignites the diya flame automatically
      if (scrollY > 40 && !diyaLit) {
        setDiyaLit(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [diyaLit]);

  // Mouse move 3D tilt interaction over the diya
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const handleIgnite = () => {
    if (diyaLit) {
      onLightDiya();
      return;
    }
    setDiyaLit(true);
    sounds.playCelebrationChime();

    // Celebratory marigold petal confetti burst
    confetti({
      particleCount: 85,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#FFC928', '#D92720', '#075B36', '#F22978', '#FFF0D2'],
    });

    setTimeout(() => {
      onLightDiya();
    }, 1100);
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen bg-[#D92720] text-white flex items-center justify-center p-4 sm:p-6 select-none overflow-hidden"
    >
      {/* Outer rounded thin white border frame */}
      <div className="absolute inset-4 sm:inset-6 border-2 border-white/35 rounded-2xl sm:rounded-3xl pointer-events-none z-20" />

      {/* Top Left Header: DIWALI SCENE Badge (Clean transparent without any ugly white box) */}
      <div className="absolute top-7 left-7 sm:top-9 sm:left-12 z-30 flex items-center gap-2.5">
        <div className="w-7 h-7 rounded-lg bg-[#FFC928] border-2 border-[#171714] flex items-center justify-center shadow-[2px_2px_0_#171714]">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="15" rx="7.5" ry="3.8" fill="#D92720" stroke="#171714" strokeWidth="1.6" />
            <path
              d="M12 5 C13.8 8 14.5 10 13.5 12 C12.8 13 11.2 13 10.5 12 C9.5 10 10.2 8 12 5 Z"
              fill="#FFC928"
              stroke="#171714"
              strokeWidth="1.3"
            />
          </svg>
        </div>
        <span className="font-barlow font-black text-white text-base sm:text-lg tracking-wider uppercase leading-none drop-shadow-sm">
          DIWALI SCENE
        </span>
      </div>

      {/* Top Right "SKIP →" Button inside Frame (with comfortable clearance from corner flower) */}
      <button
        onClick={onSkip}
        className="absolute top-6 right-6 sm:top-9 sm:right-12 z-30 px-4 sm:px-5 py-1.5 rounded-full border border-white/80 text-white font-barlow font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:text-[#D92720] transition-all cursor-pointer shadow-sm active:scale-95"
      >
        SKIP →
      </button>

      {/* Corner Marigold Flowers: Beautifully framing corners without colliding with buttons */}
      <div className="absolute -bottom-8 -left-8 sm:-bottom-12 sm:-left-12 pointer-events-none z-10">
        <MarigoldFlower className="w-24 h-24 sm:w-44 sm:h-44 drop-shadow-xl" />
      </div>
      <div className="absolute -top-10 -right-10 sm:-top-14 sm:-right-14 pointer-events-none z-10">
        <MarigoldFlower className="w-24 h-24 sm:w-44 sm:h-44 drop-shadow-xl" />
      </div>

      {/* Center Main Content Container */}
      <div className="relative z-10 max-w-7xl w-full mx-auto flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-10 px-4 sm:px-10 pt-16 sm:pt-20 lg:pt-0">
        {/* Left Column: Heading, Subtitle and Poster CTA */}
        <div className="w-full lg:w-[440px] xl:w-[480px] flex-shrink-0 text-center lg:text-left z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="select-none"
          >
            {/* Line 1: EARLY */}
            <h1
              className="font-barlow font-black text-[#FFF0D2] uppercase tracking-normal leading-[0.82] select-none"
              style={{
                fontSize: 'clamp(3.6rem, 9vw, 6.8rem)',
                textShadow: '3px 3px 0px rgba(0, 0, 0, 0.22)',
              }}
            >
              EARLY
            </h1>

            {/* Line 2: DIWALI (Just below EARLY) */}
            <div
              className="font-barlow font-black text-[#FFF0D2] uppercase tracking-normal leading-[0.82] select-none"
              style={{
                fontSize: 'clamp(3.6rem, 9vw, 6.8rem)',
                textShadow: '3px 3px 0px rgba(0, 0, 0, 0.22)',
              }}
            >
              DIWALI
            </div>

            {/* Line 3: at Aarya's (at is small, Aarya's is cursive gold) */}
            <div className="flex items-baseline justify-center lg:justify-start gap-2 sm:gap-2.5 leading-none mt-1 sm:mt-1.5 select-none">
              <span className="font-playfair italic font-medium text-white/70 text-base sm:text-xl md:text-2xl lowercase">
                at
              </span>
              <span
                className="font-playfair italic font-black text-[#FFC928]"
                style={{
                  fontSize: 'clamp(3.2rem, 7.8vw, 5.8rem)',
                  filter: 'drop-shadow(0 4px 14px rgba(255, 201, 40, 0.4))',
                }}
              >
                Aarya&apos;s
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-[#FFF0D2]/90 text-xs sm:text-base max-w-xs sm:max-w-sm font-sans-clean leading-relaxed mt-3.5 mb-2 mx-auto lg:mx-0"
          >
            This Diwali, we&apos;re skipping the small talk and going straight to the{' '}
            <em className="font-playfair italic font-semibold text-white">
              mithai, masti and main character moments
            </em>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="font-barlow font-black text-[#FFC928] text-xs sm:text-sm tracking-[0.25em] uppercase mb-2.5"
          >
            HOSTED BY AARYA AND FAMILY
          </motion.div>

          {/* Quick Date, Time & Venue Tag */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-black/30 border border-white/20 text-[#FFF0D2] text-[10px] sm:text-[11px] font-barlow tracking-wider uppercase mb-5 sm:mb-6"
          >
            <span>SATURDAY, 31 OCT</span>
            <span className="text-[#FFC928]">•</span>
            <span>5:30 PM ONWARDS</span>
            <span className="text-[#FFC928]">•</span>
            <span>MALAD EAST</span>
          </motion.div>

          {/* Premium CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.35 }}
            className="flex flex-col items-center lg:items-start gap-2"
          >
            <button
              id="hero-jalao-diya-btn"
              onClick={handleIgnite}
              className="btn-poster group rounded-full px-7 sm:px-8 py-2.5 sm:py-3 bg-[#FFC928] text-[#171714] text-sm sm:text-base font-barlow font-black tracking-wider uppercase border-[2.5px] border-[#171714] shadow-[3.5px_3.5px_0_#171714] hover:shadow-[5px_5px_0_#171714] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_#171714] transition-all flex items-center justify-center gap-2 cursor-pointer"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900 }}
            >
              <span>{diyaLit ? 'DIYA JAL GAYA!' : 'JALAO DIYA'}</span>
              <span className="inline-block transition-transform duration-200 group-hover:translate-x-1 text-xl sm:text-2xl font-black">
                →
              </span>
            </button>
            <span className="text-[#FFF0D2]/80 text-[11px] sm:text-xs font-sans-clean">
              Tap the Diya to Confirm Your Shubh Aagman
            </span>
          </motion.div>
        </div>

        {/* Right Column: Giant Centered Sunburst + 3D Tilt Diya with Dynamic Radiance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="flex-1 flex justify-center items-center relative min-h-[280px] sm:min-h-[380px] lg:min-h-[520px] w-full cursor-pointer overflow-hidden lg:overflow-visible my-2 lg:my-0"
          style={{ perspective: '1100px' }}
        >
          {/* Centered Sunburst Rays with subtle continuous ambient spin & scroll rotation */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-100 ease-out"
            style={{
              transform: `translate(-50%, -50%) rotate(${scrollProgress * 0.14}deg)`,
            }}
          >
            <DiyaSunburst className="w-[620px] h-[620px] sm:w-[900px] sm:h-[900px] lg:w-[1150px] lg:h-[1150px] animate-sunburst-slow opacity-95" />
          </div>

          {/* The Golden Diya with 3D Mouse Tilt and Scroll Lift */}
          <motion.div
            animate={{
              rotateY: tilt.x,
              rotateX: tilt.y,
              scale: diyaLit ? 1.05 : 1,
            }}
            transition={{ type: 'spring', stiffness: 220, damping: 16 }}
            className="relative z-10"
            style={{
              transform: `translateY(${Math.min(scrollProgress * 0.18, 30)}px)`,
            }}
          >
            <TraditionalDiya lit={diyaLit} onClick={handleIgnite} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
