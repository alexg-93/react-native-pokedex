import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { pokemonApi } from './pokemonApi';
import searchReducer from './searchSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['search', pokemonApi.reducerPath], // Persist search and API state
};

const rootReducer = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(pokemonApi.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
