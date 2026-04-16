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
  return (
    <section className="space-y-7">
      {paragraphs.map((paragraph, index) => {
        const isLastParagraph = index === paragraphs.length - 1;

        return (
          <p key={paragraph} className="home-copy">
            <span>{paragraph}</span>
            {isLastParagraph ? (
              <>
                <span> </span>
                <span>{currentProject.prefix}</span>
                <a
                  href={currentProject.href}
                  target={currentProject.external ? "_blank" : undefined}
                  rel={currentProject.external ? "noreferrer noopener" : undefined}
                  className="font-semibold transition-colors hover:text-muted-foreground"
                  style={{ color: "#3b82f6" }}
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

      <p className="home-copy">
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
                className="home-link transition-colors hover:text-muted-foreground"
                style={{ color: "#3b82f6" }}
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
