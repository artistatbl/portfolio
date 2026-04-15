import type { ContactLink } from "@/lib/content";

interface BioSectionProps {
  paragraphs: string[];
  links: ContactLink[];
}

export function BioSection({ paragraphs, links }: BioSectionProps) {
  return (
    <section className="space-y-7">
      {paragraphs.map((paragraph) => (
        <p
          key={paragraph}
          className="max-w-[34ch] text-[1rem] font-medium leading-[1.75] tracking-[-0.02em] text-[#67615a] sm:text-[1.08rem]"
        >
          {paragraph}
        </p>
      ))}

      <p className="max-w-[34ch] text-[1rem] font-medium leading-[1.75] tracking-[-0.02em] text-[#67615a] sm:text-[1.08rem]">
        <span>Reach me at </span>
        {links.map((link, index) => {
          const isLast = index === links.length - 1;
          const needsOr = index === links.length - 2 && links.length > 1;
          const separator = isLast ? "." : needsOr ? " or dm on " : ", ";

          return (
            <span key={link.label}>
              <a
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer noopener" : undefined}
                className="border-b border-[#b6aea5] font-medium text-foreground transition-colors hover:border-[#171513]"
              >
                {link.label}
              </a>
              <span>{separator}</span>
            </span>
          );
        })}
      </p>
    </section>
  );
}
