"use client";

import { useState, useRef, useEffect } from "react";
import { useCurrencyStore } from "@/store/currency";
import { CURRENCIES } from "@/types";

export default function TopBar() {
  const { current, setCurrency } = useCurrencyStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="bg-[#1A1714] text-white text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-9 flex items-center justify-between">
        <span className="hidden sm:block text-white/40">Made in Lagos &middot; Ships worldwide</span>
        <span className="text-white/60 mx-auto sm:mx-0">Fashion Without Limits</span>
        <div ref={ref} className="relative hidden sm:block">
          <button
            onClick={() => setOpen(!open)}
            className="text-white/40 hover:text-white/80 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {current.symbol} {current.code}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
              <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 top-full mt-1 bg-white text-foreground shadow-lg border border-border z-50 min-w-[150px] py-1">
              {CURRENCIES.map((c) => (
                <button key={c.code} onClick={() => { setCurrency(c.code); setOpen(false); }}
                  className={`block w-full text-left px-4 py-2 text-[11px] tracking-wider hover:bg-surface transition-colors cursor-pointer ${current.code === c.code ? "text-accent font-semibold" : "text-muted-foreground"}`}
                >
                  {c.symbol} {c.code}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
