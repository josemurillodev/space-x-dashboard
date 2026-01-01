"use client";

import { LaunchHeatmapItem } from '@/types/spacex';

interface FocusProps {
  latest: LaunchHeatmapItem;
  next: LaunchHeatmapItem;
}

export default function LaunchFocusCard({ latest, next }: FocusProps) {
  return (
    <div className="bg-black p-8 flex flex-col rounded-xl border border-zinc-900 relative overflow-hidden group">
      <h2 className="text-xl font-mono tracking-widest text-zinc-400 uppercase mb-4 border-l-4 border-cyan-500 pl-4">
        Launch Focus
      </h2>
      <p className="text-zinc-500 text-xs mt-1 uppercase tracking-tighter mb-8">
        Latest news
      </p>
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 border border-zinc-800">
        
        {/* LATEST */}
        <div className="relative flex flex-col justify-between p-8 border-b md:border-b-0 md:border-r border-zinc-800 group overflow-hidden">
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-green-500/40" />

          <div className="some">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[11px] text-green-500 uppercase tracking-[0.3em]">Latest Mission Log</span>
            </div>

            <h3 className="text-1xl text-white uppercase mb-2">
              {latest?.name}
            </h3>
            
            <div className="flex sm:flex-col gap-4 mb-4">
              <div className="text-[10px] bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-zinc-400">
                FLT_{latest?.flight_number}
              </div>
              <div className="text-[10px] bg-green-900/20 border border-green-500/50 px-2 py-0.5 text-green-400 font uppercase">
                {latest?.success ? 'Success' : 'Aborted'}
              </div>
            </div>

            <div className="p-4 border border-green-500/20 bg-green-500/5 mb-4">
              <div className="flex flex-col justify-between text-[11px]">
                <span className="text-green-500/60 uppercase">Timestamp</span>
                <span className="text-green-400">{new Date(latest?.date_utc).toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 opacity-70">
            <p className="text-[10px] text-zinc-400 leading-relaxed uppercase">
              {latest?.details || "No mission debriefing text provided for this flight sequence."}
            </p>
          </div>
        </div>

        {/* UPCOMING */}
        <div className="relative flex flex-col justify-between p-8 bg-zinc-900/20 group">
          <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-cyan-500/40" />

          <div className="some">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1 h-1 bg-cyan-500 rounded-full shadow-[0_0_8px_#06b6d4]" />
              <span className="text-[11px] text-cyan-500 uppercase tracking-[0.3em]">Next Launch Window</span>
            </div>

            <h3 className="text-1xl text-white uppercase mb-2 truncate">
              {next?.name || "TBD"}
            </h3>

            <div className="flex sm:flex-col gap-4 mb-8 sm:mb-4">
              <div className="text-[10px] bg-zinc-900 border border-zinc-700 px-2 py-0.5 text-zinc-400">
                FLT_{next?.flight_number}
              </div>
              <div className="text-[10px] bg-cyan-900/20 border border-cyan-500/50 px-2 py-0.5 text-cyan-400 font uppercase animate-pulse">
                Pending
              </div>
            </div>

            <div className="mt-4 p-4 border border-cyan-500/20 bg-cyan-500/5">
              <div className="flex flex-col justify-between text-[11px]">
                <span className="text-cyan-500/60 uppercase">Timestamp</span>
                <span className="text-cyan-400">{new Date(next?.date_utc).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}