import type { Metadata } from "next";

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
          <BlogSection posts={posts} />
        </LoadCascade>
      </div>
    </main>
  );
}
