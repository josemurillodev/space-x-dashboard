// starlink/page.tsx
import StarlinkVisualizer from '@/components/starlink-visualizer';
import { getStarlinkPositions } from '@/lib/api';

export default async function StarlinkPage() {
  const starlink = await getStarlinkPositions();

  return (
    <main className="p-4 bg-black h-full">
      <div className="h-full grid grid-cols-1 gap-4">
        <StarlinkVisualizer data={starlink} />
      </div>
    </main>
  );
}