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
    },
    {
      id: "vercel-tool",
      title: "Vercel",
      description: "Hosting and deployment",
      iconKey: "vercel",
    },
    {
      id: "nextjs-tool",
      title: "Next.js",
      description: "App router and product frontend",
      iconKey: "nextjs",
    },
    {
      id: "betterauth-tool",
      title: "Better Auth",
      description: "Authentication",
      iconKey: "betterauth",
    },
    {
      id: "shadcn-tool",
      title: "shadcn/ui",
      description: "Interface components",
      iconKey: "shadcn",
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
      detail: {
        summary:
          "Mantlz is a product and tooling concept focused on making software systems easier to shape, manage, and ship.",
        points: [
          "Exploring cleaner workflows for building and maintaining product infrastructure.",
          "Testing simple interfaces that make complex software operations feel calmer to use.",
          "Using the project as a sandbox for product direction, tooling ideas, and iteration speed.",
          "Thinking through how product systems can stay flexible without becoming messy to maintain over time.",
          "Prototyping small internal tools that reduce friction across setup, publishing, and everyday operations.",
          "Exploring interface patterns that make technical actions feel obvious even when the underlying systems are complex.",
          "Using repeated product passes to refine hierarchy, naming, and interaction clarity.",
          "Treating the work as both a real product direction and a testbed for future software ideas.",
          "Looking at how a lightweight design language could support tools, dashboards, and operational workflows.",
          "Experimenting with how product structure, content, and tooling can live together more cohesively.",
          "Testing ways to make software environments feel less overwhelming and more readable at a glance.",
          "Using the project to sharpen a more opinionated approach to product building and technical execution.",
        ],
      },
    },
    {
      id: "feedgot-project",
      title: "Feedgot",
      description: "Reading and discovery tool",
      iconKey: "folder",
      meta: "2025",
      detail: {
        summary:
          "Feedgot is a mock reading and discovery project centered on collecting, organizing, and returning to useful things worth revisiting.",
        points: [
          "Structured around lightweight discovery instead of noisy feeds.",
          "Focused on helping people save and resurface high-signal content.",
          "Designed as a product direction that balances utility, clarity, and repeat use.",
        ],
      },
    },
    {
      id: "portfolio-project",
      title: "This portfolio",
      description: "A cleaner personal site direction",
      iconKey: "code",
      meta: "2025",
      detail: {
        summary:
          "This portfolio is a reset of the personal site into a simpler editorial layout that is easier to maintain and extend.",
        points: [
          "Built from small homepage sections so future edits stay clean and readable.",
          "Using structured local content instead of hardcoded repeated markup.",
          "Treating this first pass as a flexible mockup before the final polish and content pass.",
        ],
      },
    },
    {
      id: "tools-project",
      title: "Open source tools",
      description: "Smaller utilities and experiments",
      iconKey: "github",
      meta: "2024",
      detail: {
        summary:
          "Open source tools is a placeholder collection for smaller experiments, utilities, and ideas that can stand on their own.",
        points: [
          "Includes lightweight tools that solve specific workflow problems.",
          "Acts as a home for experiments that may later grow into bigger products.",
          "Keeps the project list broad enough to show ongoing technical curiosity.",
        ],
      },
    },
  ],
};
