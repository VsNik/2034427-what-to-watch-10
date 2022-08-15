import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import HistoryRouter from '../../components/history-route/history-route';
import Film from './film';
import {makeFakeFilms} from '../../utils/mocks';
import {AuthStatus, DEFAULT_GENRE, MAX_COUNT_SIMILAR_FILMS} from '../../constants/common';
import {RouteName} from '../../constants/route-name';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockFilms = makeFakeFilms();

window.HTMLMediaElement.prototype.pause = jest.fn();
const mockSimilarFilms = mockFilms.slice(0, MAX_COUNT_SIMILAR_FILMS);

describe('Component: Film', () => {
  it('should render correctly', async () => {
    history.push(RouteName.Film.path);
    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth, avatar: 'avatar'},
      FILM: {genre: DEFAULT_GENRE, film: mockFilms[0], similarFilms: mockSimilarFilms, isLoaded: false},
      FILMS: {films: mockFilms}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Film/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('bg-img')).toHaveAttribute('src', mockFilms[0].backgroundImage);
    expect(screen.getByTestId('poster-img')).toHaveAttribute('src', mockFilms[0].posterImage);
    expect(screen.getByTestId('poster-name').textContent).toBe(mockFilms[0].name);
    expect(screen.getByTestId('poster-genre').textContent).toBe(mockFilms[0].genre);
    expect(screen.getByText(mockFilms[0].released)).toBeInTheDocument();

    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();

    expect(screen.getAllByTestId('film-card').length).toBe(mockSimilarFilms.length);
  });
});
