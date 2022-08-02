import {createSlice} from '@reduxjs/toolkit';
import {SliceName} from '../../constants/common';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {AuthStatus} from '../../constants/auth-status';

type AuthSlice = {
  authStatus: AuthStatus;
  error: string;
}

const initialState: AuthSlice = {
  authStatus: AuthStatus.Unknown,
  error: '',
};

export const authSlice = createSlice({
  name: SliceName.Auth,
  initialState,
  reducers: {
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
        state.error = '';
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.error = '';
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.Auth;
        state.error = '';
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.authStatus = AuthStatus.NoAuth;
        state.error = action.payload as string;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.error = '';
      });
  },
});

export const {setError} = authSlice.actions;
