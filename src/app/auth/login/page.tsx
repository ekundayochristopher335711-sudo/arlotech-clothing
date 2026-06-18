"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Welcome back!");
      window.location.href = "/account";
    }, 800);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>Welcome Back</h1>
          <p className="text-sm text-muted">Sign in to access your account, track orders, and more.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" placeholder="your@email.com" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-[11px] tracking-widest uppercase font-semibold">Password</label>
              <Link href="/auth/forgot-password" className="text-[11px] text-muted hover:text-accent transition-colors">Forgot?</Link>
            </div>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required className="input-field pr-12" placeholder="Enter your password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors cursor-pointer">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  {showPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><path d="M1 1l22 22" strokeLinecap="round"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                </svg>
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 cursor-pointer">
            {loading ? "Signing in..." : "Sign In"}
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">Don&apos;t have an account? <Link href="/auth/register" className="text-foreground font-medium hover:text-accent transition-colors">Create Account</Link></p>
        </div>

        <div className="mt-8 p-4 glass-card rounded-lg">
          <p className="text-[11px] tracking-widest uppercase text-muted font-semibold mb-2">Demo Credentials</p>
          <p className="text-xs text-muted">Admin: admin@arlotech.com / admin123<br/>Customer: customer@arlotech.com / customer123</p>
        </div>
      </div>
    </div>
  );
}
