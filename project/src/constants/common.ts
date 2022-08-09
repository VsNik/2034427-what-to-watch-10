export const BACKEND_URL = 'https://10.react.pages.academy/wtw';

export const REQUEST_TIMEOUT = 5000;

export const DEFAULT_GENRE = 'All genres';

export const PREVIEW_PLAY_TIMEOUT = 1000;

export const MAX_COUNT_GENRES = 9;

export const DEFAULT_SHOW_FILMS = 8;

export const MAX_COUNT_SIMILAR_FILMS = 4;

export const AUTH_TOKEN_NAME = 'wtw-token';

export const DEFAULT_RATING = 0;

export enum CommentLength {
  Min = 50,
  Max = 400,
}

export enum TabName {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews',
}

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
  Favorite = 'FAVORITE',
  Comments = 'COMMENTS',
}

export enum ErrorMessage {
  SignInValidate = 'We can’t recognize this email and password combination. Please try again.',
  IncorrectEmail = 'Please enter a valid email address',
  ServerError = 'Unknown server error'
}
