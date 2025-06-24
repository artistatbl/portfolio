import { 
  VcsIcon, 
  TypeScriptIcon, 
  ConvexIcon, 
  ClerkIcon, 
  SupabaseIcon, 
  StripeIcon, 
  GitIcon, 
  GitHubIcon, 
  VercelIcon, 
  ReactIcon, 
  NextjsIcon, 
  ReactRouterIcon, 
  BetterAuthIcon, 
  TailwindIcon, 
  VSCodeIcon, 
  CursorIcon, 
  TraeAIIcon, 
  SlackIcon, 
  ShadcnIcon, 
  NotionIcon, 
  LinearIcon, 
  FigmaIcon, 
  CanvaIcon, 
  AdobeIcon 
} from '@/components/icons'

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
    case "TypeScript":
      return TypeScriptIcon
    case "Backend & Database":
      return SupabaseIcon
    case "Authentication":
      return ClerkIcon
    case "Deployment":
      return VercelIcon
    case "Frontend":
      return ReactIcon
    case "Payment":
      return StripeIcon
    default:
      return VcsIcon
  }
}

export const getIconForTool = (toolName: string) => {
  switch (toolName) {
    case "TypeScript":
      return TypeScriptIcon
    case "Convex":
      return ConvexIcon
    case "Better Auth":
      return BetterAuthIcon
    case "Clerk":
      return ClerkIcon
    case "Supabase":
      return SupabaseIcon
    case "Tailwind CSS":
      return TailwindIcon
    case "Stripe":
      return StripeIcon
    case "Git":
      return GitIcon
    case "GitHub":
      return GitHubIcon
    case "Vercel":
      return VercelIcon
    case "React":
      return ReactIcon
    case "Next.js":
      return NextjsIcon
    case "React Router":
      return ReactRouterIcon
    case "VS Code":
      return VSCodeIcon
    case "Cursor":
      return CursorIcon
    case "Trae AI":
      return TraeAIIcon
    case "Slack":
      return SlackIcon
    case "shadcn/ui":
      return ShadcnIcon
    case "Notion":
      return NotionIcon
    case "Linear":
      return LinearIcon
    case "Figma":
      return FigmaIcon
    case "Canva":
      return CanvaIcon
    case "Adobe Creative Suite":
      return AdobeIcon
    default:
      return null
  }
}

export const bookmarkCategories: BookmarkCategories = {
  "Development Tools": [
    { name: "VS Code", description: "Code editor", url: "https://code.visualstudio.com" },
    { name: "Cursor", description: "AI-powered code editor", url: "https://cursor.com" },
    { name: "Trae AI", description: "AI coding assistant IDE", url: "https://trae.ai" },
    { name: "Git", description: "Version control system", url: "https://git-scm.com" },
    { name: "GitHub", description: "Code hosting platform", url: "https://github.com" }
  ],
  "TypeScript": [
    { name: "TypeScript", description: "Typed JavaScript", url: "https://www.typescriptlang.org" }
  ],
  "Frontend": [
    { name: "React", description: "UI library", url: "https://reactjs.org" },
    { name: "Next.js", description: "React framework", url: "https://nextjs.org" },
    { name: "React Router", description: "Routing library", url: "https://reactrouter.com" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework", url: "https://tailwindcss.com" },
    { name: "shadcn/ui", description: "UI components", url: "https://ui.shadcn.com" }
  ],
  "Backend & Database": [
    { name: "Convex", description: "Backend platform", url: "https://convex.dev" },
    { name: "Supabase", description: "Open source Firebase alternative", url: "https://supabase.com" }
  ],
  "Authentication": [
    { name: "Clerk", description: "Authentication & user management", url: "https://clerk.dev" },
    { name: "Better Auth", description: "Authentication solution", url: "https://betterauth.io" }
  ],
  "Payment": [
    { name: "Stripe", description: "Payment processing platform", url: "https://stripe.com" }
  ],
  "Deployment": [
    { name: "Vercel", description: "Deployment platform", url: "https://vercel.com" }
  ],
  "Design Tools": [
    { name: "Figma", description: "Design and prototyping", url: "https://figma.com" },
    { name: "Adobe Creative Suite", description: "Design software", url: "https://adobe.com" },
    { name: "Canva", description: "Quick design tool", url: "https://canva.com" }
  ],
  "Productivity": [
    { name: "Notion", description: "Note-taking and planning", url: "https://notion.so" },
    { name: "Slack", description: "Team communication", url: "https://slack.com" },
    { name: "Linear", description: "Issue tracking", url: "https://linear.app" }
  ]
}