import { NextResponse } from "next/server";

import { getGitHubActivity } from "@/lib/github-contributions";

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const username = url.searchParams.get("username") || process.env.GITHUB_USERNAME || "artistatbl";
    const windowDays = Number(url.searchParams.get("days") || "30") || 30;

    const activity = await getGitHubActivity(username, windowDays);

    return NextResponse.json(activity);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
