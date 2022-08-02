import {combineReducers} from '@reduxjs/toolkit';
import {authSlice} from './auth-slice/auth-slice';
import {promoSlice} from './promo-slice/promo-slice';
import {filmsSlice} from './films-slice/films-slice';
import {SliceName} from '../constants/common';

export const rootReducer = combineReducers({
  [SliceName.Auth]: authSlice.reducer,
  [SliceName.Promo]: promoSlice.reducer,
  [SliceName.Films]: filmsSlice.reducer,
});
