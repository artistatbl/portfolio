"use client";

import Image from "next/image";
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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  HoverSlide,
  hoverSlideContentClassName,
  hoverSlideItemClassName,
} from "@/components/ui/hover-slide";
import {
  Blocks,
  Code2,
  FolderOpen,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { useState, type ComponentType } from "react";
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
          : "text-muted-foreground pt-0.5 text-[0.76rem]"
      }
    >
      {item.meta}
    </span>
  );
}

function ItemAction({ item }: { item: TimelineItemData }) {
  if (item.href && !item.meta) {
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
    <div className="contents">
      <div className="relative z-[1]">
        <ItemIcon iconKey={item.iconKey} siteUrl={item.siteUrl} />
      </div>
      <div className="relative z-[1] min-w-0 text-left">
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
      <div className="relative z-[1]">
        <ItemAction item={item} />
      </div>
    </div>
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
          className={`${hoverSlideItemClassName} grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 px-1.5 py-3`}
        >
          <HoverSlide />
          <RowBody item={item} />
        </a>
      </li>
    );
  }

  return (
    <li
      className={`${hoverSlideItemClassName} grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 px-1.5 py-3`}
    >
      <HoverSlide />
      <RowBody item={item} />
    </li>
  );
}

function ProjectDrawer({ item }: { item: TimelineItemData }) {
  const detail = item.detail;
  const notes = detail?.points ?? [];
  const stack = detail?.stack ?? [];
  const projectImage = detail?.imageSrc;
  const linkItems = [
    detail?.deployUrl
      ? { href: detail.deployUrl, label: "Live site" }
      : null,
    detail?.repoUrl ? { href: detail.repoUrl, label: "GitHub repo" } : null,
  ].flatMap((link) => (link ? [link] : []));
  const quickFacts = [
    item.description ? { label: "Type", value: item.description } : null,
    detail?.platform ? { label: "Platform", value: detail.platform } : null,
    detail?.status ? { label: "Status", value: detail.status } : null,
    item.meta ? { label: "Year", value: item.meta } : null,
  ].flatMap((fact) => (fact ? [fact] : []));

  return (
    <Drawer>
      <li>
        <DrawerTrigger asChild>
          <button
            type="button"
            className={`${hoverSlideItemClassName} grid w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 px-1.5 py-3 text-left`}
          >
            <HoverSlide />
            <RowBody item={item} />
          </button>
        </DrawerTrigger>
      </li>
      <DrawerContent className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-[1.5rem] border-border bg-background">
        <DrawerHeader className="border-b border-border px-4 pb-4 pt-4 text-left sm:px-6">
          <DrawerClose aria-label="Close project details" />
          <div className="mx-auto w-full max-w-[52rem] space-y-3 text-left">
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 items-center gap-2">
                <ItemIcon iconKey={item.iconKey} siteUrl={item.siteUrl} />
                <DrawerTitle className="truncate text-[0.82rem] font-medium tracking-[-0.02em] text-foreground">
                  {item.title}
                  {item.meta ? (
                    <span className="ml-2 font-normal text-muted-foreground">
                      {item.meta}
                    </span>
                  ) : null}
                </DrawerTitle>
              </div>
            </div>
            <div className="max-w-[34rem] space-y-2 text-left">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Overview
              </p>
              <DrawerDescription className="text-left text-[0.96rem] leading-8 text-[var(--intro)]">
                {detail?.summary ??
                  item.description ??
                  "Project details coming soon."}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
        <div
          data-vaul-no-drag=""
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain [touch-action:pan-y] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="mx-auto w-full max-w-[52rem] px-4 py-7 sm:px-6 sm:py-8">
            <div className="space-y-8">
              {projectImage ? (
                <a
                  href={detail?.deployUrl ?? detail?.repoUrl ?? item.siteUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group block cursor-pointer"
                >
                  <div className="rounded-[1.15rem] bg-[color-mix(in_srgb,var(--muted)_55%,transparent)] p-1 ring-1 ring-black/8 transition-all duration-300 group-hover:ring-black/14 dark:ring-white/12 dark:group-hover:ring-white/20">
                    <div className="overflow-hidden rounded-[0.9rem] bg-background">
                      <Image
                        src={projectImage}
                        alt={detail?.imageAlt ?? `${item.title} preview`}
                        width={1600}
                        height={1000}
                        className="h-auto w-full rounded-[0.9rem] object-cover"
                      />
                    </div>
                  </div>
                </a>
              ) : null}
              <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start">
                <div className="space-y-5">
                  {detail?.html ? (
                    <article
                      className="prose prose-neutral max-w-none text-[var(--intro)] prose-headings:text-foreground prose-headings:tracking-[-0.02em] prose-headings:font-semibold prose-h2:mt-0 prose-h2:text-[1.02rem] prose-h3:text-[0.95rem] prose-p:text-[0.92rem] prose-p:leading-[1.9] prose-p:tracking-[-0.02em] prose-li:text-[0.9rem] prose-li:leading-[1.8] prose-li:tracking-[-0.02em] prose-strong:text-foreground prose-a:cursor-pointer prose-a:text-foreground prose-a:underline prose-a:decoration-[color-mix(in_srgb,var(--foreground)_20%,transparent)] prose-a:underline-offset-[0.16em] prose-code:rounded-[0.45rem] prose-code:border prose-code:border-border prose-code:bg-[color-mix(in_srgb,var(--muted)_55%,transparent)] prose-code:px-[0.35rem] prose-code:py-[0.1rem] prose-code:font-mono prose-code:text-[0.84em] prose-code:before:content-none prose-code:after:content-none prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground dark:prose-invert dark:prose-headings:text-foreground dark:prose-strong:text-foreground dark:prose-a:text-foreground dark:prose-code:text-foreground"
                      dangerouslySetInnerHTML={{ __html: detail.html }}
                    />
                  ) : (
                    <div className="space-y-3">
                      {notes.map((point) => (
                        <p
                          key={point}
                          className="text-[0.84rem] leading-6 text-muted-foreground"
                        >
                          {point}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="space-y-8 lg:pt-1">
                {linkItems.length ? (
                  <div className="space-y-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Links
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {linkItems.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="inline-flex cursor-pointer items-center text-[0.78rem] text-foreground underline decoration-[color-mix(in_srgb,var(--foreground)_18%,transparent)] underline-offset-[0.22em] transition-colors hover:text-muted-foreground"
                        >
                          {link.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ) : null}
                {quickFacts.length ? (
                  <div className="space-y-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Quick Facts
                    </p>
                    <div className="space-y-3">
                      {quickFacts.map((fact) => (
                        <div
                          key={fact.label}
                          className="space-y-1"
                        >
                          <span className="block text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">
                            {fact.label}
                          </span>
                          <span className="block text-[0.82rem] leading-5 text-foreground">
                            {fact.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
                {stack.length ? (
                  <div className="space-y-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {stack.map((stackItem) => (
                        <span
                          key={stackItem}
                          className="rounded-full bg-muted/45 px-2.5 py-1 text-[0.72rem] text-muted-foreground"
                        >
                          {stackItem}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
                {notes.length ? (
                  <div className="space-y-3">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Highlights
                    </p>
                    <div className="space-y-3">
                      {notes.map((point, index) => (
                        <div
                          key={point}
                          className="grid grid-cols-[1.4rem_minmax(0,1fr)] gap-3"
                        >
                          <span className="pt-0.5 text-[0.68rem] font-semibold text-muted-foreground">
                            0{index + 1}
                          </span>
                          <p className="text-[0.8rem] leading-5 text-foreground">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
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

  return <ProjectDrawer item={item} />;
}
