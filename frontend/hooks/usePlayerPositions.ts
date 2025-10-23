import { useState, useEffect } from 'react';
import { ServicePlayerPosition, PlayerPosition } from '@/lib/services/service-player-position';

export function usePlayerPositions(sportId?: string) {
  const [playerPositions, setPlayerPositions] = useState<PlayerPosition[]>([]);
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPlayerPositions = async () => {
    try {
      setIsLoading(true);
      const data = await ServicePlayerPosition.getAll({ sportId });
      setPlayerPositions(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch player positions');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createPlayerPosition = async (playerPositionData: Omit<PlayerPosition, 'id'>) => {
    try {
      const newPlayerPosition = await ServicePlayerPosition.create(playerPositionData);
      setPlayerPositions(prevPlayerPositions => [...prevPlayerPositions, newPlayerPosition]);
      return newPlayerPosition;
    } catch (err: any) {
      setError(err.message || 'Failed to create player position');
      console.error(err);
      throw err;
    }
  };

  const updatePlayerPosition = async (playerPositionId: string, playerPositionData: Partial<PlayerPosition>) => {
    try {
      const updatedPlayerPosition = await ServicePlayerPosition.update(playerPositionId, playerPositionData);
      setPlayerPositions(prevPlayerPositions =>
        prevPlayerPositions.map(playerPosition =>
          playerPosition.id?.toString() === playerPositionId ? { ...playerPosition, ...updatedPlayerPosition } : playerPosition
        )
      );
      return updatedPlayerPosition;
    } catch (err: any) {
      setError(err.message || 'Failed to update player position');
      console.error(err);
      throw err;
    }
  };

  const deletePlayerPosition = async (playerPositionId: string) => {
    try {
      await ServicePlayerPosition.delete(playerPositionId);
      setPlayerPositions(prevPlayerPositions =>
        prevPlayerPositions.filter(playerPosition =>
          playerPosition.id?.toString() !== playerPositionId
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to delete player position');
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchPlayerPositions();
  }, [sportId]);

  return {
    playerPositions,
    loading,
    error,
    fetchPlayerPositions,
    createPlayerPosition,
    updatePlayerPosition,
    deletePlayerPosition,
  };
}
