---
title: Featul
summary: A privacy-first customer feedback platform that brings requests, roadmaps, changelogs, and public product communication into one system.
description: Privacy-first customer feedback platform
year: 2026
status: Live
platform: Web app + marketing site
siteUrl: https://www.featul.com
deployUrl: https://www.featul.com
repoUrl: https://github.com/usefeatul/featul
imageSrc: /featul.png
imageAlt: Featul product interface
stack:
  - Next.js 16
  - React 19
  - TypeScript
  - Turborepo
  - Bun workspaces
  - Tailwind CSS 4
  - Better Auth
  - Drizzle ORM
  - Postgres / Neon
  - Stripe
  - Upstash Redis
  - PostHog
  - Sentry
highlights:
  - Built because most open-source customer feedback platforms feel outdated, and Featul aims to bring a fresh, modern open-source alternative to the space.
  - Combines feedback collection, public roadmaps, changelogs, workspace settings, and customer communication in one product.
  - Uses a shared monorepo architecture so the product app and marketing/docs site can reuse API, auth, db, UI, and editor packages.
  - Includes production-grade integrations for billing, analytics, error monitoring, issue sync, passkeys, and content/SEO workflows.
published: true
---

## What It Is

Featul is a privacy-first customer feedback platform built for teams that want to collect user requests, organise product decisions, publish a roadmap, and close the loop with changelog updates in one place.

Rather than treating feedback as a loose inbox, Featul is structured like a product operating system: it gives teams a way to collect ideas, connect them to roadmap work, manage workspace settings and members, and communicate progress publicly.

## Why I'm Building Featul

I decided to build Featul because a lot of open-source customer feedback platforms feel old, both in product direction and in interface quality.

Many of the OSS options available today feel dated, and I wanted to create something that feels more current, more thoughtful, and more in tune with how modern teams want to collect and manage feedback.

Featul is my way of bringing a fresh twist to the customer feedback space: a product that feels modern, open source, and more exciting than the tools that already exist.

It is also being built toward a full release planned for May, which makes this project feel less like an experiment and more like a real product I want to keep pushing forward.

## What It Does

- Collects feature requests, bugs, and feedback through boards and submission flows.
- Supports public roadmaps and changelog pages that can be exposed on workspace subdomains.
- Handles signed-in workspace management, onboarding, invites, branding, and settings.
- Includes widget routes and embedded feedback flows.
- Runs a separate marketing/docs/blog site for acquisition, education, and conversion.

## How It Is Built

Featul is built as a **Turbo monorepo** using **Bun workspaces**, with two main applications and a set of shared internal packages.

The main product experience lives in `apps/app`, which is a **Next.js 16** app-router application using **React 19** and **TypeScript**. That app covers the signed-in dashboard, auth flows, workspaces, requests, roadmap and changelog routes, widget endpoints, and public workspace-facing pages.

The public site lives in `apps/web`, also on **Next.js 16**, and handles the landing page, docs, blog, pricing, legal content, integrations pages, use cases, glossary pages, and SEO-driven tools and content templates.

## Monorepo Structure

One of the most interesting parts of Featul is how much logic is pushed into shared packages instead of being trapped in one app.

The repository includes:

- `@featul/api` for routers, validators, services, and client utilities
- `@featul/auth` for Better Auth setup, billing hooks, session logic, trusted origins, and workspace auth rules
- `@featul/db` for the Drizzle schema, migrations, scripts, and database access layer
- `@featul/editor` for shared editor primitives
- `@featul/ui` for reusable interface components, icons, hooks, and styles

That structure makes Featul feel like a product platform rather than a single-page app, because the product and the public site are both powered by the same shared system.

## Product Architecture

From the repo, Featul is clearly designed around a few major product surfaces:

- internal workspace dashboards for managing product feedback
- public-facing boards, roadmaps, and changelogs
- onboarding, invite, reserve, and workspace setup flows
- embeddable widget routes
- a marketing/docs/blog surface built for growth and education

This means the codebase is solving both product operations and product distribution at the same time: the internal tool for managing feedback, and the public web layer for turning that work into a visible customer experience.

## Tech And Integrations

Featul uses **Better Auth**, **Drizzle ORM**, and **Postgres/Neon** for core product data and authentication. The environment and package setup also show integration work for:

- **Stripe** for billing
- **Upstash Redis** for rate limiting and supporting services
- **PostHog** for analytics
- **Sentry** for monitoring
- **GitHub App** integration for issue sync
- **passkeys** for auth flows
- **Marble CMS** for website/blog content on the public site

That makes the project feel much closer to a production SaaS product than a simple MVP.

## Data And Domain Modeling

The database package includes schema areas for feedback, comments, votes, changelog, branding, integrations, plans, reservations, posts, and workspaces. Even at a glance, that tells you the product is modeling the full lifecycle of feedback:

- capturing requests
- organising them inside workspaces
- prioritising and connecting them to roadmap work
- publishing updates back out to users

This is exactly the kind of domain depth that makes a project strong in a portfolio, because the codebase reflects actual product thinking rather than just UI polish.

## Deployment

The live public site is available at **www.featul.com**, and the repo also references the dashboard host at **app.featul.com**.

As verified on **April 18, 2026**, the live Featul domain responds through **Vercel**. The repository root also includes a `vercel.json`, which lines up with the deployment signal from the live site.

So the clearest production summary is:

- **Public site:** `https://www.featul.com`
- **Product app host referenced in env:** `https://app.featul.com`
- **Current live hosting signal:** Vercel

## Why It Stands Out

Featul stands out because it is not just a feedback widget or roadmap page. It is a full product system with:

- a structured feedback workflow
- public product communication surfaces
- shared internal platform packages
- real billing, auth, analytics, and monitoring integrations
- a serious acquisition layer through docs, blog, integrations, tools, and SEO pages

That combination makes it a very strong portfolio project because it shows product design, application architecture, growth thinking, and platform engineering all in the same repo.
