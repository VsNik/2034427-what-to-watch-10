import {CommentsSlice} from '../../types/state';
import {commentsSlice} from './comments.slice';
import {makeFakeComments} from '../../utils/mocks';
import {fetchCommentsAction, sendCommentAction} from '../api-actions';

const comments = makeFakeComments();

describe('Slice comments' , () => {
  let state: CommentsSlice;

  beforeEach(() => {
    state = {
      comments: [],
      isSending: false,
      error: ''
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(commentsSlice.reducer(undefined, {type: 'UNKNOWN_ACTION'}))
      .toEqual({comments: [], isSending: false, error: ''});
  });

  describe('fetchCommentsAction test', () => {
    it('should update comments by load comments', () => {
      expect(commentsSlice.reducer(state, {type: fetchCommentsAction.fulfilled.type, payload: comments}))
        .toEqual({comments, isSending: false, error: ''});
    });
  });

  describe('sendCommentAction test', () => {
    it('should update isSending to "true" if sendCommentAction pending', () => {
      expect(commentsSlice.reducer(state, {type: sendCommentAction.pending.type}))
        .toEqual({comments: [], isSending: true, error: ''});
    });

    it('should update comments if sendCommentAction fulfilled', () => {
      expect(commentsSlice.reducer(state, {type: sendCommentAction.fulfilled.type, payload: comments}))
        .toEqual({comments, isSending: false, error: ''});
    });

    it('should update error message if sendCommentAction rejected', () => {
      const error = 'dummy error';

      expect(commentsSlice.reducer(state, {type: sendCommentAction.rejected.type, payload: error}))
        .toEqual({comments: [], isSending: false, error});
    });
  });
});
