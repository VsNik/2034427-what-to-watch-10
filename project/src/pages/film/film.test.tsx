import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import Film from './film';
import {makeFakeFilms} from '../../utils/mocks';
import {AuthStatus, MAX_COUNT_SIMILAR_FILMS} from '../../constants/common';
import {getFilmUrl} from '../../utils/route';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeFilms = makeFakeFilms();

const fakeSimilarFilms = fakeFilms.slice(0, MAX_COUNT_SIMILAR_FILMS);

const mockFilmComponent = (
  <HistoryRouter history={history}>
    <Film/>
  </HistoryRouter>
);

describe('Component: Film', () => {
  window.HTMLMediaElement.prototype.pause = jest.fn();
  window.HTMLMediaElement.prototype.load = jest.fn();
  history.push(getFilmUrl(fakeFilms[0].id));

  it('should render correctly', () => {

    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth, avatar: 'avatar'},
      FILM: {film: fakeFilms[0], similarFilms: fakeSimilarFilms, isLoaded: false},
      FILMS: {films: fakeFilms}
    });

    render(
      <Provider store={store}>
        {mockFilmComponent}
      </Provider>
    );

    expect(screen.getByTestId('bg-img')).toHaveAttribute('src', fakeFilms[0].backgroundImage);
    expect(screen.getByTestId('poster-img')).toHaveAttribute('src', fakeFilms[0].posterImage);
    expect(screen.getByTestId('poster-name').textContent).toBe(fakeFilms[0].name);
    expect(screen.getByTestId('poster-genre').textContent).toBe(fakeFilms[0].genre);
    expect(screen.getByText(fakeFilms[0].released)).toBeInTheDocument();

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();

    expect(screen.getAllByTestId('film-card').length).toBe(fakeSimilarFilms.length);
  });

  it('should error screen, if load error', () => {
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth, avatar: 'avatar'},
      FILM: {film: fakeFilms[0], similarFilms: fakeSimilarFilms, isLoaded: false, isLoadError: true},
      FILMS: {films: fakeFilms}
    });

    render(
      <Provider store={store}>
        {mockFilmComponent}
      </Provider>
    );

    expect(screen.getByText(/server is not available/i)).toBeInTheDocument();
  });
});
