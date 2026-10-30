'use client';
import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '@/lib/soundEffects';

interface NavbarProps {
  activeSection: string;
}

export default function ReferenceNavbar({ activeSection }: NavbarProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show navbar once scrolled past top hero area
      setIsScrolled(window.scrollY > 120);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const steps = [
    { id: 'hero', label: '01', longLabel: 'HERO' },
    { id: 'reveal', label: '02', longLabel: '02 INVITE' },
    { id: 'fit-check', label: '03', longLabel: '03 FIT' },
    { id: 'photo-wall', label: '04', longLabel: '04 WALL' },
    { id: 'final-scene', label: '05', longLabel: '05 SCENE' },
  ];

  const scrollTo = (id: string) => {
    sounds.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    sounds.setMuted(next);
    if (!next) sounds.playClick();
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 h-14 bg-[#F5F2EB] border-b-2 border-black flex items-center justify-between px-4 sm:px-8 select-none transition-all duration-300 ${
        isScrolled
          ? 'translate-y-0 opacity-100 shadow-md'
          : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      {/* Brand */}
      <button
        onClick={() => scrollTo('hero')}
        className="flex items-center gap-2.5 group cursor-pointer focus:outline-none"
      >
        <div className="w-8 h-8 rounded-lg bg-[#F5C842] border-2 border-black flex items-center justify-center shadow-retro-sm group-hover:scale-105 transition-transform">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <ellipse cx="12" cy="15" rx="8" ry="4" fill="#E8392A" stroke="#171714" strokeWidth="1.6" />
            <path
              d="M12 5 C14 8 15 10 14 12 C13 13 11 13 10 12 C9 10 10 8 12 5 Z"
              fill="#F5C842"
              stroke="#171714"
              strokeWidth="1.3"
            />
          </svg>
        </div>
        <span className="font-bebas text-black text-lg tracking-widest font-bold">
          DIWALI SCENE
        </span>
      </button>

      {/* Step Progress Indicators & Audio */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {steps.map((s, idx) => {
            const isActive = activeSection === s.id;
            const isPassed =
              (activeSection === 'reveal' && idx === 0) ||
              (activeSection === 'fit-check' && idx < 2) ||
              (activeSection === 'photo-wall' && idx < 3) ||
              (activeSection === 'final-scene' && idx < 4);

            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`h-7 px-2.5 sm:px-3 rounded-full border-2 border-black font-bebas text-xs tracking-wider transition-all cursor-pointer flex items-center justify-center ${
                  isActive
                    ? 'bg-[#D32F2F] text-white shadow-retro-sm scale-105'
                    : isPassed
                    ? 'bg-[#F5C842] text-black font-bold'
                    : 'bg-transparent text-black/60 hover:text-black hover:border-black'
                }`}
              >
                {isPassed ? <span>✓</span> : <span>{isActive ? s.longLabel : s.label}</span>}
              </button>
            );
          })}
        </div>

        {/* Audio Toggle */}
        <button
          onClick={toggleSound}
          title={isMuted ? 'Unmute sounds' : 'Mute sounds'}
          className="w-8 h-8 ml-2 rounded-full border-2 border-black bg-white flex items-center justify-center text-black hover:bg-[#F5C842] transition-colors cursor-pointer"
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </nav>
  );
}
