import {createSlice} from '@reduxjs/toolkit';
import {FavoriteSlice} from '../../types/state';
import {SliceName} from '../../constants/common';
import {fetchFavoritesAction} from '../api-actions';

const initialState: FavoriteSlice = {
  favorites: [],
  isLoaded: false,
  isLoadError: false,
};

export const favoriteSlice = createSlice({
  name: SliceName.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.isLoaded = true;
        state.isLoadError = false;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.favorites = action.payload;
        state.isLoadError = false;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.isLoaded = false;
        state.isLoadError = true;
      });
  },
});
