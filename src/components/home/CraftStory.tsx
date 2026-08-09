export function CraftStory() {
  return (
    <section className="relative border-b border-circuit-700 bg-circuit-800">
      <div className="absolute inset-0 circuit-grid opacity-50 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Copy */}
        <div>
          <p className="eyebrow mb-3">Craft Story</p>
          <h2 className="h-display text-4xl md:text-5xl text-ivory text-balance">
            Three days at the bench. <span className="text-mauli-500">One piece in your hand.</span>
          </h2>
          <div className="mt-6 space-y-4 text-ivory/75 font-body max-w-xl">
            <p>
              Every Rakhi Wheels edition starts with a genuine 1:64 scale die-cast
              model, carefully inspected and prepared in our Pune atelier. The chassis
              carries the heritage; the livery tells the story.
            </p>
            <p>
              The rakhi itself is 9-ply silk — vermillion for the F1 and sports
              editions, mauli-gold for the classics. It is tied around
              the front wheel hub by hand, exactly the way it would sit on a
              wrist. A small kalava drop in mauli-gold finishes the piece.
            </p>
            <p>
              Each one is hand-numbered, signed, and shipped in a premium display case
              with an authenticity card. 500 pieces per livery. No reprints.
            </p>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-3 max-w-md">
            <Stat label="Liveries" value="06" />
            <Stat label="Edition" value="500" />
            <Stat label="Hours / piece" value="3.5" />
          </dl>
        </div>

        {/* Blueprint SVG */}
        <div className="relative aspect-square w-full">
          <Blueprint />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="placard px-3 py-3">
      <div className="text-[9px] text-ivory/50 tracking-[0.22em]">{label}</div>
      <div className="text-xl text-mauli-500 mt-1 tracking-[0.12em] font-display">
        {value}
      </div>
    </div>
  );
}

