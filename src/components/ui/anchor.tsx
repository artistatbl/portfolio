import * as React from "react";

import { cn } from "@/lib/utils";

interface AnchorProps extends React.ComponentProps<"a"> {
  variant?: "plain" | "dotted";
}

export const dottedUnderlineClassName =
  "[background-image:radial-gradient(circle,var(--border)_0.7px,transparent_0.9px),linear-gradient(90deg,transparent_0%,transparent_34%,color-mix(in_oklab,var(--foreground)_20%,transparent)_50%,transparent_66%,transparent_100%)] [background-position:0_calc(100%-1px),-140%_100%] [background-repeat:repeat-x,no-repeat] [background-size:6px_2px,200%_2px] pb-[0.08em] transition-[color,background-position,opacity,filter] duration-300 ease-out";

export const dottedUnderlineHoverMutedClassName =
  "hover:!text-muted-foreground hover:[background-image:radial-gradient(circle,var(--muted-foreground)_0.7px,transparent_0.9px),linear-gradient(90deg,transparent_0%,transparent_34%,color-mix(in_oklab,var(--foreground)_55%,white_45%)_50%,transparent_66%,transparent_100%)] hover:[background-position:0_calc(100%-1px),140%_100%] hover:opacity-90";

export const dottedUnderlineHoverAccentClassName =
  "hover:!text-[var(--icon-dot)] hover:[background-image:radial-gradient(circle,var(--icon-dot)_0.7px,transparent_0.9px),linear-gradient(90deg,transparent_0%,transparent_34%,color-mix(in_oklab,var(--foreground)_55%,white_45%)_50%,transparent_66%,transparent_100%)] hover:[background-position:0_calc(100%-1px),140%_100%] hover:opacity-90";

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
          : cn(
              "font-medium !text-foreground",
              dottedUnderlineClassName,
              dottedUnderlineHoverMutedClassName
            ),
        className
      )}
      {...props}
    />
  );
}
