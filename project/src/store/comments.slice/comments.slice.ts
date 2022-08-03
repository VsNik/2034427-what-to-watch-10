import {createSlice} from '@reduxjs/toolkit';
import {SliceName} from '../../constants/common';
import {fetchCommentsAction, sendCommentAction} from '../api-actions';
import {CommentsSlice} from '../../types/state';

const initialState: CommentsSlice = {
  comments: [],
  isSending: false,
};

export const commentsSlice = createSlice({
  name: SliceName.Comments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(sendCommentAction.pending, (state) => {
        state.isSending = true;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isSending = false;
      });
  },
});
