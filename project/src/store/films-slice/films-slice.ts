import {createSlice} from '@reduxjs/toolkit';
import {DEFAULT_GENRE, SliceName} from '../../constants/common';
import {addToFavoriteAction, fetchFilmsAction} from '../api-actions';
import type {FilmsSlice} from '../../types/state';

const initialState: FilmsSlice = {
  genre: DEFAULT_GENRE,
  films: [],
  isLoaded: false
};

export const filmsSlice = createSlice({
  name: SliceName.Films,
  initialState,
  reducers: {
    changeGenre: (state, action) => {
      state.genre = action.payload ?? DEFAULT_GENRE;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isLoaded = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.films = action.payload;
        state.isLoaded = false;
      })
      .addCase(addToFavoriteAction.fulfilled, (state, action) => {
        const index = state.films.findIndex((item) => item.id === action.payload.id);
        state.films[index].isFavorite = action.payload.isFavorite;
      });
  },
});

export const {changeGenre} = filmsSlice.actions;
