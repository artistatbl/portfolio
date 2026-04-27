"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  HoverSlideItem,
  hoverSlideItemClassName,
} from "@/components/ui/hover-slide";
import { SectionBlock } from "@/components/home/block";
import type { BlogPost } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";

interface BlogSectionProps {
  posts: BlogPost[];
  limit?: number;
  moreHref?: string;
  moreLabel?: string;
}

function formatDate(value: string) {
  if (!value) {
    return null;
  }

  const parsed = new Date(`${value}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return null;
  }

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsed);
}

function BlogPostDrawer({ post }: { post: BlogPost }) {
  const formattedDate = formatDate(post.date);

  return (
    <Drawer>
      <li>
        <DrawerTrigger asChild>
          <button
            type="button"
            className={`${hoverSlideItemClassName} w-full cursor-pointer text-left`}
          >
            <HoverSlideItem contentClassName="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-card text-[var(--icon-foreground)]">
                <FileText size={14} />
              </span>
              <div className="min-w-0">
                <p className="text-[0.92rem] font-medium leading-[1.55] tracking-[-0.02em] text-foreground sm:text-[0.98rem]">
                  {post.title}
                </p>
                <p className="mt-1 max-w-[32ch] text-[0.8rem] leading-5 text-muted-foreground">
                  {post.summary}
                </p>
              </div>
            </HoverSlideItem>
          </button>
        </DrawerTrigger>
      </li>
      <DrawerContent className="flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[1.5rem] border-border bg-background">
        <DrawerHeader className="border-b border-border px-5 pb-4 pt-4 text-left sm:px-8 md:px-10">
          <div className="w-full">
            <DrawerClose aria-label="Close blog post" />
            <div className="mx-auto w-full max-w-[28rem] space-y-3 pr-10 pl-4 text-left sm:pl-5">
              <div className="space-y-2">
                <DrawerTitle className="text-left text-[1.1rem] font-medium tracking-[-0.03em] text-foreground sm:text-[1.24rem]">
                  {post.title}
                </DrawerTitle>
                {post.summary ? (
                  <p className="max-w-[26rem] text-left text-[0.92rem] leading-6 text-muted-foreground">
                    {post.summary}
                  </p>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {formattedDate ? (
                  <span className="text-[0.72rem] text-muted-foreground">
                    {formattedDate}
                  </span>
                ) : null}
                {post.tag ? (
                  <span className="text-[0.72rem] text-muted-foreground">
                    {post.tag}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        </DrawerHeader>
        <div
          data-vaul-no-drag=""
          className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain [touch-action:pan-y] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          <div className="py-7 sm:py-8">
            <div className="mx-auto w-full max-w-[28rem] pl-4 text-left sm:pl-5">
              <article
                className="blog-prose-emphasis prose prose-neutral max-w-none text-[var(--intro)] prose-headings:text-foreground prose-headings:tracking-[-0.02em] prose-headings:font-semibold prose-h1:mt-0 prose-h1:text-[1.04rem] prose-h2:text-[1.04rem] prose-h3:text-[1.04rem] prose-p:text-[0.98rem] prose-p:leading-[1.9] prose-p:tracking-[-0.02em] prose-li:text-[0.98rem] prose-li:leading-[1.9] prose-li:tracking-[-0.02em] prose-strong:font-semibold prose-strong:text-foreground prose-a:font-semibold prose-a:text-foreground prose-a:no-underline prose-code:rounded-[0.45rem] prose-code:border prose-code:border-border prose-code:bg-[color-mix(in_srgb,var(--muted)_55%,transparent)] prose-code:px-[0.35rem] prose-code:py-[0.1rem] prose-code:font-mono prose-code:text-[0.84em] prose-code:before:content-none prose-code:after:content-none prose-pre:overflow-x-auto prose-pre:rounded-[1rem] prose-pre:border prose-pre:border-border prose-pre:bg-[color-mix(in_srgb,var(--muted)_45%,transparent)] prose-pre:p-4 prose-pre:text-foreground prose-pre:shadow-none prose-pre:before:content-none prose-pre:after:content-none prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:text-muted-foreground prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground dark:prose-invert dark:prose-headings:text-foreground dark:prose-strong:text-foreground dark:prose-a:text-foreground dark:prose-code:text-foreground dark:prose-pre:bg-[color-mix(in_srgb,var(--muted)_35%,transparent)]"
                dangerouslySetInnerHTML={{ __html: post.html }}
              />
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function BlogSection({
  posts,
  limit,
  moreHref,
  moreLabel = "View more",
}: BlogSectionProps) {
  if (!posts.length) {
    return null;
  }

  const visiblePosts = typeof limit === "number" ? posts.slice(0, limit) : posts;
  const shouldShowMore = typeof limit === "number" && Boolean(moreHref);

  return (
    <SectionBlock title="Writing" divider={false}>
      <ul className="space-y-1.5">
        {visiblePosts.map((post) => (
          <BlogPostDrawer key={post.slug} post={post} />
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
