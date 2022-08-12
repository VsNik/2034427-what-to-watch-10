import {AuthSlice} from '../../types/state';
import {AuthStatus} from '../../constants/common';
import {authSlice} from './auth-slice';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';

describe('Slice: auth', () => {
  let state: AuthSlice;

  beforeEach(() => {
    state = {
      authStatus: AuthStatus.Unknown,
      avatar: '',
      isSending: false,
      error: ''
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(authSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({authStatus: AuthStatus.Unknown, avatar: '', isSending: false, error: ''});
  });

  describe('checkAuthAction test', () => {
    it('should set avatar and update authStatus to "AUTH" if checkAuthAction fulfilled', () => {
      const avatar = 'avatar';

      expect(authSlice.reducer(state, {type: checkAuthAction.fulfilled.type, payload: avatar}))
        .toEqual({authStatus: AuthStatus.Auth, avatar, isSending: false, error: ''});
    });

    it('should update authStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(authSlice.reducer(state, {type: checkAuthAction.rejected.type}))
        .toEqual({authStatus: AuthStatus.NoAuth, avatar: '', isSending: false, error: ''});
    });
  });

  describe('loginAction test', () => {
    it('should update isSending to "true" if loginAction pending', () => {
      expect(authSlice.reducer(state, {type: loginAction.pending.type}))
        .toEqual({authStatus: AuthStatus.Unknown, avatar: '', isSending: true, error: ''});
    });

    it('should set avatar, and update authStatus to "AUTH" if loginAction fulfilled', () => {
      const avatar = 'avatar';
      expect(authSlice.reducer(state, {type: loginAction.fulfilled.type, payload: avatar}))
        .toEqual({authStatus: AuthStatus.Auth, avatar, isSending: false, error: ''});
    });

    it('should set error, andStatus to "NO_AUTH" text if loginAction rejected', () => {
      const error = 'dummy error';

      expect(authSlice.reducer(state, {type: loginAction.rejected.type, payload: error}))
        .toEqual({authStatus: AuthStatus.NoAuth, avatar: '', isSending: false, error});
    });
  });

  describe('logoutAction test', () => {
    it('should update andStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(authSlice.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authStatus: AuthStatus.NoAuth, avatar: '', isSending: false, error: ''});
    });
  });
});
