import {Header, Poster, PosterDescription} from '../index';
import FilmMenu from './film-menu/film-menu';
import FilmOverview from './film-overview/film-overview';
import FilmDetails from './film-details/film-details';
import FilmReviews from './film-reviews/film-reviews';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectFilm} from '../../store/film-slice/select';
import {TabName} from '../../constants/common';
import {useFilmTab} from '../../hooks/use-film-tab';

function FilmCardFull(): JSX.Element {
  const tab = useFilmTab();
  const film = useAppSelector(selectFilm);

  const {id, name, genre, released, posterImage, backgroundImage, isFavorite} = film;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__hero">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name} data-testid="bg-img"/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header className="film-card__head"/>

        <div className="film-card__wrap">
          <PosterDescription
            id={id}
            name={name}
            genre={genre}
            releaseDate={released}
            isFavorite={isFavorite}
          />
        </div>
      </div>

      <div className="film-card__wrap film-card__translate-top">
        <div className="film-card__info">
          <Poster
            posterSrc={posterImage}
            posterTitle={name}
            className="film-card__poster--big"
          />

          <div className="film-card__desc">
            <FilmMenu/>

            {
              tab === TabName.Overview &&
              <FilmOverview film={film}/>
            }

            {
              tab === TabName.Details &&
              <FilmDetails film={film}/>
            }

            {
              tab === TabName.Reviews &&
              <FilmReviews/>
            }
          </div>
        </div>
      </div>
    </section>
  );
}

export default FilmCardFull;
