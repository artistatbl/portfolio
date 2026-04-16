export interface ContactLink {
  label: string;
  href: string;
  external?: boolean;
  iconKey?: "github" | "mail" | "x";
}

export interface CurrentProject {
  prefix: string;
  name: string;
  href: string;
  suffix?: string;
  external?: boolean;
}

export interface GitHubConfig {
  username: string;
  contributionWindowLabel: string;
}

export interface ProjectDetail {
  summary: string;
  points: string[];
}

export interface TimelineItemData {
  id: string;
  title: string;
  description?: string;
  iconKey?: string;
  href?: string;
  external?: boolean;
  meta?: string;
  metaVariant?: "plain" | "pill";
  detail?: ProjectDetail;
}

export interface HomepageContent {
  narrativeParagraphs: string[];
  currentProject: CurrentProject;
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
  ],
  currentProject: {
    prefix: "I'm currently building ",
    name: "Featul",
    href: "https://featul.com",
    suffix: ".",
    external: true,
  },
  contactLinks: [
    {
      label: "GitHub",
      href: "https://github.com/artistatbl",
      external: true,
      iconKey: "github",
    },
    {
      label: "hi@jeandaly.dev",
      href: "mailto:hi@jeandaly.dev",
      iconKey: "mail",
    },
    {
      label: "x.com",
      href: "https://x.com/yvesdalyy",
      external: true,
      iconKey: "x",
    },
  ],
  github: {
    username: "artistatbl",
    contributionWindowLabel: "Last 30 days",
  },
  experienceItems: [
    {
      id: "stripe-tool",
      title: "Stripe",
      description: "Payments and billing",
      iconKey: "stripe",
      href: "https://stripe.com",
      external: true,
    },
    {
      id: "vercel-tool",
      title: "Vercel",
      description: "Hosting and deployment",
      iconKey: "vercel",
      href: "https://vercel.com",
      external: true,
    },
    {
      id: "nextjs-tool",
      title: "Next.js",
      description: "App router and product frontend",
      iconKey: "nextjs",
      href: "https://nextjs.org",
      external: true,
    },
    {
      id: "betterauth-tool",
      title: "Better Auth",
      description: "Authentication",
      iconKey: "betterauth",
      href: "https://better-auth.com",
      external: true,
    },
    {
      id: "shadcn-tool",
      title: "shadcn/ui",
      description: "Interface components",
      iconKey: "shadcn",
      href: "https://ui.shadcn.com",
      external: true,
    },
    {
      id: "convex-tool",
      title: "Convex",
      description: "Backend and realtime data",
      iconKey: "convex",
      href: "https://convex.dev",
      external: true,
    },
    {
      id: "clerk-tool",
      title: "Clerk",
      description: "Auth and user management",
      iconKey: "clerk",
      href: "https://clerk.com",
      external: true,
    },
    {
      id: "supabase-tool",
      title: "Supabase",
      description: "Database and storage",
      iconKey: "supabase",
      href: "https://supabase.com",
      external: true,
    },
  ],
  projectItems: [
    {
      id: "featul-project",
      title: "Featul",
      description: "Customer feedback platform",
      iconKey: "featul",
      meta: "2026",
      detail: {
        summary:
          "Featul is a customer feedback platform focused on helping teams collect, organize, and act on product feedback more clearly.",
        points: [
          "Focused on turning raw feedback into something easier to sort, review, and ship against.",
          "Exploring calmer product workflows for collecting requests, bugs, and user insights.",
          "Designed as a tool teams can return to often without the interface feeling heavy.",
        ],
      },
    },
    {
      id: "halttype-project",
      title: "Halttype",
      description: "Monkeytype alternative",
      iconKey: "folder",
      meta: "2025",
      detail: {
        summary:
          "Halttype is a typing product concept built as an alternative to Monkeytype with a simpler and more focused experience.",
        points: [
          "Built around practice, speed, and a cleaner typing flow.",
          "Exploring a lighter interface direction for typing sessions and progress tracking.",
          "Treating the project as a small product experiment with strong daily-use potential.",
        ],
      },
    },
    {
      id: "dves-project",
      title: "Dves",
      description: "Open source AI chat",
      iconKey: "code",
      meta: "2025",
      detail: {
        summary:
          "Dves is an open source AI chat project centered on usable interfaces, practical workflows, and extensible chat experiences.",
        points: [
          "Focused on building an AI chat experience that feels approachable and useful.",
          "Open source by design so the product can evolve in public.",
          "Exploring how conversation, tooling, and interface design can work together more cleanly.",
        ],
      },
    },
  ],
};
