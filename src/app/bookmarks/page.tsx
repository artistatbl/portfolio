'use client'

import { PageLayout } from '../../components/page-layout'
import { VcsIcon, CursorIcon, DesignIcon, FrameworkIcon, ProductivityIcon } from '@/components/icons'

export default function Bookmarks() {
  
  const getIconForCategory = (category: string) => {
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
  
  const categories = {
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

  return (
    <PageLayout>
      <div>
          <h1 className="font-bold text-foreground mb-8 text-2xl md:text-4xl">Bookmarks</h1>
          <p className="text-muted-foreground mb-8 text-sm md:mb-12 md:text-base">Software and tools I use daily</p>
          
          <div className="space-y-8 md:space-y-12">
            {Object.entries(categories).map(([category, tools]) => {
              const IconComponent = getIconForCategory(category)
              return (
                <div key={category}>
                  <h2 className="font-semibold text-foreground mb-6 text-lg md:text-2xl">{category}</h2>
                  <div className="grid gap-3 grid-cols-1 md:grid-cols-2">
                  {tools.map((tool, index) => (
                    <a 
                      key={index}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block p-5 rounded-xl border border-border/40 bg-gradient-to-br from-card/20 to-card/40 hover:from-card/40 hover:to-card/70 hover:border-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 md:hover:-translate-y-1 md:hover:scale-[1.02]"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="font-medium text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
                            {tool.name}
                          </h3>
                          <p className="text-muted-foreground mt-1 text-xs md:text-sm">
                            {tool.description}
                          </p>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center transition-colors flex-shrink-0">
                          <IconComponent 
                            className="text-primary/70 group-hover:text-primary transition-colors" 
                            size={16}
                          />
                        </div>
                      </div>
                    </a>
                  ))}
                  </div>
                </div>
              )
            })}
          </div>
      </div>
    </PageLayout>
  )
}