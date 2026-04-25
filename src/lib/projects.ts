import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const PROJECT_DIRECTORY = path.join(process.cwd(), "content", "projects");

interface ProjectFrontmatter {
  title?: string;
  summary?: string;
  description?: string;
  year?: string | number;
  status?: string;
  platform?: string;
  siteUrl?: string;
  deployUrl?: string;
  repoUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
  stack?: string[];
  highlights?: string[];
  published?: boolean;
}

export interface ProjectEntry {
  slug: string;
  title: string;
  summary: string;
  description: string;
  year: string;
  status?: string;
  platform?: string;
  siteUrl?: string;
  deployUrl?: string;
  repoUrl?: string;
  imageSrc?: string;
  imageAlt?: string;
  stack: string[];
  highlights: string[];
  html: string;
}

async function readProjectEntry(fileName: string): Promise<ProjectEntry & { published: boolean }> {
  const slug = fileName.replace(/\.md$/, "");
  const source = await fs.readFile(path.join(PROJECT_DIRECTORY, fileName), "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as ProjectFrontmatter;
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(content);

  return {
    slug,
    title: frontmatter.title ?? slug,
    summary: frontmatter.summary ?? "",
    description: frontmatter.description ?? "",
    year: normalizeYear(frontmatter.year),
    status: frontmatter.status,
    platform: frontmatter.platform,
    siteUrl: frontmatter.siteUrl,
    deployUrl: frontmatter.deployUrl,
    repoUrl: frontmatter.repoUrl,
    imageSrc: frontmatter.imageSrc,
    imageAlt: frontmatter.imageAlt,
    stack: frontmatter.stack ?? [],
    highlights: frontmatter.highlights ?? [],
    published: frontmatter.published ?? true,
    html: processed.toString(),
  };
}

function isMarkdownFile(fileName: string) {
  return fileName.endsWith(".md");
}

function normalizeYear(value: string | number | undefined) {
  if (typeof value === "number") {
    return String(value);
  }

  return value ?? "";
}

export async function getProjectEntries(): Promise<ProjectEntry[]> {
  const fileNames = await fs.readdir(PROJECT_DIRECTORY);

  const entries = await Promise.all(
    fileNames.filter(isMarkdownFile).map((fileName) => readProjectEntry(fileName))
  );

  return entries
    .filter((entry) => entry.published)
    .map(({ published: _published, ...entry }) => entry);
}

export async function getProjectEntry(slug: string): Promise<ProjectEntry | null> {
  const filePath = path.join(PROJECT_DIRECTORY, `${slug}.md`);

  try {
    await fs.access(filePath);
  } catch {
    return null;
  }

  const entry = await readProjectEntry(`${slug}.md`);

  if (!entry.published) {
    return null;
  }

  const { published: _published, ...project } = entry;
  return project;
}
