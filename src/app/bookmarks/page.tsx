'use client'

import { PageLayout } from '../../components/page-layout'
import { useMobile } from '@/hooks/use-mobile'

export default function Bookmarks() {
  const isMobile = useMobile()
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
          <h1 className={`font-bold text-foreground mb-8 ${
            isMobile ? 'text-2xl' : 'text-4xl'
          }`}>Bookmarks</h1>
          <p className={`text-muted-foreground ${
            isMobile ? 'mb-8 text-sm' : 'mb-12'
          }`}>Software and tools I use daily</p>
          
          <div className={isMobile ? 'space-y-8' : 'space-y-12'}>
            {Object.entries(categories).map(([category, tools]) => (
              <div key={category}>
                <h2 className={`font-semibold text-foreground mb-6 ${
                  isMobile ? 'text-lg' : 'text-2xl'
                }`}>{category}</h2>
                <div className="space-y-2">
                  {tools.map((tool, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <a 
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-foreground hover:text-muted-foreground transition-colors underline ${
                          isMobile ? 'text-sm' : 'text-base'
                        }`}
                      >
                        {tool.name}
                      </a>
                      <span className={`text-muted-foreground ${
                        isMobile ? 'text-xs' : 'text-sm'
                      }`}>— {tool.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
      </div>
    </PageLayout>
  )
}