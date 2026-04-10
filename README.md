# 🌟 Printaara — Custom Merch Platform

> *"Where your ideas become wearable stars."*

A full-stack, production-ready e-commerce and creator platform built for the Indian market. Design custom T-shirts, Hoodies, and Mugs using a real-time design studio, pay via Razorpay (UPI/cards), and manage orders through an admin dashboard.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Styling | Tailwind CSS + Custom Dark Neon Design System |
| Animations | Framer Motion |
| Design Canvas | fabric.js (dynamic import, client-only) |
| Database & Auth | Supabase (PostgreSQL + Google OAuth) |
| Payments | Razorpay (UPI, Cards, Net Banking) |
| Hosting | Vercel (recommended) |

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com) account (free tier works)
- A [Razorpay](https://razorpay.com) account (test mode for development)

### 2. Install

```bash
cd printaara-app
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your keys:

```env
# ─── SUPABASE ───────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# ─── RAZORPAY ───────────────────────────────────────────
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
RAZORPAY_WEBHOOK_SECRET=your_razorpay_webhook_secret
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_your_key_id

# ─── SITE ───────────────────────────────────────────────
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run Dev Server

```bash
npm run dev
# Visit http://localhost:3000
```

---

## 🗄️ Supabase Setup

### Step 1 — Create a Project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **anon key** from Project Settings → API

### Step 2 — Run Database Schema

Go to Supabase → SQL Editor → New Query. Run:

```sql
-- PROFILES
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT, phone TEXT, address JSONB,
  role TEXT DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (new.id, new.raw_user_meta_data->>'full_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- ORDERS
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users,
  product_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER DEFAULT 1,
  size TEXT, color TEXT,
  design_canvas_json JSONB,
  design_image_url TEXT,
  base_amount INTEGER NOT NULL,
  gst_amount INTEGER NOT NULL,
  total_amount INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending','processing','shipped','delivered','cancelled','payment_failed')),
  razorpay_order_id TEXT,
  razorpay_payment_id TEXT,
  shipping_address JSONB,
  coupon_code TEXT,
  discount_amount INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service role manages orders" ON orders USING (true) WITH CHECK (true);

-- DESIGN PRESETS
CREATE TABLE design_presets (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL, category TEXT NOT NULL,
  description TEXT, canvas_json JSONB,
  thumbnail_url TEXT, is_regional BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE design_presets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Presets publicly readable" ON design_presets FOR SELECT USING (true);
```

### Step 3 — Storage Buckets
Supabase → Storage → Create:
- **`designs`** — Public bucket (exported design PNGs)
- **`products`** — Public bucket (product mock images)

### Step 4 — Google OAuth
1. Supabase → Auth → Providers → Google → Enable
2. Add Client ID & Secret from Google Console
3. Redirect URL: `https://your-project-id.supabase.co/auth/v1/callback`

---

## 💳 Razorpay Setup

1. [Razorpay Dashboard](https://dashboard.razorpay.com) → Settings → API Keys → Generate Test Keys
2. Add `rzp_test_*` keys to `.env.local`
3. Webhooks: URL = `https://yourdomain.com/api/payment/webhook`, Events: `payment.captured`, `payment.failed`

> **Test Card:** `4111 1111 1111 1111` · Any future expiry · CVV: `111`

---

## 🔐 Admin Access

```sql
-- Run in Supabase SQL Editor after your first login
UPDATE profiles SET role = 'admin' WHERE id = 'your-user-uuid';
```

Then visit `/admin` for the full order management dashboard.

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                # Homepage
│   ├── products/               # Catalog + detail
│   ├── design/[productId]/     # 🎨 Design Studio (USP)
│   ├── checkout/               # Razorpay checkout
│   ├── order-success/          # Payment confirmation
│   ├── orders/                 # User order history
│   ├── admin/                  # Admin dashboard
│   ├── auth/                   # Login / OAuth callback
│   └── api/
│       ├── design/save/        # Save design to Supabase
│       └── payment/            # create-order / verify / webhook
├── components/
│   ├── home/                   # Hero, Catalog, Features, Regional, Testimonials
│   ├── design/                 # Canvas, Sidebar, Toolbar, Studio
│   └── ui/                     # Navbar, Footer, ProductCard, WhatsAppButton
└── lib/
    ├── config.ts               # All constants (WhatsApp, GST, products)
    ├── supabase/               # Browser & server clients
    └── razorpay.ts             # Server-side singleton
```

---

## 🎨 Customize

### WhatsApp Number (`src/lib/config.ts`)
```ts
export const WHATSAPP_CONFIG = {
  number: "91XXXXXXXXXX", // Your real number
};
```

### GST / Business Info (`src/lib/config.ts`)
```ts
export const BUSINESS_INFO = {
  gstin: "GSTIN: YOUR_REAL_GSTIN",
  legalName: "Your Business Legal Name",
};
```

---

## 🌐 Deploy to Vercel

```bash
npm i -g vercel
vercel

# After deploy — in Vercel Dashboard → Settings → Env Variables:
# Add all variables from .env.local
```

Update in Supabase after deploy:
- Auth → URL Config → Site URL = `https://yourdomain.vercel.app`
- Auth → URL Config → Redirect URLs = `https://yourdomain.vercel.app/auth/callback`

---

## 🗺️ Roadmap

- **Phase 2:** Stripe (global), AI Design Generator, Referral system
- **Phase 3:** Creator marketplace, Dropshipping, Mobile app

---

*🏔️ Made with ❤️ in Uttarakhand · Printaara Ventures · MSME Registered*
