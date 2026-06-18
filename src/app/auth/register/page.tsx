"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const update = (field: string, value: string) => setForm((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) { toast.error("Passwords do not match"); return; }
    if (form.password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    setLoading(true);
    setTimeout(() => {
      toast.success("Account created! Redirecting...");
      window.location.href = "/auth/login";
    }, 800);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>Create Account</h1>
          <p className="text-sm text-muted">Join the Arlotech community for exclusive access and faster checkout.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">First Name</label>
              <input type="text" value={form.firstName} onChange={(e) => update("firstName", e.target.value)} required className="input-field" placeholder="First name" />
            </div>
            <div>
              <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Last Name</label>
              <input type="text" value={form.lastName} onChange={(e) => update("lastName", e.target.value)} required className="input-field" placeholder="Last name" />
            </div>
          </div>

          <div>
            <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Email Address</label>
            <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required className="input-field" placeholder="your@email.com" />
          </div>

          <div>
            <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => update("password", e.target.value)} required className="input-field pr-12" placeholder="Minimum 8 characters" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors cursor-pointer">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
                  {showPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/><path d="M1 1l22 22" strokeLinecap="round"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
                </svg>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Confirm Password</label>
            <input type="password" value={form.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} required className="input-field" placeholder="Confirm your password" />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-50 cursor-pointer">
            {loading ? "Creating Account..." : "Create Account"}
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>

          <p className="text-[11px] text-muted text-center leading-relaxed">
            By creating an account, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted">Already have an account? <Link href="/auth/login" className="text-foreground font-medium hover:text-accent transition-colors">Sign In</Link></p>
        </div>
      </div>
    </div>
  );
}
