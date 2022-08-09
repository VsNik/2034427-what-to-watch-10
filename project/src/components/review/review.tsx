import {CommentType} from '../../types/common';
import {formattingCommentDate} from '../../utils/common';

type ReviewProps = {
  review: CommentType;
}

function Review({review}: ReviewProps): JSX.Element {
  const {comment, rating, date, user} = review;
  const commentDate = formattingCommentDate(date);

  return (
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date}>{commentDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default Review;
