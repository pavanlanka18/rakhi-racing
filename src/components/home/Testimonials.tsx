const REVIEWS = [
  {
    quote:
      "Tied mine to a Ducati keyring. The thread is real silk, the bike is heavier than it looks — it's the kind of object you hand to someone to feel.",
    name: 'Aarav M.',
    place: 'Mumbai',
    livery: 'Sport 001',
  },
  {
    quote:
      "I bought one for my brother and one for my mechanic. Both still on the workshop shelf, never on a wrist. That's the point.",
    name: 'Priya R.',
    place: 'Bengaluru',
    livery: 'Café 002',
  },
  {
    quote:
      "The chrome case is the giveaway. Whoever packed this cared about it. 047 looks like a fuel-cap plaque from a Gulf-livery 917.",
    name: 'Devansh K.',
    place: 'Pune',
    livery: 'Classic 003',
  },
  {
    quote:
      "I asked for a custom livery number and they said no, the line is the line. Respect.",
    name: 'Mihir S.',
    place: 'Delhi',
    livery: 'Street 004',
  },
  {
    quote:
      "Bought two. One for the wall, one for the road (read: my laptop bag). Goes through airport security with zero questions. Solid.",
    name: 'Riya N.',
    place: 'Hyderabad',
    livery: 'Tour 005',
  },
];

export function Testimonials() {
  return (
    <section className="relative border-b border-circuit-700">
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-10">
          <p className="eyebrow mb-3">The Garage</p>
          <h2 className="h-display text-4xl md:text-5xl text-ivory">
            What owners are saying.
          </h2>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:thin]">
          {REVIEWS.map((r, i) => (
            <article
              key={i}
              className="snap-start shrink-0 w-[88vw] sm:w-[420px] border border-chrome-400/40 bg-gradient-to-b from-circuit-700/50 to-circuit-800 rounded-sm p-6"
            >
              <div className="text-mauli-500 text-4xl font-display leading-none mb-3">
                &ldquo;
              </div>
              <p className="text-ivory/85 font-body text-pretty leading-relaxed">
                {r.quote}
              </p>
              <div className="mt-6 flex items-center justify-between border-t border-circuit-700 pt-4">
                <div>
                  <div className="font-mono uppercase tracking-[0.18em] text-xs text-ivory">
                    {r.name}
                  </div>
                  <div className="font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/50">
                    {r.place}
                  </div>
                </div>
                <span className="placard px-2 py-1 leading-none text-chrome-200">
                  {r.livery}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
