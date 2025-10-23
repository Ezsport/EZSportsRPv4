import { useState, useEffect } from 'react';
import { ServiceLeague, League, LeagueQueryParams } from '@/lib/services/service-league';

export function useLeagues(initialParams?: LeagueQueryParams) {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<LeagueQueryParams>(initialParams || {});

  const fetchLeagues = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceLeague.getAll(params);
      setLeagues(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch leagues');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createLeague = async (leagueData: Omit<League, 'id'>) => {
    try {
      const newLeague = await ServiceLeague.create(leagueData);
      setLeagues(prevLeagues => [...prevLeagues, newLeague]);
      return newLeague;
    } catch (err: any) {
      setError(err.message || 'Failed to create league');
      console.error(err);
      throw err;
    }
  };

  const updateLeague = async (leagueId: string, leagueData: Partial<League>) => {
    try {
      const updatedLeague = await ServiceLeague.update(leagueId, leagueData);
      setLeagues(prevLeagues => 
        prevLeagues.map(league => 
          league.id === leagueId ? { ...league, ...updatedLeague } : league
        )
      );
      return updatedLeague;
    } catch (err: any) {
      setError(err.message || 'Failed to update league');
      console.error(err);
      throw err;
    }
  };

  const deleteLeague = async (leagueId: string) => {
    try {
      await ServiceLeague.delete(leagueId);
      setLeagues(prevLeagues => prevLeagues.filter(league => league.id !== leagueId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete league');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: LeagueQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchLeagues();
  }, [JSON.stringify(params)]);

  return {
    leagues,
    isLoading,
    error,
    fetchLeagues,
    createLeague,
    updateLeague,
    deleteLeague,
    updateParams
  };
}
