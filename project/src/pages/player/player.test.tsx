import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import Player from './player';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeFilm} from '../../utils/mocks';
import {PlayType} from '../../constants/common';
import {getPlayerUrl} from '../../utils/route';
import {Route, Routes} from 'react-router-dom';
import {RouteName} from '../../constants/route-name';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeFilm = makeFakeFilm();

const store = mockStore({
  PLAYER: {playType: PlayType.Film},
  FILM: {film: fakeFilm}
});

const mockPlayer = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Player/>
    </HistoryRouter>
  </Provider>
);

describe('Component: Player', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('should render correctly', async () => {

    render(mockPlayer);

    expect(screen.getByTestId('player-play')).toBeInTheDocument();
    expect(screen.getByTestId('player-exit')).toBeInTheDocument();
    expect(screen.getByTestId('player-fullscreen')).toBeInTheDocument();
    expect(screen.getByTestId('player-video')).toHaveAttribute('src', fakeFilm.videoLink);
    expect(screen.getByTestId('player-progress')).toBeInTheDocument();
    expect(screen.getByTestId('player-time')).toBeInTheDocument();
  });

  it('should autoplay video, and change play button to pause, on open', async () => {

    render(mockPlayer);

    fireEvent(screen.getByTestId('player-video'),
      new Event('loadedmetadata'));

    await userEvent.click(screen.getByTestId('player-pause'));
    expect(screen.getByTestId('player-play')).toBeInTheDocument();
  });

  it('should change play button to pause, if user click on play', async () => {

    render(mockPlayer);

    expect(screen.queryByTestId('player-pause')).not.toBeInTheDocument();
    await userEvent.click(screen.getByTestId('player-play'));
    expect(screen.queryByTestId('player-play')).not.toBeInTheDocument();
    expect(screen.getByTestId('player-pause')).toBeInTheDocument();
  });

  it('should exit player, if user click on exit', async () => {
    history.push(getPlayerUrl(fakeFilm.id));

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={RouteName.Player.path}
              element={<Player/>}
            />
            <Route
              path={RouteName.Film.path}
              element={<h1>Mock Film Page</h1>}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTestId('player-exit'));
    expect(screen.getByText('Mock Film Page')).toBeInTheDocument();
  });
});
