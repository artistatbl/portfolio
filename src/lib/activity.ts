export function activityClass(level: number) {
  if (level >= 4) return "bg-[#216e39]";
  if (level === 3) return "bg-[#30a14e]";
  if (level === 2) return "bg-[#40c463]";
  if (level === 1) return "bg-[#9be9a8]";
  return "bg-[#d8dee4]";
}

export function formatTooltipDate(value: string) {
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function scaleY(distance: number | null) {
  if (distance === null) return 1;
  if (distance === 0) return 0.7;
  if (distance === 1) return 0.88;
  if (distance === 2) return 0.95;
  if (distance === 3) return 0.98;
  return 1;
}

export function scaleX(distance: number | null) {
  if (distance === null) return 1;
  if (distance === 0) return 0.78;
  if (distance === 1) return 0.92;
  if (distance === 2) return 0.97;
  return 1;
}
