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
    nextLaunch,
    latestLaunch
  ] = await Promise.all([
    getLaunchHistory(),
    getPayloadStats(),
    getRockets(),
    getLaunchesWithRocketId(),
    getNextLaunch(),
    getLatestLaunch()
  ]);

  // Server-side Aggregation
  const rocketData = aggregateRocketLaunches(launchRocketIds.docs, rockets);

  return (
    <main className="p-2 gap-2 grid grid-cols-1 md:grid-cols-2">
      <LaunchFocusCard latest={latestLaunch} next={nextLaunch} />
      <LaunchYearGrid data={launches} />
      <RocketsChart data={rocketData} />
      <PayloadOrbitCard data={payloads} />
    </main>
  );
}