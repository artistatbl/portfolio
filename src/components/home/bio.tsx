import { Anchor } from "@/components/ui/anchor";
import { cn } from "@/lib/utils";
import type { CurrentProject } from "@/lib/content";

interface BioSectionProps {
  paragraphs: string[];
  currentProject: CurrentProject;
}

const EMPHASIS_ITEMS = [
  { text: "simple, clear" },
  { text: "practical AI" },
  { text: "Next.js", href: "https://nextjs.org" },
  { text: "Codex", href: "https://openai.com/codex/" },
] as const;

function renderParagraphWithEmphasis(paragraph: string) {
  const parts: Array<{ text: string; emphasized: boolean; href?: string }> = [];
  let remaining = paragraph;

  while (remaining.length > 0) {
    const nextMatch = EMPHASIS_ITEMS.map((item) => ({
      ...item,
      index: remaining.indexOf(item.text),
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

    parts.push({
      text: nextMatch.text,
      emphasized: true,
      href: nextMatch.href,
    });
    remaining = remaining.slice(nextMatch.index + nextMatch.text.length);
  }

  return parts.map((part, index) =>
    part.emphasized ? (
      part.href ? (
        <Anchor
          key={`${part.text}-${index}`}
          href={part.href}
          target="_blank"
          rel="noreferrer noopener"
          variant="dotted"
          className="select-none cursor-pointer font-semibold !text-foreground hover:!text-[var(--icon-dot)] hover:opacity-80"
        >
          {part.text}
        </Anchor>
      ) : (
        <span
          key={`${part.text}-${index}`}
          className={cn(
            "select-none font-semibold text-foreground transition-colors duration-200 [background-image:radial-gradient(circle,var(--border)_0.7px,transparent_0.9px)] [background-position:0_calc(100%-1px)] [background-repeat:repeat-x] [background-size:6px_2px] pb-[0.08em] hover:text-[var(--icon-dot)] hover:[background-image:radial-gradient(circle,var(--icon-dot)_0.7px,transparent_0.9px)]"
          )}
        >
          {part.text}
        </span>
      )
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
