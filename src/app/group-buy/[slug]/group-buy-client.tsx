"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { type GroupBuyProduct, products, shippingMethodLabels, paymentMethodLabels } from "@/lib/data";
import { cartStore } from "@/lib/cart-store";
import { CountdownTimer } from "@/components/countdown-timer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { ProductCard } from "@/components/product-card";

export function GroupBuyClient({ product }: { product: GroupBuyProduct }) {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCombo, setSelectedCombo] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showShareDialog, setShowShareDialog] = useState(false);

  const progress = Math.round((product.filledSlots / product.totalSlots) * 100);
  const combo = product.combos[selectedCombo];
  const totalPrice = combo.pricePerItem * combo.quantity * quantity;
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/group-buy/${product.slug}`
    : `/group-buy/${product.slug}`;

  const handleAddToCart = () => {
    cartStore.addItem(product, combo, quantity);
    toast.success("已加入購物車", {
      description: `${product.name} - ${combo.name} x ${quantity}`,
    });
  };

  const handleBuyNow = () => {
    cartStore.addItem(product, combo, quantity);
    router.push("/checkout");
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      toast.success("已複製團購連結！");
    });
  };

  const otherProducts = products.filter((p) => p.id !== product.id).slice(0, 5);

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-[#ee4d2d]">首頁</Link>
        <span>/</span>
        <Link href={`/?category=${encodeURIComponent(product.category)}`} className="hover:text-[#ee4d2d]">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-gray-800 truncate max-w-xs">{product.name}</span>
      </div>

      {/* Main product section */}
      <div className="bg-white rounded-lg shadow-sm border p-4 md:p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left: Images */}
          <div>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {/* Group buy badge */}
              <div className="absolute top-3 left-3">
                <Badge className="bg-[#ee4d2d] text-white border-0 text-sm px-3 py-1 hover:bg-[#ee4d2d]">
                  團購優惠
                </Badge>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === i ? "border-[#ee4d2d]" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div>
            {/* Group buy name */}
            <div className="bg-gradient-to-r from-[#fff0ed] to-[#fff8f6] rounded-lg p-3 mb-3">
              <span className="text-[#ee4d2d] font-bold text-lg">{product.groupBuyName}</span>
            </div>

            <h1 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h1>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-3">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[#ee4d2d] border-[#ee4d2d] text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Price section */}
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="flex items-end gap-3">
                <span className="text-3xl font-bold text-[#ee4d2d]">
                  ${combo.pricePerItem.toLocaleString()}
                </span>
                <span className="text-gray-400 text-lg line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
                <Badge className="bg-[#ee4d2d] text-white border-0 hover:bg-[#ee4d2d]">
                  -{combo.discount}% OFF
                </Badge>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex items-center gap-3 mb-4 bg-[#fff0ed] rounded-lg p-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ee4d2d" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12,6 12,12 16,14" />
              </svg>
              <span className="text-sm text-gray-600">團購倒數</span>
              <CountdownTimer endTime={product.endTime} compact />
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">
                  已揪 <strong className="text-[#ee4d2d]">{product.filledSlots}</strong> / {product.totalSlots} 人
                </span>
                <span className="text-[#ee4d2d] font-bold">{progress}%</span>
              </div>
              <Progress value={progress} className="h-3 bg-gray-100 [&>div]:bg-gradient-to-r [&>div]:from-[#ee4d2d] [&>div]:to-[#f7a440]" />
            </div>

            <Separator className="my-4" />

            {/* Combo selection */}
            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700 mb-2">商品組合</h3>
              <div className="grid gap-2">
                {product.combos.map((c, i) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCombo(i)}
                    className={`text-left p-3 rounded-lg border-2 transition-all ${
                      selectedCombo === i
                        ? "border-[#ee4d2d] bg-[#fff0ed]"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium text-sm">{c.name}</span>
                        {c.quantity > 1 && (
                          <span className="text-xs text-gray-500 ml-2">({c.quantity}件)</span>
                        )}
                      </div>
                      <div className="text-right">
                        <span className="text-[#ee4d2d] font-bold">
                          ${(c.pricePerItem * c.quantity).toLocaleString()}
                        </span>
                        <span className="text-xs text-green-600 ml-2">省{c.discount}%</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-bold text-gray-700">數量</span>
              <div className="flex items-center border rounded-lg">
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="w-14 text-center font-medium">{quantity}</span>
                <button
                  className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 text-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">
                小計：<strong className="text-[#ee4d2d] text-lg">${totalPrice.toLocaleString()}</strong>
              </span>
            </div>

            {/* Store info */}
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg mb-4">
              <div className="w-10 h-10 bg-[#ee4d2d] rounded-full flex items-center justify-center text-white font-bold text-sm">
                {product.store.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{product.store.name}</p>
                <p className="text-xs text-gray-500">
                  {product.store.location} | 回覆率 {product.store.responseRate}%
                </p>
              </div>
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01z" />
                </svg>
                <span className="text-sm font-medium">{product.store.rating}</span>
              </div>
            </div>

            {/* Shipping & Payment */}
            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
              <div>
                <span className="text-gray-500">配送方式</span>
                <div className="mt-1 space-y-1">
                  {product.shippingMethods.map((m) => (
                    <div key={m} className="flex items-center gap-1 text-gray-700">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      {shippingMethodLabels[m]}
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-gray-500">付款方式</span>
                <div className="mt-1 space-y-1">
                  {product.paymentMethods.map((m) => (
                    <div key={m} className="flex items-center gap-1 text-gray-700">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2">
                        <polyline points="20,6 9,17 4,12" />
                      </svg>
                      {paymentMethodLabels[m]}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 h-12 border-[#ee4d2d] text-[#ee4d2d] hover:bg-[#fff0ed] hover:text-[#ee4d2d]"
                onClick={handleAddToCart}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
                加入購物車
              </Button>
              <Button
                className="flex-1 h-12 bg-[#ee4d2d] hover:bg-[#d73211] text-white"
                onClick={handleBuyNow}
              >
                立即購買
              </Button>
            </div>

            {/* Share button */}
            <Dialog open={showShareDialog} onOpenChange={setShowShareDialog}>
              <DialogTrigger
                className="w-full mt-3 text-[#ee4d2d] hover:text-[#d73211] hover:bg-[#fff0ed] inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors"
              >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mr-2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  分享團購連結，揪更多人一起買！
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>分享團購連結</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <p className="text-sm text-gray-500">
                    將以下連結分享給親朋好友，他們點擊後會直接進入此團購商品頁面：
                  </p>
                  <div className="flex gap-2">
                    <input
                      readOnly
                      value={shareUrl}
                      className="flex-1 px-3 py-2 bg-gray-50 border rounded-lg text-sm"
                    />
                    <Button onClick={handleCopyLink} className="bg-[#ee4d2d] hover:bg-[#d73211] text-white shrink-0">
                      複製連結
                    </Button>
                  </div>
                  <Separator />
                  <div className="flex justify-center gap-4">
                    <button className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        L
                      </div>
                      <span className="text-xs text-gray-600">LINE</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        f
                      </div>
                      <span className="text-xs text-gray-600">Facebook</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        IG
                      </div>
                      <span className="text-xs text-gray-600">Instagram</span>
                    </button>
                    <button className="flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-gray-50">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center text-white font-bold text-lg">
                        @
                      </div>
                      <span className="text-xs text-gray-600">Email</span>
                    </button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Product detail tabs */}
      <div className="bg-white rounded-lg shadow-sm border mt-4 p-4 md:p-6">
        <Tabs defaultValue="description">
          <TabsList className="mb-4">
            <TabsTrigger value="description">商品詳情</TabsTrigger>
            <TabsTrigger value="specs">規格資訊</TabsTrigger>
            <TabsTrigger value="shipping">出貨流程</TabsTrigger>
          </TabsList>

          <TabsContent value="description">
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {product.images.map((img, i) => (
                  <img key={i} src={img} alt="" className="rounded-lg w-full" />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="specs">
            <div className="grid gap-2">
              {product.specs.map((spec, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-3 gap-4 p-3 rounded ${i % 2 === 0 ? "bg-gray-50" : ""}`}
                >
                  <span className="text-gray-500 text-sm">{spec.label}</span>
                  <span className="col-span-2 text-sm">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="shipping">
            <div className="space-y-6">
              <h3 className="font-bold text-gray-800">出貨流程</h3>
              <div className="relative">
                {[
                  { step: "1", title: "下單成功", desc: "完成付款後系統自動確認訂單" },
                  { step: "2", title: "團購達標", desc: "達到最低成團人數後開始備貨" },
                  { step: "3", title: "賣家出貨", desc: "賣家於3個工作日內完成出貨" },
                  { step: "4", title: "物流配送", desc: "依選擇的配送方式送達" },
                  { step: "5", title: "簽收完成", desc: "確認收貨後交易完成" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 mb-6">
                    <div className="flex flex-col items-center">
                      <div className="w-8 h-8 bg-[#ee4d2d] text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {item.step}
                      </div>
                      {i < 4 && <div className="w-0.5 h-8 bg-[#ee4d2d]/20 mt-1" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div>
                <h3 className="font-bold text-gray-800 mb-3">可選配送方式</h3>
                <div className="grid gap-2">
                  {product.shippingMethods.map((m) => (
                    <div key={m} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="text-sm">{shippingMethodLabels[m]}</span>
                      <span className="text-sm text-[#ee4d2d] font-medium">
                        {m === "standard" ? "$60" : m === "express" ? "$120" : "$45"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related products */}
      <div className="mt-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-6 bg-[#ee4d2d] rounded-full" />
          <h2 className="text-xl font-bold text-gray-800">其他熱門團購</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {otherProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
