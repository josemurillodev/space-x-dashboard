import { getLaunchHistory } from '@/lib/api';
import LaunchesTable from '@/components/launches-table';
import Title from '@/components/title';
import LaunchYearGrid from '@/components/launch-year-grid';
import { notFound } from 'next/navigation';
import { ViewTransition } from 'react';

interface LaunchesPageProps {
  searchParams: Promise<{
    year?: string;
  }>;
}

export default async function LaunchesPage({
  searchParams,
}: LaunchesPageProps) {
  const { year } = await searchParams;

  const parsedYear = year ? Number(year) : null;

  if (year && Number.isNaN(parsedYear)) {
    notFound();
  }

  const launches = await getLaunchHistory();

  const filteredLaunches =
    parsedYear === null
      ? launches
      : launches.filter((launch) => {
          return (
            new Date(launch.date_utc).getFullYear() === parsedYear
          );
        });

  if (parsedYear !== null && filteredLaunches.length === 0) {
    notFound();
  }

  return (
    <ViewTransition>
      <main className="p-2 sm:p-4">
        <div className="bg-black p-4 sm:p-8 flex flex-col rounded-xl border border-zinc-900 relative overflow-hidden">
          <ViewTransition name="launches-title">
            <Title
              className="mb-8"
              title={`Launches [${launches.length}]`}
              subtitle={parsedYear ? `Selected: ${parsedYear} |  Total: ${filteredLaunches.length}` : '2006 – 2022'}
            />
          </ViewTransition>

          <LaunchYearGrid
            data={launches}
            className="flex gap-4 mb-8 pb-4 overflow-x-auto no-scrollbar"
            // initial
          />

          <LaunchesTable
            data={filteredLaunches}
          />
        </div>
      </main>
    </ViewTransition>
  );
}
