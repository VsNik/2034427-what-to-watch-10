import {Link, useMatch} from 'react-router-dom';
import {RouteName} from '../../constants/route-name';
import {getAddReviewUrl, getPlayerUrl} from '../../utils/route';
import {useAppSelector} from '../../hooks/use-app-selector';
import {AuthStatus} from '../../constants/auth-status';
import {selectAuthStatus} from '../../store/auth-slice/select';

type PosterDescriptionProps = {
  id: number;
  name: string;
  genre: string;
  releaseDate: number;
}

function PosterDescription(props: PosterDescriptionProps): JSX.Element {
  const {id, name, genre, releaseDate} = props;
  const isFilmPath = useMatch(RouteName.Film);
  const isAuthStatus = useAppSelector(selectAuthStatus);

  return (
    <div className="film-card__desc">
      <h2 className="film-card__title">{name}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre">{genre}</span>
        <span className="film-card__year">{releaseDate}</span>
      </p>

      <div className="film-card__buttons">
        <Link
          to={getPlayerUrl(id)}
          className="btn btn--play film-card__button"
          type="button"
        >
          <svg viewBox="0 0 19 19" width="19" height="19">
            <use xlinkHref="#play-s"/>
          </svg>
          <span>Play</span>
        </Link>

        {
          isAuthStatus === AuthStatus.Auth &&
          <button
            className="btn btn--list film-card__button"
            type="button"
          >
            <svg viewBox="0 0 19 20" width="19" height="20">
              <use xlinkHref="#add"/>
            </svg>
            <span>My list</span>
            <span className="film-card__count">9</span>
          </button>
        }

        {
          isAuthStatus === AuthStatus.Auth && isFilmPath &&
          <Link
            to={getAddReviewUrl(id)}
            className="btn film-card__button"
          >
            Add review
          </Link>
        }
      </div>
    </div>
  );
}

export default PosterDescription;
