interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  id,
}: SectionHeadingProps) {
  return (
    <div className="mb-[var(--gap-section-content)]">
      <h2
        id={id}
        className="font-display text-[clamp(1.75rem,3vw,2.5rem)] font-bold text-text-primary tracking-tight leading-[1.2]"
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-[var(--gap-heading-subtitle)] text-text-secondary text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
