import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state';
import {
  makeFakeAuthData,
  makeFakeComments,
  makeFakeFilm,
  makeFakeFilms,
  makeFakeNewComment,
  makeFakeUser,
  MOCK_ID
} from '../utils/mocks';
import {APIRoute} from '../constants/route-name';
import {
  addToFavoriteAction,
  checkAuthAction,
  fetchCommentsAction,
  fetchFavoritesAction,
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoFilmAction,
  fetchSimilarFilmsAction, loginAction, logoutAction, sendCommentAction
} from './api-actions';
import {redirectToRoute} from './actions';
import {AUTH_TOKEN_NAME} from '../constants/common';

const CALLED = 1;

enum StatusCode {
  Ok = 200,
  NoContent = 204,
  BadRequest = 400,
}

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<State,
    Action,
    ThunkDispatch<State, typeof api, Action>>(middlewares);

  it('should dispatch fetchFilmsAction when GET /films', async () => {
    const mockFilms = makeFakeFilms();
    mockAPI
      .onGet(APIRoute.Films)
      .reply(StatusCode.Ok, mockFilms);

    const store = mockStore();
    await store.dispatch(fetchFilmsAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type, fetchFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPromoFilmAction when GET /promo', async () => {
    const mockPromo = makeFakeFilm();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(StatusCode.Ok, mockPromo);

    const store = mockStore();
    await store.dispatch(fetchPromoFilmAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoFilmAction.pending.type, fetchPromoFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFilmAction when GET /films/{filmId}', async () => {
    const mockFilm = makeFakeFilm();
    const mockFilmId = String(mockFilm.id);
    mockAPI
      .onGet(`${APIRoute.Films}/${mockFilmId}`)
      .reply(StatusCode.Ok, mockFilm);

    const store = mockStore();
    await store.dispatch(fetchFilmAction(mockFilmId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type, fetchFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSimilarFilmsAction when GET /films/{filmId}/similar', async () => {
    const mockFilmId = String(MOCK_ID);
    const mockSimilarFilms = makeFakeFilms();
    mockAPI
      .onGet(`${APIRoute.Films}/${mockFilmId}/similar`)
      .reply(StatusCode.Ok, mockSimilarFilms);

    const store = mockStore();
    await store.dispatch(fetchSimilarFilmsAction(mockFilmId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type,
      fetchSimilarFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFavoritesAction when GET /favorite', async () => {
    const mockFavoriteFilms = makeFakeFilms();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(StatusCode.Ok, mockFavoriteFilms);

    const store = mockStore();
    await store.dispatch(fetchFavoritesAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoritesAction.pending.type,
      fetchFavoritesAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFavoritesAction when GET /comments/{filmId}', async () => {
    const mockComments = makeFakeComments();
    const mockFilmId = String(MOCK_ID);
    mockAPI
      .onGet(`${APIRoute.Comments}/${mockFilmId}`)
      .reply(StatusCode.Ok, mockComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(mockFilmId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type,
      fetchCommentsAction.fulfilled.type
    ]);
  });

  it('should authStatus is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(StatusCode.Ok, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch Authorization and RedirectToRoute when POST /login', async () => {
    const authData = makeFakeAuthData();
    const mockUser = makeFakeUser();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(StatusCode.Ok, mockUser);

    Storage.prototype.setItem = jest.fn();
    const store = mockStore();
    await store.dispatch(loginAction(authData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(CALLED);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_NAME, mockUser.token);
  });

  it('should return status code 400 when invalid server validation', async () => {
    const authData = makeFakeAuthData();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(StatusCode.BadRequest);

    const store = mockStore();
    await store.dispatch(loginAction(authData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      loginAction.rejected.type
    ]);
  });

  it('should dispatch Logout when DELETE /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(StatusCode.NoContent);

    Storage.prototype.removeItem = jest.fn();
    const store = mockStore();
    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(CALLED);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_NAME);
  });

  it('should dispatch Logout when POST /favorite/{filmId}/{status}', async () => {
    const status = 1;
    const mockFilm = makeFakeFilm();
    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockFilm.id}/${status}`)
      .reply(StatusCode.Ok, mockFilm);

    const store = mockStore();
    await store.dispatch(addToFavoriteAction({id: mockFilm.id, status: status}));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addToFavoriteAction.pending.type,
      addToFavoriteAction.fulfilled.type,
    ]);
  });

  it('should dispatch sendCommentAction and redirectToRoute when POST /comments/{filmId}', async () => {
    const mockComments = makeFakeComments();
    const mockNewComment = makeFakeNewComment();
    mockAPI
      .onPost(`${APIRoute.Comments}/${mockNewComment.filmId}`)
      .reply(StatusCode.Ok, mockComments);

    const store = mockStore();
    await store.dispatch(sendCommentAction(mockNewComment));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      redirectToRoute.type,
      sendCommentAction.fulfilled.type,
    ]);
  });

  it('should return status code 400 when invalid comment', async () => {
    const mockNewComment = makeFakeNewComment();
    mockAPI
      .onPost(`${APIRoute.Comments}/${MOCK_ID}`)
      .reply(StatusCode.BadRequest);

    const store = mockStore();
    await store.dispatch(sendCommentAction(mockNewComment));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      sendCommentAction.rejected.type,
    ]);
  });
});
