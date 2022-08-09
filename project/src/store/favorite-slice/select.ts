import {State} from '../../types/state';
import {SliceName} from '../../constants/common';

export const selectFavorites = (state: State) => state[SliceName.Favorite].favorites;

export const selectIsLoadedFavorites = (state: State) => state[SliceName.Favorite].isLoaded;
