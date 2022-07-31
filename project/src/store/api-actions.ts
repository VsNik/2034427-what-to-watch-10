import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state';
import {AxiosError, AxiosInstance} from 'axios';
import {FilmType} from '../types/film';
import {loadFilms, loadPromoFilms, redirectToRoute, requireAuth, setDataLoadedStatus, setError} from './actions';
import {AuthStatus} from '../constants/auth-status';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {dropToken, saveToken} from '../services/token';
import {RouteName} from '../constants/route-name';
import {TIMEOUT_SHOW_ERROR} from '../constants/common';

enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Login = '/login',
  Logout = '/logout',
}

export const fetchFilmsAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'films/fetchFilms',
  async (_args, {dispatch, extra: api}) => {
    dispatch(setDataLoadedStatus(true));
    const {data} = await api.get<FilmType[]>(APIRoute.Films);
    dispatch(loadFilms(data));
    dispatch(setDataLoadedStatus(false));
  }
);

export const fetchPromoFilmAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'films/fetchPromoFilm',
  async (_args, {dispatch, extra: api}) => {
    const {data} = await api.get<FilmType>(APIRoute.Promo);
    dispatch(loadPromoFilms(data));
  }
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuth(AuthStatus.Auth));
    } catch {
      dispatch(requireAuth(AuthStatus.NoAuth));
    }
  }
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    try {
      const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(token);
      dispatch(requireAuth(AuthStatus.Auth));
      dispatch(redirectToRoute(RouteName.Main));
    } catch (err) {
      const error = err as AxiosError;
      dispatch(setError(error?.response?.data.error));
      setTimeout(
        () => dispatch(setError(null)),
        TIMEOUT_SHOW_ERROR
      );
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuth(AuthStatus.NoAuth));
  }
);
