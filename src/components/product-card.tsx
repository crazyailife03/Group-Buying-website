"use client";

import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CountdownTimer } from "./countdown-timer";
import { GroupBuyProduct } from "@/lib/data";

export function ProductCard({ product }: { product: GroupBuyProduct }) {
  const progress = Math.round((product.filledSlots / product.totalSlots) * 100);
  const discount = Math.round(
    ((product.originalPrice - product.groupBuyPrice) / product.originalPrice) * 100
  );

  return (
    <Link href={`/group-buy/${product.slug}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer border border-gray-100">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Discount badge */}
          <div className="absolute top-0 right-0 bg-[#ee4d2d] text-white px-2 py-1 text-xs font-bold rounded-bl-lg">
            -{discount}%
          </div>
          {/* Tags */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                className={`text-[10px] px-1.5 py-0 ${
                  tag === "即將售罄"
                    ? "bg-red-500 hover:bg-red-500"
                    : tag === "熱賣"
                    ? "bg-orange-500 hover:bg-orange-500"
                    : tag === "限時搶購"
                    ? "bg-[#ee4d2d] hover:bg-[#ee4d2d]"
                    : "bg-blue-500 hover:bg-blue-500"
                } text-white border-0`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="text-sm font-medium text-gray-800 line-clamp-2 min-h-[40px] leading-5">
            {product.name}
          </h3>

          {/* Store */}
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-[10px] bg-[#ee4d2d] text-white px-1 rounded">團</span>
            <span className="text-xs text-gray-500 truncate">{product.store.name}</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-2 mt-2">
            <span className="text-[#ee4d2d] font-bold text-lg leading-none">
              ${product.groupBuyPrice.toLocaleString()}
            </span>
            <span className="text-gray-400 text-xs line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          </div>

          {/* Progress */}
          <div className="mt-2">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>已揪 {product.filledSlots} 人</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-[#ee4d2d] [&>div]:to-[#f7a440]" />
          </div>

          {/* Countdown */}
          <div className="mt-2 flex items-center gap-1.5">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ee4d2d" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
            <CountdownTimer endTime={product.endTime} compact />
          </div>
        </div>
      </div>
    </Link>
  );
}
