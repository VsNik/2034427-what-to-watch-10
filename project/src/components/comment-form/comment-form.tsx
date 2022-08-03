import {RatingSelect} from '../index';
import {FormEvent, useState} from 'react';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {sendCommentAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectIsSendingComment} from '../../store/comments.slice/select';

type CommentFormType = {
  filmId: number;
}

function CommentForm({filmId}: CommentFormType): JSX.Element {
  const dispatch = useAppDispatch();
  const isSending = useAppSelector(selectIsSendingComment);
  const [comment, setComment] = useState<string>('');
  const [rating, setRating] = useState<number>(0);

  const handleSetRating = (value: string) => {
    setRating(parseInt(value, 10));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendCommentAction({filmId, comment, rating}));
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={handleSubmit}>
        <RatingSelect isSending={isSending} onChangeRating={handleSetRating}/>

        <div className="add-review__text">
          <textarea
            value={comment}
            className="add-review__textarea"
            name="review-text"
            id="review-text"
            onChange={(evt) => setComment(evt.target.value)}
            placeholder="Review text"
            disabled={isSending}
          />
          <div className="add-review__submit">
            <button
              className="add-review__btn"
              disabled={isSending}
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
