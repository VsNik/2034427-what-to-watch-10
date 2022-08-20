import {State} from '../../types/state';
import {SliceName} from '../../constants/common';

export const selectFilm = (state: State) => state[SliceName.Film].film;

export const selectSimilarFilms = (state: State) => state[SliceName.Film].similarFilms;

export const selectIsLoadedFilm = (state: State) => state[SliceName.Film].isLoaded;

export const selectIsLoadedError = (state: State) => state[SliceName.Film].isLoadError;
