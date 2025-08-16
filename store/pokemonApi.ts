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
      transformResponse: (response: PokemonListResponse) => {
        const pokemon = response.results.map((pokemon, index) => {
          const id = parseInt(pokemon.url.split('/').filter(Boolean).pop() || '0');
          return {
            id,
            name: pokemon.name,
            url: pokemon.url,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          };
        });
        return {
          pokemon,
          hasMore: response.next !== null,
        };
      },
      providesTags: ['Pokemon'],
    }),
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