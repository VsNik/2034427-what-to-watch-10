import {useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import {Header, Poster, CommentForm} from '../../components';
import {getAddReviewUrl, getFilmUrl} from '../../utils/route';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectFilm, selectIsLoadedFilm} from '../../store/film-slice/select';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {fetchFilmAction} from '../../store/api-actions';
import Loader from '../../components/loader/loader';

function AddReview(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const film = useAppSelector(selectFilm);
  const isLoading = useAppSelector(selectIsLoadedFilm);
  const filmId = params.id;

  useEffect(() => {
    if (filmId) {
      dispatch(fetchFilmAction(filmId));
    }
  }, [dispatch, filmId]);

  if (isLoading) {
    return <Loader/>;
  }

  const {id, name, posterImage, backgroundImage} = film;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt="The Grand Budapest Hotel"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  to={getFilmUrl(id)}
                  className="breadcrumbs__link"
                >
                  {name}
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link
                  to={getAddReviewUrl(id)}
                  className="breadcrumbs__link"
                >
                  Add review
                </Link>
              </li>
            </ul>
          </nav>
        </Header>

        <Poster
          className="film-card__poster--small"
          posterSrc={posterImage}
          posterTitle={name}
        />
      </div>

      <CommentForm filmId={id}/>
    </section>
  );
}

export default AddReview;
