import {State} from '../../types/state';
import {SliceName} from '../../constants/common';

export const selectFilm = (state: State) => state[SliceName.Film].film;

export const selectSimilarFilms = (state: State) => state[SliceName.Film].similarFilms;
