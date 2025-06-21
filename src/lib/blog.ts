export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  content: string
  readingTime: number
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  author: string
  tags: string[]
  readingTime: number
}

export async function getAllPosts(page?: number, limit?: number): Promise<{ posts: BlogPostMeta[], total: number, totalPages: number }> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
    
    let url = `${baseUrl}/api/blog`
    const params = new URLSearchParams()
    
    if (page !== undefined) params.append('page', page.toString())
    if (limit !== undefined) params.append('limit', limit.toString())
    
    if (params.toString()) {
      url += `?${params.toString()}`
    }
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    
    const result = await response.json()
    
    // Handle backward compatibility - if response is array, convert to new format
    if (Array.isArray(result)) {
      return { posts: result, total: result.length, totalPages: 1 }
    }
    
    return result as { posts: BlogPostMeta[]; total: number; totalPages: number }
  } catch (error) {
    console.error('Error fetching posts:', error)
    return { posts: [], total: 0, totalPages: 0 }
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
    const response = await fetch(`${baseUrl}/api/blog?slug=${slug}`)
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    console.error(`Error fetching blog post ${slug}:`, error)
    return null
  }
}

export async function getAllPostSlugs(): Promise<string[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000')
    const response = await fetch(`${baseUrl}/api/blog?action=slugs`)
    if (!response.ok) {
      throw new Error('Failed to fetch slugs')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching post slugs:', error)
    return []
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function getPostsByTag(tag: string): Promise<BlogPostMeta[]> {
  return getAllPosts().then(posts => 
    posts.posts.filter(post => post.tags.includes(tag))
  )
}

export function getAllTags(): Promise<string[]> {
  return getAllPosts().then(posts => {
    const tags = new Set<string>()
    posts.posts.forEach(post => {
      post.tags.forEach(tag => tags.add(tag))
    })
    return Array.from(tags).sort()
  })
}