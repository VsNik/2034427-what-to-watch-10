import {PromoSlice} from '../../types/state';
import {makeDefaultFilm, makeFakeFilms, MOCK_ID, UNKNOWN_ACTION} from '../../utils/mocks';
import {promoSlice} from './promo-slice';
import {addToFavoriteAction, fetchPromoFilmAction} from '../api-actions';

describe('Promo slice', () => {
  let state: PromoSlice;
  const defaultFilm = makeDefaultFilm();

  beforeEach(() => {
    state = {
      promoFilm: defaultFilm,
      isLoaded: false,
      isLoadError: false,
    };
  });

  it('without additional parameters should return initial state',() => {
    expect(promoSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({promoFilm: defaultFilm, isLoaded: false, isLoadError: false});
  });

  describe('fetchPromoFilmAction test', () => {
    it('should update isLoaded to "true" if fetchFilmsAction pending', () => {
      expect(promoSlice.reducer(state, {type: fetchPromoFilmAction.pending.type}))
        .toEqual({promoFilm: defaultFilm, isLoaded: true, isLoadError: false});
    });

    it('should update film if fetchPromoFilmAction fulfilled', () => {
      const promoFilms = makeFakeFilms();

      expect(promoSlice.reducer(state, {type: fetchPromoFilmAction.fulfilled.type, payload: promoFilms}))
        .toEqual({promoFilm: promoFilms, isLoaded: false, isLoadError: false});
    });

    it('should update isLoaded to "true" if fetchFilmsAction rejected', () => {
      expect(promoSlice.reducer(state, {type: fetchPromoFilmAction.rejected.type}))
        .toEqual({promoFilm: defaultFilm, isLoaded: false, isLoadError: true});
    });
  });

  describe('addToFavoriteAction test from promo film',() => {
    it('should update isFavorite if addToFavoriteAction fulfilled, and equals id',() => {
      const noFavoriteFilm = makeDefaultFilm();
      const favoriteFilm = {...noFavoriteFilm, isFavorite: true};
      const favoriteFilmNoEqualId = {...favoriteFilm, id: MOCK_ID};

      expect(promoSlice.reducer(state, {type: addToFavoriteAction.fulfilled.type, payload: favoriteFilmNoEqualId}))
        .toEqual({promoFilm: defaultFilm, isLoaded: false, isLoadError: false});

      expect(promoSlice.reducer(state, {type: addToFavoriteAction.fulfilled.type, payload: favoriteFilm}))
        .toEqual({promoFilm: favoriteFilm, isLoaded: false, isLoadError: false});

      expect(promoSlice.reducer(state, {type: addToFavoriteAction.fulfilled.type, payload: noFavoriteFilm}))
        .toEqual({promoFilm: noFavoriteFilm, isLoaded: false, isLoadError: false});
    });
  });
});
