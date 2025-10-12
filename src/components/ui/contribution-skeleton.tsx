"use client"

import React from "react"

export function ContributionSkeleton({ compact = true }: { compact?: boolean }) {
  const cols = compact ? 26 : 54
  return (
    <div className="space-y-6">
      {/* Stats skeleton to mirror metrics row with labels */}
      <div className="flex flex-wrap items-center text-[11px] text-muted-foreground divide-x divide-border rounded-md bg-background/50">
        {["Total", "Longest Streak", "Current Streak", "Active Days"].map((label) => (
          <div key={label} className="px-3 py-1 flex items-center gap-1">
            <div className="h-3 w-5 bg-muted rounded animate-pulse" />
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Grid skeleton with fixed weekday labels and scrollable grid */}
      <div className="-mx-2 px-2 sm:mx-0 sm:px-0">
        <div className="flex items-start gap-2 sm:gap-3">
          {/* Weekday labels (fixed) */}
          <div className="hidden md:grid grid-rows-7 gap-0.5 sm:gap-1 text-[10px] text-muted-foreground">
            <span className="row-start-2">Mon</span>
            <span className="row-start-4">Wed</span>
            <span className="row-start-6">Fri</span>
          </div>
          {/* Scrollable right side */}
          <div className="space-y-1 md:flex-1 md:overflow-x-auto">
            {/* Month labels skeleton aligned to columns */}
            <div className="hidden md:flex gap-1 text-[10px] text-muted-foreground md:min-w-max md:pr-2">
              {Array.from({ length: cols }).map((_, i) => (
                <div key={i} className="w-[9px] sm:w-[10px] md:w-[12px]">
                  <div className="h-3 bg-muted/50 rounded" />
                </div>
              ))}
            </div>
            {/* Calendar grid skeleton */}
            <div className="flex flex-wrap md:grid md:grid-rows-7 md:grid-flow-col md:auto-cols-[12px] gap-0.5 sm:gap-1 md:min-w-max md:pr-2">
              {Array.from({ length: cols }).map((_, colIdx) => (
                <div key={colIdx} className="grid grid-rows-7 md:row-span-7 w-[9px] sm:w-[10px] md:w-[12px] gap-0.5 sm:gap-1">
                  {Array.from({ length: 7 }).map((_, rowIdx) => (
                    <div
                      key={`${colIdx}-${rowIdx}`}
                      className="size-[9px] sm:size-[10px] md:size-[12px] rounded-[2px] bg-muted animate-pulse"
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Legend skeleton placed below so it doesn't scroll with the grid */}
      <div className="hidden sm:flex items-center gap-2 pt-3 text-[10px] text-muted-foreground">
        {/* <div className="h-3 w-8 bg-muted rounded" />
         */}
         <p>less</p>
        {[0, 1, 2, 3, 4].map((lvl) => (
          <div key={lvl} className="size-3 rounded-[2px] bg-muted animate-pulse" />
        ))}
        {/* <div className="h-3 w-8 bg-muted rounded" />
         */}
         <p>more</p>
      </div>
    </div>
  )
}