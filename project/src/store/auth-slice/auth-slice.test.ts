import {AuthSlice} from '../../types/state';
import {AuthStatus} from '../../constants/common';
import {authSlice} from './auth-slice';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {MOCK_AVATAR, MOCK_ERROR, UNKNOWN_ACTION} from '../../utils/mocks';

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
    expect(authSlice.reducer(undefined, {type: UNKNOWN_ACTION}))
      .toEqual({authStatus: AuthStatus.Unknown, avatar: '', isSending: false, error: ''});
  });

  describe('checkAuthAction test', () => {
    it('should set avatar and update authStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(authSlice.reducer(state, {type: checkAuthAction.fulfilled.type, payload: MOCK_AVATAR}))
        .toEqual({authStatus: AuthStatus.Auth, avatar: MOCK_AVATAR, isSending: false, error: ''});
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
      expect(authSlice.reducer(state, {type: loginAction.fulfilled.type, payload: MOCK_AVATAR}))
        .toEqual({authStatus: AuthStatus.Auth, avatar: MOCK_AVATAR, isSending: false, error: ''});
    });

    it('should set error, andStatus to "NO_AUTH" text if loginAction rejected', () => {
      expect(authSlice.reducer(state, {type: loginAction.rejected.type, payload: MOCK_ERROR}))
        .toEqual({authStatus: AuthStatus.NoAuth, avatar: '', isSending: false, error: MOCK_ERROR});
    });
  });

  describe('logoutAction test', () => {
    it('should update andStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(authSlice.reducer(state, {type: logoutAction.fulfilled.type}))
        .toEqual({authStatus: AuthStatus.NoAuth, avatar: '', isSending: false, error: ''});
    });
  });
});
