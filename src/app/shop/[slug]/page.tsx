import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchProductBySlug, fetchProducts } from '@/lib/api';
import { ProductGallery } from '@/components/product/ProductGallery';
import { AddToCartButton } from '@/components/product/AddToCartButton';
import { Badge } from '@/components/ui/Badge';
import { formatINR, padLivery } from '@/lib/utils';

type Params = { slug: string };

export async function generateStaticParams(): Promise<Params[]> {
  const products = await fetchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) return { title: 'Not found' };
  return {
    title: product.name,
    description: product.description.short,
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const product = await fetchProductBySlug(params.slug);
  if (!product) notFound();

  return (
    <section className="border-b border-circuit-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="text-xs font-mono uppercase tracking-[0.18em] text-ivory/50 mb-8 flex items-center gap-2">
          <Link href="/shop" className="hover:text-ivory">Shop</Link>
          <span>/</span>
          <span className="text-ivory/80">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Gallery */}
          <ProductGallery product={product} />

          {/* Body */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge tone="mauli">{padLivery(product.liveryNumber)}</Badge>
              <Badge tone="chrome">{product.category}</Badge>
            </div>
            <h1 className="h-display text-4xl md:text-5xl text-ivory text-balance">
              {product.name}
            </h1>
            <p className="mt-4 text-ivory/75 font-body text-pretty">
              {product.description.long}
            </p>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-mono text-3xl text-ivory">
                {formatINR(product.price)}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ivory/50">
                incl. of all taxes
              </span>
            </div>

            <div className="mt-6">
              <AddToCartButton product={product} size="lg" fullWidth />
            </div>

            {/* Specs */}
            <div className="mt-10">
              <p className="eyebrow mb-3">Specifications</p>
              <dl className="border border-circuit-700 rounded-sm divide-y divide-circuit-700">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div
                    key={k}
                    className="grid grid-cols-[140px_1fr] gap-4 px-4 py-3"
                  >
                    <dt className="font-mono uppercase tracking-[0.18em] text-[10px] text-ivory/50">
                      {k}
                    </dt>
                    <dd className="font-mono text-xs text-chrome-200">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Care */}
            <div className="mt-8 placard px-4 py-3 text-[10px] text-ivory/65 leading-relaxed">
              Hand-tied silk. Keep dry. The thread can be re-tied by hand if
              stretched. Comes with an atelier card and a chrome-edged case.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
