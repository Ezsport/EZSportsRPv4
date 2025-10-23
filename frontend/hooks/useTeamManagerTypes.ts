import { useState, useEffect } from 'react';
import { ServiceTeamManagerType, TeamManagerType, TeamManagerTypeQueryParams } from '@/lib/services/service-team-manager-type';

export function useTeamManagerTypes(initialParams?: TeamManagerTypeQueryParams) {
  const [teamManagerTypes, setTeamManagerTypes] = useState<TeamManagerType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<TeamManagerTypeQueryParams>(initialParams || {});

  const fetchTeamManagerTypes = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceTeamManagerType.getAll(params);
      setTeamManagerTypes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch team manager types');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createTeamManagerType = async (teamManagerTypeData: Omit<TeamManagerType, 'id'>) => {
    try {
      const newTeamManagerType = await ServiceTeamManagerType.create(teamManagerTypeData);
      setTeamManagerTypes(prevTeamManagerTypes => [...prevTeamManagerTypes, newTeamManagerType]);
      return newTeamManagerType;
    } catch (err: any) {
      setError(err.message || 'Failed to create team manager type');
      console.error(err);
      throw err;
    }
  };

  const updateTeamManagerType = async (teamManagerTypeId: string, teamManagerTypeData: Partial<TeamManagerType>) => {
    try {
      const updatedTeamManagerType = await ServiceTeamManagerType.update(teamManagerTypeId, teamManagerTypeData);
      setTeamManagerTypes(prevTeamManagerTypes => 
        prevTeamManagerTypes.map(teamManagerType => 
          teamManagerType.id === teamManagerTypeId ? { ...teamManagerType, ...updatedTeamManagerType } : teamManagerType
        )
      );
      return updatedTeamManagerType;
    } catch (err: any) {
      setError(err.message || 'Failed to update team manager type');
      console.error(err);
      throw err;
    }
  };

  const deleteTeamManagerType = async (teamManagerTypeId: string) => {
    try {
      await ServiceTeamManagerType.delete(teamManagerTypeId);
      setTeamManagerTypes(prevTeamManagerTypes => prevTeamManagerTypes.filter(teamManagerType => teamManagerType.id !== teamManagerTypeId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete team manager type');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: TeamManagerTypeQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchTeamManagerTypes();
  }, [JSON.stringify(params)]);

  return {
    teamManagerTypes,
    isLoading,
    error,
    fetchTeamManagerTypes,
    createTeamManagerType,
    updateTeamManagerType,
    deleteTeamManagerType,
    updateParams
  };
}
