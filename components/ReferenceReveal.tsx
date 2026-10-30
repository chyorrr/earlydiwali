'use client';
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Calendar,
  MapPin,
  Send,
  User,
  Phone,
  Check,
  Camera,
  Download,
  Upload,
  X,
  Sparkles,
  Shirt,
} from 'lucide-react';
import { MarigoldFlower } from './ReferenceGraphics';
import { sounds } from '@/lib/soundEffects';
import { downloadVipIdCard } from '@/lib/generateIdCard';

interface RevealProps {
  onNextSection: () => void;
  guestName: string;
  setGuestName: (name: string) => void;
  guestPhone: string;
  setGuestPhone: (phone: string) => void;
  guestPhoto: string | null;
  setGuestPhoto: (photo: string | null) => void;
  outfitColor: string;
  setOutfitColor: (color: string) => void;
}

const OUTFIT_OPTIONS = [
  { name: 'LAAL TAMATAR', hex: '#D32F2F', label: 'Poster Red' },
  { name: 'HALDI GANG', hex: '#F5C842', label: 'Marigold Yellow' },
  { name: 'HARI MIRCH', hex: '#0F3D27', label: 'Emerald Green' },
  { name: 'MOR PANKH', hex: '#0284C7', label: 'Peacock Blue' },
  { name: 'GULABI GANG', hex: '#E91E8C', label: 'Hot Pink' },
  { name: 'NARANGI BARFI', hex: '#EA580C', label: 'Saffron Orange' },
];

