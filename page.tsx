import HeroSection from "@/components/home/HeroSection";
import ProductCatalog from "@/components/home/ProductCatalog";
import FeaturesSection from "@/components/home/FeaturesSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import RegionalSection from "@/components/home/RegionalSection";
import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/config";
import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.tagline}`,
  description: SITE_CONFIG.description,
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProductCatalog />
      <FeaturesSection />
      <RegionalSection />
      <TestimonialsSection />

      {/* Final CTA Band */}
      <section
        className="section-pad relative overflow-hidden"
        style={{
          background: "linear-gradient(160deg, #130930 0%, var(--bg-void) 55%, #0d1f15 100%)",
          borderTop: "1px solid var(--bg-border)",
        }}
      >
        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, #8B5CF6 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "clamp(400px, 60vw, 800px)",
            height: "clamp(200px, 30vw, 400px)",
            background: "radial-gradient(ellipse, rgba(139,92,246,0.12) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div className="container relative z-10" style={{ textAlign: "center" }}>
          <Sparkles
            style={{
              width: 40,
              height: 40,
              color: "#A78BFA",
              margin: "0 auto",
              display: "block",
              marginBottom: 28,
            }}
          />

          <h2
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              marginBottom: 24,
              maxWidth: "16ch",
              margin: "0 auto 24px",
            }}
          >
            Ready to Create Your{" "}
            <span className="shimmer-text">Wearable Star?</span>
          </h2>

          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              lineHeight: 1.75,
              maxWidth: "42ch",
              margin: "0 auto",
              marginBottom: "clamp(40px, 5vw, 56px)",
            }}
          >
            Join 5,000+ creators who turned their ideas into iconic merch.
            <br />
            It takes less than 10 minutes.
          </p>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 16,
              justifyContent: "center",
            }}
          >
            <Link href="/design/1" className="btn-amber" style={{ padding: "16px 36px", fontSize: "1.05rem" }}>
              <Sparkles style={{ width: 18, height: 18 }} />
              Start Designing Free
            </Link>
            <Link href="/products" className="btn-outline-neon" style={{ padding: "16px 36px", fontSize: "1.05rem" }}>
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
