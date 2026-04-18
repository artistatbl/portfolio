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
  html?: string;
  repoUrl?: string;
  deployUrl?: string;
  status?: string;
  platform?: string;
  stack?: string[];
  imageSrc?: string;
  imageAlt?: string;
}

export interface TimelineItemData {
  id: string;
  title: string;
  description?: string;
  iconKey?: string;
  siteUrl?: string;
  href?: string;
  external?: boolean;
  meta?: string;
  metaVariant?: "plain" | "pill";
  projectSlug?: string;
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
    "I'm Jean Daly, a software developer focused on building products that feel simple, clear, and genuinely good to use.",
    "I like working at the intersection of product, interface, and practical AI, turning messy ideas into tools that feel calm, fast, and easy to come back to.",
    "I usually build with Next.js, AI tools, and Codex, focused on making practical products that feel fast and easy to use.",
  ],
  currentProject: {
    prefix: "I'm currently building ",
    name: "Featul",
    href: "https://www.featul.com",
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
      description: "Privacy-first customer feedback platform",
      siteUrl: "https://www.featul.com",
      meta: "2026",
      projectSlug: "featul",
      detail: {
        summary:
          "A privacy-first feedback platform that connects requests, roadmap planning, and changelog communication in one product system.",
        points: [
          "Built for collecting requests, prioritizing product work, and publishing roadmap and changelog updates.",
          "Structured as a full monorepo with product app, marketing/docs site, and shared internal packages.",
          "Designed like a real SaaS product with billing, auth, analytics, and integration workflows.",
        ],
        imageSrc: "/featul.png",
        imageAlt: "Featul product interface",
      },
    },
    {
      id: "halttype-project",
      title: "Halttype",
      description: "Multilingual typing speed test",
      siteUrl: "https://www.halttype.com",
      iconKey: "folder",
      meta: "2025",
      projectSlug: "halttype",
      detail: {
        summary:
          "A clean typing product focused on speed, clarity, and a calmer daily-use experience.",
        points: [
          "Built around multilingual practice, fast test flows, and a cleaner interface.",
          "Set up as a real product with room for accounts, stats, saved tests, and leaderboards.",
          "Deployed publicly and supported by a real repo, domain, and SEO setup.",
        ],
        imageSrc: "/halttype.png",
        imageAlt: "Halttype project interface",
      },
    },
    {
      id: "dves-project",
      title: "Dves",
      description: "Open source AI chat",
      siteUrl: "https://dves.space",
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
