import type { Metadata } from "next";

import { ItemListSection } from "@/components/home/list";
import { LoadCascade } from "@/components/home/cascade";
import { getResolvedProjectItems } from "@/lib/project-items";

export const metadata: Metadata = {
  title: "Projects",
  alternates: {
    canonical: "/projects",
  },
};

export default async function ProjectsPage() {
  const projects = await getResolvedProjectItems();

  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <div className="relative z-10 mx-auto max-w-[26rem]">
        <LoadCascade>
          <ItemListSection
            title="Projects"
            items={projects}
            interactive
            divider={false}
          />
        </LoadCascade>
      </div>
    </main>
  );
}
