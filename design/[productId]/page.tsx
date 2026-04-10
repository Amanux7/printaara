import { DEMO_PRODUCTS } from "@/lib/config";
import { notFound } from "next/navigation";
import DesignStudio from "@/components/design/DesignStudio";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ productId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { productId } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.id === productId);
  if (!product) return { title: "Design Studio" };
  return {
    title: `Design ${product.name} | Design Studio`,
    description: `Customize your ${product.name} using Printaara's real-time design studio.`,
  };
}

export default async function DesignPage({ params }: Props) {
  const { productId } = await params;
  const product = DEMO_PRODUCTS.find((p) => p.id === productId);
  if (!product) notFound();

  return <DesignStudio productId={productId} />;
}
