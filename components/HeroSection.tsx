'use client';
import { useState, useId, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Flame, Clock, MapPin, ChevronDown, Rocket, Heart } from 'lucide-react';
import { sounds } from '@/lib/soundEffects';

interface HeroSectionProps {
  onLaunchComplete: () => void;
  onExploreClick: () => void;
  isLaunching: boolean;
  setIsLaunching: (launching: boolean) => void;
}

// ── Realistic Diya SVG with warm flickering flame ─────────────────────────────
function GlowingDiya({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Ambient warm glow halo */}
      <div className="absolute w-24 h-24 rounded-full bg-amber-500/20 blur-xl pointer-events-none animate-pulse" />
      <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Flame */}
        <g className="animate-flame origin-bottom">
          <ellipse cx="60" cy="22" rx="7" ry="16" fill="url(#flameOuter)" />
          <ellipse cx="60" cy="25" rx="4.5" ry="11" fill="url(#flameInner)" />
          <ellipse cx="60" cy="28" rx="2" ry="5" fill="#FFF9E6" />
        </g>
        {/* Wick */}
        <path d="M60 36 C60 32 60 28 60 26" stroke="#4A2600" strokeWidth="2" strokeLinecap="round" />
        {/* Traditional Brass / Clay Diya Bowl */}
        <path
          d="M18 52 C26 40 46 38 60 38 C74 38 94 40 102 52 C98 74 76 78 60 78 C44 78 22 74 18 52 Z"
          fill="url(#diyaBody)"
          stroke="#FFD166"
          strokeWidth="1.5"
        />
        {/* Diya lip reflection */}
        <path d="M24 50 C38 43 54 42 60 42 C66 42 82 43 96 50" stroke="#FFE082" strokeWidth="1.5" fill="none" opacity="0.8" />
        {/* Diya base stand */}
        <ellipse cx="60" cy="79" rx="20" ry="4" fill="url(#diyaBase)" stroke="#C89600" strokeWidth="1" />
        <defs>
          <linearGradient id="flameOuter" x1="60" y1="6" x2="60" y2="38" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF3D00" />
            <stop offset="0.6" stopColor="#FF9100" />
            <stop offset="1" stopColor="#FFEA00" />
          </linearGradient>
          <linearGradient id="flameInner" x1="60" y1="14" x2="60" y2="36" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FFD600" />
            <stop offset="1" stopColor="#FFF9C4" />
          </linearGradient>
          <linearGradient id="diyaBody" x1="60" y1="38" x2="60" y2="78" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F59E0B" />
            <stop offset="0.5" stopColor="#B45309" />
            <stop offset="1" stopColor="#78350F" />
          </linearGradient>
          <linearGradient id="diyaBase" x1="40" y1="75" x2="80" y2="83" gradientUnits="userSpaceOnUse">
            <stop stopColor="#B45309" />
            <stop offset="1" stopColor="#451A03" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

