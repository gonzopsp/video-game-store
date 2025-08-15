import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { fetchVideogameData } from '../api';
import type { videogame } from '../types/types';

type StoreState = {
  videogamesSupply: videogame[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: StoreState = {
  videogamesSupply: [],
  status: 'idle',
  error: null,
};

// Async thunk
export const loadGames = createAsyncThunk('videogame/loadGames', async () => {
  const response = await fetchVideogameData();
  return response;
});

const videogameSlice = createSlice({
  name: 'videogame',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadGames.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loadGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videogamesSupply = action.payload;
      })
      .addCase(loadGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Error al cargar juegos';
      });
  },
});

export default videogameSlice.reducer;
