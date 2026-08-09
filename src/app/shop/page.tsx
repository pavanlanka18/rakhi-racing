'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '@/lib/fixtures/products';
import { ProductCard } from '@/components/product/ProductCard';
import { Search, X, ChevronDown, Mail, Trophy, Car } from 'lucide-react';

// ─── Tab definitions ─────────────────────────────────────────────────────────
const SECTION_TABS = [
  { value: 'all',     label: 'All Products' },
  { value: 'f1',      label: 'F1 Cars'     },
  { value: 'classic', label: 'Classic'      },
] as const;

type SectionValue = (typeof SECTION_TABS)[number]['value'];

const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'discount',   label: 'Biggest Discount' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
// F1 section: only the 5 real named F1 team die-casts (no first-edit products)
const isRealF1  = (p: (typeof PRODUCTS)[number]) => p.category === 'f1' && !p.id.startsWith('p_first_edit_');
// Classic: any product whose category is NOT 'f1' — covers sports, adventure,
// muscle, bond, limited, and first-edit Hot Wheels Fantasy (category='muscle').
// First-edit F1 cars (category='f1') are correctly excluded by this rule.
const isClassic = (p: (typeof PRODUCTS)[number]) => p.category !== 'f1';

function applySort(list: typeof PRODUCTS, sort: string): typeof PRODUCTS {
  const copy = [...list];
  switch (sort) {
    case 'price-asc':  copy.sort((a, b) => a.price - b.price); break;
    case 'price-desc': copy.sort((a, b) => b.price - a.price); break;
    case 'discount':
      copy.sort((a, b) => {
        const da = a.originalPrice ? 1 - a.price / a.originalPrice : 0;
        const db = b.originalPrice ? 1 - b.price / b.originalPrice : 0;
        return db - da;
      });
      break;
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

// ─── Section Header ───────────────────────────────────────────────────────────
type Variant = 'f1' | 'classic';

const VARIANT_STYLES: Record<Variant, { border: string; iconBg: string; title: string; counter: string }> = {
  'f1':      { border: 'border-red-500/30',   iconBg: 'bg-red-500/15 border-red-500/30',    title: 'text-red-400',   counter: 'text-red-500/25'   },
  'classic': { border: 'border-amber-500/30', iconBg: 'bg-amber-500/15 border-amber-500/30', title: 'text-amber-400', counter: 'text-amber-500/25' },
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

// ─── Pricing Banner ───────────────────────────────────────────────────────────
function PricingBadge({
  label, original, sale, saving, percent, limited, variant,
}: {
  label: string; original: string; sale: string;
  saving: string; percent: string; limited?: boolean;
  variant: Variant;
}) {
  const styles: Record<Variant, { bg: string; accent: string; saveBg: string }> = {
    'f1':      { bg: 'bg-red-500/10 border-red-500/20',    accent: 'text-red-400',   saveBg: 'bg-red-500/20 text-red-300'    },
    'classic': { bg: 'bg-amber-500/10 border-amber-500/20', accent: 'text-amber-400', saveBg: 'bg-amber-500/20 text-amber-300' },
  };
  const { bg, accent, saveBg } = styles[variant];

  return (
    <div className={`inline-flex flex-wrap items-center gap-2 px-4 py-2.5 rounded-xl border ${bg}`}>
      <span className={`font-mono text-xs uppercase tracking-widest ${accent}`}>{label}</span>
      <span className="font-display text-sm text-ivory">
        <span className="line-through text-ivory/40 mr-1.5">{original}</span>
        <span className={`font-bold ${accent}`}>{sale}</span>
      </span>
      <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${saveBg}`}>
        Save {saving} · {percent} OFF
      </span>
      {limited && (
        <span className="text-[10px] font-mono bg-red-600/25 text-red-300 px-2 py-0.5 rounded animate-pulse">
          Limited Time Offer
        </span>
      )}
    </div>
  );
}

// ─── Product Grid ─────────────────────────────────────────────────────────────
function ProductGrid({ products }: { products: typeof PRODUCTS }) {
  if (!products.length) return null;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((p) => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
function ShopContent() {
  const searchParams = useSearchParams();
  const [search,        setSearch]        = useState('');
  const [activeSection, setActiveSection] = useState<SectionValue>('all');
  const [sort,          setSort]          = useState('featured');

  // Sync section from URL ?cat=
  useEffect(() => {
    const cat = searchParams.get('cat');
    if (cat === 'f1')      setActiveSection('f1');
    else if (cat === 'classic') setActiveSection('classic');
    else setActiveSection('all');
  }, [searchParams]);

  // F1: only real F1 team cars. Classic: everything else (incl. first-edit photos)
  const f1Products      = useMemo(
    () => applySort(applySearch(PRODUCTS.filter(isRealF1),  search), sort),
    [search, sort]
  );
  const classicProducts = useMemo(
    () => applySort(applySearch(PRODUCTS.filter(isClassic), search), sort),
    [search, sort]
  );

  const totalVisible = useMemo(() => {
    if (activeSection === 'f1')      return f1Products.length;
    if (activeSection === 'classic') return classicProducts.length;
    return f1Products.length + classicProducts.length;
  }, [activeSection, f1Products.length, classicProducts.length]);

  const showF1      = (activeSection === 'all' || activeSection === 'f1')      && f1Products.length > 0;
  const showClassic = (activeSection === 'all' || activeSection === 'classic') && classicProducts.length > 0;
  const showEmpty   = totalVisible === 0;

  // Tab counts
  const tabCounts: Record<SectionValue, number> = {
    'all':     f1Products.length + classicProducts.length,
    'f1':      f1Products.length,
    'classic': classicProducts.length,
  };

  return (
    <div className="min-h-screen bg-circuit-900">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
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
          <div className="mt-10 flex flex-wrap items-center gap-6">
            {[
              { label: 'Products In Stock', value: `${PRODUCTS.filter(p => !p.isSoldOut).length}+` },
              { label: 'Max Savings',       value: '65% OFF' },
              { label: 'Free Shipping',     value: '₹999+' },
              { label: 'Gift Ready',        value: '100%' },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col">
                <span className="font-display text-2xl text-mauli-400 font-bold">{value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-ivory/50">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Sticky Filter Bar ─────────────────────────────────────────── */}
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
                placeholder="Search rakhi, F1, Porsche…"
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

          {/* ── Section Tabs ──────────────────────────────────────────── */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SECTION_TABS.map((tab) => {
              const count   = tabCounts[tab.value];
              const active  = activeSection === tab.value;
              const isF1Tab = tab.value === 'f1';
              const isCls   = tab.value === 'classic';

              const activeCls = isF1Tab
                ? 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/30'
                : isCls
                ? 'bg-amber-500 border-amber-500 text-circuit-900 shadow-lg shadow-amber-500/30'
                : 'bg-mauli-500 border-mauli-500 text-circuit-900 shadow-lg shadow-mauli-500/30';

              const badgeCls = active
                ? (isF1Tab ? 'text-white/70' : 'text-circuit-900/70')
                : 'text-ivory/30';

              return (
                <button
                  key={tab.value}
                  id={`shop-tab-${tab.value}`}
                  onClick={() => setActiveSection(tab.value)}
                  className={`flex-shrink-0 flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono uppercase tracking-widest transition-all duration-200 border
                    ${active ? `font-bold ${activeCls}` : 'font-normal bg-transparent border-circuit-600 text-ivory/60 hover:border-mauli-500/50 hover:text-ivory'}`}
                >
                  {isF1Tab && <Trophy className="w-3 h-3" />}
                  {isCls   && <Car    className="w-3 h-3" />}
                  {tab.label}
                  <span className={`text-[9px] ${badgeCls}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Products Area ────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {showEmpty ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="text-5xl mb-4">🏎️</div>
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

            {/* ── F1 Cars Section ─────────────────────────────────────── */}
            {showF1 && (
              <section id="section-f1">
                <SectionHeader
                  icon={<Trophy className="w-5 h-5 text-red-400" />}
                  title="F1 Cars"
                  subtitle={`Formula 1 die-cast rakhi · ${f1Products.length} available`}
                  count={f1Products.length}
                  variant="f1"
                />
                <div className="mb-7 flex flex-wrap gap-3">
                  <PricingBadge
                    label="Formula 1 Car Rakhi"
                    original="₹899" sale="₹699"
                    saving="₹200" percent="22"
                    variant="f1"
                  />
                </div>
                <ProductGrid products={f1Products} />
              </section>
            )}

            {/* ── Classic Cars Section ─────────────────────────────────── */}
            {showClassic && (
              <section id="section-classic">
                <SectionHeader
                  icon={<Car className="w-5 h-5 text-amber-400" />}
                  title="Classic Cars"
                  subtitle={`Sports · Muscle · Adventure · Bond · 1st Edit Photos · ${classicProducts.length} available`}
                  count={classicProducts.length}
                  variant="classic"
                />
                <div className="mb-7 flex flex-wrap gap-3">
                  <PricingBadge
                    label="Classic &amp; Muscle Cars"
                    original="₹749" sale="₹549"
                    saving="₹200" percent="27"
                    limited
                    variant="classic"
                  />
                </div>
                <ProductGrid products={classicProducts} />
              </section>
            )}

          </div>
        )}

        {/* ── Bottom CTA ──────────────────────────────────────────────── */}
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
              Pre-bookings open · Custom orders welcome
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
