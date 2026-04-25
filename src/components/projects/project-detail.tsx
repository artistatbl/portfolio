import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import type { ProjectEntry } from "@/lib/projects";

interface ProjectDetailProps {
  project: ProjectEntry;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  const notes = project.highlights;
  const stack = project.stack;
  const linkItems = [
    project.deployUrl ? { href: project.deployUrl, label: "Live site" } : null,
    project.repoUrl ? { href: project.repoUrl, label: "GitHub repo" } : null,
  ].flatMap((link) => (link ? [link] : []));
  const quickFacts = [
    project.description ? { label: "Type", value: project.description } : null,
    project.platform ? { label: "Platform", value: project.platform } : null,
    project.status ? { label: "Status", value: project.status } : null,
    project.year ? { label: "Year", value: project.year } : null,
  ].flatMap((fact) => (fact ? [fact] : []));

  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <div className="relative z-10 mx-auto w-full max-w-[52rem]">
        <div className="space-y-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.78rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <header className="space-y-6 border-b border-border pb-6">
            <div className="space-y-2">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                Project
              </p>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h1 className="text-[1.8rem] font-semibold tracking-[-0.04em] text-foreground sm:text-[2.2rem]">
                  {project.title}
                </h1>
                {project.year ? (
                  <span className="text-[0.9rem] text-muted-foreground">
                    {project.year}
                  </span>
                ) : null}
              </div>
            </div>
            <p className="max-w-[38rem] text-[0.98rem] leading-8 text-[var(--intro)]">
              {project.summary || project.description || "Project details coming soon."}
            </p>
          </header>

          {project.imageSrc ? (
            <a
              href={project.deployUrl ?? project.repoUrl ?? project.siteUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="group block cursor-pointer"
            >
              <div className="rounded-[1.15rem] bg-[color-mix(in_srgb,var(--muted)_55%,transparent)] p-1 ring-1 ring-black/8 transition-all duration-300 group-hover:ring-black/14 dark:ring-white/12 dark:group-hover:ring-white/20">
                <div className="overflow-hidden rounded-[0.9rem] bg-background">
                  <Image
                    src={project.imageSrc}
                    alt={project.imageAlt ?? `${project.title} preview`}
                    width={1600}
                    height={1000}
                    className="h-auto w-full rounded-[0.9rem] object-cover"
                  />
                </div>
              </div>
            </a>
          ) : null}

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_13rem] lg:items-start">
            <div className="space-y-5">
              <article
                className="prose prose-neutral max-w-none text-[var(--intro)] prose-headings:text-foreground prose-headings:tracking-[-0.02em] prose-headings:font-semibold prose-h2:mt-0 prose-h2:text-[1.02rem] prose-h3:text-[0.95rem] prose-p:text-[0.92rem] prose-p:leading-[1.9] prose-p:tracking-[-0.02em] prose-li:text-[0.9rem] prose-li:leading-[1.8] prose-li:tracking-[-0.02em] prose-strong:text-foreground prose-a:cursor-pointer prose-a:text-foreground prose-a:underline prose-a:decoration-[color-mix(in_srgb,var(--foreground)_20%,transparent)] prose-a:underline-offset-[0.16em] prose-code:rounded-[0.45rem] prose-code:border prose-code:border-border prose-code:bg-[color-mix(in_srgb,var(--muted)_55%,transparent)] prose-code:px-[0.35rem] prose-code:py-[0.1rem] prose-code:font-mono prose-code:text-[0.84em] prose-code:before:content-none prose-code:after:content-none prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground dark:prose-invert dark:prose-headings:text-foreground dark:prose-strong:text-foreground dark:prose-a:text-foreground dark:prose-code:text-foreground"
                dangerouslySetInnerHTML={{ __html: project.html }}
              />
            </div>

            <aside className="space-y-8 lg:pt-1">
              {linkItems.length ? (
                <div className="space-y-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Links
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {linkItems.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex cursor-pointer items-center text-[0.78rem] text-foreground underline decoration-[color-mix(in_srgb,var(--foreground)_18%,transparent)] underline-offset-[0.22em] transition-colors hover:text-muted-foreground"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {quickFacts.length ? (
                <div className="space-y-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Quick Facts
                  </p>
                  <div className="space-y-3">
                    {quickFacts.map((fact) => (
                      <div key={fact.label} className="space-y-1">
                        <span className="block text-[0.68rem] uppercase tracking-[0.1em] text-muted-foreground">
                          {fact.label}
                        </span>
                        <span className="block text-[0.82rem] leading-5 text-foreground">
                          {fact.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {stack.length ? (
                <div className="space-y-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Stack
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {stack.map((stackItem) => (
                      <span
                        key={stackItem}
                        className="rounded-full bg-muted/45 px-2.5 py-1 text-[0.72rem] text-muted-foreground"
                      >
                        {stackItem}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {notes.length ? (
                <div className="space-y-3">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Highlights
                  </p>
                  <div className="space-y-3">
                    {notes.map((point, index) => (
                      <div
                        key={point}
                        className="grid grid-cols-[1.4rem_minmax(0,1fr)] gap-3"
                      >
                        <span className="pt-0.5 text-[0.68rem] font-semibold text-muted-foreground">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <p className="text-[0.8rem] leading-5 text-foreground">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </aside>
          </div>
        </div>
      </div>
    </main>
  );
}
