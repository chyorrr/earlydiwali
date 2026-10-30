'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link as LinkIcon, Camera, X, Image as ImageIcon, Upload, Check } from 'lucide-react';
import { Star4, MarigoldFlower } from './ReferenceGraphics';
import { sounds } from '@/lib/soundEffects';

interface PhotoItem {
  id: string;
  tag: string;
  author: string;
  caption: string;
  imgUrl: string;
  rotation: string;
}

export default function ReferencePhotoWall({ onNextSection }: { onNextSection: () => void }) {
  // Demo data completely removed as requested
  const [photos, setPhotos] = useState<PhotoItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [caption, setCaption] = useState('');
  const [photo1, setPhoto1] = useState<string | null>(null);
  const [photo2, setPhoto2] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, slot: 1 | 2) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (slot === 1) setPhoto1(event.target?.result as string);
        if (slot === 2) setPhoto2(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhotos = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playCelebrationChime();

    const fallbackImg1 = photo1 || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80';
    const fallbackImg2 = photo2 || 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=600&auto=format&fit=crop&q=80';

    const new1: PhotoItem = {
      id: Date.now().toString() + '-1',
      tag: 'PARTY HIGHLIGHT #1',
      author: author.trim() || 'Attendee',
      caption: caption.trim() || 'Best night ever with the gang! 🎆',
      imgUrl: fallbackImg1,
      rotation: '-rotate-2',
    };

    const new2: PhotoItem = {
      id: Date.now().toString() + '-2',
      tag: 'PARTY HIGHLIGHT #2',
      author: author.trim() || 'Attendee',
      caption: caption.trim() || 'Diwali 2026 memories at Aarya’s place! ✨',
      imgUrl: fallbackImg2,
      rotation: 'rotate-2',
    };

    setPhotos([new1, new2, ...photos]);
    setPhoto1(null);
    setPhoto2(null);
    setCaption('');
    setAuthor('');
    setIsModalOpen(false);
  };

  const handleShareGallery = () => {
    sounds.playClick();
    if (navigator.share) {
      navigator.share({
        title: "Aarya's Diwali Party Photo Wall",
        text: 'Upload your 2 Diwali photos after the party to be part of the official wall:',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Gallery link copied to clipboard!');
    }
  };

  return (
    <section
      id="photo-wall"
      className="relative min-h-screen bg-[#F5F2EB] text-black py-16 sm:py-20 px-4 sm:px-8 bg-cream-dots flex flex-col items-center justify-center select-none w-full"
    >
      <div className="max-w-5xl w-full mx-auto">
        {/* Main Hot Pink Banner Card */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#E91E8C] text-white border-[2.5px] border-black pt-7 sm:pt-10 pb-7 sm:pb-10 px-5 sm:px-12 shadow-[5px_5px_0px_#171714] sm:shadow-[6px_6px_0px_#171714] relative overflow-hidden mb-10 sm:mb-14">
          {/* Top Metadata */}
          <div className="flex items-center justify-between mb-5 sm:mb-8">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 border-white flex items-center justify-center font-barlow text-xs font-black">
                04
              </div>
              <span className="font-barlow text-xs tracking-widest uppercase font-black">
                PHOTO WALL
              </span>
            </div>
            <div className="font-barlow text-[10px] sm:text-xs tracking-wider font-black uppercase text-black/80">
              AFTER DIWALI EDITION
            </div>
          </div>

          {/* Headline with Camera */}
          <div className="flex flex-row items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div
                className="font-barlow font-black text-black uppercase leading-[0.88]"
                style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)' }}
              >
                DIWALI KI
              </div>
              <div className="flex items-baseline gap-1.5 pt-1 flex-wrap">
                <span
                  className="font-playfair italic font-black text-[#FFF0D2] leading-[0.88]"
                  style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)' }}
                >
                  gossip
                </span>
                <span
                  className="font-barlow font-black text-black uppercase leading-[0.88]"
                  style={{ fontSize: 'clamp(2.2rem, 10vw, 5rem)' }}
                >
                  ARCHIVE
                </span>
              </div>

              {/* Notice */}
              <div className="mt-4 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-black/25 border border-white/20 backdrop-blur-xs">
                <p className="text-[#FFC928] font-black text-[10px] sm:text-xs tracking-wide uppercase font-barlow">
                  📸 AFTER DIWALI PARTY NOTICE:
                </p>
                <p className="text-white text-[11px] sm:text-sm font-sans-clean leading-relaxed mt-0.5">
                  After the party, upload <strong>2 photos of your choice</strong> here to build our official celebration gallery!
                </p>
              </div>
            </div>

            {/* Vintage Camera Illustration — hide on very small phones */}
            <div className="relative flex-shrink-0 hidden xs:block sm:block">
              <div className="w-20 sm:w-28 rounded-2xl bg-[#171714] border-2 border-black p-2 shadow-lg flex flex-col items-center justify-center relative aspect-square">
                <div className="w-10 h-10 rounded-full bg-neutral-700 border-2 border-neutral-400 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-[#171714] border border-neutral-300" />
                </div>
                <div className="absolute top-1 right-2.5 w-3 h-1.5 bg-neutral-500 rounded-xs" />
                <div className="absolute -top-1.5 right-3">
                  <div className="w-3 h-3 rounded-full bg-[#FFC928] border border-black" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center gap-3 pt-3 sm:pt-4">
            <button
              onClick={() => {
                sounds.playClick();
                setIsModalOpen(true);
              }}
              className="btn-retro py-2.5 sm:py-3.5 px-5 sm:px-7 rounded-full bg-[#F5C842] text-black font-barlow text-sm sm:text-base tracking-wider font-black uppercase cursor-pointer flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4 stroke-[2.5]" />
              <span>UPLOAD 2 DIWALI PHOTOS +</span>
            </button>
            <button
              onClick={handleShareGallery}
              className="btn-retro py-2.5 sm:py-3 px-4 sm:px-6 rounded-full bg-[#F5EDD8] text-black font-barlow text-xs sm:text-sm tracking-wider font-black uppercase flex items-center justify-center gap-2 cursor-pointer"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>SHARE GALLERY</span>
            </button>
          </div>

          {/* Bottom Right Corner Marigold Flower */}
          <div className="absolute -bottom-6 -right-6 pointer-events-none opacity-90">
            <MarigoldFlower className="w-28 sm:w-36 h-28 sm:h-36" />
          </div>
        </div>

        {/* Scrapbook Photo Grid: Clean state with 0 demo data */}
        {photos.length === 0 ? (
          <div className="w-full rounded-2xl border-2 border-dashed border-black/40 p-10 text-center bg-white/40">
            <div className="w-16 h-16 rounded-full bg-[#F5C842] border-2 border-black mx-auto flex items-center justify-center text-black mb-3 shadow-retro-sm">
              <Camera className="w-7 h-7" />
            </div>
            <h4 className="font-anton text-2xl text-black tracking-wide">
              THE WALL OPENS AFTER THE PARTY
            </h4>
            <p className="text-sm text-neutral-600 font-sans-clean max-w-md mx-auto mt-1 mb-5">
              No photos uploaded yet! Tomorrow after the Diwali party, every guest can upload 2 photos of their choice to build our official celebration gallery.
            </p>
            <button
              onClick={() => {
                sounds.playClick();
                setIsModalOpen(true);
              }}
              className="btn-retro inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F5C842] text-black font-syne text-sm font-extrabold"
            >
              <Upload className="w-4 h-4 stroke-[3]" />
              <span>BE THE FIRST TO UPLOAD 2 PHOTOS</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.02 }}
                className={`p-4 rounded-2xl bg-white border-2 border-black shadow-[5px_5px_0px_#171714] relative transition-transform ${item.rotation}`}
              >
                {/* Washi tape on top center */}
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#F5C842]/90 border border-black/40 rotate-1 shadow-xs"
                  style={{
                    backgroundImage:
                      'repeating-linear-gradient(45deg, transparent, transparent 4px, rgba(0,0,0,0.12) 4px, rgba(0,0,0,0.12) 8px)',
                  }}
                />

                {/* Photo Box */}
                <div className="w-full h-52 rounded-xl overflow-hidden border border-black mb-3 bg-neutral-100">
                  <img
                    src={item.imgUrl}
                    alt={item.author}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Tag sticker */}
                <div className="inline-block bg-[#F5C842] text-black border border-black font-syne text-[10px] tracking-wider px-2.5 py-0.5 rounded-sm font-bold mb-1.5">
                  {item.tag}
                </div>

                <p className="text-xs text-neutral-800 font-sans-clean leading-snug mb-3">
                  &ldquo;{item.caption}&rdquo;
                </p>

                <div className="text-[11px] font-syne tracking-wider text-neutral-600 border-t border-black/10 pt-2 font-bold">
                  — {item.author}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Link to Final Section */}
        <div className="text-center mt-14">
          <button
            onClick={onNextSection}
            className="font-syne text-xs sm:text-sm font-bold tracking-[0.25em] text-[#D32F2F] hover:text-black transition-colors cursor-pointer"
          >
            LAST STOP: THE SCENE ↓
          </button>
        </div>
      </div>

      {/* Modal: Upload 2 Photos */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/75 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-lg rounded-2xl bg-[#F5EDD8] text-black border-2 border-black p-6 sm:p-7 shadow-[6px_6px_0px_#171714] relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-black hover:text-red-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 mb-1">
                <Camera className="w-5 h-5 text-[#E91E8C]" />
                <h3 className="font-anton text-2xl tracking-wide text-[#E91E8C]">
                  UPLOAD YOUR 2 DIWALI PHOTOS
                </h3>
              </div>
              <p className="text-xs text-neutral-600 font-sans-clean mb-5">
                Pick 2 photos from your party night (your fit check, group selfie, or terrace fireworks). They will appear on the wall with your name!
              </p>

              <form onSubmit={handleAddPhotos} className="space-y-4">
                {/* 2 Photo Slots */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Photo Slot 1 */}
                  <label className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-black/5 min-h-[130px] relative overflow-hidden">
                    {photo1 ? (
                      <div className="relative w-full h-28">
                        <img src={photo1} alt="Preview 1" className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-neutral-500 mb-1" />
                        <span className="font-syne text-xs tracking-wider text-black font-bold">PHOTO 1</span>
                        <span className="text-[10px] text-neutral-500">Tap to browse</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 1)}
                    />
                  </label>

                  {/* Photo Slot 2 */}
                  <label className="border-2 border-dashed border-black rounded-xl p-3 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-black/5 min-h-[130px] relative overflow-hidden">
                    {photo2 ? (
                      <div className="relative w-full h-28">
                        <img src={photo2} alt="Preview 2" className="w-full h-full object-cover rounded-lg" />
                        <div className="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <ImageIcon className="w-6 h-6 text-neutral-500 mb-1" />
                        <span className="font-syne text-xs tracking-wider text-black font-bold">PHOTO 2</span>
                        <span className="text-[10px] text-neutral-500">Tap to browse</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, 2)}
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-syne tracking-wider text-neutral-700 mb-1 uppercase font-bold">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Nandani / Kabir"
                    className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-sm font-medium focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-syne tracking-wider text-neutral-700 mb-1 uppercase font-bold">
                    MOMENT CAPTION
                  </label>
                  <input
                    type="text"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="e.g. Mithai coma + fireworks on the terrace!"
                    className="w-full px-3 py-2 bg-white border-2 border-black rounded-xl text-sm font-medium focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-retro w-full mt-2 py-3.5 rounded-full bg-[#F5C842] text-black font-syne text-lg tracking-wider font-extrabold cursor-pointer"
                >
                  PIN 2 PHOTOS TO ARCHIVE →
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
