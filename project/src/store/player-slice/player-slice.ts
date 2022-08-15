import {createSlice} from '@reduxjs/toolkit';
import {PlayerSlice} from '../../types/state';
import {PlayType, SliceName} from '../../constants/common';

const initialState: PlayerSlice = {
  playType: PlayType.Unknown,
};

export const playerSlice = createSlice({
  name: SliceName.Player,
  initialState,
  reducers: {
    setPlayType: (state, action) => {
      state.playType = action.payload;
    }
  }
});

export const {setPlayType} = playerSlice.actions;
