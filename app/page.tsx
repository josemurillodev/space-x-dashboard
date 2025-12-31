import { 
  getLaunchHistory, 
  getPayloadStats, 
  getRockets, 
  getLaunchesWithRocketId,
  getStarlinkPositions
} from '@/lib/api';
import { aggregatePayloads, aggregateRocketLaunches } from '@/lib/transformers';

export default async function Dashboard() {
  // Parallel Data Fetching
  const [
    launches, 
    payloads, 
    rockets, 
    launchRocketIds, 
    starlink
  ] = await Promise.all([
    getLaunchHistory(),
    getPayloadStats(),
    getRockets(),
    getLaunchesWithRocketId(),
    getStarlinkPositions()
  ]);

  // Server-side Aggregation
  const payloadData = aggregatePayloads(payloads);
  const rocketData = aggregateRocketLaunches(launchRocketIds.docs, rockets);

  return (
    <main className="p-8">
      <h1>SpaceX Dashboard</h1>
      {/*
        <LaunchHeatmap data={launches} />
        <PayloadChart data={payloadData} />
        <RocketChart data={rocketData} />
        <StarlinkViz data={starlink} />
      */}
      <pre>{JSON.stringify({ 
        totalLaunches: launches.length,
        totalMassKg: payloadData.totalMassKg,
        // totalMassKgs: payloadData.totalMassKgs,
        totalMassLb: payloadData.totalMassLb,
        // totalMassLbs: payloadData.totalMassLbs,
        orbitCounts: payloadData.orbitCounts,
        starlinkCount: starlink.length,
        rocketData: rocketData 
      }, null, 2)}</pre>
    </main>
  );
}