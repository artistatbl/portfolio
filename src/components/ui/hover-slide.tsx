import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HoverSlideProps {
  className?: string;
}

interface HoverSlideItemProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

export const hoverSlideItemClassName = "group block w-full text-left";

export const hoverSlideSurfaceClassName =
  "relative overflow-hidden rounded-md px-1.5 py-3";

export const hoverSlideContentClassName = "relative z-[1]";

export function HoverSlide({ className }: HoverSlideProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 rounded-md bg-muted/20 dark:bg-muted/50",
        "-translate-x-[102%] transition-transform duration-[340ms] [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        "group-hover:translate-x-0 group-focus-within:translate-x-0",
        "motion-reduce:transition-none motion-reduce:translate-x-0 motion-reduce:opacity-0 motion-reduce:group-hover:opacity-100",
        className
      )}
    />
  );
}

export function HoverSlideItem({
  children,
  className,
  contentClassName,
}: HoverSlideItemProps) {
  return (
    <div className={cn(hoverSlideSurfaceClassName, className)}>
      <HoverSlide />
      <div className={cn(hoverSlideContentClassName, contentClassName)}>
        {children}
      </div>
    </div>
  );
}
