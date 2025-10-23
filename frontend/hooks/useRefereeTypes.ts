import { useState, useEffect } from 'react';
import { ServiceRefereeType, RefereeType, RefereeTypeQueryParams } from '@/lib/services/service-referee-type';

export function useRefereeTypes(initialParams?: RefereeTypeQueryParams) {
  const [refereeTypes, setRefereeTypes] = useState<RefereeType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<RefereeTypeQueryParams>(initialParams || {});

  const fetchRefereeTypes = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceRefereeType.getAll(params);
      setRefereeTypes(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch referee types');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createRefereeType = async (refereeTypeData: Omit<RefereeType, 'id'>) => {
    try {
      const newRefereeType = await ServiceRefereeType.create(refereeTypeData);
      setRefereeTypes(prevRefereeTypes => [...prevRefereeTypes, newRefereeType]);
      return newRefereeType;
    } catch (err: any) {
      setError(err.message || 'Failed to create referee type');
      console.error(err);
      throw err;
    }
  };

  const updateRefereeType = async (refereeTypeId: string, refereeTypeData: Partial<RefereeType>) => {
    try {
      const updatedRefereeType = await ServiceRefereeType.update(refereeTypeId, refereeTypeData);
      setRefereeTypes(prevRefereeTypes => 
        prevRefereeTypes.map(refereeType => 
          refereeType.id === refereeTypeId ? { ...refereeType, ...updatedRefereeType } : refereeType
        )
      );
      return updatedRefereeType;
    } catch (err: any) {
      setError(err.message || 'Failed to update referee type');
      console.error(err);
      throw err;
    }
  };

  const deleteRefereeType = async (refereeTypeId: string) => {
    try {
      await ServiceRefereeType.delete(refereeTypeId);
      setRefereeTypes(prevRefereeTypes => prevRefereeTypes.filter(refereeType => refereeType.id !== refereeTypeId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete referee type');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: RefereeTypeQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchRefereeTypes();
  }, [JSON.stringify(params)]);

  return {
    refereeTypes,
    isLoading,
    error,
    fetchRefereeTypes,
    createRefereeType,
    updateRefereeType,
    deleteRefereeType,
    updateParams
  };
}
