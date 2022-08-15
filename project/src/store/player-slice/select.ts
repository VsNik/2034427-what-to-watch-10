import {State} from '../../types/state';
import {PlayType, SliceName} from '../../constants/common';

export const selectPlayType = (state: State) => state[SliceName.Player].playType;

export const selectPlayFilm = (state: State) =>
  state[SliceName.Player].playType === PlayType.Film
    ? state[SliceName.Film].film
    : state[SliceName.Promo].promoFilm;
