import {store} from '../store';
import {rootReducer} from '../store/root-reducer';
import {FilmType, CommentType} from './common';
import {AuthStatus, PlayType} from '../constants/common';

export type Reducer = ReturnType<typeof rootReducer>;

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AuthSlice = {
  authStatus: AuthStatus;
  avatar: string;
  isSending: boolean;
  error: string;
};

export type CommentsSlice = {
  comments: CommentType[];
  isSending: boolean;
  error: string;
}

export type FilmSlice = {
  film: FilmType;
  similarFilms: FilmType[];
  isLoaded: boolean;
  isLoadError: boolean;
}

export type FilmsSlice = {
  genre: string;
  films: FilmType[];
  isLoaded: boolean;
  isLoadError: boolean;
}

export type PromoSlice = {
  promoFilm: FilmType;
  isLoaded: boolean;
  isLoadError: boolean;
}

export type FavoriteSlice = {
  favorites: FilmType[];
  isLoaded: boolean;
  isLoadError: boolean;
}

export type PlayerSlice = {
  playType: PlayType,
}
