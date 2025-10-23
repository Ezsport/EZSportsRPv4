import { useState, useEffect } from 'react';
import { TypeCountry } from '@/types/types';
import { ServiceCountry } from "@/lib/services/service-country";

// Singleton-like cache for countries
class CountriesCache {
  private static instance: CountriesCache;
  private countries: TypeCountry[] = [];
  private loading = false;
  private error: Error | null = null;

  private constructor() { }

  static getInstance(): CountriesCache {
    if (!CountriesCache.instance) {
      CountriesCache.instance = new CountriesCache();
    }
    return CountriesCache.instance;
  }

  async fetchCountries(): Promise<TypeCountry[]> {
    if (this.countries.length > 0) {
      return this.countries;
    }

    if (this.loading) {
      // If already loading, wait for the existing request to complete
      return new Promise((resolve, reject) => {
        const checkLoaded = () => {
          if (this.countries.length > 0) {
            resolve(this.countries);
          } else if (this.error) {
            reject(this.error);
          } else {
            setTimeout(checkLoaded, 100);
          }
        };
        checkLoaded();
      });
    }

    this.loading = true;
    this.error = null;

    try {
      this.countries = await ServiceCountry.getCountries();
      this.loading = false;
      return this.countries;
    } catch (err) {
      this.error = err instanceof Error ? err : new Error('Failed to fetch countries');
      this.loading = false;
      throw this.error;
    }
  }

  getCountries(): { countries: TypeCountry[], loading: boolean, error: Error | null } {
    return {
      countries: this.countries,
      loading: this.loading,
      error: this.error
    };
  }
}

export function useCountries() {
  const [state, setState] = useState(() => {
    const cache = CountriesCache.getInstance();
    return cache.getCountries();
  });

  useEffect(() => {
    const cache = CountriesCache.getInstance();

    // Only fetch if no countries are loaded
    if (state.countries.length === 0 && !state.loading) {
      cache.fetchCountries()
        .then(() => setState(cache.getCountries()))
        .catch(() => setState(cache.getCountries()));
    }
  }, []);

  return state;
}
