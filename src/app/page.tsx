"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { products, categories } from "@/lib/data";
import { ProductCard } from "@/components/product-card";
import { Badge } from "@/components/ui/badge";
import { CountdownTimer } from "@/components/countdown-timer";

export default function HomePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCategory = searchParams.get("category") || "全部";

  function setActiveCategory(cat: string) {
    if (cat === "全部") {
      router.push("/");
    } else {
      router.push(`/?category=${encodeURIComponent(cat)}`);
    }
  }

  const filtered =
    activeCategory === "全部"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const featured = [...products].sort(
    (a, b) => b.filledSlots / b.totalSlots - a.filledSlots / a.totalSlots
  )[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Hero Banner */}
      <div className="relative rounded-xl overflow-hidden mb-6 bg-gradient-to-r from-[#ee4d2d] to-[#f56b2d]">
        <div className="grid md:grid-cols-2 gap-4 p-6 md:p-10">
          <div className="text-white flex flex-col justify-center">
            <Badge className="bg-white/20 text-white border-0 mb-3 w-fit hover:bg-white/20">
              限時團購活動
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
              {featured.groupBuyName}
            </h1>
            <p className="text-white/80 mb-4 text-sm md:text-base">
              {featured.name} - 團購價只要 ${featured.groupBuyPrice.toLocaleString()}
            </p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm opacity-80">距離結束</span>
              <CountdownTimer endTime={featured.endTime} />
            </div>
            <a
              href={`/group-buy/${featured.slug}`}
              className="bg-white text-[#ee4d2d] font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors w-fit text-sm"
            >
              立即搶購
            </a>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <img
              src={featured.images[0]}
              alt={featured.name}
              className="w-72 h-72 object-cover rounded-xl shadow-2xl ring-4 ring-white/20"
            />
          </div>
        </div>
      </div>

      {/* Flash sale bar */}
      <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border">
        <div className="flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#ee4d2d">
              <path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z" />
            </svg>
            <span className="text-[#ee4d2d] font-bold text-lg">限時搶購</span>
          </div>
          {products
            .sort((a, b) => new Date(a.endTime).getTime() - new Date(b.endTime).getTime())
            .slice(0, 4)
            .map((p) => (
              <a
                key={p.id}
                href={`/group-buy/${p.slug}`}
                className="flex items-center gap-3 shrink-0 p-2 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <img src={p.images[0]} alt={p.name} className="w-12 h-12 rounded object-cover" />
                <div>
                  <p className="text-xs text-gray-600 truncate max-w-[120px]">{p.name}</p>
                  <p className="text-[#ee4d2d] font-bold text-sm">
                    ${p.groupBuyPrice.toLocaleString()}
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? "bg-[#ee4d2d] text-white"
                : "bg-white text-gray-600 hover:bg-gray-100 border"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Section title */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-1 h-6 bg-[#ee4d2d] rounded-full" />
        <h2 className="text-xl font-bold text-gray-800">
          {activeCategory === "全部" ? "熱門團購" : activeCategory}
        </h2>
        <span className="text-sm text-gray-400">({filtered.length} 個團購)</span>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg">此分類暫無團購商品</p>
        </div>
      )}
    </div>
  );
}
