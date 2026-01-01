// starlink/page.tsx
import StarlinkVisualizer from '@/components/starlink-visualizer';
import { getStarlinkPositions } from '@/lib/api';

export default async function StarlinkPage() {
  const starlink = await getStarlinkPositions();

  return (
    <main className="p-2 h-full">
      <StarlinkVisualizer data={starlink} />
    </main>
  );
}