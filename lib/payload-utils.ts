import { PayloadStats } from "@/types/spacex";

export function getProcessedPayloads(payloads: PayloadStats[]) {
  const regimeMap: Record<string, { count: number; mass: number; label: string }> = {};
  let totalMass = 0;

  payloads.forEach((p) => {
    const r = p.regime || "Other";
    if (!regimeMap[r]) regimeMap[r] = { count: 0, mass: 0, label: p.orbit?.toLowerCase() || "other" };
    
    regimeMap[r].count += 1;
    regimeMap[r].mass += p.mass_kg || 0;
    totalMass += p.mass_kg || 0;
  });

  return {
    totalMass,
    regimes: Object.entries(regimeMap)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count)
  };
}