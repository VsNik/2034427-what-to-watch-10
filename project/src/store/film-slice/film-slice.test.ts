import {FilmSlice} from '../../types/state';
import {makeDefaultFilm, makeFakeFilm, makeFakeFilms, MOCK_ID, UNKNOWN_ACTION} from '../../utils/mocks';
import {filmSlice} from './film-slice';
import {addToFavoriteAction, fetchFilmAction, fetchSimilarFilmsAction} from '../api-actions';

describe('Film slice', () => {
  let state: FilmSlice;
  const defaultFilm = makeDefaultFilm();

  beforeEach(() => {
    state = {
      film: defaultFilm,
      isLoaded: false,
      similarFilms: []
    };
  });

  it('without additional parameters should return initial state',() => {
    expect(filmSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({film: defaultFilm, isLoaded: false, similarFilms: []});
  });

  describe('fetchFilmAction test', () => {
    it('should update isSending to "true" if fetchFilmAction pending',() => {
      expect(filmSlice.reducer(state, {type: fetchFilmAction.pending.type}))
        .toEqual({film: defaultFilm, isLoaded: true, similarFilms: []});
    });

    it('should update film if fetchFilmAction fulfilled',() => {
      const film = makeFakeFilm();

      expect(filmSlice.reducer(state, {type: fetchFilmAction.fulfilled.type, payload: film}))
        .toEqual({film, isLoaded: false, similarFilms: []});
    });
  });

  describe('fetchSimilarFilmsAction test',() => {
    it('should update similarFilms if fetchSimilarFilmsAction fulfilled',() => {
      const similarFilms = makeFakeFilms();

      expect(filmSlice.reducer(state, {type: fetchSimilarFilmsAction.fulfilled.type, payload: similarFilms}))
        .toEqual({film: defaultFilm, isLoaded: false, similarFilms});
    });
  });

  describe('addToFavoriteAction test',() => {
    it('should update isFavorite if addToFavoriteAction fulfilled, and equals id',() => {
      const noFavoriteFilm = makeDefaultFilm();
      const favoriteFilm = {...noFavoriteFilm, isFavorite: true};
      const favoriteFilmNoEqualId = {...favoriteFilm, id: MOCK_ID};

      expect(filmSlice.reducer(state, {type: addToFavoriteAction.fulfilled.type, payload: favoriteFilmNoEqualId}))
        .toEqual({film: defaultFilm, isLoaded: false, similarFilms: []});

      expect(filmSlice.reducer(state, {type: addToFavoriteAction.fulfilled.type, payload: favoriteFilm}))
        .toEqual({film: favoriteFilm, isLoaded: false, similarFilms: []});

      expect(filmSlice.reducer(state, {type: addToFavoriteAction.fulfilled.type, payload: noFavoriteFilm}))
        .toEqual({film: noFavoriteFilm, isLoaded: false, similarFilms: []});
    });
  });
});
