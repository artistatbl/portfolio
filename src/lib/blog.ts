import path from "node:path";
import { promises as fs } from "node:fs";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tag?: string;
  html: string;
}

interface BlogFrontmatter {
  title?: string;
  date?: string | Date;
  summary?: string;
  tag?: string;
  published?: boolean;
}

function isMarkdownFile(fileName: string): boolean {
  return fileName.endsWith(".md");
}

function normalizeDate(value: string | Date | undefined): string {
  if (!value) {
    return "";
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const fileNames = await fs.readdir(BLOG_DIRECTORY);

  const posts = await Promise.all(
    fileNames.filter(isMarkdownFile).map(async (fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const source = await fs.readFile(path.join(BLOG_DIRECTORY, fileName), "utf8");
      const { data, content } = matter(source);
      const frontmatter = data as BlogFrontmatter;
      const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

      return {
        slug,
        title: frontmatter.title ?? slug,
        date: normalizeDate(frontmatter.date),
        summary: frontmatter.summary ?? "",
        tag: frontmatter.tag,
        published: frontmatter.published ?? true,
        html: processed.toString(),
      };
    })
  );

  return posts
    .filter((post) => post.published)
    .map(({ published: _published, ...post }) => post)
    .sort((left, right) => right.date.localeCompare(left.date));
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIRECTORY, `${slug}.md`);

  try {
    await fs.access(filePath);
  } catch {
    return null;
  }

  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as BlogFrontmatter;
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);

  if (!(frontmatter.published ?? true)) {
    return null;
  }

  return {
    slug,
    title: frontmatter.title ?? slug,
    date: normalizeDate(frontmatter.date),
    summary: frontmatter.summary ?? "",
    tag: frontmatter.tag,
    html: processed.toString(),
  };
}
