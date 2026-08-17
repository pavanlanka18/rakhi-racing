import { PRODUCTS } from '@/lib/fixtures/products';
import { ProductCard } from '@/components/product/ProductCard';

export function RakhiDisplaySections() {
  const f1Cars = PRODUCTS.filter((p) => p.category === 'f1');
  const muscleCars = PRODUCTS.filter((p) => p.id.startsWith('p_first_edit_') && p.category === 'muscle');

  return (
    <section className="relative bg-circuit-900 border-b border-circuit-700">
      <div className="absolute inset-0 circuit-grid opacity-20 pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-6 py-20">
        
        {/* Premium Section: Formula 1 Car Rakhi */}
        <div className="mb-24">
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="eyebrow mb-3 text-mauli-400">Premium Section</span>
            <h2 className="font-display text-4xl md:text-5xl text-ivory uppercase tracking-tight mb-4">
              Formula 1 Car Rakhi
            </h2>
            <div className="flex items-center gap-4 text-lg font-mono">
              <span className="text-ivory/40 line-through">₹899</span>
              <span className="text-ivory font-semibold">₹699</span>
              <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm">
                Save ₹200 (22% OFF)
              </span>
            </div>
            <p className="mt-4 text-ivory/60 max-w-2xl font-body">
              Premium Formula 1 die-cast models crafted into elegant rakhis. 
              Limited availability.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {f1Cars.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

        {/* Ordinary Section: Hot Wheels Fantasy / Muscle Cars */}
        <div>
          <div className="mb-12 flex flex-col items-center text-center">
            <span className="eyebrow mb-3 text-vermillion-400">Ordinary Section</span>
            <h2 className="font-display text-4xl md:text-5xl text-ivory uppercase tracking-tight mb-4">
              Hot Wheels Fantasy Rakhi
            </h2>
            <div className="flex items-center gap-4 text-lg font-mono">
              <span className="text-ivory/40 line-through">₹649</span>
              <span className="text-ivory font-semibold">₹499</span>
              <span className="text-green-400 bg-green-400/10 px-3 py-1 rounded-full text-sm">
                Save ₹150 (23% OFF)
              </span>
            </div>
            <p className="mt-4 text-ivory/60 max-w-2xl font-body">
              Classic muscle cars and fantasy models from Hot Wheels, ready for 
              Raksha Bandhan gifting.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {muscleCars.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
