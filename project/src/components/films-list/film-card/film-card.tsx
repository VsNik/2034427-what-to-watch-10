import {useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {FilmType} from '../../../types/common';
import {getFilmUrl} from '../../../utils/route';
import {PREVIEW_PLAY_TIMEOUT} from '../../../constants/common';

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
    PREVIEW_PLAY_TIMEOUT
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
      data-testid="film-card"
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
          data-testid="film-card-video"
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
