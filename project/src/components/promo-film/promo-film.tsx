import {Header, Poster, PosterDescription} from '../index';
import {useAppSelector} from '../../hooks/use-app-selector';
import {selectPromoFilm} from '../../store/promo-slice/select';

function PromoFilm() {
  const promoFilm = useAppSelector(selectPromoFilm);
  const {id, name, genre, released, posterImage, backgroundImage, isFavorite} = promoFilm;

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={backgroundImage} alt={name}/>
      </div>

      <h1 className="visually-hidden">WTW</h1>

      <Header className="film-card__head"/>

      <div className="film-card__wrap">
        <div className="film-card__info">
          <Poster posterSrc={posterImage} posterTitle={name}/>

          <PosterDescription
            id={id}
            name={name}
            genre={genre}
            releaseDate={released}
            isFavorite={isFavorite}
          />
        </div>
      </div>
    </section>
  );
}

export default PromoFilm;
