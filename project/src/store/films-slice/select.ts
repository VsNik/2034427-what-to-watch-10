import {createSelector} from '@reduxjs/toolkit';
import {State} from '../../types/state';
import {DEFAULT_GENRE, SliceName} from '../../constants/common';
import {FilmType} from '../../types/film';
import {getGenres} from '../../utils/common';

export const selectActiveGenre = (state: State) => state[SliceName.Films].genre;

export const selectFilms = (state: State) => state[SliceName.Films].films;

export const selectIsLoadedFilms = (state: State) => state[SliceName.Films].isLoaded;

export const selectFilterFilms = createSelector(
  [selectFilms, selectActiveGenre],
  (films, genre) => {
    if (genre === DEFAULT_GENRE) {
      return films;
    }
    return films.filter((item: FilmType) => item.genre.toLowerCase() === genre);
  },
);

export const selectGenres = createSelector(
  selectFilms,
  (films) => getGenres(films),
);
