import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {AuthStatus, SliceName} from '../../constants/common';
import {checkAuthAction, loginAction, logoutAction} from '../api-actions';
import {AuthSlice} from '../../types/state';

const initialState: AuthSlice = {
  authStatus: AuthStatus.Unknown,
  avatar: '',
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
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.avatar = action.payload;
        state.error = '';
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.avatar = '';
        state.error = '';
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authStatus = AuthStatus.Auth;
        state.avatar = action.payload;
        state.error = '';
      })
      .addCase(loginAction.rejected, (state, action: AnyAction) => {
        state.authStatus = AuthStatus.NoAuth;
        state.avatar = '';
        state.error = action.payload;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authStatus = AuthStatus.NoAuth;
        state.avatar = '';
        state.error = '';
      });
  },
});

export const {setError} = authSlice.actions;
