import {FormEvent, useState} from 'react';
import RatingSelect from './rating-select/rating-select';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {sendCommentAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectCommentError, selectIsSendingComment} from '../../store/comments.slice/select';
import {useValidComment} from '../../hooks/use-valid-comment';
import {DEFAULT_RATING} from '../../constants/common';

type CommentFormType = {
  filmId: number;
}

function CommentForm({filmId}: CommentFormType): JSX.Element {
  const dispatch = useAppDispatch();
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(DEFAULT_RATING);
  const isSending = useAppSelector(selectIsSendingComment);
  const error = useAppSelector(selectCommentError);
  const isValidForm = useValidComment(comment, rating);

  const onChangeRating = (value: string) => {
    setRating(parseInt(value, 10));
  };

  const handleCommentSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendCommentAction({filmId, comment, rating}));
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleCommentSubmit}>
        {
          error &&
          <div className="add-review__message">
            <p data-testid="comment-error">{error}</p>
          </div>
        }

        <RatingSelect
          isSending={isSending}
          onChangeRating={onChangeRating}
        />

        <div className="add-review__text">
          <textarea
            value={comment}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            onChange={(evt) => setComment(evt.target.value)}
            placeholder="Review text"
            disabled={isSending}
            data-testid="text-comment"
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              disabled={isSending || !isValidForm}
            >
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CommentForm;
