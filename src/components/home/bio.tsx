import { Anchor } from "@/components/ui/anchor";
import { cn } from "@/lib/utils";
import type { CurrentProject } from "@/lib/content";

interface BioSectionProps {
  paragraphs: string[];
  currentProject: CurrentProject;
}

const EMPHASIS_PHRASES = [
  "simple, clear",
  "practical AI",
  "Next.js, AI tools, and Codex",
];

function renderParagraphWithEmphasis(paragraph: string) {
  const parts: Array<{ text: string; emphasized: boolean }> = [];
  let remaining = paragraph;

  while (remaining.length > 0) {
    const nextMatch = EMPHASIS_PHRASES.map((phrase) => ({
      phrase,
      index: remaining.indexOf(phrase),
    }))
      .filter(({ index }) => index >= 0)
      .sort((left, right) => left.index - right.index)[0];

    if (!nextMatch) {
      parts.push({ text: remaining, emphasized: false });
      break;
    }

    if (nextMatch.index > 0) {
      parts.push({
        text: remaining.slice(0, nextMatch.index),
        emphasized: false,
      });
    }

    parts.push({ text: nextMatch.phrase, emphasized: true });
    remaining = remaining.slice(nextMatch.index + nextMatch.phrase.length);
  }

  return parts.map((part, index) =>
    part.emphasized ? (
      <span
        key={`${part.text}-${index}`}
        className={cn(
          "select-none font-semibold text-foreground transition-colors duration-200 hover:text-[var(--icon-dot)]"
        )}
      >
        {part.text}
      </span>
    ) : (
      <span key={`${part.text}-${index}`}>{part.text}</span>
    )
  );
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
                <span>{renderParagraphWithEmphasis(introRemainder)}</span>
              </>
            ) : (
              <span>{renderParagraphWithEmphasis(paragraph)}</span>
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
                  className="select-none font-semibold !text-foreground"
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
