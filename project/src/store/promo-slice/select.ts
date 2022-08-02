import {State} from '../../types/state';
import {SliceName} from '../../constants/common';

export const selectPromoFilm = (state: State) => state[SliceName.Promo].promoFilm;

export const selectIsLoadedPromo = (state: State) => state[SliceName.Promo].isLoaded;
