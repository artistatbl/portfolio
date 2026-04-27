import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import type { z } from "zod";

interface MarkdownDocument<TFrontmatter> {
  slug: string;
  frontmatter: TFrontmatter;
  html: string;
}

function isMarkdownFile(fileName: string): boolean {
  return fileName.endsWith(".md");
}

async function renderMarkdown(content: string): Promise<string> {
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content);
  return processed.toString();
}

export async function readMarkdownDirectory<TFrontmatter>(
  directory: string,
  schema: z.ZodSchema<TFrontmatter>
): Promise<Array<MarkdownDocument<TFrontmatter>>> {
  const fileNames = await fs.readdir(directory);

  return Promise.all(
    fileNames.filter(isMarkdownFile).map((fileName) => readMarkdownFile(directory, fileName, schema))
  );
}

export async function readMarkdownFile<TFrontmatter>(
  directory: string,
  fileName: string,
  schema: z.ZodSchema<TFrontmatter>
): Promise<MarkdownDocument<TFrontmatter>> {
  const source = await fs.readFile(path.join(directory, fileName), "utf8");
  const { data, content } = matter(source);
  const parsedFrontmatter = schema.safeParse(data);

  if (!parsedFrontmatter.success) {
    throw new Error(
      `Invalid frontmatter in ${fileName}: ${parsedFrontmatter.error.issues
        .map((issue) => issue.message)
        .join(", ")}`
    );
  }

  return {
    slug: fileName.replace(/\.md$/, ""),
    frontmatter: parsedFrontmatter.data,
    html: await renderMarkdown(content),
  };
}
