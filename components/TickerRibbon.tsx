'use client';

export default function TickerRibbon() {
  const items = [
    'GHAR PE DIWALI HAI',
    'THODA GLOW',
    'thoda chaos',
    'FULL DIWALI SCENE',
    'GOOD FOOD',
    'GREAT FITS',
    'QUESTIONABLE DANCE MOVES',
    'AARYA & FAMILY',
    'DIWALI 2026',
    'aa jao yaar',
  ];

  const repeated = [...items, ...items];

  return (
    <div className="relative z-20 overflow-hidden bg-[#F3C623] py-3.5 border-y-2 border-black select-none">
      <div className="animate-marquee-slow whitespace-nowrap flex items-center">
        {repeated.map((text, idx) => (
          <span key={idx} className="font-bebas text-lg sm:text-xl tracking-widest text-black mx-5 flex items-center">
            {idx % 3 === 2 ? (
              <em className="font-playfair not-italic font-bold">{text}</em>
            ) : (
              <span>{text}</span>
            )}
            <span className="mx-4 text-[#D92720] text-sm font-black">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}
