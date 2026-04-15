type ContributionDay = {
  date: string;
  count: number;
  level: number;
  repositories?: string[];
};

type PublicApiDay = {
  date: string;
  contributionCount?: number;
  count?: number;
  contributionLevel?: string;
};

type PublicApiResponse = {
  contributions?: PublicApiDay[][];
  data?: PublicApiDay[][];
};

function toLevelFromCount(count: number) {
  if (count >= 10) return 4;
  if (count >= 6) return 3;
  if (count >= 3) return 2;
  if (count >= 1) return 1;
  return 0;
}

function normalizeContributionLevel(level?: string, count = 0) {
  if (level === "FOURTH_QUARTILE") return 4;
  if (level === "THIRD_QUARTILE") return 3;
  if (level === "SECOND_QUARTILE") return 2;
  if (level === "FIRST_QUARTILE") return 1;
  return toLevelFromCount(count);
}

function isoDate(date: Date) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}-${String(
    date.getUTCDate()
  ).padStart(2, "0")}`;
}

function buildRequestedDays(windowDays: number) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  return Array.from({ length: windowDays }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - (windowDays - 1 - index));
    return isoDate(date);
  });
}

async function fetchViaGraphQL(username: string, token: string): Promise<ContributionDay[]> {
  const now = new Date();
  const from = new Date(now);
  from.setUTCDate(now.getUTCDate() - 365);

  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: {
        login: username,
        from: from.toISOString(),
        to: now.toISOString(),
      },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub GraphQL failed with ${res.status}`);
  }

  const json = (await res.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            weeks?: Array<{
              contributionDays: Array<{
                date: string;
                contributionCount: number;
                contributionLevel?: string;
              }>;
            }>;
          };
        };
      };
    };
  };

  const weeks = json.data?.user?.contributionsCollection?.contributionCalendar?.weeks ?? [];

  return weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: normalizeContributionLevel(day.contributionLevel, day.contributionCount),
    }))
  );
}

async function fetchViaScrape(username: string): Promise<ContributionDay[]> {
  const res = await fetch(`https://github.com/users/${username}/contributions`, {
    headers: { "User-Agent": "portfolio-app" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`GitHub scrape failed with ${res.status}`);
  }

  const html = await res.text();
  const regex =
    /<rect[^>]*data-date="([^"]+)"[^>]*data-count="([^"]+)"(?:[^>]*data-level="([^"]+)")?[^>]*>/g;
  const days: ContributionDay[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(html)) !== null) {
    const date = match[1];
    if (!date) continue;

    const count = Number(match[2]) || 0;
    const level = Number(match[3]) || toLevelFromCount(count);
    days.push({ date, count, level });
  }

  return days;
}

async function fetchViaPublicApi(username: string): Promise<ContributionDay[]> {
  const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
    headers: { "User-Agent": "portfolio-app" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Public contributions API failed with ${res.status}`);
  }

  const json = (await res.json()) as PublicApiResponse;
  const weeks = json.contributions ?? json.data ?? [];

  return weeks.flatMap((week) =>
    week.map((day) => {
      const count = Number(day.contributionCount ?? day.count) || 0;

      return {
        date: day.date,
        count,
        level: normalizeContributionLevel(day.contributionLevel, count),
      };
    })
  );
}

async function fetchContributionDays(username: string) {
  const token = process.env.GITHUB_TOKEN;

  if (token) {
    try {
      return await fetchViaGraphQL(username, token);
    } catch {
      // fall through to public scrape and public API
    }
  }

  try {
    return await fetchViaScrape(username);
  } catch {
    return fetchViaPublicApi(username);
  }
}

async function fetchRecentPublicPushRepos(username: string, windowDays: number) {
  const token = process.env.GITHUB_TOKEN;
  const cutoff = new Date();
  cutoff.setUTCDate(cutoff.getUTCDate() - (windowDays - 1));
  cutoff.setUTCHours(0, 0, 0, 0);

  const headers: HeadersInit = {
    "User-Agent": "portfolio-app",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const reposByDate = new Map<string, Set<string>>();

  try {
    for (let page = 1; page <= 3; page++) {
      const res = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`,
        {
          headers,
          next: { revalidate: 3600 },
        }
      );

      if (!res.ok) {
        break;
      }

      const events = (await res.json()) as Array<{
        type?: string;
        created_at?: string;
        repo?: { name?: string };
      }>;

      if (events.length === 0) {
        break;
      }

      let reachedOlderEvents = false;

      for (const event of events) {
        if (!event.created_at) {
          continue;
        }

        const eventDate = new Date(event.created_at);
        if (eventDate < cutoff) {
          reachedOlderEvents = true;
          continue;
        }

        if (event.type !== "PushEvent") {
          continue;
        }

        const date = event.created_at.slice(0, 10);
        const repoName = event.repo?.name?.split("/").pop();

        if (!repoName) {
          continue;
        }

        if (!reposByDate.has(date)) {
          reposByDate.set(date, new Set());
        }

        reposByDate.get(date)?.add(repoName);
      }

      if (reachedOlderEvents) {
        break;
      }
    }
  } catch {
    return reposByDate;
  }

  return reposByDate;
}

export async function getGitHubActivity(username: string, windowDays = 30) {
  const requestedDays = buildRequestedDays(windowDays);
  const [liveDays, reposByDate] = await Promise.all([
    fetchContributionDays(username),
    fetchRecentPublicPushRepos(username, windowDays),
  ]);
  const liveDayMap = new Map(liveDays.map((day) => [day.date, day]));

  const days = requestedDays.map((date) => {
    const liveDay = liveDayMap.get(date);
    const repositories = Array.from(reposByDate.get(date) ?? []);

    return {
      ...(liveDay ?? {
        date,
        count: 0,
        level: 0,
      }),
      repositories,
    };
  });

  return {
    username,
    total: days.reduce((sum, day) => sum + day.count, 0),
    days,
  };
}
