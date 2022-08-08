import {createSlice} from '@reduxjs/toolkit';
import {SliceName} from '../../constants/common';
import {fetchFilmAction, fetchSimilarFilmsAction} from '../api-actions';
import {FilmSlice} from '../../types/state';

const initialState: FilmSlice = {
  film: {
    id: 0,
    name: '',
    posterImage: '',
    previewImage: '',
    backgroundImage: '',
    backgroundColor: '',
    videoLink: '',
    previewVideoLink: '',
    description: '',
    rating: 0,
    scoresCount: 0,
    director: '',
    starring: [],
    runTime: 0,
    genre: '',
    released: 0,
    isFavorite: false,
  },
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
