"use client";

import { useState } from "react";

const initialAddresses = [
  { id: "1", firstName: "Adaeze", lastName: "Okonkwo", address1: "15 Victoria Island Road", address2: "Apartment 3B", city: "Lagos", state: "Lagos", zipCode: "101001", country: "Nigeria", phone: "+234 801 234 5678", isDefault: true },
  { id: "2", firstName: "Adaeze", lastName: "Okonkwo", address1: "42 Allen Avenue", address2: null, city: "Ikeja", state: "Lagos", zipCode: "100281", country: "Nigeria", phone: "+234 801 234 5678", isDefault: false },
];

export default function AddressesPage() {
  const [addresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-light mb-2" style={{ fontFamily: "var(--font-display)" }}>Saved Addresses</h1>
          <p className="text-sm text-muted">{addresses.length} {addresses.length === 1 ? "address" : "addresses"} saved</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-outline text-xs cursor-pointer">+ Add Address</button>
      </div>

      {showForm && (
        <div className="glass-card rounded-xl p-6 mb-8">
          <h2 className="text-[11px] tracking-widest uppercase font-semibold mb-6">New Address</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">First Name</label><input type="text" className="input-field" /></div>
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Last Name</label><input type="text" className="input-field" /></div>
            <div className="sm:col-span-2"><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Address</label><input type="text" className="input-field" /></div>
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">City</label><input type="text" className="input-field" /></div>
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">State</label><input type="text" className="input-field" /></div>
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">ZIP Code</label><input type="text" className="input-field" /></div>
            <div><label className="block text-[11px] tracking-widest uppercase font-semibold mb-2">Phone</label><input type="tel" className="input-field" /></div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="btn-primary text-xs cursor-pointer">Save Address</button>
            <button onClick={() => setShowForm(false)} className="btn-outline text-xs cursor-pointer">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {addresses.map((a) => (
          <div key={a.id} className={`rounded-xl p-6 relative ${a.isDefault ? "border-2 border-accent bg-accent-soft" : "glass-card"}`}>
            {a.isDefault && <span className="absolute top-4 right-4 flex items-center gap-1 text-[10px] text-accent tracking-wider uppercase font-medium">✓ Default</span>}
            <div className="text-sm mb-4">
              <p className="font-medium">{a.firstName} {a.lastName}</p>
              <p className="text-muted mt-1">{a.address1}{a.address2 && <>, {a.address2}</>}</p>
              <p className="text-muted">{a.city}, {a.state} {a.zipCode}</p>
              <p className="text-muted">{a.country}</p>
              {a.phone && <p className="text-muted mt-1">{a.phone}</p>}
            </div>
            <div className="flex gap-3">
              <button className="text-xs text-muted hover:text-foreground transition-colors cursor-pointer">Edit</button>
              <button className="text-xs text-muted hover:text-danger transition-colors cursor-pointer">Delete</button>
              {!a.isDefault && <button className="text-xs text-muted hover:text-accent transition-colors cursor-pointer">Set as Default</button>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
