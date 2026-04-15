import { SectionBlock } from "@/components/home/section-block";
import { getGitHubActivity } from "@/lib/github-contributions";

function activityClass(level: number) {
  if (level >= 4) return "bg-[#27a35f]";
  if (level === 3) return "bg-[#68d98c]";
  if (level === 2) return "bg-[#8ce6a7]";
  if (level === 1) return "bg-[#c5f0d0]";
  return "bg-[#ebe6df]";
}

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
        <div className="mb-3 flex items-center justify-between text-[0.66rem] font-medium uppercase tracking-[0.04em] text-[#a0988d]">
          <span>{contributionWindowLabel}</span>
          <span>{contributionCountLabel}</span>
        </div>

        <div className="grid grid-cols-[repeat(30,minmax(0,1fr))] gap-1.5">
          {activity.days.map((day) => (
            <span
              key={day.date}
              className={`h-6 rounded-[4px] ${activityClass(day.level)}`}
              title={`${day.date}: ${day.count} contributions`}
            />
          ))}
        </div>
      </div>
    </SectionBlock>
  );
}
