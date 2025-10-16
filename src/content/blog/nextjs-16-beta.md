---
title: "Next.js 16 Beta: What’s New and How to Try It"
date: "2025-10-16"
excerpt: "Stable Turbopack, dev filesystem cache, React Compiler, smarter routing, and new caching APIs. A quick overview plus upgrade steps."
author: "Jean Daly"
tags: ["nextjs", "beta", "turbopack", "react-compiler", "routing", "performance"]
---

# Next.js 16 Beta: What’s New and How to Try It

Next.js 16 (beta) focuses on speed and smoother DX. The headline is **Turbopack is stable** and becomes the default bundler. Dev restarts get faster with **filesystem caching**, there’s **stable React Compiler support**, **leaner routing & prefetching**, a new **Build Adapters API (alpha)**, and **improved caching APIs**.

> Official announcement: [Next.js 16 (beta)](https://nextjs.org/blog/next-16-beta)

## TL;DR

- Turbopack (stable) → faster builds and Fast Refresh.
- Filesystem cache in dev → quicker restarts.
- React Compiler support (stable) → automatic memoization.
- Smarter routing/prefetching → less network, snappier transitions.
- Build Adapters API (alpha) → platform hooks into builds.
- Refined caching APIs → tag‑level updates without broad invalidations.

## Upgrade in One Minute

```bash
# Automated upgrade to the beta
npx @next/codemod@canary upgrade beta

# Manual upgrade
npm install next@beta react@latest react-dom@latest

# Start a new project with the beta
npx create-next-app@beta
```

## Turbopack (stable)

Turbopack is now the default for new apps.

- Expect 2–5× faster production builds.
- Expect up to 10× faster Fast Refresh.

Need webpack for custom setups?

```bash
next dev --webpack
next build --webpack
```

### Filesystem Cache in Dev (beta)

Cache compiler artifacts on disk to speed up restarts:

```js
// next.config.mjs
export default {
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}
```

## React Compiler Support (stable)

Built‑in support enables automatic memoization. Install and enable:

```bash
npm install babel-plugin-react-compiler@latest
```

```js
// next.config.mjs
export default {
  reactCompiler: true,
}
```

Note: enabling the compiler can increase compile times since it runs via Babel.

## Routing & Prefetching Improvements

Prefetching is smarter and less redundant:

- **Layout deduplication** when many links share a layout (download once, reuse).
- **Incremental prefetching**: fetch only missing parts, cancel on viewport exit, prioritize on hover.

Result: lighter network usage and snappier transitions—especially for list pages.

## Build Adapters API (alpha)

Let platforms or custom pipelines hook into Next.js builds:

```js
// next.config.mjs
export default {
  experimental: {
    adapterPath: require.resolve('./my-adapter.js'),
  },
}
```

Useful for deployment providers to modify config or post‑process output.

## Caching APIs

Two updates for finer‑grained control:

- `updateTag()` → targeted cache updates.
- Refined `revalidateTag()` semantics.

Keep data fresh without heavy, broad invalidations.

## Breaking Changes & Notes

- **Async params** in routing.
- Updated defaults in **`next/image`**.
- Navigation and caching have subtle changes—review the announcement if you rely on edge cases.

## Recommended Rollout

- Try the beta in a branch; measure with **filesystem cache** and **React Compiler**.
- Keep webpack only if you depend on deep customizations; otherwise, lean into Turbopack.
- Watch the **Build Adapters** ecosystem—it’s early but promising for custom deployments.

—

Further reading: [Next.js 16 (beta)](https://nextjs.org/blog/next-16-beta)