"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const { format } = useCurrencyStore();
  const subtotal = getSubtotal();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <div className={`fixed inset-0 bg-black/25 z-[70] transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={closeCart} />
      <div className={`fixed top-0 right-0 bottom-0 w-full max-w-[380px] bg-white z-[80] flex flex-col transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 h-14 border-b border-[#eee] shrink-0">
          <h2 className="text-[11px] tracking-[0.2em] uppercase font-medium">Bag ({items.length})</h2>
          <button onClick={closeCart} className="text-[11px] tracking-[0.15em] uppercase text-[#999] hover:text-black cursor-pointer">Close</button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <p className="text-[14px] mb-1">Your bag is empty</p>
              <p className="text-[13px] text-[#999] mb-6">Browse our collection to find something you love.</p>
              <button onClick={closeCart} className="btn-outline text-[10px] cursor-pointer">Continue Shopping</button>
            </div>
          ) : (
            <div className="divide-y divide-[#eee]">
              {items.map((item) => {
                const price = item.variant?.price ? Number(item.variant.price) : Number(item.product.price);
                const img = item.product.images?.[0];
                return (
                  <div key={item.id} className="flex gap-4 p-5">
                    <div className="relative w-[64px] h-[80px] bg-[#f5f5f5] shrink-0 overflow-hidden">
                      {img ? <Image src={img.url} alt={item.product.name} fill className="object-cover" sizes="64px" /> : <div className="w-full h-full bg-[#eee]" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h3 className="text-[13px] leading-snug">{item.product.name}</h3>
                          {(item.variant?.size || item.variant?.color) && (
                            <p className="text-[11px] text-[#999] mt-0.5">{[item.variant?.size, item.variant?.color].filter(Boolean).join(" / ")}</p>
                          )}
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-[#ccc] hover:text-black transition-colors shrink-0 cursor-pointer" aria-label="Remove">
                          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
                        </button>
                      </div>
                      <div className="flex items-end justify-between mt-3">
                        <div className="flex items-center border border-[#eee]">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-[#999] hover:text-black cursor-pointer text-xs">−</button>
                          <span className="w-6 h-7 flex items-center justify-center text-[11px] border-x border-[#eee]">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-[#999] hover:text-black cursor-pointer text-xs">+</button>
                        </div>
                        <p className="text-[13px] font-medium">{format(price * item.quantity)}</p>
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
          <div className="border-t border-[#eee] px-6 py-5 shrink-0 space-y-4">
            <div className="flex justify-between text-[13px]">
              <span className="text-[#999]">Subtotal</span>
              <span className="font-medium">{format(subtotal)}</span>
            </div>
            <p className="text-[11px] text-[#bbb]">Shipping & taxes calculated at checkout.</p>
            <Link href="/checkout" onClick={closeCart} className="btn-primary w-full text-center block">Checkout</Link>
            <Link href="/cart" onClick={closeCart} className="block text-center text-[11px] tracking-[0.15em] uppercase text-[#999] hover:text-black transition-colors">View Bag</Link>
          </div>
        )}
      </div>
    </>
  );
}
