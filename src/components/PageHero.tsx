export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-paper-dim">
      {/* Soft CMYK wash so inner pages carry the brand colours too. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(38rem 18rem at 12% 0%, rgba(123,70,201,0.14), transparent 60%), radial-gradient(34rem 16rem at 55% 10%, rgba(224,36,94,0.10), transparent 60%), radial-gradient(30rem 16rem at 95% 0%, rgba(245,135,43,0.12), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 sm:py-20">
        {eyebrow && (
          <p className="stamp-in text-sm font-medium uppercase tracking-widest text-flame">
            {eyebrow}
          </p>
        )}
        <h1 className="ink-wipe mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="rise mt-4 max-w-2xl text-lg text-ink-soft" style={{ animationDelay: "0.3s" }}>
            {subtitle}
          </p>
        )}
        <hr className="brand-rule mt-6 w-16" />
      </div>
    </section>
  );
}
