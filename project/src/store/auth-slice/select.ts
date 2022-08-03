import {State} from '../../types/state';
import {SliceName} from '../../constants/common';

export const selectAuthStatus = (state: State) => state[SliceName.Auth].authStatus;

export const selectAvatar = (state: State) => state[SliceName.Auth].avatar;

export const selectError = (state: State) => state[SliceName.Auth].error;