// Technical drawing of an alloy wheel with a rakhi and dimension callouts
function Blueprint() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      role="img"
      aria-label="Technical drawing of an alloy wheel with a rakhi tied around the hub"
    >
      <defs>
        <pattern id="bpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E3D2F" strokeWidth="0.5" />
        </pattern>
        <style>{`
          @keyframes spin-slow {
            100% { transform: rotate(360deg); }
          }
          @keyframes spin-reverse {
            100% { transform: rotate(-360deg); }
          }
          @keyframes shimmer {
            100% { stroke-dashoffset: -20; }
          }
          @keyframes pulse-opacity {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
          .wheel-spin {
            animation: spin-slow 45s linear infinite;
            transform-origin: 200px 200px;
          }
          .disc-spin {
            animation: spin-reverse 60s linear infinite;
            transform-origin: 200px 200px;
          }
          .thread-shimmer {
            animation: shimmer 1.5s linear infinite;
          }
          .pulse-slow {
            animation: pulse-opacity 3s ease-in-out infinite;
          }
        `}</style>
      </defs>
      <rect width="400" height="400" fill="url(#bpGrid)" />

      {/* Wheel Assembly */}
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <g className="wheel-spin">
          {/* Tire Outer */}
          <circle cx="200" cy="200" r="150" stroke="#D4A24A" strokeWidth="1.5" />
          <circle cx="200" cy="200" r="146" stroke="#D4A24A" strokeWidth="0.5" strokeDasharray="4 4" className="thread-shimmer" />
          
          {/* Rim Outer */}
          <circle cx="200" cy="200" r="115" stroke="#9AA1A8" strokeWidth="2" />
          {/* Rim Inner */}
          <circle cx="200" cy="200" r="95" stroke="#9AA1A8" strokeWidth="1" />
          
          {/* 5 Spokes */}
          {Array.from({ length: 5 }).map((_, i) => {
            return (
              <g key={i} transform={`rotate(${(i * 360) / 5}, 200, 200)`}>
                <path d="M 186 172 Q 192 140 180 95 L 220 95 Q 208 140 214 172" stroke="#9AA1A8" strokeWidth="1.5" />
                {/* Spoke center detail line */}
                <line x1="200" y1="172" x2="200" y2="95" stroke="#4A5568" strokeWidth="0.8" />
              </g>
            );
          })}
        </g>

        {/* Brake Disc (Rotates independently for parallax effect) */}
        <g className="disc-spin">
          <circle cx="200" cy="200" r="75" stroke="#4A5568" strokeWidth="12" strokeDasharray="2 6" />
          <circle cx="200" cy="200" r="69" stroke="#4A5568" strokeWidth="0.5" />
          <circle cx="200" cy="200" r="81" stroke="#4A5568" strokeWidth="0.5" />
        </g>

        {/* Hub Center (Stationary) */}
        <circle cx="200" cy="200" r="28" stroke="#D4A24A" strokeWidth="1.5" />
        <circle cx="200" cy="200" r="12" stroke="#D4A24A" strokeWidth="1" />
        
        {/* Rakhi threads on hub (Stationary with shimmer) */}
        <circle cx="200" cy="200" r="34" stroke="#C8341F" strokeWidth="1.8" strokeDasharray="4 3" className="thread-shimmer" />
        <circle cx="200" cy="200" r="39" stroke="#C8341F" strokeWidth="1.8" strokeDasharray="4 3" className="thread-shimmer" />
        <circle cx="200" cy="200" r="44" stroke="#D4A24A" strokeWidth="1.2" />
        
        {/* Thread drop/kalava (Stationary) */}
        <path d="M 200 244 Q 195 260 210 280" stroke="#C8341F" strokeWidth="1.8" className="pulse-slow" />
        <path d="M 200 244 Q 210 270 195 290" stroke="#C8341F" strokeWidth="1.8" className="pulse-slow" />
      </g>

      {/* Dimension callouts */}
      <g
        fill="#D8DCE0"
        fontFamily="var(--font-plex-mono), monospace"
        fontSize="9"
        letterSpacing="1.2"
        className="pulse-slow"
      >
        {/* Diameter callout */}
        <line x1="40" y1="200" x2="40" y2="50" stroke="#9AA1A8" strokeWidth="0.6" />
        <line x1="35" y1="200" x2="45" y2="200" stroke="#9AA1A8" strokeWidth="0.6" />
        <line x1="35" y1="50" x2="45" y2="50" stroke="#9AA1A8" strokeWidth="0.6" />
        <text x="50" y="125" fill="#D4A24A">Ø 11.5 mm</text>
        <text x="50" y="140" fill="#9AA1A8">SCALE 1:64</text>

        {/* Hub callout */}
        <line x1="200" y1="200" x2="200" y2="35" stroke="#9AA1A8" strokeWidth="0.4" strokeDasharray="2 2" />
        <line x1="160" y1="35" x2="240" y2="35" stroke="#9AA1A8" strokeWidth="0.6" />
        <text x="245" y="39">AXLE · Ø 1.2 mm</text>

        {/* Thread callout */}
        <line x1="200" y1="200" x2="200" y2="365" stroke="#9AA1A8" strokeWidth="0.4" strokeDasharray="2 2" />
        <line x1="160" y1="365" x2="240" y2="365" stroke="#9AA1A8" strokeWidth="0.6" />
        <text x="246" y="369" fill="#C8341F">RAKHI · SILK</text>
      </g>

      {/* Corner plaque */}
      <g>
        <rect
          x="20"
          y="20"
          width="120"
          height="22"
          fill="none"
          stroke="#9AA1A8"
          strokeWidth="0.8"
        />
        <text
          x="80"
          y="35"
          textAnchor="middle"
          fill="#D8DCE0"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="9"
          letterSpacing="2"
        >
          PROJECT · 64
        </text>
      </g>
      <g>
        <rect
          x="260"
          y="358"
          width="120"
          height="22"
          fill="none"
          stroke="#9AA1A8"
          strokeWidth="0.8"
        />
        <text
          x="320"
          y="373"
          textAnchor="middle"
          fill="#D4A24A"
          fontFamily="var(--font-plex-mono), monospace"
          fontSize="9"
          letterSpacing="2"
        >
          047 / 500
        </text>
      </g>
    </svg>
  );
}
