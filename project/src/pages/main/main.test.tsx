import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import {makeFakeFilms} from '../../utils/mocks';
import {AuthStatus, DEFAULT_GENRE, DEFAULT_SHOW_FILMS} from '../../constants/common';
import HistoryRouter from '../../components/history-route/history-route';
import Main from './main';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeFilms = makeFakeFilms();

describe('Component: Main', () => {
  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();

  it('should render correctly', async () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILMS: {genre: DEFAULT_GENRE, films: fakeFilms, isLoaded: false},
      PROMO: {promoFilm: fakeFilms[0], isLoaded: false},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Main/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('bg-promo-img')).toBeInTheDocument();
    expect(screen.getByTestId('poster-img')).toHaveAttribute('src', fakeFilms[0].posterImage);
    expect(screen.getAllByText(fakeFilms[0].name)[0]).toBeInTheDocument();
    expect(screen.getByText(fakeFilms[0].released)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('film-card').length).toBe(DEFAULT_SHOW_FILMS);
    expect(screen.getByText(/Show more/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/Show more/i));

    expect(screen.getAllByTestId('film-card').length).toBe(fakeFilms.length);
    expect(screen.queryByText(/Show more/i)).not.toBeInTheDocument();
  });
});
