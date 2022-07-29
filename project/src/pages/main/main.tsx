import {useState} from 'react';
import {Footer, GenreMenu, FilmsList, ShowMoreButton, PromoFilm} from '../../components';
import {useAppSelector} from '../../hooks';
import {selectFilterFilms} from '../../store/select';
import {FilmType} from '../../types/film';
import {DEFAULT_SHOW_FILMS} from '../../constants/common';

function Main(): JSX.Element {
  const [showCount, setShowCount] = useState<number>(DEFAULT_SHOW_FILMS);
  const filteredFilms = useAppSelector(selectFilterFilms);

  const getFilmsList = (films: FilmType[]) =>
    films.slice(0, showCount);

  return (
    <>
      <PromoFilm/>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <GenreMenu changeShowCount={setShowCount}/>

          <FilmsList films={getFilmsList(filteredFilms)}/>

          {
            filteredFilms.length > showCount &&
            <ShowMoreButton
              showCount={showCount}
              changeShowCount={setShowCount}
            />
          }
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default Main;
