import {createSlice} from '@reduxjs/toolkit';
import {SliceName} from '../../constants/common';
import {addToFavoriteAction, fetchFilmAction, fetchSimilarFilmsAction} from '../api-actions';
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
  isLoaded: false,
  isLoadError: false,
};

export const filmSlice = createSlice({
  name: SliceName.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmAction.pending, (state) => {
        state.isLoaded = true;
        state.isLoadError = false;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isLoaded = false;
        state.isLoadError = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isLoaded = false;
        state.isLoadError = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      })
      .addCase(addToFavoriteAction.fulfilled, (state, action) => {
        if (state.film.id === action.payload.id) {
          state.film = action.payload;
        }
      });
  }
});
