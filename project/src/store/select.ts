import {State} from '../types/state';
import {FilmType} from '../types/film';
import {getGenres} from '../utils/common';
import {DEFAULT_GENRE} from '../constants/common';

export const selectIsDataLoaded = (state: State) => state.isDataLoaded;

export const selectFilms = (state: State) => state.films;

export const selectPromoFilm = (state: State) => state.promoFilm;

export const selectFilterFilms = (state: State) =>
  state.genre !== DEFAULT_GENRE
    ? state.films.filter((item: FilmType) => item.genre.toLowerCase() === state.genre)
    : state.films;

export const selectFilmGenres = (state: State) => getGenres(state.films);

export const selectAuthStatus = (state: State) => state.authStatus;

export const selectError = (state: State) => state.error;
