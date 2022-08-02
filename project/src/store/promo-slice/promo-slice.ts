import {createSlice} from '@reduxjs/toolkit';
import {FilmType} from '../../types/film';
import {SliceName} from '../../constants/common';
import {fetchPromoFilmAction} from '../api-actions';

type PromoState = {
  promoFilm: FilmType;
  isLoaded: boolean;
}

const initialState: PromoState = {
  promoFilm: {} as FilmType,
  isLoaded: false,
};

export const promoSlice = createSlice({
  name: SliceName.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPromoFilmAction.pending, (state) => {
        state.isLoaded = true;
      })
      .addCase(fetchPromoFilmAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isLoaded = false;
      });
  },
});