export default function ReferenceReveal({
  onNextSection,
  guestName,
  setGuestName,
  guestPhone,
  setGuestPhone,
  guestPhoto,
  setGuestPhoto,
  outfitColor,
  setOutfitColor,
}: RevealProps) {
  const [isAccepted, setIsAccepted] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const modalFileInputRef = useRef<HTMLInputElement>(null);

  const handleDaawatClick = () => {
    sounds.playClick();
    if (!guestName.trim() || !guestPhone.trim() || !guestPhoto) {
      setShowFormModal(true);
      return;
    }
    confirmRSVP();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setGuestPhoto(reader.result);
          sounds.playClick();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmRSVP = async () => {
    sounds.playCelebrationChime();
    setIsAccepted(true);
    setShowFormModal(false);

    confetti({
      particleCount: 110,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#FFC928', '#D92720', '#075B36', '#F22978', '#FFF0D2'],
    });

    try {
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: guestName.trim() || 'Aarya Guest',
          phone: `+91${guestPhone.trim()}`,
        }),
      });
    } catch {
      // Ignore API errors in dev
    }
  };

  const handleDownloadPass = async () => {
    sounds.playCelebrationChime();
    setIsDownloading(true);
    try {
      await downloadVipIdCard({
        name: guestName,
        phone: guestPhone,
        photoUrl: guestPhoto,
        outfitColor: outfitColor || 'MAIN CHARACTER ENERGY',
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const getCustomWhatsAppText = () => {
    const name = guestName.trim() || 'Dost';
    return `🪔 *EARLY DIWALI AT AARYA'S* 🪔\n\nHey *${name}*! Your VIP Daawat Pass for *Early Diwali at Aarya's* is confirmed! 🪔\n\n📅 Date: Saturday, 31st October 2026\n⏰ Time: 5:30 PM onwards\n📍 Venue: 402, Sumit Pramukh Enclave, Bachhani Nagar, Malad East\n🏠 Host: Aarya and Family\n\nLooking forward to catching up over mithai, terrace celebration & good times! See you there! 🎆`;
  };

  const openWhatsApp = () => {
    sounds.playClick();
    const encoded = encodeURIComponent(getCustomWhatsAppText());
    const url = guestPhone
      ? `https://api.whatsapp.com/send?phone=91${guestPhone}&text=${encoded}`
      : `https://api.whatsapp.com/send?text=${encoded}`;
    window.open(url, '_blank');
  };

  const openCalendar = () => {
    sounds.playClick();
    const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Early+Diwali+at+Aarya%27s&dates=20261031T120000Z/20261031T180000Z&details=Early+Diwali+celebration+with+Aarya+and+Family&location=402%2C+Sumit+Pramukh+Enclave%2C+Bachhani+Nagar%2C+Malad+East`;
    window.open(calUrl, '_blank');
  };

  const openLocation = () => {
    sounds.playClick();
    window.open(
      'https://www.google.com/maps/search/?api=1&query=402,+Sumit+Pramukh+Enclave,+Bachhani+Nagar,+Malad+East',
      '_blank'
    );
  };

  return (
    <section
      id="reveal"
      className="relative min-h-screen bg-[#075B36] text-white py-20 px-4 sm:px-8 bg-halftone-dots flex flex-col items-center justify-center select-none"
    >
      {/* Section Indicator */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-8 h-8 rounded-full border-2 border-[#FFC928] flex items-center justify-center font-barlow text-[#FFC928] text-sm font-black">
          02
        </div>
        <span className="font-barlow tracking-[0.25em] text-[#FFC928] text-sm uppercase font-black">
          THE REVEAL
        </span>
      </div>

      {/* Main Grid: VIP ID Card on left, Details on right */}
      <div className="max-w-5xl w-full mx-auto flex flex-col lg:flex-row items-center lg:items-start justify-center gap-10">
        {/* ── Left VIP Pass / ID Card ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30, rotate: -2 }}
          whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
          viewport={{ once: true }}
          className="w-full max-w-sm rounded-3xl bg-[#FFF0D2] text-[#171714] border-[3px] border-[#171714] p-5 sm:p-6 shadow-[6px_6px_0px_#171714] relative transition-transform hover:-rotate-1"
        >
          {/* Lanyard Punch Slot */}
          <div className="flex flex-col items-center mb-3">
            <div className="w-16 h-3.5 rounded-full bg-[#171714] border border-black/40 shadow-inner flex items-center justify-center">
              <div className="w-10 h-1 rounded-full bg-neutral-700" />
            </div>
            <div className="flex items-center justify-between w-full text-[10px] font-barlow tracking-widest text-[#171714]/75 pt-2 font-black uppercase">
              <span>NO. 0402</span>
              <span>MALAD EAST EDITION</span>
              <span>VIP PRINT</span>
            </div>
          </div>

          {/* ID Card Badge Frame */}
          <div className="relative rounded-2xl bg-gradient-to-b from-[#D92720] to-[#B71C1C] p-3 border-2 border-[#171714] overflow-hidden mb-4 shadow-sm text-white">
            {/* ID Card Header */}
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/20">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FFC928] animate-ping" />
                <span className="font-barlow font-black text-xs uppercase tracking-wider text-[#FFC928]">
                  EARLY DIWALI AT AARYA&apos;S
                </span>
              </div>
              <span className="bg-[#171714] text-[#FFC928] text-[9px] font-barlow font-black px-2 py-0.5 rounded-sm uppercase tracking-wider">
                VIP ALL-ACCESS
              </span>
            </div>

            {/* Obvious Photo Upload Target or Uploaded Photo */}
            {guestPhoto ? (
              <div className="relative w-full h-44 rounded-xl bg-neutral-900 border-2 border-[#171714] overflow-hidden shadow-inner group">
                <img
                  src={guestPhoto}
                  alt="VIP Pass Photo"
                  className="w-full h-full object-cover"
                />

                {/* Holographic Verified Tag */}
                <div className="absolute top-2 right-2 bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400 text-[#171714] text-[9px] font-barlow font-black px-2 py-0.5 rounded-full border border-black shadow-xs tracking-wider">
                  ★ PHOTO ID VERIFIED ★
                </div>

                {/* Corner Marigold */}
                <div className="absolute -bottom-2 -left-2 pointer-events-none">
                  <MarigoldFlower className="w-14 h-14 drop-shadow-md" />
                </div>

                {/* Change photo button */}
                <label className="absolute bottom-2 right-2 bg-[#171714]/90 hover:bg-[#171714] text-white text-[10px] font-barlow font-black px-2.5 py-1.5 rounded-lg border border-white/30 cursor-pointer flex items-center gap-1.5 shadow-md transition-all active:scale-95">
                  <Camera className="w-3.5 h-3.5 text-[#FFC928]" />
                  <span>CHANGE PHOTO</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoUpload}
                  />
                </label>
              </div>
            ) : (
              /* Clear, Obvious Photo Upload Dropzone (No Sunflower!) */
              <label
                htmlFor="main-vip-photo-upload"
                className="relative w-full h-44 rounded-xl border-2 border-dashed border-[#FFC928] bg-black/45 hover:bg-black/60 transition-all flex flex-col items-center justify-center p-4 cursor-pointer text-center group shadow-inner"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFC928] border-2 border-[#171714] flex items-center justify-center text-[#171714] mb-2 shadow-[2px_2px_0_#171714] group-hover:scale-110 transition-transform">
                  <Camera className="w-6 h-6 stroke-[2.5]" />
                </div>
                <span className="font-barlow font-black text-sm sm:text-base text-[#FFC928] tracking-wider uppercase">
                  UPLOAD YOUR PHOTO FOR VIP PASS
                </span>
                <span className="text-white/80 text-xs font-sans-clean mt-0.5">
                  Click here to add your picture to this VIP pass
                </span>
                <span className="mt-2 text-[10px] bg-white/20 px-2.5 py-1 rounded text-white font-barlow tracking-widest uppercase">
                  TAP TO BROWSE (PNG/JPG)
                </span>
                <input
                  id="main-vip-photo-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoUpload}
                />
              </label>
            )}

            {/* ID Card Barcode Strip */}
            <div className="mt-2.5 pt-2 border-t border-white/20 flex items-center justify-between">
              <div className="font-mono text-[9px] tracking-widest text-white/90">
                DS-2026-MALAD-530PM-VIP
              </div>
              <div className="flex gap-0.5 items-center h-4">
                {[4, 1, 3, 2, 5, 1, 4, 2, 3, 5, 1, 2, 4, 3, 2, 5].map((h, i) => (
                  <div
                    key={i}
                    className="bg-white"
                    style={{ width: `${(i % 3) + 1.2}px`, height: `${10 + h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-0 leading-none mb-3">
            <div className="font-barlow font-black text-[#D92720] text-4xl sm:text-5xl leading-[0.9] uppercase">
              PLOT TWIST:
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-barlow font-black text-[#171714] text-4xl sm:text-5xl leading-[0.9] uppercase">
                TU
              </span>
              <span className="font-playfair italic text-[#075B36] text-4xl sm:text-5xl font-black leading-[0.9]">
                invited
              </span>
            </div>
            <div className="font-barlow font-black text-[#D92720] text-4xl sm:text-5xl leading-[0.9] uppercase">
              HAI!
            </div>
          </div>

          <p className="text-xs text-[#171714]/85 font-sans-clean leading-relaxed mb-4">
            Good food. Great fits. Questionable dance moves. No excuses accepted.
          </p>

          {/* Bottom Stamp Area: Shows "ACCEPTED BY AARYA" rubber stamp */}
          <div className="pt-2 border-t border-[#171714]/15 flex items-center justify-between relative">
            <div>
              <div className="text-[11px] font-barlow tracking-widest text-[#171714]/80 uppercase font-black">
                {guestName ? `PASS FOR: ${guestName.toUpperCase()}` : 'PASS: VIP GUEST'}
              </div>
              <div className="text-[10px] text-[#075B36] font-barlow font-black uppercase">
                FIT: {outfitColor || 'OPEN / ANY FIT'}
              </div>
            </div>

            {/* Circular Stamp */}
            <div className="w-20 h-20 rounded-full border-[3px] border-[#D92720] text-[#D92720] flex flex-col items-center justify-center text-center p-1 font-barlow text-[8px] tracking-wider -rotate-12 font-black shadow-xs bg-[#FFF0D2]">
              <span className="text-[7px]">★ 100% DESI ★</span>
              <span className="text-[10px] leading-tight font-black uppercase">
                {isAccepted ? 'ACCEPTED' : 'INVITED'}
              </span>
              <span className="text-[8px] leading-none uppercase">BY AARYA</span>
              <span className="text-[6px] tracking-normal">VERIFIED 2026</span>
            </div>
          </div>
        </motion.div>

        {/* ── Right Event Details Card ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="w-full max-w-md flex flex-col gap-4"
        >
          {/* Black Admit Box */}
          <div className="rounded-2xl bg-[#091C13] border-[2.5px] border-[#171714] p-6 shadow-[5px_5px_0px_#FFC928] relative">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <span className="font-barlow font-black text-sm tracking-widest text-[#FFC928] uppercase">
                ADMIT ONE + BEST FIT
              </span>
              <span className="text-xs text-[#FFC928] font-bold">★ VIP ACCESS ★</span>
            </div>

            {/* Event Meta Rows */}
            <div className="space-y-3.5 text-sm">
              {[
                { label: 'EVENT', val: "Early Diwali at Aarya's" },
                { label: 'DATE', val: 'Saturday, 31 October 2026' },
                { label: 'TIME', val: '5:30 PM onwards' },
                { label: 'VENUE', val: '402, Sumit Pramukh Enclave, Bachhani Nagar, Malad East' },
                { label: 'HOST', val: 'Aarya and Family' },
                { label: 'YOUR FIT', val: outfitColor || 'Not selected yet (optional)' },
              ].map((row, idx) => (
                <div key={idx} className="flex items-start justify-between py-1 border-b border-white/5 gap-3">
                  <span className="font-barlow font-black text-xs tracking-widest text-[#FFC928] w-20 flex-shrink-0 uppercase">
                    {row.label}
                  </span>
                  <span className="font-sans-clean font-medium text-white text-right leading-tight">
                    {row.val}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Primary RSVP / Accept Button */}
          <button
            id="daawat-accepted-btn"
            onClick={handleDaawatClick}
            className={`btn-poster w-full py-2.5 px-5 rounded-full font-barlow text-base sm:text-lg tracking-wider uppercase border-[2.5px] border-[#171714] shadow-[3.5px_3.5px_0_#171714] hover:shadow-[5px_5px_0_#171714] cursor-pointer transition-all ${
              isAccepted
                ? 'bg-[#10B981] text-white hover:bg-[#059669]'
                : 'bg-[#FFC928] text-[#171714] hover:bg-[#ffd54f]'
            }`}
          >
            {isAccepted ? '✓ DAAWAT ACCEPTED' : 'DAAWAT ACCEPTED'}
          </button>

          {/* Download VIP ID Card Button */}
          <button
            id="download-vip-pass-btn"
            onClick={handleDownloadPass}
            disabled={isDownloading}
            className="btn-poster w-full py-2.5 px-5 rounded-full bg-[#FFC928] text-[#171714] font-barlow text-sm sm:text-base tracking-wider font-black uppercase border-[2.5px] border-[#171714] shadow-[3.5px_3.5px_0_#171714] hover:shadow-[5px_5px_0_#171714] flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all"
          >
            <Download className="w-4 h-4 text-[#171714]" />
            <span>{isDownloading ? 'GENERATING PASS...' : 'DOWNLOAD VIP ID CARD (PNG)'}</span>
          </button>

          {/* Secondary Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={openCalendar}
              className="btn-poster py-2 px-3 rounded-full bg-[#FFF0D2] text-[#171714] font-barlow text-xs sm:text-sm tracking-wider font-black uppercase border-[2px] border-[#171714] shadow-[3px_3px_0_#171714] flex items-center justify-center gap-1.5 hover:bg-white cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>ADD TO CALENDAR</span>
            </button>

            <button
              onClick={openLocation}
              className="btn-poster py-2 px-3 rounded-full bg-[#F22978] text-white font-barlow text-xs sm:text-sm tracking-wider font-black uppercase border-[2px] border-[#171714] shadow-[3px_3px_0_#171714] flex items-center justify-center gap-1.5 hover:bg-pink-600 cursor-pointer"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>LOCATION DIKHAO</span>
            </button>
          </div>

          {/* WhatsApp Direct Link (if RSVP confirmed) */}
          {isAccepted && (
            <button
              onClick={openWhatsApp}
              className="btn-poster w-full py-2.5 px-4 rounded-full bg-[#25D366] text-[#171714] font-barlow text-xs sm:text-sm tracking-wider font-black uppercase border-[2.5px] border-[#171714] shadow-[3.5px_3.5px_0_#171714] flex items-center justify-center gap-2 hover:bg-[#20ba59] cursor-pointer"
            >
              <Send className="w-3.5 h-3.5 text-black" />
              <span>OPEN CUSTOM WHATSAPP INVITE</span>
            </button>
          )}

          {/* Next Link */}
          <button
            onClick={onNextSection}
            className="text-center font-barlow text-xs sm:text-sm font-black tracking-widest text-[#FFC928] hover:text-white mt-0.5 transition-colors cursor-pointer uppercase"
          >
            NEXT: FIT CHECK ↓
          </button>
        </motion.div>
      </div>

      {/* RSVP & VIP ID Card Generation Modal */}
      <AnimatePresence>
        {showFormModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-3xl bg-[#FFF0D2] text-[#171714] border-[3.5px] border-[#171714] p-6 sm:p-8 shadow-[8px_8px_0px_#171714] relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowFormModal(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full border-2 border-black bg-white flex items-center justify-center text-black font-bold hover:bg-[#D92720] hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="text-center mb-6">
                <span className="bg-[#D92720] text-white text-[10px] font-barlow font-black px-2.5 py-1 rounded uppercase tracking-wider">
                  EARLY DIWALI AT AARYA&apos;S
                </span>
                <h3 className="font-barlow font-black text-3xl sm:text-4xl text-[#171714] uppercase leading-none mt-2">
                  ISSUE YOUR VIP ID PASS
                </h3>
                <p className="text-xs text-neutral-600 font-sans-clean mt-1">
                  Saturday, 31 Oct &bull; 5:30 PM &bull; 402, Sumit Pramukh Enclave, Malad East
                </p>
              </div>

              <div className="space-y-4">
                {/* 1. Name */}
                <div>
                  <label className="block text-xs font-barlow font-black text-[#171714] uppercase mb-1">
                    YOUR FULL NAME *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Rohan Sharma"
                      className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black rounded-xl text-black font-medium text-sm focus:outline-none shadow-retro-sm"
                    />
                  </div>
                </div>

                {/* 2. Phone */}
                <div>
                  <label className="block text-xs font-barlow font-black text-[#171714] uppercase mb-1">
                    WHATSAPP PHONE NUMBER *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
                    <input
                      type="tel"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full pl-10 pr-4 py-3 bg-white border-2 border-black rounded-xl text-black font-medium text-sm focus:outline-none shadow-retro-sm"
                    />
                  </div>
                  <span className="text-[10px] text-neutral-500 font-sans-clean">
                    We will format your customized WhatsApp invite pass automatically.
                  </span>
                </div>

                {/* 3. Photo Upload */}
                <div>
                  <label className="block text-xs font-barlow font-black text-[#171714] uppercase mb-1">
                    YOUR PASS PHOTO (FOR OFFICIAL VIP ID) *
                  </label>
                  {guestPhoto ? (
                    <div className="flex items-center gap-3 p-3 bg-white border-2 border-black rounded-xl shadow-retro-sm">
                      <img
                        src={guestPhoto}
                        alt="Preview"
                        className="w-14 h-14 rounded-lg object-cover border border-black"
                      />
                      <div className="flex-1">
                        <span className="text-xs font-barlow font-black text-[#075B36] uppercase flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> PHOTO ATTACHED
                        </span>
                        <label className="text-[11px] text-[#D92720] font-barlow font-bold uppercase underline cursor-pointer hover:text-black">
                          Change photo
                          <input
                            ref={modalFileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handlePhotoUpload}
                          />
                        </label>
                      </div>
                    </div>
                  ) : (
                    <label
                      htmlFor="modal-photo-upload"
                      className="w-full py-4 border-2 border-dashed border-[#D92720] bg-white rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-neutral-50 transition-colors shadow-retro-sm"
                    >
                      <Camera className="w-6 h-6 text-[#D92720] mb-1" />
                      <span className="font-barlow font-black text-xs uppercase text-[#D92720]">
                        TAP TO SELECT PHOTO
                      </span>
                      <span className="text-[10px] text-neutral-500 font-sans-clean">
                        Selfie or portrait for your ID pass
                      </span>
                      <input
                        id="modal-photo-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  )}
                </div>

                {/* 4. Outfit Color (Optional) */}
                <div>
                  <label className="block text-xs font-barlow font-black text-[#171714] uppercase mb-1">
                    OUTFIT THEME (OPTIONAL)
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {OUTFIT_OPTIONS.map((opt) => (
                      <button
                        key={opt.name}
                        type="button"
                        onClick={() => setOutfitColor(opt.name)}
                        className={`py-2 px-2 rounded-lg border-2 text-[10px] font-barlow font-black tracking-wider uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                          outfitColor === opt.name
                            ? 'border-black bg-black text-white shadow-xs'
                            : 'border-black/30 bg-white text-black hover:border-black'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full flex-shrink-0 border border-black/40"
                          style={{ backgroundColor: opt.hex }}
                        />
                        <span className="truncate">{opt.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={confirmRSVP}
                  disabled={!guestName.trim() || !guestPhone.trim()}
                  className="btn-poster w-full py-2.5 px-5 rounded-full bg-[#FFC928] text-black font-barlow text-base sm:text-lg font-black tracking-wider uppercase border-[2.5px] border-[#171714] shadow-[3.5px_3.5px_0_#171714] hover:shadow-[5px_5px_0_#171714] disabled:opacity-50 disabled:cursor-not-allowed mt-2 cursor-pointer active:scale-95"
                >
                  CONFIRM &amp; ISSUE VIP PASS →
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
