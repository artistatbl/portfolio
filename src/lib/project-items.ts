import { homepageContent, type TimelineItemData } from "@/lib/content";
import { getProjectEntries } from "@/lib/projects";

export async function getResolvedProjectItems(): Promise<TimelineItemData[]> {
  const projectEntries = await getProjectEntries();
  const projectEntryMap = new Map(
    projectEntries.map((entry) => [entry.slug, entry] as const)
  );
  const configuredSlugs = new Set(
    homepageContent.projectItems
      .map((item) => item.projectSlug)
      .filter((slug): slug is string => Boolean(slug))
  );

  const configuredItems = homepageContent.projectItems.map((item) => {
    const entry = item.projectSlug
      ? projectEntryMap.get(item.projectSlug)
      : undefined;

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
        points: entry.highlights.length
          ? entry.highlights
          : item.detail?.points ?? [],
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

  const extraItems = projectEntries
    .filter((entry) => !configuredSlugs.has(entry.slug))
    .map<TimelineItemData>((entry) => ({
      id: `${entry.slug}-project`,
      title: entry.title,
      description: entry.description,
      siteUrl: entry.siteUrl,
      iconKey: "folder",
      meta: entry.year,
      projectSlug: entry.slug,
      detail: {
        summary: entry.summary || entry.description,
        points: entry.highlights,
        html: entry.html,
        repoUrl: entry.repoUrl,
        deployUrl: entry.deployUrl || entry.siteUrl,
        status: entry.status,
        platform: entry.platform,
        stack: entry.stack,
        imageSrc: entry.imageSrc,
        imageAlt: entry.imageAlt,
      },
    }));

  return [...configuredItems, ...extraItems];
}
