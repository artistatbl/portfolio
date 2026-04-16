"use client";

import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ActivityDay = {
  date: string;
  count: number;
  level: number;
  repositories?: string[];
};

interface ActivityBarsProps {
  days: ActivityDay[];
}

function activityClass(level: number) {
  if (level >= 4) return "bg-[#216e39]";
  if (level === 3) return "bg-[#30a14e]";
  if (level === 2) return "bg-[#40c463]";
  if (level === 1) return "bg-[#9be9a8]";
  return "bg-[#d8dee4]";
}

function formatTooltipDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

function scaleY(distance: number | null) {
  if (distance === null) return 1;
  if (distance === 0) return 0.7;
  if (distance === 1) return 0.88;
  if (distance === 2) return 0.95;
  if (distance === 3) return 0.98;
  return 1;
}

function scaleX(distance: number | null) {
  if (distance === null) return 1;
  if (distance === 0) return 0.78;
  if (distance === 1) return 0.92;
  if (distance === 2) return 0.97;
  return 1;
}

export function ActivityBars({ days }: ActivityBarsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] items-end gap-1">
        {days.map((day, index) => {
          const distance = activeIndex === null ? null : Math.abs(activeIndex - index);
          const isActive = activeIndex === index;
          const transitionDelay = distance === null ? "0ms" : `${Math.min(distance, 3) * 18}ms`;

          return (
            <div
              key={day.date}
              className="group relative flex h-7 items-end"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onFocus={() => setActiveIndex(index)}
              onBlur={() => setActiveIndex((current) => (current === index ? null : current))}
            >
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={`block w-full rounded-[3px] ${activityClass(
                      day.level
                    )} h-6 cursor-pointer outline-none will-change-transform transition-transform ${
                      isActive ? "brightness-[0.92] saturate-[1.08]" : ""
                    }`}
                    style={{
                      transform: `scaleX(${scaleX(distance)}) scaleY(${scaleY(distance)})`,
                      transformOrigin: "center center",
                      transitionDuration: "220ms",
                      transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                      transitionDelay,
                    }}
                    aria-label={`${formatTooltipDate(day.date)}: ${day.count} commits`}
                  />
                </TooltipTrigger>
                <TooltipContent
                  sideOffset={8}
                  className="max-w-[12rem] rounded-xl border border-[var(--border)] bg-foreground px-3 py-2 text-left text-background shadow-none"
                >
                  <p className="text-[0.82rem] font-medium leading-5">
                    {formatTooltipDate(day.date)}
                  </p>
                  <p className="text-[0.9rem] leading-5 text-inherit/95">
                    {day.count} {day.count === 1 ? "commit" : "commits"}
                  </p>
                  {day.repositories && day.repositories.length > 0 ? (
                    <p className="max-w-[10rem] text-[0.72rem] leading-4 text-inherit/70">
                      {day.repositories.slice(0, 3).join(", ")}
                    </p>
                  ) : null}
                </TooltipContent>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
