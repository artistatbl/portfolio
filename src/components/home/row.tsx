import { GitHubIcon } from "@/components/icons";
import {
  Blocks,
  BriefcaseBusiness,
  Code2,
  FolderOpen,
  Rocket,
  SquareTerminal,
  type LucideIcon,
} from "lucide-react";
import type { TimelineItemData } from "@/lib/content";

type IconProps = {
  className?: string;
  size?: number;
};

type MixedIcon = React.ComponentType<IconProps> | LucideIcon;

const iconMap: Record<string, MixedIcon> = {
  blocks: Blocks,
  briefcase: BriefcaseBusiness,
  code: Code2,
  folder: FolderOpen,
  github: GitHubIcon,
  rocket: Rocket,
  terminal: SquareTerminal,
};

function FallbackIcon() {
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[#ddd5cc] bg-[#fbf8f3]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2c2925]" />
    </span>
  );
}

function ItemIcon({ iconKey }: { iconKey?: string }) {
  if (!iconKey) {
    return <FallbackIcon />;
  }

  const IconComponent = iconMap[iconKey];

  if (!IconComponent) {
    return <FallbackIcon />;
  }

  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-[8px] border border-[#ddd5cc] bg-[#fbf8f3] text-[#49433d]">
      <IconComponent className="opacity-85" size={14} />
    </span>
  );
}

interface ItemRowProps {
  item: TimelineItemData;
}

export function ItemRow({ item }: ItemRowProps) {
  return (
    <li className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-3 gap-y-1 py-3">
      <ItemIcon iconKey={item.iconKey} />
      <div className="min-w-0">
        <p className="text-[0.84rem] font-medium tracking-[-0.01em] text-[#171513]">
          {item.title}
          {item.description ? (
            <span className="font-normal text-[#8c847a]"> · {item.description}</span>
          ) : null}
        </p>
      </div>
      {item.meta ? (
        <span
          className={
            item.metaVariant === "pill"
              ? "rounded-full bg-[#2d7fff] px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.08em] text-white"
              : "pt-0.5 text-[0.76rem] text-[#9b9388]"
          }
        >
          {item.meta}
        </span>
      ) : null}
    </li>
  );
}
