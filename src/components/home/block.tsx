import { SectionTitle } from "@/components/home/title";

interface SectionBlockProps {
  children: React.ReactNode;
  title?: string;
  divider?: boolean;
  className?: string;
}

export function SectionBlock({
  children,
  title,
  divider = false,
  className = "",
}: SectionBlockProps) {
  return (
    <section
      className={`${divider ? "border-t border-[var(--line)] pt-6" : ""} ${className}`.trim()}
    >
      {title ? <SectionTitle>{title}</SectionTitle> : null}
      {children}
    </section>
  );
}
