import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { getBlogPost, getBlogPosts } from "@/lib/blog";

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

export async function generateStaticParams() {
  const posts = await getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: "Writing",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = formatDate(post.date);

  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <div className="relative z-10 mx-auto w-full max-w-[46rem]">
        <div className="space-y-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[0.78rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to writing
          </Link>

          <header className="space-y-4">
            <div className="space-y-3">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Writing
              </p>
              <h1 className="max-w-[40rem] text-[2rem] font-semibold tracking-[-0.055em] text-foreground sm:text-[2.7rem]">
                {post.title}
              </h1>
              {post.summary ? (
                <p className="max-w-[38rem] text-[0.98rem] leading-8 text-[var(--intro)]">
                  {post.summary}
                </p>
              ) : null}
            </div>
            {(formattedDate || post.tag) ? (
              <div className="flex flex-wrap items-center gap-3 text-[0.78rem] text-muted-foreground">
                {formattedDate ? <span>{formattedDate}</span> : null}
                {post.tag ? <span>{post.tag}</span> : null}
              </div>
            ) : null}
          </header>

          <article
            className="blog-prose-emphasis prose prose-neutral max-w-none text-[var(--intro)] prose-headings:text-foreground prose-headings:tracking-[-0.02em] prose-headings:font-semibold prose-h1:mt-0 prose-h1:text-[1.04rem] prose-h2:text-[1.08rem] prose-h3:text-[0.98rem] prose-p:text-[0.98rem] prose-p:leading-[1.9] prose-p:tracking-[-0.02em] prose-li:text-[0.98rem] prose-li:leading-[1.9] prose-li:tracking-[-0.02em] prose-strong:font-semibold prose-strong:text-foreground prose-a:font-semibold prose-a:text-foreground prose-a:no-underline prose-code:rounded-[0.45rem] prose-code:border prose-code:border-border prose-code:bg-[color-mix(in_srgb,var(--muted)_55%,transparent)] prose-code:px-[0.35rem] prose-code:py-[0.1rem] prose-code:font-mono prose-code:text-[0.84em] prose-code:before:content-none prose-code:after:content-none prose-pre:overflow-x-auto prose-pre:rounded-[1rem] prose-pre:border prose-pre:border-border prose-pre:bg-[color-mix(in_srgb,var(--muted)_45%,transparent)] prose-pre:p-4 prose-pre:text-foreground prose-pre:shadow-none prose-pre:before:content-none prose-pre:after:content-none prose-blockquote:border-l-2 prose-blockquote:border-border prose-blockquote:pl-4 prose-blockquote:text-muted-foreground prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground dark:prose-invert dark:prose-headings:text-foreground dark:prose-strong:text-foreground dark:prose-a:text-foreground dark:prose-code:text-foreground dark:prose-pre:bg-[color-mix(in_srgb,var(--muted)_35%,transparent)]"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </div>
      </div>
    </main>
  );
}
