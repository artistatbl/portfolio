import { cn } from "@/lib/utils";

interface HoverSlideProps {
  className?: string;
}

export const hoverSlideItemClassName =
  "group relative overflow-hidden rounded-md";

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
