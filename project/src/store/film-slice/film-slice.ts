import {FilmType} from '../../types/film';
import {createSlice} from '@reduxjs/toolkit';
import {SliceName} from '../../constants/common';
import {fetchFilmAction, fetchSimilarFilmsAction} from '../api-actions';
import {FilmSlice} from '../../types/state';

const initialState: FilmSlice = {
  film: {} as FilmType,
  similarFilms: [],
};

export const filmSlice = createSlice({
  name: SliceName.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      });
  }
});
