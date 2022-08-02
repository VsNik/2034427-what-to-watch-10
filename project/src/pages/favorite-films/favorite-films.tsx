import {Header, Footer} from '../../components';
import FilmsList from '../../components/films-list/films-list';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectFilms} from '../../store/films-slice/select';

function FavoriteFilms(): JSX.Element {
  const films = useAppSelector(selectFilms);
  const favoriteFilms = films.filter((item) => item.isFavorite);
  const favoriteCount = favoriteFilms.length;

  return (
    <div className="user-page">

      <Header className="user-page__head">
        <h1 className="page-title user-page__title">
          My list
          <span className="user-page__film-count">{favoriteCount}</span>
        </h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmsList films={favoriteFilms}/>
      </section>

      <Footer/>
    </div>
  );
}

export default FavoriteFilms;

