import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { PokemonListResponse, PokemonDetail, PokemonSpecies, Pokemon } from '@/types/pokemon';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2/',
  }),
  tagTypes: ['Pokemon', 'PokemonDetail'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<
      { pokemon: Pokemon[]; hasMore: boolean },
      { offset: number; limit: number }
    >({
      query: ({ offset, limit }) => `pokemon?offset=${offset}&limit=${limit}`,
      /**
       * Transforms the raw PokemonListResponse by fetching detailed information for each Pokemon.
       * @param response The raw response from the Pokemon list API.
       * @returns An object containing an array of Pokemon with detailed information.
       */
      transformResponse: async (response: PokemonListResponse) => {
        const pokemonWithDetails = await Promise.all(
          response.results.map(async (pokemon) => {
            const id = parseInt(
              pokemon.url.split('/').filter(Boolean).pop() || '0',
            );
            const detailResponse = await fetch(
              `https://pokeapi.co/api/v2/pokemon/${id}`,
            );
            const detail: PokemonDetail = await detailResponse.json();
            return {
              id,
              name: pokemon.name,
              url: pokemon.url,
              image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
              stats: detail.stats,
            };
          }),
        );
        return {
          pokemon: pokemonWithDetails,
          hasMore: response.next !== null,
        };
      },
      providesTags: ['Pokemon'],
    }),
    /* The `getPokemonDetail` endpoint in the `pokemonApi` is a query function that fetches detailed
    information about a specific Pokemon based on its name.*/
    getPokemonDetail: builder.query<PokemonDetail, string>({
      query: (name) => `pokemon/${name.toLowerCase()}`,
      providesTags: ['PokemonDetail'],
    }),
    getPokemonSpecies: builder.query<PokemonSpecies, string>({
      query: (name) => `pokemon-species/${name.toLowerCase()}`,
    }),
  }),
});

export const {
  useGetPokemonListQuery,
  useGetPokemonDetailQuery,
  useGetPokemonSpeciesQuery,
} = pokemonApi;