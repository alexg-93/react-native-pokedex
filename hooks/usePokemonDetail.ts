import { useGetPokemonDetailQuery, useGetPokemonSpeciesQuery } from '@/store/pokemonApi';

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