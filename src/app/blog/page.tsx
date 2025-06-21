import type { Metadata } from 'next'
import { getAllPosts } from '@/lib/blog'
import { BlogClient } from './blog-client'
import { generateMetadata } from '@/lib/seo'

export const metadata: Metadata = generateMetadata('blog')

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

export default async function Blog({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = parseInt(params.page || '1', 10)
  const postsPerPage = 3
  
  const result = await getAllPosts(currentPage, postsPerPage)

  return (
    <BlogClient 
      posts={result.posts} 
      currentPage={currentPage}
      totalPages={result.totalPages}
      total={result.total}
    />
  )
}