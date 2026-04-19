---
title: Dves
summary: A fast AI chat app built in five days as a hackathon submission inspired by Theo's T3Chat, focused on multi-model chat, streaming, and a polished daily-use interface.
description: Hackathon AI chat app
year: 2025
status: Live
platform: Web app
siteUrl: https://www.dves.space
deployUrl: https://www.dves.space
repoUrl: https://github.com/artistatbl/t3chat
imageSrc: /dves.png
imageAlt: Dves chat interface
stack:
  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS 4
  - Vercel AI SDK
  - OpenAI
  - Google Gemini
  - OpenRouter
  - Convex
  - Clerk
  - Hono
  - jstack
  - UploadThing
highlights:
  - Built in 5 days as a hackathon submission around the T3Chat challenge, with a strong focus on speed and polish under tight time pressure.
  - Supports multi-provider AI chat, streaming responses, branching conversations, uploads, pinned chats, and model switching in one interface.
  - Ships as a real deployed product with authentication, realtime chat state, local API key support, and public hosting on a custom domain.
published: true
---

## What It Is

Dves is a modern AI chat app built as a hackathon submission inspired by Theo's T3Chat. It is not presented like a rough prototype; the repo shows a serious attempt to build a chat product that feels fast, practical, and pleasant to use in everyday workflows.

The most impressive part is the build speed behind it. According to the project context, this version was put together in **five days**, which makes the overall feature depth and polish stand out even more as a portfolio project.

## What It Does

- Lets users chat with different AI providers from one interface.
- Streams responses live instead of waiting for full completions.
- Supports conversation branching, pinned chats, chat history, and message controls.
- Includes file upload flows and richer message rendering for a more capable chat experience.
- Exposes user settings for models, providers, and API-key-based workflows.

## How It Is Built

The repo is built on **Next.js 15**, **React 19**, and **TypeScript**, with the interface layer styled through **Tailwind CSS**. For the AI layer, it uses the **Vercel AI SDK** together with provider integrations for **OpenAI**, **Google Gemini**, and **OpenRouter**.

For product infrastructure, the codebase uses **Clerk** for authentication and **Convex** for backend and realtime data handling. It also includes **Hono** and **jstack** in the stack, which fits the broader architecture style used across some of your other projects.

## Product And UX Structure

From the repository structure and README, Dves is clearly designed around the feeling of a full chat product rather than a single demo prompt box.

The app includes:

- a chat surface with streaming responses
- sidebar and history patterns for returning to previous conversations
- branching and pinned-chat workflows
- settings and model/provider switching
- richer message utilities and controls
- upload support for broader prompt workflows

That combination matters because it shows product thinking, not just API integration. The repo is trying to solve how an AI chat app should actually feel in daily use.

## AI And Realtime Layer

One of the stronger technical signals in Dves is the combination of multiple model providers with a realtime backend. That makes it easier to support fast updates in the interface while keeping the app open to different model choices instead of locking the product to one provider.

The stack also suggests a practical user-facing balance:

- **Vercel AI SDK** for streaming and provider abstraction
- **Convex** for synced backend state and realtime flows
- **Clerk** for a smoother signed-in product layer
- provider support across **OpenAI**, **Gemini**, and **OpenRouter**

So even though the project came out of a hackathon context, it is built in a way that could keep growing after the event.

## Why It Stands Out

Dves stands out because it captures a hard combination well:

- hackathon speed
- polished interface work
- multi-provider AI integration
- product-style chat workflows
- real deployment on a custom domain

It also tells a strong story in a portfolio because the project was built as a submission inspired by an existing well-known AI chat product, then turned into something that still feels distinctly crafted and personal.

## Deployment

The live project is available at **www.dves.space**.

As verified on **April 19, 2026**, `dves.space` redirects to `www.dves.space`, and the live domain responds through **Vercel**. That lines up with the repo feeling like a real public deployment rather than just a local hackathon code dump.
