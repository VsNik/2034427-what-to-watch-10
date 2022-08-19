import {FilmType} from '../../../types/common';
import {getRatingName} from '../../../utils/common';

const SIGNS = 1;

type FilmOverviewProps = {
  film: FilmType;
}

function FilmOverview({film}: FilmOverviewProps): JSX.Element {
  const {rating, scoresCount, description, director, starring} = film;

  const ratingName = getRatingName(rating);
  const starringString = starring?.map((item) => item).join(', ');

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating?.toFixed(SIGNS)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{ratingName}</span>
          <span className="film-rating__count">{scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        {description}
        <p className="film-card__director"><strong>Director: {director}</strong></p>
        <p className="film-card__starring">
          <strong>Starring: {starringString}</strong>
        </p>
      </div>
    </>
  );
}

export default FilmOverview;
