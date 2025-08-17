import { useGetPokemonDetailQuery, useGetPokemonSpeciesQuery } from '@/store/pokemonApi';

/**
 * A custom React hook to fetch and combine detailed information for a given Pokémon.
 * It fetches both general Pokémon data and species-specific data (for description).
 *
 * @param {string} pokemonName The name of the Pokémon to fetch details for.
 * @returns {{
 *   pokemon: import('@/types/pokemon').PokemonDetail | undefined,
 *   description: string,
 *   isLoading: boolean,
 *   error: any
 * }} An object containing the Pokémon data, its English description, loading state, and any error.
 */
export const usePokemonDetail = (pokemonName: string) => {
  const {
    data: pokemonData,
    error: pokemonError,
    isLoading: isPokemonLoading,
  } = useGetPokemonDetailQuery(pokemonName);

  const {
    data: speciesData,
    error: speciesError,
    isLoading: isSpeciesLoading,
  } = useGetPokemonSpeciesQuery(pokemonName);

  const getDescription = () => {
    if (!speciesData) return '';
    const englishEntry = speciesData.flavor_text_entries.find(
      entry => entry.language.name === 'en'
    );
    return englishEntry?.flavor_text.replace(/\f/g, ' ') || '';
  };

  return {
    pokemon: pokemonData,
    description: getDescription(),
    isLoading: isPokemonLoading || isSpeciesLoading,
    error: pokemonError || speciesError,
  };
};