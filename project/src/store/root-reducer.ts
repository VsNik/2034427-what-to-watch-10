import {combineReducers} from '@reduxjs/toolkit';
import {authSlice} from './auth-slice/auth-slice';
import {promoSlice} from './promo-slice/promo-slice';
import {filmsSlice} from './films-slice/films-slice';
import {filmSlice} from './film-slice/film-slice';
import {commentsSlice} from './comments.slice/comments.slice';
import {SliceName} from '../constants/common';

export const rootReducer = combineReducers({
  [SliceName.Auth]: authSlice.reducer,
  [SliceName.Promo]: promoSlice.reducer,
  [SliceName.Films]: filmsSlice.reducer,
  [SliceName.Film]: filmSlice.reducer,
  [SliceName.Comments]: commentsSlice.reducer,
});
