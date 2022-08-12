import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosError, AxiosInstance} from 'axios';
import {AppDispatch} from '../types/state';
import {FilmType} from '../types/common';
import {dropToken, saveToken} from '../services/token';
import {redirectToRoute} from './actions';
import {APIRoute, RouteName} from '../constants/route-name';
import {CommentType, NewCommentType} from '../types/common';
import {TabName} from '../constants/common';
import {AuthData, UserData} from '../types/common';

export const fetchFilmsAction = createAsyncThunk<FilmType[], undefined, {
  extra: AxiosInstance
}>(
  'films/fetchFilms',
  async (_args, {extra: api}) => {
    const {data} = await api.get<FilmType[]>(APIRoute.Films);
    return data;
  }
);

export const fetchPromoFilmAction = createAsyncThunk<FilmType, undefined, {
  extra: AxiosInstance
}>(
  'promo/fetchPromoFilm',
  async (_args, {extra: api}) => {
    const {data} = await api.get<FilmType>(APIRoute.Promo);
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<string, undefined, {
  extra: AxiosInstance
}>(
  'auth/checkAuth',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data.avatarUrl;
  }
);

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch,
  extra: AxiosInstance,
}>(
  'auth/login',
  async ({login: email, password}, {dispatch, extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
      saveToken(data.token);
      dispatch(redirectToRoute(RouteName.Main));
      return data.avatarUrl;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data.error);
    }
  }
);

export const logoutAction = createAsyncThunk<void, undefined, {
  extra: AxiosInstance
}>(
  'auth/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);

export const fetchFilmAction = createAsyncThunk<FilmType, string, {
  extra: AxiosInstance
}>(
  'film/fetchFilm',
  async (id: string, {extra: api}) => {
    const {data} = await api.get<FilmType>(`${APIRoute.Films}/${id}`);
    return data;
  }
);

export const fetchSimilarFilmsAction = createAsyncThunk<FilmType[], string, {
  extra: AxiosInstance
}>(
  'film/fetchSimilarFilms',
  async (id: string, {extra: api}) => {
    const {data} = await api.get<FilmType[]>(`${APIRoute.Films}/${id}/similar`);
    return data;
  }
);

export const fetchCommentsAction = createAsyncThunk<CommentType[], string, {
  extra: AxiosInstance
}>(
  'film/fetchComments',
  async (id: string, {extra: api}) => {
    const {data} = await api.get<CommentType[]>(`${APIRoute.Comments}/${id}`);
    return data;
  }
);

export const sendCommentAction = createAsyncThunk<CommentType[], NewCommentType, {
  dispatch: AppDispatch,
  extra: AxiosInstance,
}>(
  'film/sendComment',
  async ({filmId, comment, rating}, {dispatch, extra: api, rejectWithValue}) => {
    try {
      const {data} = await api.post<CommentType[]>(`${APIRoute.Comments}/${filmId}`, {comment, rating});
      dispatch(redirectToRoute(`${RouteName.Film.name}/${filmId}?tab=${TabName.Reviews}`));
      return data;
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error);
    }
  }
);

export const fetchFavoritesAction = createAsyncThunk<FilmType[], undefined, {
  extra: AxiosInstance,
}>(
  'favorite/fetchFavorites',
  async (_args, {extra: api}) => {
    const {data} = await api.get<FilmType[]>(APIRoute.Favorite);
    return data;
  }
);

export const addToFavoriteAction = createAsyncThunk<FilmType, { id: number, status: number }, {
  extra: AxiosInstance
}>(
  'favorite/addToFavorite',
  async ({id, status}, {extra: api}) => {
    const {data} = await api.post<FilmType>(`${APIRoute.Favorite}/${id}/${status}`);
    return data;
  }
);

