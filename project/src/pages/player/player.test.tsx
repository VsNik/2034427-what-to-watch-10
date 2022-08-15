import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import Player from './player';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeFilm} from '../../utils/mocks';
import {PlayType} from '../../constants/common';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const mockFilm = makeFakeFilm();

describe('Component: Player', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('should render correctly', async () => {
    const store = mockStore({
      PLAYER: {playType: PlayType.Film},
      FILM: {film: mockFilm}
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player/>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('player-play')).toBeInTheDocument();
    expect(screen.getByTestId('player-exit')).toBeInTheDocument();
    expect(screen.getByTestId('player-fullscreen')).toBeInTheDocument();
    expect(screen.getByTestId('player-video')).toHaveAttribute('src', mockFilm.videoLink);
    expect(screen.getByTestId('player-progress')).toBeInTheDocument();
    expect(screen.getByTestId('player-time')).toBeInTheDocument();

    await userEvent.click(screen.getByTestId('player-play'));
    expect(screen.getByTestId('player-pause')).toBeInTheDocument();
  });
});
