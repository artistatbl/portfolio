import { Anchor } from "@/components/ui/anchor";
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

  return (
    <section className="space-y-7">
      {paragraphs.map((paragraph, index) => {
        const isLastParagraph = index === paragraphs.length - 1;
        const isIntroParagraph = index === 0;

        return (
          <p key={paragraph} className={copyClassName}>
            {isIntroParagraph ? (
              <>
                <span>I'm </span>
                <a
                  href="/"
                  className="group inline-flex cursor-pointer font-semibold !text-foreground transition-colors"
                >
                  <span className="transition-colors group-hover:text-muted-foreground">
                    J
                  </span>
                  <span>ean</span>
                  <span>&nbsp;</span>
                  <span className="transition-colors group-hover:text-muted-foreground">
                    D
                  </span>
                  <span>aly</span>
                </a>
                <span>
                  {", a software developer who likes building products that feel simple, clear, and fast to use."}
                </span>
              </>
            ) : (
              <span>{paragraph}</span>
            )}
            {isLastParagraph ? (
              <>
                <span> </span>
                <span>{currentProject.prefix}</span>
                <Anchor
                  href={currentProject.href}
                  target={currentProject.external ? "_blank" : undefined}
                  rel={currentProject.external ? "noreferrer noopener" : undefined}
                  variant="plain"
                >
                  {currentProject.name}
                </Anchor>
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
              <Anchor
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noreferrer noopener" : undefined}
                variant="dotted"
              >
                {link.label}
              </Anchor>
              <span>{separator}</span>
            </span>
          );
        })}
      </p>
    </section>
  );
}
