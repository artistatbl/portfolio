'use client'

import { PageLayout } from '../../components/page-layout'
import { bookmarkCategories, getIconForCategory } from '@/lib/bookmarks-data'

export default function Bookmarks() {

  return (
    <PageLayout>
      <div>
          <h1 className="font-bold text-foreground mb-8 text-2xl md:text-4xl">Bookmarks</h1>
          <p className="text-muted-foreground mb-8 text-sm md:mb-12 md:text-base">Software and tools I use daily</p>
          
          <div className="space-y-8 md:space-y-12">
            {Object.entries(bookmarkCategories).map(([category, tools]) => {
              const IconComponent = getIconForCategory(category)
              return (
                <div key={category}>
                  <h2 className="font-semibold text-foreground mb-6 text-lg md:text-2xl">{category}</h2>
                  <div className="space-y-2">
                  {tools.map((tool, index) => (
                    <a 
                      key={index}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 py-2 hover:text-primary transition-colors"
                    >
                      <IconComponent 
                        className="text-muted-foreground group-hover:text-primary transition-colors" 
                        size={16}
                      />
                      <div className="flex-1">
                        <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {tool.name}
                        </span>
                        <span className="text-muted-foreground ml-2 text-sm">
                          - {tool.description}
                        </span>
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