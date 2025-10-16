---
title: "Next.js 16 Beta: Highlights and How to Try It"
date: "2025-10-16"
excerpt: "Turbopack is now stable, filesystem caching lands in dev, React Compiler support is stable, routing is leaner, and new caching APIs arrive. Here’s what’s new and how to enable it."
author: "Jean Daly"
tags: ["nextjs", "beta", "turbopack", "react-compiler", "routing", "performance"]
---

# Next.js 16 Beta: Highlights and How to Try It

Next.js 16 (beta) brings a big wave of performance and DX upgrades. The headline: **Turbopack is stable** and now the default bundler, with dramatically faster Fast Refresh and builds. Development restarts get quicker too thanks to **filesystem caching in dev**. There’s **stable React Compiler support** to automatically memoize components, a brand-new **Build Adapters API (alpha)**, **leaner routing and prefetching**, and improved caching APIs.

> Source: the official announcement — [Next.js 16 (beta)](https://nextjs.org/blog/next-16-beta)

## Quick Start: Upgrade Commands

You can upgrade with the automated codemod or manually:

```bash
# Automated upgrade to the beta
npx @next/codemod@canary upgrade beta

# Manual upgrade
npm install next@beta react@latest react-dom@latest

# Start a new project with the beta
npx create-next-app@beta
```

## Turbopack (stable)

Turbopack is now stable and the default bundler for new apps. Expect:

- 2–5× faster production builds
- Up to 10× faster Fast Refresh

If you need to keep webpack for a custom setup, you can still run:

```bash
next dev --webpack
next build --webpack
```

### Filesystem caching in dev (beta)

Speed up dev restarts by caching compiler artifacts on disk:

```js
// next.config.mjs
export default {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}
```

## React Compiler Support (stable)

Next.js 16 includes built-in support for the React Compiler to auto-memoize components. Enable it and install the plugin:

```bash
npm install babel-plugin-react-compiler@latest
```

```js
// next.config.mjs
export default {
  reactCompiler: true,
}
```

Note: enabling the compiler can increase compile times as it relies on Babel.

## Enhanced Routing and Prefetching

Routing got leaner and smarter:

- **Layout deduplication** when prefetching many links that share a layout (download once, reuse).
- **Incremental prefetching**: only fetch parts not already cached, cancel when links leave the viewport, prioritize on hover.

Result: lighter network usage and snappier transitions for list-heavy pages.

## Build Adapters API (alpha)

Platforms and custom build pipelines can hook into Next.js builds via adapters:

```js
// next.config.mjs
export default {
  experimental: {
    adapterPath: require.resolve('./my-adapter.js'),
  },
}
```

This enables deployment platforms to modify configuration or post-process build output.

## Improved Caching APIs

Two notable updates aimed at fine-grained cache control:

- `updateTag()` for targeted cache updates
- refined `revalidateTag()` behavior

These help keep data fresh without broad invalidations.

## Breaking Changes and Notes

- **Async params** in routing
- **`next/image` defaults** updated
- Expect some subtle behavior changes in navigation and caching; review the announcement and upgrade notes if you rely on edge cases.

## Why this matters

Next.js 16 focuses on performance at the core build loop, smarter routing, and practical caching controls. For teams with large apps or developer workflows that value fast iteration, the beta already feels meaningfully quicker.

## My advice

- Try the beta in a branch; enable **filesystem caching** and **React Compiler** to measure real gains.
- Keep webpack only if you have heavy customizations; otherwise, lean into Turbopack.
- Watch the **Build Adapters** ecosystem — it’s early but promising for custom deployments.

—

If you want to dive deeper, read the official post: [Next.js 16 (beta)](https://nextjs.org/blog/next-16-beta).