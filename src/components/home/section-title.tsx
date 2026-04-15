interface SectionTitleProps {
  children: React.ReactNode;
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <h2 className="mb-4 text-[0.66rem] font-medium uppercase tracking-[0.05em] text-[#a0988d]">
      {children}
    </h2>
  );
}
