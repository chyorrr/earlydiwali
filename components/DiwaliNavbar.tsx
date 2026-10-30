'use client';
import { useState, useEffect } from 'react';
import { Sparkles, Volume2, VolumeX, Menu, X, ArrowUpRight, Flame } from 'lucide-react';
import { sounds } from '@/lib/soundEffects';

interface NavbarProps {
  onRSVPClick: () => void;
}

export default function DiwaliNavbar({ onRSVPClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    sounds.setMuted(nextState);
    if (!nextState) {
      sounds.playClick();
    }
  };

  const navLinks = [
    { name: 'SkyShow', href: '#hero' },
    { name: 'VIP Pass', href: '#rsvp-section' },
    { name: 'Fit Check', href: '#fit-check' },
    { name: 'Itinerary', href: '#itinerary' },
    { name: 'Wishes Wall', href: '#gossip-wall' },
  ];

  return (
    <>
      <nav
        className={`fixed top-4 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 flex justify-center`}
      >
        <div
          className={`w-full max-w-5xl rounded-full transition-all duration-300 flex items-center justify-between px-5 sm:px-7 py-3 border ${
            scrolled
              ? 'bg-[#120609]/80 backdrop-blur-xl border-amber-500/30 shadow-[0_12px_40px_rgba(0,0,0,0.6)]'
              : 'bg-[#1a080c]/60 backdrop-blur-md border-amber-500/20 shadow-[0_8px_30px_rgba(0,0,0,0.4)]'
          }`}
        >
          {/* Brand Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
            onClick={() => sounds.playClick()}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-[1.5px] shadow-[0_0_15px_rgba(255,180,0,0.4)] group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#1e070d] rounded-full flex items-center justify-center">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bebas text-lg sm:text-xl tracking-wider text-white leading-none">
                DIL WAALI <span className="text-amber-400">DIWALI</span>
              </span>
              <span className="text-[9px] font-sans-clean tracking-widest text-amber-200/60 uppercase">
                Aarya &bull; Oct 31, 2026
              </span>
            </div>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => sounds.playClick()}
                className="text-xs uppercase tracking-widest text-neutral-300 hover:text-amber-300 font-medium transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-gradient-to-r from-amber-400 to-amber-200 transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Actions: Sound toggle + RSVP CTA */}
          <div className="flex items-center gap-3">
            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              title={isMuted ? 'Unmute festive sounds' : 'Mute sounds'}
              className="w-9 h-9 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-300 transition-all hover:scale-105"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-neutral-400" />
              ) : (
                <div className="flex items-center gap-0.5">
                  <Volume2 className="w-4 h-4 text-amber-400" />
                  <div className="hidden sm:flex items-end gap-0.5 h-3 ml-0.5">
                    <span className="w-0.5 h-2 bg-amber-400 animate-pulse" />
                    <span className="w-0.5 h-3 bg-amber-300 animate-pulse" style={{ animationDelay: '0.2s' }} />
                    <span className="w-0.5 h-1.5 bg-amber-400 animate-pulse" style={{ animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
            </button>

            {/* RSVP Button */}
            <button
              id="nav-rsvp-btn"
              onClick={() => {
                sounds.playClick();
                onRSVPClick();
              }}
              className="relative group overflow-hidden rounded-full p-[1px] font-bebas tracking-widest text-sm text-neutral-900 shadow-[0_0_20px_rgba(255,180,0,0.3)] transition-all hover:scale-105"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-full animate-shimmer" />
              <span className="relative flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 font-bold transition-all group-hover:from-yellow-300 group-hover:to-amber-400">
                <Sparkles className="w-3.5 h-3.5 text-neutral-900" />
                RSVP PASS
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-neutral-800/80 border border-neutral-700 flex items-center justify-center text-neutral-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl md:hidden pt-24 px-6 flex flex-col gap-4">
          <div className="flex flex-col gap-3 py-4 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  sounds.playClick();
                }}
                className="flex items-center justify-between text-lg font-bebas tracking-widest text-neutral-200 hover:text-amber-400 py-2 border-b border-neutral-800"
              >
                {link.name}
                <ArrowUpRight className="w-4 h-4 text-amber-400" />
              </a>
            ))}
          </div>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onRSVPClick();
            }}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-neutral-950 font-bebas text-lg tracking-widest mt-2 flex items-center justify-center gap-2 shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
            CONFIRM YOUR RSVP
          </button>
        </div>
      )}
    </>
  );
}
