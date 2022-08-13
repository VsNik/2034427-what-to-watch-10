import {AnyAction} from '@reduxjs/toolkit';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {redirect} from './redirect';
import {State} from '../../types/state';
import {redirectToRoute} from '../actions';
import {RouteName} from '../../constants/route-name';

const fakeHistory = {
  location: {pathname: ''},
  push(path: string) {
    this.location.pathname = path;
  },
};

jest.mock('../../utils/browser-history', () => fakeHistory);

const middlewares = [redirect];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore();

describe('Middleware: redirect', () => {
  beforeEach(() => {
    fakeHistory.push('');
  });

  it('should be redirect to /login', () => {
    store.dispatch(redirectToRoute(RouteName.SignIn));
    expect(fakeHistory.location.pathname).toBe(RouteName.SignIn);
    expect(store.getActions()).toEqual([
      redirectToRoute(RouteName.SignIn),
    ]);
  });

  it('should not to be redirect /login because bad action', () => {
    store.dispatch({type: 'UNKNOWN_ACTION', payload: RouteName.SignIn});
    expect(fakeHistory.location.pathname).not.toBe(RouteName.SignIn);
  });
});
