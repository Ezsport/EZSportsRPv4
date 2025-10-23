import { useState, useEffect } from "react";
import { TypeSport } from "@/types/types";
import SportService from "@/lib/services/service-sport";

export function useSports() {
  const [sports, setSports] = useState<TypeSport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSports = async () => {
      try {
        setLoading(true);
        const fetchedSports = await SportService.getSports();
        setSports(fetchedSports);
        setError(null);
      } catch (err) {
        console.error('Sports Fetch Error:', err);
        setError(err instanceof Error ? err.message : "Failed to fetch sports");
        setSports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSports();
  }, []);

  return { sports, loading, error };
}
