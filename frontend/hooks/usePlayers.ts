import { useState, useEffect } from 'react';
import { ServicePlayer, Player, PlayerQueryParams } from '@/lib/services/service-player';

export function usePlayers(initialParams?: PlayerQueryParams) {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [params, setParams] = useState<PlayerQueryParams>(initialParams || {});

  const fetchPlayers = async () => {
    try {
      setIsLoading(true);
      const data = await ServicePlayer.getAll(params);
      setPlayers(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch players');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const createPlayer = async (playerData: Omit<Player, 'id'>) => {
    try {
      const newPlayer = await ServicePlayer.create(playerData);
      setPlayers(prevPlayers => [...prevPlayers, newPlayer]);
      return newPlayer;
    } catch (err: any) {
      setError(err.message || 'Failed to create player');
      console.error(err);
      throw err;
    }
  };

  const updatePlayer = async (playerId: string, playerData: Partial<Player>) => {
    try {
      const updatedPlayer = await ServicePlayer.update(playerId, playerData);
      setPlayers(prevPlayers => 
        prevPlayers.map(player => 
          player.id === playerId ? { ...player, ...updatedPlayer } : player
        )
      );
      return updatedPlayer;
    } catch (err: any) {
      setError(err.message || 'Failed to update player');
      console.error(err);
      throw err;
    }
  };

  const deletePlayer = async (playerId: string) => {
    try {
      await ServicePlayer.delete(playerId);
      setPlayers(prevPlayers => prevPlayers.filter(player => player.id !== playerId));
    } catch (err: any) {
      setError(err.message || 'Failed to delete player');
      console.error(err);
      throw err;
    }
  };

  const updateParams = (newParams: PlayerQueryParams) => {
    setParams(prevParams => ({ ...prevParams, ...newParams }));
  };

  useEffect(() => {
    fetchPlayers();
  }, [JSON.stringify(params)]);

  return {
    players,
    isLoading,
    error,
    fetchPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer,
    updateParams
  };
}
