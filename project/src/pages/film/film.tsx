import {useEffect} from 'react';
import {SimilarFilms, FilmCardFull, Footer} from '../../components';
import {useAppDispatch} from '../../hooks/use-app-dispatch';
import {useParams} from 'react-router-dom';
import {fetchCommentsAction, fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions';

function Film(): JSX.Element {
  const params = useParams();
  const filmId = params.id as string;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchFilmAction(filmId));
    dispatch(fetchSimilarFilmsAction(filmId));
    dispatch(fetchCommentsAction(filmId));
  }, [filmId, dispatch]);

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
