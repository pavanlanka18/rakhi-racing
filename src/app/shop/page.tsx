'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/fixtures/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Search, X, ChevronDown, Mail, Trophy, Car, Star, Zap } from 'lucide-react';

// â”€â”€â”€ Tab definitions â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SECTION_TABS = [
  { value: 'all',     label: 'All Products' },
  { value: 'fantasy', label: 'Fantasy'      },
  { value: 'f1',      label: 'F1 Cars'      },
  { value: 'premium', label: 'Premium'      },
  { value: 'sports',  label: 'Sports'       },
] as const;

type SectionValue = (typeof SECTION_TABS)[number]['value'];

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

// â”€â”€â”€ Category filters â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const isFantasy = (p: (typeof PRODUCTS)[number]) => p.category === 'fantasy';
const isF1      = (p: (typeof PRODUCTS)[number]) => p.category === 'f1';
const isPremium = (p: (typeof PRODUCTS)[number]) => p.category === 'premium';
const isSports  = (p: (typeof PRODUCTS)[number]) => p.category === 'sports';

function applySort(list: typeof PRODUCTS, sort: string): typeof PRODUCTS {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':  copy.sort((a, b) => a.price - b.price); break;
    case 'price-desc': copy.sort((a, b) => b.price - a.price); break;
    default: break;
  }
  return copy;
}

function applySearch(list: typeof PRODUCTS, q: string): typeof PRODUCTS {
  if (!q.trim()) return list;
  const lower = q.toLowerCase();
  return list.filter(
    (p) =>
      p.name.toLowerCase().includes(lower) ||
      p.description.short.toLowerCase().includes(lower) ||
      p.tags.some((t) => t.includes(lower))
  );
}

// â”€â”€â”€ Section Header â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
type Variant = 'fantasy' | 'f1' | 'premium' | 'sports';

const VARIANT_STYLES: Record<Variant, { border: string; iconBg: string; title: string; counter: string }> = {
  'fantasy': { border: 'border-purple-500/30', iconBg: 'bg-purple-500/15 border-purple-500/30', title: 'text-purple-400', counter: 'text-purple-500/25' },
  'f1':      { border: 'border-red-500/30',    iconBg: 'bg-red-500/15 border-red-500/30',       title: 'text-red-400',    counter: 'text-red-500/25'    },
  'premium': { border: 'border-amber-500/30',  iconBg: 'bg-amber-500/15 border-amber-500/30',   title: 'text-amber-400',  counter: 'text-amber-500/25'  },
  'sports':  { border: 'border-cyan-500/30',   iconBg: 'bg-cyan-500/15 border-cyan-500/30',     title: 'text-cyan-400',   counter: 'text-cyan-500/25'   },
};

function SectionHeader({
  icon, title, subtitle, count, variant,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  count: number;
  variant: Variant;
}) {
  const s = VARIANT_STYLES[variant];
  return (
    <div className={`flex items-center gap-4 mb-8 pb-5 border-b ${s.border}`}>
      <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border ${s.iconBg}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h2 className={`font-display text-2xl md:text-3xl uppercase tracking-tight leading-none ${s.title}`}>
          {title}
        </h2>
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/40 mt-1">
          {subtitle}
        </p>
      </div>
      <span className={`flex-shrink-0 font-display text-5xl font-bold tabular-nums ${s.counter}`}>
        {count}
      </span>
    </div>
  );
}

// â”€â”€â”€ Price Badge (no discount) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function PriceBadge({ label, price, variant }: { label: string; price: string; variant: Variant }) {
  const styles: Record<Variant, { bg: string; accent: string }> = {
    'fantasy': { bg: 'bg-purple-500/10 border-purple-500/20', accent: 'text-purple-400' },
    'f1':      { bg: 'bg-red-500/10 border-red-500/20',       accent: 'text-red-400'    },
    'premium': { bg: 'bg-amber-500/10 border-amber-500/20',   accent: 'text-amber-400'  },
    'sports':  { bg: 'bg-cyan-500/10 border-cyan-500/20',     accent: 'text-cyan-400'   },
  };
  const { bg, accent } = styles[variant];
  return (
    <div className={`inline-flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl border ${bg}`}>
      <span className={`font-mono text-xs uppercase tracking-widest ${accent}`}>{label}</span>
      <span className={`font-display text-sm font-bold ${accent}`}>{price}</span>
    </div>
  );
}

