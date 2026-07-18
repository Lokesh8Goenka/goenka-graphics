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
    <section className="border-b border-line bg-paper-dim">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:py-20">
        {eyebrow && (
          <p className="stamp-in text-sm font-medium uppercase tracking-widest text-flame">
            {eyebrow}
          </p>
        )}
        <h1 className="ink-wipe mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && (
          <p className="rise mt-4 max-w-2xl text-lg text-ink-soft" style={{ animationDelay: "0.15s" }}>
            {subtitle}
          </p>
        )}
        <hr className="brand-rule mt-6 w-16" />
      </div>
    </section>
  );
}
