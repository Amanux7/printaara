import Link from "next/link";
import { CheckCircle, Package, MessageCircle, ArrowRight } from "lucide-react";

export default function OrderSuccessPage() {
  const orderId = `PRA-${Date.now().toString().slice(-8)}`;

  return (
    <div
      className="min-h-screen flex items-center justify-center pt-20"
      style={{ background: "radial-gradient(ellipse at center, #0d0533 0%, #030712 100%)" }}
    >
      <div className="text-center max-w-lg mx-auto px-6">
        <div className="w-20 h-20 rounded-full bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] flex items-center justify-center mx-auto mb-6 animate-bounce-in">
          <CheckCircle className="w-10 h-10 text-[#22c55e]" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Order <span className="gradient-text">Confirmed!</span>
        </h1>
        <p className="text-[#94a3b8] mb-2">
          Thank you! Your custom merch is being prepared.
        </p>
        <p className="text-sm text-[#475569] mb-8">
          Order ID: <span className="text-[#a855f7] font-mono">{orderId}</span>
        </p>

        {/* Tracking Steps */}
        <div className="glass-card rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-semibold text-[#f1f5f9] mb-4 flex items-center gap-2">
            <Package className="w-4 h-4 text-[#a855f7]" />
            What happens next?
          </h3>
          <div className="space-y-4">
            {[
              { step: "1", title: "Order Processing", desc: "We&apos;re printing your design (1-2 days)", active: true },
              { step: "2", title: "Quality Check", desc: "Your item goes through our QC process", active: false },
              { step: "3", title: "Shipped", desc: "Dispatched via courier with tracking", active: false },
              { step: "4", title: "Delivered", desc: "To your doorstep in 3-7 days", active: false },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                    item.active
                      ? "bg-[#a855f7] text-white"
                      : "bg-[#1e1e3a] text-[#475569]"
                  }`}
                >
                  {item.step}
                </div>
                <div>
                  <p className={`text-sm font-medium ${item.active ? "text-[#f1f5f9]" : "text-[#475569]"}`}>
                    {item.title}
                  </p>
                  <p className="text-xs text-[#475569]" dangerouslySetInnerHTML={{ __html: item.desc }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/orders" className="btn-neon flex-1 text-center py-3">
            <span className="flex items-center justify-center gap-2">
              Track Order
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
          <a
            href={`https://wa.me/919999999999?text=${encodeURIComponent(`Hi Printaara! I just placed order ${orderId}. Can you confirm?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-neon flex-1 text-center py-3"
          >
            <span className="flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              WhatsApp Updates
            </span>
          </a>
        </div>

        <Link href="/products" className="block text-sm text-[#475569] hover:text-[#94a3b8] mt-6 transition-colors">
          Continue Shopping →
        </Link>
      </div>
    </div>
  );
}
