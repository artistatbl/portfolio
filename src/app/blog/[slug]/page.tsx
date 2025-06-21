import type { Metadata } from 'next'
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog'
import { BlogPostClient } from './blog-post-client'
import { notFound } from 'next/navigation'
import { generateBlogPostMetadata } from '@/lib/seo'


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

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    }
  }

  return generateBlogPostMetadata({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    publishedAt: post.date,
    tags: post.tags,
  })
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    notFound()
  }

  return (
    <BlogPostClient meta={post}>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </BlogPostClient>
  )
}