import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {makeFakeFilm} from '../../utils/mocks';
import {AuthStatus} from '../../constants/common';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import FilmCardFull from './film-card-full';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: FilmCardFull', () => {
  it('should render correctly', () => {
    const mockFilm = makeFakeFilm();
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILM: {film: mockFilm},
      FILMS: {films: []}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmCardFull/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('bg-img')).toHaveAttribute('src', mockFilm.backgroundImage);
    expect(screen.getByTestId('bg-img')).toHaveAttribute('alt', mockFilm.name);
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
  });
});