// ── Hanging Golden Festive Toran Garland ───────────────────────────────────────
function FestiveGarland() {
  return (
    <div className="absolute top-0 left-0 right-0 h-16 pointer-events-none z-10 overflow-hidden flex justify-between opacity-80">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center animate-sway" style={{ animationDelay: `${(i % 5) * 0.4}s` }}>
          <div className="w-[1.5px] h-6 bg-gradient-to-b from-amber-400 to-amber-600" />
          <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 border border-amber-300 shadow-[0_0_8px_rgba(255,180,0,0.5)] flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
          </div>
          {i % 2 === 0 && (
            <div className="w-2.5 h-4 bg-gradient-to-b from-red-600 to-amber-600 rounded-b-full -mt-0.5" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function HeroSection({
  onLaunchComplete,
  onExploreClick,
  isLaunching,
  setIsLaunching,
}: HeroSectionProps) {
  const [fuseBurnt, setFuseBurnt] = useState(false);
  const [rocketLaunched, setRocketLaunched] = useState(false);
  const [sparks, setSparks] = useState<{ id: number; x: number; y: number }[]>([]);

  // Embers rising in background
  const [embers, setEmbers] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);

  useEffect(() => {
    const list = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 8,
      size: 2 + Math.random() * 4,
    }));
    setEmbers(list);
  }, []);

  const handleIgnite = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    sounds.playFuseCrackle();

    // Spawn sparks at the fuse tip
    const interval = setInterval(() => {
      setSparks((prev) => [
        ...prev.slice(-12),
        { id: Math.random(), x: (Math.random() - 0.5) * 30, y: (Math.random() - 0.5) * 30 },
      ]);
    }, 100);

    // After fuse burns, shoot the rocket
    setTimeout(() => {
      clearInterval(interval);
      setFuseBurnt(true);
      sounds.playRocketLaunch();
      setRocketLaunched(true);

      // Skyshot explodes in the sky
      setTimeout(() => {
        sounds.playExplosion();
        onLaunchComplete();
      }, 1000);
    }, 1800);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-12 overflow-hidden bg-gradient-to-b from-[#2a050b] via-[#1a0407] to-[#0a0204]"
    >
      {/* Sunburst radial lighting */}
      <div className="absolute inset-0 sunburst pointer-events-none opacity-40" />

      {/* Warm central aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-gradient-to-r from-amber-600/15 via-red-600/20 to-amber-500/15 rounded-full blur-[130px] pointer-events-none" />

      {/* Floating Garlands */}
      <FestiveGarland />

      {/* Floating Embers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {embers.map((e) => (
          <div
            key={e.id}
            className="ember-particle"
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              animationDelay: `${e.delay}s`,
              animationDuration: `${e.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Corner Glowing Diyas */}
      <div className="hidden lg:block absolute left-8 top-32 pointer-events-none">
        <GlowingDiya className="opacity-90 -rotate-6" />
      </div>
      <div className="hidden lg:block absolute right-8 top-32 pointer-events-none">
        <GlowingDiya className="opacity-90 rotate-6" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full flex flex-col lg:flex-row items-center justify-between gap-12 my-auto">
        {/* Left Column: Heading, Dates, Badges & Interactive Trigger */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-amber-500/5 border border-amber-500/30 text-amber-300 text-xs tracking-widest uppercase mb-5 backdrop-blur-md shadow-[0_0_15px_rgba(255,180,0,0.15)]"
          >
            <span>Aarya &amp; Family &bull; Early Diwali Soirée 2026</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-bebas text-5xl sm:text-7xl lg:text-8xl tracking-wider text-white leading-none uppercase mb-2"
          >
            Early Diwali At <span className="text-gold-gradient block sm:inline">AARYA&apos;S</span>
          </motion.h1>

          {/* Subtitle with Playfair Calligraphy */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-playfair italic text-2xl sm:text-3xl text-amber-200/90 font-medium mb-4"
          >
            Skip the small talk. Straight to the mithai &amp; main character moments.
          </motion.p>

          {/* Hindi Welcome */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-devanagari text-amber-300/70 text-sm tracking-wide mb-6"
          >
            दीपावली मिलन समारोह २०२६ &bull; शनिवार, ३१ अक्टूबर &bull; संध्या ५:३० बजे से
          </motion.p>

          {/* Event Quick Meta Chips */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-8"
          >
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-amber-500/20 text-neutral-300 text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>Saturday, Oct 31 &bull; 5:30 PM Onwards</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900/60 border border-amber-500/20 text-neutral-300 text-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>402, Sumit Pramukh Enclave, Bachhani Nagar, Malad East</span>
            </div>
          </motion.div>

          {/* Primary Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              id="hero-ignite-btn"
              onClick={handleIgnite}
              disabled={isLaunching}
              className={`w-full sm:w-auto relative group overflow-hidden rounded-full p-[2px] transition-all transform active:scale-95 ${isLaunching
                  ? 'opacity-80 cursor-wait'
                  : 'hover:scale-105 shadow-[0_0_35px_rgba(255,165,0,0.45)]'
                }`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-yellow-300 rounded-full animate-shimmer" />
              <span className="relative flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 font-bebas text-xl sm:text-2xl text-neutral-950 tracking-widest font-bold">
                <Flame className="w-5 h-5 text-red-600 fill-red-600 animate-bounce" />
                {isLaunching ? 'PATAKHA IGNITED...' : 'JALAO PATAKHA →'}
              </span>
            </button>

            <button
              onClick={onExploreClick}
              className="px-6 py-3.5 rounded-full bg-neutral-900/80 hover:bg-neutral-800 border border-amber-500/30 text-amber-200 text-xs tracking-widest uppercase font-bebas hover:text-white transition-all hover:scale-105"
            >
              EXPLORE THE PASS ↓
            </button>
          </motion.div>

          <p className="text-[11px] text-amber-200/50 mt-3 font-sans-clean">
            Click the button or tap the rocket to launch the grand terrace fireworks.
          </p>
        </div>

        {/* Right Column: 3D-styled Skyshot Rocket Centerpiece */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Subtle glow circle behind rocket */}
          <div className="absolute w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

          {/* Interactive Rocket Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={handleIgnite}
            className={`relative flex flex-col items-center cursor-pointer select-none group transition-transform ${isLaunching && !rocketLaunched ? 'scale-105' : 'hover:scale-105'
              }`}
          >
            {/* Rocket SVG or launched state */}
            <div
              className={`relative transition-all duration-1000 ${rocketLaunched
                  ? '-translate-y-[120vh] opacity-0 scale-75'
                  : ''
                }`}
            >
              {/* Spark particles at fuse tip */}
              {isLaunching && !fuseBurnt && (
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-8 pointer-events-none">
                  <div className="absolute inset-0 bg-yellow-300 rounded-full blur-sm animate-ping" />
                  {sparks.map((s) => (
                    <div
                      key={s.id}
                      className="absolute w-1.5 h-1.5 rounded-full bg-yellow-200"
                      style={{
                        transform: `translate(${s.x}px, ${s.y}px)`,
                        boxShadow: '0 0 6px #FFE082',
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Handcrafted Rocket Illustration */}
              <svg width="180" height="340" viewBox="0 0 180 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Bamboo / Wood Launch Stick */}
                <rect x="87" y="190" width="6" height="145" rx="3" fill="url(#stickGrad)" />
                <rect x="85" y="195" width="10" height="4" rx="2" fill="#D97706" />

                {/* Fuse Cord */}
                <path
                  d="M90 70 Q105 40 90 20 Q80 10 90 4"
                  stroke="#D97706"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Rocket Nose Cone (Pyramid / Aerodynamic Top) */}
                <polygon points="90,40 55,90 125,90" fill="url(#coneGrad)" stroke="#FFD166" strokeWidth="2" />
                <polygon points="90,40 70,90 90,90" fill="url(#coneHighlight)" />

                {/* Cylindrical Main Body */}
                <rect x="55" y="90" width="70" height="105" rx="8" fill="url(#rocketBody)" stroke="#FFD166" strokeWidth="2" />

                {/* Gold foiled decorative rings */}
                <rect x="55" y="105" width="70" height="6" fill="#FFD166" />
                <rect x="55" y="175" width="70" height="6" fill="#FFD166" />

                {/* Center Badge on Rocket */}
                <rect x="62" y="120" width="56" height="45" rx="4" fill="#1C060B" stroke="#F59E0B" strokeWidth="1" />
                <text x="90" y="137" textAnchor="middle" fill="#FFD166" fontFamily="'Bebas Neue', sans-serif" fontSize="13" letterSpacing="2">
                  SKYSHOT
                </text>
                <text x="90" y="152" textAnchor="middle" fill="#FFFFFF" fontFamily="'Playfair Display', serif" fontStyle="italic" fontSize="9">
                  Dil Waali
                </text>

                {/* Aerodynamic Fins */}
                <polygon points="55,160 30,195 55,190" fill="#B91C1C" stroke="#FFD166" strokeWidth="1.5" />
                <polygon points="125,160 150,195 125,190" fill="#991B1B" stroke="#FFD166" strokeWidth="1.5" />

                {/* Bottom Nozzle */}
                <rect x="75" y="195" width="30" height="10" rx="3" fill="#374151" stroke="#FFD166" strokeWidth="1" />

                {/* Gradients */}
                <defs>
                  <linearGradient id="stickGrad" x1="87" y1="190" x2="93" y2="335" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#92400E" />
                    <stop offset="1" stopColor="#451A03" />
                  </linearGradient>
                  <linearGradient id="coneGrad" x1="90" y1="40" x2="90" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFEA00" />
                    <stop offset="0.4" stopColor="#F59E0B" />
                    <stop offset="1" stopColor="#DC2626" />
                  </linearGradient>
                  <linearGradient id="coneHighlight" x1="80" y1="40" x2="80" y2="90" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FFF9C4" stopOpacity="0.8" />
                    <stop offset="1" stopColor="#F59E0B" stopOpacity="0" />
                  </linearGradient>
                  <linearGradient id="rocketBody" x1="55" y1="90" x2="125" y2="195" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#B91C1C" />
                    <stop offset="0.5" stopColor="#991B1B" />
                    <stop offset="1" stopColor="#7F1D1D" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Flame exhaust when launching */}
              {rocketLaunched && (
                <div className="absolute top-[210px] left-1/2 -translate-x-1/2 w-8 h-20 bg-gradient-to-b from-yellow-300 via-orange-500 to-transparent blur-xs animate-pulse" />
              )}
            </div>

            {/* Tap helper text */}
            {!isLaunching && (
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="mt-2 text-center"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-amber-500/30 text-amber-300 text-[11px] font-bebas tracking-widest backdrop-blur-md">
                  <Rocket className="w-3 h-3 text-amber-400" />
                  <span>TAP PATAKHA TO IGNITE</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-8">
        <button
          onClick={onExploreClick}
          className="flex flex-col items-center gap-1.5 text-neutral-400 hover:text-amber-300 transition-colors group"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-bebas">Scroll for Daawat Pass</span>
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce group-hover:scale-110" />
        </button>
      </div>
    </section>
  );
}
