import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pokemonApi } from './pokemonApi';
import searchReducer from './searchSlice';
/**
 * Configuration for Redux Persist.
 * It defines the storage key, the storage engine (AsyncStorage),
 * and a whitelist of reducers to be persisted.
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['search', pokemonApi.reducerPath], // Persist search and API state
};

/**
 * Combines all individual reducers into a single root reducer.
 * This includes the RTK Query API reducer and the search slice reducer.
 */
const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  search: searchReducer,
});

/**
 * Creates a persisted reducer by wrapping the rootReducer with Redux Persist configuration.
 * This allows the state to be saved and rehydrated from storage.
 */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/**
 * Configures the Redux store.
 * It uses the persistedReducer and adds RTK Query middleware for API interactions.
 * Serializability and immutability checks are disabled for compatibility with Redux Persist.
 */
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable for Redux Persist
      immutableCheck: false, // Disable for Redux Persist
    }).concat(pokemonApi.middleware), // Add RTK Query middleware
});

/**
 * Creates a persistor object that can be used to purge or rehydrate the store.
 */
export const persistor = persistStore(store);

/**
 * Type definition for the entire Redux store state.
 * Inferred from the `store.getState` method.
 */
export type RootState = ReturnType<typeof store.getState>;
/**
 * Type definition for the Redux store's dispatch function.
 * Inferred from the `store.dispatch` method.
 */
export type AppDispatch = typeof store.dispatch;
