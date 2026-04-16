import { BioSection } from "@/components/home/bio";
import { ItemListSection } from "@/components/home/list";
import { ActivitySection } from "@/components/home/activity";
import { homepageContent } from "@/lib/content";

export function PortfolioPage() {
  const {
    narrativeParagraphs,
    currentProject,
    contactLinks,
    github,
    experienceItems,
    projectItems,
  } = homepageContent;

  return (
    <main className="min-h-screen px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[26rem]">
        <div className="space-y-10">
          <BioSection
            paragraphs={narrativeParagraphs}
            currentProject={currentProject}
            links={contactLinks}
          />
          <ActivitySection
            contributionWindowLabel={github.contributionWindowLabel}
            username={github.username}
          />
          <ItemListSection title="Experience" items={experienceItems} />
          <ItemListSection
            title="Projects"
            items={projectItems}
            interactive
            divider={false}
          />
        </div>
      </div>
    </main>
  );
}
