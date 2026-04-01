"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products } from "@/lib/data";

const demoOrders = [
  {
    id: "GB1ABC2DEF",
    date: "2026-03-25",
    status: "processing",
    statusLabel: "團購進行中",
    product: products[0],
    combo: products[0].combos[0],
    quantity: 1,
    shipping: "standard" as const,
    shippingCost: 60,
    payment: "credit-card" as const,
    steps: [
      { label: "訂單成立", done: true, time: "03/25 14:32" },
      { label: "團購達標", done: true, time: "03/25 20:15" },
      { label: "賣家備貨中", done: true, time: "03/26 09:00" },
      { label: "已出貨", done: false, time: "" },
      { label: "已送達", done: false, time: "" },
    ],
  },
  {
    id: "GB3GHI4JKL",
    date: "2026-03-22",
    status: "shipped",
    statusLabel: "已出貨",
    product: products[1],
    combo: products[1].combos[1],
    quantity: 1,
    shipping: "express" as const,
    shippingCost: 120,
    payment: "credit-card" as const,
    steps: [
      { label: "訂單成立", done: true, time: "03/22 10:18" },
      { label: "團購達標", done: true, time: "03/22 16:44" },
      { label: "賣家備貨中", done: true, time: "03/23 08:30" },
      { label: "已出貨", done: true, time: "03/24 14:20" },
      { label: "已送達", done: false, time: "" },
    ],
  },
];

export default function OrdersPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-[#ee4d2d]">首頁</Link>
        <span>/</span>
        <span className="text-gray-800">我的訂單</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">我的訂單</h1>

      {demoOrders.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-lg mb-4">還沒有訂單</p>
          <Link href="/">
            <Button className="bg-[#ee4d2d] hover:bg-[#d73211] text-white">去逛逛</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {demoOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm border">
              {/* Order header */}
              <div className="flex items-center justify-between p-4 border-b bg-gray-50 rounded-t-lg">
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-gray-500">訂單編號：<strong className="text-gray-700">{order.id}</strong></span>
                  <span className="text-gray-400">|</span>
                  <span className="text-gray-500">{order.date}</span>
                </div>
                <Badge
                  className={`${
                    order.status === "shipped"
                      ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                      : order.status === "processing"
                      ? "bg-orange-100 text-orange-700 hover:bg-orange-100"
                      : "bg-green-100 text-green-700 hover:bg-green-100"
                  } border-0`}
                >
                  {order.statusLabel}
                </Badge>
              </div>

              {/* Order content */}
              <div className="p-4">
                <div className="flex gap-4 mb-4">
                  <img
                    src={order.product.images[0]}
                    alt={order.product.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{order.product.name}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {order.combo.name} x {order.quantity}
                    </p>
                    <p className="text-[#ee4d2d] font-bold mt-1">
                      ${(order.combo.pricePerItem * order.combo.quantity * order.quantity).toLocaleString()}
                    </p>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Shipping progress */}
                <div>
                  <p className="text-sm font-bold text-gray-700 mb-3">出貨進度</p>
                  <div className="flex items-center gap-1">
                    {order.steps.map((step, i) => (
                      <div key={i} className="flex items-center flex-1">
                        <div className="flex flex-col items-center flex-1">
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              step.done
                                ? "bg-[#ee4d2d] text-white"
                                : "bg-gray-200 text-gray-400"
                            }`}
                          >
                            {step.done ? (
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                                <polyline points="20,6 9,17 4,12" />
                              </svg>
                            ) : (
                              i + 1
                            )}
                          </div>
                          <span className={`text-[10px] mt-1 text-center ${step.done ? "text-[#ee4d2d]" : "text-gray-400"}`}>
                            {step.label}
                          </span>
                          {step.time && (
                            <span className="text-[10px] text-gray-400">{step.time}</span>
                          )}
                        </div>
                        {i < order.steps.length - 1 && (
                          <div className={`h-0.5 flex-1 ${step.done ? "bg-[#ee4d2d]" : "bg-gray-200"} -mt-5`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Order total */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    運費 ${order.shippingCost} | {order.payment === "credit-card" ? "信用卡付款" : order.payment === "cod" ? "貨到付款" : "銀行轉帳"}
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500">訂單總額：</span>
                    <span className="text-xl font-bold text-[#ee4d2d]">
                      ${(order.combo.pricePerItem * order.combo.quantity * order.quantity + order.shippingCost).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
