import { LaunchHeatmapItem, PayloadStats, RocketInfo, StarlinkSatellite, QueryResponse, QueryOptions, QueryObject } from '@/types/spacex';

const BASE_URL = 'https://api.spacexdata.com/v4';

async function postQuery<T>(
  endpoint: string, 
  query: QueryObject = {}, 
  options: QueryOptions = {}
): Promise<QueryResponse<T>> {
  
  const res = await fetch(`${BASE_URL}/${endpoint}/query`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      query, 
      options 
    }),
    next: { revalidate: 3600 }, 
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.status} ${res.statusText}`);
  }
  
  return res.json();
}

export async function getLaunchHistory(): Promise<LaunchHeatmapItem[]> {
  const body = {
    query: { upcoming: false },
    options: {
      select: ['date_utc', 'success', 'upcoming', 'id'],
      pagination: false, // Danger: fetches all (~200+ items). Fine for text data.
      // sort: { date_utc: 'asc' }
    }
  };

  const data = await postQuery<LaunchHeatmapItem>('launches', body.query, body.options);
  return data.docs;
}

export async function getPayloadStats(): Promise<PayloadStats[]> {
  const body = {
    query: {},
    options: {
      select: ['orbit', 'regime', 'mass_kg', 'mass_lbs', 'id'],
      pagination: false
    }
  };

  const data = await postQuery<PayloadStats>('payloads', body.query, body.options);
  return data.docs;
}

export async function getRockets(): Promise<RocketInfo[]> {
  const res = await fetch(`${BASE_URL}/rockets`, { next: { revalidate: 86400 } }); // Cache 24h
  if (!res.ok) throw new Error('Failed to fetch rockets');

  const data = await res.json();
  
  return data.map((r: RocketInfo) => ({
    id: r.id,
    name: r.name,
    type: r.type
  }));
}

// Helper to attach rocket IDs to launches
export async function getLaunchesWithRocketId() {
   const body = {
    query: { upcoming: false },
    options: {
      select: ['rocket', 'id'],
      pagination: false,
    }
  };
  return postQuery<{ rocket: string }>('launches', body.query, body.options);
}

export async function getStarlinkPositions(): Promise<StarlinkSatellite[]> {
  const body = {
    query: { 
      latitude: { $ne: null },
      height_km: { $ne: null }
    },
    options: {
      select: ['spaceTrack.OBJECT_NAME', 'latitude', 'longitude', 'height_km', 'id'],
      // limit: 20,
      pagination: false
    }
  };

  const data = await postQuery<StarlinkSatellite>('starlink', body.query, body.options);

  return data.docs;
}