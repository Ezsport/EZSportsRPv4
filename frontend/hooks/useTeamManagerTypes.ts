import { useState, useEffect } from 'react';
import { ServiceTeamManagerType } from '@/lib/services/service-team-manager-type';
import { components } from "@/types/api-types";

export default function useTeamManagerTypes(sportId?: string | null) {
  const [teamManagerTypes, setTeamManagerTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTeamManagerTypes = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceTeamManagerType.getBySportId(sportId);
      setTeamManagerTypes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch team manager types');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createTeamManagerType = async (teamManagerTypeData: any) => {
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

  const updateTeamManagerType = async (teamManagerTypeId: string, teamManagerTypeData: any) => {
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

  useEffect(() => {
    if (sportId) {
      fetchTeamManagerTypes();
    } else {
      setTeamManagerTypes([]);
      setError('Sport ID is required');
      setIsLoading(false);
    }
  }, [sportId]);

  return {
    teamManagerTypes,
    isLoading,
    error,
    fetchTeamManagerTypes,
    createTeamManagerType,
    updateTeamManagerType,
    deleteTeamManagerType,
  };
}
