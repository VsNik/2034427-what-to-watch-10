import {configureMockStore} from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createMemoryHistory} from 'history';
import {AuthStatus, DEFAULT_GENRE, PlayType} from '../../constants/common';
import HistoryRouter from '../history-route/history-route';
import {RouteName} from '../../constants/route-name';
import {makeDefaultFilm, makeFakeFilm} from '../../utils/mocks';
import {getAddReviewUrl, getFilmUrl, getPlayerUrl} from '../../utils/route';
import App from './app';

const INVALID_PATH = '/not-found';

const mockStore = configureMockStore([thunk]);
const history = createMemoryHistory();
const fakeFilm = makeFakeFilm();

let store = mockStore({
  AUTH: {authStatus: AuthStatus.Auth, isLoaded: false},
  FILMS: {films: [], isLoaded: false},
  PROMO: {promoFilm: fakeFilm, isLoaded: false},
  FILM: {film: fakeFilm, isLoaded: false, similarFilms: []},
  PLAYER: {playType: PlayType.Film},
  FAVORITE: {favorites: [], isLoaded: false},
  COMMENTS: {isSending: false},
});

function MockApp(): JSX.Element {
  return(
    <Provider store={store}>
      <HistoryRouter history={history}>
        <App/>
      </HistoryRouter>
    </Provider>
  );
}

describe('Application Routing', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('should render "Main" when user navigate to "/"', () => {
    history.push(RouteName.Main);

    render(<MockApp/>);

    expect(screen.getByTestId('bg-promo-img')).toBeInTheDocument();
    expect(screen.getByTestId('poster-img')).toBeInTheDocument();
  });

  it('should render "Film" when user navigate to "/film/{id}"', () => {
    history.push(getFilmUrl(fakeFilm.id));

    render(<MockApp/>);

    expect(screen.getByTestId('bg-img')).toBeInTheDocument();
    expect(screen.getByTestId('poster-img')).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/{id}"', () => {
    history.push(getPlayerUrl(fakeFilm.id));

    render(<MockApp/>);

    expect(screen.getByTestId('player-exit')).toBeInTheDocument();
    expect(screen.getByTestId('player-video')).toHaveAttribute('src', fakeFilm.videoLink);
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    history.push(RouteName.MyList);

    render(<MockApp/>);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render "Favorites" when user navigate to "/films/{id}/favorite"', () => {
    history.push(getAddReviewUrl(fakeFilm.id));

    render(<MockApp/>);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByTestId('add-review-img')).toHaveAttribute('src', fakeFilm.backgroundImage);
  });

  it('should render "Not Found Page" when user navigate to invalid url', () => {
    history.push(getAddReviewUrl(INVALID_PATH));

    render(<MockApp/>);

    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });

  it('should render "Sign In" when user navigate to "/login", if unauthorized', () => {
    history.push(RouteName.SignIn);
    store = mockStore({
      AUTH: {authStatus: AuthStatus.NoAuth, isLoaded: false},
      FILMS: {isLoaded: false},
      PROMO: {isLoaded: false},
    });

    render(<MockApp/>);

    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button').textContent).toBe('Sign In');
  });

  it('should render preloader, if user authorization status is "unknown"', () => {
    history.push(RouteName.Main);
    store = mockStore({
      AUTH: {authStatus: AuthStatus.Unknown},
      FILMS: {isLoaded: false, genre: DEFAULT_GENRE, films: []},
      PROMO: {isLoaded: false, promoFilm: makeDefaultFilm()},
    });

    render(<MockApp/>);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render preloader, if films is loading', () => {
    history.push(RouteName.Main);
    store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILMS: {isLoaded: true, genre: DEFAULT_GENRE, films: []},
      PROMO: {isLoaded: false, promoFilm: makeDefaultFilm()},
    });

    render(<MockApp/>);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render preloader, if promoFilm is loading', () => {
    history.push(RouteName.Main);
    store = mockStore({
      AUTH: {authStatus: AuthStatus.Auth},
      FILMS: {isLoaded: false, genre: DEFAULT_GENRE, films: []},
      PROMO: {isLoaded: true, promoFilm: makeDefaultFilm()},
    });

    render(<MockApp/>);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
