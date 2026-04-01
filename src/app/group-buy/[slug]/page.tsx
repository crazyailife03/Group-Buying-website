import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/lib/data";
import { GroupBuyClient } from "./group-buy-client";

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function GroupBuyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return <GroupBuyClient product={product} />;
}
