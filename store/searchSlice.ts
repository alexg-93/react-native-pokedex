import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Pokemon } from '@/types/pokemon';

interface SearchState {
  query: string;
  filteredPokemon: Pokemon[];
  minStrength: number | null;
}

const initialState: SearchState = {
  query: '',
  filteredPokemon: [],
  minStrength: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setFilteredPokemon: (state, action: PayloadAction<Pokemon[]>) => {
      state.filteredPokemon = action.payload;
    },
    setMinStrength: (state, action: PayloadAction<number | null>) => {
      state.minStrength = action.payload;
    },
    clearSearch: (state) => {
      state.query = '';
      state.filteredPokemon = [];
    },
  },
});

export const {
  setSearchQuery,
  setFilteredPokemon,
  setMinStrength,
  clearSearch,
} = searchSlice.actions;
export default searchSlice.reducer;

export type { SearchState };