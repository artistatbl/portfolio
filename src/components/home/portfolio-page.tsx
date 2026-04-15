import { BioSection } from "@/components/home/bio-section";
import { ContactSection } from "@/components/home/contact-section";
import { ItemListSection } from "@/components/home/item-list-section";
import { ActivitySection } from "@/components/home/activity-section";
import { homepageContent } from "@/lib/homepage-content";

export function PortfolioPage() {
  const {
    profile,
    narrativeParagraphs,
    contactLinks,
    github,
    experienceItems,
    projectItems,
  } = homepageContent;

  return (
    <main className="min-h-screen px-5 py-8 text-[#171513] sm:px-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[23rem]">
        <div className="space-y-10">
          <BioSection profile={profile} paragraphs={narrativeParagraphs} />
          <ContactSection links={contactLinks} />
          <ActivitySection
            contributionWindowLabel={github.contributionWindowLabel}
            username={github.username}
          />
          <ItemListSection title="Experience" items={experienceItems} />
          <ItemListSection title="Projects" items={projectItems} />
        </div>
      </div>
    </main>
  );
}
