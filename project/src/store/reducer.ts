import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, loadFilms, loadPromoFilms, requireAuth, setDataLoadedStatus, setError} from './actions';
import {FilmType} from '../types/film';
import {DEFAULT_GENRE} from '../constants/common';
import {AuthStatus} from '../constants/auth-status';

type FilmsStateType = {
  genre: string;
  films: FilmType[];
  promoFilm: FilmType;
  isDataLoaded: boolean;
  authStatus: AuthStatus;
  error: string | null;
}

const initialState: FilmsStateType = {
  genre: DEFAULT_GENRE,
  films: [],
  promoFilm: {} as FilmType,
  isDataLoaded: false,
  authStatus: AuthStatus.Unknown,
  error: null,
};

export const reducer = createReducer(initialState, ((builder) => {
  builder
    .addCase(requireAuth, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.films = action.payload;
    })
    .addCase(loadPromoFilms, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(changeGenre, (state, action) => {
      state.genre = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
}));

