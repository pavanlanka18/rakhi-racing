import { Hero } from '@/components/home/Hero';
import { FeaturedCollection } from '@/components/home/FeaturedCollection';
import { CraftStory } from '@/components/home/CraftStory';
import { Testimonials } from '@/components/home/Testimonials';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCollection />
      <CraftStory />
      <Testimonials />

      {/* Closing CTA strip */}
      <section className="relative border-t border-circuit-700 bg-circuit-800">
        <div className="absolute inset-0 circuit-grid opacity-60 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <p className="eyebrow mb-3">Atelier · Pune, IN</p>
            <h2 className="h-display text-3xl md:text-5xl text-ivory max-w-2xl text-balance">
              Tie one to a wrist. Tie one to a garage wall.
            </h2>
            <p className="mt-4 text-ivory/70 max-w-xl font-body">
              Each edition is hand-finished, numbered, and shipped in a chrome-edged
              case. 500 pieces per livery. No reprints.
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-mauli-500 text-ink font-mono uppercase tracking-[0.18em] text-xs hover:bg-mauli-400 transition focus-ring"
          >
            Configure yours <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
