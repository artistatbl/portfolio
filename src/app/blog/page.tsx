import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { BlogSection } from "@/components/home/blog";
import { LoadCascade } from "@/components/home/cascade";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Writing",
  alternates: {
    canonical: "/blog",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <div className="relative z-10 mx-auto max-w-[26rem]">
        <LoadCascade>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-[0.78rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>
          <BlogSection posts={posts} />
        </LoadCascade>
      </div>
    </main>
  );
}
