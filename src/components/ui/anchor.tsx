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
          ? "font-semibold !text-blue-500 hover:!text-muted-foreground"
          : "font-medium !text-blue-500 [background-image:radial-gradient(circle,var(--border)_0.7px,transparent_0.9px)] [background-position:0_calc(100%-1px)] [background-repeat:repeat-x] [background-size:6px_2px] pb-[0.08em] hover:!text-muted-foreground hover:[background-image:radial-gradient(circle,var(--muted-foreground)_0.7px,transparent_0.9px)]",
        className
      )}
      {...props}
    />
  );
}
