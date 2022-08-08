import {store} from '../store';
import {rootReducer} from '../store/root-reducer';
import {CommentType} from './reviews';
import {FilmType} from './film';
import {AuthStatus} from '../constants/common';

export type Reducer = ReturnType<typeof rootReducer>;

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AuthSlice = {
  authStatus: AuthStatus;
  avatar: string;
  error: string;
};

export type CommentsSlice = {
  comments: CommentType[];
  isSending: boolean;
}

export type FilmSlice = {
  film: FilmType;
  similarFilms: FilmType[];
}

export type FilmsState = {
  genre: string;
  films: FilmType[];
  isLoaded: boolean;
}

export type PromoState = {
  promoFilm: FilmType;
  isLoaded: boolean;
}


