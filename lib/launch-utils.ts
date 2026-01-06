import { LaunchItem } from "@/types/spacex";

export function getLaunchStatsByYear(launches: LaunchItem[]) {
  const counts: Record<number, number> = {};
  
  launches.forEach(l => {
    const year = new Date(l.date_utc).getFullYear();
    counts[year] = (counts[year] || 0) + 1;
  });

  const years = Object.keys(counts).map(Number).sort((a, b) => b - a);
  const maxLaunches = Math.max(...Object.values(counts));
  
  const chartMax = Math.ceil(maxLaunches * 1.1);

  return {
    years,
    counts,
    chartMax
  };
}