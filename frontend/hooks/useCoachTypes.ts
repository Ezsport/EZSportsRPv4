import { useState, useEffect } from 'react';
import { ServiceCoachType, CoachType, CoachTypeQueryParams } from '@/lib/services/service-coach-type';
import { components } from "@/types/api-types";

export default function useCoachTypes(sportId?: string | null) {
  const [coachTypes, setCoachTypes] = useState<components["schemas"]["SportCoachTypeDto"][]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCoachTypes = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceCoachType.getBySportId(sportId);
      setCoachTypes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch coach types');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createCoachType = async (coachTypeData: Omit<components["schemas"]["SportCoachTypeDto"], 'id'>) => {
    try {
      const newCoachType = await ServiceCoachType.create(coachTypeData);
      setCoachTypes(prevCoachTypes => [...prevCoachTypes, newCoachType]);
      return newCoachType;
    } catch (err: any) {
      setError(err.message || 'Failed to create coach type');
      console.error(err);
      throw err;
    }
  };

  const updateCoachType = async (coachTypeId: string, coachTypeData: Partial<components["schemas"]["SportCoachTypeDto"]>) => {
    try {
      const updatedCoachType = await ServiceCoachType.update(coachTypeId, coachTypeData);
      setCoachTypes(prevCoachTypes =>
        prevCoachTypes.map(coachType =>
          coachType.id === coachTypeId ? { ...coachType, ...updatedCoachType } : coachType
        )
      );
      return updatedCoachType;
    } catch (err: any) {
      setError(err.message || 'Failed to update coach type');
      console.error(err);
      throw err;
    }
  };

  const deleteCoachType = async (coachTypeId: number) => {
    try {
      await ServiceCoachType.delete(coachTypeId);
      setCoachTypes(prevCoachTypes => prevCoachTypes.filter(coachType => coachType.id !== coachTypeId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete coach type');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    if (sportId) {
      fetchCoachTypes();
    } else {
      setCoachTypes([]);
      setError('Sport ID is required');
      setIsLoading(false);
    }
  }, [sportId]);

  return {
    coachTypes,
    isLoading,
    error,
    fetchCoachTypes,
    createCoachType,
    updateCoachType,
    deleteCoachType,
  };
}
