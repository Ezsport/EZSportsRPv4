import { useState, useEffect } from 'react';
import { ServiceGamePeriod, GamePeriod, GamePeriodQueryParams } from '@/lib/services/service-game-period';

export function useGamePeriods(initialParams?: GamePeriodQueryParams) {
  const [gamePeriods, setGamePeriods] = useState<GamePeriod[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<GamePeriodQueryParams>(initialParams || {});

  const fetchGamePeriods = async () => {
    try {
      setIsLoading(true);
      const data = await ServiceGamePeriod.getAll(params);
      setGamePeriods(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch game periods');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createGamePeriod = async (gamePeriodData: Omit<GamePeriod, 'id'>) => {
    try {
      const newGamePeriod = await ServiceGamePeriod.create(gamePeriodData);
      setGamePeriods(prevGamePeriods => [...prevGamePeriods, newGamePeriod]);
      return newGamePeriod;
    } catch (err: any) {
      setError(err.message || 'Failed to create game period');
      console.error(err);
      throw err;
    }
  };

  const updateGamePeriod = async (gamePeriodId: string, gamePeriodData: Partial<GamePeriod>) => {
    try {
      const updatedGamePeriod = await ServiceGamePeriod.update(gamePeriodId, gamePeriodData);
      setGamePeriods(prevGamePeriods => 
        prevGamePeriods.map(gamePeriod => 
          gamePeriod.id === gamePeriodId ? { ...gamePeriod, ...updatedGamePeriod } : gamePeriod
        )
      );
      return updatedGamePeriod;
    } catch (err: any) {
      setError(err.message || 'Failed to update game period');
      console.error(err);
      throw err;
    }
  };

  const deleteGamePeriod = async (gamePeriodId: string) => {
    try {
      await ServiceGamePeriod.delete(gamePeriodId);
      setGamePeriods(prevGamePeriods => prevGamePeriods.filter(gamePeriod => gamePeriod.id !== gamePeriodId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete game period');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: GamePeriodQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchGamePeriods();
  }, [JSON.stringify(params)]);

  return {
    gamePeriods,
    isLoading,
    error,
    fetchGamePeriods,
    createGamePeriod,
    updateGamePeriod,
    deleteGamePeriod,
    updateParams
  };
}
