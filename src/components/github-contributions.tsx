"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { CheckIcon } from "lucide-react"

type Day = { date: string; count: number; level: number }
type Payload = { username: string; total: number; days: Day[] }

const levelClass = (level: number) => `github-level-${Math.max(0, Math.min(4, level))}`

const parseDate = (s: string) => {
  const [y, m, d] = s.split("-").map(Number)
  return new Date(y, m - 1, d)
}
const fmtMonth = (d: Date) => d.toLocaleString(undefined, { month: "short" })

function computeStreaks(days: Day[]) {
  let longest = 0
  let chain = 0
  for (const d of days) {
    if (d.count > 0) {
      chain++
      if (chain > longest) longest = chain
    } else {
      chain = 0
    }
  }
  let current = 0
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i]?.count > 0) current++
    else break
  }
  const maxDay = days.reduce((m, d) => Math.max(m, d.count), 0)
  const activeDays = days.filter((d) => d.count > 0).length
  return { longest, current, maxDay, activeDays }
}

export default function GitHubContributions() {
  const [data, setData] = useState<Payload | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const currentYear = new Date().getFullYear()
  const [year, setYear] = useState<number>(currentYear)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`/api/github/contributions?year=${year}`)
        if (!res.ok) throw new Error(await res.text())
        const json = (await res.json()) as Payload
        setData(json)
      } catch (e: any) {
        setError(e?.message || "Failed to load contributions")
      } finally {
        setLoading(false)
      }
    }
    setLoading(true)
    setError(null)
    load()
  }, [year])

  // Arrange days into weeks starting on Sunday, include month labels
  const { weeks, monthLabels } = useMemo(() => {
    const days = data?.days || []
    if (!days.length) return { weeks: [] as Day[][], monthLabels: [] as (string | null)[] }

    const byDate = new Map<string, Day>()
    for (const d of days) byDate.set(d.date, d)

    const first = parseDate(days[0].date)
    const last = parseDate(days[days.length - 1].date)

    const start = new Date(first)
    while (start.getDay() !== 0) start.setDate(start.getDate() - 1) // back to Sunday
    const end = new Date(last)
    while (end.getDay() !== 6) end.setDate(end.getDate() + 1) // forward to Saturday

    const weeks: Day[][] = []
    const monthLabels: (string | null)[] = []
    let cursor = new Date(start)
    let prevMonth = -1
    while (cursor <= end) {
      const col: Day[] = []
      const weekStart = new Date(cursor)
      const labelMonth = weekStart.getMonth()
      const showLabel = labelMonth !== prevMonth
      monthLabels.push(showLabel ? fmtMonth(weekStart) : null)
      prevMonth = labelMonth

      for (let i = 0; i < 7; i++) {
        const iso = `${cursor.getFullYear()}-${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}`
        const found = byDate.get(iso)
        col.push(found ?? { date: iso, count: 0, level: 0 })
        cursor.setDate(cursor.getDate() + 1)
      }
      weeks.push(col)
    }
    return { weeks, monthLabels }
  }, [data])

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <span>GitHub Activity</span>
        </CardTitle>
        <CardDescription>
          Contributions in {year} for {data?.username ?? "…"}
        </CardDescription>
        <CardAction>
          <div className="flex items-center gap-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="min-w-[90px] justify-between">
                  {year}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent sideOffset={8} className="w-[160px]">
                <DropdownMenuLabel>Select year</DropdownMenuLabel>
                {Array.from({ length: 7 }, (_, i) => currentYear - i).map((y) => (
                  <DropdownMenuItem key={y} onClick={() => setYear(y)}>
                    <span className="mr-2 inline-block w-4 text-muted-foreground">
                      {y === year ? <CheckIcon className="size-4" /> : null}
                    </span>
                    {y}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            {data?.username && (
              <a
                href={`https://github.com/users/${data.username}/contributions?from=${year}-01-01&to=${year}-12-31`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline-offset-4 hover:underline text-muted-foreground"
              >
                View on GitHub
              </a>
            )}
          </div>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-4">
        {loading && (
          <div className="space-y-3">
            <div className="text-muted-foreground text-sm">Loading contributions…</div>
            <div className="overflow-x-auto">
              <div className="flex items-start gap-3">
                <div className="grid grid-rows-7 gap-1 text-[10px] text-muted-foreground">
                  <span className="row-start-2">Mon</span>
                  <span className="row-start-4">Wed</span>
                  <span className="row-start-6">Fri</span>
                </div>
                <div className="space-y-1">
                  <div className="flex gap-1">
                    {Array.from({ length: 54 }).map((_, i) => (
                      <div key={i} className="w-[10px] md:w-[12px] text-[10px]" />
                    ))}
                  </div>
                  <div className="grid grid-rows-7 grid-flow-col auto-cols-[10px] md:auto-cols-[12px] gap-1">
                    {Array.from({ length: 54 }).map((_, colIdx) => (
                      <div key={colIdx} className="contents">
                        {Array.from({ length: 7 }).map((_, rowIdx) => (
                          <div
                            key={`${colIdx}-${rowIdx}`}
                            className="size-[10px] md:size-[12px] rounded-[2px] bg-muted animate-pulse"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {!loading && error && (
          <div className="text-destructive text-sm">
            {error}
          </div>
        )}
        {!loading && data && (
          <div className="space-y-6">
            {/* Stats (minimal inline row) */}
            {(() => {
              const s = computeStreaks(data.days)
              const metrics = [
                { label: "Total", value: data.total },
                { label: "Longest Streak", value: `${s.longest}d` },
                { label: "Current Streak", value: `${s.current}d` },
                { label: "Active Days", value: s.activeDays },
              ]
              return (
                <div className="flex flex-wrap items-center text-[11px] text-muted-foreground divide-x divide-border rounded-md bg-background/50">
                  {metrics.map((m) => (
                    <div key={m.label} className="px-3 py-1">
                      <span className="font-medium text-foreground">{m.value}</span> {m.label}
                    </div>
                  ))}
                </div>
              )
            })()}

            {/* Grid */}
            <div className="overflow-x-auto">
              <div className="flex items-start gap-3">
                {/* Weekday labels */}
                <div className="grid grid-rows-7 gap-1 text-[10px] text-muted-foreground">
                  <span className="row-start-2">Mon</span>
                  <span className="row-start-4">Wed</span>
                  <span className="row-start-6">Fri</span>
                </div>
                <div className="space-y-1">
                  {/* Month labels */}
                  <div className="flex gap-1 text-[10px] text-muted-foreground">
                    {monthLabels.map((label, i) => (
                      <div key={i} className="w-[10px] md:w-[12px]">
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Calendar grid */}
                  <div className="grid grid-rows-7 grid-flow-col auto-cols-[10px] md:auto-cols-[12px] gap-1">
                    {weeks.map((col, colIdx) => (
                      <div key={colIdx} className="contents">
                        {col.map((d, rowIdx) => (
                          <Tooltip key={`${d.date}-${rowIdx}`}>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className={`size-[10px] md:size-[12px] rounded-[2px] ${levelClass(d.level)} hover:ring-1 hover:ring-primary/50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring`}
                                aria-label={`${d.date}: ${d.count} contributions`}
                              />
                            </TooltipTrigger>
                            <TooltipContent sideOffset={4}>
                              <div className="text-xs">
                                {d.count} contributions
                                <br />
                                {d.date}
                              </div>
                            </TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* Legend moved to bottom */}
                  <div className="flex items-center gap-2 pt-3 text-[10px] text-muted-foreground">
                    <span>Less</span>
                    {[0, 1, 2, 3, 4].map((lvl) => (
                      <div key={lvl} className={`size-3 rounded-[2px] ${levelClass(lvl)}`} />
                    ))}
                    <span>More</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}