import { GitHubIcon, TwitterIcon } from "@/components/icons";
import { SectionBlock } from "@/components/home/block";
import type { ContactLink } from "@/lib/content";
import { Mail, type LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

type IconProps = {
  className?: string;
  size?: number;
};

type MixedIcon = ComponentType<IconProps> | LucideIcon;

const iconMap: Record<NonNullable<ContactLink["iconKey"]>, MixedIcon> = {
  github: GitHubIcon,
  mail: Mail,
  x: TwitterIcon,
};

function ContactIcon({ iconKey }: { iconKey?: ContactLink["iconKey"] }) {
  const IconComponent = iconKey ? iconMap[iconKey] : undefined;
  const size = iconKey === "github" ? 16 : 14;

  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-xs border border-border bg-card text-[var(--icon-foreground)]">
      {IconComponent ? (
        <IconComponent className="opacity-85" size={size} />
      ) : (
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--icon-dot)]" />
      )}
    </span>
  );
}

interface ConnectSectionProps {
  links: ContactLink[];
}

export function ConnectSection({ links }: ConnectSectionProps) {
  return (
    <SectionBlock title="Connect" divider={false}>
      <ul className="space-y-1.5">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer noopener" : undefined}
              className="grid w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-1 rounded-md px-1.5 py-3 text-left transition-colors hover:bg-muted/60"
            >
              <ContactIcon iconKey={link.iconKey} />
              <div className="min-w-0">
                <p className="text-[0.92rem] font-medium leading-[1.55] tracking-[-0.02em] text-foreground sm:text-[0.98rem]">
                  {link.label}
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </SectionBlock>
  );
}
