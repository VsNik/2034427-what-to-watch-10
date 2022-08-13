import {FilmsSlice} from '../../types/state';
import {changeGenre, filmsSlice} from './films-slice';
import {DEFAULT_GENRE} from '../../constants/common';
import {addToFavoriteAction, fetchFilmsAction} from '../api-actions';
import {makeDefaultFilm, makeFakeFilms, MOCK_ID, UNKNOWN_ACTION} from '../../utils/mocks';

const NEW_GENRE = 'NEW_GENRE';

describe('Films slice', () => {
  let state: FilmsSlice;

  beforeEach(() => {
    state = {
      genre: DEFAULT_GENRE,
      films: [],
      isLoaded: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmsSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({genre: DEFAULT_GENRE, films: [], isLoaded: false});
  });

  it('should update genre', () => {
    expect(filmsSlice.reducer(state, changeGenre(NEW_GENRE)))
      .toEqual({genre: NEW_GENRE, films: [], isLoaded: false});
  });

  describe('fetchFilmsAction test', () => {
    it('should update isLoaded to "true" if fetchFilmsAction pending', () => {
      expect(filmsSlice.reducer(state, {type: fetchFilmsAction.pending.type}))
        .toEqual({genre: DEFAULT_GENRE, films: [], isLoaded: true});
    });

    it('should update films if fetchFilmsAction fulfilled', () => {
      const films = makeFakeFilms();
      expect(filmsSlice.reducer(state, {type: fetchFilmsAction.fulfilled.type, payload: films}))
        .toEqual({genre: DEFAULT_GENRE, films, isLoaded: false});
    });
  });

  describe('addToFavoriteAction test', () => {
    it('should update isFavorite for equals filmId', () => {
      const noFavoriteFilm = makeDefaultFilm();
      const noFavoriteFilm2 = {...noFavoriteFilm, id: MOCK_ID};
      const favoriteFilm = {...noFavoriteFilm, isFavorite: true};

      state = {
        genre: DEFAULT_GENRE,
        films: [noFavoriteFilm, noFavoriteFilm2],
        isLoaded: false
      };

      expect(filmsSlice.reducer(state, {type: addToFavoriteAction.fulfilled.type, payload: favoriteFilm}))
        .toEqual({genre: DEFAULT_GENRE, films: [favoriteFilm, noFavoriteFilm2], isLoaded: false});
    });
  });
});
