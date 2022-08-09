import {createSlice} from '@reduxjs/toolkit';
import {FavoriteSlice} from '../../types/state';
import {SliceName} from '../../constants/common';
import {fetchFavorites} from '../api-actions';

const initialState: FavoriteSlice = {
  favorites: [],
  isLoaded: false,
};

export const favoriteSlice = createSlice({
  name: SliceName.Favorite,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.isLoaded = true;
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.isLoaded = false;
        state.favorites = action.payload;
      });
  },
});
