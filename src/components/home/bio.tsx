import { Anchor } from "@/components/ui/anchor";
import type { CurrentProject } from "@/lib/content";

interface BioSectionProps {
  paragraphs: string[];
  currentProject: CurrentProject;
}

export function BioSection({ paragraphs, currentProject }: BioSectionProps) {
  const copyClassName =
    "max-w-[34ch] text-[1rem] font-normal leading-[1.75] tracking-[-0.02em] text-[var(--intro)] sm:text-[1.08rem]";

  return (
    <section className="space-y-7">
      {paragraphs.map((paragraph, index) => {
        const isLastParagraph = index === paragraphs.length - 1;
        const isIntroParagraph = index === 0;
        const introPrefix = "I'm Jean Daly";
        const hasIntroPrefix = isIntroParagraph && paragraph.startsWith(introPrefix);
        const introRemainder = hasIntroPrefix
          ? paragraph.slice(introPrefix.length)
          : paragraph;

        return (
          <p key={paragraph} className={copyClassName}>
            {hasIntroPrefix ? (
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
                <span>{introRemainder}</span>
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
                  variant="dotted"
                  className="font-semibold !text-foreground"
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
    </section>
  );
}
