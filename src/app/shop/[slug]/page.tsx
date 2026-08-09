import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { fetchProductBySlug, fetchProducts } from '@/lib/api';
import { Badge } from '@/components/ui/Badge';
import { formatINR, padLivery } from '@/lib/utils';
import { Mail, ShieldCheck, Package, Truck, MessageCircle } from 'lucide-react';

type Params = { slug: string };

const WA_NUMBER = '918008578757';

function buildWhatsAppUrl(productName: string, price: number): string {
  const msg = encodeURIComponent(
    `Hi! I'm interested in ordering:\n\n🏎️ *${productName}*\nPrice: ₹${price}\n\nCould you please confirm availability and share payment details? Thank you!`
  );
  return `https://wa.me/${WA_NUMBER}?text=${msg}`;
}

export async function generateStaticParams(): Promise<Params[]> {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return { title: 'Not found' };
  return {
    title: `${product.name} | Rakhi Wheels`,
    description: product.description.short,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();

  const saving = product.originalPrice ? product.originalPrice - product.price : 0;
  const savingPct = product.originalPrice
    ? Math.round((saving / product.originalPrice) * 100)
    : 0;

  const whatsappUrl = buildWhatsAppUrl(product.name, product.price);

  return (
    <section className="min-h-screen bg-circuit-900">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Breadcrumb */}
        <nav className="text-xs font-mono uppercase tracking-[0.18em] text-ivory/50 mb-8 flex items-center gap-2">
          <Link href="/shop" className="hover:text-ivory transition">Shop</Link>
          <span className="text-ivory/30">/</span>
          <span className="text-ivory/80 truncate max-w-xs">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* ── Image Gallery ─────────────────────────────────────── */}
          <div className="space-y-3">
            {/* Main image */}
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-circuit-800 to-circuit-900 border border-circuit-700 shadow-2xl">
              {product.images[0] ? (
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-display text-8xl opacity-20">🏎️</span>
                </div>
              )}

              {/* Discount badge */}
              {savingPct > 0 && (
                <div className="absolute top-3 left-3">
                  <span className="bg-red-500 text-white text-[11px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                    -{savingPct}%
                  </span>
                </div>
              )}

              {/* Edition badge */}
              <div className="absolute top-3 right-3">
                <span className="bg-circuit-900/80 backdrop-blur text-chrome-200 font-mono text-[10px] px-2.5 py-1 rounded-full border border-circuit-700">
                  #{String(product.liveryNumber).padStart(3, '0')} / {String(product.editionSize).padStart(3, '0')}
                </span>
              </div>
            </div>

            {/* Thumbnail strip (only if multiple images) */}
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((src, i) => (
                  <div
                    key={i}
                    className="relative w-20 h-20 rounded-lg overflow-hidden border border-circuit-700 flex-shrink-0"
                  >
                    <Image
                      src={src}
                      alt={`${product.name} view ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: ShieldCheck, label: 'Authentic',     sub: 'Handcrafted' },
                { icon: Package,     label: 'Gift Ready',    sub: 'Box included' },
                { icon: Truck,       label: 'Fast Delivery', sub: 'PAN India' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-circuit-800/60 border border-circuit-700 text-center">
                  <Icon className="w-4 h-4 text-mauli-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ivory/70">{label}</span>
                  <span className="font-mono text-[9px] text-ivory/40">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Product Info ──────────────────────────────────────── */}
          <div className="flex flex-col">
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge tone="mauli">{padLivery(product.liveryNumber)}</Badge>
              <Badge tone="chrome">{product.category.toUpperCase()}</Badge>
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] font-mono uppercase tracking-widest text-ivory/40 border border-circuit-600 px-2 py-0.5 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="font-display text-3xl md:text-4xl uppercase tracking-tight text-ivory leading-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-ivory/70 font-body leading-relaxed text-pretty">
              {product.description.long}
            </p>

            {/* ── Pricing block ─────────────────────────────────────── */}
            <div className="mt-7 p-5 rounded-2xl bg-circuit-800/80 border border-circuit-700">
              <div className="flex items-end gap-4 flex-wrap">
                <span className="font-display text-4xl text-ivory font-bold tabular-nums">
                  {formatINR(product.price)}
                </span>
                {product.originalPrice && (
                  <div className="flex flex-col pb-1">
                    <span className="font-mono text-sm text-ivory/40 line-through tabular-nums">
                      {formatINR(product.originalPrice)}
                    </span>
                    <span className="text-[10px] font-mono text-green-400 uppercase tracking-widest font-bold">
                      Save {formatINR(saving)} &nbsp;·&nbsp; {savingPct}% OFF
                    </span>
                  </div>
                )}
              </div>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ivory/40">
                Inclusive of all taxes · Free gift wrapping
              </p>
            </div>

            {/* ── WhatsApp CTA ─────────────────────────────────────── */}
            <div className="mt-6 space-y-3">
              <a
                id="whatsapp-order-btn"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full px-6 py-4 rounded-2xl bg-green-600 hover:bg-green-500 active:scale-[0.98] text-white font-mono text-sm uppercase tracking-widest transition-all duration-200 shadow-lg shadow-green-900/40 hover:shadow-green-600/40 font-bold"
              >
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                Order on WhatsApp
              </a>

              <a
                id="email-order-btn"
                href={`mailto:Rakhiwheels@gmail.com?subject=${encodeURIComponent(`Order Enquiry: ${product.name}`)}&body=${encodeURIComponent(`Hi,\n\nI'm interested in ordering:\n\n${product.name}\nPrice: ₹${product.price}\n\nPlease confirm availability and payment details.\n\nThank you!`)}`}
                className="flex items-center justify-center gap-3 w-full px-6 py-3.5 rounded-2xl bg-circuit-800 hover:bg-circuit-700 border border-circuit-700 hover:border-mauli-500/50 text-ivory/80 hover:text-mauli-400 font-mono text-sm uppercase tracking-widest transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                Enquire via Email
              </a>

              {/* How it works */}
              <div className="flex items-start gap-3 p-4 rounded-xl bg-green-500/8 border border-green-500/20">
                <MessageCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                <p className="font-mono text-[11px] text-ivory/60 leading-relaxed">
                  <span className="text-green-400 font-bold">How it works: </span>
                  Click "Order on WhatsApp" → Chat with our seller → Confirm details &amp; pay via UPI / bank transfer → Your rakhi ships in 2–3 days 🏎️
                </p>
              </div>
            </div>

            {/* ── Specs ─────────────────────────────────────────────── */}
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ivory/50 mb-3">
                Specifications
              </p>
              <dl className="border border-circuit-700 rounded-xl divide-y divide-circuit-700 overflow-hidden">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[130px_1fr] gap-4 px-4 py-3 hover:bg-circuit-800/50 transition"
                  >
                    <dt className="font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/50 self-center">
                      {k}
                    </dt>
                    <dd className="font-mono text-xs text-chrome-200">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Care note */}
            <div className="mt-5 px-4 py-3 rounded-xl border border-circuit-700 bg-circuit-800/40 text-[11px] text-ivory/55 leading-relaxed font-body">
              Hand-tied silk. Keep dry. The thread can be re-tied by hand if stretched.
              Comes with an atelier card and a chrome-edged case.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
