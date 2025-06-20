import { getPostBySlug, getAllPostSlugs } from '@/lib/blog'
import { BlogPostClient } from './blog-post-client'
import { notFound } from 'next/navigation'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs()
  return slugs.map((slug) => ({
    slug,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  return <BlogPostClient post={post} />
}