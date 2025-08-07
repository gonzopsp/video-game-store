// src/features/videogame/videogameSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; 
import { fetchVideogameData } from '../api';
import type { videogame } from '../types/types';

type StoreState = {
  videogamesSupply: videogame[];
};

const initialState: StoreState = {
  videogamesSupply: [],
};

// Async thunk for loading games
export const loadGames = createAsyncThunk(
  'videogame/loadGames',
  async () => {
    const response = await fetchVideogameData();
    return response; // returns videogame[]
  }
);

const videogameSlice = createSlice({
  name: 'videogame',
  initialState,
  reducers: {
    agregarNuevo: (state, action: PayloadAction<videogame>) => {
      state.videogamesSupply.push(action.payload);
    },
    modificarStock: (state, action: PayloadAction<{ id: number; nuevoStock: number }>) => {
      const game = state.videogamesSupply.find((g) => g.id === action.payload.id);
      if (game) game.stock = action.payload.nuevoStock;
    },
    editarJuego: (state, action: PayloadAction<{ id: number; newGame: videogame }>) => {
      const index = state.videogamesSupply.findIndex((g) => g.id === action.payload.id);
      if (index >= 0) state.videogamesSupply[index] = action.payload.newGame;
    },
    comprar: (state, action: PayloadAction<{ id: number }>) => {
      console.log('Juego comprado :)', action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadGames.fulfilled, (state, action) => {
      state.videogamesSupply = action.payload;
    });
  },
});

export const { agregarNuevo, modificarStock, editarJuego, comprar } = videogameSlice.actions;
export default videogameSlice.reducer;
