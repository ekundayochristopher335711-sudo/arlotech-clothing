"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { useCurrencyStore } from "@/store/currency";
import { FREE_SHIPPING_THRESHOLD, SHIPPING_RATES, TAX_RATE } from "@/lib/utils";
import toast from "react-hot-toast";

type Step = "information" | "shipping" | "payment";

const shippingMethods = [
  { id: "standard", label: "Standard Shipping", time: "5–7 business days", price: SHIPPING_RATES.standard },
  { id: "express", label: "Express Shipping", time: "2–3 business days", price: SHIPPING_RATES.express },
  { id: "overnight", label: "Overnight Shipping", time: "1 business day", price: SHIPPING_RATES.overnight },
];

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const { format } = useCurrencyStore();
  const [step, setStep] = useState<Step>("information");
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paystack">("paystack");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [info, setInfo] = useState({ email: "", firstName: "", lastName: "", address: "", apartment: "", city: "", state: "", zipCode: "", country: "NG", phone: "" });

  const subtotal = getSubtotal();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : shippingMethods.find((m) => m.id === selectedShipping)?.price || SHIPPING_RATES.standard;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  const updateInfo = (field: string, value: string) => setInfo((p) => ({ ...p, [field]: value }));

  const handlePlaceOrder = () => { setOrderPlaced(true); clearCart(); toast.success("Order placed successfully!"); };

  if (items.length === 0 && !orderPlaced) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-light mb-4" style={{ fontFamily: "var(--font-display)" }}>Your cart is empty</h1>
        <Link href="/shop" className="btn-outline inline-block">Continue Shopping</Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="#15803D" strokeWidth="2"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <h1 className="text-3xl font-light mb-3" style={{ fontFamily: "var(--font-display)" }}>Order Confirmed</h1>
        <p className="text-muted text-sm mb-2">Thank you for your order! We&apos;ve sent a confirmation to your email.</p>
        <p className="text-sm font-medium mb-8">Order #ARL-{Date.now().toString(36).toUpperCase()}</p>
        <div className="flex gap-3 justify-center">
          <Link href="/account/orders" className="btn-outline">Track Order</Link>
          <Link href="/shop" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="text-center mb-10">
        <Link href="/" className="inline-block mb-6">
          <span className="text-2xl tracking-[0.2em] uppercase font-light"><span className="font-semibold">Arlo</span>tech</span>
        </Link>
        <div className="flex items-center justify-center gap-2 text-[11px] tracking-widest uppercase">
          {(["information", "shipping", "payment"] as Step[]).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <button onClick={() => { const order: Step[] = ["information", "shipping", "payment"]; if (order.indexOf(s) <= order.indexOf(step)) setStep(s); }}
                className={`cursor-pointer transition-colors ${step === s ? "text-foreground font-semibold" : "text-muted"}`}>{s}</button>
              {i < 2 && <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="#aaa" strokeWidth="2"><path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr,380px] gap-10 lg:gap-16">
        <div>
          {step === "information" && (
            <div>
              <h2 className="text-[11px] tracking-widest uppercase font-semibold mb-6">Contact & Shipping Address</h2>
              <div className="space-y-4">
                <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Email</label><input type="email" value={info.email} onChange={(e) => updateInfo("email", e.target.value)} className="input-field" placeholder="your@email.com" /></div>
                <div className="grid grid-cols-2 gap-4">
                  <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">First Name</label><input type="text" value={info.firstName} onChange={(e) => updateInfo("firstName", e.target.value)} className="input-field" /></div>
                  <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Last Name</label><input type="text" value={info.lastName} onChange={(e) => updateInfo("lastName", e.target.value)} className="input-field" /></div>
                </div>
                <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Address</label><input type="text" value={info.address} onChange={(e) => updateInfo("address", e.target.value)} className="input-field" /></div>
                <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Apartment (optional)</label><input type="text" value={info.apartment} onChange={(e) => updateInfo("apartment", e.target.value)} className="input-field" /></div>
                <div className="grid grid-cols-3 gap-4">
                  <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">City</label><input type="text" value={info.city} onChange={(e) => updateInfo("city", e.target.value)} className="input-field" /></div>
                  <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">State</label><input type="text" value={info.state} onChange={(e) => updateInfo("state", e.target.value)} className="input-field" /></div>
                  <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">ZIP Code</label><input type="text" value={info.zipCode} onChange={(e) => updateInfo("zipCode", e.target.value)} className="input-field" /></div>
                </div>
                <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Phone (optional)</label><input type="tel" value={info.phone} onChange={(e) => updateInfo("phone", e.target.value)} className="input-field" placeholder="+234 800 000 0000" /></div>
              </div>
              <button onClick={() => setStep("shipping")} className="btn-primary w-full mt-8 cursor-pointer">Continue to Shipping</button>
            </div>
          )}

          {step === "shipping" && (
            <div>
              <h2 className="text-[11px] tracking-widest uppercase font-semibold mb-6">Shipping Method</h2>
              <div className="space-y-3">
                {shippingMethods.map((m) => (
                  <label key={m.id} className={`flex items-center justify-between p-5 border rounded-lg cursor-pointer transition-colors ${selectedShipping === m.id ? "border-foreground bg-surface" : "border-border hover:border-muted"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedShipping === m.id ? "border-foreground" : "border-border"}`}>
                        {selectedShipping === m.id && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
                      </div>
                      <div><p className="text-sm font-medium">{m.label}</p><p className="text-xs text-muted">{m.time}</p></div>
                    </div>
                    <span className="text-sm font-medium">{subtotal >= FREE_SHIPPING_THRESHOLD && m.id === "standard" ? "Free" : format(m.price)}</span>
                    <input type="radio" name="shipping" checked={selectedShipping === m.id} onChange={() => setSelectedShipping(m.id)} className="hidden" />
                  </label>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => setStep("information")} className="btn-outline flex-1 cursor-pointer">Back</button>
                <button onClick={() => setStep("payment")} className="btn-primary flex-1 cursor-pointer">Continue to Payment</button>
              </div>
            </div>
          )}

          {step === "payment" && (
            <div>
              <h2 className="text-[11px] tracking-widest uppercase font-semibold mb-6">Payment Method</h2>
              <div className="space-y-3 mb-8">
                {[
                  { id: "paystack" as const, name: "Paystack", desc: "Pay with card or bank transfer (Nigeria & Africa)" },
                  { id: "stripe" as const, name: "Credit / Debit Card", desc: "Visa, Mastercard, Amex via Stripe" },
                ].map((p) => (
                  <label key={p.id} className={`flex items-center justify-between p-5 border rounded-lg cursor-pointer transition-colors ${paymentMethod === p.id ? "border-foreground bg-surface" : "border-border hover:border-muted"}`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === p.id ? "border-foreground" : "border-border"}`}>
                        {paymentMethod === p.id && <div className="w-2.5 h-2.5 rounded-full bg-foreground" />}
                      </div>
                      <div><p className="text-sm font-medium">{p.name}</p><p className="text-xs text-muted">{p.desc}</p></div>
                    </div>
                    <input type="radio" name="payment" checked={paymentMethod === p.id} onChange={() => setPaymentMethod(p.id)} className="hidden" />
                  </label>
                ))}
              </div>

              {paymentMethod === "stripe" && (
                <div className="space-y-4 p-6 glass-card rounded-lg mb-8">
                  <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Card Number</label><input type="text" className="input-field" placeholder="4242 4242 4242 4242" /></div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Expiry</label><input type="text" className="input-field" placeholder="MM / YY" /></div>
                    <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">CVC</label><input type="text" className="input-field" placeholder="123" /></div>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button onClick={() => setStep("shipping")} className="btn-outline flex-1 cursor-pointer">Back</button>
                <button onClick={handlePlaceOrder} className="btn-accent flex-1 cursor-pointer">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Place Order — {format(total)}
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 mt-6 text-xs text-muted">
                <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Secured with 256-bit SSL encryption
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="glass-card rounded-xl p-6">
            <h3 className="text-[11px] tracking-widest uppercase font-semibold mb-5">Order Summary</h3>
            <div className="space-y-4 mb-6">
              {items.map((item) => {
                const price = item.variant?.price ? Number(item.variant.price) : Number(item.product.price);
                const image = item.product.images?.[0];
                return (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative w-14 h-16 bg-surface shrink-0 overflow-hidden rounded-md border border-border">
                      {image && <Image src={image.url} alt={item.product.name} fill className="object-cover" sizes="56px" />}
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-white text-[9px] flex items-center justify-center rounded-full">{item.quantity}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted">{[item.variant?.size, item.variant?.color].filter(Boolean).join(" / ")}</p>
                    </div>
                    <p className="text-sm font-medium">{format(price * item.quantity)}</p>
                  </div>
                );
              })}
            </div>
            <div className="border-t border-border pt-4 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted">Subtotal</span><span>{format(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Shipping</span><span>{shipping === 0 ? "Free" : format(shipping)}</span></div>
              <div className="flex justify-between"><span className="text-muted">Tax</span><span>{format(tax)}</span></div>
              <div className="border-t border-border pt-3 flex justify-between text-base font-semibold"><span>Total</span><span>{format(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
