import {FilmType} from '../types/film';
import {TabName} from '../components/film-card-full/film-card-full';

export const getGenres = (filmList: FilmType[]): string[] =>
  [...new Set(filmList.map((film) => film.genre))];

export const getFilmTab = () => {
  const queryParams = (new URL(document.location.href)).searchParams;
  return queryParams.get('tab') ?? TabName.Overview;
};
