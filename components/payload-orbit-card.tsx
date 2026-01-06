"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { PayloadStats } from "@/types/spacex";
import { getProcessedPayloads } from "@/lib/payload-utils";
import Title from "./title";

const REGIME_CONFIG: Record<string, { color: string; distance: number; label: string; stroke: string }> = {
  vleo: { color: "border-blue-400", stroke: "stroke-blue-400", distance: 1, label: "Very Low Earth" },
  leo: { color: "border-purple-400", stroke: "stroke-purple-400", distance: 2, label: "Low Earth" },
  sso: { color: "border-indigo-400", stroke: "stroke-indigo-400", distance: 3, label: "Sun-Sync" },
  meo: { color: "border-cyan-500", stroke: "stroke-cyan-500", distance: 4, label: "Medium Earth" },
  geo: { color: "border-green-500", stroke: "stroke-green-500", distance: 5, label: "Geosynchronous" },
  gto: { color: "border-yellow-500", stroke: "stroke-yellow-500", distance: 6, label: "Geostationary Transfer" },
  other: { color: "border-zinc-500", stroke: "stroke-zinc-500", distance: 7, label: "Deep Space / Other" },
};

export default function PayloadOrbitCard({ data }: { data: PayloadStats[] }) {
  const { regimes, totalMass } = useMemo(
    () => getProcessedPayloads(data),
    [data]
  );

  return (
    <div className="bg-black p-8 rounded-xl border border-zinc-900 relative overflow-hidden group">
      <Title
        className="mb-8"
        title="Payloads"
        subtitle="Orbital Load Distribution"
      />

      <div className="flex flex-col items-center gap-12">
        <div className="relative w-65 h-65 flex justify-center items-center aspect-square max-w-75 mx-auto">
          <div className="absolute w-12 h-12 bg-cyan-950 rounded-full border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
            <div className="w-8 h-8 bg-cyan-500 rounded-full blur-[2px] opacity-40 animate-pulse" />
          </div>

          {Object.entries(REGIME_CONFIG).map(([key, config], i) => {
            const scale = 50 + config.distance * 35;

            return (
              <motion.div
                key={key}
                className={`absolute rounded-full border transition-all duration-700 ${config.color}`}
                style={{ width: `${scale}px`, height: `${scale}px`, borderWidth: '0.5px' }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: i * 0.1 },
                }}
              >
                <div className="absolute text-white top-0.5 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black px-1 text-[9px] font-bold">
                  {key.toUpperCase()}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="flex-1 w-full space-y-4 font-mono">
          <motion.div
            className="flex gap-4"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.2 },
            }}
          >
            <div className="pb-2">
              <p className="text-zinc-500 text-[10px] uppercase">Payloads</p>
              <p className="text-xl font-bold">{data.length}</p>
            </div>
            <div className="pb-2">
              <p className="text-zinc-500 text-[10px] uppercase">
                Combined Mass
              </p>
              <p className="text-xl font-bold">
                {(totalMass / 1000).toFixed(1)}{" "}
                <span className="text-xs">TONS</span>
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {regimes.slice(0, 4).map((regime, i) => (
              <motion.div
                key={regime.name}
                className={`relative pl-3 border-l-2 transition-colors ${REGIME_CONFIG[regime.label]?.color ?? "text-zinc-500"}`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { delay: i * 0.2 },
                }}
              >
                <p className="text-[10px] text-zinc-400 uppercase">
                  {regime.name || "Unknown"}
                </p>
                <p className="text-lg text-white">{regime.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
