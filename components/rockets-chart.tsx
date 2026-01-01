"use client";

import { RocketInfo } from "@/types/spacex";

const ROCKETS_COLORS = [
  { text: "text-cyan-400", border: "border-cyan-400" },
  { text: "text-blue-500", border: "border-blue-500" },
  { text: "text-indigo-400", border: "border-indigo-400" },
  { text: "text-purple-500", border: "border-purple-500" },
  { text: "text-zinc-500", border: "border-zinc-500" },
];

export default function RocketsChart({ data }: { data: Array<RocketInfo & { count: number }> }) {
  const maxCount = Math.max(...data.map(o => o.count ?? 0)) + 100;

  return (
    <div className="flex flex-col bg-black p-8 rounded-xl border border-zinc-900 relative overflow-hidden group">
      <h2 className="text-xl font-mono tracking-widest text-zinc-400 uppercase mb-4 border-l-4 border-cyan-500 pl-4">
        Rockets
      </h2>
      {/* TODO: add stats */}
      <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest mb-4">
          Success: 181 | Failure: 6
      </p>

      <div className="flex flex-col flex-1 justify-around items-center">
        {data.map(({ name, count, success_rate_pct, mass }, i) => {
          const percentage = (count / maxCount) * 100;

          return (
            <div key={name} className="w-full group cursor-default">
              <div className="flex justify-between items-end mb-1 px-1">
                <span className={`text-xs font-mono uppercase tracking-widest ${ROCKETS_COLORS[i]?.text ?? 'text-zinc-500'}`}>
                  {name}
                </span>
                <span className="text-sm font-mono text-zinc-100">
                  {count.toString().padStart(8, '0')}
                </span>
              </div>
              
              <div className="relative h-12 p-4 bg-zinc-900/50 border border-zinc-800 flex items-center">
                <div className={`absolute top-0 left-0 w-2 h-2 border-t border-l ${ROCKETS_COLORS[i]?.border ?? 'border-zinc-500'}`} />
                <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${ROCKETS_COLORS[i]?.border ?? 'border-zinc-500'}`} />
                <div className={`absolute bottom-0 left-0 w-2 h-2 border-b border-l ${ROCKETS_COLORS[i]?.border ?? 'border-zinc-500'}`} />
                <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${ROCKETS_COLORS[i]?.border ?? 'border-zinc-500'}`} />
                <div 
                  className={`relative h-full transition-all duration-1000 ease-out bg-current ${ROCKETS_COLORS[i]?.text ?? 'text-zinc-500'}`}
                  style={{ width: `${percentage}%` }}
                >
                  <div className="absolute bg-zinc-50 w-0.5 -right-0.5 -bottom-0.5 -top-0.5" />
                </div>
              </div>

              <div className="flex justify-between items-end mt-1 px-1">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  Success: {success_rate_pct.toFixed(2)}%
                </span>
                <span className="text-sm font-mono text-zinc-500">
                  {mass.kg.toFixed(2)} kg
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}