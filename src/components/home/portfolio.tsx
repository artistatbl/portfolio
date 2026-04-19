import { ActivitySection } from "@/components/home/activity";
import { BioSection } from "@/components/home/bio";
import { BlogSection } from "@/components/home/blog";
import { ConnectSection } from "@/components/home/connect";
import { HeroBackdrop } from "@/components/home/backdrop";
import { ItemListSection } from "@/components/home/list";
import { LoadCascade } from "@/components/home/cascade";
import { getBlogPosts } from "@/lib/blog";
import { homepageContent } from "@/lib/content";
import { getGitHubActivity } from "@/lib/github";
import { getProjectEntries } from "@/lib/projects";

export async function PortfolioPage() {
  const {
    narrativeParagraphs,
    currentProject,
    contactLinks,
    github,
    experienceItems,
    projectItems,
  } = homepageContent;
  const [activity, posts, projectEntries] = await Promise.all([
    getGitHubActivity(github.username, 30),
    getBlogPosts(),
    getProjectEntries(),
  ]);
  const projectEntryMap = new Map(
    projectEntries.map((entry) => [entry.slug, entry] as const)
  );
  const resolvedProjectItems = projectItems.map((item) => {
    const entry = item.projectSlug ? projectEntryMap.get(item.projectSlug) : undefined;

    if (!entry) {
      return item;
    }

    return {
      ...item,
      title: entry.title || item.title,
      description: entry.description || item.description,
      siteUrl: entry.siteUrl || item.siteUrl,
      meta: entry.year || item.meta,
      detail: {
        summary: entry.summary || item.detail?.summary || item.description || "",
        points: entry.highlights.length ? entry.highlights : item.detail?.points ?? [],
        html: entry.html,
        repoUrl: entry.repoUrl,
        deployUrl: entry.deployUrl || entry.siteUrl,
        status: entry.status,
        platform: entry.platform,
        stack: entry.stack,
        imageSrc: entry.imageSrc || item.detail?.imageSrc,
        imageAlt: entry.imageAlt || item.detail?.imageAlt,
      },
    };
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <HeroBackdrop />
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
          />
          <BlogSection posts={posts} />
          <ItemListSection title="Tools" items={experienceItems} />
          <ConnectSection links={contactLinks} />
        </LoadCascade>
      </div>
    </main>
  );
}
