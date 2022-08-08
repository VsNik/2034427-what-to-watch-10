export const BACKEND_URL = 'https://10.react.pages.academy/wtw';

export const REQUEST_TIMEOUT = 5000;

export const DEFAULT_GENRE = 'All genres';

export const MAX_COUNT_GENRES = 9;

export const DEFAULT_SHOW_FILMS = 8;

export const MAX_COUNT_SIMILAR_FILMS = 4;

export const AUTH_TOKEN_NAME = 'wtw-token';

export enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum SliceName {
  Auth = 'AUTH',
  Promo = 'PROMO',
  Films = 'FILMS',
  Film = 'FILM',
  Comments = 'COMMENTS',
}

export enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}
