"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { LaunchItem } from "@/types/spacex";
import { getLaunchStatsByYear } from "@/lib/launch-utils";

const DELAY_TIME = 0.08;

export default function LaunchYearGrid({
  data,
  className,
  initial,
}: {
  data: LaunchItem[];
  className?: string;
  initial?: boolean;
}) {
  const { years, counts, chartMax } = useMemo(
    () => getLaunchStatsByYear(data),
    [data]
  );

  return (
    <div className={className}>
      {years.map((year, i) => {
        const count = counts[year];
        const percentage = (count / chartMax) * 100;

        return (
          <Link
            key={year}
            href={`/launches?year=${year}`}
            className="flex flex-col gap-2 group cursor-pointer"
          >
            <motion.div
              initial={{ scale: initial ? 1 : 0 }}
              animate={{
                scale: 1,
                transition: { duration: 0.3, delay: i * DELAY_TIME },
              }}
            >
              <div className="relative bg-zinc-900/50 aspect-2/1 flex items-center justify-center border border-zinc-800 transition-all group-hover:bg-zinc-800/50 px-4 py-2">
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
                      transition: {
                        duration: 0.3,
                        delay: i * DELAY_TIME + 0.5,
                      },
                    }}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: {
                    duration: 0.3,
                    delay: i * DELAY_TIME + DELAY_TIME,
                  },
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
          </Link>
        );
      })}
    </div>
  );
}
