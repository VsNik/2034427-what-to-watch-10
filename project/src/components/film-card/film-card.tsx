import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {FilmType} from '../../types/film';
import {getFilmUrl} from '../../utils/route';

const PLAY_TIMEOUT = 1000;

type FilmCardProps = {
  film: FilmType;
  activeCard: number | null;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
}

function FilmCard(props: FilmCardProps): JSX.Element {
  const {film, activeCard, onMouseEnter, onMouseLeave} = props;
  const {id, previewImage, previewVideoLink, name} = film;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeCard === id) {
        videoRef.current?.play();
      }
    },
    PLAY_TIMEOUT
    );

    if (activeCard !== id) {
      videoRef.current?.pause();
    }

    return () => {
      clearTimeout(timer);
    };
  }, [activeCard, id]);

  return (
    <article
      className={
        classNames(
          'small-film-card',
          'catalog__films-card',
          {'active': activeCard === id}
        )
      }
      onMouseEnter={() => onMouseEnter(id)}
      onMouseLeave={onMouseLeave}
    >
      <Link
        to={getFilmUrl(id)}
        className="small-film-card__image"
      >
        <video
          src={previewVideoLink}
          poster={previewImage}
          loop
          muted
          ref={videoRef}
          width={270}
          height={175}
        />
      </Link>

      <h3 className="small-film-card__title">
        <Link
          to={getFilmUrl(id)}
          className="small-film-card__link"
        >
          {name}
        </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
