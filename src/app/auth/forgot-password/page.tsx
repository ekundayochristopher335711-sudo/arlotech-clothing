"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="w-full max-w-md">
        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#C45A2D" strokeWidth="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6" strokeLinecap="round"/></svg>
            </div>
            <h1 className="text-3xl font-light mb-3" style={{ fontFamily: "var(--font-display)" }}>Check Your Email</h1>
            <p className="text-sm text-muted mb-8">We&apos;ve sent a password reset link to <strong>{email}</strong>.</p>
            <Link href="/auth/login" className="btn-outline inline-block">Back to Sign In</Link>
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>Reset Password</h1>
              <p className="text-sm text-muted">Enter your email and we&apos;ll send you a link to reset your password.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="space-y-5">
              <div>
                <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="input-field" placeholder="your@email.com" />
              </div>
              <button type="submit" className="btn-primary w-full cursor-pointer">Send Reset Link</button>
            </form>
            <div className="mt-8 text-center">
              <Link href="/auth/login" className="flex items-center justify-center gap-2 text-sm text-muted hover:text-foreground transition-colors">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Back to Sign In
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
