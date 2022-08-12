import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../types/state';
import {makeFakeComments, makeFakeFilm, makeFakeFilms, makeFakeUser} from '../utils/mocks';
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
import {AuthData} from '../types/common';
import {redirectToRoute} from './actions';

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
      .reply(200, mockFilms);

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
      .reply(200, mockPromo);

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
      .reply(200, mockFilm);

    const store = mockStore();
    await store.dispatch(fetchFilmAction(mockFilmId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type, fetchFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSimilarFilmsAction when GET /films/{filmId}/similar', async () => {
    const mockFilmId = '1';
    const mockSimilarFilms = makeFakeFilms();
    mockAPI
      .onGet(`${APIRoute.Films}/${mockFilmId}/similar`)
      .reply(200, mockSimilarFilms);

    const store = mockStore();
    await store.dispatch(fetchSimilarFilmsAction(mockFilmId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type, fetchSimilarFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFavoritesAction when GET /favorite', async () => {
    const mockFavoriteFilms = makeFakeFilms();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFavoriteFilms);

    const store = mockStore();
    await store.dispatch(fetchFavoritesAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoritesAction.pending.type, fetchFavoritesAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFavoritesAction when GET /comments/{filmId}', async () => {
    const mockComments = makeFakeComments();
    const mockFilmId = '1';
    mockAPI
      .onGet(`${APIRoute.Comments}/${mockFilmId}`)
      .reply(200, mockComments);

    const store = mockStore();
    await store.dispatch(fetchCommentsAction(mockFilmId));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchCommentsAction.pending.type, fetchCommentsAction.fulfilled.type
    ]);
  });

  it('should authStatus is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type, checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch Authorization and RedirectToRoute when POST /login', async () => {
    const authData: AuthData = {login: 'test@mail.ru', password: 'password'};
    const mockUser = makeFakeUser();
    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, mockUser);

    Storage.prototype.setItem = jest.fn();
    const store = mockStore();
    await store.dispatch(loginAction(authData));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('wtw-token', mockUser.token);
  });

  it('should return status code 400 when invalid server validation', async () => {
    const authData: AuthData = {login: 'test@mail.ru', password: 'password'};
    mockAPI
      .onPost(APIRoute.Login)
      .reply(400);

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
      .reply(204);

    Storage.prototype.removeItem = jest.fn();
    const store = mockStore();
    await store.dispatch(logoutAction());
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('wtw-token');
  });

  it('should dispatch Logout when POST /favorite/{filmId}/{status}', async () => {
    const status = 1;
    const mockFilm = makeFakeFilm();
    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockFilm.id}/${status}`)
      .reply(200, mockFilm);

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
    const mockNewComment = {comment: 'comment', rating: 10, filmId: 1};
    const filmId = 1;
    mockAPI
      .onPost(`${APIRoute.Comments}/${filmId}`)
      .reply(200, [mockComments]);

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
    const filmId = 1;
    const mockNewComment = {comment: 'comment', rating: 10, filmId: 1};
    mockAPI
      .onPost(`${APIRoute.Comments}/${filmId}`)
      .reply(400);

    const store = mockStore();
    await store.dispatch(sendCommentAction(mockNewComment));
    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      sendCommentAction.pending.type,
      sendCommentAction.rejected.type,
    ]);
  });
});
