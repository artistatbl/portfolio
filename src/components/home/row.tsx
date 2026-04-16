"use client";

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
          className="group grid cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 rounded-md px-1.5 py-3 transition-colors hover:bg-muted/60"
        >
          <RowBody item={item} />
        </a>
      </li>
    );
  }

  return (
    <li className="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 rounded-md px-1.5 py-3 transition-colors hover:bg-muted/60">
      <RowBody item={item} />
    </li>
  );
}

function ProjectDrawer({ item }: { item: TimelineItemData }) {
  const detail = item.detail;
  const notes = detail?.points ?? [];

  return (
    <Drawer>
      <li>
        <DrawerTrigger asChild>
          <button
            type="button"
            className="group grid w-full cursor-pointer grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 rounded-md px-1.5 py-3 text-left transition-colors hover:bg-muted/60"
          >
            <RowBody item={item} />
          </button>
        </DrawerTrigger>
      </li>
      <DrawerContent className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-[1.5rem] border-border bg-background">
        <DrawerHeader className="border-b border-border px-4 pb-4 pt-4 text-left sm:px-6">
          <DrawerClose aria-label="Close project details" />
          <div className="flex w-full items-center justify-between gap-4">
            <div className="mx-auto flex w-full max-w-[44rem] min-w-0 items-center gap-3">
              <div className="flex min-w-0 items-center gap-2">
                <ItemIcon iconKey={item.iconKey} />
                <DrawerTitle className="truncate text-[0.82rem] font-medium tracking-[-0.02em] text-foreground">
                  {item.title}
                  {item.meta ? (
                    <span className="ml-2 font-normal text-muted-foreground">
                      {item.meta}
                    </span>
                  ) : null}
                </DrawerTitle>
              </div>
              <span className="rounded-full border border-border px-3 py-1 text-[0.68rem] text-muted-foreground">
                Mock project
              </span>
            </div>
          </div>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto w-full max-w-[44rem] px-4 py-6 sm:px-6 sm:py-7">
            <div className="grid gap-5 md:grid-cols-2">
              <div className="rounded-[1.1rem] border border-border bg-muted/30 p-4">
                <div className="flex aspect-[4/5] items-center justify-center rounded-[0.9rem] bg-foreground text-background">
                  <div className="grid grid-cols-6 gap-1.5">
                    {Array.from({ length: 30 }).map((_, index) => (
                      <span
                        key={index}
                        className="h-3.5 w-3.5 rounded-[3px] bg-background/90"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="rounded-[1.1rem] border border-border bg-muted/20 p-4">
                <div className="flex aspect-[4/5] flex-col justify-between rounded-[0.9rem] border border-border bg-background p-5">
                  <div className="space-y-2">
                    <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Overview
                    </p>
                    <DrawerDescription className="text-sm leading-6 text-muted-foreground">
                      {detail?.summary ??
                        item.description ??
                        "Project details coming soon."}
                    </DrawerDescription>
                  </div>
                  <div className="space-y-3">
                    {notes.slice(0, 3).map((point, index) => (
                      <div
                        key={point}
                        className="flex items-start gap-3 rounded-[0.9rem] border border-border px-3 py-3"
                      >
                        <span className="mt-0.5 text-[0.68rem] font-semibold text-muted-foreground">
                          0{index + 1}
                        </span>
                        <p className="text-[0.8rem] leading-5 text-foreground">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto mt-6 max-w-[24rem] space-y-4">
              <p className="text-[0.86rem] leading-6 text-foreground">
                {item.description
                  ? `${item.title} is currently framed as ${item.description.toLowerCase()}.`
                  : `${item.title} is an in-progress project concept.`}
              </p>
              {notes.length ? (
                <div className="space-y-3">
                  {notes.map((point) => (
                    <p
                      key={point}
                      className="text-[0.82rem] leading-6 text-muted-foreground"
                    >
                      {point}
                    </p>
                  ))}
                </div>
              ) : null}
              <div className="pt-1">
                <span className="inline-flex rounded-full border border-border px-3 py-1 text-[0.68rem] text-muted-foreground">
                  More project content soon
                </span>
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
