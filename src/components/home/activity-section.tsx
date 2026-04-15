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

function formatTooltipDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
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
            <div key={day.date} className="group relative">
              <span
                tabIndex={0}
                className={`block h-6 rounded-[4px] ${activityClass(
                  day.level
                )} outline-none ring-0 transition-transform duration-150 group-hover:scale-[1.02] group-focus-within:scale-[1.02] group-focus-within:ring-1 group-focus-within:ring-[#171513]/15`}
                aria-label={`${formatTooltipDate(day.date)}: ${day.count} commits`}
              />

              <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-max max-w-[12rem] -translate-x-1/2 rounded-xl bg-[#161616] px-3 py-2 text-left text-white opacity-0 shadow-[0_8px_30px_rgba(0,0,0,0.22)] transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                <p className="text-[0.82rem] font-medium leading-5">
                  {formatTooltipDate(day.date)}
                </p>
                <p className="text-[0.9rem] leading-5 text-white/95">
                  {day.count} {day.count === 1 ? "commit" : "commits"}
                </p>
                {day.repositories && day.repositories.length > 0 ? (
                  <p className="max-w-[10rem] text-[0.72rem] leading-4 text-white/70">
                    {day.repositories.slice(0, 3).join(", ")}
                  </p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionBlock>
  );
}
