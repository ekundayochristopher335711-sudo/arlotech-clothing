"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success("Message sent! We'll get back to you soon.");
  };

  return (
    <>
      {/* Header */}
      <section className="py-14 sm:py-20 border-b border-[#1A1A1A] text-center">
        <p className="text-[#F5C518] text-[10px] tracking-[0.5em] uppercase font-bold mb-3">Get in Touch</p>
        <h1 className="text-[clamp(2rem,6vw,3.5rem)] font-black uppercase tracking-tight" style={{ fontFamily: "var(--font-display)" }}>Contact Us</h1>
      </section>

      <section className="py-16 sm:py-24">
        <div className="max-w-[1100px] mx-auto px-6 sm:px-10">
          <div className="grid lg:grid-cols-[1fr,1.2fr] gap-14 lg:gap-20">
            {/* Info */}
            <div>
              <h2 className="text-[18px] font-bold uppercase tracking-wide mb-6" style={{ fontFamily: "var(--font-display)" }}>Reach Out</h2>
              <div className="space-y-6 text-[14px]">
                <div>
                  <p className="text-[#F5C518] text-[10px] tracking-[0.3em] uppercase font-bold mb-1">Email</p>
                  <p className="text-white/50">support@arlotechclothing.com</p>
                </div>
                <div>
                  <p className="text-[#F5C518] text-[10px] tracking-[0.3em] uppercase font-bold mb-1">WhatsApp</p>
                  <p className="text-white/50">+234 816 641 9332</p>
                </div>
                <div>
                  <p className="text-[#F5C518] text-[10px] tracking-[0.3em] uppercase font-bold mb-1">Location</p>
                  <p className="text-white/50">Lagos, Nigeria</p>
                  <p className="text-white/25 text-[13px] mt-1">We ship worldwide from our Lagos HQ.</p>
                </div>
                <div>
                  <p className="text-[#F5C518] text-[10px] tracking-[0.3em] uppercase font-bold mb-2">Follow Us</p>
                  <div className="flex gap-4">
                    <a href="#" className="text-white/30 hover:text-[#F5C518] transition-colors">
                      <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                    </a>
                    <a href="#" className="text-white/30 hover:text-[#F5C518] transition-colors">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="#" className="text-white/30 hover:text-[#F5C518] transition-colors">
                      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div>
              <h2 className="text-[18px] font-bold uppercase tracking-wide mb-6" style={{ fontFamily: "var(--font-display)" }}>Send a Message</h2>
              {sent ? (
                <div className="text-center py-16">
                  <p className="text-[#F5C518] text-[24px] font-bold mb-2" style={{ fontFamily: "var(--font-display)" }}>Thank You!</p>
                  <p className="text-white/30 text-[14px]">We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-white/40 mb-2">Name</label>
                      <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)} required className="input-field" placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-white/40 mb-2">Email</label>
                      <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required className="input-field" placeholder="your@email.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-white/40 mb-2">Subject</label>
                    <input type="text" value={form.subject} onChange={(e) => update("subject", e.target.value)} required className="input-field" placeholder="What's this about?" />
                  </div>
                  <div>
                    <label className="block text-[10px] tracking-[0.2em] uppercase font-bold text-white/40 mb-2">Message</label>
                    <textarea value={form.message} onChange={(e) => update("message", e.target.value)} required rows={5} className="input-field resize-none" placeholder="Tell us more..." />
                  </div>
                  <button type="submit" className="btn-accent w-full cursor-pointer">Send Message</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
