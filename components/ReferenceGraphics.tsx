'use client';

// ── Exact Reference Marigold Flower SVG ───────────────────────────────────────
export function MarigoldFlower({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Petals */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
        <ellipse
          key={`outer-${i}`}
          cx="50"
          cy="50"
          rx="12"
          ry="28"
          fill="#F59E0B"
          stroke="#171714"
          strokeWidth="2"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      {/* Mid Petals */}
      {[15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345].map((deg, i) => (
        <ellipse
          key={`mid-${i}`}
          cx="50"
          cy="50"
          rx="9"
          ry="20"
          fill="#E8392A"
          stroke="#171714"
          strokeWidth="1.8"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      {/* Inner Petals */}
      {[0, 40, 80, 120, 160, 200, 240, 280, 320].map((deg, i) => (
        <ellipse
          key={`inner-${i}`}
          cx="50"
          cy="50"
          rx="6"
          ry="14"
          fill="#F3C623"
          stroke="#171714"
          strokeWidth="1.5"
          transform={`rotate(${deg} 50 50)`}
        />
      ))}
      {/* Core Center */}
      <circle cx="50" cy="50" r="10" fill="#D32F2F" stroke="#171714" strokeWidth="2" />
      <circle cx="50" cy="50" r="5" fill="#F3C623" />
    </svg>
  );
}

// ── Sunburst Rays (Centered behind the Diya) ─────────────────────────────────
export function DiyaSunburst({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none select-none ${className}`}>
      <svg
        width="1200"
        height="1200"
        viewBox="0 0 1200 1200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {Array.from({ length: 32 }).map((_, i) => {
          const angle = (360 / 32) * i;
          return (
            <path
              key={i}
              d="M600 600 L530 0 L670 0 Z"
              fill={i % 2 === 0 ? 'rgba(0, 0, 0, 0.16)' : 'transparent'}
              transform={`rotate(${angle} 600 600)`}
            />
          );
        })}
      </svg>
    </div>
  );
}

// ── Exact Reference Diya Illustration with Dynamic Warmth ────────────────────
export function TraditionalDiya({
  lit = false,
  onClick,
}: {
  lit?: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col items-center justify-center cursor-pointer select-none group transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98]"
    >
      {/* Dynamic ambient golden warmth bloom behind the Diya when lit */}
      {lit && (
        <div
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 sm:w-[460px] sm:h-[460px] rounded-full pointer-events-none z-0 animate-ambient-glow"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 201, 40, 0.6) 0%, rgba(245, 124, 0, 0.28) 45%, rgba(217, 39, 32, 0) 72%)',
            filter: 'blur(20px)',
          }}
        />
      )}

      {/* Floating warm candle embers drifting gracefully upward when lit */}
      {lit && (
        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-32 h-44 pointer-events-none z-20 overflow-hidden">
          <div
            className="absolute bottom-2 left-8 w-2 h-2 rounded-full bg-[#FFC928] opacity-85 shadow-[0_0_8px_#FFC928] animate-bounce"
            style={{ animationDuration: '2.4s' }}
          />
          <div
            className="absolute bottom-6 right-6 w-1.5 h-1.5 rounded-full bg-[#FFE082] opacity-75 shadow-[0_0_6px_#FFE082] animate-bounce"
            style={{ animationDuration: '3.1s', animationDelay: '0.4s' }}
          />
          <div
            className="absolute bottom-10 left-12 w-2.5 h-2.5 rounded-full bg-[#FFB300] opacity-90 shadow-[0_0_10px_#FFB300] animate-bounce"
            style={{ animationDuration: '2.7s', animationDelay: '0.9s' }}
          />
        </div>
      )}

      <svg
        viewBox="0 0 460 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-[270px] sm:w-[380px] md:w-[480px] lg:w-[560px] xl:w-[620px] max-w-full h-auto drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)]"
      >
        {/* Animated Flame with multi-layered depth */}
        {lit ? (
          <g
            className="animate-flame-dance origin-bottom"
            style={{
              transformOrigin: '230px 115px',
              filter: 'drop-shadow(0 0 16px rgba(255, 180, 0, 0.85)) drop-shadow(0 0 35px rgba(255, 87, 34, 0.6))',
            }}
          >
            {/* Outer flame */}
            <path
              d="M230 15 C264 56 272 96 254 118 C244 128 216 128 206 118 C188 96 196 56 230 15 Z"
              fill="#FF3D00"
              stroke="#171714"
              strokeWidth="2.8"
            />
            {/* Mid flame */}
            <path
              d="M230 38 C252 68 258 96 248 112 C240 120 220 120 212 112 C202 96 208 68 230 38 Z"
              fill="#FFC928"
            />
            {/* Core bright white/gold flame */}
            <path
              d="M230 64 C240 85 242 102 238 111 C234 116 226 116 222 111 C218 102 220 85 230 64 Z"
              fill="#FFFDE7"
            />
          </g>
        ) : (
          /* Unlit state: warm ready wick with glowing tip */
          <g>
            <circle
              cx="230"
              cy="104"
              r="4.5"
              fill="#D32F2F"
              className="animate-ping"
              style={{ animationDuration: '2s', transformOrigin: '230px 104px' }}
            />
            <circle cx="230" cy="104" r="3.5" fill="#FF5722" />
          </g>
        )}

        {/* Central Wick */}
        <line
          x1="230"
          y1="104"
          x2="230"
          y2="136"
          stroke="#171714"
          strokeWidth="5.5"
          strokeLinecap="round"
        />

        {/* Top Rim / Oil Basin */}
        <ellipse cx="230" cy="155" rx="165" ry="34" fill="#5D4037" stroke="#171714" strokeWidth="4.5" />
        {/* Dark oil level */}
        <ellipse cx="230" cy="158" rx="150" ry="25" fill="#2E1C14" />
        {/* Oil reflection highlight */}
        <path
          d="M125 158 C160 172 295 172 335 158"
          stroke="#8D6E63"
          strokeWidth="3"
          fill="none"
          opacity="0.65"
          strokeLinecap="round"
        />

        {/* Golden Bowl Main Body */}
        <path
          d="M65 155 C70 222 145 248 230 248 C315 248 390 222 395 155 Z"
          fill="#F5C842"
          stroke="#171714"
          strokeWidth="4.5"
        />

        {/* Bowl decorative curved groove line */}
        <path
          d="M85 176 C120 225 340 225 375 176"
          stroke="#171714"
          strokeWidth="4"
          fill="none"
        />

        {/* Ornamental Hanging Droplets / Beads along bowl */}
        {[
          { cx: 115, cy: 194 },
          { cx: 152, cy: 210 },
          { cx: 190, cy: 220 },
          { cx: 230, cy: 224 },
          { cx: 270, cy: 220 },
          { cx: 308, cy: 210 },
          { cx: 345, cy: 194 },
        ].map((pt, idx) => (
          <g key={idx}>
            <ellipse
              cx={pt.cx}
              cy={pt.cy}
              rx="8.5"
              ry="15"
              fill="#FFFDD0"
              stroke="#171714"
              strokeWidth="2.8"
            />
            <circle cx={pt.cx} cy={pt.cy + 19} r="3.5" fill="#171714" />
          </g>
        ))}

        {/* Tiered Pedestal Base */}
        <path
          d="M185 248 L170 274 L290 274 L275 248 Z"
          fill="#E5A817"
          stroke="#171714"
          strokeWidth="4"
        />
        <rect
          x="160"
          y="274"
          width="140"
          height="16"
          rx="3.5"
          fill="#C68A0E"
          stroke="#171714"
          strokeWidth="4"
        />

        {/* Base Drop Shadow */}
        <ellipse cx="230" cy="296" rx="85" ry="5.5" fill="#171714" opacity="0.3" />
      </svg>
    </div>
  );
}

// ── Hanging Toran / Bunting Border ─────────────────────────────────────────────
export function ToranBunting() {
  return (
    <div className="w-full overflow-hidden flex items-start justify-center border-b-2 border-black bg-transparent select-none py-1">
      <div className="flex flex-nowrap w-full justify-between items-start min-w-[1200px]">
        {Array.from({ length: 30 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center -mx-1">
            <div className="w-8 h-2 border-t-2 border-black rounded-b-full" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#F59E0B] border border-black -mt-1 shadow-xs" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#F3C623] border border-black" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#E8392A] border border-black" />
            <div className="w-3.5 h-5 bg-[#0F3D27] border border-black rounded-b-full shadow-xs" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── 100% Desi Approved Seal Stamp ─────────────────────────────────────────────
export function DesiApprovedStamp({ className = 'w-24 h-24' }: { className?: string }) {
  return (
    <div
      className={`relative rounded-full border-4 border-black bg-[#F3C623] text-black flex flex-col items-center justify-center p-2 text-center select-none shadow-retro-black ${className}`}
    >
      <span className="font-bebas text-[9px] tracking-widest leading-none font-bold">100% DESI</span>
      <span className="text-2xl leading-none my-0.5">✦</span>
      <span className="font-bebas text-[9px] tracking-widest leading-none font-bold">APPROVED</span>
    </div>
  );
}

// ── 4-Pointed Yellow/Pink Star ────────────────────────────────────────────────
export function Star4({ color = '#F3C623', size = 26 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} stroke="#171714" strokeWidth="1.6">
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
    </svg>
  );
}
