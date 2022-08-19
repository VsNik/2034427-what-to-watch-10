import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import classNames from 'classnames';
import {RouteName} from '../../constants/route-name';
import {getGenreUrl} from '../../utils/route';
import {DEFAULT_SHOW_FILMS, MAX_COUNT_GENRES} from '../../constants/common';
import {selectGenres} from '../../store/films-slice/select';
import {changeGenre} from '../../store/films-slice/films-slice';
import {useAppSelector} from '../../hooks/use-app-selector';
import {useAppDispatch} from '../../hooks/use-app-dispatch';

type GenreMenuProps = {
  onChangeShowCount: (value: number) => void;
}

function GenreMenu({onChangeShowCount}: GenreMenuProps): JSX.Element {
  const genres = useAppSelector(selectGenres);
  const {genreName} = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeGenre(genreName));
    onChangeShowCount(DEFAULT_SHOW_FILMS);
  }, [genreName, dispatch, onChangeShowCount]);

  return (
    <ul className="catalog__genres-list">
      <li
        className={classNames(
          'catalog__genres-item',
          {'catalog__genres-item--active': !genreName}
        )}
      >
        <Link
          to={RouteName.Main}
          className="catalog__genres-link"
        >
          All genres
        </Link>
      </li>
      {
        genres.map((genre) => (
          <li
            key={genre}
            className={classNames(
              'catalog__genres-item',
              {'catalog__genres-item--active': genreName === genre.toLowerCase()}
            )}
            data-testid="genre"
          >
            <Link
              to={getGenreUrl(genre)}
              className="catalog__genres-link"
            >
              {genre}
            </Link>
          </li>
        )).slice(0, MAX_COUNT_GENRES)
      }
    </ul>
  );
}

export default GenreMenu;
