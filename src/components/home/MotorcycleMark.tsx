'use client';

import { motion } from 'framer-motion';

// Side-profile die-cast motorcycle with a rakhi thread tied around the front wheel hub.
// Pure inline SVG so it animates with the page and has no asset hosting.
export function MotorcycleMark() {
  return (
    <svg
      viewBox="0 0 600 520"
      role="img"
      aria-label="Die-cast motorcycle with rakhi thread tied around the front wheel hub, edition 047 of 500"
      className="w-full h-full"
    >
      <defs>
        <linearGradient id="mauliTank" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E8C36A" />
          <stop offset="100%" stopColor="#B98A2E" />
        </linearGradient>
        <linearGradient id="chromeMetal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D8DCE0" />
          <stop offset="50%" stopColor="#9AA1A8" />
          <stop offset="100%" stopColor="#5C636A" />
        </linearGradient>
        <linearGradient id="vermillionThread" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9A2412" />
          <stop offset="50%" stopColor="#E25141" />
          <stop offset="100%" stopColor="#9A2412" />
        </linearGradient>
        <linearGradient id="frameDark" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E3D2F" />
          <stop offset="100%" stopColor="#0A0F0C" />
        </linearGradient>
        <radialGradient id="hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D8DCE0" />
          <stop offset="100%" stopColor="#5C636A" />
        </radialGradient>
        <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Circuit-board backdrop (very subtle) */}
      <g opacity="0.35" stroke="#9AA1A8" fill="none" strokeWidth="0.5">
        {[
          'M0 80 H 220 L 260 120 H 600',
          'M0 200 H 140 L 180 240 H 600',
          'M0 320 H 320 L 360 360 H 600',
          'M0 440 H 480 L 520 480 H 600',
          'M40 0 V 520',
          'M180 0 V 520',
          'M320 0 V 520',
          'M460 0 V 520',
        ].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            strokeDasharray="1000"
            initial={{ strokeDashoffset: 1000 }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.6, delay: 0.1 + i * 0.06, ease: 'easeOut' }}
          />
        ))}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={i}
            cx={40 + (i % 6) * 90}
            cy={60 + Math.floor(i / 6) * 130}
            r="2"
            fill="#D4A24A"
            opacity="0.6"
          />
        ))}
      </g>

      {/* Soft ground shadow */}
      <ellipse
        cx="300"
        cy="450"
        rx="220"
        ry="10"
        fill="#000"
        opacity="0.5"
        filter="url(#softGlow)"
      />

      {/* Rear wheel */}
      <g>
        <circle cx="170" cy="400" r="50" fill="url(#chromeMetal)" />
        <circle cx="170" cy="400" r="42" fill="#0A0F0C" />
        <circle cx="170" cy="400" r="14" fill="url(#hub)" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={170 + Math.cos(a) * 16}
              y1={400 + Math.sin(a) * 16}
              x2={170 + Math.cos(a) * 40}
              y2={400 + Math.sin(a) * 40}
              stroke="#9AA1A8"
              strokeWidth="1.4"
            />
          );
        })}
        <circle cx="170" cy="400" r="6" fill="#0A0F0C" />
      </g>

      {/* Front wheel — with RAKHI THREAD around the hub */}
      <g>
        <circle cx="440" cy="400" r="54" fill="url(#chromeMetal)" />
        <circle cx="440" cy="400" r="46" fill="#0A0F0C" />
        <circle cx="440" cy="400" r="16" fill="url(#hub)" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={440 + Math.cos(a) * 18}
              y1={400 + Math.sin(a) * 18}
              x2={440 + Math.cos(a) * 44}
              y2={400 + Math.sin(a) * 44}
              stroke="#9AA1A8"
              strokeWidth="1.4"
            />
          );
        })}
        {/* Rakhi — concentric arcs wound 3 times around the hub */}
        <motion.g
          initial={{ opacity: 0, rotate: -12, y: -4 }}
          animate={{ opacity: 1, rotate: 0, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          style={{ transformOrigin: '440px 400px' }}
        >
          {[18, 22, 26].map((r, i) => (
            <circle
              key={i}
              cx="440"
              cy="400"
              r={r}
              fill="none"
              stroke="url(#vermillionThread)"
              strokeWidth="2.2"
              strokeDasharray="3 1.5"
              strokeLinecap="round"
            />
          ))}
          {/* Mauli-gold spiral crossing the vermillion */}
          <path
            d="M 422 400 Q 440 380 458 400 Q 440 420 422 400 Z"
            fill="none"
            stroke="#D4A24A"
            strokeWidth="1.5"
            opacity="0.85"
          />
          {/* Kalava charm dangling from the bottom */}
          <line
            x1="440"
            y1="426"
            x2="440"
            y2="448"
            stroke="#D4A24A"
            strokeWidth="1.2"
          />
          <path
            d="M 434 448 Q 440 462 446 448 Q 440 456 434 448 Z"
            fill="#D4A24A"
          />
          <circle cx="440" cy="450" r="1.6" fill="#9A2412" />
        </motion.g>
      </g>

      {/* Swingarm (rear) */}
      <path
        d="M 170 400 L 250 360 L 290 340 L 320 350"
        stroke="url(#frameDark)"
        strokeWidth="14"
        strokeLinecap="round"
        fill="none"
      />

      {/* Front fork */}
      <path
        d="M 440 400 L 380 240 L 360 220"
        stroke="url(#frameDark)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M 440 400 L 396 240 L 376 220"
        stroke="#5C636A"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />

      {/* Frame — triangulated */}
      <path
        d="M 320 350 L 260 280 L 320 230 L 360 220"
        stroke="url(#frameDark)"
        strokeWidth="18"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M 320 350 L 260 280 L 320 230 L 360 220"
        stroke="#D4A24A"
        strokeWidth="1"
        fill="none"
        opacity="0.4"
      />

      {/* Fuel tank (mauli-gold) */}
      <path
        d="M 260 240 Q 280 200 330 200 Q 360 200 370 220 Q 360 260 320 270 Q 270 270 260 240 Z"
        fill="url(#mauliTank)"
        stroke="#B98A2E"
        strokeWidth="1"
      />
      <path
        d="M 270 240 Q 285 215 325 213"
        stroke="#F5F1E8"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
        strokeLinecap="round"
      />

      {/* Fairing (front) */}
      <path
        d="M 360 220 Q 390 210 410 230 L 410 280 L 380 290 Z"
        fill="url(#chromeMetal)"
        stroke="#5C636A"
        strokeWidth="1"
      />
      {/* Headlight */}
      <circle cx="402" cy="248" r="14" fill="#0A0F0C" stroke="#D8DCE0" strokeWidth="1.5" />
      <circle cx="402" cy="248" r="9" fill="#D4A24A" opacity="0.4" />

      {/* Seat */}
      <path
        d="M 230 268 Q 220 258 220 252 L 250 252 L 260 268 Z"
        fill="#0A0F0C"
        stroke="#1E3D2F"
        strokeWidth="1"
      />
      <path
        d="M 220 250 L 250 250"
        stroke="#D4A24A"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* Handlebars */}
      <path
        d="M 358 215 Q 340 200 320 210 M 372 215 Q 390 200 410 210"
        stroke="#5C636A"
        strokeWidth="3"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="318" cy="210" r="2.5" fill="#D4A24A" />
      <circle cx="412" cy="210" r="2.5" fill="#D4A24A" />

      {/* Exhaust */}
      <path
        d="M 240 330 Q 200 360 180 360 L 120 360"
        stroke="url(#chromeMetal)"
        strokeWidth="14"
        fill="none"
        strokeLinecap="round"
      />
      <circle cx="118" cy="360" r="9" fill="#5C636A" stroke="#D8DCE0" strokeWidth="1" />

      {/* Chrome placard — edition number */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.1 }}
      >
        <rect
          x="180"
          y="475"
          width="240"
          height="36"
          rx="2"
          fill="#0A0F0C"
          stroke="#9AA1A8"
          strokeWidth="1.2"
        />
        <text
          x="300"
          y="499"
          textAnchor="middle"
          fill="#D8DCE0"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="14"
          letterSpacing="2"
        >
          047 / 500
        </text>
        <text
          x="300"
          y="466"
          textAnchor="middle"
          fill="#D4A24A"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="8"
          letterSpacing="3"
        >
          RAKHI · RACING · CIRCUIT
        </text>
      </motion.g>
    </svg>
  );
}
