import { ActivitySection } from "@/components/home/activity";
import { BioSection } from "@/components/home/bio";
import { BlogSection } from "@/components/home/blog";
import { ConnectSection } from "@/components/home/connect";
import { HeroBackdrop } from "@/components/home/backdrop";
import { ItemListSection } from "@/components/home/list";
import { LoadCascade } from "@/components/home/load-cascade";
import { getBlogPosts } from "@/lib/blog";
import { homepageContent } from "@/lib/content";
import { getGitHubActivity } from "@/lib/github";

export async function PortfolioPage() {
  const {
    narrativeParagraphs,
    currentProject,
    contactLinks,
    github,
    experienceItems,
    projectItems,
  } = homepageContent;
  const [activity, posts] = await Promise.all([
    getGitHubActivity(github.username, 30),
    getBlogPosts(),
  ]);

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
            items={projectItems}
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
