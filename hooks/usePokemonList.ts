import { useState, useEffect, useCallback } from 'react';
import { useGetPokemonListQuery } from '@/store/pokemonApi';
import { useAppDispatch, useAppSelector } from './redux';
import { setFilteredPokemon } from '@/store/searchSlice';
import type { Pokemon } from '@/types/pokemon';

export const usePokemonList = () => {
  const dispatch = useAppDispatch();
  const searchQuery = useAppSelector((state) => state.search.query);
  const filteredPokemon = useAppSelector((state) => state.search.filteredPokemon);
  
  const [offset, setOffset] = useState(0);
  const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
  
  const { data, error, isLoading, isFetching } = useGetPokemonListQuery({
    offset,
    limit: 20,
  });

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

  useEffect(() => {
    if (searchQuery && allPokemon.length > 0) {
      const filtered = allPokemon.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pokemon.id.toString().includes(searchQuery)
      );
      dispatch(setFilteredPokemon(filtered));
    } else {
      dispatch(setFilteredPokemon([]));
    }
  }, [searchQuery, allPokemon, dispatch]);

  const loadMore = useCallback(() => {
    if (data?.hasMore && !isFetching && !searchQuery) {
      setOffset(prev => prev + 20);
    }
  }, [data?.hasMore, isFetching, searchQuery]);

  const refresh = useCallback(() => {
    setOffset(0);
    setAllPokemon([]);
  }, []);

  const displayPokemon = searchQuery ? filteredPokemon : allPokemon;

  return {
    pokemon: displayPokemon,
    isLoading: isLoading && offset === 0,
    isFetching,
    hasMore: data?.hasMore || false,
    error,
    loadMore,
    refresh,
  };
};