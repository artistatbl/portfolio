import { NextResponse } from "next/server"
export const dynamic = "force-dynamic"

type Day = { date: string; count: number; level: number }

async function fetchViaGraphQL(
  username: string,
  token: string,
  start: string,
  end: string
): Promise<Day[]> {
  const query = `
    query($login: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays { date contributionCount color }
            }
          }
        }
      }
    }
  `

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
        from: `${start}T00:00:00Z`,
        to: `${end}T23:59:59Z`,
      },
    }),
    cache: "no-store",
  })

  if (!res.ok) throw new Error(await res.text())
  const json = await res.json()
  const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []
  const days: Day[] = []
  for (const w of weeks) {
    for (const d of w.contributionDays) {
      const count = d.contributionCount || 0
      // GitHub colors are already bucketed; derive an integer level [0..4]
      const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4
      days.push({ date: d.date, count, level })
    }
  }
  return days
}

async function fetchViaScrape(username: string, start: string, end: string): Promise<Day[]> {
  const headers = {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    Referer: "https://github.com/",
  }
  const res = await fetch(
    `https://github.com/users/${username}/contributions?from=${start}&to=${end}`,
    { cache: "no-store", headers }
  )
  if (!res.ok) throw new Error(await res.text())
  const html = await res.text()

  const rectRegexDouble = /<rect[^>]*data-date="([^"]+)"[^>]*data-count="([^"]+)"[^>]*data-level="([^"]+)"[^>]*>/g
  const rectRegexSingle = /<rect[^>]*data-date='([^']+)'[^>]*data-count='([^']+)'[^>]*data-level='([^']+)'[^>]*>/g
  const rectRegexNoLevelDouble = /<rect[^>]*data-date="([^"]+)"[^>]*data-count="([^"]+)"[^>]*>/g
  const rectRegexNoLevelSingle = /<rect[^>]*data-date='([^']+)'[^>]*data-count='([^']+)'[^>]*>/g
  const days: Day[] = []
  let match: RegExpExecArray | null
  // Try multiple patterns to be resilient to markup variations
  while ((match = rectRegexDouble.exec(html)) !== null) {
    const date = match[1]
    const count = Number(match[2]) || 0
    const level = Number(match[3]) || (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4)
    days.push({ date, count, level })
  }
  while ((match = rectRegexSingle.exec(html)) !== null) {
    const date = match[1]
    const count = Number(match[2]) || 0
    const level = Number(match[3]) || (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4)
    days.push({ date, count, level })
  }
  if (days.length === 0) {
    while ((match = rectRegexNoLevelDouble.exec(html)) !== null) {
      const date = match[1]
      const count = Number(match[2]) || 0
      const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4
      days.push({ date, count, level })
    }
  }
  if (days.length === 0) {
    while ((match = rectRegexNoLevelSingle.exec(html)) !== null) {
      const date = match[1]
      const count = Number(match[2]) || 0
      const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4
      days.push({ date, count, level })
    }
  }

  // If nothing parsed (GitHub may change markup for ranges), try default page without params
  if (days.length === 0) {
    const res2 = await fetch(`https://github.com/users/${username}/contributions`, { cache: "no-store", headers })
    if (res2.ok) {
      const html2 = await res2.text()
      let m: RegExpExecArray | null
      while ((m = rectRegexDouble.exec(html2)) !== null) {
        const date = m[1]
        const count = Number(m[2]) || 0
        const level = Number(m[3]) || (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4)
        days.push({ date, count, level })
      }
      while ((m = rectRegexSingle.exec(html2)) !== null) {
        const date = m[1]
        const count = Number(m[2]) || 0
        const level = Number(m[3]) || (count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4)
        days.push({ date, count, level })
      }
      if (days.length === 0) {
        while ((m = rectRegexNoLevelDouble.exec(html2)) !== null) {
          const date = m[1]
          const count = Number(m[2]) || 0
          const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4
          days.push({ date, count, level })
        }
      }
      if (days.length === 0) {
        while ((m = rectRegexNoLevelSingle.exec(html2)) !== null) {
          const date = m[1]
          const count = Number(m[2]) || 0
          const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4
          days.push({ date, count, level })
        }
      }
    }
  }
  return days
}

// Public fallback API that returns daily counts for the last year.
// If the service returns a range, we’ll filter by our requested dates.
async function fetchViaPublicAPI(username: string, start: string, end: string): Promise<Day[]> {
  try {
    const res = await fetch(`https://github-contributions-api.deno.dev/${username}.json`, {
      cache: "no-store",
      headers: { "User-Agent": "portfolio-app" },
    })
    if (!res.ok) return []
    const json = await res.json()
    const list: { date: string; count: number }[] = json?.contributions || json?.data || []
    const startDate = new Date(`${start}T00:00:00Z`)
    const endDate = new Date(`${end}T23:59:59Z`)
    const days: Day[] = []
    for (const item of list) {
      const d = new Date(item.date)
      if (d >= startDate && d <= endDate) {
        const count = Number(item.count) || 0
        const level = count === 0 ? 0 : count < 3 ? 1 : count < 6 ? 2 : count < 10 ? 3 : 4
        days.push({ date: item.date, count, level })
      }
    }
    return days
  } catch {
    return []
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const usernameParam = url.searchParams.get("username") || undefined
    const username = usernameParam || process.env.GITHUB_USERNAME || "dalyjean"
    const token = process.env.GITHUB_TOKEN
    const yearParam = url.searchParams.get("year")
    const now = new Date()
    const year = yearParam ? Number(yearParam) || now.getFullYear() : now.getFullYear()
    const start = `${year}-01-01`
    const end = `${year}-12-31`

    let days: Day[] = []
    if (token) {
      try {
        days = await fetchViaGraphQL(username, token, start, end)
      } catch {
        // fallback to scrape if GraphQL fails
        days = await fetchViaScrape(username, start, end)
      }
    } else {
      days = await fetchViaScrape(username, start, end)
    }

    // If still empty, attempt public API fallback
    if (days.length === 0) {
      const alt = await fetchViaPublicAPI(username, start, end)
      if (alt.length) days = alt
    }

    // Sort by date ascending
    days.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))
    const total = days.reduce((sum, d) => sum + d.count, 0)

    return NextResponse.json({ username, year, total, days })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Unknown error" }, { status: 500 })
  }
}