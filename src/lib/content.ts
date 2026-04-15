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
  narrativeParagraphs: string[];
  contactLinks: ContactLink[];
  github: GitHubConfig;
  experienceItems: TimelineItemData[];
  projectItems: TimelineItemData[];
}

// Replace any temporary copy here as the real portfolio content becomes available.
export const homepageContent: HomepageContent = {
  narrativeParagraphs: [
    "I'm Jean Daly, a software developer who likes building products that feel simple, clear, and fast to use.",
    "I care about useful software, thoughtful interfaces, and shipping things people actually come back to especially around AI tools and practical workflows.",
    "Right now I'm building Featul at featul.com.",
  ],
  contactLinks: [
    {
      label: "hi@jeandaly.dev",
      href: "mailto:hi@jeandaly.dev",
    },
    {
      label: "x.com",
      href: "https://x.com/yvesdalyy",
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
