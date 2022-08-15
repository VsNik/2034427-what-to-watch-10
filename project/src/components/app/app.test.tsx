import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {AuthStatus, PlayType} from '../../constants/common';
import HistoryRouter from '../history-route/history-route';
import {RouteName} from '../../constants/route-name';
import {makeFakeFilm} from '../../utils/mocks';
import {getAddReviewUrl, getFilmUrl, getPlayerUrl} from '../../utils/route';
import App from './app';

const INVALID_PATH = '/not-found';

const mockStore = configureMockStore([thunk]);
const mockFilm = makeFakeFilm();
const history = createMemoryHistory();

let store = mockStore({
  AUTH: {authStatus: AuthStatus.Auth, isLoaded: false},
  FILMS: {films: [], isLoaded: false},
  PROMO: {promoFilm: mockFilm, isLoaded: false},
  FILM: {film: mockFilm, isLoaded: false, similarFilms: [mockFilm]},
  PLAYER: {playType: PlayType.Film},
  FAVORITE: {favorites: [mockFilm], isLoaded: false},
  COMMENTS: {isSending: false}
});

const mockApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App/>
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = () => Promise.resolve();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('should render "Main" when user navigate to "/"', () => {
    history.push(RouteName.Main);

    render( mockApp);

    expect(screen.getByTestId('bg-promo-img')).toBeInTheDocument();
    expect(screen.getByTestId('poster-img')).toBeInTheDocument();
  });

  it('should render "Film" when user navigate to "/film/{id}"', () => {
    history.push(getFilmUrl(mockFilm.id));

    render( mockApp);

    expect(screen.getByTestId('bg-img')).toBeInTheDocument();
    expect(screen.getByTestId('poster-img')).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/{id}"', () => {
    history.push(getPlayerUrl(mockFilm.id));

    render(mockApp);

    expect(screen.getByTestId('player-exit')).toBeInTheDocument();
    expect(screen.getByTestId('player-video')).toHaveAttribute('src', mockFilm.videoLink);
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(RouteName.MyList);

    render(mockApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/films/{id}/favorite"', () => {
    history.push(getAddReviewUrl(mockFilm.id));

    render(mockApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByTestId('add-review-img')).toHaveAttribute('src', mockFilm.backgroundImage);
  });

  it('should render "Not Found Page" when user navigate to invalid url', () => {
    history.push(getAddReviewUrl(INVALID_PATH));

    render(mockApp);

    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });

  it('should render "Sign In" when user navigate to "/login", if unauthorized', () => {
    history.push(RouteName.SignIn);
    store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth, isLoaded: false},
      FILMS: {isLoaded: false},
      PROMO: {isLoaded: false},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <App/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Sign In');
  });
});
