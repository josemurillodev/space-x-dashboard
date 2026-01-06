"use client";

import { useMemo, ViewTransition } from "react";
import { LaunchItem } from "@/types/spacex";
import { getLaunchStatsByYear } from "@/lib/launch-utils";
import LaunchYearGrid from "./launch-year-grid";
import Title from "./title";

export default function LaunchYearCard({ data }: { data: LaunchItem[] }) {
  const { chartMax } = useMemo(() => getLaunchStatsByYear(data), [data]);

  return (
    <div className="bg-black p-8 rounded-xl border border-zinc-900 relative overflow-hidden">
      <ViewTransition name="launches-title">
        <Title
          className="mb-8"
          title={`Launches [${data.length}]`}
          subtitle={`Scale: 0 — ${chartMax} (Max + 10% buffer)`}
        />
      </ViewTransition>

      <LaunchYearGrid
        data={data}
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-4 gap-y-4"
      />
    </div>
  );
}
