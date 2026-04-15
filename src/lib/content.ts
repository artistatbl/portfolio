export interface ProfileData {
  name: string;
  role: string;
  introTail: string;
}

export interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface GitHubConfig {
  username: string;
  contributionWindowLabel: string;
}

export interface TimelineItemData {
  id: string;
  title: string;
  description?: string;
  iconKey?: string;
  meta?: string;
  metaVariant?: "plain" | "pill";
}

export interface HomepageContent {
  profile: ProfileData;
  narrativeParagraphs: string[];
  contactLinks: ContactLink[];
  github: GitHubConfig;
  experienceItems: TimelineItemData[];
  projectItems: TimelineItemData[];
}

// Replace any temporary copy here as the real portfolio content becomes available.
export const homepageContent: HomepageContent = {
  profile: {
    name: "Jean Daly",
    role: "software developer",
    introTail:
      "focused on building software that feels simple, clear, and fast to use — especially around AI tools, useful workflows, and products people return to.",
  },
  narrativeParagraphs: [
    "I'm currently building Mantlz and Feedgot.",
    "I do my best work iterating quickly, staying close to the product, and improving the details through repeated shipping.",
    "If you're working on something interesting, let's chat.",
  ],
  contactLinks: [
    {
      label: "GitHub",
      href: "https://github.com/artistatbl",
      external: true,
    },
    {
      label: "X",
      href: "https://twitter.com/yvesdalyy",
      external: true,
    },
  ],
  github: {
    username: "artistatbl",
    contributionWindowLabel: "Last 30 days",
  },
  experienceItems: [
    {
      id: "mantlz-exp",
      title: "Mantlz",
      description: "Building product and software systems",
      iconKey: "briefcase",
      meta: "Current",
    },
    {
      id: "feedgot-exp",
      title: "Feedgot",
      description: "Reading and discovery product",
      iconKey: "terminal",
      meta: "Current",
    },
    {
      id: "indie-exp",
      title: "Independent development",
      description: "Shipping experiments, tools, and product ideas",
      iconKey: "blocks",
      meta: "2024",
    },
  ],
  projectItems: [
    {
      id: "mantlz-project",
      title: "Mantlz",
      description: "Product and tooling in active development",
      iconKey: "rocket",
      meta: "In progress",
      metaVariant: "pill",
    },
    {
      id: "feedgot-project",
      title: "Feedgot",
      description: "Reading and discovery tool",
      iconKey: "folder",
      meta: "2025",
    },
    {
      id: "portfolio-project",
      title: "This portfolio",
      description: "A cleaner personal site direction",
      iconKey: "code",
      meta: "2025",
    },
    {
      id: "tools-project",
      title: "Open source tools",
      description: "Smaller utilities and experiments",
      iconKey: "github",
      meta: "2024",
    },
  ],
};
