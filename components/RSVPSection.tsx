'use client';
import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  User,
  Phone,
  Mail,
  Sparkles,
  Calendar,
  CheckCircle2,
  Share2,
  Send,
  ExternalLink,
  Flame,
  Award,
  QrCode,
  HeartHandshake
} from 'lucide-react';
import { sounds } from '@/lib/soundEffects';

interface RSVPProps {
  onRSVPConfirmed?: (name: string) => void;
}

export default function RSVPSection({ onRSVPConfirmed }: RSVPProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guestCount, setGuestCount] = useState<'solo' | 'plusone'>('solo');
  const [mithai, setMithai] = useState('Kaju Katli');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Pass ticket serial code
  const passSerial = useMemo(() => {
    return 'DWL-' + Math.floor(1000 + Math.random() * 9000);
  }, []);

  const mithaiOptions = [
    { label: 'Kaju Katli', subtitle: 'The Royal Pick' },
    { label: 'Gulab Jamun', subtitle: 'Warm & Sweet' },
    { label: 'Motichoor', subtitle: 'Desi Supreme' },
    { label: 'Rasgulla', subtitle: 'Soft & Classic' },
  ];

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length <= 10) {
      setPhone(val);
    }
  };

  const getCustomWhatsAppText = () => {
    const guestTitle = name.trim() || 'Guest';
    return (
`✨ *SHUBH DEEPAVALI 2026* ✨

Hey *${guestTitle}*! Your VIP Daawat Pass for *Aarya's Diwali Soirée* is officially confirmed! 🪔

🎟️ *Pass Code:* ${passSerial}
👤 *Guest(s):* ${guestCount === 'plusone' ? '2 (You + Guest)' : '1 (Solo)'}
🍬 *Preferred Mithai:* ${mithai}

📅 *Date:* Saturday, 31st October 2026
⏰ *Time:* 6:30 PM Onwards
📍 *Venue:* Aarya's Residence, Bandra West, Mumbai
👗 *Dress Code:* Festive Indian Chic / Main Character Energy

Get ready for endless mithai, rooftop skyshots, teen patti & good vibes! See you there! 🎆`
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    sounds.playClick();

    try {
      // Send RSVP details to the API endpoint
      await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: `+91${phone.trim()}`,
          email: email.trim() || undefined,
          guestCount,
          mithai,
          passCode: passSerial,
        }),
      });
    } catch (err) {
      console.warn('API error (falling back to direct pass generation)', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
      sounds.playCelebrationChime();

      // Fire celebratory confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FFD700', '#FFA500', '#FF3366', '#00FF88', '#FF69B4'],
      });

      if (onRSVPConfirmed) {
        onRSVPConfirmed(name.trim());
      }
    }
  };

  const openWhatsAppInvite = () => {
    sounds.playClick();
    const formattedText = encodeURIComponent(getCustomWhatsAppText());
    const waUrl = phone
      ? `https://api.whatsapp.com/send?phone=91${phone}&text=${formattedText}`
      : `https://api.whatsapp.com/send?text=${formattedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <section
      id="rsvp-section"
      className="relative min-h-screen py-24 px-4 sm:px-6 bg-[#0E0305] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[650px] bg-red-950/30 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto mb-14 relative z-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs tracking-widest uppercase mb-3">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span>Section 02 &bull; Exclusive Daawat Pass</span>
        </div>
        <h2 className="font-bebas text-4xl sm:text-6xl text-white tracking-wider leading-none mb-3">
          CONFIRM YOUR <span className="text-gold-gradient">SHUBH AAGMAN</span>
        </h2>
        <p className="text-neutral-400 text-sm sm:text-base font-sans-clean max-w-lg mx-auto">
          Reserve your collectible digital invitation pass. Receive instant confirmation and customized WhatsApp access details.
        </p>
      </motion.div>

      {/* Main Grid: Ticket on the Left, Form on the Right */}
      <div className="relative z-10 max-w-5xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* ── Left Side: Collectible VIP Ticket Preview ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 w-full flex justify-center"
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-gradient-to-b from-[#FFFDF9] via-[#FBF5E8] to-[#F5EAD4] text-neutral-900 border-2 border-amber-300/60 shadow-[0_25px_60px_rgba(255,160,0,0.18)] p-6 relative overflow-hidden group select-none transition-transform hover:-rotate-1"
          >
            {/* Holographic foil sheen overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/10 via-yellow-200/20 to-transparent pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity" />

            {/* Perforated ticket side cutouts */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0E0305] border-r border-amber-300/40" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0E0305] border-l border-amber-300/40" />

            {/* Ticket Header */}
            <div className="flex items-center justify-between border-b border-neutral-300 pb-3 mb-4">
              <div className="flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-600 fill-amber-600" />
                <span className="font-bebas text-xs tracking-widest text-neutral-600">VIP ACCESS PASS</span>
              </div>
              <span className="font-mono text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
                {passSerial}
              </span>
            </div>

            {/* Ticket Graphic Art */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#800F1B] to-[#500710] p-5 text-white overflow-hidden shadow-inner mb-4">
              <div className="absolute right-2 -bottom-2 opacity-15 pointer-events-none">
                <Sparkles className="w-32 h-32 text-amber-300" />
              </div>

              <div className="text-[10px] uppercase tracking-widest text-amber-300 font-bebas mb-1">
                AARYA&apos;S DIWALI SOIREE
              </div>
              <div className="font-bebas text-3xl tracking-wider leading-none text-white mb-1">
                PLOT TWIST:
              </div>
              <div className="font-playfair italic text-3xl text-amber-300 font-bold leading-none mb-3">
                Tu Invited Hai!
              </div>

              <div className="mt-4 pt-3 border-t border-white/15 flex items-end justify-between">
                <div>
                  <div className="text-[9px] uppercase tracking-wider text-neutral-300 font-sans-clean">GUEST NAME</div>
                  <div className="font-bebas text-xl text-yellow-200 tracking-wider truncate max-w-[180px]">
                    {name.trim() || 'YOUR NAME HERE'}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] uppercase tracking-wider text-neutral-300 font-sans-clean">PARTY SIZE</div>
                  <div className="font-bebas text-base text-white tracking-wider">
                    {guestCount === 'plusone' ? '2 PERSONS' : '1 PERSON'}
                  </div>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <div className="space-y-2 py-2 text-xs text-neutral-700 border-b border-dashed border-neutral-300 pb-4">
              <div className="flex justify-between">
                <span className="font-bebas tracking-wider text-neutral-500">WHEN:</span>
                <span className="font-medium text-neutral-900">Sat, Oct 31, 2026 &bull; 6:30 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bebas tracking-wider text-neutral-500">WHERE:</span>
                <span className="font-medium text-neutral-900">Aarya&apos;s Terrace, Bandra West</span>
              </div>
              <div className="flex justify-between">
                <span className="font-bebas tracking-wider text-neutral-500">MITHAI:</span>
                <span className="font-medium text-amber-800">{mithai}</span>
              </div>
            </div>

            {/* Ticket Footer / Barcode */}
            <div className="pt-3 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-bebas text-[9px] tracking-widest text-neutral-500">AUTHENTICATED</span>
                <div className="flex items-center gap-1 text-[11px] font-bold text-neutral-800">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% DESI APPROVED</span>
                </div>
              </div>
              {/* Simulated Barcode */}
              <div className="flex items-center gap-0.5 h-7">
                {[3, 1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 2, 4, 1, 2].map((w, i) => (
                  <div key={i} className="bg-neutral-800 h-full" style={{ width: `${w}px` }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Right Side: RSVP Form & WhatsApp Dispatch ───────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="lg:col-span-7 w-full"
        >
          <div className="glass-gold rounded-3xl p-6 sm:p-8 relative">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                /* The Registration Form */
                <motion.form
                  key="rsvp-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="border-b border-white/10 pb-4">
                    <h3 className="font-bebas text-2xl sm:text-3xl tracking-wider text-white">
                      ENTER YOUR DETAILS
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Your details will customize your digital entry pass and generate a direct WhatsApp invite message.
                    </p>
                  </div>

                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bebas tracking-widest text-amber-300 mb-1.5">
                      FULL NAME *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <User className="w-4 h-4 text-amber-400/70" />
                      </div>
                      <input
                        id="rsvp-input-name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-10 pr-4 py-3 bg-neutral-900/80 border border-amber-500/30 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* WhatsApp Number Input */}
                  <div>
                    <label className="block text-xs font-bebas tracking-widest text-amber-300 mb-1.5">
                      WHATSAPP NUMBER * (FOR CUSTOM INVITE PASS)
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400 gap-1.5 text-xs font-mono">
                        <Phone className="w-4 h-4 text-amber-400/70" />
                        <span className="text-amber-200/80 font-bold">+91</span>
                      </div>
                      <input
                        id="rsvp-input-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={handlePhoneChange}
                        placeholder="9876543210"
                        className="w-full pl-20 pr-4 py-3 bg-neutral-900/80 border border-amber-500/30 rounded-xl text-white placeholder-neutral-500 text-sm font-mono focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1 block">
                      We will format your customized WhatsApp invite ready to send.
                    </span>
                  </div>

                  {/* Email Input (Optional) */}
                  <div>
                    <label className="block text-xs font-bebas tracking-widest text-amber-300 mb-1.5">
                      EMAIL ADDRESS (OPTIONAL &bull; FOR CALENDAR SYNC)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                        <Mail className="w-4 h-4 text-amber-400/70" />
                      </div>
                      <input
                        id="rsvp-input-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="rahul@example.com"
                        className="w-full pl-10 pr-4 py-3 bg-neutral-900/80 border border-amber-500/30 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                      />
                    </div>
                  </div>

                  {/* Party Size / Plus One */}
                  <div>
                    <label className="block text-xs font-bebas tracking-widest text-amber-300 mb-1.5">
                      GUEST ATTENDANCE
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setGuestCount('solo');
                          sounds.playClick();
                        }}
                        className={`py-2.5 px-4 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                          guestCount === 'solo'
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(255,180,0,0.2)]'
                            : 'bg-neutral-900/50 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                        }`}
                      >
                        <User className="w-3.5 h-3.5" />
                        <span>Solo Entry (1)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setGuestCount('plusone');
                          sounds.playClick();
                        }}
                        className={`py-2.5 px-4 rounded-xl border text-xs font-medium transition-all flex items-center justify-center gap-2 ${
                          guestCount === 'plusone'
                            ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(255,180,0,0.2)]'
                            : 'bg-neutral-900/50 border-neutral-700 text-neutral-400 hover:border-neutral-600'
                        }`}
                      >
                        <HeartHandshake className="w-3.5 h-3.5" />
                        <span>Plus One (+1 Dost/Partner)</span>
                      </button>
                    </div>
                  </div>

                  {/* Mithai Preference */}
                  <div>
                    <label className="block text-xs font-bebas tracking-widest text-amber-300 mb-1.5">
                      YOUR FAVORITE MITHAI PREFERENCE
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {mithaiOptions.map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => {
                            setMithai(opt.label);
                            sounds.playClick();
                          }}
                          className={`p-2.5 rounded-xl border text-left transition-all ${
                            mithai === opt.label
                              ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-[0_0_10px_rgba(255,180,0,0.2)]'
                              : 'bg-neutral-900/50 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                          }`}
                        >
                          <div className="text-xs font-bold leading-none">{opt.label}</div>
                          <div className="text-[10px] text-neutral-500 mt-1">{opt.subtitle}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    id="submit-rsvp-btn"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden rounded-xl p-[1px] transition-all transform active:scale-98 disabled:opacity-50"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 rounded-xl" />
                    <span className="relative flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-300 text-neutral-950 font-bebas text-xl tracking-wider font-bold shadow-lg">
                      <Sparkles className="w-5 h-5 text-neutral-950" />
                      {isSubmitting ? 'GENERATING PASS...' : 'CONFIRM RSVP & GET WHATSAPP INVITE →'}
                    </span>
                  </button>
                </motion.form>
              ) : (
                /* Success Screen with Direct WhatsApp Sharing */
                <motion.div
                  key="rsvp-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 mx-auto flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div>
                    <div className="text-xs font-bebas tracking-widest text-amber-400 uppercase">
                      PASS CONFIRMED &bull; NO. {passSerial}
                    </div>
                    <h3 className="font-bebas text-3xl sm:text-4xl text-white tracking-wider mt-1">
                      {name.split(' ')[0].toUpperCase()}, SCENE SET HAI!
                    </h3>
                    <p className="text-neutral-300 text-sm max-w-md mx-auto mt-2 font-sans-clean">
                      Your VIP spot is locked. Click below to open your personalized WhatsApp invite ready to send to your phone or share with the gang!
                    </p>
                  </div>

                  {/* Primary WhatsApp Action */}
                  <button
                    onClick={openWhatsAppInvite}
                    className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bebas text-xl tracking-wider flex items-center justify-center gap-2.5 shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all hover:scale-102"
                  >
                    <Send className="w-5 h-5" />
                    <span>OPEN PERSONALIZED WHATSAPP INVITE</span>
                  </button>

                  {/* Secondary Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => {
                        sounds.playClick();
                        const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Aarya%27s+Diwali+Soir%C3%A9e+2026&dates=20261031T130000Z/20261031T180000Z&details=Diwali+Party+VIP+Pass+for+${encodeURIComponent(name)}+at+Aarya%27s+Residence.+Pass+No:+${passSerial}&location=Aarya%27s+Residence,+Bandra+West,+Mumbai`;
                        window.open(gCalUrl, '_blank');
                      }}
                      className="py-3 px-4 rounded-xl bg-neutral-900 border border-amber-500/30 text-amber-300 hover:text-white font-bebas text-sm tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>ADD TO GOOGLE CALENDAR</span>
                    </button>

                    <button
                      onClick={() => {
                        sounds.playClick();
                        if (navigator.share) {
                          navigator.share({
                            title: "Aarya's Diwali Soirée 2026",
                            text: `${name} is attending Aarya's Diwali celebration! Grab your pass:`,
                            url: window.location.href,
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                          alert('Invite link copied to clipboard!');
                        }
                      }}
                      className="py-3 px-4 rounded-xl bg-neutral-900 border border-amber-500/30 text-amber-300 hover:text-white font-bebas text-sm tracking-wider flex items-center justify-center gap-2 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>SHARE EVENT LINK</span>
                    </button>
                  </div>

                  <button
                    onClick={() => setIsSuccess(false)}
                    className="text-xs text-neutral-400 hover:text-white underline pt-2"
                  >
                    Need to modify your details? Edit RSVP
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
