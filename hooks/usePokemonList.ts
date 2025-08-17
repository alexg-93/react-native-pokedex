import { useState, useEffect, useCallback } from 'react';
import { useGetPokemonListQuery } from '@/store/pokemonApi';
import { useAppDispatch, useAppSelector } from './redux';
import { setFilteredPokemon } from '@/store/searchSlice';
import type { Pokemon } from '@/types/pokemon';
/**
 * A custom React hook for managing and filtering a list of Pokémon.
 * It fetches Pokémon data incrementally, accumulates it, and provides
 * filtering capabilities based on search queries and minimum strength (attack stat).
 *
 * @returns {{
 *   pokemonList: import('@/types/pokemon').Pokemon[],
 *   isLoading: boolean,
 *   isFetching: boolean,
 *   error: any,
 *   loadMore: () => void,
 *   hasMore: boolean,
 *   allPokemon: import('@/types/pokemon').Pokemon[]
 * }} An object containing the filtered Pokémon list, loading states, error,
 * a function to load more Pokémon, a boolean indicating if more Pokémon can be loaded,
 * and the complete list of all fetched Pokémon.
 */

export const usePokemonList = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);
  const filteredPokemon = useAppSelector(
    (state) => state.search.filteredPokemon,
  );
  const minStrength = useAppSelector((state) => state.search.minStrength);

  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);

  const { data, error, isLoading, isFetching } = useGetPokemonListQuery({
    offset,
    limit: 20,
  });

  // This effect updates the allPokemon state with newly fetched Pokémon data, ensuring no duplicates are added, especially when the offset changes.
  useEffect(() => {
    if (data?.pokemon) {
      setAllPokemon((prev) => {
        if (offset === 0) {
          return data.pokemon;
        }
        const existingPokemonIds = new Set(prev.map((p) => p.id));
        const uniqueNewPokemon = data.pokemon.filter(
          (p) => !existingPokemonIds.has(p.id),
        );
        return [...prev, ...uniqueNewPokemon];
      });
    }
  }, [data, offset]);

  //This effect filters the allPokemon list based on the searchQuery and minStrength (attack stat) and dispatches the filtered results to the Redux store.
  useEffect(() => {
    let filtered = allPokemon;

    if (searchQuery) {
      filtered = filtered.filter(
        (pokemon) =>
          pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pokemon.id.toString().includes(searchQuery),
      );
    }

    if (minStrength !== null) {
      filtered = filtered.filter((pokemon) => {
        if (!pokemon.stats) return false;
        const attackStat = pokemon.stats.find(
          (stat) => stat.stat.name === 'attack',
        );
        if (!attackStat) return false;
        return attackStat.base_stat >= minStrength;
      });
    }

    if (searchQuery || minStrength !== null) {
      dispatch(setFilteredPokemon(filtered));
    } else {
      dispatch(setFilteredPokemon([]));
    }
  }, [searchQuery, minStrength, allPokemon, dispatch]);

  // This memoized callback increments the offset to fetch more Pokémon, but only if there's more data available, not currently fetching, and no search or strength filters are active.
  const loadMore = useCallback(() => {
    if (data?.hasMore && !isFetching && !searchQuery && minStrength === null) {
      setOffset((prev) => prev + 20);
    }
  }, [data?.hasMore, isFetching, searchQuery, minStrength]);

  // This memoized callback resets the offset to 0 and clears the allPokemon list, effectively refreshing the Pokémon data.
  const refresh = useCallback(() => {
    setOffset(0);
    setAllPokemon([]);
  }, []);

  const displayPokemon = searchQuery || minStrength !== null ? filteredPokemon : allPokemon;

  return {
    pokemon: displayPokemon,
    isLoading: isLoading,
    isFetching,
    hasMore: data?.hasMore || false,
    error,
    loadMore,
    refresh,
  };
};