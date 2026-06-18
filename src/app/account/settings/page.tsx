"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function SettingsPage() {
  const [profile, setProfile] = useState({ firstName: "Adaeze", lastName: "Okonkwo", email: "adaeze@example.com", phone: "+234 801 234 5678" });
  const [passwords, setPasswords] = useState({ current: "", newPassword: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => { e.preventDefault(); toast.success("Profile updated successfully"); };
  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirm) { toast.error("Passwords do not match"); return; }
    toast.success("Password updated successfully");
    setPasswords({ current: "", newPassword: "", confirm: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <h1 className="text-3xl font-light mb-10" style={{ fontFamily: "var(--font-display)" }}>Account Settings</h1>
      <div className="max-w-2xl space-y-10">
        <form onSubmit={handleProfileSave} className="glass-card rounded-xl p-6">
          <h2 className="text-[11px] tracking-widest uppercase font-semibold mb-6">Personal Information</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">First Name</label><input type="text" value={profile.firstName} onChange={(e) => setProfile({ ...profile, firstName: e.target.value })} className="input-field" /></div>
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Last Name</label><input type="text" value={profile.lastName} onChange={(e) => setProfile({ ...profile, lastName: e.target.value })} className="input-field" /></div>
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Email</label><input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} className="input-field" /></div>
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Phone</label><input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="input-field" /></div>
          </div>
          <button type="submit" className="btn-primary mt-6 text-xs cursor-pointer">Save Changes</button>
        </form>

        <form onSubmit={handlePasswordChange} className="glass-card rounded-xl p-6">
          <h2 className="text-[11px] tracking-widest uppercase font-semibold mb-6">Change Password</h2>
          <div className="space-y-4">
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Current Password</label><input type={showPassword ? "text" : "password"} value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="input-field" required /></div>
            <div>
              <label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">New Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="input-field pr-12" required minLength={8} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted cursor-pointer">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">{showPassword ? <><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/><path d="M1 1l22 22" strokeLinecap="round"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}</svg>
                </button>
              </div>
            </div>
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Confirm New Password</label><input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="input-field" required /></div>
          </div>
          <button type="submit" className="btn-primary mt-6 text-xs cursor-pointer">Update Password</button>
        </form>
      </div>
    </div>
  );
}
