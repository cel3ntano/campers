import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { campersReducer } from './campers/slice.js';
import { filtersReducer } from './filters/slice.js';
import { favouritesReducer } from './favourites/slice.js';
import storage from 'redux-persist/lib/storage';

const favoritesPersistConfig = {
  key: 'favourites',
  storage,
  whitelist: ['items'],
};

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: persistReducer(favoritesPersistConfig, favouritesReducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
