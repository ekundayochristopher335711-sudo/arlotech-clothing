"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const { format } = useCurrencyStore();
  const subtotal = getSubtotal();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div className={`fixed inset-0 bg-black/40 z-[70] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={closeCart} />
      <div className={`fixed top-0 right-0 bottom-0 w-full max-w-[400px] z-[80] flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`} style={{ background: "rgba(250, 248, 245, 0.92)", backdropFilter: "blur(24px) saturate(1.8)", WebkitBackdropFilter: "blur(24px) saturate(1.8)" }}>

        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-border flex-shrink-0">
          <h2 className="text-[12px] tracking-widest uppercase font-semibold">Bag ({items.length})</h2>
          <button onClick={closeCart} className="p-1 text-muted hover:text-foreground cursor-pointer" aria-label="Close">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Shipping progress */}
        {items.length > 0 && (
          <div className="px-5 py-2.5 bg-surface border-b border-border text-[12px]">
            {remaining > 0 ? (
              <>
                <span className="text-muted">Add <span className="text-foreground font-medium">{format(remaining)}</span> for free shipping</span>
                <div className="h-[3px] bg-border rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full bg-accent rounded-full transition-all duration-500" style={{ width: `${Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)}%` }} />
                </div>
              </>
            ) : (
              <span className="text-success font-medium">You qualify for free shipping</span>
            )}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="#ddd" strokeWidth="1.2" className="mb-4">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 11-8 0" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="text-sm font-medium mb-1">Your bag is empty</p>
              <p className="text-[12px] text-muted mb-5">Browse our collection to find something you love.</p>
              <button onClick={closeCart} className="btn-outline text-[11px] cursor-pointer">Continue Shopping</button>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {items.map((item) => {
                const price = item.variant?.price ? Number(item.variant.price) : Number(item.product.price);
                const img = item.product.images?.[0];
                return (
                  <div key={item.id} className="flex gap-3 p-5">
                    <div className="relative w-[68px] h-[85px] bg-surface flex-shrink-0 overflow-hidden">
                      {img ? <Image src={img.url} alt={item.product.name} fill className="object-cover" sizes="68px" /> : <div className="w-full h-full bg-surface-dark" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h3 className="text-[13px] font-medium leading-snug">{item.product.name}</h3>
                          {(item.variant?.size || item.variant?.color) && (
                            <p className="text-[11px] text-muted mt-0.5">{[item.variant?.size, item.variant?.color].filter(Boolean).join(" / ")}</p>
                          )}
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-muted hover:text-danger transition-colors flex-shrink-0 cursor-pointer" aria-label="Remove">
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
                        </button>
                      </div>
                      <div className="flex items-end justify-between mt-2.5">
                        <div className="flex items-center border border-border">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-muted hover:text-foreground cursor-pointer text-sm">−</button>
                          <span className="w-7 h-7 flex items-center justify-center text-[12px] font-medium border-x border-border">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-muted hover:text-foreground cursor-pointer text-sm">+</button>
                        </div>
                        <p className="text-[13px] font-semibold">{format(price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4 flex-shrink-0 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted">Subtotal</span>
              <span className="font-semibold">{format(subtotal)}</span>
            </div>
            <p className="text-[11px] text-muted">Shipping & taxes calculated at checkout.</p>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full text-center block">Checkout</Link>
            <Link href="/cart" onClick={closeCart} className="btn-outline w-full text-center block">View Bag</Link>
          </div>
        )}
      </div>
    </>
  );
}
