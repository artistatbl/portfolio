import { formatDate, type BlogPostMeta } from '@/lib/blog'
import { Badge } from '@/components/ui/badge'
import { Clock } from 'lucide-react'
import Link from 'next/link'

interface RelatedPostsProps {
  posts: BlogPostMeta[]
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) {
    return null
  }

  return (
    <section className="border-t border-border/50 pt-8 mt-8 max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold mb-6 text-foreground">
        Related Posts
      </h2>
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 w-full">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block p-4 rounded-lg border border-border/50 hover:border-border transition-all duration-200 hover:shadow-sm bg-card/50"
          >
            <div className="space-y-3">
              <h3 className="font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <time>{formatDate(post.date)}</time>
                {post.readingTime && (
                  <>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readingTime} min</span>
                    </div>
                  </>
                )}
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs px-1.5 py-0.5 h-auto"
                    >
                      #{tag}
                    </Badge>
                  ))}
                  {post.tags.length > 2 && (
                    <span className="text-xs text-muted-foreground">+{post.tags.length - 2}</span>
                  )}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}