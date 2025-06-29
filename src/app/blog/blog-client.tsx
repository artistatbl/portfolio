'use client'

import { PageLayout } from '../../components/page-layout'
import { formatDate, type BlogPostMeta } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { RSSLink } from '@/components/rss-link'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

interface BlogClientProps {
  posts: BlogPostMeta[]
  currentPage: number
  totalPages: number
  total: number
}

export function BlogClient({ posts, currentPage, totalPages, total }: BlogClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete('page')
    } else {
      params.set('page', page.toString())
    }
    const queryString = params.toString()
    const url = queryString ? `/blog?${queryString}` : '/blog'
    router.push(url)
  }

  const renderPaginationItems = () => {
    const items = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is small
      for (let i = 1; i <= totalPages; i++) {
        items.push(
           <PaginationItem key={i}>
             <PaginationLink
               onClick={() => handlePageChange(i)}
               isActive={currentPage === i}
               className="cursor-pointer select-none"
             >
               {i}
             </PaginationLink>
           </PaginationItem>
         )
      }
    } else {
      // Show first page
      items.push(
         <PaginationItem key={1}>
           <PaginationLink
             onClick={() => handlePageChange(1)}
             isActive={currentPage === 1}
             className="cursor-pointer select-none"
           >
             1
           </PaginationLink>
         </PaginationItem>
       )

      // Show ellipsis if needed
      if (currentPage > 3) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)
      
      for (let i = start; i <= end; i++) {
         items.push(
           <PaginationItem key={i}>
             <PaginationLink
               onClick={() => handlePageChange(i)}
               isActive={currentPage === i}
               className="cursor-pointer select-none"
             >
               {i}
             </PaginationLink>
           </PaginationItem>
         )
       }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        )
      }

      // Show last page
      if (totalPages > 1) {
        items.push(
           <PaginationItem key={totalPages}>
             <PaginationLink
               onClick={() => handlePageChange(totalPages)}
               isActive={currentPage === totalPages}
               className="cursor-pointer select-none"
             >
               {totalPages}
             </PaginationLink>
           </PaginationItem>
         )
      }
    }

    return items
  }

  return (
    <PageLayout>
      <div>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div>
              <h1 className="font-bold text-foreground mb-4 text-2xl md:text-4xl">Blog</h1>
              <p className="text-muted-foreground text-sm md:text-base">Thoughts on development, design, and technology</p>
            </div>
            <div className="flex-shrink-0 mt-4 md:mt-0">
              <RSSLink />
            </div>
          </div>
          
          <div className="space-y-8 md:space-y-10">
            {posts.map((post) => (
              <article key={post.slug} className="group border border-border/50 rounded-lg p-6 hover:border-border transition-all duration-200 hover:shadow-md bg-card/50 backdrop-blur-sm mb-6 md:mb-8">
                <Link href={`/blog/${post.slug}`} className="block">
                  <h2 className="font-bold text-foreground group-hover:text-primary transition-colors mb-3 text-lg md:text-xl">{post.title}</h2>
                  
                  <div className="flex items-center space-x-3 mb-3">
                    <time className="text-muted-foreground font-medium text-xs md:text-sm">{formatDate(post.date)}</time>
                    {post.author && (
                      <>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="text-muted-foreground text-xs md:text-sm">
                          {post.author}
                        </span>
                      </>
                    )}
                    {post.readingTime && (
                      <>
                        <span className="text-muted-foreground/50">•</span>
                        <span className="text-muted-foreground text-xs md:text-sm">
                          {post.readingTime} min read
                        </span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed mb-4 text-sm md:text-base">{post.excerpt}</p>
                  
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="group-hover:bg-accent/50 transition-colors text-xs md:text-sm"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex items-center mt-4 text-primary group-hover:text-primary/80 transition-colors">
                    <span className="text-sm md:text-base">Read more</span>
                    <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </article>
            ))}
          </div>
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm md:text-base">No blog posts found. Check back soon!</p>
            </div>
          )}
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 space-y-6">
              <div className="text-center text-xs md:text-sm text-muted-foreground">
                 Showing {((currentPage - 1) * 5) + 1} to {Math.min(currentPage * 5, total)} of {total} posts
               </div>
              
              <Pagination className="px-4">
                <PaginationContent className="flex-wrap justify-center">
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="cursor-pointer select-none"
                      />
                    </PaginationItem>
                  )}
                  
                  {renderPaginationItems()}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="cursor-pointer select-none"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            </div>
          )}
      </div>
    </PageLayout>
  )
}