import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import Film from './film';
import {makeFakeFilms} from '../../utils/mocks';
import {AuthStatus, DEFAULT_GENRE, MAX_COUNT_SIMILAR_FILMS} from '../../constants/common';
import {getFilmUrl} from '../../utils/route';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeFilms = makeFakeFilms();

const fakeSimilarFilms = fakeFilms.slice(0, MAX_COUNT_SIMILAR_FILMS);

describe('Component: Film', () => {
  window.HTMLMediaElement.prototype.pause = jest.fn();

  it('should render correctly', () => {
    history.push(getFilmUrl(fakeFilms[0].id));
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth, avatar: 'avatar'},
      FILM: {genre: DEFAULT_GENRE, film: fakeFilms[0], similarFilms: fakeSimilarFilms, isLoaded: false},
      FILMS: {films: fakeFilms}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Film/>
        </HistoryRouter>
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
});
