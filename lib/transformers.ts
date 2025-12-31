import { PayloadStats, RocketInfo } from "@/types/spacex";

export function aggregatePayloads(payloads: PayloadStats[]) {
  let totalMassKg = 0;
  let totalMassLb = 0;
  const orbits: Record<string, number> = {};

  payloads.forEach(p => {
    if (p.mass_kg) totalMassKg += p.mass_kg;
    if (p.mass_lbs) totalMassLb += p.mass_lbs;

    const orbitName = p.regime || "Unknown";
    orbits[orbitName] = (orbits[orbitName] || 0) + 1;
  });

  return {
    totalMassKg,
    // totalMassKgs: totalMassLb  * 0.4536,
    totalMassLb,
    // totalMassLbs: totalMassKg * 2.2046,
    orbitCounts: Object.entries(orbits)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
  };
}

export function aggregateRocketLaunches(
  launches: { rocket: string }[], 
  rockets: RocketInfo[]
) {
  const counts: Record<string, number> = {};
  
  rockets.forEach(r => counts[r.id] = 0);

  launches.forEach(l => {
    if (counts[l.rocket] !== undefined) {
      counts[l.rocket]++;
    }
  });

  return rockets.map(r => ({
    name: r.name,
    count: counts[r.id]
  }));
}