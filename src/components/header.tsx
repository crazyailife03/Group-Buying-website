"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cartStore } from "@/lib/cart-store";
import { categories } from "@/lib/data";

export function Header() {
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartStore.getTotal();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "全部";
  const [search, setSearch] = useState("");
  const [mounted, setMounted] = useState(false);



  useEffect(() => setMounted(true), []);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#ee4d2d] to-[#f0603a] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-8 text-xs">
            <div className="flex items-center gap-4">
              <span>賣家中心</span>
              <span>下載APP</span>
              <span>聯絡客服</span>
            </div>
            <div className="flex items-center gap-4">
              <span>通知</span>
              <span>幫助中心</span>
              <span>繁體中文</span>
              <Link href="/orders" className="hover:underline">我的訂單</Link>
              <span>登入 / 註冊</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-[#ee4d2d] text-white pb-3 pt-2">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="text-2xl font-bold flex items-center gap-2">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                  <rect width="32" height="32" rx="6" />
                  <text x="4" y="24" fontSize="20" fill="#ee4d2d" fontWeight="bold">
                    團
                  </text>
                </svg>
                <span className="hidden sm:inline">團購趣</span>
              </div>
            </Link>

            {/* Search */}
            <div className="flex-1 max-w-2xl">
              <div className="flex">
                <Input
                  placeholder="搜尋團購商品..."
                  className="rounded-r-none bg-white text-gray-800 border-0 h-10 focus-visible:ring-0"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="bg-[#fb5533] hover:bg-[#d73211] px-6 rounded-r-lg flex items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>
              <div className="flex gap-3 mt-1.5 text-xs opacity-90">
                <span className="cursor-pointer hover:underline">牛肉麵</span>
                <span className="cursor-pointer hover:underline">藍牙耳機</span>
                <span className="cursor-pointer hover:underline">香氛</span>
                <span className="cursor-pointer hover:underline">韓系穿搭</span>
                <span className="cursor-pointer hover:underline">護膚套組</span>
              </div>
            </div>

            {/* Cart */}
            <Sheet>
              <SheetTrigger className="relative p-2 hover:opacity-80 shrink-0">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                  </svg>
                  {mounted && cartCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 bg-white text-[#ee4d2d] text-xs px-1.5 min-w-[20px] h-5 flex items-center justify-center hover:bg-white">
                      {cartCount}
                    </Badge>
                  )}
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle className="text-[#ee4d2d]">
                    購物車 ({mounted ? cartCount : 0})
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-4 flex flex-col h-[calc(100vh-10rem)]">
                  {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                      <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                      </svg>
                      <p className="mt-4">購物車是空的</p>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 overflow-auto space-y-3 pr-1">
                        {cart.map((item) => (
                          <div
                            key={`${item.product.id}-${item.combo.id}`}
                            className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <img
                              src={item.product.images[0]}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">{item.product.name}</p>
                              <p className="text-xs text-gray-500">{item.combo.name}</p>
                              <div className="flex items-center justify-between mt-1">
                                <span className="text-[#ee4d2d] font-bold text-sm">
                                  ${(item.combo.pricePerItem * item.combo.quantity).toLocaleString()}
                                </span>
                                <div className="flex items-center gap-2">
                                  <button
                                    className="w-6 h-6 rounded border flex items-center justify-center text-sm hover:bg-gray-100"
                                    onClick={() =>
                                      cartStore.updateQuantity(
                                        item.product.id,
                                        item.combo.id,
                                        item.quantity - 1
                                      )
                                    }
                                  >
                                    -
                                  </button>
                                  <span className="text-sm w-6 text-center">{item.quantity}</span>
                                  <button
                                    className="w-6 h-6 rounded border flex items-center justify-center text-sm hover:bg-gray-100"
                                    onClick={() =>
                                      cartStore.updateQuantity(
                                        item.product.id,
                                        item.combo.id,
                                        item.quantity + 1
                                      )
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Separator className="my-3" />
                      <div className="space-y-3">
                        <div className="flex justify-between text-lg font-bold">
                          <span>合計</span>
                          <span className="text-[#ee4d2d]">${cartTotal.toLocaleString()}</span>
                        </div>
                        <Link href="/checkout" className="block">
                          <Button className="w-full bg-[#ee4d2d] hover:bg-[#d73211] text-white h-12 text-lg">
                            前往結帳
                          </Button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Category bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-6 h-10 overflow-x-auto text-sm">
            {categories.map((cat) => (
              <Link
                key={cat}
                href={cat === "全部" ? "/" : `/?category=${encodeURIComponent(cat)}`}
                className={`whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? "text-[#ee4d2d] font-semibold"
                    : "text-gray-600 hover:text-[#ee4d2d]"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
