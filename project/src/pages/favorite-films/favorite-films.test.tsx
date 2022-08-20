import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {AuthStatus} from '../../constants/common';
import HistoryRouter from '../../components/history-route/history-route';
import FavoriteFilms from './favorite-films';
import {makeFakeFilms} from '../../utils/mocks';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const fakeFilms = makeFakeFilms();

window.HTMLMediaElement.prototype.pause = jest.fn();
window.HTMLMediaElement.prototype.load = jest.fn();

const mockFavoriteFilm = (
  <HistoryRouter history={history}>
    <FavoriteFilms/>
  </HistoryRouter>
);

describe('Component: FavoriteFilms', () => {
  it('should render correctly', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FAVORITE: {favorites: fakeFilms, isLoaded: false}
    });

    render(
      <Provider store={store}>
        {mockFavoriteFilm}
      </Provider>
    );

    expect(screen.getByText(/My list/i)).toBeInTheDocument();

    const cards = screen.getAllByTestId('film-card');
    expect(cards.length).toBe(fakeFilms.length);
  });

  it('should error screen, if load error', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FAVORITE: {favorites: fakeFilms, isLoaded: false, isLoadError: true}
    });

    render(
      <Provider store={store}>
        {mockFavoriteFilm}
      </Provider>
    );

    expect(screen.getByText(/server is not available/i)).toBeInTheDocument();
  });
});
