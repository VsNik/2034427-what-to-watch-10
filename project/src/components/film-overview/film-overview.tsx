import {FilmType} from '../../types/film';

type FilmOverviewProps = {
  film: FilmType;
}

function FilmOverview({film}: FilmOverviewProps): JSX.Element {
  const {rating, scoresCount, description, director, starring} = film;

  const starringString = starring?.map((item) => item).join(', ');

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{rating?.toFixed(1)}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
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
