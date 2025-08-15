// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import videogameReducer from '../hooks/videogameSlice';

export const store = configureStore({
  reducer: {
    videogame: videogameReducer,
  },
});

// Tipos para usar en componentes y dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
