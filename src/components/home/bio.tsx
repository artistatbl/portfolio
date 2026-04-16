import type { ContactLink, CurrentProject } from "@/lib/content";

interface BioSectionProps {
  paragraphs: string[];
  currentProject: CurrentProject;
  links: ContactLink[];
}

export function BioSection({
  paragraphs,
  currentProject,
  links,
}: BioSectionProps) {
  const copyClassName =
    "max-w-[34ch] text-[1rem] font-medium leading-[1.75] tracking-[-0.02em] text-[var(--intro)] sm:text-[1.08rem]";
  const dottedLinkClassName =
    "font-medium !text-blue-500 underline decoration-dotted decoration-[1.5px] underline-offset-[0.18em] decoration-[var(--border)] transition-colors hover:!text-muted-foreground hover:decoration-[var(--muted-foreground)]";

  return (
    <section className="space-y-7">
      {paragraphs.map((paragraph, index) => {
        const isLastParagraph = index === paragraphs.length - 1;

        return (
          <p key={paragraph} className={copyClassName}>
            <span>{paragraph}</span>
            {isLastParagraph ? (
              <>
                <span> </span>
                <span>{currentProject.prefix}</span>
                <a
                  href={currentProject.href}
                  target={currentProject.external ? "_blank" : undefined}
                  rel={currentProject.external ? "noreferrer noopener" : undefined}
                  className="font-semibold !text-blue-500 transition-colors hover:!text-muted-foreground"
                >
                  {currentProject.name}
                </a>
                {currentProject.suffix ? (
                  <span>{currentProject.suffix}</span>
                ) : null}
              </>
            ) : null}
          </p>
        );
      })}

      <p className={copyClassName}>
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
                className={dottedLinkClassName}
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
