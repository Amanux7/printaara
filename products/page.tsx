import { DEMO_PRODUCTS, PRODUCT_CATEGORIES } from "@/lib/config";
import ProductCard from "@/components/ui/ProductCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Product Catalog",
  description: "Browse custom T-shirts, Hoodies, and Mugs. All fully customizable.",
};

export default function ProductsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "#030712" }}>
      <div className="container">
        {/* Header */}
        <div className="mb-10">
          <span className="section-label">All Products</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Our <span className="gradient-text">Full Catalog</span>
          </h1>
          <p className="text-[#94a3b8] mt-3">
            {DEMO_PRODUCTS.length} products · All customizable in our design studio
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1">
            <div className="glass-card rounded-2xl p-6 sticky top-24">
              <h3 className="font-semibold text-[#f1f5f9] mb-4">Filters</h3>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-[#475569] mb-3">Category</p>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="accent-[#a855f7]" defaultChecked />
                    <span className="text-sm text-[#94a3b8]">All</span>
                  </label>
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-[#a855f7]" defaultChecked />
                      <span className="text-sm text-[#94a3b8]">
                        {cat.icon} {cat.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs uppercase tracking-wider text-[#475569] mb-3">Price Range</p>
                <div className="space-y-2">
                  {["Under ₹500", "₹500 – ₹1000", "₹1000 – ₹1500", "₹1500+"].map(
                    (range) => (
                      <label key={range} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="accent-[#a855f7]" />
                        <span className="text-sm text-[#94a3b8]">{range}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-[#475569] mb-3">Rating</p>
                <div className="space-y-2">
                  {["4.5+", "4.0+", "3.5+"].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="accent-[#a855f7]" />
                      <span className="text-sm text-[#94a3b8]">⭐ {rating}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {DEMO_PRODUCTS.map((product, i) => (
                <ProductCard key={product.id} product={product} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
