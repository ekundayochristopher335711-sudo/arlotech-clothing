"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATES, TAX_RATE } from "@/lib/utils";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const { format } = useCurrencyStore();
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = getSubtotal();
  const shippingCost = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_RATES.standard;
  const tax = subtotal * TAX_RATE;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + shippingCost + tax - discount;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="#D1CAC0" strokeWidth="1.2" className="mx-auto mb-6">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <h1 className="text-3xl font-light mb-3" style={{ fontFamily: "var(--font-display)" }}>Your Bag is Empty</h1>
        <p className="text-muted text-sm mb-8">Looks like you haven&apos;t added any items yet.</p>
        <Link href="/shop" className="btn-primary inline-block">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-3xl font-light" style={{ fontFamily: "var(--font-display)" }}>Shopping Bag</h1>
        <Link href="/shop" className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Continue Shopping
        </Link>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 lg:gap-16">
        <div className="lg:col-span-2">
          <div className="hidden sm:grid grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 pb-4 border-b border-border text-[11px] tracking-widest uppercase text-muted font-semibold">
            <span>Product</span><span className="text-center">Price</span><span className="text-center">Quantity</span><span className="text-right">Total</span><span className="w-8" />
          </div>

          <div className="divide-y divide-border">
            {items.map((item) => {
              const price = item.variant?.price ? Number(item.variant.price) : Number(item.product.price);
              const image = item.product.images?.[0];
              return (
                <div key={item.id} className="grid grid-cols-[auto,1fr] sm:grid-cols-[2fr,1fr,1fr,1fr,auto] gap-4 py-6 items-center">
                  <div className="flex gap-4 col-span-2 sm:col-span-1">
                    <Link href={`/product/${item.product.slug}`} className="relative w-20 h-24 bg-surface flex-shrink-0 overflow-hidden rounded-lg">
                      {image ? <Image src={image.url} alt={item.product.name} fill className="object-cover" sizes="80px" /> : <div className="w-full h-full bg-surface-dark" />}
                    </Link>
                    <div>
                      <Link href={`/product/${item.product.slug}`} className="text-sm font-medium hover:text-accent transition-colors">{item.product.name}</Link>
                      {(item.variant?.size || item.variant?.color) && <p className="text-xs text-muted mt-1">{[item.variant?.size, item.variant?.color].filter(Boolean).join(" / ")}</p>}
                    </div>
                  </div>
                  <div className="text-center text-sm hidden sm:block">{format(price)}</div>
                  <div className="flex items-center justify-center">
                    <div className="flex items-center border border-border rounded-md overflow-hidden">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-surface transition-colors cursor-pointer text-sm">−</button>
                      <span className="w-8 h-8 flex items-center justify-center text-xs font-medium border-x border-border">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-surface transition-colors cursor-pointer text-sm">+</button>
                    </div>
                  </div>
                  <div className="text-right text-sm font-medium">{format(price * item.quantity)}</div>
                  <button onClick={() => removeItem(item.id)} className="w-8 h-8 flex items-center justify-center text-muted hover:text-danger transition-colors cursor-pointer">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass-card rounded-xl p-8">
            <h2 className="text-[11px] tracking-widest uppercase font-semibold mb-6">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{format(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Shipping</span><span>{shippingCost === 0 ? "Free" : format(shippingCost)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Tax</span><span>{format(tax)}</span></div>
              {discount > 0 && <div className="flex justify-between text-success"><span>Discount (10%)</span><span>-{format(discount)}</span></div>}
            </div>
            <div className="border-t border-border mt-4 pt-4 flex justify-between text-base font-semibold">
              <span>Total</span><span>{format(total)}</span>
            </div>

            <div className="mt-6 flex gap-2">
              <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Discount code" className="input-field flex-1 text-sm" />
              <button onClick={() => { if (couponCode.toUpperCase() === "ARLOTECH10") setCouponApplied(true); }} className="px-4 py-3 bg-foreground text-white text-[11px] tracking-wider uppercase font-semibold rounded-lg hover:bg-primary-hover transition-colors cursor-pointer">Apply</button>
            </div>
            {couponApplied && <p className="text-xs text-success mt-2">Code ARLOTECH10 applied — 10% off!</p>}

            <Link href="/checkout" className="btn-accent w-full text-center block mt-6">Proceed to Checkout</Link>
            <p className="text-[11px] text-muted text-center mt-3">Shipping and taxes calculated at checkout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
