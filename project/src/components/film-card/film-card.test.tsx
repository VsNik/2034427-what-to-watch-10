import {createMemoryHistory} from 'history';
import {makeFakeFilm} from '../../utils/mocks';
import {fireEvent, render, screen} from '@testing-library/react';
import FilmCard from './film-card';
import HistoryRouter from '../history-route/history-route';

const history = createMemoryHistory();
window.HTMLVideoElement.prototype.play = () => Promise.resolve();
window.HTMLVideoElement.prototype.pause = jest.fn();

describe('Component: FilmCard', () => {
  it('should render correctly', async () => {
    const film = makeFakeFilm();
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();

    render(
      <HistoryRouter history={history}>
        <FilmCard film={film} activeCard={film.id} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}/>
      </HistoryRouter>
    );

    expect(screen.getByTestId('film-card')).toBeInTheDocument();
    expect(screen.getByTestId('film-card-video')).toHaveAttribute('src', film.previewVideoLink);
    expect(screen.getByTestId('film-card-video')).toHaveAttribute('poster', film.posterImage);

    await fireEvent.mouseEnter(screen.getByTestId('film-card'));
    expect(onMouseEnter).toBeCalled();

    await fireEvent.mouseLeave(screen.getByTestId('film-card'));
    expect(onMouseLeave).toBeCalled();
  });
});
