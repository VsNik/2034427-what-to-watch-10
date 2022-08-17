import Review from './review/review';
import {useAppSelector} from '../../../hooks/use-app-selector';
import {selectComments} from '../../../store/comments.slice/select';

function FilmReviews(): JSX.Element {
  const comments = useAppSelector(selectComments);
  return (
    <div className="film-card__row">
      <div className="film-card__reviews">
        {
          comments?.map((review, index) =>
            <Review key={review.id} review={review}/>)
        }
      </div>
    </div>
  );
}

export default FilmReviews;
