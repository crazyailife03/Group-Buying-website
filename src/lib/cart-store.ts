"use client";

import { GroupBuyProduct, ProductCombo, ShippingMethod, PaymentMethod } from "./data";

export interface CartItem {
  product: GroupBuyProduct;
  combo: ProductCombo;
  quantity: number;
}

export interface OrderInfo {
  items: CartItem[];
  shipping: ShippingMethod;
  payment: PaymentMethod;
  name: string;
  phone: string;
  address: string;
  note: string;
  total: number;
}

type Listener = () => void;

let cartItems: CartItem[] = [];
let listeners: Listener[] = [];

function emit() {
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(listener: Listener) {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  getSnapshot(): CartItem[] {
    return cartItems;
  },

  addItem(product: GroupBuyProduct, combo: ProductCombo, quantity: number) {
    const existing = cartItems.find(
      (item) => item.product.id === product.id && item.combo.id === combo.id
    );
    if (existing) {
      cartItems = cartItems.map((item) =>
        item.product.id === product.id && item.combo.id === combo.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      cartItems = [...cartItems, { product, combo, quantity }];
    }
    emit();
  },

  removeItem(productId: string, comboId: string) {
    cartItems = cartItems.filter(
      (item) => !(item.product.id === productId && item.combo.id === comboId)
    );
    emit();
  },

  updateQuantity(productId: string, comboId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(productId, comboId);
      return;
    }
    cartItems = cartItems.map((item) =>
      item.product.id === productId && item.combo.id === comboId
        ? { ...item, quantity }
        : item
    );
    emit();
  },

  clear() {
    cartItems = [];
    emit();
  },

  getTotal(): number {
    return cartItems.reduce(
      (sum, item) => sum + item.combo.pricePerItem * item.quantity * item.combo.quantity,
      0
    );
  },

  getCount(): number {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  },
};
