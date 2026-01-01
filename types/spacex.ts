export interface LaunchHeatmapItem {
  id: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  name: string;
  flight_number: number;
  details: string | null;
}

export interface PayloadStats {
  id: string;
  orbit: string | null;
  regime: string | null;
  mass_kg: number | null;
  mass_lbs: number | null;
}

export interface RocketInfo {
  id: string;
  name: string;
  type: string;
}

export interface StarlinkSatellite {
  id: string;
  spaceTrack: {
    OBJECT_NAME: string;
  };
  latitude: number | null;
  longitude: number | null;
  height_km: number | null;
}

export interface QueryResponse<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
}

export interface QueryOptions {
  select?: string | string[] | Record<string, number>;
  sort?: string | Record<string, 'asc' | 'desc' | 1 | -1> | { date_utc: string; };
  offset?: number;
  page?: number;
  limit?: number;
  pagination?: boolean;
  populate?: string | string[] | object;
}

export type QueryObject = Record<string, unknown>;