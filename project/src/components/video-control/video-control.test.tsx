import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import VideoControl from './video-control';

const MOCK_TITLE = 'mock-title';
const IS_PLAYING = false;

const mockTogglePlay = jest.fn();
const mockToggleFullscreen = jest.fn();

const mockVideoControl = (
  <VideoControl
    title={MOCK_TITLE}
    isPlaying={IS_PLAYING}
    onTogglePlay={mockTogglePlay}
    onToggleFullscreen={mockToggleFullscreen}
  />
);

describe('Component: VideoControl', () => {
  it('should render correctly', () => {

    render(mockVideoControl);

    expect(screen.getByTestId('player-play')).toBeInTheDocument();
    expect(screen.getByTestId('player-fullscreen')).toBeInTheDocument();
    expect(screen.getByTestId('player-title')).toBeInTheDocument();
    expect(screen.queryByTestId('player-pause')).not.toBeInTheDocument();
  });

  it('should called togglePlay, if user click on play', async () => {

    render(mockVideoControl);

    await userEvent.click(screen.getByTestId('player-play'));
    expect(mockTogglePlay).toBeCalled();
  });

  it('should called toggleFullscreen, if user click on fullscreen', async () => {

    render(mockVideoControl);

    await userEvent.click(screen.getByTestId('player-fullscreen'));
    expect(mockToggleFullscreen).toBeCalled();
  });

  it('should display pause button, when playing',async () => {

    render(
      <VideoControl
        title={MOCK_TITLE}
        isPlaying
        onTogglePlay={mockTogglePlay}
        onToggleFullscreen={mockToggleFullscreen}
      />
    );

    expect(screen.queryByTestId('player-play')).not.toBeInTheDocument();
    expect(screen.getByTestId('player-pause')).toBeInTheDocument();
  });
});
