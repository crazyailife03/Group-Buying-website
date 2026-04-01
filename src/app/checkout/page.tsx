"use client";

import { useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cartStore } from "@/lib/cart-store";
import { shippingMethodLabels, paymentMethodLabels, shippingCosts, ShippingMethod, PaymentMethod } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useSyncExternalStore(cartStore.subscribe, cartStore.getSnapshot, cartStore.getSnapshot);

  const [shipping, setShipping] = useState<ShippingMethod>("standard");
  const [payment, setPayment] = useState<PaymentMethod>("credit-card");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [note, setNote] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvc, setCardCvc] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = cartStore.getTotal();
  const shippingCost = shippingCosts[shipping];
  const total = subtotal + shippingCost;

  if (cart.length === 0 && !showSuccess) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1" className="mx-auto mb-4">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
        <h1 className="text-xl font-bold text-gray-600 mb-2">購物車是空的</h1>
        <p className="text-gray-400 mb-4">快去逛逛團購好物吧！</p>
        <Link href="/">
          <Button className="bg-[#ee4d2d] hover:bg-[#d73211] text-white">回到首頁</Button>
        </Link>
      </div>
    );
  }

  const handleSubmit = () => {
    if (!name.trim() || !phone.trim() || !address.trim()) {
      toast.error("請填寫完整的收件資訊");
      return;
    }
    if (payment === "credit-card" && (!cardNumber || !cardExpiry || !cardCvc)) {
      toast.error("請填寫完整的信用卡資訊");
      return;
    }

    const ordNum = `GB${Date.now().toString(36).toUpperCase()}`;
    setOrderNumber(ordNum);
    setShowSuccess(true);
    cartStore.clear();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#ee4d2d]">首頁</Link>
        <span>/</span>
        <span className="text-gray-800">結帳</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">結帳</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping info */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ee4d2d" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              收件資訊
            </h2>
            <div className="grid gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">收件人姓名 *</Label>
                  <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="王小明" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="phone">聯絡電話 *</Label>
                  <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0912-345-678" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="address">收件地址 *</Label>
                <Input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="台北市信義區信義路五段7號" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="note">備註</Label>
                <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} placeholder="如有特殊需求請在此說明..." className="mt-1" rows={2} />
              </div>
            </div>
          </div>

          {/* Shipping method */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ee4d2d" strokeWidth="2">
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16,8 20,8 23,11 23,16 16,16" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              配送方式
            </h2>
            <RadioGroup value={shipping} onValueChange={(v) => setShipping(v as ShippingMethod)}>
              {(Object.entries(shippingMethodLabels) as [ShippingMethod, string][]).map(([key, label]) => (
                <div
                  key={key}
                  className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    shipping === key ? "border-[#ee4d2d] bg-[#fff0ed]" : "border-gray-200"
                  }`}
                  onClick={() => setShipping(key)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={key} id={key} />
                    <Label htmlFor={key} className="cursor-pointer">{label}</Label>
                  </div>
                  <span className="text-[#ee4d2d] font-medium">${shippingCosts[key]}</span>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Payment method */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ee4d2d" strokeWidth="2">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              付款方式
            </h2>
            <RadioGroup value={payment} onValueChange={(v) => setPayment(v as PaymentMethod)}>
              {(Object.entries(paymentMethodLabels) as [PaymentMethod, string][]).map(([key, label]) => (
                <div
                  key={key}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                    payment === key ? "border-[#ee4d2d] bg-[#fff0ed]" : "border-gray-200"
                  }`}
                  onClick={() => setPayment(key)}
                >
                  <div className="flex items-center gap-3">
                    <RadioGroupItem value={key} id={`pay-${key}`} />
                    <Label htmlFor={`pay-${key}`} className="cursor-pointer">{label}</Label>
                  </div>
                </div>
              ))}
            </RadioGroup>

            {/* Credit card form */}
            {payment === "credit-card" && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-3">
                <div>
                  <Label htmlFor="cardNumber">卡號</Label>
                  <Input
                    id="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4242 4242 4242 4242"
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="cardExpiry">到期日</Label>
                    <Input
                      id="cardExpiry"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cardCvc">安全碼</Label>
                    <Input
                      id="cardCvc"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="mt-1"
                    />
                  </div>
                </div>
              </div>
            )}

            {payment === "cod" && (
              <div className="mt-4 p-4 bg-amber-50 rounded-lg text-sm text-amber-800">
                貨到付款將於收貨時由配送人員收取現金，請備妥足夠零錢。
              </div>
            )}

            {payment === "bank-transfer" && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800">
                下單後系統將提供匯款帳號，請於24小時內完成轉帳。
              </div>
            )}
          </div>
        </div>

        {/* Right: Order summary */}
        <div>
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-36">
            <h2 className="font-bold text-gray-800 mb-4">訂單摘要</h2>

            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={`${item.product.id}-${item.combo.id}`} className="flex gap-3">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.product.name}</p>
                    <p className="text-xs text-gray-500">{item.combo.name} x {item.quantity}</p>
                    <p className="text-sm text-[#ee4d2d] font-bold">
                      ${(item.combo.pricePerItem * item.combo.quantity * item.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">商品小計</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">運費</span>
                <span>${shippingCost}</span>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between text-lg font-bold">
              <span>合計</span>
              <span className="text-[#ee4d2d]">${total.toLocaleString()}</span>
            </div>

            <Button
              className="w-full mt-4 h-12 bg-[#ee4d2d] hover:bg-[#d73211] text-white text-lg"
              onClick={handleSubmit}
            >
              確認下單
            </Button>

            <p className="text-xs text-gray-400 text-center mt-3">
              點擊「確認下單」即表示您同意我們的服務條款
            </p>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3">
                  <polyline points="20,6 9,17 4,12" />
                </svg>
              </div>
              訂單成立！
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-3">
            <p className="text-gray-600">感謝您的購買！您的訂單已成功建立。</p>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">訂單編號</p>
              <p className="text-lg font-bold text-[#ee4d2d]">{orderNumber}</p>
            </div>

            {/* Order tracking steps */}
            <div className="text-left p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-bold text-gray-700 mb-3">出貨進度追蹤</p>
              {[
                { label: "訂單成立", done: true },
                { label: "等待團購達標", done: false },
                { label: "賣家備貨中", done: false },
                { label: "已出貨", done: false },
                { label: "已送達", done: false },
              ].map((step, i) => (
                <div key={i} className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                      step.done ? "bg-green-500 text-white" : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {step.done ? "V" : i + 1}
                  </div>
                  <span className={`text-sm ${step.done ? "text-green-600 font-medium" : "text-gray-400"}`}>
                    {step.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-2">
              <Link href="/orders" className="flex-1">
                <Button variant="outline" className="w-full">查看訂單</Button>
              </Link>
              <Link href="/" className="flex-1">
                <Button className="w-full bg-[#ee4d2d] hover:bg-[#d73211] text-white">
                  繼續逛逛
                </Button>
              </Link>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
