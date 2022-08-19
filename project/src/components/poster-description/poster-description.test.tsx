import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {makeFakeFilm} from '../../utils/mocks';
import {PosterDescription} from '../index';
import {RouteName} from '../../constants/route-name';
import {AuthStatus, PlayType} from '../../constants/common';
import {Provider} from 'react-redux';
import HistoryRouter from '../history-route/history-route';
import {render, screen} from '@testing-library/react';
import {Route, Routes} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeFilm = makeFakeFilm();

const mockPosterDescription = (
  <PosterDescription
    id={fakeFilm.id}
    name={fakeFilm.name}
    genre={fakeFilm.genre}
    releaseDate={fakeFilm.released}
    isFavorite={fakeFilm.isFavorite}
  />
);

describe('Component: PosterDescription', () => {
  it('should render correctly if main page, and user is authorized', () => {
    history.push(RouteName.Main);

    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILMS: {films: []},
      PLAYER: {playType: PlayType.Promo}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          {mockPosterDescription}
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeFilm.name)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(fakeFilm.released)).toBeInTheDocument();

    expect(screen.getByTestId('poster-play')).toBeInTheDocument();
    expect(screen.getByTestId('my-list')).toBeInTheDocument();
    expect(screen.queryByTestId('add-review')).not.toBeInTheDocument();
  });

  it('should render correctly if film page, and user is authorized', () => {
    history.push(RouteName.Film.path);

    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILMS: {films: []},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          {mockPosterDescription}
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('poster-play')).toBeInTheDocument();
    expect(screen.getByTestId('my-list')).toBeInTheDocument();
    expect(screen.getByTestId('add-review')).toBeInTheDocument();
  });

  it('should render correctly if main page, and user is unauthorized', () => {
    history.push(RouteName.Main);

    const store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth},
      FILMS: {films: []},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          {mockPosterDescription}
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('poster-play')).toBeInTheDocument();
    expect(screen.queryByTestId('my-list')).not.toBeInTheDocument();
    expect(screen.queryByTestId('add-review')).not.toBeInTheDocument();
  });

  it('should redirect to video player, if user clicked to play button', async () => {
    history.push(RouteName.Main);

    const store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth},
      FILMS: {films: []},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={RouteName.Main}
              element={mockPosterDescription}
            />
            <Route
              path={RouteName.Player.path}
              element={<h1>Mock Video Player Component</h1>}
            />
          </Routes>

        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('poster-play')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('poster-play'));
    expect(screen.getByText(/Mock Video Player Component/i)).toBeInTheDocument();
  });

  it('should redirect to add review, if user clicked to Add review button', async () => {
    history.push(RouteName.Film.path);

    const store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILMS: {films: []},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={RouteName.Film.path}
              element={mockPosterDescription}
            />
            <Route
              path={RouteName.AddReview.path}
              element={<h1>Mock Add Review Component</h1>}
            />
          </Routes>

        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('add-review')).toBeInTheDocument();
    await userEvent.click(screen.getByTestId('add-review'));
    expect(screen.getByText(/Mock Add Review Component/i)).toBeInTheDocument();
  });
});
