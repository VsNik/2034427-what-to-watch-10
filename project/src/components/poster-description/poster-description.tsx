import {Link, useMatch} from 'react-router-dom';
import {RouteName} from '../../constants/route-name';
import {getAddReviewUrl, getPlayerUrl} from '../../utils/route';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectAuthStatus} from '../../store/auth-slice/select';
import {AuthStatus, PlayType} from '../../constants/common';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {selectFavoritesCount} from '../../store/films-slice/select';
import {addToFavoriteAction} from '../../store/api-actions';
import {setPlayType} from '../../store/player-slice/player-slice';

type PosterDescriptionProps = {
  id: number;
  name: string;
  genre: string;
  releaseDate: number;
  isFavorite: boolean;
}

function PosterDescription(props: PosterDescriptionProps): JSX.Element {
  const {id, name, genre, releaseDate, isFavorite} = props;
  const dispatch = useAppDispatch();
  const isFilmPath = useMatch(RouteName.Film);
  const isAuthStatus = useAppSelector(selectAuthStatus);
  const favoriteCount = useAppSelector(selectFavoritesCount);

  const handleAddToFavorite = () => {
    const status = +!isFavorite;
    dispatch(addToFavoriteAction({id, status}));
  };

  const handlePlayFilm = () => {
    const type = isFilmPath ? PlayType.Film : PlayType.Promo;
    dispatch(setPlayType(type));
  };

  return (
    <div className="film-card__desc">
      <h2 className="film-card__title" data-testid="poster-name">{name}</h2>
      <p className="film-card__meta">
        <span className="film-card__genre" data-testid="poster-genre">{genre}</span>
        <span className="film-card__year">{releaseDate}</span>
      </p>

      <div className="film-card__buttons">
        <Link
          onClick={handlePlayFilm}
          to={getPlayerUrl(id)}
          className="btn btn--play film-card__button"
          type="button"
          data-testid="poster-play"
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
            onClick={handleAddToFavorite}
            data-testid="my-list"
          >
            <svg viewBox="0 0 19 20" width="19" height="20">
              {
                isFavorite
                  ? <use xlinkHref="#in-list"/>
                  : <use xlinkHref="#add"/>
              }
            </svg>
            <span>My list</span>
            <span className="film-card__count">{favoriteCount}</span>
          </button>
        }

        {
          isAuthStatus === AuthStatus.Auth && isFilmPath &&
          <Link
            to={getAddReviewUrl(id)}
            className="btn film-card__button"
            data-testid="add-review"
          >
            Add review
          </Link>
        }
      </div>
    </div>
  );
}

export default PosterDescription;
