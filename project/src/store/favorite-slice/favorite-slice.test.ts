import {FavoriteSlice} from '../../types/state';
import {favoriteSlice} from './favorite-slice';
import {fetchFavoritesAction} from '../api-actions';
import {makeFakeFilms} from '../../utils/mocks';

describe('Slice favorite', () => {
  let state: FavoriteSlice;

  beforeEach(() => {
    state = {
      favorites: [],
      isLoaded: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(favoriteSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({favorites: [], isLoaded: false});
  });

  describe('fetchFavorites test', () => {
    it('should update isSending to "true" if fetchFavorites pending', () => {
      expect(favoriteSlice.reducer(state, {type: fetchFavoritesAction.pending.type}))
        .toEqual({favorites: [], isLoaded: true});
    });

    it('should update favorites by load favorites', () => {
      const favorites = makeFakeFilms();

      expect(favoriteSlice.reducer(state, {type: fetchFavoritesAction.fulfilled.type, payload: favorites}))
        .toEqual({favorites, isLoaded: false});
    });
  });
});
