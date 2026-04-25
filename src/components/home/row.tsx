"use client";

import Link from "next/link";
import { useState, type ComponentType } from "react";
import {
  Blocks,
  Code2,
  FolderOpen,
  Rocket,
  type LucideIcon,
} from "lucide-react";

import {
  BetterAuthIcon,
  ClerkIcon,
  ConvexIcon,
  GitHubIcon,
  LinkIcon,
  NextjsIcon,
  ShadcnIcon,
  StripeIcon,
  SupabaseIcon,
  VercelIcon,
} from "@/components/icons";
import {
  HoverSlideItem,
  hoverSlideItemClassName,
} from "@/components/ui/hover-slide";
import type { TimelineItemData } from "@/lib/content";

type IconProps = {
  className?: string;
  size?: number;
};

type MixedIcon = ComponentType<IconProps> | LucideIcon;

const iconMap: Record<string, MixedIcon> = {
  betterauth: BetterAuthIcon,
  blocks: Blocks,
  clerk: ClerkIcon,
  code: Code2,
  convex: ConvexIcon,
  folder: FolderOpen,
  github: GitHubIcon,
  nextjs: NextjsIcon,
  rocket: Rocket,
  shadcn: ShadcnIcon,
  stripe: StripeIcon,
  supabase: SupabaseIcon,
  vercel: VercelIcon,
};

function FallbackIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-[var(--icon-foreground)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--icon-dot)]" />
    </span>
  );
}

function FaviconIcon({ siteUrl }: { siteUrl: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <FallbackIcon />;
  }

  const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(siteUrl)}`;

  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card">
      <img
        src={faviconUrl}
        alt=""
        className="h-4 w-4 rounded-[4px]"
        onError={() => setFailed(true)}
      />
    </span>
  );
}

function ItemIcon({ iconKey, siteUrl }: { iconKey?: string; siteUrl?: string }) {
  if (siteUrl) {
    return <FaviconIcon siteUrl={siteUrl} />;
  }

  if (!iconKey) {
    return <FallbackIcon />;
  }

  const IconComponent = iconMap[iconKey];

  if (!IconComponent) {
    return <FallbackIcon />;
  }

  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-[var(--icon-foreground)]">
      <IconComponent className="opacity-85" size={14} />
    </span>
  );
}

function ItemMeta({ item }: { item: TimelineItemData }) {
  if (!item.meta) {
    return null;
  }

  return (
    <span
      className={
        item.metaVariant === "pill"
          ? "rounded-full bg-[var(--status-pill)] px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.08em] text-primary-foreground"
          : "pt-0.5 text-[0.76rem] text-muted-foreground"
      }
    >
      {item.meta}
    </span>
  );
}

function ItemAction({ item }: { item: TimelineItemData }) {
  if ((item.href || item.projectSlug) && !item.meta) {
    return (
      <span className="pointer-events-none flex items-center justify-end pt-0.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
        <LinkIcon className="scale-150" size={22} />
      </span>
    );
  }

  return <ItemMeta item={item} />;
}

function RowBody({ item }: { item: TimelineItemData }) {
  return (
    <>
      <ItemIcon iconKey={item.iconKey} siteUrl={item.siteUrl} />
      <div className="min-w-0 text-left">
        <p className="text-[0.92rem] font-medium leading-[1.55] tracking-[-0.02em] text-foreground sm:text-[0.98rem]">
          {item.title}
          {item.description ? (
            <span className="font-normal text-muted-foreground">
              {" "}
              · {item.description}
            </span>
          ) : null}
        </p>
      </div>
      <ItemAction item={item} />
    </>
  );
}

function StaticRow({ item }: { item: TimelineItemData }) {
  if (item.href) {
    return (
      <li>
        <a
          href={item.href}
          target={item.external ? "_blank" : undefined}
          rel={item.external ? "noreferrer noopener" : undefined}
          className={`${hoverSlideItemClassName} cursor-pointer`}
        >
          <HoverSlideItem contentClassName="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1">
            <RowBody item={item} />
          </HoverSlideItem>
        </a>
      </li>
    );
  }

  return (
    <li className={hoverSlideItemClassName}>
      <HoverSlideItem contentClassName="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1">
        <RowBody item={item} />
      </HoverSlideItem>
    </li>
  );
}

function ProjectLinkRow({ item }: { item: TimelineItemData }) {
  if (!item.projectSlug) {
    return <StaticRow item={item} />;
  }

  return (
    <li>
      <Link
        href={`/projects/${item.projectSlug}`}
        className={`${hoverSlideItemClassName} cursor-pointer`}
      >
        <HoverSlideItem contentClassName="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1">
          <RowBody item={item} />
        </HoverSlideItem>
      </Link>
    </li>
  );
}

interface ItemRowProps {
  item: TimelineItemData;
  interactive?: boolean;
}

export function ItemRow({ item, interactive = false }: ItemRowProps) {
  if (!interactive) {
    return <StaticRow item={item} />;
  }

  return <ProjectLinkRow item={item} />;
}
