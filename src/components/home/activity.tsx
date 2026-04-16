import { ActivityBars } from "@/components/home/bars";
import { SectionBlock } from "@/components/home/block";

interface ActivitySectionProps {
  contributionWindowLabel: string;
  contributionCountLabel: string;
  days: Array<{
    date: string;
    count: number;
    level: number;
    repositories?: string[];
  }>;
}

export function ActivitySection({
  contributionWindowLabel,
  contributionCountLabel,
  days,
}: ActivitySectionProps) {
  return (
    <SectionBlock divider className="pt-3">
      <div className="max-w-[34rem]">
        <div className="mb-3 flex items-center justify-between text-[0.66rem] font-medium uppercase tracking-[0.04em] text-muted-foreground">
          <span>{contributionWindowLabel}</span>
          <span>{contributionCountLabel}</span>
        </div>

        <ActivityBars days={days} />
      </div>
    </SectionBlock>
  );
}
