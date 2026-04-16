import { ActivitySection } from "@/components/home/activity";
import { BioSection } from "@/components/home/bio";
import { ConnectSection } from "@/components/home/connect";
import { ItemListSection } from "@/components/home/list";
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
  const activity = await getGitHubActivity(github.username, 30);

  return (
    <main className="min-h-screen px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[26rem]">
        <div className="space-y-10">
          <BioSection
            paragraphs={narrativeParagraphs}
            currentProject={currentProject}
          />
          <ActivitySection
            contributionWindowLabel={github.contributionWindowLabel}
            contributionCountLabel={`${activity.total} commits`}
            days={activity.days}
          />
          <ItemListSection title="Experience" items={experienceItems} />
          <ItemListSection
            title="Projects"
            items={projectItems}
            interactive
            divider={false}
          />
          <ConnectSection links={contactLinks} />
        </div>
      </div>
    </main>
  );
}
