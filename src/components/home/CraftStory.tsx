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
              Every Rakhi Racing livery starts as a CNC-milled die-cast zinc body,
              polished, then masked and sprayed in our Pune atelier. The fairing
              carries the livery number; the tank carries the line.
            </p>
            <p>
              The rakhi itself is 9-ply silk — vermillion for the sport and street
              liveries, mauli-gold for the classic and tour. It is tied around
              the front wheel hub by hand, exactly the way it would sit on a
              wrist. A small kalava drop in mauli-gold finishes the piece.
            </p>
            <p>
              Each one is numbered, signed, and shipped in a chrome-edged case
              with an atelier card. 500 pieces per livery. No reprints.
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

// Technical drawing of a wheel with a rakhi and dimension callouts
function Blueprint() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full"
      role="img"
      aria-label="Technical drawing of a wheel with a rakhi tied around the hub"
    >
      <defs>
        <pattern id="bpGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1E3D2F" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="400" height="400" fill="url(#bpGrid)" />

      {/* Wheel */}
      <g
        fill="none"
        stroke="#D4A24A"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="200" cy="200" r="140" />
        <circle cx="200" cy="200" r="118" />
        <circle cx="200" cy="200" r="34" />
        {/* Spokes */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={200 + Math.cos(a) * 36}
              y1={200 + Math.sin(a) * 36}
              x2={200 + Math.cos(a) * 116}
              y2={200 + Math.sin(a) * 116}
              stroke="#9AA1A8"
              strokeWidth="0.8"
            />
          );
        })}
        {/* Rakhi threads on hub */}
        <circle cx="200" cy="200" r="38" stroke="#C8341F" strokeWidth="1.4" strokeDasharray="3 2" />
        <circle cx="200" cy="200" r="44" stroke="#C8341F" strokeWidth="1.4" strokeDasharray="3 2" />
        <circle cx="200" cy="200" r="50" stroke="#D4A24A" strokeWidth="1.2" />
      </g>

      {/* Dimension callouts */}
      <g
        fill="#D8DCE0"
        fontFamily="var(--font-plex-mono), monospace"
        fontSize="9"
        letterSpacing="1.2"
      >
        {/* Diameter callout */}
        <line x1="60" y1="200" x2="60" y2="60" stroke="#9AA1A8" strokeWidth="0.6" />
        <line x1="55" y1="200" x2="65" y2="200" stroke="#9AA1A8" strokeWidth="0.6" />
        <line x1="55" y1="60" x2="65" y2="60" stroke="#9AA1A8" strokeWidth="0.6" />
        <text x="72" y="130" fill="#D4A24A">Ø 280 mm</text>

        {/* Hub callout */}
        <line x1="200" y1="200" x2="200" y2="50" stroke="#9AA1A8" strokeWidth="0.4" strokeDasharray="2 2" />
        <line x1="160" y1="50" x2="240" y2="50" stroke="#9AA1A8" strokeWidth="0.6" />
        <text x="245" y="54">HUB · Ø 34</text>

        {/* Thread callout */}
        <line x1="200" y1="200" x2="200" y2="370" stroke="#9AA1A8" strokeWidth="0.4" strokeDasharray="2 2" />
        <line x1="170" y1="370" x2="240" y2="370" stroke="#9AA1A8" strokeWidth="0.6" />
        <text x="246" y="374" fill="#C8341F">RAKHI · 9-PLY</text>
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
          GARAGE ZERO · 01
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
