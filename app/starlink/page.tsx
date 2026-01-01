// starlink/page.tsx
import StarlinkVisualizer from '@/components/starlink-visualizer';
import { getStarlinkPositions } from '@/lib/api';

export default async function StarlinkPage() {
  const starlink = await getStarlinkPositions();

  return (
    <main className="p-4 bg-black min-h-screen">
      <div className="grid grid-cols-1 gap-4">
        <StarlinkVisualizer data={starlink} />
        
        <div className="bg-zinc-900/30 p-4 border border-zinc-800 rounded-lg">
          <h3 className="text-zinc-500 text-[10px] uppercase font-mono mb-2">Network Metadata</h3>
          <pre className="text-cyan-400 text-xs font-mono">
            {JSON.stringify({
               status: "CONNECTED",
               constellation: "STARLINK_V1",
               nodes_online: starlink.length,
               protocol: "DHCP_SATELLITE",
               last_ping: new Date().toISOString()
            }, null, 2)}
          </pre>
        </div>
      </div>
    </main>
  );
}