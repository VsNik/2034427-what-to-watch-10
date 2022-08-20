import {createMemoryHistory} from 'history';
import {makeFakeFilm} from '../../../utils/mocks';
import {fireEvent, render, screen} from '@testing-library/react';
import FilmCard from './film-card';
import HistoryRouter from '../../history-route/history-route';

const history = createMemoryHistory();
const fakeFilm = makeFakeFilm();

describe('Component: FilmCard', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
    window.HTMLVideoElement.prototype.load = jest.fn();
  });

  it('should render correctly', async () => {
    const mockOnMouseEnter = jest.fn();
    const mockOnMouseLeave = jest.fn();

    render(
      <HistoryRouter history={history}>
        <FilmCard
          film={fakeFilm}
          activeCard={fakeFilm.id}
          onMouseEnter={mockOnMouseEnter}
          onMouseLeave={mockOnMouseLeave}
        />
      </HistoryRouter>
    );

    expect(screen.getByTestId('film-card')).toBeInTheDocument();
    expect(screen.getByTestId('film-card-video')).toHaveAttribute('src', fakeFilm.previewVideoLink);
    expect(screen.getByTestId('film-card-video')).toHaveAttribute('poster', fakeFilm.posterImage);

    await fireEvent.mouseEnter(screen.getByTestId('film-card'));
    expect(mockOnMouseEnter).toBeCalled();
    expect(mockOnMouseEnter).toHaveBeenCalledWith(fakeFilm.id);

    await fireEvent.mouseLeave(screen.getByTestId('film-card'));
    expect(mockOnMouseLeave).toBeCalled();
  });
});
