import { ActivitySection } from "@/components/home/activity";
import { BioSection } from "@/components/home/bio";
import { BlogSection } from "@/components/home/blog";
import { ConnectSection } from "@/components/home/connect";
import { ItemListSection } from "@/components/home/list";
import { LoadCascade } from "@/components/home/cascade";
import { getBlogPosts } from "@/lib/blog";
import { homepageContent } from "@/lib/content";
import { getGitHubActivity } from "@/lib/github";
import { getResolvedProjectItems } from "@/lib/project-items";

export async function PortfolioPage() {
  const {
    narrativeParagraphs,
    currentProject,
    contactLinks,
    github,
    experienceItems,
  } = homepageContent;
  const [activity, posts, resolvedProjectItems] = await Promise.all([
    getGitHubActivity(github.username, 30),
    getBlogPosts(),
    getResolvedProjectItems(),
  ]);

  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <div className="relative z-10 mx-auto max-w-[26rem]">
        <LoadCascade>
          <BioSection
            paragraphs={narrativeParagraphs}
            currentProject={currentProject}
          />
          <ActivitySection
            contributionWindowLabel={github.contributionWindowLabel}
            contributionCountLabel={`${activity.total} commits`}
            days={activity.days}
          />
          <ItemListSection
            title="Projects"
            items={resolvedProjectItems}
            interactive
            divider={false}
            limit={3}
            moreHref="/projects"
            moreLabel="View more projects"
          />
          <BlogSection
            posts={posts}
            limit={3}
            moreHref="/blog"
            moreLabel="View more writing"
          />
          <ItemListSection title="Tools" items={experienceItems} />
          <ConnectSection links={contactLinks} />
        </LoadCascade>
      </div>
    </main>
  );
}