// â”€â”€â”€ Product Grid â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ProductGrid({ products }: { products: typeof PRODUCTS }) {
  if (!products.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

// â”€â”€â”€ Main Page â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function ShopContent() {
  const searchParams = useSearchParams();
  const [search,        setSearch]        = useState('');
  const [activeSection, setActiveSection] = useState<SectionValue>('all');
  const [sort,          setSort]          = useState('featured');

  // Sync section from URL ?cat=
  useEffect(() => {
    const cat = searchParams.get('cat');
    if      (cat === 'fantasy') setActiveSection('fantasy');
    else if (cat === 'f1')      setActiveSection('f1');
    else if (cat === 'premium') setActiveSection('premium');
    else if (cat === 'sports')  setActiveSection('sports');
    else setActiveSection('all');
  }, [searchParams]);

  const fantasyProducts = useMemo(
    () => applySort(applySearch(PRODUCTS.filter(isFantasy), search), sort),
    [search, sort]
  );
  const f1Products = useMemo(
    () => applySort(applySearch(PRODUCTS.filter(isF1), search), sort),
    [search, sort]
  );
  const premiumProducts = useMemo(
    () => applySort(applySearch(PRODUCTS.filter(isPremium), search), sort),
    [search, sort]
  );
  const sportsProducts = useMemo(
    () => applySort(applySearch(PRODUCTS.filter(isSports), search), sort),
    [search, sort]
  );

  const totalVisible = useMemo(() => {
    if (activeSection === 'fantasy') return fantasyProducts.length;
    if (activeSection === 'f1')      return f1Products.length;
    if (activeSection === 'premium') return premiumProducts.length;
    if (activeSection === 'sports')  return sportsProducts.length;
    return fantasyProducts.length + f1Products.length + premiumProducts.length + sportsProducts.length;
  }, [activeSection, fantasyProducts.length, f1Products.length, premiumProducts.length, sportsProducts.length]);

  const showFantasy = (activeSection === 'all' || activeSection === 'fantasy') && fantasyProducts.length > 0;
  const showF1      = (activeSection === 'all' || activeSection === 'f1')      && f1Products.length > 0;
  const showPremium = (activeSection === 'all' || activeSection === 'premium') && premiumProducts.length > 0;
  const showSports  = (activeSection === 'all' || activeSection === 'sports')  && sportsProducts.length > 0;
  const showEmpty   = totalVisible === 0;

  // Tab counts
  const tabCounts: Record<SectionValue, number> = {
    'all':     fantasyProducts.length + f1Products.length + premiumProducts.length + sportsProducts.length,
    'fantasy': fantasyProducts.length,
    'f1':      f1Products.length,
    'premium': premiumProducts.length,
    'sports':  sportsProducts.length,
  };

  // Tab styles
  const tabActiveStyles: Record<SectionValue, string> = {
    'all':     'bg-mauli-500 border-mauli-500 text-circuit-900 shadow-lg shadow-mauli-500/30',
    'fantasy': 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/30',
    'f1':      'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30',
    'premium': 'bg-amber-500 border-amber-500 text-circuit-900 shadow-lg shadow-amber-500/30',
    'sports':  'bg-cyan-500 border-cyan-500 text-circuit-900 shadow-lg shadow-cyan-500/30',
  };

  const tabIcons: Partial<Record<SectionValue, React.ReactNode>> = {
    'fantasy': <Star  className="w-3 h-3" />,
    'f1':      <Trophy className="w-3 h-3" />,
    'premium': <Zap   className="w-3 h-3" />,
    'sports':  <Car   className="w-3 h-3" />,
  };

  return (
    <div className="min-h-screen bg-circuit-900">
      {/* â”€â”€ Hero â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative overflow-hidden border-b border-circuit-700">
        <div className="absolute inset-0 circuit-grid opacity-20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-circuit-900/60 via-transparent to-circuit-900/80" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-block w-8 h-px bg-mauli-500" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-mauli-400">
              Raksha Bandhan Collection 2025
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl uppercase tracking-tight text-ivory text-balance leading-none">
            Hot Wheels<br />
            <span className="text-mauli-400">Rakhi</span> Collection
          </h1>
          <p className="mt-5 text-ivory/65 max-w-xl font-body text-lg leading-relaxed">
            Die-cast legends with the rakhi thread tied around the front wheel hub.
            Handcrafted gifts for every racing soul.
          </p>

        </div>
      </div>

      {/* â”€â”€ Sticky Filter Bar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="sticky top-[72px] z-30 bg-circuit-900/95 backdrop-blur border-b border-circuit-700 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory/40" />
              <input
                id="shop-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search rakhi, F1, fantasy..."
                className="w-full bg-circuit-800 border border-circuit-600 rounded-lg pl-9 pr-9 py-2.5 text-sm text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-mauli-500 transition"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory/40 hover:text-ivory">
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Sort */}
              <div className="relative flex-1 sm:flex-none">
                <select
                  id="shop-sort"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none w-full sm:w-48 bg-circuit-800 border border-circuit-600 rounded-lg pl-3 pr-8 py-2.5 text-sm text-ivory focus:outline-none focus:border-mauli-500 transition cursor-pointer"
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-ivory/40 pointer-events-none" />
              </div>
              <span className="font-mono text-xs text-ivory/50 whitespace-nowrap">
                {totalVisible} item{totalVisible !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* â”€â”€ Section Tabs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SECTION_TABS.map((tab) => {
              const count  = tabCounts[tab.value];
              const active = activeSection === tab.value;
              const activeCls   = tabActiveStyles[tab.value];
              const badgeCls    = active ? 'text-current/70' : 'text-ivory/30';

              return (
                <button
                  key={tab.value}
                  id={`shop-tab-${tab.value}`}
                  onClick={() => setActiveSection(tab.value)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-200 border
                    ${active ? `font-bold ${activeCls}` : 'font-normal bg-transparent border-circuit-600 text-ivory/60 hover:border-mauli-500/50 hover:text-ivory'}`}
                >
                  {tabIcons[tab.value]}
                  {tab.label}
                  <span className={`text-[9px] ${badgeCls}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* â”€â”€ Products Area â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {showEmpty ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-5xl mb-4">ðŸŽï¸</div>
            <h3 className="font-display text-2xl uppercase text-ivory/60">No results found</h3>
            <p className="mt-2 text-sm text-ivory/40 font-body">Try a different category or clear the search</p>
            <button
              onClick={() => { setSearch(''); setActiveSection('all'); }}
              className="mt-6 px-5 py-2.5 rounded-lg border border-mauli-500 text-mauli-400 text-sm font-mono uppercase tracking-widest hover:bg-mauli-500/10 transition"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="space-y-20">

            {/* â”€â”€ Fantasy Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            {showFantasy && (
              <section id="section-fantasy">
                <SectionHeader
                  icon={<Star className="w-5 h-5 text-purple-400" />}
                  title="Fantasy Cars"
                  subtitle={`Hot Wheels fantasy die-casts Â· ${fantasyProducts.length} available`}
                  count={fantasyProducts.length}
                  variant="fantasy"
                />
                <div className="mb-7 flex flex-wrap gap-3">
                  <PriceBadge label="Fantasy Car Rakhi" price="₹499" variant="fantasy" />
                </div>
                <ProductGrid products={fantasyProducts} />
              </section>
            )}

            {/* â”€â”€ F1 Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            {showF1 && (
              <section id="section-f1">
                <SectionHeader
                  icon={<Trophy className="w-5 h-5 text-red-400" />}
                  title="F1 Cars"
                  subtitle={`Formula 1 die-cast rakhi Â· ${f1Products.length} available`}
                  count={f1Products.length}
                  variant="f1"
                />
                <div className="mb-7 flex flex-wrap gap-3">
                  <PriceBadge label="Formula 1 Car Rakhi" price="₹699" variant="f1" />
                </div>
                <ProductGrid products={f1Products} />
              </section>
            )}

            {/* â”€â”€ Premium Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            {showPremium && (
              <section id="section-premium">
                <SectionHeader
                  icon={<Zap className="w-5 h-5 text-amber-400" />}
                  title="Premium Cars"
                  subtitle={`Premium die-cast rakhi Â· ${premiumProducts.length} available`}
                  count={premiumProducts.length}
                  variant="premium"
                />
                <div className="mb-7 flex flex-wrap gap-3">
                  <PriceBadge label="Premium Car Rakhi" price="₹699" variant="premium" />
                </div>
                <ProductGrid products={premiumProducts} />
              </section>
            )}

            {/* â”€â”€ Sports Section â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
            {showSports && (
              <section id="section-sports">
                <SectionHeader
                  icon={<Car className="w-5 h-5 text-cyan-400" />}
                  title="Sports Cars"
                  subtitle={`Sports & classic die-cast rakhi Â· ${sportsProducts.length} available`}
                  count={sportsProducts.length}
                  variant="sports"
                />
                <div className="mb-7 flex flex-wrap gap-3">
                  <PriceBadge label="Sports Car Rakhi" price="₹599" variant="sports" />
                </div>
                <ProductGrid products={sportsProducts} />
              </section>
            )}

          </div>
        )}

        {/* â”€â”€ Bottom CTA â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        {!showEmpty && (
          <div className="mt-16 text-center border-t border-circuit-700 pt-12">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-ivory/40 mb-4">
              Customise your rakhi via WhatsApp or Email
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/918008578757"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-mono text-sm uppercase tracking-widest transition-all duration-200 shadow-lg shadow-green-900/40 hover:shadow-green-600/40"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:Rakhiwheels@gmail.com"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-circuit-800 border border-circuit-700 hover:border-mauli-500 text-ivory font-mono text-sm uppercase tracking-widest transition-all duration-200 shadow-lg hover:text-mauli-400"
              >
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </div>
            <p className="mt-4 text-xs text-ivory/30 font-body">
              Pre-bookings open Â· Custom orders welcome
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-circuit-900" />}>
      <ShopContent />
    </Suspense>
  );
}

