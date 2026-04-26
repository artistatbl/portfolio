import { ItemRow } from "@/components/home/row";
import { SectionBlock } from "@/components/home/block";
import type { TimelineItemData } from "@/lib/content";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  HoverSlideItem,
  hoverSlideItemClassName,
} from "@/components/ui/hover-slide";

interface ItemListSectionProps {
  title: string;
  items: TimelineItemData[];
  divider?: boolean;
  interactive?: boolean;
  limit?: number;
  moreHref?: string;
  moreLabel?: string;
}

export function ItemListSection({
  title,
  items,
  divider = true,
  interactive = false,
  limit,
  moreHref,
  moreLabel = "View more",
}: ItemListSectionProps) {
  const visibleItems = typeof limit === "number" ? items.slice(0, limit) : items;
  const shouldShowMore =
    typeof limit === "number" && items.length > limit && Boolean(moreHref);

  return (
    <SectionBlock title={title} divider={divider}>
      <ul className="space-y-1.5">
        {visibleItems.map((item) => (
          <ItemRow key={item.id} item={item} interactive={interactive} />
        ))}
        {shouldShowMore && moreHref ? (
          <li>
            <Link
              href={moreHref}
              className={`${hoverSlideItemClassName} cursor-pointer`}
            >
              <HoverSlideItem contentClassName="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-[var(--icon-foreground)]">
                  <ArrowRight size={14} />
                </span>
                <span className="min-w-0 text-[0.92rem] font-medium leading-[1.55] tracking-[-0.02em] text-foreground sm:text-[0.98rem]">
                  {moreLabel}
                </span>
                <span className="pointer-events-none flex items-center justify-end text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  <ArrowRight className="scale-150" size={22} />
                </span>
              </HoverSlideItem>
            </Link>
          </li>
        ) : null}
      </ul>
    </SectionBlock>
  );
}
