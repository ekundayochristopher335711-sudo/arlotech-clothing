"use client";

const features = [
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
        <path d="M5 18h14M5 18l1-6h12l1 6M9 12l1-8h4l1 8" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="8" cy="21" r="1"/><circle cx="16" cy="21" r="1"/>
      </svg>
    ),
    title: "Worldwide Delivery",
    text: "We ship from Lagos to anywhere in the world.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Secure Checkout",
    text: "256-bit encryption. Stripe & Paystack certified.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
        <path d="M3 12a9 9 0 1018 0 9 9 0 10-18 0z"/><path d="M3 12h4l3-9 4 18 3-9h4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "30-Day Returns",
    text: "Free returns within 30 days, no questions asked.",
  },
  {
    icon: (
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.4">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Styling Support",
    text: "Personal styling help available 7 days a week.",
  },
];

export default function BrandFeatures() {
  return (
    <section className="border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((f) => (
            <div key={f.title} className="text-center">
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-full glass-card text-accent mb-3">
                {f.icon}
              </div>
              <h3 className="text-[13px] font-semibold tracking-wide mb-1">{f.title}</h3>
              <p className="text-[12px] text-muted leading-relaxed max-w-[200px] mx-auto">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
