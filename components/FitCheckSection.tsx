'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Palette, Sparkles, Check, Share2, Tag, Shirt } from 'lucide-react';
import { sounds } from '@/lib/soundEffects';

interface ColorTheme {
  id: string;
  name: string;
  hindiName: string;
  hex: string;
  bgGradient: string;
  textColor: string;
  vibe: string;
  vibeQuote: string;
}

const PALETTES: ColorTheme[] = [
  {
    id: 'haldi',
    name: 'Marigold Gold',
    hindiName: 'गेंदा पीला',
    hex: '#F59E0B',
    bgGradient: 'from-amber-500/30 to-yellow-600/30',
    textColor: 'text-amber-400',
    vibe: 'Sun-kissed & Radiant',
    vibeQuote: 'Bright enough to light up the whole rooftop without electricity.',
  },
  {
    id: 'rani',
    name: 'Rani Pink',
    hindiName: 'रानी गुलाबी',
    hex: '#E11D48',
    bgGradient: 'from-rose-500/30 to-pink-600/30',
    textColor: 'text-rose-400',
    vibe: 'Main Character Royalty',
    vibeQuote: 'Unapologetically bold. Guaranteed to be in 90% of the Instagram stories.',
  },
  {
    id: 'peacock',
    name: 'Emerald Peacock',
    hindiName: 'मयूर हरा',
    hex: '#059669',
    bgGradient: 'from-emerald-500/30 to-teal-700/30',
    textColor: 'text-emerald-400',
    vibe: 'Regal & Understated',
    vibeQuote: 'Rich heritage energy. Looks straight out of a Sanjay Leela Bhansali set.',
  },
  {
    id: 'crimson',
    name: 'Royal Velvet Red',
    hindiName: 'शाही लाल',
    hex: '#DC2626',
    bgGradient: 'from-red-600/30 to-red-950/40',
    textColor: 'text-red-400',
    vibe: 'Patakha Level Energy',
    vibeQuote: 'Classic Diwali warmth. Ready to win the best-dressed trophy.',
  },
  {
    id: 'midnight',
    name: 'Midnight Kurta',
    hindiName: 'आधी रात नीला',
    hex: '#3B82F6',
    bgGradient: 'from-blue-600/30 to-indigo-950/40',
    textColor: 'text-blue-400',
    vibe: 'Sleek & Mysterious',
    vibeQuote: 'The quiet stunner. Perfect contrast against glowing golden sparklers.',
  },
];

export default function FitCheckSection() {
  const [selectedColor, setSelectedColor] = useState<ColorTheme>(PALETTES[0]);
  const [customName, setCustomName] = useState('');

  return (
    <section id="fit-check" className="relative py-24 px-4 sm:px-6 bg-[#0B0305] overflow-hidden">
      {/* Background ambient lighting matching selected color */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full blur-[160px] pointer-events-none transition-colors duration-700 opacity-20"
        style={{ backgroundColor: selectedColor.hex }}
      />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest uppercase mb-3">
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span>Section 03 &bull; Dress Code & Fit Pass</span>
          </div>
          <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider leading-none mb-3">
            PICK YOUR <span className="text-gold-gradient">COLOUR ERA</span>
          </h2>
          <p className="text-neutral-400 text-sm font-sans-clean">
            Desi glam, traditional chic, or contemporary Indo-western. Choose your color signature and print your digital fit pass.
          </p>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Controls: Color Swatches & Input */}
          <div className="lg:col-span-6 space-y-6">
            <div className="glass-gold rounded-3xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-bebas text-lg tracking-wider text-amber-300 flex items-center gap-2">
                  <Shirt className="w-4 h-4" />
                  SELECT YOUR SHADE
                </span>
                <span className="text-xs text-neutral-400 font-sans-clean">5 Festive Palettes</span>
              </div>

              {/* Swatch options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PALETTES.map((color) => {
                  const isActive = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => {
                        setSelectedColor(color);
                        sounds.playClick();
                      }}
                      className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                        isActive
                          ? 'bg-neutral-800/90 border-amber-400 shadow-[0_0_15px_rgba(255,180,0,0.25)] scale-102'
                          : 'bg-neutral-900/40 border-neutral-800 hover:border-neutral-700'
                      }`}
                    >
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-md border border-white/20"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isActive && <Check className="w-4 h-4 text-white stroke-[3]" />}
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold text-white leading-tight">{color.name}</div>
                        <div className="text-[10px] text-amber-300/70 font-devanagari">{color.hindiName}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Name on Fit Pass */}
              <div className="pt-2">
                <label className="block text-xs font-bebas tracking-widest text-amber-300 mb-1.5">
                  STAMP YOUR NAME ON THE FIT PASS
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value)}
                    placeholder="Enter your name (e.g. Ananya)"
                    className="w-full px-4 py-3 bg-neutral-900/80 border border-amber-500/30 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <Tag className="w-4 h-4 text-amber-400/60" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Preview Card */}
          <div className="lg:col-span-6 flex justify-center">
            <motion.div
              key={selectedColor.id}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-sm rounded-3xl p-6 sm:p-7 relative overflow-hidden text-white border-2 border-amber-400/50 shadow-[0_25px_50px_rgba(0,0,0,0.6)] select-none"
              style={{
                background: `linear-gradient(145deg, #1A0A0E 0%, #0D0407 100%)`,
              }}
            >
              {/* Colored accent banner */}
              <div
                className="absolute top-0 left-0 right-0 h-3"
                style={{ backgroundColor: selectedColor.hex }}
              />

              {/* Watermark Logo */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5 pt-1">
                <div>
                  <span className="font-bebas text-xs tracking-widest text-amber-400">FIT CHECK CERTIFICATE</span>
                  <div className="font-playfair italic text-xs text-neutral-400">Aarya&apos;s Soirée 2026</div>
                </div>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: selectedColor.hex, boxShadow: `0 0 10px ${selectedColor.hex}` }}
                />
              </div>

              {/* Main Fit Details */}
              <div className="space-y-4">
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-sans-clean">CURATED PALETTE</div>
                  <div className="font-bebas text-3xl tracking-wider" style={{ color: selectedColor.hex }}>
                    {selectedColor.name.toUpperCase()}
                  </div>
                  <div className="font-devanagari text-xs text-neutral-300">{selectedColor.hindiName}</div>
                </div>

                <div className="p-4 rounded-2xl bg-neutral-900/80 border border-white/10">
                  <div className="text-[10px] uppercase tracking-widest text-amber-300/80 font-bebas mb-1">
                    VIBE CHECK
                  </div>
                  <div className="font-playfair italic text-base font-semibold text-white mb-1">
                    &ldquo;{selectedColor.vibe}&rdquo;
                  </div>
                  <div className="text-xs text-neutral-400 font-sans-clean leading-relaxed">
                    {selectedColor.vibeQuote}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div>
                    <div className="text-[9px] uppercase tracking-wider text-neutral-400">PASSHOLDER</div>
                    <div className="font-bebas text-xl text-yellow-200 tracking-wider">
                      {customName.trim() || 'MAIN CHARACTER'}
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl border border-amber-400/40 flex items-center justify-center bg-amber-400/10">
                    <Sparkles className="w-6 h-6 text-amber-300" />
                  </div>
                </div>
              </div>

              {/* Barcode / Stamp */}
              <div className="mt-6 pt-4 border-t border-dashed border-white/20 flex items-center justify-between text-[10px] text-neutral-400 font-mono">
                <span>COLOR HEX: {selectedColor.hex}</span>
                <span className="text-amber-400 font-bold">READY TO SLAY ✦</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
