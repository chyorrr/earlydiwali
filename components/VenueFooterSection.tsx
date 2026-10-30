'use client';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, ExternalLink, ArrowUp, Heart, Sparkles, Music } from 'lucide-react';
import { sounds } from '@/lib/soundEffects';

export default function VenueFooterSection() {
  const scrollToTop = () => {
    sounds.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openGoogleMaps = () => {
    sounds.playClick();
    const mapUrl = 'https://www.google.com/maps/search/?api=1&query=402,+Sumit+Pramukh+Enclave,+Bachhani+Nagar,+Malad+East';
    window.open(mapUrl, '_blank');
  };

  return (
    <footer id="venue" className="relative bg-[#070103] pt-20 pb-12 border-t border-amber-500/20 text-white overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-amber-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Venue Location Card */}
        <div className="glass-gold rounded-3xl p-6 sm:p-10 mb-16 relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Info */}
            <div className="md:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest uppercase">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>Venue &amp; Coordinates</span>
              </div>

              <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider">
                AARYA&apos;S <span className="text-gold-gradient">RESIDENCE</span>
              </h3>

              <div className="space-y-1 text-sm text-neutral-300 font-sans-clean">
                <p className="font-semibold text-white">402, Sumit Pramukh Enclave</p>
                <p>Bachhani Nagar, Malad East, Mumbai</p>
                <p className="text-amber-200/80 text-xs">Timing: 5:30 PM Onwards &bull; Saturday, 31st October 2026</p>
              </div>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={openGoogleMaps}
                  className="px-5 py-2.5 rounded-full bg-amber-400 hover:bg-yellow-300 text-neutral-950 font-bebas text-sm tracking-wider font-bold flex items-center gap-2 shadow-md transition-all hover:scale-105"
                >
                  <Navigation className="w-4 h-4" />
                  <span>LOCATION DIKHAO (MAPS)</span>
                </button>

                <a
                  href="https://api.whatsapp.com/send?phone=919876543210&text=Hey%20Aarya!%20Reaching%20the%20Diwali%20party!"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => sounds.playClick()}
                  className="px-5 py-2.5 rounded-full bg-neutral-900 hover:bg-neutral-800 border border-amber-500/30 text-amber-300 font-bebas text-sm tracking-wider flex items-center gap-2 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  <span>CALL / WHATSAPP HOST</span>
                </a>
              </div>
            </div>

            {/* Quick Card Graphic */}
            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-xs rounded-2xl bg-[#1C080E] border border-amber-500/30 p-5 text-center relative shadow-xl">
                <div className="w-12 h-12 rounded-full bg-amber-500/20 border border-amber-400/50 mx-auto flex items-center justify-center text-amber-300 mb-3">
                  <Music className="w-6 h-6 animate-pulse" />
                </div>
                <div className="font-bebas text-lg text-white tracking-wider">OFFICIAL SOIREE PLAYLIST</div>
                <p className="text-xs text-neutral-400 mt-1 font-sans-clean">
                  Curated festive Bollywood beats, Coke Studio classics &amp; late night Punjabi grooves.
                </p>
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-xs text-amber-400 font-medium">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Playing Live on the Terrace</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/10 text-xs text-neutral-400">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-bebas text-white tracking-widest text-sm">DIL WAALI DIWALI 2026</span>
            <span className="hidden sm:inline">&bull;</span>
            <span>Crafted with love by Aarya &amp; Family</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-amber-500/20 text-amber-300 hover:text-white hover:border-amber-400 transition-all group"
          >
            <span className="font-bebas tracking-wider text-xs">BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
