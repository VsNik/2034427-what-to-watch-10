import {useState} from 'react';
import {FilmCard} from '../index';
import {FilmType} from '../../types/common';

type FilmsListProps = {
  films: FilmType[];
}

function FilmsList({films}: FilmsListProps): JSX.Element {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  const handleSetActive = (id: number) =>
    setActiveCard(id);

  const handleSetNoActive = () =>
    setActiveCard(null);

  return (
    <div className="catalog__films-list">
      {films.map((film) =>
        (
          <FilmCard
            key={film.id}
            film={film}
            activeCard={activeCard}
            onMouseEnter={handleSetActive}
            onMouseLeave={handleSetNoActive}
          />
        )
      )}
    </div>
  );
}

export default FilmsList;
