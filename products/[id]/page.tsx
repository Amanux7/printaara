import { DEMO_PRODUCTS, TAX_CONFIG } from "@/lib/config";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Star, Package, Zap, Shield, Palette } from "lucide-react";
import type { Metadata } from "next";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.id === id);
  if (!product) return { title: "Product Not Found" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.id === id);
  if (!product) notFound();

  const basePrice = product.basePrice;
  const gstAmount = Math.round(basePrice * TAX_CONFIG.gstRate);
  const totalPrice = basePrice + gstAmount;

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "#030712" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="text-sm text-[#475569] mb-8 flex items-center gap-2">
          <Link href="/" className="hover:text-[#94a3b8]">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#94a3b8]">Products</Link>
          <span>/</span>
          <span className="text-[#f1f5f9]">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#13131f]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details */}
          <div>
            <span className="section-label">
              {product.category === "tshirts" ? "👕 T-Shirt" : product.category === "hoodies" ? "🧥 Hoodie" : "☕ Mug"}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mt-3 mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-[#eab308] text-[#eab308]" : "fill-[#1e1e3a] text-[#1e1e3a]"}`} />
              ))}
              <span className="text-sm text-[#94a3b8]">({product.reviews} reviews)</span>
            </div>

            <p className="text-[#94a3b8] mb-6 leading-relaxed">{product.description}</p>

            {/* Pricing */}
            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#94a3b8]">Base Price</span>
                <span className="text-[#f1f5f9]">₹{basePrice.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-[#94a3b8]">GST (18%)</span>
                <span className="text-[#94a3b8]">₹{gstAmount.toLocaleString("en-IN")}</span>
              </div>
              <div className="border-t border-[#1e1e3a] pt-2 flex items-center justify-between">
                <span className="font-semibold text-[#f1f5f9]">Total</span>
                <span className="text-2xl font-bold gradient-text">₹{totalPrice.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Color picker */}
            <div className="mb-6">
              <p className="text-sm font-medium text-[#f1f5f9] mb-3">Color</p>
              <div className="flex gap-2">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${i === 0 ? "border-[#a855f7] scale-110" : "border-transparent hover:border-[#94a3b8]"}`}
                    style={{ background: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size picker */}
            <div className="mb-8">
              <p className="text-sm font-medium text-[#f1f5f9] mb-3">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={size}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${i === 2 ? "bg-[#a855f7] border-[#a855f7] text-white" : "bg-transparent border-[#1e1e3a] text-[#94a3b8] hover:border-[#a855f7] hover:text-[#a855f7]"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link href={`/design/${product.id}`} className="btn-neon flex-1 text-center py-4">
                <span className="flex items-center justify-center gap-2">
                  <Palette className="w-5 h-5" />
                  Customize Design
                </span>
              </Link>
              <Link href="/checkout" className="btn-outline-neon flex-1 text-center py-4">
                Buy Now
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Package, text: "3-7 Day Delivery" },
                { icon: Zap, text: "Premium DTG Print" },
                { icon: Shield, text: "100% Secure Pay" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="glass-card rounded-xl p-3 text-center">
                  <Icon className="w-5 h-5 text-[#a855f7] mx-auto mb-1" />
                  <p className="text-xs text-[#94a3b8]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <WhatsAppButton productName={product.name} />
    </div>
  );
}
