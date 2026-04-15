"use client";

import { useState } from "react";

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
  if (level >= 4) return "activity-level-4";
  if (level === 3) return "activity-level-3";
  if (level === 2) return "activity-level-2";
  if (level === 1) return "activity-level-1";
  return "activity-level-0";
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
    <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] items-end gap-1.5">
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
            <button
              type="button"
              className={`block w-full rounded-[4px] ${activityClass(
                day.level
              )} h-6 outline-none will-change-transform transition-transform ${
                isActive ? "brightness-[0.92] saturate-[1.08]" : ""
              }`}
              style={{
                transform: `scaleX(${scaleX(distance)}) scaleY(${scaleY(distance)})`,
                transformOrigin: "bottom center",
                transitionDuration: "220ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transitionDelay,
              }}
              aria-label={`${formatTooltipDate(day.date)}: ${day.count} commits`}
            />

            <div className="home-tooltip pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[12rem] -translate-x-1/2 rounded-xl px-3 py-2 text-left opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
