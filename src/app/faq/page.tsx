export default function FAQPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center">
        <p className="text-sm tracking-[0.3em] text-accent uppercase mb-3">FAQ</p>
        <h1 className="text-4xl sm:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Questions answered clearly.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-light">
          Browse common questions about shipping, returns, sizing, and order management.
        </p>
      </div>

      <div className="mt-16 grid gap-6">
        {[
          { question: "How long does shipping take?", answer: "Standard shipping arrives in 7-12 business days." },
          { question: "Can I return an order?", answer: "Yes, returns are free within 30 days on eligible items." },
          { question: "Do you ship internationally?", answer: "Yes, we ship worldwide from Lagos." },
        ].map((item) => (
          <article key={item.question} className="glass-card rounded-3xl p-8">
            <h2 className="text-xl font-semibold mb-3">{item.question}</h2>
            <p className="text-sm text-muted-light leading-7">{item.answer}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
