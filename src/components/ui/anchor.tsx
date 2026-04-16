import * as React from "react";

import { cn } from "@/lib/utils";

interface AnchorProps extends React.ComponentProps<"a"> {
  variant?: "plain" | "dotted";
}

export function Anchor({
  className,
  variant = "plain",
  ...props
}: AnchorProps) {
  return (
    <a
      className={cn(
        "transition-colors",
        variant === "plain"
          ? "font-semibold !text-foreground hover:!text-muted-foreground"
          : "font-medium !text-foreground [background-image:radial-gradient(circle,var(--border)_0.7px,transparent_0.9px),linear-gradient(90deg,transparent_0%,transparent_35%,color-mix(in_oklab,var(--foreground)_22%,transparent)_50%,transparent_65%,transparent_100%)] [background-position:0_calc(100%-1px),-160%_100%] [background-repeat:repeat-x,no-repeat] [background-size:6px_2px,220%_2px] pb-[0.08em] transition-[color,background-position,opacity] duration-[200ms,420ms,200ms] hover:!text-muted-foreground hover:[background-image:radial-gradient(circle,var(--muted-foreground)_0.7px,transparent_0.9px),linear-gradient(90deg,transparent_0%,transparent_35%,color-mix(in_oklab,var(--foreground)_65%,white_35%)_50%,transparent_65%,transparent_100%)] hover:[background-position:0_calc(100%-1px),160%_100%]",
        className
      )}
      {...props}
    />
  );
}
