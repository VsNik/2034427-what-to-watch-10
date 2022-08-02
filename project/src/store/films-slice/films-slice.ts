import {createSlice} from '@reduxjs/toolkit';
import {FilmType} from '../../types/film';
import {DEFAULT_GENRE, SliceName} from '../../constants/common';
import {fetchFilmsAction} from '../api-actions';

type FilmsState = {
  genre: string;
  films: FilmType[];
  isLoaded: boolean;
}

const initialState: FilmsState = {
  genre: DEFAULT_GENRE,
  films: [],
  isLoaded: false,
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
      });
  },
});

export const {changeGenre} = filmsSlice.actions;
