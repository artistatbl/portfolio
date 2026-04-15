interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="home-label mb-4 text-[0.66rem] font-medium uppercase tracking-[0.05em]">
      {children}
    </h2>
  );
}
