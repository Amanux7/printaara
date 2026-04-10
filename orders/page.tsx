import { Package, Clock, Truck, CheckCircle } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Orders | Printaara",
};

const mockOrders = [
  {
    id: "PRA-00001",
    date: "Jan 15, 2024",
    product: "Stellar Black Tee",
    amount: 589,
    status: "processing",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100",
  },
  {
    id: "PRA-00002",
    date: "Jan 10, 2024",
    product: "Creator Hoodie Pro",
    amount: 1179,
    status: "delivered",
    image: "https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=100",
  },
];

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "processing") return <Clock className="w-4 h-4 text-[#eab308]" />;
  if (status === "shipped") return <Truck className="w-4 h-4 text-[#06b6d4]" />;
  return <CheckCircle className="w-4 h-4 text-[#22c55e]" />;
};

export default function OrdersPage() {
  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "#030712" }}>
      <div className="container max-w-3xl">
        <span className="section-label">Account</span>
        <h1 className="text-2xl md:text-3xl font-bold mt-2 mb-8">
          My <span className="gradient-text">Orders</span>
        </h1>

        {mockOrders.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-[#1e1e3a] mx-auto mb-4" />
            <p className="text-[#94a3b8] mb-6">No orders yet. Start designing!</p>
            <Link href="/design/1" className="btn-neon">
              <span>Create Your First Order</span>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div key={order.id} className="glass-card rounded-2xl p-5 flex items-center gap-5">
                <div
                  className="w-16 h-16 rounded-xl bg-[#13131f] overflow-hidden shrink-0"
                  style={{
                    backgroundImage: `url(${order.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-[#f1f5f9]">{order.product}</p>
                  </div>
                  <p className="text-xs text-[#475569]">
                    {order.id} · {order.date}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-bold text-[#f1f5f9] mb-1">
                    ₹{order.amount.toLocaleString("en-IN")}
                  </p>
                  <div className="flex items-center gap-1 justify-end">
                    <StatusIcon status={order.status} />
                    <span className={`text-xs capitalize ${
                      order.status === "processing" ? "text-[#eab308]" :
                      order.status === "shipped" ? "text-[#06b6d4]" : "text-[#22c55e]"
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
