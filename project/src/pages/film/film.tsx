import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {SimilarFilms, FilmCardFull, Footer} from '../../components';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {fetchCommentsAction, fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectIsLoadedFilm} from '../../store/film-slice/select';
import Loader from '../../components/loader/loader';

function Film(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectIsLoadedFilm);
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
