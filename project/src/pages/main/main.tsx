import {useState} from 'react';
import {Footer, GenreMenu, FilmsList, ShowMoreButton, PromoFilm} from '../../components';
import {useAppSelector} from '../../hooks/use-app-selector';
import {FilmType} from '../../types/common';
import {DEFAULT_SHOW_FILMS} from '../../constants/common';
import {selectFilterFilms} from '../../store/films-slice/select';

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
          <GenreMenu onChangeShowCount={setShowCount}/>

          <FilmsList films={getFilmsList(filteredFilms)}/>

          {
            filteredFilms.length > showCount &&
            <ShowMoreButton
              showCount={showCount}
              onChangeShowCount={setShowCount}
            />
          }
        </section>

        <Footer/>
      </div>
    </>
  );
}

export default Main;
