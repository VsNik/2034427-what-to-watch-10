import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError, AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state';
import {FilmType} from '../types/film';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';
import {redirectToRoute} from './actions';
import {RouteName} from '../constants/route-name';

enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
}

export const fetchFilmsAction = createAsyncThunk<FilmType[], undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'films/fetchFilms',
  async (_args, {extra: api}) => {
    const {data} = await api.get<FilmType[]>(APIRoute.Films);
    return data;
  }
);

export const fetchPromoFilmAction = createAsyncThunk<FilmType, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'promo/fetchPromoFilm',
  async (_args, {extra: api}) => {
    const {data} = await api.get<FilmType>(APIRoute.Promo);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'auth/checkAuth',
  async (_arg, {extra: api}) => {
    await api.get(APIRoute.Login);
  }
);

export const loginAction = createAsyncThunk<void | string, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'auth/login',
  async ({login: email, password}, {dispatch, extra: api, rejectWithValue}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(redirectToRoute(RouteName.Main));
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  state: State,
  extra: AxiosInstance
}>(
  'auth/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
