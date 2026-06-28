"use client";

/**
 * Hero illustration matching the OMDC mockup:
 * - central 3D-rendered white tooth on a circular pink pedestal
 * - two glowing pink orbital rings
 * - pink shield badge with white star (protection/safety)
 * - secondary small tooth on pedestal (left)
 * - toothbrush (pink/white) (bottom-left)
 * - dental mirror (pink handle) (right)
 * - potted pink plant (bottom-right)
 * - small sparkle accents
 * - decorative pink archway (right edge)
 *
 * All elements are SVG so they scale crisply on any screen.
 */

export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 600"
      className={className}
      role="img"
      aria-label="Ilustrasi gigi 3D dengan perisai perlindungan, cincin merah muda, dan elemen klinik gigi OMDC"
    >
      <defs>
        {/* Tooth gradient */}
        <linearGradient id="tooth-body" x1="180" y1="120" x2="420" y2="500" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#FDF2F8" />
          <stop offset="1" stopColor="#FBCFE8" />
        </linearGradient>
        <radialGradient id="tooth-shine" cx="0.3" cy="0.25" r="0.6">
          <stop stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="tooth-shadow" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#F472B6" stopOpacity="0" />
          <stop offset="1" stopColor="#DB2777" stopOpacity="0.35" />
        </linearGradient>

        {/* Pedestal */}
        <radialGradient id="pedestal" cx="0.5" cy="0.4" r="0.55">
          <stop stopColor="#FCE7F3" />
          <stop offset="1" stopColor="#F9A8D4" />
        </radialGradient>
        <linearGradient id="pedestal-side" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#F9A8D4" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>

        {/* Shield */}
        <linearGradient id="shield-grad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#BE185D" />
          <stop offset="0.55" stopColor="#DB2777" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
        <linearGradient id="shield-shine" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Rings */}
        <linearGradient id="ring-grad" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#F472B6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>

        {/* Plant */}
        <linearGradient id="leaf-grad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#F472B6" />
          <stop offset="1" stopColor="#9D174D" />
        </linearGradient>
        <linearGradient id="pot-grad" x1="0" y1="0" x2="0" y2="1">
          <stop stopColor="#FBCFE8" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>

        {/* Toothbrush */}
        <linearGradient id="brush-handle" x1="0" y1="0" x2="1" y2="0">
          <stop stopColor="#F472B6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>

        {/* Mirror */}
        <linearGradient id="mirror-head" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#FCE7F3" />
          <stop offset="1" stopColor="#F9A8D4" />
        </linearGradient>

        {/* Drop shadow */}
        <filter id="soft-shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" />
          <feOffset dx="0" dy="10" result="off" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.35" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <filter id="ring-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Background decorative arch (right side) */}
      <path
        d="M540 60 C 580 180, 580 420, 540 540 L 600 540 L 600 60 Z"
        fill="#FBCFE8"
        opacity="0.55"
      />
      <circle cx="565" cy="120" r="40" fill="#F9A8D4" opacity="0.45" />
      <circle cx="585" cy="470" r="28" fill="#F472B6" opacity="0.35" />

      {/* Background dotted texture */}
      <g opacity="0.35">
        <circle cx="100" cy="120" r="3" fill="#EC4899" />
        <circle cx="140" cy="180" r="2" fill="#EC4899" />
        <circle cx="80" cy="220" r="2.5" fill="#EC4899" />
        <circle cx="480" cy="160" r="2" fill="#EC4899" />
        <circle cx="520" cy="220" r="3" fill="#EC4899" />
        <circle cx="60" cy="450" r="2.5" fill="#EC4899" />
      </g>

      {/* Sparkles */}
      <g className="animate-sparkle" style={{ transformOrigin: "470px 110px" }}>
        <path d="M470 95l3.5 8.5 8.5 3.5-8.5 3.5-3.5 8.5-3.5-8.5-8.5-3.5 8.5-3.5z" fill="#FBBF24" />
      </g>
      <g className="animate-sparkle" style={{ transformOrigin: "510px 180px", animationDelay: "1s" }}>
        <path d="M510 173l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="#F9A8D4" />
      </g>
      <g className="animate-sparkle" style={{ transformOrigin: "120px 380px", animationDelay: "1.5s" }}>
        <path d="M120 372l2.5 6 6 2.5-6 2.5-2.5 6-2.5-6-6-2.5 6-2.5z" fill="#FBBF24" />
      </g>

      {/* Pedestal (bottom) */}
      <g filter="url(#soft-shadow)">
        <ellipse cx="300" cy="470" rx="170" ry="32" fill="url(#pedestal-side)" opacity="0.85" />
        <ellipse cx="300" cy="460" rx="170" ry="34" fill="url(#pedestal)" />
        <ellipse cx="300" cy="455" rx="150" ry="22" fill="#FFFFFF" opacity="0.55" />
      </g>

      {/* Orbital rings */}
      <g className="animate-spin-slow" style={{ transformOrigin: "300px 300px" }}>
        <ellipse
          cx="300"
          cy="300"
          rx="200"
          ry="78"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="3"
          opacity="0.65"
          filter="url(#ring-glow)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="200"
          ry="78"
          fill="none"
          stroke="#EC4899"
          strokeWidth="2"
          opacity="0.85"
        />
        <circle cx="100" cy="300" r="6" fill="#FBBF24" />
        <circle cx="500" cy="300" r="5" fill="#FFFFFF" stroke="#EC4899" strokeWidth="2" />
      </g>
      <g className="animate-spin-reverse-slow" style={{ transformOrigin: "300px 300px" }}>
        <ellipse
          cx="300"
          cy="300"
          rx="78"
          ry="200"
          fill="none"
          stroke="url(#ring-grad)"
          strokeWidth="3"
          opacity="0.55"
          filter="url(#ring-glow)"
        />
        <ellipse
          cx="300"
          cy="300"
          rx="78"
          ry="200"
          fill="none"
          stroke="#F472B6"
          strokeWidth="1.5"
          opacity="0.85"
        />
      </g>

      {/* Central tooth */}
      <g className="animate-float-slow" style={{ transformOrigin: "300px 290px" }} filter="url(#soft-shadow)">
        {/* Tooth body */}
        <path
          d="M300 145
             c-40 0 -55 12 -85 12
             c-22 0 -42 12 -42 50
             c0 50 18 78 30 118
             c10 34 14 92 36 92
             c20 0 22 -44 32 -78
             c8 -26 14 -38 38 -38
             s30 12 38 38
             c10 34 12 78 32 78
             c22 0 26 -58 36 -92
             c12 -40 30 -68 30 -118
             c0 -38 -20 -50 -42 -50
             c-30 0 -45 -12 -85 -12 z"
          fill="url(#tooth-body)"
          stroke="#F9A8D4"
          strokeWidth="2"
        />
        {/* Inner shadow */}
        <path
          d="M300 145
             c-40 0 -55 12 -85 12
             c-22 0 -42 12 -42 50
             c0 50 18 78 30 118
             c10 34 14 92 36 92
             c20 0 22 -44 32 -78
             c8 -26 14 -38 38 -38
             s30 12 38 38
             c10 34 12 78 32 78
             c22 0 26 -58 36 -92
             c12 -40 30 -68 30 -118
             c0 -38 -20 -50 -42 -50
             c-30 0 -45 -12 -85 -12 z"
          fill="url(#tooth-shadow)"
          opacity="0.5"
        />
        {/* Highlight */}
        <ellipse cx="240" cy="200" rx="34" ry="60" fill="url(#tooth-shine)" />
        <path
          d="M225 180 q-10 30 -8 60 q2 30 10 50"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* Shield badge (over tooth) */}
      <g className="animate-float-medium" style={{ transformOrigin: "300px 240px" }} filter="url(#soft-shadow)">
        <path
          d="M300 175l58 18v44c0 36-25 60-58 72-33-12-58-36-58-72v-44l58-18z"
          fill="url(#shield-grad)"
        />
        <path
          d="M300 182l50 16v38c0 30-22 51-50 62-28-11-50-32-50-62v-38l50-16z"
          fill="url(#shield-shine)"
        />
        {/* White star */}
        <path
          d="M300 215l9.5 19 21 3-15 15 3.5 21-19-10-19 10 3.5-21-15-15 21-3z"
          fill="#FFFFFF"
        />
      </g>

      {/* Secondary small tooth (left, on pedestal) */}
      <g className="animate-float-medium" style={{ transformOrigin: "150px 410px", animationDelay: "0.5s" }} filter="url(#soft-shadow)">
        <ellipse cx="150" cy="445" rx="48" ry="10" fill="url(#pedestal-side)" opacity="0.8" />
        <ellipse cx="150" cy="438" rx="48" ry="11" fill="url(#pedestal)" />
        <path
          d="M150 380
             c-12 0 -16 4 -25 4
             c-7 0 -13 4 -13 16
             c0 16 6 25 9 38
             c3 11 5 30 12 30
             c6 0 7 -14 10 -25
             c3 -8 5 -12 12 -12
             s9 4 12 12
             c3 11 4 25 10 25
             c7 0 9 -19 12 -30
             c3 -13 9 -22 9 -38
             c0 -12 -6 -16 -13 -16
             c-9 0 -13 -4 -25 -4 z"
          fill="url(#tooth-body)"
          stroke="#F9A8D4"
          strokeWidth="1.5"
        />
        <ellipse cx="135" cy="395" rx="6" ry="14" fill="#FFFFFF" opacity="0.7" />
      </g>

      {/* Toothbrush (bottom left) */}
      <g transform="rotate(-35 90 380)" filter="url(#soft-shadow)">
        {/* Handle */}
        <rect x="35" y="375" width="130" height="14" rx="7" fill="url(#brush-handle)" />
        <circle cx="40" cy="382" r="10" fill="#EC4899" />
        {/* Neck */}
        <rect x="160" y="378" width="20" height="8" rx="3" fill="#9D174D" />
        {/* Head */}
        <rect x="178" y="370" width="36" height="24" rx="6" fill="#FCE7F3" stroke="#F9A8D4" strokeWidth="1" />
        {/* Bristles */}
        <g fill="#FFFFFF" stroke="#F472B6" strokeWidth="0.6">
          <rect x="183" y="362" width="3" height="10" rx="1" />
          <rect x="189" y="361" width="3" height="11" rx="1" />
          <rect x="195" y="360" width="3" height="12" rx="1" />
          <rect x="201" y="361" width="3" height="11" rx="1" />
          <rect x="207" y="362" width="3" height="10" rx="1" />
        </g>
      </g>

      {/* Dental mirror (right) */}
      <g transform="rotate(25 470 380)" filter="url(#soft-shadow)">
        {/* Handle */}
        <rect x="465" y="370" width="10" height="120" rx="5" fill="url(#brush-handle)" />
        <circle cx="470" cy="498" r="8" fill="#9D174D" />
        {/* Mirror head */}
        <circle cx="470" cy="350" r="32" fill="url(#mirror-head)" stroke="#EC4899" strokeWidth="3" />
        <circle cx="470" cy="350" r="24" fill="#FFFFFF" opacity="0.8" />
        <ellipse cx="462" cy="342" rx="8" ry="12" fill="#FFFFFF" />
      </g>

      {/* Potted plant (bottom right) */}
      <g filter="url(#soft-shadow)">
        {/* Pot */}
        <path d="M460 510 L510 510 L502 560 L468 560 Z" fill="url(#pot-grad)" />
        <ellipse cx="485" cy="510" rx="25" ry="5" fill="#9D174D" />
        {/* Leaves */}
        <g className="animate-float-medium" style={{ transformOrigin: "485px 505px" }}>
          <path d="M485 505 C 460 470, 440 460, 430 470 C 440 490, 460 500, 485 505 Z" fill="url(#leaf-grad)" />
          <path d="M485 505 C 510 470, 530 460, 540 470 C 530 490, 510 500, 485 505 Z" fill="url(#leaf-grad)" />
          <path d="M485 500 C 480 460, 478 440, 485 425 C 492 440, 490 460, 485 500 Z" fill="url(#leaf-grad)" />
          <path d="M485 500 C 470 470, 460 460, 455 470 C 465 485, 475 495, 485 500 Z" fill="#F472B6" opacity="0.8" />
          <path d="M485 500 C 500 470, 510 460, 515 470 C 505 485, 495 495, 485 500 Z" fill="#F472B6" opacity="0.8" />
        </g>
      </g>
    </svg>
  );
}
