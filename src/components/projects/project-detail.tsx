import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

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
  const primaryImageHref = project.deployUrl ?? project.repoUrl ?? project.siteUrl;

  return (
    <main className="relative min-h-screen overflow-x-hidden px-5 py-8 text-foreground sm:px-8 md:px-10 md:py-12">
      <div className="relative z-10 mx-auto w-full max-w-[46rem]">
        <div className="space-y-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[0.78rem] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft size={14} />
            Back to home
          </Link>

          <header className="space-y-5">
            <div className="space-y-3">
              <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Project
              </p>
              <div className="space-y-2">
                <h1 className="text-[2.1rem] font-semibold tracking-[-0.055em] text-foreground sm:text-[2.85rem]">
                  {project.title}
                </h1>
                <p className="max-w-[40rem] text-[0.98rem] leading-8 text-[var(--intro)]">
                  {project.summary || project.description || "Project details coming soon."}
                </p>
              </div>
            </div>
          </header>

          <section className="space-y-8">
            {(project.imageSrc || quickFacts.length || stack.length || notes.length) ? (
              <div className="space-y-8">
                {project.imageSrc ? (
                  <div>
                    <a
                      href={primaryImageHref}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="group block cursor-pointer"
                    >
                      <div className="overflow-hidden rounded-[0.9rem] bg-[color-mix(in_srgb,var(--muted)_12%,transparent)] transition-opacity duration-300 group-hover:opacity-95">
                        <Image
                          src={project.imageSrc}
                          alt={project.imageAlt ?? `${project.title} preview`}
                          width={1600}
                          height={1000}
                          className="h-auto w-full object-cover"
                        />
                      </div>
                    </a>
                  </div>
                ) : null}

                {quickFacts.length ? (
                  <div className="space-y-4">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Overview
                    </p>
                    <div className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                      {quickFacts.map((fact) => (
                        <div
                          key={fact.label}
                          className="space-y-1.5"
                        >
                          <span className="block text-[0.66rem] uppercase tracking-[0.12em] text-muted-foreground">
                            {fact.label}
                          </span>
                          <span className="block text-[0.9rem] leading-7 text-foreground">
                            {fact.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}

                {stack.length ? (
                  <div className="space-y-4">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Stack
                    </p>
                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                      {stack.map((stackItem) => (
                        <span
                          key={stackItem}
                          className="text-[0.82rem] text-muted-foreground"
                        >
                          {stackItem}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {notes.length ? (
                  <div className="space-y-4">
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                      Highlights
                    </p>
                    <div className="grid gap-x-8 gap-y-5 sm:grid-cols-3">
                      {notes.map((point, index) => (
                        <div
                          key={point}
                          className="space-y-2"
                        >
                          <span className="block text-[0.68rem] font-semibold text-muted-foreground">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <p className="text-[0.86rem] leading-7 text-foreground">
                            {point}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <p className="text-[0.8rem] font-medium text-foreground">
                  README.md
                </p>
                <p className="text-[0.74rem] text-muted-foreground">
                  Project notes
                </p>
              </div>

              <article
                className="prose prose-neutral max-w-none text-[var(--intro)] prose-headings:text-foreground prose-headings:tracking-[-0.02em] prose-headings:font-semibold prose-h2:mt-0 prose-h2:text-[1.08rem] prose-h2:scroll-mt-20 prose-h3:text-[0.95rem] prose-p:text-[0.92rem] prose-p:leading-[1.9] prose-p:tracking-[-0.02em] prose-li:text-[0.9rem] prose-li:leading-[1.8] prose-li:tracking-[-0.02em] prose-strong:text-foreground prose-a:cursor-pointer prose-a:text-foreground prose-a:underline prose-a:decoration-[color-mix(in_srgb,var(--foreground)_20%,transparent)] prose-a:underline-offset-[0.16em] prose-code:rounded-[0.45rem] prose-code:border prose-code:border-border prose-code:bg-[color-mix(in_srgb,var(--muted)_55%,transparent)] prose-code:px-[0.35rem] prose-code:py-[0.1rem] prose-code:font-mono prose-code:text-[0.84em] prose-code:before:content-none prose-code:after:content-none prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-muted-foreground dark:prose-invert dark:prose-headings:text-foreground dark:prose-strong:text-foreground dark:prose-a:text-foreground dark:prose-code:text-foreground"
                dangerouslySetInnerHTML={{ __html: project.html }}
              />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
