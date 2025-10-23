import { useState, useEffect, useMemo, useCallback } from 'react';
import ServiceClub from '@/lib/services/service-club';
import { components } from '@/types/api-types';

// Create a simple cache mechanism
const clubCache = new Map<string, {
  data: components["schemas"]["OrgClubDto"][],
  timestamp: number
}>();

export default function useClubs(initialParams?: { name: string, status: string }) {
  const [clubs, setClubs] = useState<components["schemas"]["OrgClubDto"][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<components["schemas"]["OrgClubDto"]>(initialParams || { name: '', status: '' });

  const cacheKey = useMemo(() =>
    `clubs_${params.name || 'null'}_${params.status || 'null'}`,
    [params.name, params.status]
  );

  const fetchClubs = useCallback(async () => {
    try {
      const cachedData = clubCache.get(cacheKey);
      const currentTime = Date.now();

      if (cachedData && (currentTime - cachedData.timestamp) < parseInt(process.env.CACHE_EXPIRATION_TIME || '0')) {
        setClubs(cachedData.data);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const data = await ServiceClub.getAll();

      // Update cache
      clubCache.set(cacheKey, {
        data: data as components["schemas"]["OrgClubDto"][],
        timestamp: currentTime
      });

      setClubs(data as components["schemas"]["OrgClubDto"][]);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch clubs');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [params, cacheKey]);

  const createClub = useCallback(async (clubData: Omit<components["schemas"]["OrgClubDto"], 'id'>) => {
    try {
      const newClub = await ServiceClub.create(clubData);

      // Invalidate cache for relevant keys
      const keysToInvalidate = Array.from(clubCache.keys()).filter(key =>
        key.includes(`clubs_${clubData.name || 'null'}_${clubData.status || 'null'}`)
      );
      keysToInvalidate.forEach(key => clubCache.delete(key));

      setClubs(prevClubs => [...prevClubs, newClub as components["schemas"]["OrgClubDto"]]);
      return newClub;
    } catch (err: any) {
      setError(err.message || 'Failed to create club');
      console.error(err);
      throw err;
    }
  }, []);

  const updateClub = useCallback(async (clubId: string, clubData: Partial<components["schemas"]["OrgClubDto"]>) => {
    try {
      const updatedClub = await ServiceClub.update(clubId, clubData);

      // Invalidate cache for relevant keys
      clubCache.clear(); // More aggressive cache invalidation

      setClubs(prevClubs =>
        prevClubs.map(club =>
          club.name === clubId ? { ...club, ...updatedClub } : club
        )
      );
      return updatedClub;
    } catch (err: any) {
      setError(err.message || 'Failed to update club');
      console.error(err);
      throw err;
    }
  }, []);

  const deleteClub = useCallback(async (clubId: string) => {
    try {
      await ServiceClub.delete(clubId);

      // Invalidate cache
      clubCache.clear(); // More aggressive cache invalidation

      setClubs(prevClubs => prevClubs.filter(club => club.name !== clubId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete club');
      console.error(err);
      throw err;
    }
  }, []);

  const updateParams = useCallback((newParams: { name: string, status: string }) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }) as components["schemas"]["OrgClubDto"]);
  }, []);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  return {
    clubs,
    isLoading,
    error,
    fetchClubs,
    createClub,
    updateClub,
    deleteClub,
    updateParams
  };
}
