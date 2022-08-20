import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {SimilarFilms, FilmCardFull, Footer} from '../../components';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {fetchCommentsAction, fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectIsLoadedError, selectIsLoadedFilm} from '../../store/film-slice/select';
import Loader from '../../components/loader/loader';
import ServerError from '../../components/server-error/server-error';

function Film(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoadedFilm);
  const isErrorLoadFilm = useAppSelector(selectIsLoadedError);
  const filmId = params.id;

  useEffect(() => {
    if (filmId) {
      dispatch(fetchFilmAction(filmId));
      dispatch(fetchSimilarFilmsAction(filmId));
      dispatch(fetchCommentsAction(filmId));
    }
  }, [filmId, dispatch]);

  if (isLoading) {
    return <Loader/>;
  }

  if (isErrorLoadFilm) {
    return <ServerError/>;
  }

  return (
    <>
      <FilmCardFull/>

      <div className="page-content">
        <SimilarFilms/>

        <Footer/>
      </div>
    </>
  );
}

export default Film;
