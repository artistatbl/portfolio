import { VcsIcon, DesignIcon, FrameworkIcon, ProductivityIcon } from '@/components/icons'

export interface BookmarkTool {
  name: string
  description: string
  url: string
}

export interface BookmarkCategories {
  [key: string]: BookmarkTool[]
}

export const getIconForCategory = (category: string) => {
  switch (category) {
    case "Development Tools":
      return VcsIcon
    case "Design Tools":
      return DesignIcon
    case "Frameworks & Libraries":
      return FrameworkIcon
    case "Productivity":
      return ProductivityIcon
    default:
      return VcsIcon
  }
}

export const bookmarkCategories: BookmarkCategories = {
  "Development Tools": [
    { name: "VS Code", description: "Code editor", url: "https://code.visualstudio.com" },
    { name: "Cursor", description: "AI-powered code editor", url: "https://cursor.com" },
    { name: "Trae AI", description: "AI coding assistant IDE", url: "https://trae.ai" },
    { name: "GitHub", description: "Version control", url: "https://github.com" },
    { name: "Vercel", description: "Deployment platform", url: "https://vercel.com" }
  ],
  "Design Tools": [
    { name: "Figma", description: "Design and prototyping", url: "https://figma.com" },
    { name: "Adobe Creative Suite", description: "Design software", url: "https://adobe.com" },
    { name: "Canva", description: "Quick design tool", url: "https://canva.com" }
  ],
  "Frameworks & Libraries": [
    { name: "Next.js", description: "React framework", url: "https://nextjs.org" },
    { name: "Tailwind CSS", description: "CSS framework", url: "https://tailwindcss.com" },
    { name: "shadcn/ui", description: "UI components", url: "https://ui.shadcn.com" }
  ],
  "Productivity": [
    { name: "Notion", description: "Note-taking and planning", url: "https://notion.so" },
    { name: "Slack", description: "Team communication", url: "https://slack.com" },
    { name: "Linear", description: "Issue tracking", url: "https://linear.app" }
  ]
}