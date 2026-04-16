import { ActivityBars } from "@/components/home/bars";
import { SectionBlock } from "@/components/home/block";
import { getGitHubActivity } from "@/lib/github";

interface ActivitySectionProps {
  contributionWindowLabel: string;
  username: string;
}

export async function ActivitySection({
  contributionWindowLabel,
  username,
}: ActivitySectionProps) {
  const activity = await getGitHubActivity(username, 30);
  const contributionCountLabel = `${activity.total} commits`;

  return (
    <SectionBlock divider className="pt-8">
      <div className="max-w-[34rem]">
        <div className="mb-3 flex items-center justify-between text-[0.66rem] font-medium uppercase tracking-[0.04em] text-muted-foreground">
          <span>{contributionWindowLabel}</span>
          <span>{contributionCountLabel}</span>
        </div>

        <ActivityBars days={activity.days} />
      </div>
    </SectionBlock>
  );
}
