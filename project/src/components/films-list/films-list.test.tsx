import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {makeFakeFilms} from '../../utils/mocks';
import HistoryRouter from '../history-route/history-route';
import FilmsList from './films-list';

const history = createMemoryHistory();
const fakeFilms = makeFakeFilms();

describe('Component: FilmsList', () => {
  window.HTMLVideoElement.prototype.pause = jest.fn();

  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <FilmsList films={fakeFilms}/>
      </HistoryRouter>
    );

    expect(screen.getAllByTestId('film-card').length).toBe(fakeFilms.length);
  });
});
