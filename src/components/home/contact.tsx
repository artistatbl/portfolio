import type { ContactLink } from "@/lib/content";

interface ContactSectionProps {
  links: ContactLink[];
}

export function ContactSection({ links }: ContactSectionProps) {
  return (
    <section className="text-[0.9rem] leading-7 text-[#7a746d]">
      <span>Reach me on </span>
      {links.map((link, index) => {
        const isLast = index === links.length - 1;
        const needsOr = index === links.length - 2 && links.length > 1;
        const separator = isLast ? "." : needsOr ? " or " : ", ";

        return (
          <span key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              className="border-b border-[#b6aea5] font-medium text-[#171513] transition-colors hover:border-[#171513]"
            >
              {link.label}
            </a>
            <span>{separator}</span>
          </span>
        );
      })}
    </section>
  );
}
