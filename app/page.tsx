import LaunchYearGrid from '@/components/launch-year-grid';
import PayloadOrbitCard from '@/components/payload-orbit-card';
import { 
  getLaunchHistory, 
  getPayloadStats, 
  getRockets, 
  getLaunchesWithRocketId,
  getStarlinkPositions,
  getNextLaunch,
  getLatestLaunch
} from '@/lib/api';
import { aggregateRocketLaunches } from '@/lib/transformers';
import RocketsChart from '@/components/rockets-chart';
import LaunchFocusCard from '@/components/launch-focus-card';

export default async function Dashboard() {
  // Parallel Data Fetching
  const [
    launches,
    payloads, 
    rockets, 
    launchRocketIds, 
    starlink,
    nextLaunch,
    latestLaunch
  ] = await Promise.all([
    getLaunchHistory(),
    getPayloadStats(),
    getRockets(),
    getLaunchesWithRocketId(),
    getStarlinkPositions(),
    getNextLaunch(),
    getLatestLaunch()
  ]);

  // Server-side Aggregation
  const rocketData = aggregateRocketLaunches(launchRocketIds.docs, rockets);

  // console.log('launches', launches.sort((a, b) => {
  //   return new Date(a.date_utc) - new Date(b.date_utc);
  // }));
  console.log('nextLaunch', nextLaunch);
  console.log('latestLaunch', latestLaunch);

  return (
    <main className="p-2 gap-2 grid grid-cols-1 md:grid-cols-2">
      <LaunchFocusCard latest={latestLaunch} next={nextLaunch} />
      <LaunchYearGrid data={launches} />
      <RocketsChart data={rocketData} />
      <PayloadOrbitCard data={payloads} />
      <pre>{JSON.stringify({ 
        // totalLaunches: launches.length,
        // totalMassKg: payloadData.totalMassKg,
        // totalMassKgs: payloadData.totalMassKgs,
        // totalMassLb: payloadData.totalMassLb,
        // totalMassLbs: payloadData.totalMassLbs,
        // orbitCounts: payloadData.orbitCounts,
        starlinkCount: starlink.length,
        // rocketData: rocketData 
      }, null, 2)}</pre>
    </main>
  );
}