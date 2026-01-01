import { 
  getStarlinkPositions,
} from '@/lib/api';

export default async function Dashboard() {
  const [
    starlink,
  ] = await Promise.all([
    getStarlinkPositions(),
  ]);

  return (
    <main className="p-2 gap-2 grid grid-cols-1 md:grid-cols-2">
      <pre>{JSON.stringify({ 
        starlinkCount: starlink.length,
      }, null, 2)}</pre>
    </main>
  );
}