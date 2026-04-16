"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { SectionBlock } from "@/components/home/block";
import type { BlogPost } from "@/lib/blog";
import { FileText, X } from "lucide-react";

interface BlogSectionProps {
  posts: BlogPost[];
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
            className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 rounded-md px-1.5 py-3 text-left transition-colors hover:bg-muted/60"
          >
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
            <span className="rounded-full border border-border px-2.5 py-1 text-[0.68rem] text-muted-foreground transition-colors group-hover:border-foreground/20 group-hover:text-foreground">
              Full
            </span>
          </button>
        </DrawerTrigger>
      </li>
      <DrawerContent className="flex max-h-[88vh] w-full flex-col overflow-hidden rounded-t-[1.5rem] border-border bg-background">
        <DrawerHeader className="border-b border-border px-4 pb-4 pt-4 text-left sm:px-6">
          <div className="mx-auto w-full max-w-[40rem]">
            <div className="relative">
              <div className="mx-auto w-full max-w-[30rem] space-y-3 text-left">
                <div className="space-y-2">
                  <DrawerTitle className="text-left text-[1.05rem] font-medium tracking-[-0.03em] text-foreground sm:text-[1.2rem]">
                    {post.title}
                  </DrawerTitle>
                  {post.summary ? (
                    <p className="max-w-[24rem] text-left text-[0.88rem] leading-6 text-muted-foreground">
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
                </div>
              </div>
              <DrawerClose asChild>
                <button
                  type="button"
                  aria-label="Close blog post"
                  className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </DrawerClose>
            </div>
          </div>
        </DrawerHeader>
        <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto w-full max-w-[40rem] px-4 py-7 sm:px-6 sm:py-8">
            <article
              className="blog-markdown mx-auto max-w-[30rem]"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function BlogSection({ posts }: BlogSectionProps) {
  if (!posts.length) {
    return null;
  }

  return (
    <SectionBlock title="Writing" divider={false}>
      <ul className="space-y-1.5">
        {posts.map((post) => (
          <BlogPostDrawer key={post.slug} post={post} />
        ))}
      </ul>
    </SectionBlock>
  );
}
