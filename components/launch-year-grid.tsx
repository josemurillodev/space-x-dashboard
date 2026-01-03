"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import { LaunchHeatmapItem } from "@/types/spacex";
import { getLaunchStatsByYear } from "@/lib/launch-utils";
import { ShuffleTextSimple } from "./shuffle-text";

const DELAY_TIME = 0.08;

export default function LaunchYearGrid({
  data,
}: {
  data: LaunchHeatmapItem[];
}) {
  const { years, counts, chartMax } = useMemo(
    () => getLaunchStatsByYear(data),
    [data]
  );

  return (
    <div className="bg-black p-8 rounded-xl border border-zinc-900 relative overflow-hidden">
      <div className="mb-8">
        <h2 className="text-xl font-mono tracking-widest text-zinc-400 uppercase mb-4 border-l-4 border-cyan-500 pl-4">
          Launches [{data.length}]
        </h2>
        <p className="text-zinc-500 text-xs mt-1 uppercase tracking-widest">
          <ShuffleTextSimple
            text={`Scale: 0 — ${chartMax} (Max + 10% buffer)`}
          />
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4">
        {years.map((year, i) => {
          const count = counts[year];
          const percentage = (count / chartMax) * 100;

          return (
            <div
              key={year}
              className="flex flex-col gap-2 group cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{
                  scale: 1,
                  transition: { duration: 0.3, delay: i * DELAY_TIME },
                }}
              >
                <div className="relative bg-zinc-900/50 aspect-2/1 flex items-center justify-center border border-zinc-800 transition-all group-hover:bg-zinc-800/50">
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500" />

                  <span className="font-mono font-medium text-zinc-200 tracking-widest group-hover:text-cyan-400 transition-colors">
                    {year}
                  </span>

                  <div className="absolute -top-4 left-0 text-[10px] font-mono text-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    ID_{year}_STAT
                  </div>
                </div>
              </motion.div>

              <div className="space-y-1">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.3, delay: i * DELAY_TIME },
                  }}
                >
                  <div className="h-1 w-full bg-zinc-800 overflow-hidden relative">
                    <motion.div
                      className="h-full bg-cyan-500 transition-all duration-1000 ease-out origin-left"
                      style={{ width: `${percentage}%` }}
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: 1,
                        transition: { duration: 0.3, delay: i * DELAY_TIME + 0.5 },
                      }}
                    />
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: { duration: 0.3, delay: i * DELAY_TIME + DELAY_TIME },
                  }}
                >
                  <div className="flex justify-between items-center px-0.5">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      Total
                    </span>
                    <span className="text-[10px] font-mono text-cyan-500 font-bold">
                      {count}
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
