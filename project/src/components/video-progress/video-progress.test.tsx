import {fireEvent, render, screen} from '@testing-library/react';
import VideoProgress from './video-progress';

const MOCK_LAST_TOME = '01: 25';

enum Progress {
  Default = 50,
  New = 75,
}

const mockHandleVideoProgress = jest.fn();

const mockVideoProgress = (
  <VideoProgress
    progress={Progress.Default}
    lastTile={MOCK_LAST_TOME}
    onVideoProgress={mockHandleVideoProgress}
  />
);

describe('Component: VideoProgress', () => {
  it('should render correctly', () => {

    render(mockVideoProgress);

    expect(screen.getByTestId('player-progress')).toBeInTheDocument();
    expect(screen.getByTestId('player-input')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`- ${MOCK_LAST_TOME}`))).toBeInTheDocument();
    expect(screen.getByTestId('player-progress')).toHaveValue(Progress.Default);
    expect(screen.getByTestId('player-input')).toHaveValue(String(Progress.Default));
  });

  it('should called handleVideoProgress, if user changed progress', async () => {

    render(mockVideoProgress);

    const input = screen.getByTestId('player-input');
    expect(input).toHaveValue(String(Progress.Default));

    await fireEvent.change(input, {target: {value: Progress.New}});
    expect(mockHandleVideoProgress).toHaveBeenCalledTimes(1);
    expect(mockHandleVideoProgress).toHaveBeenCalledWith(String(Progress.New));
  });
});
