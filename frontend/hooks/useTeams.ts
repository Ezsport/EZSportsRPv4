import { useState, useEffect, useMemo, useCallback } from 'react';
import ServiceTeam from '@/lib/services/service-team';

// Create a simple cache mechanism
const teamCache = new Map<string, { 
  data: Team[], 
  timestamp: number 
}>();

const CACHE_EXPIRATION_TIME = 5 * 60 * 1000; // 5 minutes

export function useTeams(clubId?: string, sportId?: string) {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create a unique cache key based on parameters
  const cacheKey = useMemo(() => 
    `teams_${clubId || 'null'}_${sportId || 'null'}`, 
    [clubId, sportId]
  );

  const fetchTeams = useCallback(async () => {
    try {
      // Check cache first
      const cachedData = teamCache.get(cacheKey);
      const currentTime = Date.now();

      if (cachedData && (currentTime - cachedData.timestamp) < CACHE_EXPIRATION_TIME) {
        setTeams(cachedData.data);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const data = await ServiceTeam.getByClubAndSport(clubId, sportId);
      
      // Update cache
      teamCache.set(cacheKey, {
        data,
        timestamp: currentTime
      });

      setTeams(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch teams');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [clubId, sportId, cacheKey]);

  const createTeam = useCallback(async (teamData: Omit<Team, 'id'>) => {
    try {
      const newTeam = await ServiceTeam.create(teamData);
      
      // Invalidate cache for relevant keys
      const keysToInvalidate = Array.from(teamCache.keys()).filter(key => 
        key.includes(`teams_${teamData.clubId || 'null'}_${teamData.sportId || 'null'}`)
      );
      keysToInvalidate.forEach(key => teamCache.delete(key));

      setTeams(prevTeams => [...prevTeams, newTeam]);
      return newTeam;
    } catch (err: any) {
      setError(err.message || 'Failed to create team');
      console.error(err);
      throw err;
    }
  }, []);

  const updateTeam = useCallback(async (teamId: string, teamData: Partial<Team>) => {
    try {
      const updatedTeam = await ServiceTeam.update(teamId, teamData);
      
      // Invalidate cache for relevant keys
      teamCache.clear(); // More aggressive cache invalidation

      setTeams(prevTeams => 
        prevTeams.map(team => 
          team.id === teamId ? { ...team, ...updatedTeam } : team
        )
      );
      return updatedTeam;
    } catch (err: any) {
      setError(err.message || 'Failed to update team');
      console.error(err);
      throw err;
    }
  }, []);

  const deleteTeam = useCallback(async (teamId: string) => {
    try {
      await ServiceTeam.delete(teamId);
      
      // Invalidate cache
      teamCache.clear(); // More aggressive cache invalidation

      setTeams(prevTeams => prevTeams.filter(team => team.id !== teamId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete team');
      console.error(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchTeams();
  }, [fetchTeams]);

  return {
    teams,
    isLoading,
    error,
    fetchTeams,
    createTeam,
    updateTeam,
    deleteTeam,
  };
}
