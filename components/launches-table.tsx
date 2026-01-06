'use client';

import { format } from 'date-fns';
import { LaunchItem } from '@/types/spacex';

export const convertLaunchpadIdToSiteName = (launchPadId: string): string => {
  switch (launchPadId) {
    case '5e9e4502f509092b78566f87':
      return 'Vandenburg SLC-4E';
    case '5e9e4501f5090910d4566f83':
      return 'Vandenburg SLC-4W';
    case '5e9e4501f509094ba4566f84':
      return 'Cape Canaveral SLC-40';
    case '5e9e4502f5090927f8566f85':
      return 'STLS';
    case '5e9e4502f5090995de566f86':
      return 'Kwajalein Atoll';
    case '5e9e4502f509094188566f88':
      return 'Kennedy Space Center LC-39A';
    default:
      return 'Unknown';
  }
};

interface LaunchesTableProps {
  data: LaunchItem[];
}

export default function LaunchesTable({ data }: LaunchesTableProps) {
  const formatDate = (dateString: string, formatString = 'MMM dd, yyyy') => {
    try {
      return format(new Date(dateString), formatString);
    } catch {
      return 'Invalid date';
    }
  };

  const getLaunchResult = (success?: boolean | null) => {
    if (success === true) return { text: 'SUCCESS', class: 'text-green-600 bg-green-950', status: 'before:border-l-green-700' };
    if (success === false) return { text: 'FAILURE', class: 'text-red-600 bg-red-950', status: 'before:border-l-red-700' };
    return { text: 'UNKNOWN', class: 'text-gray-600', status: 'before:border-l-gray-700' };
  };

  return (
    <div className="rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-800">
          <thead className="">
            <tr>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                #
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-full lg:w-auto min-w-1 truncate">
                Mission
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Site
              </th>
              <th className="px-2 py-1 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:block">
                Rocket
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {data.map((launch) => {
              const result = getLaunchResult(launch.success);
              return (
                <tr key={launch.id} className="hover:bg-gray-800 text-xs">
                  <td className={`px-2 py-1 whitespace-nowrap text-xs text-gray-500 relative before:absolute before:inset-0 before:border-l ${result.status}`}>
                    {launch.flight_number}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-200 max-w-1 lg:max-w-none truncate">
                    {launch.name}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                    {formatDate(launch.date_utc)}
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500">
                    <span className="sm:hidden xl:hidden">{launch.launchpad?.name}</span>
                    <span className="hidden sm:block xl:hidden">{convertLaunchpadIdToSiteName(launch.launchpad?.id ?? '')}</span>
                    <span className="hidden xl:block">{launch.launchpad?.full_name}</span>
                  </td>
                  <td className="px-2 py-1 whitespace-nowrap text-xs text-gray-500 hidden sm:block">
                    {launch.rocket?.name as string}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}