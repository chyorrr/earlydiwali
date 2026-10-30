'use client';
import { useState, useEffect } from 'react';
import ReferenceNavbar from './ReferenceNavbar';
import ReferenceHero from './ReferenceHero';
import TickerRibbon from './TickerRibbon';
import ReferenceReveal from './ReferenceReveal';
import ReferenceFitCheck from './ReferenceFitCheck';
import ReferencePhotoWall from './ReferencePhotoWall';
import ReferenceFinalScene from './ReferenceFinalScene';

export default function DiwaliPage() {
  const [activeSection, setActiveSection] = useState('hero');
  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [guestPhoto, setGuestPhoto] = useState<string | null>(null);
  const [outfitColor, setOutfitColor] = useState<string>('');

  // Intersection observer or scroll spy to highlight nav pills
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'reveal', 'fit-check', 'photo-wall', 'final-scene'];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="relative min-h-screen bg-[#F5F2EB] text-[#1A1A1A]">
      {/* Exact Reference Navbar */}
      <ReferenceNavbar activeSection={activeSection} />

      {/* Section 01: Hero (Early Diwali at Aarya's) with Diya */}
      <ReferenceHero
        onLightDiya={() => scrollTo('reveal')}
        onSkip={() => scrollTo('reveal')}
      />

      {/* Marquee Ticker */}
      <TickerRibbon />

      {/* Section 02: The Reveal (Invite Pass, VIP ID Card & Download) */}
      <ReferenceReveal
        onNextSection={() => scrollTo('fit-check')}
        guestName={guestName}
        setGuestName={setGuestName}
        guestPhone={guestPhone}
        setGuestPhone={setGuestPhone}
        guestPhoto={guestPhoto}
        setGuestPhoto={setGuestPhoto}
        outfitColor={outfitColor}
        setOutfitColor={setOutfitColor}
      />

      {/* Section 03: Fit Check, Festive Edition */}
      <ReferenceFitCheck
        onNextSection={() => scrollTo('photo-wall')}
        guestName={guestName}
        setGuestName={setGuestName}
        outfitColor={outfitColor}
        setOutfitColor={setOutfitColor}
      />

      {/* Section 04: Gossip Archive & Photo Wall */}
      <ReferencePhotoWall
        onNextSection={() => scrollTo('final-scene')}
      />

      {/* Section 05: Final Scene (Scene Set Hai) with Toran Bunting */}
      <ReferenceFinalScene
        guestName={guestName}
        onGoToFit={() => scrollTo('fit-check')}
        onGoToRSVP={() => scrollTo('reveal')}
        onGoToWall={() => scrollTo('photo-wall')}
      />
    </main>
  );
}
