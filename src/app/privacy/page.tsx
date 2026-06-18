export default function PrivacyPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
      <div className="text-center">
        <p className="text-sm tracking-[0.3em] text-accent uppercase mb-3">Privacy</p>
        <h1 className="text-4xl sm:text-5xl font-light mb-6" style={{ fontFamily: "var(--font-display)" }}>
          Your privacy is part of our promise.
        </h1>
        <p className="mx-auto max-w-3xl text-base leading-8 text-muted-light">
          We only collect data that helps deliver a better shopping experience, and we never share personal information without consent.
        </p>
      </div>
    </main>
  );
}
